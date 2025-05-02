<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    title2: '置灰',
    title3: '样式定制',
    strokeWidth: '线条粗细',
    transition: '过渡效果',
  },
  'en-US': {
    title2: 'Inactive',
    title3: 'Custom Style',
    strokeWidth: 'Stroke Width',
    transition: 'Transition',
  },
})

const percentage = ref(50)

const format = rate => Math.min(Math.max(rate, 0), 100)

function add() {
  percentage.value = format(percentage.value + 20)
}

function reduce() {
  percentage.value = format(percentage.value - 20)
}
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-progress :percentage="50" />
    </demo-block>

    <demo-block :title="t('strokeWidth')">
      <van-progress
        :percentage="50"
        stroke-width="8"
      />
    </demo-block>

    <demo-block :title="t('title2')">
      <van-progress
        inactive
        :percentage="50"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <van-row :gutter="[0, 20]">
        <van-col :span="24">
          <van-progress
            color="#f2826a"
            :percentage="25"
            :pivot-text="t('orange')"
          />
        </van-col>
        <van-col :span="24">
          <van-progress
            color="#ee0a24"
            :percentage="50"
            :pivot-text="t('red')"
          />
        </van-col>
        <van-col :span="24">
          <van-progress
            :percentage="75"
            :pivot-text="t('purple')"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('transition')">
      <van-progress :percentage="percentage" />
      <view class="mt-4">
        <van-row :gutter="12">
          <van-col>
            <van-button
              :text="t('add')"
              type="primary"
              size="small"
              @click="add"
            />
          </van-col>
          <van-col>
            <van-button
              :text="t('decrease')"
              type="danger"
              size="small"
              @click="reduce"
            />
          </van-col>
        </van-row>
      </view>
    </demo-block>
  </view>
</template>

<style scoped lang="scss"></style>
