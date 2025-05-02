<script setup lang="ts">
import { useTranslate } from '@/hooks'

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    dashed: '虚线',
    withText: '展示文本',
    contentPosition: '内容位置',
    customStyle: '自定义样式',
    vertical: '垂直',
  },
})
</script>

<template>
  <view class="demo-doc demo-divider">
    <demo-block :title="t('basicUsage')">
      <van-divider />
    </demo-block>

    <demo-block :title="t('withText')">
      <van-divider>
        {{ t('text') }}
      </van-divider>
    </demo-block>

    <demo-block :title="t('contentPosition')">
      <van-divider content-position="left">
        {{ t('text') }}
      </van-divider>

      <van-divider content-position="right">
        {{ t('text') }}
      </van-divider>
    </demo-block>

    <demo-block :title="t('dashed')">
      <van-divider
        dashed
        :hairline="false"
      >
        {{ t('text') }}
      </van-divider>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <van-divider :custom-style="{ borderColor: '#1989fa', color: '#1989fa', padding: '0 16px' }">
        {{ t('text') }}
      </van-divider>
    </demo-block>

    <demo-block :title="t('vertical')">
      <div class="content">
        <van-divider vertical />
        {{ t('text') }}
        <van-divider
          vertical
          dashed
        />
        {{ t('text') }}
        <van-divider
          vertical
          :hairline="false"
        />
        {{ t('text') }}
        <van-divider
          vertical
          :custom-style="{ borderColor: '#1989fa' }"
        />
      </div>
    </demo-block>
  </view>
</template>

<style lang="scss">
.demo-divider {
  @apply bg-white;
}
</style>
