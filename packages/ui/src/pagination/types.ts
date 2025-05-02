export const paginationMode = ['simple', 'multi'] as const
export type PaginationMode = (typeof paginationMode)[number]
