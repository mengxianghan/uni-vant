export const checkboxShape = ['square', 'round'] as const
export type CheckboxShape = (typeof checkboxShape)[number]

export const checkboxDirection = ['horizontal', 'vertical'] as const
export type CheckboxDirection = (typeof checkboxDirection)[number]

export const checkboxLabelPosition = ['left', 'right'] as const
export type CheckboxLabelPosition = (typeof checkboxLabelPosition)[number]
