<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    close: '完成',
    input: '输入',
    title: '键盘标题',
    button1: '弹出默认键盘',
    button2: '弹出带右侧栏的键盘',
    button3: '弹出身份证号键盘',
    button4: '弹出带标题的键盘',
    button5: '弹出配置多个按键的键盘',
    button6: '弹出配置随机数字的键盘',
    bindValue: '双向绑定',
    clickToInput: '点此输入',
    extraKey: '左下角按键内容',
    multiExtraKey: '配置多个按键',
    randomKeyOrder: '随机数字键盘',
  },
})

const value = ref('')
const keyboard = ref('')

const onInput = value => uni.showToast({ title: `${t('input')}: ${value}`, icon: 'none' })
const onDelete = () => uni.showToast({ title: t('delete'), icon: 'none' })
const isTest = process.env.NODE_ENV === 'test'
</script>

<template>
  <view class="demo-doc">
    <demo-block card>
      <van-cell
        is-link
        :title="t('button1')"
        @click="keyboard = 'default'"
      />
      <van-cell
        is-link
        :title="t('button2')"
        @click="keyboard = 'custom'"
      />
      <van-cell
        is-link
        :title="t('button3')"
        @click="keyboard = 'extraKey'"
      />
      <van-cell
        is-link
        :title="t('button4')"
        @click="keyboard = 'title'"
      />
      <van-cell
        is-link
        :title="t('button5')"
        @click="keyboard = 'multiExtraKey'"
      />
      <van-cell
        is-link
        :title="t('button6')"
        @click="keyboard = 'randomKeyOrder'"
      />
      <van-field
        v-model="value"
        readonly
        clickable
        :label="t('bindValue')"
        :placeholder="t('clickToInput')"
        @click="keyboard = 'bindValue'"
      />
    </demo-block>

    <van-number-keyboard
      :show="keyboard === 'default'"
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      :show="keyboard === 'custom'"
      :close-button-text="t('close')"
      theme="custom"
      extra-key="."
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      :show="keyboard === 'extraKey'"
      :close-button-text="t('close')"
      extra-key="X"
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      :show="keyboard === 'title'"
      :close-button-text="t('close')"
      :title="t('title')"
      extra-key="."
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      :show="keyboard === 'multiExtraKey'"
      :close-button-text="t('close')"
      theme="custom"
      :extra-key="['00', '.']"
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      v-if="!isTest"
      :show="keyboard === 'randomKeyOrder'"
      random-key-order
      @blur="keyboard = ''"
      @input="onInput"
      @delete="onDelete"
    />

    <van-number-keyboard
      v-model="value"
      :show="keyboard === 'bindValue'"
      maxlength="6"
      @blur="keyboard = ''"
    />
  </view>
</template>

<style scoped lang="scss"></style>
