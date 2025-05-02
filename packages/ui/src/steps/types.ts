export const stepsDirection = ['horizontal', 'vertical'] as const
export type StepsDirection = (typeof stepsDirection)[number]
