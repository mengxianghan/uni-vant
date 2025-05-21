import type { InjectionKey } from '@vue/runtime-core'
import type { App } from 'vue'
import type {
  IEngine,
  INavigateBackOptions,
  INavigateToOptions,
  IRedirectToOptions,
  IReLaunchOptions,
  IRouteLocationNormalized,
  IRouter,
  IRouteRecord,
  IRouterOptions,
  ISwitchTabOptions,
  NavigateLocationOptions,
  NavigateNormalized,
  NavigationGuard,
} from './types'
import { inject, ref, unref } from 'vue'
import {
  assign,
  checkBeforeGradeData,
  guardToPromiseFn,
  isFunction,
  isObject,
  isString,
  parseUrl,
  runGuardQueue,
  stringifyUrl,
} from '../src/utils'

const ROUTER_KEY = Symbol('router') as InjectionKey<IRouter>
const ROUTE_KEY = Symbol('route') as InjectionKey<IRouteLocationNormalized>

const defaultRouterOptions = {
  routes: [],
  onLaunch: true,
}

export function createRouter(options: IRouterOptions): IRouter {
  options = {
    ...defaultRouterOptions,
    ...options,
  }
  const routes = ref(options?.routes || [])
  const beforeEachGuards = ref<NavigationGuard[]>([])
  const afterEachGuards = ref<NavigationGuard[]>([])
  const currentRoute = ref()
  const fromRoute = ref()
  const matched = ref<IRouteLocationNormalized[]>([])
  const isNavigateBack = ref(false)
  const isLaunchExecuted = ref(false)
  const isHotLaunchExecuted = ref(false)

  async function execBeforeGrade() {
    return runGuardQueue(beforeEachGuards.value.map((guard: NavigationGuard) => guardToPromiseFn(guard, currentRoute.value, fromRoute.value)))
  }

  async function execAfterGrade() {
    return runGuardQueue(afterEachGuards.value.map((guard: NavigationGuard) => guardToPromiseFn(guard, currentRoute.value, fromRoute.value)))
  }

  function navigate(to: INavigateToOptions): void

  function navigate(to: IRedirectToOptions): void

  function navigate(to: INavigateBackOptions): void

  function navigate(to: IReLaunchOptions): void

  function navigate(to: ISwitchTabOptions): void

  function navigate(to: NavigateLocationOptions) {
    const isNavigate = ('isNavigate' in to) ? to.isNavigate : true
    const engine: IEngine = (to?.engine || uni)
    const openType = to?.openType || 'navigateTo'
    const url: string = Reflect.get(to, 'path') || Reflect.get(to, 'url') || ''
    const beforeEach = to.beforeEach || false

    let route: IRouteLocationNormalized

    if (openType === 'navigateBack') {
      route = matched.value.pop()!
    }
    else {
      // 将 to 转换成标准的路由对象
      const { path, hash, query, pathname } = parseUrl(stringifyUrl({
        path: url as string,
        query: Reflect.get(to, 'query') || {},
      }))

      // 判断路由是否存在
      const index = routes.value.findIndex((item: IRouteRecord) => item.path === pathname)
      if (index < 0) {
        console.warn(`${url} 路由不存在！`)
        return
      }

      route = {
        fullPath: path,
        hash,
        path: pathname,
        query: query as Record<string, unknown>,
        openType,
        meta: Reflect.get(routes.value[index], 'meta') || {},
        beforeEach,
      }
    }

    // 根据 openType 更新 matched、fromRoute、currentRoute
    switch (openType) {
      case 'navigateBack': {
        const delta = (Reflect.get(to, 'delta') || 1) as number
        fromRoute.value = currentRoute.value
        currentRoute.value = matched.value.length
          ? matched.value.slice(delta * -1)[0]
          : undefined
        break
      }
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
        // 如果被拦截，还原路由
        if (checkBeforeGradeData(data)) {
          matched.value.pop()
        }

        if (isObject(data)) {
          navigate({ ...data, beforeEach: true })
          return
        }

        if (isFunction(data)) {
          data({ beforeEach: true })
          return
        }

        if (isString(data)) {
          navigate({ path: data, beforeEach: true })
          return
        }

        // 不需要执行跳转
        if (!isNavigate) {
          return
        }

        let _options
        switch (to?.openType) {
          case 'navigateBack':
            _options = assign({ delta: 1 }, to)
            break
          default:
            _options = assign(to, { url: currentRoute.value?.fullPath })
            break
        }

        engine[openType](_options)

        execAfterGrade().then(() => {
        })
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

  function launch(launchOptions: UniApp.LaunchOptionsApp) {
    if (!isLaunchExecuted.value) {
      isLaunchExecuted.value = true
      isHotLaunchExecuted.value = true

      navigate(
        {
          path: `/${launchOptions.path}`,
          query: launchOptions.query as Record<string, unknown>,
          openType: 'reLaunch',
          isNavigate: false,
        },
      )
    }
  }

  function hotLaunch(hotLaunchOptions: UniApp.LaunchOptionsApp) {
    if (!isHotLaunchExecuted.value) {
      isHotLaunchExecuted.value = true

      navigate(
        {
          path: `/${hotLaunchOptions.path}`,
          query: hotLaunchOptions.query as Record<string, unknown>,
          openType: 'reLaunch',
          isNavigate: false,
        },
      )
    }
  }

  function unload() {
    isHotLaunchExecuted.value = false
  }

  function tabItemShow() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const path = `/${currentPage.route}`
    const lastRoute = matched.value[matched.value.length - 1]

    if (lastRoute) {
      if (lastRoute?.beforeEach || lastRoute.path === path) {
        lastRoute.beforeEach = false
        return
      }
    }

    navigate(
      {
        path,
        query: Reflect.get(currentPage, 'options') || {},
        openType: 'switchTab',
        isNavigate: false,
      },
    )
  }

  function addRoute(route: IRouteRecord) {
    if (routes.value.findIndex((item: IRouteRecord) => item.path === route.path) > -1) {
      console.warn(`${route.path} 路由已存在，请勿重复添加！`)
      return
    }
    routes.value.push(route)
  }

  function removeRoute(path: string) {
    const index = routes.value.findIndex((item: IRouteRecord) => item.path === path)

    if (index < 0) {
      console.warn(`${path} 路由不存在`)
      return
    }

    routes.value.splice(index, 1)
  }

  return {
    currentRoute,
    matched,

    addRoute,
    removeRoute,

    beforeEach,
    afterEach,

    navigateTo: (to: NavigateNormalized<INavigateToOptions>) => navigate(to),
    redirectTo: (to: NavigateNormalized<IRedirectToOptions>) => navigate({ ...to, openType: 'redirectTo' }),
    reLaunch: (to: NavigateNormalized<IReLaunchOptions>) => navigate({ ...to, openType: 'reLaunch' }),
    switchTab: (to: NavigateNormalized<ISwitchTabOptions>) => navigate({ ...to, openType: 'switchTab' }),
    navigateBack: (to?: NavigateNormalized<INavigateBackOptions>) => {
      isNavigateBack.value = true
      navigate({ ...(to || {}), openType: 'navigateBack' })
    },

    launch,
    hotLaunch,
    unload,
    tabItemShow,

    install(app: App) {
      app.config.globalProperties.$router = this

      app.provide(ROUTER_KEY, this)
      app.provide(ROUTE_KEY, this.currentRoute)

      app.mixin({
        // onLaunch: (launchOptions: UniApp.LaunchOptionsApp) => {
        //   if (options.onLaunch) {
        //     navigate(
        //       {
        //         path: `/${launchOptions.path}`,
        //         url: `/${launchOptions.path}`,
        //         query: launchOptions.query as Record<string, unknown>,
        //         openType: 'reLaunch',
        //         isNavigate: false,
        //       },
        //     )
        //   }
        // },
        onUnload: () => {
          if (!isNavigateBack.value) {
            navigate({ openType: 'navigateBack', isNavigate: false })
          }
          isNavigateBack.value = false
        },
      })
    },
  }
}

export const useRouter = (): IRouter => inject(ROUTER_KEY) as IRouter

export const useRoute = (): IRouteLocationNormalized => unref(inject(ROUTE_KEY)) as IRouteLocationNormalized
