<script setup lang="ts">
import { useTranslate } from '@/composables'

const t = useTranslate({
  'zh-CN': {
    tip1: '你的收货地址不支持配送',
    tip2: '你的收货地址不支持配送, ',
    tip3: '修改地址',
    check: '全选',
    submit: '提交订单',
    clickLink: '修改地址',
    clickButton: '点击按钮',
  },
  'en-US': {
    tip1: 'Some tips',
    tip2: 'Some tips, ',
    tip3: 'Link',
    check: 'Label',
    submit: 'Submit',
    clickLink: 'Click Link',
    clickButton: 'Submit',
  },
})

const onSubmit = () => uni.showToast({ title: '点击按钮' })
const onClickLink = () => uni.showToast({ title: '修改地址' })
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-submit-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
        :price="3050"
        :button-text="t('submit')"
        @submit="onSubmit"
      />
    </demo-block>

    <demo-block
      :title="t('disabled')"
      :card="false"
    >
      <van-submit-bar
        disabled
        :fixed="false"
        :safe-area-inset-bottom="false"
        :price="3050"
        :button-text="t('submit')"
        :tip="t('tip1')"
        tip-icon="info-o"
        @submit="onSubmit"
      />
    </demo-block>

    <demo-block
      :title="t('loadingStatus')"
      :card="false"
    >
      <van-submit-bar
        loading
        :fixed="false"
        :safe-area-inset-bottom="false"
        :price="3050"
        :button-text="t('submit')"
        @submit="onSubmit"
      />
    </demo-block>

    <demo-block
      :title="t('advancedUsage')"
      :card="false"
    >
      <van-submit-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
        :price="3050"
        :button-text="t('submit')"
        @submit="onSubmit"
      >
        <van-checkbox>{{ t('check') }}</van-checkbox>
        <template #tip>
          {{ t('tip2') }}
          <span
            class="edit-address"
            @click="onClickLink"
          >
            {{ t('tip3') }}
          </span>
        </template>
      </van-submit-bar>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
