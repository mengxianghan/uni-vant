<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import { cellBem } from '../cell'
import VanIcon from '../icon/icon.vue'
import {
  addUnit,
  isDef,
} from '../utils'
import { fieldBem as bem, fieldEmits, fieldProps, fieldName as name } from './field'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(fieldProps)

const emit = defineEmits(fieldEmits)

const slots = useSlots()

const modelValue = defineModel<string>({ default: '' })
const isFocus = ref(false)

const placeholderClasses = computed(() => `${name}__placeholder ${props.placeholderClass}`)
const controlClasses = computed(() =>
  bem('control', {
    [props.inputAlign]: props.inputAlign !== 'left',
    error: props.error,
    textarea: props.type === 'textarea',
    disabled: props.disabled || props.readonly,
  }),
)
const textareaStyles = computed(() => ({
  ...(props.autosize && typeof props.autosize === 'object'
    ? { minHeight: addUnit(props.autosize.minHeight), maxHeight: addUnit(props.autosize.maxHeight) }
    : {}),
}))
const hasLeftIcon = computed(() => {
  return isDef(props.leftIcon) || slots.leftIcon
})
const hasLabel = computed(() => {
  return isDef(props.label) || slots.label
})
const hasRightIcon = computed(() => {
  return isDef(props.rightIcon) || slots.rightIcon
})
const hasErrorMessage = computed(() => {
  return isDef(props.errorMessage) || slots.errorMessage
})
const hasButton = computed(() => {
  return slots.button
})
const hasClear = computed(() => {
  if (props.clearTrigger === 'focus') {
    return props.clearable && isDef(modelValue.value) && isFocus.value
  }

  return props.clearable && props.arrowDirection
})
const hasCellRightIcon = computed(() => slots.rightIcon || props.isLink)
const arrow = computed(() => {
  let name

  switch (props.arrowDirection) {
    case 'left':
      name = 'arrow-left'
      break
    case 'right':
      name = 'arrow'
      break
    case 'up':
      name = 'arrow-up'
      break
    case 'down':
      name = 'arrow-down'
      break
    default:
      name = 'arrow'
      break
  }

  return name
})
const hasWordLimit = computed(() => isDef(props.maxlength) && props.showWordLimit)

function onInput() {
  if (props.formatTrigger === 'onChange' && props.formatter) {
    modelValue.value = props.formatter(modelValue.value)
  }
  emit('input', modelValue.value)
  emit('change', modelValue.value)
}

function onLeftIcon(evt) {
  emit('clickLeftIcon', evt)
}

function onRightIcon(evt) {
  emit('clickRightIcon', evt)
}

function onClear() {
  modelValue.value = ''
  emit('clear')
}

function onFocus(evt) {
  isFocus.value = true
  emit('clickInput', evt)
  emit('focus', evt)
}

function onBlur(evt) {
  setTimeout(() => {
    isFocus.value = false
  }, 5)

  if (props.formatTrigger === 'onBlur') {
    modelValue.value = props.formatter(modelValue.value)
  }

  emit('blur', evt)
}

function onConfirm(evt) {
  modelValue.value = evt.detail.value
  emit('confirm', evt)
}

function onKeyboardHeightChange(evt) {
  emit('keyboardheightchange', evt)
}

function onLineChange(evt) {
  emit('linechange', evt)
}

function onNicknameReview(evt) {
  emit('nicknamereview', evt)
}

function onClick(evt) {
  emit('click', evt)
}
</script>

