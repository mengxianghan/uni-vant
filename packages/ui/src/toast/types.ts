export const toastType = ['text', 'loading', 'success', 'fail', 'html'] as const
export type ToastType = (typeof toastType)[number]

export const toastPosition = ['top', 'middle', 'bottom'] as const
export type ToastPosition = (typeof toastPosition)[number]

export const toastWordBreak = ['break-all', 'break-word', 'normal'] as const
export type ToastWordBreak = (typeof toastWordBreak)[number]
