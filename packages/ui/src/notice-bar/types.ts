export const noticeBarMode = ['closeable', 'link'] as const
export type NoticeBarMode = (typeof noticeBarMode)[number]
