import type { ImageFit } from '../image'
import type { Interceptor, Numeric } from '../utils'

export type UploaderImageFit = ImageFit

export type UploaderBeforeRead = (
  file: File | File[],
  detail: {
    name: Numeric
    index: number
  },
) => boolean | undefined | Promise<File | File[] | undefined>

export type UploaderAfterRead = (
  items: UploaderFileListItem | UploaderFileListItem[],
  detail: {
    name: Numeric
    index: number
  },
) => void

export type UploaderStatus = '' | 'uploading' | 'done' | 'failed'

export type UploaderVideoFit = 'contain' | 'fill' | 'cover'

export interface UploaderFileListItem {
  url?: string
  file?: File
  objectUrl?: string
  content?: string
  isImage?: boolean
  status?: UploaderStatus
  message?: string
  imageFit?: UploaderImageFit
  deletable?: boolean
  reupload?: boolean
  previewSize?: Numeric
  beforeDelete?: Interceptor
  thumb?: string
  name?: string
  isVideo?: boolean
  autoplay?: boolean
}

export type UploaderMediaType = 'image' | 'video' | 'mix'

export type UploaderCapture = 'album' | 'camera'

export type UploaderSizeType = 'original' | 'compressed'

export type UploaderAccept = 'image' | 'media' | 'video' | 'all'
