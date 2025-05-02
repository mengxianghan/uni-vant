<script lang="ts" setup>
import type { UploaderFileListItem } from './types'
import { computed, nextTick, ref, useSlots } from 'vue'
import VanIcon from '../icon/icon.vue'
import VanLoading from '../loading/loading.vue'
import {
  callInterceptor,
  getSizeStyle,
  isBoolean,
  isDef,
  isPromise,
  makeArrayProp,
  toArray,
} from '../utils'
import { uploaderBem as bem, uploaderName as name, uploaderEmits, uploaderProps } from './uploader'
import { chooseFile as _chooseFile, isImageFile, isVideoFile } from './utils'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(uploaderProps)

const emit = defineEmits(uploaderEmits)

const slots = useSlots()

const fileList = defineModel(makeArrayProp<UploaderFileListItem>())

const reUploadIndex = ref(-1)
const isReUploading = ref(false)

const isInCount = computed(() => fileList.value.length < props.maxCount)

function formatFileList(list) {
  return list.map(file => ({
    ...file,
    isImage: isImageFile(file),
    isVideo: isVideoFile(file),
    deletable: isBoolean(file.deletable) ? file.deletable : true,
  }))
}

function getDetail(index?: number) {
  return {
    name: props.name,
    index: index == null ? fileList.value.length : index,
  }
}

function onAfterRead(file) {
  file = formatFileList(toArray(file))
  const oversize = file.some(item => item.file.size > props.maxSize)

  if (oversize) {
    emit('oversize', file, getDetail())
    return
  }

  if (reUploadIndex.value > -1) {
    const arr = [...fileList.value]
    arr.splice(reUploadIndex.value, 1, ...file)
    fileList.value = arr
    reUploadIndex.value = -1
  }
  else {
    fileList.value.push(...file)
  }

  if (typeof props.afterRead === 'function') {
    props.afterRead(file, getDetail())
  }

  emit('afterRead', file, getDetail())
}

function onBeforeRead(file) {
  let res: any = true

  if (typeof props.beforeRead === 'function') {
    res = props.beforeRead(file, getDetail())
  }

  if (props.useBeforeRead) {
    res = new Promise((resolve, reject) => {
      emit('beforeRead', file, {
        ...getDetail(),
        callback: (ok) => {
          if (ok) {
            resolve(true)
          }
          else {
            reject(new Error('error'))
          }
        },
      })
    })
  }

  if (!res) {
    return
  }

  if (isPromise(res)) {
    res.then(data => onAfterRead(data || file))
  }
  else {
    onAfterRead(file)
  }
}

function chooseFile() {
  if (props.disabled)
    return

  _chooseFile({
    accept: props.accept,
    multiple: props.multiple && reUploadIndex.value === -1,
    capture: props.capture,
    compressed: props.compressed,
    maxDuration: props.maxDuration,
    sizeType: props.sizeType,
    camera: props.camera,
    maxCount: props.maxCount - fileList.value.length,
    mediaType: props.mediaType,
    extension: props.extension,
  })
    .then((res) => {
      onBeforeRead(props.multiple ? res : res[0])
    })
    .catch((error) => {
      emit('error', error)
    })
}

function onPreviewImage(item, index) {
  if (props.reupload) {
    reUploadFile(index)
    return
  }

  if (!props.previewFullImage)
    return

  uni.previewImage({
    urls: fileList.value.filter(item => isImageFile(item)).map(item => item.url),
    current: item.url,
    showmenu: props.showmenu,
    fail() {
      uni.showToast({ title: '预览图片失败', icon: 'none' })
    },
  })
}

function onPreviewVideo(item, index) {
  if (props.reupload) {
    reUploadFile(index)
    return
  }

  if (!props.previewFullImage)
    return

  const sources = []

  const current = fileList.value.reduce((sum, cur, curIndex) => {
    if (!isVideoFile(cur)) {
      return sum
    }

    sources.push({ ...cur, type: 'video' })

    if (curIndex < index) {
      sum++
    }

    return sum
  }, 0)

  uni.previewMedia({
    sources,
    current,
    fail() {
      uni.showToast({ title: '预览视频失败', icon: 'none' })
    },
  })
}

