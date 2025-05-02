export const tagType = ['default', 'primary', 'success', 'warning', 'danger'] as const
export type TagType = (typeof tagType)[number]

export const tagSize = ['large', 'medium'] as const
export type TagSize = (typeof tagSize)[number]
