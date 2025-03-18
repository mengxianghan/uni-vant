import type { ExtractPropTypes } from 'vue'
import { createNamespace, numericProp } from '../utils'

export const { name: tabbarItemName, bem: tabbarItemBem } = createNamespace('tabbar-item')

export const tabbarItemProps = {
  name: numericProp,
  icon: String,
  iconPrefix: String,
  dot: Boolean,
  badge: numericProp,
  badgeProps: Object,
}
export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
