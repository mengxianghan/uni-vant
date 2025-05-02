<script setup lang="ts">
import { useTranslate } from '@/hooks'

const t = useTranslate({
  'zh-CN': {
    mode: '通知栏模式',
    text1: '无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。',
    text2: '不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。',
    haiku: '米袋虽空——樱花开哉！',
    poetry1: '明月直入，无心可猜。',
    poetry2: '仙人抚我顶，结发受长生。',
    poetry3: '今人不见古时月，今月曾经照古人。',
    wrapable: '多行展示',
    scrollable: '滚动播放',
    customStyle: '自定义样式',
    verticalScroll: '垂直滚动',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-notice-bar
        :text="t('text1')"
        scrollable
        left-icon="volume-o"
      />
    </demo-block>

    <demo-block
      :title="t('scrollable')"
      :card="false"
    >
      <van-notice-bar
        scrollable
        :text="t('haiku')"
      />
      <view class="h-1" />
      <van-notice-bar
        :scrollable="false"
        :text="t('text2')"
      />
    </demo-block>

    <demo-block
      :title="t('wrapable')"
      :card="false"
    >
      <van-notice-bar
        wrapable
        :scrollable="false"
        :text="t('text2')"
      />
    </demo-block>

    <demo-block
      :title="t('mode')"
      :card="false"
    >
      <van-notice-bar
        mode="closeable"
        :text="t('haiku')"
      />
      <view class="h-1" />
      <van-notice-bar
        mode="link"
        :text="t('haiku')"
      />
    </demo-block>

    <demo-block
      :title="t('customStyle')"
      :card="false"
    >
      <van-notice-bar
        :text="t('haiku')"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      />
    </demo-block>

    <demo-block
      :title="t('verticalScroll')"
      :card="false"
    >
      <van-notice-bar
        left-icon="volume-o"
        :scrollable="false"
        :ellipsis="false"
      >
        <swiper
          class="notice-swipe"
          vertical
          autoplay
          disable-touch
          circular
          :show-indicators="false"
        >
          <swiper-item>{{ t('poetry1') }}</swiper-item>
          <swiper-item>{{ t('poetry2') }}</swiper-item>
          <swiper-item>{{ t('poetry3') }}</swiper-item>
        </swiper>
      </van-notice-bar>
    </demo-block>
  </view>
</template>

<style scoped lang="scss">
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
