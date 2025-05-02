<script lang="ts" setup>
import { computed, normalizeStyle, ref, useSlots } from 'vue'
import { cellBem } from '../cell'
import { fieldBem } from '../field'
import VanIcon from '../icon/icon.vue'
import { isDef, type Numeric } from '../utils'
import { searchBem as bem, searchName as name, searchProps } from './search'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(searchProps)

const emit = defineEmits([
  'search',
  'focus',
  'blur',
  'clickInput',
  'clickLeftIcon',
  'clickRightIcon',
  'clear',
  'cancel',
  'change',
])

const slots = useSlots()

const modelValue = defineModel<Numeric>()
const isFocus = ref(false)

const hasLeftIcon = computed(() => isDef(props.leftIcon) || slots.leftIcon)
const hasLabel = computed(() => isDef(props.label) || slots.label)
const hasClear = computed(() => {
  const checkValue = isDef(modelValue.value)

  if (props.clearTrigger === 'focus') {
    return props.clearable && checkValue && isFocus.value
  }

  return props.clearable && checkValue
})
const hasRightIcon = computed(() => isDef(props.rightIcon) || slots.rightIcon)

function onInput() {
  if (props.formatTrigger === 'onChange') {
    modelValue.value = props.formatter(modelValue.value)
  }

  emit('change', modelValue.value)
}

function onClickCancel() {
  emit('cancel')
}

function onClickInput(e) {
  emit('clickInput', e)
}

function onClickLeftIcon(e) {
  emit('clickLeftIcon', e)
}

function onClickRightIcon(e) {
  emit('clickRightIcon', e)
}

function onClear() {
  modelValue.value = ''
  emit('clear')
}

function onFocus(e) {
  isFocus.value = true
  emit('focus', e)
}

function onBlur(e) {
  setTimeout(() => {
    isFocus.value = false
  }, 5)

  if (props.formatTrigger === 'onBlur') {
    modelValue.value = props.formatter(modelValue.value)
  }

  emit('blur', e)
}

function onSearch(e) {
  emit('search', e.detail.value)
}
</script>

<template>
  <view
    :class="bem()"
    :style="normalizeStyle(props.customStyle, { background: props.background })"
  >
    <view
      :class="
        bem('content', [props.shape])
      "
    >
      <template v-if="hasLabel">
        <view :class="bem('label')">
          <slot name="label">
            {{ props.label }}
          </slot>
        </view>
      </template>
      <view :class="[cellBem(['borderless']), fieldBem(), bem('field', { disabled: props.disabled })]">
        <template v-if="hasLeftIcon">
          <view
            :class="fieldBem('left-icon')"
            @click="onClickLeftIcon"
          >
            <van-icon :name="props.leftIcon" />
          </view>
        </template>
        <view
          :class="[cellBem('value'), fieldBem('value')]"
          @click="onClickInput"
        >
          <view :class="fieldBem('body')">
            <input
              :id="id"
              v-model="modelValue"
              :disabled="props.disabled"
              :placeholder="props.placeholder"
              :class="fieldBem('control', [props.inputAlign])"
              :maxlength="props.maxlength"
              :focus="props.autofocus"
              type="search"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
              @confirm="onSearch"
              @search="onSearch"
            >

            <!-- 清除按钮 -->
            <template v-if="hasClear">
              <view
                :class="fieldBem('clear')"
                @click="onClear"
              >
                <van-icon :name="props.clearIcon" />
              </view>
            </template>

            <!-- 右侧 icon -->
            <template v-if="hasRightIcon">
              <view
                :class="fieldBem('right-icon')"
                @click="onClickRightIcon"
              >
                <slot name="right-icon">
                  <van-icon :name="props.rightIcon" />
                </slot>
              </view>
            </template>
          </view>
        </view>
      </view>
    </view>
    <template v-if="props.showAction">
      <view
        class="van-search__action"
        @click="onClickCancel"
      >
        {{ props.actionText }}
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
