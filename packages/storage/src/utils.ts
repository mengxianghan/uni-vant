export const extend = Object.assign

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isDef(value: unknown): boolean {
  return value !== undefined && value !== null
}
