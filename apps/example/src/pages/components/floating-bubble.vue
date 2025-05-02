<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    clickBubble: '点击气泡',
    freeMagnetic: '自由拖拽和磁吸',
    vModel: '双向绑定',
    basicUsageText: '在 x 轴默认位置，允许 y 轴方向拖拽',
    freeMagneticText: '允许 x 和 y 轴方向拖拽，吸附到 x 轴方向最近一边',
    vModelText: '使用 offset 控制位置，',
  },
  'en-US': {
    clickBubble: 'Click bubble',
    freeMagnetic: 'Free Magnetic',
    vModel: 'vModel',
    basicUsageText: 'In the default x position, drag in the y direction is allowed',
    freeMagneticText: 'Allow x and y drags to attach to the nearest side of the x axis',
    vModelText: 'Use offset to control the position,',
  },
})

function onOffsetChange(offset) {
  uni.showToast({ title: `x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`, icon: 'none' })
}

function onClick() {
  uni.showToast({ title: t('clickBubble'), icon: 'none' })
}

const activeName = ref(0)
const offset = ref({ x: 200, y: 400 })
</script>

<template>
  <view>
    <van-tabs v-model:active="activeName">
      <van-tab :title="t('basicUsage')">
        <view class="text">
          {{ t('basicUsageText') }}
        </view>
        <van-floating-bubble
          v-if="activeName === 0"
          icon="chat"
          @click="onClick"
        />
      </van-tab>
      <van-tab :title="t('freeMagnetic')">
        <view class="text">
          {{ t('freeMagneticText') }}
        </view>
        <van-floating-bubble
          v-if="activeName === 1"
          icon="chat"
          axis="xy"
          magnetic="x"
          @offset-change="onOffsetChange"
        />
      </van-tab>
      <van-tab :title="t('vModel')">
        <view class="text">
          {{ t('vModelText') }} x：{{ offset.x.toFixed(0) }} y:
          {{ offset.y.toFixed(0) }}
        </view>
        <van-floating-bubble
          v-if="activeName === 2"
          v-model:offset="offset"
          icon="chat"
          axis="xy"
        />
      </van-tab>
    </van-tabs>
  </view>
</template>

<style scoped lang="scss">
.text {
  text-align: center;
  padding: 100px 20px;
  font-size: 14px;
}
</style>
