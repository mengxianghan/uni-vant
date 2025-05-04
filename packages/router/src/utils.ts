import type {
  INavigationGuardNext,
  IRouteLocationNormalized,
  IUrl,
  Lazy,
  NavigationGuard,
} from './types'
import { assign } from 'lodash-es'

export { assign, cloneDeep, last, omit, pick } from 'lodash-es'

export const isDef = (value: unknown) => value !== undefined && value !== null && value !== ''

export const isString = (value: unknown) => typeof value === 'string'

export const isObject = (value: unknown) => typeof value === 'object' && value !== null

export const isNumber = (value: unknown) => typeof value === 'number'

export const isFunction = (value: unknown) => typeof value === 'function'

export function parseUrl(urlStr: string, options?: { queryString: boolean }): IUrl {
  const urlObj = {
    protocol: '',
    slashes: false,
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    path: '',
    query: '' as string | Record<string, unknown>,
    hash: '',
    search: '',
  }
  const regex = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
  const matches = regex.exec(urlStr)

  if (matches) {
    urlObj.protocol = matches[2] || ''
    urlObj.slashes = !!matches[3]
    urlObj.host = matches[4] || ''
    urlObj.hostname = matches[4] ? matches[4].split(':')[0] : ''
    urlObj.port = matches[4] ? (matches[4].split(':')[1] || '') : ''
    urlObj.pathname = matches[5] || '/'
    urlObj.path = `${matches[5] || '/'}${matches[6] || ''}`
    urlObj.search = matches[6] || ''
    urlObj.query = matches[7] || ''
    urlObj.hash = matches[9] || ''

    if (!options?.queryString) {
      urlObj.query = parseQuery(urlObj.query)
    }
  }

  return urlObj
}

export function stringifyUrl(urlObj: Partial<IUrl>) {
  let urlStr = ''

  const { pathname: _pathname = '', query: _query = {}, hash: _hash = '' } = parseUrl(urlObj?.path || '', { queryString: false })
  const pathname = urlObj.pathname || _pathname
  const query: Record<string | number | symbol, unknown> = assign(_query, isString(urlObj.query) ? parseQuery(urlObj.query) : (urlObj.query || {})) as Record<string | number | symbol, unknown>
  const hash = urlObj.hash || _hash

  urlStr += urlObj.protocol ? `${urlObj.protocol}:` : ''

  urlStr += urlObj.slashes ? '//' : ''

  urlStr += urlObj.host || ''

  urlStr += pathname

  urlStr += Object.keys(query).length ? `?${stringifyQuery(query)}` : ''

  urlStr += hash ? `#${hash}` : ''

  return urlStr
}

function stringifyQuery(queryObj: Record<string, unknown>) {
  return Object.entries(queryObj).map(([key, value]) => `${key}=${value}`).join('&')
}

function parseQuery(queryStr: string): Record<string, unknown> {
  return queryStr.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=')

    if (key) {
      return {
        ...acc,
        [key]: value,
      }
    }

    return acc
  }, {})
}

export function guardToPromiseFn(guard: NavigationGuard, to: IRouteLocationNormalized, from: IRouteLocationNormalized | null) {
  return () => new Promise((resolve, reject) => {
    const next: INavigationGuardNext = (valid?) => {
      if (valid === false) {
        reject(new Error('导航终止'))
      }
      else if (!isDef(valid) || valid === true) {
        resolve(true)
      }
      else {
        resolve(valid)
      }
    }

    const guardReturn = guard.call(undefined, to, from, next)

    let guardCall = Promise.resolve(guardReturn)

    // 如果守卫的参数小于 3 个
    if (guard.length < 3) {
      guardCall = guardCall.then(next)
    }

    // 如果守卫的参数大于 2 个
    if (guard.length > 2 && typeof guardReturn === 'object' && 'then' in guardReturn) {
      guardCall = guardCall.then((resolvedValue) => {
        return resolvedValue
      })
    }

    guardCall.catch(err => reject(err))
  })
}

export function runGuardQueue(guards: Lazy<any>[]): Promise<any> {
  return guards.reduce(
    (promise, guard) => promise.then(() => guard()),
    Promise.resolve(),
  )
}
