import type { ExtractPropTypes } from 'vue'
import type { ButtonFormType, ButtonIconPosition, ButtonOpenType, ButtonSize, ButtonType } from './types'
import { createNamespace, isObject, makeStringProp, numericProp, unknownProp } from '../utils'

export const { name: buttonName, bem: buttonBem } = createNamespace('button')

export const buttonProps = {
  text: String,
  icon: String,
  type: makeStringProp<ButtonType>('default'),
  size: makeStringProp<ButtonSize>('normal'),
  color: String,
  textColor: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  loadingSize: numericProp,
  loadingText: String,
  loadingType: String,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
  customClass: unknownProp,
  customStyle: [String, Object],
  openType: makeStringProp<ButtonOpenType>(''),
  formType: makeStringProp<ButtonFormType>(''),
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => isObject(evt),
  getphonenumber: (evt: UniHelper.ButtonOnGetphonenumberEvent) => isObject(evt),
}

export type ButtonEmits = typeof buttonEmits