<template>
  <view
    :class="[
      bem([`label-${props.labelAlign}`, {
        disabled: props.disabled,
        error: props.error,
      }]),
      cellBem({
        center: props.center,
        clickable: props.isLink || props.clickable,
        borderless: !props.border,
      }),
    ]"
    @click="onClick"
  >
    <!-- 左侧 icon -->
    <template v-if="hasLeftIcon">
      <view
        :class="bem('left-icon')"
        @click="onLeftIcon"
      >
        <slot name="leftIcon">
          <van-icon :name="props.leftIcon" />
        </slot>
      </view>
    </template>

    <!-- label -->
    <template v-if="hasLabel">
      <view
        :class="[
          bem('label', {
            [props.labelAlign]: props.labelAlign !== 'left',
            required: props.required,
            colon: props.colon,
          }),
          cellBem('title'),
        ]"
        :style="{
          width: isDef(props.labelWidth) ? addUnit(props.labelWidth) : '',
        }"
      >
        <slot name="label">
          {{ props.label }}
        </slot>
      </view>
    </template>

    <!-- value -->
    <view :class="[bem('value'), cellBem('value')]">
      <view
        :class="
          bem('body', {
            textarea: props.type === 'textarea',
          })
        "
      >
        <slot name="input">
          <!-- textarea -->
          <template v-if="'textarea' === props.type">
            <textarea
              v-model="modelValue"
              :class="controlClasses"
              :style="textareaStyles"
              :placeholder-class="placeholderClasses"
              :name="name"
              :placeholder="props.placeholder"
              :disabled="props.disabled || props.readonly"
              :maxlength="props.maxlength"
              :type="props.type"
              :auto-focus="focus"
              :focus="focus"
              :auto-height="!!props.autosize"
              :cursor-spacing="props.cursorSpacing"
              :cursor="props.cursor"
              :selection-start="props.selectionStart"
              :selection-end="props.selectionEnd"
              :adjust-position="props.adjustPosition"
              :hold-keyboard="props.holdKeyboard"
              :disable-default-padding="props.disableDefaultPadding"
              :confrim-type="props.confirmType"
              :confirm-hold="props.confirmHold"
              :adjust-keyboard-to="props.adjustKeyBoardTo"
              :show-confirm-bar="props.showConfirmBar"
              :fixed="props.fixed"
              @focus="onFocus"
              @blur="onBlur"
              @linechange="onLineChange"
              @input="onInput"
              @confirm="onConfirm"
              @keyboardheightchange="onKeyboardHeightChange"
            />
          </template>
          <!-- input -->
          <template v-else>
            <input
              v-model="modelValue"
              :placeholder-class="placeholderClasses"
              :class="controlClasses"
              :name="name"
              :type="props.type"
              :password="props.password"
              :placeholder="props.placeholder"
              :disabled="props.disabled || props.readonly"
              :maxlength="props.maxlength"
              :cursor-spacing="props.cursorSpacing"
              :focus="focus"
              :confrim-type="props.confirmType"
              :confirm-hold="props.confirmHold"
              :cursor="cursor"
              :selection-start="props.selectionStart"
              :selection-end="props.selectionEnd"
              :adjust-position="props.adjustPosition"
              :auto-blur="props.autoBlur"
              :ignore-composition-event="props.ignoreCompositionEvent"
              :always-embed="props.alwaysEmbed"
              :hold-keyboard="props.holdKeyboard"
              :safe-password-cert-path="props.safePasswordCertPath"
              :safe-password-length="props.safePasswordLength"
              :safe-password-time-stamp="props.safePasswordTimeStamp"
              :safe-password-nonce="props.safePasswordNonce"
              :safe-password-salt="props.safePasswordSalt"
              :safe-password-custom-hash="props.safePasswordCustomHash"
              :random-number="props.randomNumber"
              :controlled="props.controlled"
              :always-system="props.alwaysSystem"
              :inputmode="props.inputmode"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
              @confirm="onConfirm"
              @keyboardheightchange="onKeyboardHeightChange"
              @nicknamereview="onNicknameReview"
            >
          </template>

          <!-- 清除按钮 -->
          <template v-if="hasClear">
            <view
              :class="bem('clear')"
              @click="onClear"
            >
              <van-icon :name="props.clearIcon" />
            </view>
          </template>
        </slot>

        <!-- 右侧 icon -->
        <template v-if="hasRightIcon">
          <view
            :class="bem('right-icon')"
            @click="onRightIcon"
          >
            <slot name="rightIcon">
              <van-icon :name="props.rightIcon" />
            </slot>
          </view>
        </template>

        <!-- button -->
        <template v-if="hasButton">
          <view :class="bem('button')">
            <slot name="button" />
          </view>
        </template>
      </view>

      <template v-if="hasWordLimit">
        <view :class="bem('word-limit')">
          {{ String(modelValue).length }}/{{ props.maxlength }}
        </view>
      </template>

      <!-- 错误信息 -->
      <template v-if="hasErrorMessage">
        <view
          :class="
            bem('error-message', {
              [props.errorMessageAlign]: props.errorMessageAlign !== 'left',
            })
          "
        >
          <slot name="errorMessage">
            {{ props.errorMessage }}
          </slot>
        </view>
      </template>
    </view>

    <!-- arrow -->
    <template v-if="hasCellRightIcon">
      <view :class="cellBem('right-icon')">
        <slot name="rightIcon">
          <van-icon :name="arrow" />
        </slot>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
