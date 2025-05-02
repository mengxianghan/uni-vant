export const radioLabelPosition = ['left', 'right']
export type RadioLabelPosition = (typeof radioLabelPosition)[number]

export const radioShape = ['square', 'round', 'dot'] as const
export type RadioShape = (typeof radioShape)[number]

export const radioDirection = ['horizontal', 'vertical'] as const
export type RadioDirection = (typeof radioDirection)[number]
