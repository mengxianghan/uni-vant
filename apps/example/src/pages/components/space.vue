<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    vertical: '垂直排列',
    customSize: '自定义间距',
    align: '对齐方式',
    wrap: '自动换行',
  },
})

const align = ref('center')
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-space>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
      </van-space>
    </demo-block>

    <demo-block :title="t('vertical')">
      <van-space
        direction="vertical"
        fill
      >
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
      </van-space>
    </demo-block>

    <demo-block :title="t('customSize')">
      <van-space
        :size="20"
        style="margin-bottom: 16px"
      >
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
      </van-space>

      <van-space size="3rem">
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
        <van-button type="primary">
          {{ t('button') }}
        </van-button>
      </van-space>
    </demo-block>

    <demo-block :title="t('align')">
      <van-radio-group
        v-model="align"
        direction="horizontal"
      >
        <van-radio name="start">
          start
        </van-radio>
        <van-radio name="center">
          center
        </van-radio>
        <van-radio name="end">
          end
        </van-radio>
        <van-radio name="baseline">
          baseline
        </van-radio>
      </van-radio-group>
      <view class="mt-4 p-4 bg-[#f3f2f5]">
        <van-space :align="align">
          <van-button type="primary">
            {{ align }}
          </van-button>
          <view style="padding: 40px 20px; background: #fff">
            Block
          </view>
        </van-space>
      </view>
    </demo-block>

    <demo-block :title="t('wrap')">
      <van-space wrap>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
        <van-button
          type="primary"
          block
        >
          {{ t('button') }}
        </van-button>
      </van-space>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
