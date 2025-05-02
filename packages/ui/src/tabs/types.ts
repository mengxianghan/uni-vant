export const tabsType = ['line', 'card'] as const
export type TabsType = (typeof tabsType)[number]
