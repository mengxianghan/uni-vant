import type { ExtractPropTypes } from 'vue'
import { createNamespace, truthProp, unknownProp } from '../utils'

export const { name: cellGroupName, bem: cellGroupBem } = createNamespace('cell-group')

export const cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp,
  customClass: unknownProp,
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
