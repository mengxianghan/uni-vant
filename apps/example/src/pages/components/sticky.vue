<script setup lang="ts">
import { useTranslate } from '@/composables'
import { onPageScroll } from '@dcloudio/uni-app'

const t = useTranslate({
  'zh-CN': {
    offsetTop: '吸顶距离',
    offsetBottom: '吸底距离',
    setContainer: '指定容器',
  },
  'en-US': {
    offsetTop: 'Offset Top',
    offsetBottom: 'Offset Bottom',
    setContainer: 'Set Container',
  },
})

const container = () => uni.createSelectorQuery().select('#container')
</script>

<template>
  <view class="demo-doc h-[200vh]">
    <demo-block :title="t('basicUsage')">
      <van-sticky
        position="top"
        :page-scroll="onPageScroll"
      >
        <view class="ml-4">
          <van-button type="primary">
            {{ t('basicUsage') }}
          </van-button>
        </view>
      </van-sticky>
    </demo-block>

    <demo-block :title="t('offsetTop')">
      <van-sticky
        :offset="50"
        :page-scroll="onPageScroll"
      >
        <view class="ml-[115px]">
          <van-button type="primary">
            {{ t('offsetTop') }}
          </van-button>
        </view>
      </van-sticky>
    </demo-block>

    <demo-block :title="t('setContainer')">
      <view
        id="container"
        class="h-[150px] bg-white"
      >
        <van-sticky
          :container="container"
          :page-scroll="onPageScroll"
        >
          <view class="ml-[215px]">
            <van-button type="warning">
              {{ t('setContainer') }}
            </van-button>
          </view>
        </van-sticky>
      </view>
    </demo-block>

    <demo-block :title="t('offsetBottom')">
      <view class="h-[200px]" />
      <van-sticky
        :offset="50"
        position="bottom"
        :page-scroll="onPageScroll"
      >
        <view class="ml-4">
          <van-button type="primary">
            {{ t('offsetBottom') }}
          </van-button>
        </view>
      </van-sticky>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
