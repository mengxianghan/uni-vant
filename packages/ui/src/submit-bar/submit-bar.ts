import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonType } from '../button'
import type { SubmitBarTextAlign } from './types'
import { createNamespace, makeNumericProp, makeStringProp, truthProp } from '../utils'

export const { name: submitBarName, bem: submitBarBem } = createNamespace('submit-bar')

export const submitBarProps = {
  price: Number,
  decimalLength: makeNumericProp(2),
  label: makeStringProp('合计:'),
  suffixLabel: String,
  textAlign: String as PropType<SubmitBarTextAlign>,
  buttonText: String,
  buttonType: makeStringProp<ButtonType>('danger'),
  buttonColor: String,
  tip: String,
  tipIcon: String,
  currency: makeStringProp('￥'),
  disabled: Boolean,
  loading: Boolean,
  safeAreaInsetBottom: truthProp,
  placeholder: Boolean,
  fixed: truthProp,
}
export type SubmitBarProps = ExtractPropTypes<typeof submitBarProps>

export const submitBarEmits = {
  submit: () => true,
}
export type SubmitBarEmits = typeof submitBarEmits
