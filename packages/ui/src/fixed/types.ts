export const fixedPosition = ['top', 'bottom'] as const
export type FixedPosition = (typeof fixedPosition)[number]
