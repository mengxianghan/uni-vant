import type { App } from 'vue'
import type {
  Engine,
  NavigateBackOptions,
  NavigateLocationOptions,
  NavigateOptions,
  NavigateToOptions,
  NavigationGuard,
  RedirectToOptions,
  ReLaunchOptions,
  RouteLocationNormalized,
  Router,
  RouteRecord,
  RouterOptions,
  SwitchTabOptions,
} from './types'
import { debounce } from 'lodash-es'
import { inject, ref, unref } from 'vue'
import {
  assign,
  guardToPromiseFn,
  isFunction,
  isObject,
  isString,
  parseUrl,
  runGuardQueue,
  stringifyUrl,
} from '../src/utils'

const ROUTER_KEY = Symbol('router')
const ROUTE_KEY = Symbol('route')

const defaultRouterOptions = {
  routes: [],
  onLaunch: true,
}

export function createRouter(options: RouterOptions) {
  options = {
    ...defaultRouterOptions,
    ...options,
  }
  const routes = ref(options?.routes || [])
  const beforeEachGuards = ref<NavigationGuard[]>([])
  const afterEachGuards = ref<NavigationGuard[]>([])
  const currentRoute = ref()
  const fromRoute = ref()
  const matched = ref<RouteLocationNormalized[]>([])
  const isNavigateBack = ref(false)

  async function execBeforeGrade() {
    return runGuardQueue(beforeEachGuards.value.map((guard: NavigationGuard) => guardToPromiseFn(guard, currentRoute.value, fromRoute.value)))
  }

  async function execAfterGrade() {
    return runGuardQueue(afterEachGuards.value.map((guard: NavigationGuard) => guardToPromiseFn(guard, currentRoute.value, fromRoute.value)))
  }

  function navigate(to: NavigateToOptions, navigateOptions?: NavigateOptions): void

  function navigate(to: RedirectToOptions, navigateOptions?: NavigateOptions): void

  function navigate(to: NavigateBackOptions, navigateOptions?: NavigateOptions): void

  function navigate(to: ReLaunchOptions, navigateOptions?: NavigateOptions): void

  function navigate(to: SwitchTabOptions, navigateOptions?: NavigateOptions): void

  function navigate(to: NavigateLocationOptions, navigateOptions?: NavigateOptions) {
    const isNavigate = (navigateOptions && 'isNavigate' in navigateOptions) ? navigateOptions.isNavigate : true
    const engine: Engine = (to?.engine || uni)
    const navigateType = navigateOptions?.navigateType || 'navigateTo'
    const url: string = Reflect.get(to, 'path') || Reflect.get(to, 'url') || ''

    let route: RouteLocationNormalized

    if (navigateType === 'navigateBack') {
      route = matched.value.pop()!
    }
    else {
      // 将 to 转换成标准的路由对象
      const { path, hash, query, pathname } = parseUrl(stringifyUrl({ path: url as string, query: Reflect.get(to, 'query') || {} }))
      route = {
        fullPath: path,
        hash,
        path: pathname,
        query: query as Record<string, unknown>,
        navigateType,
      }
    }

    // 判断路由是否存在
    if (routes.value.findIndex((item: RouteRecord) => item.path === route?.path) < 0) {
      console.warn(`${url} 路由不存在！`)
      return
    }

    // 根据 navigateType 更新 matched、fromRoute、currentRoute
    switch (navigateType) {
      case 'navigateBack':
        fromRoute.value = currentRoute.value
        currentRoute.value = matched.value.length ? matched.value.slice(<number>('delta' in to ? to.delta : 1) * -1)[0] : undefined
        break
      case 'reLaunch':
        fromRoute.value = null
        matched.value = [route]
        currentRoute.value = route
        break
      default:
        fromRoute.value = matched.value[matched.value.length - 1]
        matched.value.push(route)
        currentRoute.value = route
        break
    }

    execBeforeGrade()
      .then((data) => {
        // 如果不是首次启动，则跳转
        if (isNavigate !== false) {
          if (isObject(data)) {
            navigate(data)
            return
          }
          if (isFunction(data)) {
            data()
            return
          }
          if (isString(data)) {
            navigate({ url: data })
            return
          }

          // onLaunch || onUnload 时不需要执行跳转
          if (!isNavigate) {
            return
          }

          let _options
          switch (navigateOptions?.navigateType) {
            case 'navigateBack':
              _options = assign({ delta: 1 }, to)
              break
            default:
              _options = assign(to, { url: currentRoute.value?.fullPath })
              break
          }
          engine[navigateType](_options)
        }

        execAfterGrade().then(() => {})
      })
      .catch((err) => {
        console.warn(err.message)
      })
  }

  function beforeEach(guard: NavigationGuard) {
    beforeEachGuards.value.push(guard)
  }

  function afterEach(guard: NavigationGuard) {
    afterEachGuards.value.push(guard)
  }

  function addRoute(route: RouteRecord) {
    if (routes.value.findIndex((item: RouteRecord) => item.path === route.path) > -1) {
      console.warn(`${route.path} 路由已存在，请勿重复添加！`)
      return
    }
    routes.value.push(route)
  }

  return {
    currentRoute,
    matched,

    addRoute,

    beforeEach,
    afterEach,

    navigateTo: (to: NavigateToOptions) => navigate(to),
    redirectTo: (to: RedirectToOptions) => navigate(to, { navigateType: 'redirectTo' }),
    reLaunch: (to: ReLaunchOptions) => navigate(to, { navigateType: 'reLaunch' }),
    switchTab: (to: SwitchTabOptions) => navigate(to, { navigateType: 'switchTab' }),
    navigateBack: (to?: NavigateBackOptions) => {
      isNavigateBack.value = true
      navigate(to || {}, { navigateType: 'navigateBack' })
    },

    install(app: App) {
      const router = this
      app.config.globalProperties.$router = router

      app.provide(ROUTER_KEY, router)
      app.provide(ROUTE_KEY, currentRoute)

      app.mixin({
        onLaunch: (launchOptions: UniApp.LaunchOptionsApp) => {
          if (options.onLaunch) {
            navigate(
              {
                path: `/${launchOptions.path}`,
                url: '/aaa',
                query: launchOptions.query as Record<string, unknown>,
              },
              {
                navigateType: 'reLaunch',
                isNavigate: false,
              },
            )
          }
        },
        onUnload: debounce(() => {
          if (!isNavigateBack.value) {
            navigate({}, { navigateType: 'navigateBack', isNavigate: false })
          }
          isNavigateBack.value = false
        }, 500),
      })
    },
  }
}

export const useRouter = (): Router => inject(ROUTER_KEY) as Router

export const useRoute = (): RouteLocationNormalized => unref(inject(ROUTE_KEY)) as RouteLocationNormalized
