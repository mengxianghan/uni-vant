<script lang="ts" setup>
import VanIcon from '../icon/icon.vue'
import { tagBem as bem, tagName as name, tagEmits, tagProps } from './tag'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tagProps)

const emit = defineEmits(tagEmits)

function onClick(evt: MouseEvent) {
  emit('click', evt)
}

function onClose(evt: MouseEvent) {
  emit('close', evt)
}
</script>

<template>
  <template v-if="show">
    <view
      :class="
        bem({
          [props.type]: true,
          plain: props.plain,
          round: props.round,
          mark: props.mark,
          [props.size]: props.size,
        })
      "
      :style="{
        background: props.color && !props.plain ? props.color : '',
        color: props.plain ? props.color : props.textColor || props.color,
      }"
      @click="onClick"
    >
      <slot />
      <template v-if="props.closeable">
        <view
          :class="bem('close')"
          @click.stop="onClose"
        >
          <van-icon name="cross" />
        </view>
      </template>
    </view>
  </template>
</template>

<style lang="scss">
@import './index';
</style>
