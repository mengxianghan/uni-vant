<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const { windowHeight } = uni.getSystemInfoSync()

const t = useTranslate({
  'zh-CN': {
    customAnchors: '自定义锚点',
    headDragOnly: '仅头部拖拽',
    panelShowHeight: '面板显示高度',
    contentUnDrag: '内容不可拖拽',
  },
})

const anchors = [100, Math.round(0.4 * windowHeight), Math.round(0.7 * windowHeight)]

const height = ref(anchors[0])
</script>

<template>
  <view>
    <van-tabs>
      <van-tab :title="t('basicUsage')">
        <van-floating-panel>
          <van-cell-group>
            <van-cell
              v-for="i in 26"
              :key="i"
              :title="String.fromCharCode(i + 64)"
              size="large"
            />
          </van-cell-group>
        </van-floating-panel>
      </van-tab>

      <van-tab :title="t('customAnchors')">
        <van-floating-panel
          v-model:height="height"
          :anchors="anchors"
        >
          <div style="text-align: center; padding: 15px">
            <p>{{ t('panelShowHeight') }} {{ height.toFixed(0) }} px</p>
          </div>
        </van-floating-panel>
      </van-tab>

      <van-tab :title="t('headDragOnly')">
        <van-floating-panel :content-draggable="false">
          <div style="text-align: center; padding: 15px">
            <p>{{ t('contentUnDrag') }}</p>
          </div>
        </van-floating-panel>
      </van-tab>
    </van-tabs>
  </view>
</template>

<style lang="scss" scoped></style>
