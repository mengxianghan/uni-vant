import type { ExtractPropTypes, PropType } from 'vue'
import type {
  UploaderAccept,
  UploaderAfterRead,
  UploaderBeforeRead,
  UploaderCapture,
  UploaderImageFit,
  UploaderMediaType,
  UploaderSizeType,
  UploaderVideoFit,
} from './types'
import {
  createNamespace,
  isObject,
  makeArrayProp,
  makeNumberProp,
  makeNumericProp,
  makeStringProp,
  numericProp,
  truthProp,
} from '../utils'

export const { name: uploaderName, bem: uploaderBem } = createNamespace('uploader')

export const uploaderProps = {
  name: makeNumericProp(''),
  accept: makeStringProp<UploaderAccept>('image'),
  sizeType: makeArrayProp<UploaderSizeType>(['original', 'compressed']),
  previewSize: numericProp,
  previewImage: truthProp,
  previewFullImage: truthProp,
  previewFile: truthProp,
  multiple: Boolean,
  disabled: Boolean,
  showUpload: truthProp,
  deletable: truthProp,
  capture: makeArrayProp<UploaderCapture>(['album', 'camera']),
  maxSize: {
    type: [Number, String, Function],
    default: Infinity,
  },
  maxCount: makeNumberProp(Infinity),
  uploadText: String,
  videoFit: makeStringProp<UploaderVideoFit>('contain'),
  imageFit: makeStringProp<UploaderImageFit>('scaleToFill'),
  useBeforeRead: Boolean,
  compressed: truthProp,
  maxDuration: makeNumberProp(60),
  mediaType: makeArrayProp<UploaderMediaType>(['image', 'video', 'mix']),
  extension: Array,
  showmenu: truthProp,
  uploadIcon: makeStringProp('photograph'),
  camera: makeStringProp('back'),
  // readonly: Boolean,
  reupload: Boolean,
  afterRead: Function as PropType<UploaderAfterRead>,
  beforeRead: Function as PropType<UploaderBeforeRead>,
  // beforeDelete: Function,
  referrerPolicy: makeStringProp('no-referrer'),
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>

export const uploaderEmits = {
  beforeRead: (file: object, detail: object) => isObject(file) && isObject(detail),
  afterRead: (file: object, detail: object) => isObject(file) && isObject(detail),
  oversize: (file: object, detail: object) => isObject(file) && isObject(detail),
  clickPreview: (item: object, file: object) => isObject(item) && isObject(file),
  clickReUpload: (item: object, file: object) => isObject(item) && isObject(file),
  delete: (item: object, file: object) => isObject(item) && isObject(file),
  error: (err: object) => isObject(err),
}
export type UploaderEmits = typeof uploaderEmits
