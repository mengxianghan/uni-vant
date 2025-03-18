<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'

const t = useTranslate({
  'zh-CN': {
    title: '商品名称',
    discountInfo: '营销信息',
    customContent: '自定义内容',
  },
  'en-US': {
    discountInfo: 'Discount Info',
    customContent: 'Custom Content',
  },
})

const imageURL = cdnURL('ipad.jpeg')
</script>

<template>
  <view class="demo-doc demo-card">
    <demo-block :title="t('basicUsage')">
      <van-card
        num="2"
        price="2.00"
        :desc="t('desc')"
        :title="t('title')"
        :thumb="imageURL"
      />
    </demo-block>

    <demo-block :title="t('discountInfo')">
      <van-card
        num="2"
        price="2.00"
        origin-price="10.00"
        :tag="t('tag')"
        :desc="t('desc')"
        :title="t('title')"
        :thumb="imageURL"
      />
    </demo-block>

    <demo-block :title="t('customContent')">
      <van-card
        num="2"
        price="2.00"
        :desc="t('desc')"
        :title="t('title')"
        :thumb="imageURL"
      >
        <template #tags>
          <van-tag
            plain
            type="primary"
            style="margin-right: 5px"
          >
            {{ t('tag') }}
          </van-tag>
          <van-tag
            plain
            type="primary"
          >
            {{ t('tag') }}
          </van-tag>
        </template>

        <template #footer>
          <van-button
            round
            size="mini"
          >
            {{ t('button') }}
          </van-button>
          <van-button
            round
            size="mini"
          >
            {{ t('button') }}
          </van-button>
        </template>
      </van-card>
    </demo-block>
  </view>
</template>

<style scoped lang="scss">
.demo-card {
  @apply bg-white;
}
</style>
