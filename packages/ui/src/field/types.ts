export const fieldTextAlign = ['left', 'center', 'right', 'top'] as const
export type FieldTextAlign = (typeof fieldTextAlign)[number]

export const fieldClearTrigger = ['always', 'focus'] as const
export type FieldClearTrigger = (typeof fieldClearTrigger)[number]

export const fieldFormatTrigger = ['onBlur', 'onChange'] as const
export type FieldFormatTrigger = (typeof fieldFormatTrigger)[number]

export const fieldValidateTrigger = ['onBlur', 'onChange', 'onSubmit'] as const
export type FieldValidateTrigger = (typeof fieldValidateTrigger)[number]

export const fieldType = ['text', 'number', 'idcard', 'digit', 'tel', 'safe-password', 'nickname', 'textarea'] as const
export type FieldType = (typeof fieldType)[number]
