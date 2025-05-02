import type { ExtractPropTypes, PropType } from 'vue'
import type { CheckboxLabelPosition, CheckboxShape } from './types.ts'
import { createNamespace, isDef, numericProp, truthProp, unknownProp } from '../utils'

export const { name: checkboxName, bem: checkboxBem } = createNamespace('checkbox')

export const checkboxProps = {
  modelValue: Boolean,
  name: numericProp,
  shape: String as PropType<CheckboxShape>,
  disabled: Boolean,
  labelDisabled: Boolean,
  labelPosition: String as PropType<CheckboxLabelPosition>,
  iconSize: numericProp,
  checkedColor: String,
  bindGroup: truthProp,
  indeterminate: Boolean,
  customClass: unknownProp,
  customStyle: unknownProp,
}
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  'change': (val: boolean) => isDef(val),
  'click': () => true,
  'toggle': () => true,
  'update:modelValue': (val: boolean) => isDef(val),
}
export type CheckboxEmits = typeof checkboxEmits
