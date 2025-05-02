import type { ExtractPropTypes, InjectionKey } from 'vue'
import type { GridDirection, GridProvide } from './types'
import { createNamespace, makeNumericProp, makeStringProp, truthProp } from '../utils'

export const { name: gridName, bem: gridBem } = createNamespace('grid')

export const gridProps = {
  columnNum: makeNumericProp(4),
  iconSize: makeNumericProp('28px'),
  gutter: makeNumericProp(0),
  border: truthProp,
  center: truthProp,
  square: Boolean,
  clickable: Boolean,
  direction: makeStringProp<GridDirection>('vertical'),
  reverse: Boolean,
}
export type GridProps = ExtractPropTypes<typeof gridProps>

export const GRID_KEY: InjectionKey<GridProvide> = Symbol(gridName)
