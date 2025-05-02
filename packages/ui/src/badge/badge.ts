import type { ExtractPropTypes, PropType } from 'vue'
import type { BadgePosition } from './types'
import { createNamespace, makeStringProp, type Numeric, numericProp, truthProp } from '../utils'

export const { name: badgeName, bem: badgeBem } = createNamespace('badge')

export const badgeProps = {
  dot: Boolean,
  max: numericProp,
  color: String,
  offset: Array as unknown as PropType<[Numeric, Numeric]>,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp<BadgePosition>('top-right'),
}
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
