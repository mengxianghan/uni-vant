<script setup lang="ts">
import { useTranslate } from '@/composables'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    left: '左侧',
    right: '右侧',
    bottom: '底部',
    gradient: '渐变色',
    customSize: '大小定制',
    customStyle: '样式定制',
    customColor: '颜色定制',
    customWidth: '宽度定制',
    startPosition: '起始位置',
    counterClockwise: '逆时针',
  },
  'en-US': {
    left: 'Left',
    right: 'Right',
    bottom: 'Bottom',
    gradient: 'Gradient',
    customSize: 'Custom Size',
    customStyle: 'Custom Style',
    customColor: 'Custom Color',
    customWidth: 'Custom Width',
    startPosition: 'Start Position',
    counterClockwise: 'Counter Clockwise',
  },
})

const currentRate1 = ref(70)
const currentRate2 = ref(70)
const currentRate3 = ref(70)
const currentRate4 = ref(70)

const gradientColor = {
  '0%': '#3fecff',
  '100%': '#6149f6',
}

const format = rate => Math.min(Math.max(rate, 0), 100)

function add() {
  currentRate1.value = format(currentRate1.value + 20)
  currentRate2.value = format(currentRate2.value + 20)
  currentRate3.value = format(currentRate3.value + 20)
  currentRate4.value = format(currentRate4.value + 20)
}

function reduce() {
  currentRate1.value = format(currentRate1.value - 20)
  currentRate2.value = format(currentRate2.value - 20)
  currentRate3.value = format(currentRate3.value - 20)
  currentRate4.value = format(currentRate4.value - 20)
}
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-circle
        v-model:current-rate="currentRate1"
        :speed="100"
        :text="`${currentRate1.toFixed(0)}%`"
      />
    </demo-block>

    <demo-block :title="t('customStyle')">
      <van-row :gutter="[0, 12]">
        <van-col :span="8">
          <van-circle
            v-model:current-rate="currentRate3"
            :speed="100"
            :stroke-width="6"
            :text="t('customWidth')"
          />
        </van-col>
        <van-col :span="8">
          <van-circle
            v-model:current-rate="currentRate3"
            color="#ee0a24"
            layer-color="#ebedf0"
            :speed="100"
            :text="t('customColor')"
          />
        </van-col>
        <van-col :span="8">
          <van-circle
            v-model:current-rate="currentRate2"
            :speed="100"
            :color="gradientColor"
            :text="t('gradient')"
          />
        </van-col>
        <van-col :span="8">
          <van-circle
            v-model:current-rate="currentRate4"
            color="#07c160"
            :speed="100"
            :clockwise="false"
            :text="t('counterClockwise')"
          />
        </van-col>
        <van-col :span="8">
          <van-circle
            v-model:current-rate="currentRate4"
            color="#7232dd"
            :speed="100"
            :size="120"
            :clockwise="false"
            :text="t('customSize')"
          />
        </van-col>
      </van-row>

      <view class="mt-4">
        <van-row :gutter="16">
          <van-col>
            <van-button
              :text="t('add')"
              type="primary"
              size="small"
              @click="add"
            />
          </van-col>
          <van-col>
            <van-button
              :text="t('decrease')"
              type="danger"
              size="small"
              @click="reduce"
            />
          </van-col>
        </van-row>
      </view>
    </demo-block>

    <demo-block :title="t('startPosition')">
      <van-row :gutter="16">
        <van-col>
          <van-circle
            :current-rate="75"
            :text="t('left')"
            start-position="left"
          />
        </van-col>
        <van-col>
          <van-circle
            :current-rate="75"
            :text="t('right')"
            start-position="right"
          />
        </van-col>
        <van-col>
          <van-circle
            :current-rate="75"
            :text="t('bottom')"
            start-position="bottom"
          />
        </van-col>
      </van-row>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
