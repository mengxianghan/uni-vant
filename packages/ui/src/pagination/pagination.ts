import type { ExtractPropTypes } from 'vue'
import type { PaginationMode } from './types'
import { createNamespace, isNumber, makeNumericProp, makeStringProp, truthProp } from '../utils'

export const { name: paginationName, bem: paginationBem, t: paginationT } = createNamespace('pagination')

export const paginationProps = {
  mode: makeStringProp<PaginationMode>('multi'),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean,
  showPrevButton: truthProp,
  showNextButton: truthProp,
}
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  change: (val: number) => isNumber(val),
}
export type PaginationEmits = typeof paginationEmits
