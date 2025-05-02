import type { ExtractPropTypes, PropType } from 'vue'
import type { FloatingBubbleAxis, FloatingBubbleMagnetic } from './types'
import { createNamespace, makeNumberProp, makeStringProp } from '../utils'

export const { name: floatingBubbleName, bem: floatingBubbleBem } = createNamespace('floating-bubble')

export const floatingBubbleProps = {
  gap: makeNumberProp(24),
  icon: String,
  axis: makeStringProp<FloatingBubbleAxis>('y'),
  magnetic: String as PropType<FloatingBubbleMagnetic>,
}
export type FloatingBubbleProps = ExtractPropTypes<typeof floatingBubbleProps>

export const floatingBubbleEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
  offsetChange: (val: object) => val instanceof Object,
}
export type FloatingBubbleEmits = typeof floatingBubbleEmits