function onPreviewFile(item, index) {
  if (props.reupload) {
    reUploadFile(index)
    return
  }

  if (!props.previewFile)
    return

  uni.openDocument({
    filePath: item.url,
    showMenu: true,
  })
}

function onClickPreview(item, index) {
  if (props.reupload) {
    emit('clickReUpload', item, getDetail(index))
    return
  }
  emit('clickPreview', item, getDetail(index))
}

function onDeleteItem(item, index) {
  callInterceptor(item.beforeDelete, {
    args: [item, { name: item.name, index }],
    done: () => {
      fileList.value.splice(index, 1)
      emit('delete', item, getDetail(index))
    },
  })
}

function reUploadFile(index) {
  isReUploading.value = true
  reUploadIndex.value = index
  nextTick(() => chooseFile())
}

function startUpload() {
  if (!isReUploading.value) {
    reUploadIndex.value = -1
  }
  isReUploading.value = false
  chooseFile()
}
</script>

<template>
  <view :class="bem()">
    <view :class="bem('wrapper', { disabled: props.disabled })">
      <!-- 预览 -->
      <template
        v-for="(item, index) in fileList"
        :key="index"
      >
        <view
          :class="bem('preview')"
          :style="getSizeStyle(props.previewSize)"
          @click="onClickPreview(item, index)"
        >
          <template v-if="item.isImage">
            <image
              :class="bem('preview-image')"
              :src="item.thumb || item.url"
              :mode="props.imageFit"
              :alt="item.name || `图片${index}`"
              @click="onPreviewImage(item, index)"
            />
          </template>
          <template v-else-if="item.isVideo">
            <video
              :class="bem('preview-image')"
              :src="item.thumb || item.url"
              :title="item.name || `视频${index}`"
              :poster="item.thumb"
              :autoplay="item.autoplay"
              :object-fit="videoFit"
              :referrer-policy="referrerPolicy"
              @click="onPreviewVideo(item, index)"
            />
          </template>
          <template v-else>
            <view
              :class="bem('file')"
              @click="onPreviewFile(item, index)"
            >
              <view :class="bem('file-icon')">
                <van-icon name="description" />
              </view>
              <view
                class="van-ellipsis"
                :class="[bem('file-name')]"
              >
                {{ item.name || item.url }}
              </view>
            </view>
          </template>

          <!-- #ifdef H5 -->
          <template v-if="slots['preview-cover']">
            <view :class="bem('preview-cover')">
              <slot
                name="preview-cover"
                :file="item"
                :index="index"
              />
            </view>
          </template>
          <!-- #endif -->

          <template v-if="['uploading', 'failed'].includes(item.status)">
            <view :class="bem('mask')">
              <!-- 上传中 icon -->
              <template v-if="item.status === 'uploading'">
                <view :class="bem('loading')">
                  <van-loading />
                </view>
              </template>
              <!-- 上传失败 icon -->
              <template v-if="item.status === 'failed'">
                <view :class="bem('mask-icon')">
                  <van-icon name="close" />
                </view>
              </template>
              <template v-if="item.message">
                <view :class="bem('mask-message')">
                  {{ item.message }}
                </view>
              </template>
            </view>
          </template>

          <!-- 删除按钮 -->
          <template v-if="props.deletable || item.deletable">
            <view
              :class="bem('preview-delete', ['shadow'])"
              @click.stop="onDeleteItem(item, index)"
            >
              <view :class="bem('preview-delete-icon')">
                <slot name="preview-delete">
                  <van-icon name="cross" />
                </slot>
              </view>
            </view>
          </template>
        </view>
      </template>

      <!-- 上传按钮 -->
      <template v-if="isInCount">
        <template v-if="slots.default">
          <view
            :class="bem('input-wrapper')"
            @click="startUpload"
          >
            <slot />
          </view>
        </template>
        <template v-else>
          <view
            :class="bem('upload')"
            :style="getSizeStyle(props.previewSize)"
            @click="startUpload"
          >
            <view :class="bem('upload-icon')">
              <van-icon name="photograph" />
            </view>
            <template v-if="isDef(props.uploadText)">
              <view :class="bem('upload-text')">
                {{ props.uploadText }}
              </view>
            </template>
          </view>
        </template>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
