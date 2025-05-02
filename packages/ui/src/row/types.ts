export const rowAlign = ['top', 'center', 'bottom'] as const
export type RowAlign = (typeof rowAlign)[number]

export const rowJustify = ['start', 'end', 'center', 'space-around', 'space-between'] as const
export type RowJustify = (typeof rowJustify)[number]
