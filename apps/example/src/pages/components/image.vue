<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'

const t = useTranslate({
  'zh-CN': {
    fitMode: '填充模式',
    position: '图片位置',
    round: '圆形图片',
    loading: '加载中提示',
    error: '加载失败提示',
    defaultTip: '默认提示',
    customTip: '自定义提示',
    loadFail: '加载失败',
  },
})

const image = cdnURL('cat.jpeg')
const fits = ['scaleToFill', 'aspectFit', 'aspectFill']
</script>

<template>
  <view class="demo-doc demo-image">
    <demo-block :title="t('basicUsage')">
      <van-row :gutter="[20, 20]">
        <van-col :span="8">
          <van-image
            width="100"
            height="100"
            :src="image"
          />
          <view class="text">
            基础用法
          </view>
        </van-col>
        <van-col :span="8">
          <van-image :src="image" />
          <view class="text">
            不指定尺寸
          </view>
        </van-col>
        <van-col :span="8">
          <van-image
            :src="image"
            width="100"
          />
          <view class="text">
            只指定宽度
          </view>
        </van-col>
        <van-col :span="8">
          <van-image
            :src="image"
            height="80"
          />
          <view class="text">
            只指定高度
          </view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('fitMode')">
      <van-row :gutter="[20, 20]">
        <van-col
          v-for="fit in fits"
          :key="fit"
          span="8"
        >
          <van-image
            :fit="fit"
            width="100%"
            height="27vw"
            :src="image"
          />
          <view class="text">
            {{ fit }}
          </view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('round')">
      <van-row :gutter="[20, 20]">
        <van-col
          v-for="fit in fits"
          :key="fit"
          span="8"
        >
          <van-image
            round
            :fit="fit"
            width="100%"
            height="27vw"
            :src="image"
          />
          <view class="text">
            {{ fit }}
          </view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('loading')">
      <van-row :gutter="[20, 20]">
        <van-col span="8">
          <van-image
            width="100%"
            height="27vw"
          />
          <view class="text">
            {{ t('defaultTip') }}
          </view>
        </van-col>

        <van-col span="8">
          <van-image
            width="100%"
            height="27vw"
          >
            <template #loading>
              <van-loading
                type="spinner"
                size="20"
              />
            </template>
          </van-image>
          <view class="text">
            {{ t('customTip') }}
          </view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('error')">
      <van-row :gutter="[20, 20]">
        <van-col span="8">
          <van-image
            width="100%"
            height="27vw"
            src="x"
          />
          <view class="text">
            {{ t('defaultTip') }}
          </view>
        </van-col>

        <van-col span="8">
          <van-image
            width="100%"
            height="27vw"
            src="x"
          >
            <template #error>
              {{ t('loadFail') }}
            </template>
          </van-image>
          <view class="text">
            {{ t('customTip') }}
          </view>
        </van-col>
      </van-row>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.demo-image {
  .text {
    @apply mt-1 text-sm text-center text-gray-500;
  }
}
</style>
