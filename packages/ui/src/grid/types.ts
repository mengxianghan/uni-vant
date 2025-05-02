import type { GridProps } from './grid'

export const gridDirection = ['horizontal', 'vertical'] as const
export type GridDirection = (typeof gridDirection)[number]

export interface GridProvide {
  props: GridProps
}
