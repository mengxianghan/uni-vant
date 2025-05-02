<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    setZIndex: '设置 z-index',
    showOverlay: '显示遮罩层',
    embeddedContent: '嵌入内容',
  },
  'en-US': {
    setZIndex: 'Set z-index',
    showOverlay: 'Show Overlay',
    embeddedContent: 'Embedded Content',
  },
})

const show = ref(false)
const showEmbedded = ref(false)
const showZIndex = ref(false)
</script>

<template>
  <view class="demo-doc demo-overlay">
    <demo-block :title="t('basicUsage')">
      <van-button
        type="primary"
        :text="t('showOverlay')"
        @click="show = true"
      />
      <van-overlay
        :show="show"
        @click="show = false"
      />
    </demo-block>

    <demo-block :title="t('embeddedContent')">
      <van-button
        type="primary"
        :text="t('embeddedContent')"
        @click="showEmbedded = true"
      />
      <van-overlay
        :show="showEmbedded"
        @click="showEmbedded = false"
      >
        <view class="wrapper">
          <view class="block" />
        </view>
      </van-overlay>
    </demo-block>

    <demo-block :title="t('setZIndex')">
      <van-button
        type="primary"
        :text="t('setZIndex')"
        @click="showZIndex = true"
      />
      <van-overlay
        :show="showZIndex"
        z-index="100"
        @click="showZIndex = false"
      />
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.demo-overlay {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 4px;
  }
}
</style>
