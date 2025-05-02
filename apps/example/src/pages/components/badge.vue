<script setup lang="ts">
import { useTranslate } from '@/hooks'

const t = useTranslate({
  'zh-CN': {
    max: '最大值',
    standalone: '独立展示',
    customColor: '自定义颜色',
    customContent: '自定义徽标内容',
    customPosition: '自定义徽标位置',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-row :gutter="16">
        <van-col>
          <van-badge content="5">
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge content="10">
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge content="Hot">
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge dot>
            <view class="child" />
          </van-badge>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('max')">
      <van-row :gutter="16">
        <van-col>
          <van-badge
            content="20"
            max="9"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            content="50"
            max="20"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            content="200"
            max="99"
          >
            <view class="child" />
          </van-badge>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-row :gutter="16">
        <van-col>
          <van-badge
            content="5"
            color="#1989fa"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            content="10"
            color="#1989fa"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            dot
            color="#1989fa"
          >
            <view class="child" />
          </van-badge>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('customContent')">
      <van-row :gutter="16">
        <van-col>
          <van-badge>
            <view class="child" />
            <template #content>
              <van-icon name="success" />
            </template>
          </van-badge>
        </van-col>
        <van-col>
          <van-badge>
            <view class="child" />
            <template #content>
              <van-icon name="cross" />
            </template>
          </van-badge>
        </van-col>
        <van-col>
          <van-badge>
            <view class="child" />
            <template #content>
              <van-icon name="down" />
            </template>
          </van-badge>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('customPosition')">
      <van-row :gutter="16">
        <van-col>
          <van-badge
            content="10"
            position="top-left"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            content="10"
            position="bottom-left"
          >
            <view class="child" />
          </van-badge>
        </van-col>
        <van-col>
          <van-badge
            content="10"
            position="bottom-right"
          >
            <view class="child" />
          </van-badge>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('standalone')">
      <van-row :gutter="16">
        <van-col>
          <van-badge content="20" />
        </van-col>
        <van-col>
          <van-badge
            content="200"
            max="99"
          />
        </van-col>
      </van-row>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>
