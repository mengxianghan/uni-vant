<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    title: '标题',
    confirm: '提醒',
    message: '是否切换开关？',
    withCell: '搭配单元格使用',
    customSize: '自定义大小',
    customNode: '自定义按钮',
    customColor: '自定义颜色',
    asyncControl: '异步控制',
  },
})

const checked = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(true)
const checked5 = ref(true)

function onUpdateValue(checked) {
  uni.showModal({
    title: t('title'),
    content: t('message'),
    showCancel: true,
    success: ({ confirm }) => {
      if (confirm) {
        checked4.value = checked
      }
    },
  })
}
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-switch v-model="checked" />
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-switch
        v-model="checked"
        disabled
      />
    </demo-block>

    <demo-block :title="t('loadingStatus')">
      <van-switch
        v-model="checked"
        loading
      />
    </demo-block>

    <demo-block :title="t('customSize')">
      <van-switch
        v-model="checked2"
        size="22px"
      />
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-switch
        v-model="checked3"
        active-color="#ee0a24"
        inactive-color="#dcdee0"
      />
    </demo-block>

    <demo-block :title="t('customNode')">
      <van-switch v-model="checked3">
        <template #node>
          <div class="icon-wrapper">
            <van-icon
              :name="checked3 ? 'success' : 'cross'"
              :size="16"
            />
          </div>
        </template>
      </van-switch>
    </demo-block>

    <demo-block :title="t('asyncControl')">
      <van-switch
        :model-value="checked4"
        @update:model-value="onUpdateValue"
      />
    </demo-block>

    <demo-block :title="t('withCell')">
      <van-cell
        center
        :title="t('title')"
      >
        <template #right-icon>
          <van-switch v-model="checked5" />
        </template>
      </van-cell>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
