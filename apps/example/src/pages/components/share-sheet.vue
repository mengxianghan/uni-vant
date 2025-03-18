<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'
import { computed, ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    qq: 'QQ',
    name: '名称',
    link: '复制链接',
    title: '立即分享给好友',
    weibo: '微博',
    wechat: '微信',
    poster: '分享海报',
    qrcode: '二维码',
    multiLine: '展示多行选项',
    showSheet: '显示分享面板',
    withDesc: '展示描述信息',
    customIcon: '自定义图标',
    description: '描述信息',
    weappQrcode: '小程序码',
    wechatMoments: '朋友圈',
  },
  'en-US': {
    qq: 'QQ',
    name: 'Name',
    link: 'Link',
    title: 'Share',
    weibo: 'Weibo',
    wechat: 'WeChat',
    poster: 'Poster',
    qrcode: 'Qrcode',
    multiLine: 'Multi Line',
    showSheet: 'Show ShareSheet',
    withDesc: 'Show Description',
    customIcon: 'Custom Icon',
    description: 'Description',
    weappQrcode: 'Weapp Qrcode',
    wechatMoments: 'WeChat Moments',
  },
})

const showBasic = ref(false)
const showWithDesc = ref(false)
const showMultiLine = ref(false)
const showCustomIcon = ref(false)

const options = computed(() => [
  { name: t('wechat'), icon: 'wechat' },
  { name: t('weibo'), icon: 'weibo' },
  { name: t('link'), icon: 'link' },
  { name: t('poster'), icon: 'poster' },
  { name: t('qrcode'), icon: 'qrcode' },
])

const multiLineOptions = computed(() => [
  [
    { name: t('wechat'), icon: 'wechat' },
    { name: t('wechatMoments'), icon: 'wechat-moments' },
    { name: t('weibo'), icon: 'weibo' },
    { name: t('qq'), icon: 'qq' },
  ],
  [
    { name: t('link'), icon: 'link' },
    { name: t('poster'), icon: 'poster' },
    { name: t('qrcode'), icon: 'qrcode' },
    { name: t('weappQrcode'), icon: 'weapp-qrcode' },
  ],
])

const customIconOptions = computed(() => [
  {
    name: t('name'),
    icon: cdnURL('custom-icon-fire.png'),
  },
  {
    name: t('name'),
    icon: cdnURL('custom-icon-light.png'),
  },
  {
    name: t('name'),
    icon: cdnURL('custom-icon-water.png'),
  },
  { name: t('name'), icon: 'label' },
])

const optionsWithDesc = computed(() => [
  { name: t('wechat'), icon: 'wechat' },
  { name: t('weibo'), icon: 'weibo' },
  {
    name: t('link'),
    icon: 'link',
    description: t('description'),
  },
  { name: t('poster'), icon: 'poster' },
  { name: t('qrcode'), icon: 'qrcode' },
])

function onSelect(option) {
  uni.showToast({ title: option.name, icon: 'none' })
  showBasic.value = false
  showWithDesc.value = false
  showMultiLine.value = false
  showCustomIcon.value = false
}
</script>

<template>
  <view class="demo-doc">
    <demo-block
      card
      :title="t('basicUsage')"
    >
      <van-cell
        is-link
        :title="t('showSheet')"
        @click="showBasic = true"
      />
      <van-share-sheet
        v-model:show="showBasic"
        :title="t('title')"
        :options="options"
        @select="onSelect"
      />
    </demo-block>

    <demo-block
      card
      :title="t('multiLine')"
    >
      <van-cell
        is-link
        :title="t('showSheet')"
        @click="showMultiLine = true"
      />
      <van-share-sheet
        v-model:show="showMultiLine"
        :title="t('title')"
        :options="multiLineOptions"
        @select="onSelect"
      />
    </demo-block>

    <demo-block
      card
      :title="t('customIcon')"
    >
      <van-cell
        is-link
        :title="t('showSheet')"
        @click="showCustomIcon = true"
      />
      <van-share-sheet
        v-model:show="showCustomIcon"
        :options="customIconOptions"
        @select="onSelect"
      />
    </demo-block>

    <demo-block
      card
      :title="t('withDesc')"
    >
      <van-cell
        is-link
        :title="t('showSheet')"
        @click="showWithDesc = true"
      />
      <van-share-sheet
        v-model:show="showWithDesc"
        :title="t('title')"
        :options="optionsWithDesc"
        :description="t('description')"
        @select="onSelect"
      />
    </demo-block>
  </view>
</template>

<style scoped lang="scss"></style>
