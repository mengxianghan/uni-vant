import type { ExtractPropTypes, PropType } from 'vue'
import type { RowAlign, RowJustify } from './types'
import { createNamespace, truthProp } from '../utils'

export const { name: rowName, bem: rowBem } = createNamespace('row')

export const ROW_KEY = Symbol(rowName)

export const rowProps = {
  wrap: truthProp,
  align: String as PropType<RowAlign>,
  gutter: {
    type: [String, Number, Array] as PropType<
            string | number | (string | number)[]
    >,
    default: 0,
  },
  justify: String as PropType<RowJustify>,
}
export type RowProps = ExtractPropTypes<typeof rowProps>

export const rowEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}
export type RowEmits = typeof rowEmits
