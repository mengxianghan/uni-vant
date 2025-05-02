import type { ExtractPropTypes, PropType } from 'vue'
import type { Interceptor, Numeric } from '../utils'
import type { TabsType } from './types.ts'
import { createNamespace, isDef, makeNumericProp, makeStringProp, numericProp, truthProp } from '../utils'

export const { name: tabsName, bem: tabsBem } = createNamespace('tabs')

export const TABS_KEY = Symbol(tabsName)

export const tabsProps = {
  type: makeStringProp<TabsType>('line'),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  // active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  showHeader: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function as PropType<Interceptor>,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String,
  pageScroll: Function as PropType<() => void>,
  useNameSlot: Boolean,
  showContent: truthProp,
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsEmits = {
  change: (name: Numeric, title: Numeric) => isDef(name) && isDef(title),
  scroll: () => true,
  rendered: (name: Numeric, title: Numeric) => isDef(name) && isDef(title),
  clickTab: (val: object) => val instanceof Object,
}

export type TabsEmits = typeof tabsEmits
