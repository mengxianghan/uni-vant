<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { cdnURL } from '@/utils'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    error: '通用错误',
    search: '搜索提示',
    network: '网络错误',
    imageType: '图片类型',
    customSize: '自定义大小',
    description: '描述文字',
    customImage: '自定义图片',
    bottomContent: '底部内容',
  },
})

const active = ref('error')
</script>

<template>
  <view class="demo-doc demo-empty">
    <demo-block :title="t('basicUsage')">
      <van-empty :description="t('description')" />
    </demo-block>

    <demo-block
      :title="t('imageType')"
      :card="false"
    >
      <van-tabs v-model:active="active">
        <van-tab
          name="error"
          :title="t('error')"
        >
          <van-empty
            image="error"
            :description="t('description')"
          />
        </van-tab>
        <van-tab
          name="network"
          :title="t('network')"
        >
          <van-empty
            image="network"
            :description="t('description')"
          />
        </van-tab>
        <van-tab
          name="search"
          :title="t('search')"
        >
          <van-empty
            image="search"
            :description="t('description')"
          />
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block :title="t('customSize')">
      <van-empty
        image-size="100"
        :description="t('description')"
      />
    </demo-block>

    <demo-block :title="t('customImage')">
      <van-empty
        :image="cdnURL('custom-empty-image.png')"
        :image-size="80"
        :description="t('description')"
      />
    </demo-block>

    <demo-block :title="t('bottomContent')">
      <van-empty :description="t('description')">
        <van-button
          round
          type="primary"
        >
          {{ t('button') }}
        </van-button>
      </van-empty>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.demo-empty {
  --van-data-tab-nav-background: transparent;
  --van-button-normal-padding: 0 56px;
}
</style>
