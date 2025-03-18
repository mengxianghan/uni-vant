<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    radio: '单选框',
    text1: '未选中禁用',
    text2: '选中且禁用',
    withCell: '搭配单元格组件使用',
    horizontal: '水平排列',
    leftLabel: '左侧文本',
    customIcon: '自定义图标',
    customColor: '自定义颜色',
    customShape: '自定义形状',
    customIconSize: '自定义大小',
    disableLabel: '禁用文本点击',
  },
})

const radio1 = ref('1')
const radio2 = ref('2')
const radio3 = ref('1')
const radio4 = ref('1')
const radio5 = ref('1')
const radioLabel = ref('1')
const radioSquare = ref('1')
const radioDot = ref('1')
const radioIconSize = ref('1')
const radioHorizontal = ref('1')
const radioLeftLabel = ref('1')
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-radio-group v-model="radio1">
        <van-radio name="1">
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio name="2">
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('horizontal')">
      <van-radio-group
        v-model="radioHorizontal"
        direction="horizontal"
      >
        <van-radio name="1">
          {{ t('radio') }} 1
        </van-radio>
        <van-radio name="2">
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-radio-group
        v-model="radio2"
        disabled
      >
        <van-radio name="1">
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio name="2">
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('customShape')">
      <van-radio-group
        v-model="radioSquare"
        shape="square"
      >
        <van-radio name="1">
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio name="2">
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
      <view class="h-2" />
      <van-radio-group
        v-model="radioDot"
        shape="dot"
      >
        <van-radio name="1">
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio name="2">
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-radio-group v-model="radio3">
        <van-radio
          name="1"
          checked-color="#ee0a24"
        >
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio
          name="2"
          checked-color="#ee0a24"
        >
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('customIconSize')">
      <van-radio-group v-model="radioIconSize">
        <van-radio
          name="1"
          icon-size="24px"
        >
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio
          name="2"
          icon-size="24px"
        >
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <van-radio-group v-model="radio4">
        <van-radio name="1">
          {{ t('radio') }} 1
          <template #icon>
            <van-image
              :src="radio4 === '1' ? cdnURL('user-active.png') : cdnURL('user-inactive.png')"
              width="20px"
              height="20px"
              fit="aspectFit"
            />
          </template>
        </van-radio>
        <view class="h-2" />
        <van-radio name="2">
          {{ t('radio') }} 2
          <template #icon>
            <van-image
              :src="radio4 === '2' ? cdnURL('user-active.png') : cdnURL('user-inactive.png')"
              height="16px"
              fit="aspectFit"
            />
          </template>
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('leftLabel')">
      <van-radio-group v-model="radioLeftLabel">
        <van-radio
          name="1"
          label-position="left"
        >
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio
          name="2"
          label-position="left"
        >
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block :title="t('disableLabel')">
      <van-radio-group v-model="radioLabel">
        <van-radio
          name="1"
          label-disabled
        >
          {{ t('radio') }} 1
        </van-radio>
        <view class="h-2" />
        <van-radio
          name="2"
          label-disabled
        >
          {{ t('radio') }} 2
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block
      :title="t('withCell')"
      :card="false"
    >
      <van-radio-group v-model="radio5">
        <van-cell-group inset>
          <van-cell
            clickable
            :title="t('radio') + 1"
            @click="radio5 = '1'"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell
            clickable
            :title="t('radio') + 2"
            @click="radio5 = '2'"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
