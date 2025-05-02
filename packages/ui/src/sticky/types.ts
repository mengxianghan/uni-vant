export const stickyPosition = ['top', 'bottom'] as const
export type StickyPosition = (typeof stickyPosition)[number]
