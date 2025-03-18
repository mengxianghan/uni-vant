<script setup lang="ts">
import { useTranslate } from '@/composables'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    label: '地址',
    disabled: '禁用搜索框',
    inputAlign: '搜索框内容对齐',
    background: '自定义背景色',
    placeholder: '请输入搜索关键词',
    customButton: '自定义按钮',
    listenToEvents: '事件监听',
  },
  'en-US': {
    label: 'Address',
    disabled: 'Disabled',
    inputAlign: 'Input Align',
    background: 'Custom Background Color',
    placeholder: 'Placeholder',
    customButton: 'Custom Action Button',
    listenToEvents: 'Listen to Events',
  },
})

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')

const onSearch = val => uni.showToast({ title: val, icon: 'none' })
const onCancel = () => uni.showToast({ title: t('cancel'), icon: 'none' })
const onClickButton = () => uni.showToast({ title: value6.value, icon: 'none' })
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-search
        v-model="value1"
        :placeholder="t('placeholder')"
      />
    </demo-block>

    <demo-block
      :title="t('listenToEvents')"
      :card="false"
    >
      <form action="/">
        <van-search
          v-model="value5"
          :placeholder="t('placeholder')"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </demo-block>

    <demo-block
      :title="t('inputAlign')"
      :card="false"
    >
      <van-search
        v-model="value4"
        :placeholder="t('placeholder')"
        input-align="center"
      />
    </demo-block>

    <demo-block
      :title="t('disabled')"
      :card="false"
    >
      <van-search
        v-model="value3"
        :placeholder="t('placeholder')"
        disabled
      />
    </demo-block>

    <demo-block
      :title="t('background')"
      :card="false"
    >
      <van-search
        v-model="value2"
        :placeholder="t('placeholder')"
        shape="round"
        background="#4fc08d"
      />
    </demo-block>

    <demo-block
      :title="t('customButton')"
      :card="false"
    >
      <van-search
        v-model="value6"
        show-action
        :label="t('label')"
        :placeholder="t('placeholder')"
        @search="onSearch"
      >
        <template #action>
          <div @click="onClickButton">
            {{ t('search') }}
          </div>
        </template>
      </van-search>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
