export const circleType = ['2d'] as const
export type CircleType = (typeof circleType)[number]

export const circleStrokeLinecap = ['round', 'square', 'butt'] as const
export type CircleStrokeLinecap = (typeof circleStrokeLinecap)[number]

export const circleStartPosition = ['top', 'bottom', 'left', 'right'] as const
export type CircleStartPosition = (typeof circleStartPosition)[number]
