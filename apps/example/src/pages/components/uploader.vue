<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { cdnURL } from '@/utils'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    status: '上传状态',
    failed: '上传失败',
    upload: '上传文件',
    preview: '文件预览',
    maxSize: '限制上传大小',
    disabled: '禁用文件上传',
    maxCount: '限制上传数量',
    uploading: '上传中...',
    imageName: '图片名称',
    beforeRead: '上传前置处理',
    overSizeTip: '文件大小不能超过 500kb',
    invalidType: '请上传 jpg 格式图片',
    customUpload: '自定义上传样式',
    previewSize: '自定义预览大小',
    previewCover: '自定义预览样式',
    deleteMessage: '删除前置处理',
    customPreviewImage: '自定义单个图片预览',
    reupload: '开启覆盖上传',
  },
})

const fileList = ref([
  { url: cdnURL('leaf.jpeg'), isImage: true },
  { url: cdnURL('tree.jpeg'), isImage: true },
])

const fileList2 = ref([{ url: cdnURL('sand.jpeg'), isImage: true }])

const fileList3 = ref([])

const fileList4 = ref([{ url: cdnURL('sand.jpeg'), isImage: true }])

const fileList5 = ref([
  {
    url: cdnURL('sand.jpeg'),
    isImage: true,
    deletable: true,
    beforeDelete: () => {
      uni.showToast({ title: '删除前置处理', icon: 'none' })
    },
  },
  {
    url: cdnURL('tree.jpeg'),
    isImage: true,
    imageFit: 'contain',
  },
])

const statusFileList = ref([
  {
    url: cdnURL('leaf.jpeg'),
    status: 'uploading',
    message: '上传中...',
    isImage: true,
  },
  {
    url: cdnURL('tree.jpeg'),
    status: 'failed',
    message: '上传失败',
    isImage: true,
  },
])

const previewCoverFiles = ref([
  {
    url: cdnURL('leaf.jpeg'),
    isImage: true,
    file: {
      name: '图片名称',
    },
  },
])

const previewSizeFiles = ref([
  {
    url: cdnURL('leaf.jpeg'),
    isImage: true,
  },
])

function beforeRead(file) {
  if (Array.isArray(file)) {
    return true
  }
  if (file.type !== 'image/jpeg') {
    uni.showToast({ title: '请上传 jpg 格式图片', icon: 'none' })
    return false
  }
  return true
}

function afterRead(file) {
  // eslint-disable-next-line no-console
  console.log('info', file)
}

function setItemLoading(item) {
  item.status = 'uploading'
  item.message = '上传中...'

  setTimeout(() => {
    item.status = 'failed'
    item.message = '上传失败'
  }, 1000)
}

function afterReadFailed(item) {
  if (Array.isArray(item)) {
    item.forEach(setItemLoading)
  }
  else {
    setItemLoading(item)
  }
}

function onOversize(file, detail) {
  // eslint-disable-next-line no-console
  console.log(file, detail)
  uni.showToast({ title: '文件大小不能超过 500kb', icon: 'none' })
}

const fileList6 = ref([{ url: cdnURL('leaf.jpeg'), isImage: true }])
</script>

<template>
  <view class="pb-8 min-h-screen bg-white">
    <demo-block :title="t('basicUsage')">
      <van-uploader
        accept="image"
        :after-read="afterRead"
      />
    </demo-block>

    <demo-block :title="t('preview')">
      <van-uploader
        v-model="fileList"
        multiple
      />
    </demo-block>

    <demo-block :title="t('status')">
      <van-uploader
        v-model="statusFileList"
        :after-read="afterReadFailed"
      />
    </demo-block>

    <demo-block :title="t('maxCount')">
      <van-uploader
        v-model="fileList2"
        multiple
        :max-count="2"
      />
    </demo-block>

    <demo-block :title="t('maxSize')">
      <van-uploader
        v-model="fileList4"
        multiple
        :max-size="500 * 1024"
        @oversize="onOversize"
      />
    </demo-block>

    <demo-block :title="t('customUpload')">
      <van-uploader>
        <van-button
          type="primary"
          icon="plus"
        >
          上传文件
        </van-button>
      </van-uploader>
    </demo-block>

    <demo-block :title="t('previewCover')">
      <van-uploader v-model="previewCoverFiles">
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">
            {{ file.url }}
          </div>
        </template>
      </van-uploader>
    </demo-block>

    <demo-block :title="t('previewSize')">
      <van-uploader
        v-model="previewSizeFiles"
        preview-size="60"
      />
    </demo-block>

    <demo-block :title="t('beforeRead')">
      <van-uploader
        v-model="fileList3"
        :before-read="beforeRead"
      />
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-uploader
        :after-read="afterRead"
        disabled
      />
    </demo-block>

    <demo-block :title="t('customPreviewImage')">
      <van-uploader
        v-model="fileList5"
        multiple
        :deletable="false"
      />
    </demo-block>

    <demo-block :title="t('reupload')">
      <van-uploader
        v-model="fileList6"
        reupload
        :max-count="2"
      />
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
