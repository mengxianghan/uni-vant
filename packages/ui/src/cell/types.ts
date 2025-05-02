export const cellArrowDirection = ['left', 'right', 'up', 'down'] as const
export type CellArrowDirection = (typeof cellArrowDirection)[number]

export const cellSize = ['normal', 'large'] as const
export type CellSize = (typeof cellSize)[number]
