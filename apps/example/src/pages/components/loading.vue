<script setup lang="ts">
import { useTranslate } from '@/composables'

const t = useTranslate({
  'zh-CN': {
    type: '加载类型',
    text: '加载文案',
    size: '自定义大小',
    color: '自定义颜色',
    vertical: '垂直排列',
    textColor: '自定义文本颜色',
    customIcon: '自定义图标',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('type')">
      <van-row :gutter="20">
        <van-col>
          <van-loading />
        </van-col>
        <van-col>
          <van-loading type="spinner" />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('color')">
      <van-row :gutter="20">
        <van-col>
          <van-loading color="#1989fa" />
        </van-col>
        <van-col>
          <van-loading
            type="spinner"
            color="#1989fa"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('size')">
      <van-row :gutter="20">
        <van-col>
          <van-loading size="24" />
        </van-col>
        <van-col>
          <van-loading
            type="spinner"
            size="24"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('text')">
      <van-loading size="24px">
        {{ t('loading') }}
      </van-loading>
    </demo-block>

    <demo-block :title="t('vertical')">
      <van-loading
        size="24px"
        vertical
      >
        {{ t('loading') }}
      </van-loading>
    </demo-block>

    <demo-block :title="t('textColor')">
      <van-row :gutter="20">
        <van-col>
          <van-loading
            size="24px"
            vertical
            color="#0094ff"
          >
            {{ t('loading') }}
          </van-loading>
        </van-col>
        <van-col>
          <van-loading
            size="24px"
            vertical
            text-color="#0094ff"
          >
            {{ t('loading') }}
          </van-loading>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <van-loading vertical>
        <template #icon>
          <van-icon
            name="star-o"
            size="30"
          />
        </template>
        {{ t('loading') }}
      </van-loading>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
