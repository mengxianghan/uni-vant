<script lang="ts" setup>
import { computed, normalizeStyle, useSlots } from 'vue'
import VanIcon from '../icon/icon.vue'
import VanLoading from '../loading/loading.vue'
import { isDef } from '../utils'
import { buttonBem as bem, buttonEmits, buttonProps, buttonName as name } from './button'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const slots = useSlots()

const styles = computed(() => {
  if (!props.color) {
    return
  }

  const isLinear = props.color?.startsWith('linear-gradient')

  return {
    color: props.textColor ? props.textColor : props.plain ? props.color : '#fff',
    background: !props.plain ? props.color : '',
    ...(isLinear ? { border: 0 } : { borderColor: props.color }),
  }
})

const hasIcon = computed(() => {
  return isDef(props.icon)
})

const hasText = computed(() => {
  return isDef(props.text) || slots.default
})

function onClick(event: MouseEvent) {
  if (props.loading || props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

function onGetPhoneNumber(evt: UniHelper.ButtonOnGetphonenumberEvent) {
  emit('getphonenumber', evt)
}
</script>

<template>
  <button
    :class="[
      bem({
        [props.type]: props.type,
        [props.size]: props.size,
        plain: props.plain,
        square: props.square,
        round: props.round,
        hairline: props.hairline,
        block: props.block,
        disabled: props.disabled,
      }),
      props.customClass,
    ]"
    hover-class="none"
    :style="normalizeStyle([styles, props.customStyle])"
    :disabled="props.disabled || props.loading"
    :open-type="props.openType"
    :form-type="props.formType"
    @click="onClick"
    @getphonenumber="onGetPhoneNumber"
  >
    <view :class="bem('content')">
      <template v-if="props.loading">
        <view :class="bem('icon')">
          <slot name="loading">
            <van-loading
              :type="props.loadingType"
              :size="props.loadingSize"
            />
          </slot>
        </view>
        <template v-if="isDef(props.loadingText)">
          <view :class="bem('text')">
            {{ loadingText }}
          </view>
        </template>
      </template>
      <template v-else>
        <template v-if="'left' === props.iconPosition && hasIcon">
          <view :class="bem('icon')">
            <van-icon
              :name="props.icon"
              :class-prefix="props.iconPrefix"
            />
          </view>
        </template>

        <template v-if="hasText">
          <view :class="bem('text')">
            <slot>{{ props.text }}</slot>
          </view>
        </template>

        <template v-if="'right' === props.iconPosition && hasIcon">
          <view :class="bem('icon')">
            <van-icon
              :name="props.icon"
              :class-prefix="props.iconPrefix"
            />
          </view>
        </template>
      </template>
    </view>
  </button>
</template>

<style lang="scss">
@import './index';
</style>
