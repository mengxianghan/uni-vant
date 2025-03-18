<script lang="ts" setup>
import { computed, useSlots, watch } from 'vue'
import { useParent } from '../composables/use-relation'
import VanIcon from '../icon/icon.vue'
import { RADIO_KEY, type RadioGroupProps } from '../radio-group'
import { addUnit, stopPropagation } from '../utils'
import { radioBem as bem, radioName as name, radioEmits, radioProps } from './radio'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(radioProps)

const emit = defineEmits(radioEmits)

const slots = useSlots()

const { parent } = useParent(RADIO_KEY)

const disabled = computed(() => {
  if (parent && props.bindGroup) {
    return getParentProp('disabled') || props.disabled
  }

  return props.disabled
})

const direction = computed(() => getParentProp('direction'))
const computedShape = computed(() => {
  return props.shape || getParentProp('shape') || 'round'
})
const iconStyles = computed(() => {
  const checkedColor = props.checkedColor || getParentProp('checkedColor')

  if (checkedColor && checked() && !disabled.value) {
    return {
      borderColor: checkedColor,
      backgroundColor: checkedColor,
    }
  }
  return null
})
const computedIconSize = computed(() => props.iconSize || getParentProp('iconSize'))

watch(
  () => props.modelValue,
  (value) => {
    emit('change', value)
  },
)

function getParentProp(name: keyof RadioGroupProps) {
  if (parent && props.bindGroup) {
    return parent.props[name]
  }
}

function onClick(evt: MouseEvent) {
  if (!disabled.value) {
    toggle()
  }
  emit('click', evt)
}

function onClickLabel(evt: MouseEvent) {
  if (props.labelDisabled) {
    stopPropagation(evt)
  }
}

function checked() {
  const value = parent ? parent.modelValue.value : props.modelValue
  return value === props.name
}

function toggle() {
  if (parent) {
    parent.updateValue(props.name)
  }
  else {
    emit('update:modelValue', props.name)
  }
}
</script>

<template>
  <view
    :class="
      bem([
        direction,
        {
          'disabled': props.disabled,
          'label-disabled': props.labelDisabled,
        },
      ])
    "
    @click="onClick"
  >
    <view
      :class="
        bem('icon', {
          [computedShape]: computedShape,
          disabled,
          checked: checked(),
        })
      "
      :style="{
        fontSize: addUnit(computedIconSize),
      }"
    >
      <slot name="icon">
        <template v-if="computedShape === 'dot'">
          <view :class="bem('icon-dot')" />
        </template>
        <template v-else>
          <view
            :class="bem('icon-default')"
            :style="iconStyles"
          >
            <van-icon name="success" />
          </view>
        </template>
      </slot>
    </view>
    <template v-if="slots.default">
      <view
        :class="
          bem('label', [
            labelPosition,
            {
              disabled: props.disabled,
            },
          ])
        "
        @click="onClickLabel"
      >
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
