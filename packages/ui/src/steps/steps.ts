import type { ExtractPropTypes, InjectionKey } from 'vue'
import type { StepsDirection } from './types'
import { createNamespace, isNumber, makeNumericProp, makeStringProp } from '../utils'

export const { name: stepsName, bem: stepsBem } = createNamespace('steps')

export interface StepsProvide {
  props: StepsProps
  onClickStep: (index: number) => void
}

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol(stepsName)

export const stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp<StepsDirection>('horizontal'),
  activeIcon: makeStringProp('checked'),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String,
}
export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  clickStep: (index: number) => isNumber(index),
}
export type StepsEmits = typeof stepsEmits
