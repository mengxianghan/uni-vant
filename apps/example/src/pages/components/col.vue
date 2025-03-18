<script setup lang="ts">
import { useTranslate } from '@/composables'

const t = useTranslate({
  'zh-CN': {
    title2: '在列元素之间增加间距',
    justify: '对齐方式',
    vertical: '垂直间距',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-row>
        <van-col span="8">
          span: 8
        </van-col>
        <van-col span="8">
          span: 8
        </van-col>
        <van-col span="8">
          span: 8
        </van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          span: 4
        </van-col>
        <van-col
          span="10"
          offset="4"
        >
          offset: 4, span: 10
        </van-col>
      </van-row>

      <van-row>
        <van-col
          offset="12"
          span="12"
        >
          offset: 12, span: 12
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('title2')">
      <van-row gutter="20">
        <van-col span="8">
          span: 8
        </van-col>
        <van-col span="8">
          span: 8
        </van-col>
        <van-col span="8">
          span: 8
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('vertical')">
      <div class="demo-vertical-space">
        <van-row :gutter="[20, 20]">
          <van-col span="12">
            span: 12
          </van-col>
          <van-col span="12">
            span: 12
          </van-col>
          <van-col span="12">
            span: 12
          </van-col>
          <van-col span="12">
            span: 12
          </van-col>
        </van-row>
      </div>
    </demo-block>

    <demo-block :title="t('justify')">
      <van-row justify="center">
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
      </van-row>

      <van-row justify="end">
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
      </van-row>

      <van-row justify="space-between">
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
      </van-row>

      <van-row justify="space-around">
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
        <van-col span="6">
          span: 6
        </van-col>
      </van-row>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
:deep(.van-col) {
  margin-bottom: 10px;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  background-clip: content-box;
  color: #fff;

  &:nth-child(odd) {
    background-color: #39a9ed;
  }

  &:nth-child(even) {
    background-color: #66c6f2;
  }
}
</style>
