<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'

const t = useTranslate({
  'zh-CN': {
    type: '按钮类型',
    size: '按钮尺寸',
    icon: '图标按钮',
    loading: '加载状态',
    shape: '按钮形状',
    default: '默认按钮',
    primary: '主要按钮',
    success: '成功按钮',
    danger: '危险按钮',
    warning: '警告按钮',
    large: '大号按钮',
    normal: '普通按钮',
    small: '小型按钮',
    mini: '迷你按钮',
    plain: '朴素按钮',
    square: '方形按钮',
    round: '圆形按钮',
    hairline: '细边框',
    hairlineButton: '细边框按钮',
    loadingText: '加载中...',
    router: '页面导航',
    urlRoute: 'URL 跳转',
    vueRoute: '路由跳转',
    customColor: '自定义颜色',
    pure: '单色按钮',
    gradient: '渐变色按钮',
    blockElement: '块级元素',
    animatedButton: '动画按钮',
    doTask: '做任务',
    lottery: '抽大奖',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('type')">
      <van-row :gutter="[0, 12]">
        <van-col :span="8">
          <van-button type="primary">
            {{ t('primary') }}
          </van-button>
        </van-col>
        <van-col :span="8">
          <van-button type="success">
            {{ t('success') }}
          </van-button>
        </van-col>
        <van-col :span="8">
          <van-button type="default">
            {{ t('default') }}
          </van-button>
        </van-col>
        <van-col :span="8">
          <van-button type="danger">
            {{ t('danger') }}
          </van-button>
        </van-col>
        <van-col :span="8">
          <van-button type="warning">
            {{ t('warning') }}
          </van-button>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('plain')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            plain
            type="primary"
            :text="t('plain')"
          />
        </van-col>
        <van-col>
          <van-button
            plain
            type="success"
            :text="t('plain')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('hairline')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            plain
            hairline
            type="primary"
            :text="t('hairlineButton')"
          />
        </van-col>
        <van-col>
          <van-button
            plain
            hairline
            type="success"
            :text="t('hairlineButton')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            disabled
            type="primary"
            :text="t('disabled')"
          />
        </van-col>
        <van-col>
          <van-button
            disabled
            type="success"
            :text="t('disabled')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('loadingStatus')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            loading
            type="primary"
          />
        </van-col>
        <van-col>
          <van-button
            loading
            type="primary"
            loading-type="spinner"
          />
        </van-col>
        <van-col>
          <van-button
            loading
            :loading-text="t('loadingText')"
            type="success"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('shape')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            type="primary"
            square
            :text="t('square')"
          />
        </van-col>
        <van-col>
          <van-button
            type="success"
            round
            :text="t('round')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('icon')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            type="primary"
            icon="plus"
          />
        </van-col>
        <van-col>
          <van-button
            type="primary"
            icon="plus"
            :text="t('button')"
          />
        </van-col>
        <van-col>
          <van-button
            plain
            type="primary"
            :icon="cdnURL('user-active.png')"
            :text="t('button')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('size')">
      <van-row :gutter="6">
        <van-col>
          <van-button
            type="primary"
            size="large"
          >
            {{ t('large') }}
          </van-button>
        </van-col>
        <van-col>
          <van-button
            type="primary"
            size="normal"
          >
            {{ t('normal') }}
          </van-button>
        </van-col>
        <van-col>
          <van-button
            type="primary"
            size="small"
          >
            {{ t('small') }}
          </van-button>
        </van-col>
        <van-col>
          <van-button
            type="primary"
            size="mini"
          >
            {{ t('mini') }}
          </van-button>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('blockElement')">
      <van-button
        type="primary"
        block
      >
        {{ t('blockElement') }}
      </van-button>
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-row :gutter="16">
        <van-col>
          <van-button
            color="#7232dd"
            :text="t('pure')"
          />
        </van-col>
        <van-col>
          <van-button
            plain
            color="#7232dd"
            :text="t('pure')"
          />
        </van-col>
        <van-col>
          <van-button
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            :text="t('gradient')"
          />
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('animatedButton')">
      <van-button
        type="danger"
        round
      >
        <swiper
          class="w-16 h-10 leading-10"
          vertical
          circular
          :autoplay="true"
          :disable-touch="true"
          :show-indicators="false"
        >
          <swiper-item>{{ t('doTask') }}</swiper-item>
          <swiper-item>{{ t('lottery') }}</swiper-item>
        </swiper>
      </van-button>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
