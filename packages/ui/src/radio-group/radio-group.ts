import type { ExtractPropTypes, PropType } from 'vue'
import type { RadioDirection, RadioShape } from '../radio'
import { createNamespace, isDef, type Numeric, numericProp } from '../utils'

export const { name: radioGroupName, bem: radioGroupBem } = createNamespace('radio-group')

export const RADIO_KEY = Symbol(radioGroupName)

export const radioGroupProps = {
  disabled: Boolean,
  direction: String as PropType<RadioDirection>,
  iconSize: numericProp,
  checkedColor: String,
  shape: String as PropType<RadioShape>,
}
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = {
  change: (val: Numeric) => isDef(val),
}
export type RadioGroupEmits = typeof radioGroupEmits
