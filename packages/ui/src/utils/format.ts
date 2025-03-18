import type { CSSProperties } from 'vue'
import { isDef, isNumeric, type Numeric } from './basic'

export function addUnit(value?: Numeric): string | undefined {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}px` : String(value)
  }
  return undefined
}

export function getSizeStyle(
  originSize?: Numeric | Numeric[],
): CSSProperties {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1]),
      } as CSSProperties
    }
    const size = addUnit(originSize)
    return {
      width: size,
      height: size,
    } as CSSProperties
  }
  return {} as CSSProperties
}

export function getZIndexStyle(zIndex?: Numeric) {
  if (zIndex !== undefined) {
    return {
      zIndex: +zIndex,
    }
  }
  return {}
}

const camelizeRE = /-(\w)/g

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

export function kebabCase(str: string) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

export function padZero(num: Numeric, targetLength = 2): string {
  let str = `${num}`

  while (str.length < targetLength) {
    str = `0${str}`
  }

  return str
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char)

  if (index === -1) {
    return value
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export function formatNumber(
  value: string,
  allowDot = true,
  allowMinus = true,
) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g)
  }
  else {
    value = value.split('.')[0]
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g)
  }
  else {
    value = value.replace(/-/, '')
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g

  return value.replace(regExp, '')
}

// add num and avoid float number
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10
  return Math.round((num1 + num2) * cardinal) / cardinal
}
