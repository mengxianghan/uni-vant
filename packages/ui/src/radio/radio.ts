import type { ExtractPropTypes, PropType } from 'vue'
import type { RadioLabelPosition, RadioShape } from './types'
import { createNamespace, isDef, type Numeric, numericProp, truthProp } from '../utils'

export const { name: radioName, bem: radioBem } = createNamespace('radio')

export const radioProps = {
  modelValue: numericProp,
  name: numericProp,
  shape: String as PropType<RadioShape>,
  disabled: Boolean,
  labelDisabled: Boolean,
  labelPosition: String as PropType<RadioLabelPosition>,
  iconSize: numericProp,
  checkedColor: String,
  bindGroup: truthProp,
}
export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  'click': (evt: MouseEvent) => evt instanceof Object,
  'toggle': () => true,
  'change': (val: Numeric) => isDef(val),
  'update:modelValue': (val: Numeric) => isDef(val),
}
export type RadioEmits = typeof radioEmits
