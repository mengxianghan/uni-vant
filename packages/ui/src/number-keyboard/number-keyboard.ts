import type { ExtractPropTypes, PropType } from 'vue'
import type { NumberKeyboardTheme } from './types'
import { createNamespace, makeNumericProp, makeStringProp, numericProp, truthProp } from '../utils'

export const { name: numberKeyboardName, bem: numberKeyboardBem } = createNamespace('number-keyboard')

export const numberKeyboardProps = {
  title: String,
  theme: makeStringProp<NumberKeyboardTheme>('default'),
  zIndex: numericProp,
  teleport: [String, Object],
  maxlength: makeNumericProp(Infinity),
  transition: truthProp,
  blurOnClose: truthProp,
  showDeleteKey: truthProp,
  randomKeyOrder: Boolean,
  closeButtonText: String,
  deleteButtonText: String,
  closeButtonLoading: Boolean,
  hideOnClickOutside: truthProp,
  safeAreaInsetBottom: truthProp,
  extraKey: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
}
export type NumberKeyboardProps = ExtractPropTypes<typeof numberKeyboardProps>
