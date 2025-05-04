import type { IAttrs, IOptions, IStorage } from './types'
import { isDate, isDef, isNumber } from './utils'

class Storage {
  #namespace: string = ''
  #expires: number | Date | null = null

  constructor(options?: IOptions) {
    this.#namespace = options?.namespace || ''
    this.#expires = options?.expires || null
  }

  #getKey(key: string): string {
    return `${this.#namespace}${key}`
  }

  setItem(key: string, value: any, attrs?: IAttrs) {
    const expires = isDef(attrs?.expires) ? attrs?.expires : this.#expires
    let date = null
    let exp = null

    if (isNumber(expires)) {
      date = new Date()
      date.setDate(date.getDate() + expires)
      exp = new Date(date)
    }
    if (isDate(expires)) {
      exp = expires
    }

    uni.setStorageSync(this.#getKey(key), JSON.stringify({ value, expires: exp }))
  }

  getItem(key: string, defaultValue: unknown = null) {
    const data = JSON.parse(uni.getStorageSync(this.#getKey(key)) || '{}')

    // 缓存未过期
    if (data?.expires === null || new Date(data?.expires).getTime() >= new Date().getTime()) {
      return data?.value
    }

    // 缓存已过期，清除缓存
    this.removeItem(key)

    return defaultValue
  }

  removeItem(key: string) {
    uni.removeStorageSync(this.#getKey(key))
  }

  clear() {
    uni.clearStorageSync()
  }
}

export function createStorage(options?: IOptions): IStorage {
  return new Storage(options)
}
