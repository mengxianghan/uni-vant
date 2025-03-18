import type {Uni as _Uni} from '@dcloudio/types'

export {}

declare module 'vue' {
    export interface GlobalComponents {
    }
}

declare global {
    interface Uni extends _Uni {
        setPageStyle: (object: {
            style: Record<string, unknown>
        }) => void
    }
}