import type { ExtractPropTypes } from 'vue'
import { DURATION } from '../constants'
import { createNamespace, makeNumberProp, makeStringProp, unknownProp } from '../utils'

export const { name: transitionName, bem: transitionBem } = createNamespace('transition')

export const transitionProps = {
  duration: makeNumberProp(DURATION),
  name: makeStringProp('van-fade'),
  show: Boolean,
  destroyOnClose: Boolean,
  customClass: unknownProp,
  customStyle: unknownProp,
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>

export const transitionEmits = {
  beforeEnter: () => true,
  enter: () => true,
  afterEnter: () => true,
  beforeLeave: () => true,
  leave: () => true,
  afterLeave: () => true,
  click: (evt: MouseEvent) => evt instanceof Object,
  touchmove: (evt: TouchEvent) => evt instanceof Object,
}

export type TransitionEmits = typeof transitionEmits
