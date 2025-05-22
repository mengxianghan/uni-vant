import type { App, Ref } from 'vue'

export type OpenType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack'

export interface IRouteLocationNormalized {
  fullPath: string | string.PageURIString
  hash: string
  meta: Record<string | number | symbol, unknown>
  path: string
  query: Record<string, unknown>
  openType: OpenType
  beforeEach: boolean
}

export interface IEngine {
  navigateTo: (options: any) => void
  navigateBack: (options: any) => void
  switchTab: (options: any) => void
  redirectTo: (options: any) => void
  reLaunch: (options: any) => void
}

export interface IRouteRecord {
  path: string
  meta?: Record<string, unknown>
}

export interface IRouterOptions {
  routes: IRouteRecord[]
  // onLaunch?: boolean
}

export interface INavigationGuardNext {
  (): void
  (valid: boolean): void
  (valid: NavigateLocationOptions): void
}

export type NavigationGuard = (to: IRouteLocationNormalized, from: IRouteLocationNormalized | null, next: INavigationGuardNext) => void | Promise<void>

export type Lazy<T> = () => Promise<T>

type Query = Record<string, unknown>

export interface INavigateBaseOptions {
  path: string
  engine?: IEngine
  isNavigate?: boolean
  openType?: OpenType
  beforeEach?: boolean
}

export interface INavigateToOptions extends Omit<UniApp.NavigateToOptions, 'url'>, INavigateBaseOptions {
  query?: Query
}

export interface IRedirectToOptions extends Omit<UniApp.RedirectToOptions, 'url'>, INavigateBaseOptions {
  query?: Query
}

export interface IReLaunchOptions extends Omit<UniApp.ReLaunchOptions, 'url'>, INavigateBaseOptions {
  query?: Query
}

export interface ISwitchTabOptions extends Omit<UniApp.SwitchTabOptions, 'url'>, INavigateBaseOptions {
  query?: Query
}

export interface INavigateBackOptions extends UniApp.NavigateBackOptions, Omit<INavigateBaseOptions, 'path'> {
}

export type NavigateLocationOptions = INavigateToOptions | IRedirectToOptions | IReLaunchOptions | ISwitchTabOptions | INavigateBackOptions

export type NavigateNormalized<T> = Omit<T, 'isNavigate' | 'openType' | 'beforeEach'>

export interface IRouter {
  currentRoute: Readonly<Ref<IRouteLocationNormalized | undefined>>
  matched: Readonly<Ref<IRouteLocationNormalized[]>>
  addRoute: (route: IRouteRecord) => void
  removeRoute: (path: string) => void
  navigateTo: (to: NavigateNormalized<INavigateToOptions>) => void
  redirectTo: (to: NavigateNormalized<IRedirectToOptions>) => void
  reLaunch: (to: NavigateNormalized<IReLaunchOptions>) => void
  switchTab: (to: NavigateNormalized<ISwitchTabOptions>) => void
  navigateBack: (to?: NavigateNormalized<INavigateBackOptions>) => void
  beforeEach: (guard: NavigationGuard) => void
  afterEach: (guard: NavigationGuard) => void
  launch: (options: UniApp.LaunchOptionsApp) => void
  hotLaunch: (options: UniApp.LaunchOptionsApp) => void
  unload: () => void
  tabItemShow: () => void
  install: (app: App) => void
}

export interface IUrl {
  protocol: string
  slashes: boolean
  host: string
  hostname: string
  port: string
  pathname: string
  path: string
  hash: string
  query: string | Record<string, unknown>
  search: string
}
