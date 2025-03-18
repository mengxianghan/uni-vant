import type { Ref } from 'vue'

export type NavigateType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack'

export interface RouteLocationNormalized {
  fullPath?: string | string.PageURIString
  hash?: string
  meta?: Record<string | number | symbol, unknown>
  path: string
  query?: Record<string, unknown>
  navigateType?: NavigateType
}

export interface Engine {
  navigateTo: (options: any) => void
  navigateBack: (options: any) => void
  switchTab: (options: any) => void
  redirectTo: (options: any) => void
  reLaunch: (options: any) => void
}

export interface RouteRecord {
  path: string
  meta?: Record<string, unknown>
}

export interface RouterOptions {
  routes: RouteRecord[]
  onLaunch?: boolean
}

export interface NavigationGuardNext {
  (): void
  (valid: boolean): void
  (valid: NavigateLocationOptions): void
}

export type NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized | null, next: NavigationGuardNext) => void | Promise<void>

export type Lazy<T> = () => Promise<T>

export interface NavigateToOptions extends UniApp.NavigateToOptions {
  query?: Record<string, unknown>
  engine?: Engine
}

export interface RedirectToOptions extends UniApp.RedirectToOptions {
  path?: string
  query?: Record<string, unknown>
  engine?: Engine
}

export interface ReLaunchOptions extends UniApp.ReLaunchOptions {
  path?: string
  query?: Record<string, unknown>
  engine?: Engine
}

export interface SwitchTabOptions extends UniApp.SwitchTabOptions {
  path?: string
  engine?: Engine
}

export interface NavigateBackOptions extends UniApp.NavigateBackOptions {
  path?: string
  engine?: Engine
}

export type NavigateLocationOptions = NavigateToOptions | RedirectToOptions | ReLaunchOptions | SwitchTabOptions | NavigateBackOptions

export interface NavigateOptions {
  navigateType?: NavigateType
  isNavigate?: boolean
}

export interface Router {
  currentRoute: Readonly<Ref<RouteLocationNormalized | undefined>>
  matched: Readonly<Ref<RouteLocationNormalized[]>>
  addRoute: (route: RouteRecord) => void
  navigateTo: (to: NavigateToOptions) => void
  redirectTo: (to: RedirectToOptions) => void
  reLaunch: (to: ReLaunchOptions) => void
  switchTab: (to: SwitchTabOptions) => void
  navigateBack: (to?: NavigateBackOptions) => void
  beforeEach: (guard: NavigationGuard) => void
  afterEach: (guard: NavigationGuard) => void
  install: (App: any) => void
}
