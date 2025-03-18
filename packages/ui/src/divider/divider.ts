import type { ExtractPropTypes } from 'vue'
import type { DividerContentPosition } from './types'
import { createNamespace, isObject, makeStringProp, truthProp, unknownProp } from '../utils'

export const { name: dividerName, bem: dividerBem } = createNamespace('divider')

export const dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  vertical: Boolean,
  contentPosition: makeStringProp<DividerContentPosition>('center'),
  customStyle: unknownProp,
  customClass: unknownProp,
}
export type DividerProps = ExtractPropTypes<typeof dividerProps>

export const dividerEmits = {
  click: (evt: MouseEvent) => isObject(evt),
}
export type DividerEmits = typeof dividerEmits
