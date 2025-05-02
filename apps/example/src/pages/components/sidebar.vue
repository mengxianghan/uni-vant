<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    title: '标签名',
    disabled: '禁用选项',
    showBadge: '徽标提示',
    changeEvent: '监听切换事件',
  },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

const onChange = index => uni.showToast({ title: `标签名 ${index + 1}`, icon: 'none' })
</script>

<template>
  <view class="demo-doc demo-sidebar">
    <van-grid
      :column-num="2"
      :border="false"
    >
      <van-grid-item>
        <view class="demo-sidebar-title">
          {{ t('basicUsage') }}
        </view>
        <van-sidebar v-model="active1">
          <van-sidebar-item :title="t('title')" />
          <van-sidebar-item :title="t('title')" />
          <van-sidebar-item :title="t('title')" />
        </van-sidebar>
      </van-grid-item>

      <van-grid-item>
        <view class="demo-sidebar-title">
          {{ t('showBadge') }}
        </view>
        <van-sidebar v-model="active2">
          <van-sidebar-item
            :title="t('title')"
            dot
          />
          <van-sidebar-item
            :title="t('title')"
            badge="5"
          />
          <van-sidebar-item :title="t('title')" />
        </van-sidebar>
      </van-grid-item>

      <van-grid-item>
        <view class="demo-sidebar-title">
          {{ t('disabled') }}
        </view>
        <van-sidebar v-model="active3">
          <van-sidebar-item :title="t('title')" />
          <van-sidebar-item
            :title="t('title')"
            disabled
          />
          <van-sidebar-item :title="t('title')" />
        </van-sidebar>
      </van-grid-item>

      <van-grid-item>
        <view class="demo-sidebar-title">
          {{ t('changeEvent') }}
        </view>
        <van-sidebar
          v-model="active4"
          @change="onChange"
        >
          <van-sidebar-item :title="`${t('title')} 1`" />
          <van-sidebar-item :title="`${t('title')} 2`" />
          <van-sidebar-item :title="`${t('title')} 3`" />
        </van-sidebar>
      </van-grid-item>
    </van-grid>
  </view>
</template>

<style lang="scss" scoped>
.demo-sidebar {
  @apply h-screen bg-white;

  &-title {
    margin-bottom: 16px;
    font-weight: normal;
    font-size: 14px;
    @apply text-gray-500;
  }
}
</style>
