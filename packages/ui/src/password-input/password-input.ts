import type { ExtractPropTypes } from 'vue'
import { createNamespace, makeNumericProp, numericProp, truthProp } from '../utils'

export const { name: passwordInputName, bem: passwordInputBem } = createNamespace('password-input')

export const passwordInputProps = {
  info: String,
  mask: truthProp,
  gutter: numericProp,
  length: makeNumericProp(6),
  focused: Boolean,
  errorInfo: String,
}
export type PasswordInputProps = ExtractPropTypes<typeof passwordInputProps>
