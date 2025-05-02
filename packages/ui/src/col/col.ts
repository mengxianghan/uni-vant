import type { ExtractPropTypes } from 'vue'
import { createNamespace, numericProp } from '../utils'

export const { name: colName, bem: colBem } = createNamespace('col')

export const colProps = {
  span: numericProp,
  offset: numericProp,
}

export type ColProps = ExtractPropTypes<typeof colProps>

export const colEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}

export type ColEmits = typeof colEmits
