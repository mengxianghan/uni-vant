import type { ExtractPropTypes, PropType } from 'vue'
import type { KeyType } from './types'
import { createNamespace, numericProp } from '../utils'

export const { name: numberKeyboardKeyName, bem: numberKeyboardKeyBem } = createNamespace('number-keyboard-key')

export const numberKeyboardKeyProps = {
  type: String as PropType<KeyType>,
  text: numericProp,
  color: String,
  wider: Boolean,
  large: Boolean,
  loading: Boolean,
}
export type NumberKeyboardKeyProps = ExtractPropTypes<typeof numberKeyboardKeyProps>
