export const floatingBubbleAxis = ['x', 'y', 'xy', 'lock']
export type FloatingBubbleAxis = (typeof floatingBubbleAxis)[number]

export const floatingBubbleMagnetic = ['x', 'y']
export type FloatingBubbleMagnetic = (typeof floatingBubbleMagnetic)[number]

export interface FloatingBubbleOffset {
  x: number
  y: number
}

export interface FloatingBubbleBoundary {
  top: number
  right: number
  bottom: number
  left: number
}
