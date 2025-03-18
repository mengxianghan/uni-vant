import type { FixedPosition } from './types'
import { createNamespace, makeNumericProp, makeStringProp, numericProp, unknownProp } from '../utils'

export const { name: fixedName, bem: fixedBem } = createNamespace('fixed')

export const fixedProps = {
  disabled: Boolean,
  placeholder: Boolean,
  position: makeStringProp<FixedPosition>('bottom'),
  offset: makeNumericProp(0),
  zIndex: numericProp,
  customClass: unknownProp,
  customStyle: unknownProp,
  safeAreaInsetBottom: Boolean,
  safeAreaInsetTop: Boolean,
}
