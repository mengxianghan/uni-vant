import type { ExtractPropTypes, PropType } from 'vue'
import type { Interceptor } from '../utils'
import { createNamespace, isDef, isObject, makeNumericProp, numericProp } from '../utils'

export const { name: swipeCellName, bem: swipeCellBem } = createNamespace('swipe-cell')

export const swipeCellProps = {
  name: makeNumericProp(''),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function as PropType<Interceptor>,
  stopPropagation: Boolean,
}
export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>

export const swipeCellEmits = {
  open: (val: object) => isObject(val),
  close: (val: object) => isObject(val),
  click: (position: string) => isDef(position),
}
export type SwipeCellEmits = typeof swipeCellEmits
