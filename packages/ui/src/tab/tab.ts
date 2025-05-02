import type { ExtractPropTypes } from 'vue'
import { createNamespace, numericProp, truthProp, unknownProp } from '../utils'

export const { name: tabName, bem: tabBem } = createNamespace('tab')

export const tabProps = {
  dot: Boolean,
  name: numericProp,
  badge: numericProp,
  title: String,
  disabled: Boolean,
  titleClass: unknownProp,
  titleStyle: [String, Object],
  showZeroBadge: truthProp,
  icon: String,
  rightIcon: String,
}
export type TabProps = ExtractPropTypes<typeof tabProps>
