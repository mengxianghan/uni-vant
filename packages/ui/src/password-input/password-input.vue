<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import {
  BORDER_LEFT,
  BORDER_SURROUND,
} from '../constants'
import {
  addUnit,
  makeStringProp,
} from '../utils'
import { passwordInputBem as bem, passwordInputName as name, passwordInputProps } from './password-input'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(passwordInputProps)

const emit = defineEmits(['focus'])

const modelValue = defineModel('value', makeStringProp(''))

const hasInfo = computed(() => props.errorInfo || props.info)

interface Point {
  style: CSSProperties
  mask: boolean
  char: boolean
  showCursor: boolean
  showBorder: boolean
}
const points = computed<Point[]>(() => {
  const { mask, gutter, focused } = props
  return Array.from({ length: +props.length }, (_, i) => {
    const char = modelValue.value[i]
    const showBorder = i !== 0 && !gutter
    const showCursor = focused && i === modelValue.value.length

    let style: CSSProperties

    if (i !== 0 && gutter) {
      style = { marginLeft: addUnit(gutter) }
    }

    return {
      style,
      mask,
      char,
      showCursor,
      showBorder,
    }
  })
})

function onTouchStart(event: MouseEvent) {
  event.stopPropagation()
  emit('focus', event)
}
</script>

<template>
  <view :class="bem()">
    <view
      :class="[bem('security'), { [BORDER_SURROUND]: !props.gutter }]"
      @touchstart.passive="onTouchStart"
    >
      <view
        v-for="(item, index) in points"
        :key="index"
        :class="[
          bem('item', { focus: item.showCursor }),
          {
            [BORDER_LEFT]: item.showBorder,
          },
        ]"
        :style="item.style"
      >
        <template v-if="mask">
          <view
            :class="bem('point')"
            :style="{ visibility: item.char ? 'visible' : 'hidden' }"
          />
        </template>
        <template v-else>
          {{ item.char }}
        </template>
        <template v-if="item.showCursor">
          <view :class="bem('cursor')" />
        </template>
      </view>
    </view>
    <template v-if="hasInfo">
      <view :class="bem(props.errorInfo ? 'error-info' : 'info')">
        {{ props.info }}
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
