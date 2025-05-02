<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { onMounted, ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    icon1: '客服',
    icon2: '购物车',
    icon3: '店铺',
    button1: '加入购物车',
    button2: '立即购买',
    iconBadge: '徽标提示',
    collected: '已收藏',
    clickIcon: '点击图标',
    clickButton: '点击按钮',
    customIconColor: '自定义图标颜色',
    customButtonColor: '自定义按钮颜色',
  },
})
const onClickIcon = () => uni.showToast({ title: '点击图标' })
const onClickButton = () => uni.showToast({ title: '点击按钮' })

const buttonRef = ref()

onMounted(() => {

})
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-action-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-action-bar-icon
          icon="chat-o"
          :text="t('icon1')"
          @click="onClickIcon"
        />
        <van-action-bar-icon
          icon="cart-o"
          :text="t('icon2')"
          @click="onClickIcon"
        />
        <van-action-bar-icon
          icon="shop-o"
          :text="t('icon3')"
          @click="onClickIcon"
        />
        <van-action-bar-button
          ref="buttonRef"
          type="danger"
          :text="t('button2')"
          @click="onClickButton"
        />
      </van-action-bar>
    </demo-block>

    <demo-block
      :title="t('iconBadge')"
      :card="false"
    >
      <van-action-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-action-bar-icon
          icon="chat-o"
          dot
          :text="t('icon1')"
        />
        <van-action-bar-icon
          icon="cart-o"
          badge="5"
          :text="t('icon2')"
        />
        <van-action-bar-icon
          icon="shop-o"
          badge="12"
          :text="t('icon3')"
        />
        <van-action-bar-button
          type="warning"
          :text="t('button1')"
        />
        <van-action-bar-button
          type="danger"
          :text="t('button2')"
        />
      </van-action-bar>
    </demo-block>

    <demo-block
      :title="t('customIconColor')"
      :card="false"
    >
      <van-action-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-action-bar-icon
          icon="chat-o"
          :text="t('icon1')"
          color="#ee0a24"
        />
        <van-action-bar-icon
          icon="cart-o"
          :text="t('icon2')"
        />
        <van-action-bar-icon
          icon="star"
          :text="t('collected')"
          color="#ff5000"
        />
        <van-action-bar-button
          type="warning"
          :text="t('button1')"
        />
        <van-action-bar-button
          type="danger"
          :text="t('button2')"
        />
      </van-action-bar>
    </demo-block>

    <demo-block
      :title="t('customButtonColor')"
      :card="false"
    >
      <van-action-bar
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-action-bar-icon
          icon="chat-o"
          :text="t('icon1')"
        />
        <van-action-bar-icon
          icon="cart-o"
          :text="t('icon2')"
        />
        <van-action-bar-button
          color="#be99ff"
          type="warning"
          :text="t('button1')"
        />
        <van-action-bar-button
          color="#7232dd"
          type="danger"
          :text="t('button2')"
        />
      </van-action-bar>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
