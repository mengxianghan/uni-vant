import type { Numeric } from '../utils'

export const numberKeyboardTheme = ['default', 'custom'] as const
export type NumberKeyboardTheme = (typeof numberKeyboardTheme)[number]

export const keyType = ['', 'delete', 'extra', 'close'] as const
export type KeyType = (typeof keyType)[number]

export interface KeyConfig {
  text?: Numeric
  type?: KeyType
  color?: string
  wider?: boolean
}
