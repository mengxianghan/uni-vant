export const searchShape = ['square', 'round'] as const
export type SearchShape = (typeof searchShape)[number]
