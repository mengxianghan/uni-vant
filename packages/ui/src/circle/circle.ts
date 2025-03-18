import type { ExtractPropTypes } from 'vue'
import type { CircleStartPosition, CircleStrokeLinecap, CircleType } from './types'
import { createNamespace, isNumber, makeNumberProp, makeStringProp, truthProp } from '../utils'

export const { bem: circleBem, name: circleName } = createNamespace('circle')

export const circleProps = {
  currentRate: makeNumberProp(0),
  type: makeStringProp<CircleType>('2d'),
  size: makeNumberProp(100),
  color: { type: [String, Object], default: '#1989fa' },
  layerColor: makeStringProp('#fff'),
  fill: String,
  speed: makeNumberProp(50),
  text: String,
  strokeWidth: makeNumberProp(4),
  strokeLinecap: makeStringProp<CircleStrokeLinecap>('round'),
  clockwise: truthProp,
  startPosition: makeStringProp<CircleStartPosition>('top'),
}
export type CircleProps = ExtractPropTypes<typeof circleProps>

export const circleEmits = {
  'update:currentRate': (val: number) => isNumber(val),
}
export type CircleEmits = typeof circleEmits
