<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'

const t = useTranslate({
  'zh-CN': {
    select: '选择',
    delete: '删除',
    collect: '收藏',
    title: '单元格',
    confirm: '确定删除吗？',
    cardTitle: '商品标题',
    beforeClose: '异步关闭',
    customContent: '自定义内容',
  },
  'en-US': {
    select: 'Select',
    delete: 'Delete',
    collect: 'Collect',
    title: 'Cell',
    confirm: 'Are you sure to delete?',
    cardTitle: 'Title',
    beforeClose: 'Before Close',
    customContent: 'Custom Content',
  },
})

const imageURL = cdnURL('ipad.jpeg')

function beforeClose({ position }) {
  switch (position) {
    case 'left':
    case 'cell':
    case 'outside':
      return true
    case 'right':
      return new Promise((resolve) => {
        uni.showModal({
          title: t('confirm'),
          success: (res) => {
            if (res.confirm) {
              resolve(true)
            }
            else if (res.cancel) {
              resolve(false)
            }
          },
        })
      })
  }
}
</script>

<template>
  <view class="demo-doc demo-swipe-cell">
    <demo-block :title="t('basicUsage')">
      <van-swipe-cell>
        <template #left>
          <van-button
            square
            type="primary"
            :text="t('select')"
          />
        </template>
        <van-cell
          :border="false"
          :title="t('title')"
          :value="t('content')"
        />
        <template #right>
          <van-button
            square
            type="danger"
            :text="t('delete')"
          />
          <van-button
            square
            type="primary"
            :text="t('collect')"
          />
        </template>
      </van-swipe-cell>
    </demo-block>

    <demo-block :title="t('customContent')">
      <van-swipe-cell>
        <van-card
          num="2"
          price="2.00"
          :desc="t('desc')"
          :title="t('cardTitle')"
          :thumb="imageURL"
        />
        <template #right>
          <van-button
            square
            type="danger"
            custom-class="delete-button"
            :text="t('delete')"
          />
        </template>
      </van-swipe-cell>
    </demo-block>

    <demo-block :title="t('beforeClose')">
      <van-swipe-cell :before-close="beforeClose">
        <template #left>
          <van-button
            square
            type="primary"
            :text="t('select')"
          />
        </template>
        <van-cell
          :border="false"
          :title="t('title')"
          :value="t('content')"
        />
        <template #right>
          <van-button
            square
            type="danger"
            :text="t('delete')"
          />
        </template>
      </van-swipe-cell>
    </demo-block>
  </view>
</template>

<style lang="scss">
.demo-swipe-cell {
  user-select: none;

  :deep(.van-card) {
    margin: 0;
    @apply bg-white;
  }

  :deep(.delete-button) {
    height: 100%;
  }
}
</style>
