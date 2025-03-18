<script lang="ts" setup>
import type { KeyConfig } from './types.ts'
import { computed, normalizeStyle, onMounted, useSlots, watch } from 'vue'
import { useGlobalZIndex } from '../composables/use-global-z-index'
import { HAPTICS_FEEDBACK } from '../constants'
import VanIcon from '../icon/icon.vue'
import VanOverlay from '../overlay/overlay.vue'
import VanTransition from '../transition/transition.vue'
import {
  isDef,
  makeStringProp,
} from '../utils'
import { numberKeyboardBem as bem, numberKeyboardName as name, numberKeyboardProps } from './number-keyboard'
import VanNumberKeyboardKey from './number-keyboard-key.vue'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(numberKeyboardProps)

const emit = defineEmits(['show', 'hide', 'blur', 'input', 'close', 'delete'])

const slots = useSlots()

const show = defineModel('show', { type: Boolean })
const modelValue = defineModel(makeStringProp(''))

const showClose = computed(() => props.closeButtonText && props.theme === 'default')
const showTitle = computed(() => props.title || showClose.value || slots['title-left'])
const keys = computed(() => (props.theme === 'custom' ? genCustomKeys() : genDefaultKeys()))
const computedZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))

watch(
  () => show.value,
  (val, oval) => {
    if (val === oval)
      return

    val ? open() : close()
  },
)

onMounted(() => {
  if (show.value) {
    open()
  }
})

function open() {
  show.value = true
}

function close() {
  show.value = false
}

function onClose() {
  emit('close')

  if (props.blurOnClose) {
    onBlur()
  }
}

function onBlur() {
  if (show.value) {
    emit('blur')
  }
}

function onClickOverlay() {
  if (props.hideOnClickOutside) {
    onBlur()
  }
}

function onPress(text, type) {
  if (text === '') {
    if (type === 'extra') {
      onBlur()
    }
    return
  }

  const value = modelValue.value

  if (type === 'delete') {
    emit('delete')
    modelValue.value = value.slice(0, value.length - 1)
  }
  else if (type === 'close') {
    onClose()
  }
  else if (value.length < +props.maxlength) {
    emit('input', text)
    modelValue.value = value + text
  }
}

function genCustomKeys() {
  const keys = genBasicKeys()
  const { extraKey } = props
  const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey]

  if (extraKeys.length === 0) {
    keys.push({ text: 0, wider: true })
  }
  else if (extraKeys.length === 1) {
    keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' })
  }
  else if (extraKeys.length === 2) {
    keys.push({ text: extraKeys[0], type: 'extra' }, { text: 0 }, { text: extraKeys[1], type: 'extra' })
  }

  return keys
}

function genBasicKeys(): KeyConfig[] {
  const keys: KeyConfig[] = Array.from({ length: 9 })
    .fill('')
    .map((_, i) => ({ text: i + 1 }))

  if (props.randomKeyOrder) {
    shuffle(keys)
  }

  return keys
}

function shuffle(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function genDefaultKeys(): KeyConfig[] {
  return [
    ...genBasicKeys(),
    { text: props.extraKey as string, type: 'extra' },
    { text: 0 },
    {
      text: props.showDeleteKey ? props.deleteButtonText : '',
      type: props.showDeleteKey ? 'delete' : '',
    },
  ]
}
</script>

<template>
  <view>
    <template v-if="props.hideOnClickOutside">
      <van-overlay
        :show="show"
        :custom-class="bem('overlay')"
        :z-index="computedZIndex"
        @click="onClickOverlay"
      />
    </template>
    <van-transition
      name="van-slide-up"
      :show="show"
      :custom-class="
        bem({
          'unfit': !props.safeAreaInsetBottom,
          'with-title': showTitle,
        })
      "
      :custom-style="normalizeStyle({ zIndex: computedZIndex })"
    >
      <!-- title -->
      <template v-if="showTitle">
        <view :class="bem('header')">
          <!-- left slot -->
          <template v-if="slots['title-left']">
            <view :class="bem('title-left')">
              <slot name="title-left" />
            </view>
          </template>
          <!-- title -->
          <template v-if="props.title">
            <view :class="bem('title')">
              {{ props.title }}
            </view>
          </template>
          <!-- close -->
          <template v-if="showClose">
            <view
              :class="[bem('close'), HAPTICS_FEEDBACK]"
              @click="onClose"
            >
              {{ props.closeButtonText }}
            </view>
          </template>
        </view>
      </template>

      <!-- body -->
      <view :class="bem('body')">
        <view :class="bem('keys')">
          <van-number-keyboard-key
            v-for="key in keys"
            :key="key.text"
            :text="key.text"
            :type="key.type"
            :wider="key.wider"
            :color="key.color"
            @press="onPress"
          >
            <template v-if="key.type === 'delete'">
              <slot name="delete">
                <template v-if="isDef(key.text)">
                  {{ key.text }}
                </template>
                <template v-else>
                  <van-icon name="close" />
                </template>
              </slot>
            </template>
            <template v-else-if="key.type === 'extra'">
              <slot name="extra-key">
                <template v-if="isDef(key.text)">
                  {{ key.text }}
                </template>
                <template v-else>
                  <van-icon name="arrow-down" />
                </template>
              </slot>
            </template>
            <template v-else>
              {{ key.text }}
            </template>
          </van-number-keyboard-key>
        </view>

        <!-- sidebar -->
        <template v-if="theme === 'custom'">
          <view :class="bem('sidebar')">
            <template v-if="props.showDeleteKey">
              <van-number-keyboard-key
                :text="props.deleteButtonText"
                large
                type="delete"
                @press="onPress"
              >
                <slot name="delete">
                  <van-icon name="close" />
                </slot>
              </van-number-keyboard-key>
            </template>
            <van-number-keyboard-key
              :text="props.closeButtonText"
              :loading="props.closeButtonLoading"
              large
              type="close"
              color="blue"
              @press="onPress"
            >
              {{ props.closeButtonText }}
            </van-number-keyboard-key>
          </view>
        </template>
      </view>
    </van-transition>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
