<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    title2: '简单模式',
    title3: '显示省略号',
    title4: '自定义按钮（仅 h5 兼容）',
    prevText: '上一页',
    nextText: '下一页',
  },
  'en-US': {
    title2: 'Simple Mode',
    title3: 'Show ellipses',
    title4: 'Custom Button',
    prevText: 'Prev',
    nextText: 'Next',
  },
})

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)
</script>

<template>
  <view class="demo-doc h-screen bg-white">
    <demo-block :title="t('basicUsage')">
      <van-pagination
        v-model="currentPage1"
        :total-items="24"
        :items-per-page="5"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
      />
    </demo-block>

    <demo-block :title="t('title2')">
      <van-pagination
        v-model="currentPage2"
        :page-count="12"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
        mode="simple"
        size="small"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <van-pagination
        v-model="currentPage3"
        force-ellipses
        :total-items="125"
        :show-page-size="3"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
      />
    </demo-block>

    <demo-block :title="t('title4')">
      <van-pagination
        v-model="currentPage4"
        :total-items="125"
        :show-page-size="5"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
        <template #page="{ text }">
          {{ text }}
        </template>
      </van-pagination>
    </demo-block>
  </view>
</template>

<style scoped lang="scss"></style>
