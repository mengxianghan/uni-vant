<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { cdnURL } from '@/utils'

const t = useTranslate({
  'zh-CN': {
    text: '文字',
    route: '页面导航',
    gutter: '格子间距',
    square: '正方形格子',
    columnNum: '自定义列数',
    customContent: '自定义内容',
    urlRoute: 'URL 跳转',
    vueRoute: '路由跳转',
    showBadge: '徽标提示',
    horizontal: '内容横排',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-grid>
        <van-grid-item
          v-for="i in 4"
          :key="i"
          icon="photo-o"
          :text="t('text')"
        />
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('columnNum')"
      :card="false"
    >
      <van-grid :column-num="3">
        <van-grid-item
          v-for="i in 6"
          :key="i"
          icon="photo-o"
          :text="t('text')"
        />
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :card="false"
    >
      <van-grid
        :border="false"
        :column-num="3"
      >
        <van-grid-item>
          <van-image
            fit="aspectFit"
            width="80px"
            :src="cdnURL('apple-1.jpeg')"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
            fit="aspectFit"
            width="80px"
            :src="cdnURL('apple-2.jpeg')"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
            fit="aspectFit"
            width="80px"
            :src="cdnURL('apple-3.jpeg')"
          />
        </van-grid-item>
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('square')"
      :card="false"
    >
      <van-grid square>
        <van-grid-item
          v-for="i in 8"
          :key="i"
          icon="photo-o"
          :text="t('text')"
        />
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('gutter')"
      :card="false"
    >
      <van-grid :gutter="10">
        <van-grid-item
          v-for="i in 8"
          :key="i"
          icon="photo-o"
          :text="t('text')"
        />
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('horizontal')"
      :card="false"
    >
      <van-grid
        direction="horizontal"
        :column-num="3"
      >
        <van-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <van-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <van-grid-item
          icon="photo-o"
          :text="t('text')"
        />
      </van-grid>
    </demo-block>

    <demo-block
      :title="t('showBadge')"
      :card="false"
    >
      <van-grid :column-num="2">
        <van-grid-item
          icon="home-o"
          :text="t('text')"
          dot
        />
        <van-grid-item
          icon="search"
          :text="t('text')"
          badge="99+"
        />
      </van-grid>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
