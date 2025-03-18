import type { ExtractPropTypes, PropType } from 'vue'
import type { SpaceAlign, SpaceDirection } from './types.ts'
import { createNamespace, makeStringProp, type Numeric } from '../utils'

export const { name: spaceName, bem: spaceBem } = createNamespace('space')

export const spaceProps = {
  direction: makeStringProp<SpaceDirection>('horizontal'),
  size: { type: [Number, String, Array] as PropType<Numeric | [Numeric, Numeric]>, default: 8 },
  align: String as PropType<SpaceAlign>,
  wrap: Boolean,
  fill: Boolean,
}
export type SpaceProps = ExtractPropTypes<typeof spaceProps>
