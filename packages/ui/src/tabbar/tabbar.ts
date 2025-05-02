import type { ExtractPropTypes } from 'vue'
import type { Numeric } from '../utils'
import { createNamespace, isNumeric, makeNumericProp, truthProp } from '../utils'

export const { name: tabbarName, bem: tabbarBem } = createNamespace('tabbar')

export const TABBAR_KEY = Symbol(tabbarName)

export const tabbarProps = {
  fixed: truthProp,
  border: truthProp,
  zIndex: makeNumericProp(1),
  activeColor: String,
  inactiveColor: String,
  placeholder: Boolean,
  safeAreaInsetBottom: Boolean,
  beforeChange: { type: Function, default: () => true },
}
export type TabbarProps = ExtractPropTypes<typeof tabbarProps>

export const tabbarEmits = {
  change: (val: Numeric) => isNumeric(val),
}
export type TabbarEmits = typeof tabbarEmits
