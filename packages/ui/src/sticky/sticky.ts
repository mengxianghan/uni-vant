import type { ExtractPropTypes } from 'vue'
import type { StickyPosition } from './types.ts'
import { createNamespace, makeNumericProp, makeStringProp } from '../utils'

export const { name: stickyName, bem: stickyBem } = createNamespace('sticky')

export const stickyProps = {
  position: makeStringProp<StickyPosition>('top'),
  offset: makeNumericProp(0),
  zIndex: makeNumericProp(99),
  container: Function,
  disabled: Boolean,
  pageScroll: { type: Function, default: () => {} },
}
export type StickyProps = ExtractPropTypes<typeof stickyProps>
