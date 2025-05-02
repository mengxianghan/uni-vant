import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { CellArrowDirection, CellSize } from './types'
import { createNamespace, extend, numericProp, truthProp, unknownProp } from '../utils'

export const { name: cellName, bem: cellBem } = createNamespace('cell')

export const cellSharedProps = {
  icon: String,
  size: String as PropType<CellSize>,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null as unknown as PropType<string | CSSProperties>,
  arrowDirection: String as PropType<CellArrowDirection>,
  required: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: null,
  },
  clickable: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
}

export const cellProps = extend({}, cellSharedProps)

export type CellProps = ExtractPropTypes<typeof cellProps>

export const cellEmits = ['click']

export type CellEmits = typeof cellEmits
