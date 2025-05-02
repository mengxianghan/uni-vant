<script lang="ts" setup>
import { computed, normalizeStyle, useSlots, watch } from 'vue'
import { CHECKBOX_KEY } from '../checkbox-group'
import { useExpose } from '../composables/use-expose'
import { useParent } from '../composables/use-relation'
import VanIcon from '../icon/icon.vue'
import { addUnit } from '../utils'
import { checkboxBem as bem, checkboxEmits, checkboxProps, checkboxName as name } from './checkbox'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(checkboxProps)

const emit = defineEmits(checkboxEmits)

const slots = useSlots()

// const modelValue = defineModel<boolean>({ default: false })

const { parent } = useParent(CHECKBOX_KEY)

const checked = computed(() => {
  if (parent && props.bindGroup) {
    return parent.modelValue.value.includes(props.name)
  }
  return !!props.modelValue
})

const disabled = computed(() => {
  if (parent && props.bindGroup) {
    const disabled = getParentProp('disabled') || props.disabled

    const checkedCount = getParentProp('modelValue').length
    const max = getParentProp('max')
    const overlimit = max && checkedCount >= +max

    return disabled || (overlimit && !checked.value)
  }

  return props.disabled
})
const direction = computed(() => getParentProp('direction'))
const shape = computed(() => {
  return props.shape || getParentProp('shape') || 'round'
})
const iconStyles = computed(() => {
  const checkedColor = props.checkedColor || getParentProp('checkedColor')

  if (checkedColor && checked.value && !disabled.value) {
    return {
      borderColor: checkedColor,
      backgroundColor: checkedColor,
    }
  }
  return null
})
const iconSize = computed(() => props.iconSize || getParentProp('iconSize'))

watch(
  () => props.modelValue,
  (value) => {
    if (props.indeterminate === null)
      emit('change', value)
  },
)

function getParentProp(name) {
  if (parent && props.bindGroup) {
    return parent.props[name]
  }
}

function setParentValue(checked: boolean) {
  const { name } = props
  const { max } = parent?.props || {}
  const value = parent.modelValue.value.slice()

  if (checked) {
    const overlimit = max && value.length >= +max

    if (!overlimit && !value.includes(name)) {
      value.push(name)

      if (props.bindGroup) {
        parent?.updateValue(value)
      }
    }
  }
  else {
    const index = value.indexOf(name)

    if (index !== -1) {
      value.splice(index, 1)

      if (props.bindGroup) {
        parent?.updateValue(value)
      }
    }
  }
}

function toggle(newValue = !checked.value) {
  if (parent && props.bindGroup) {
    setParentValue(newValue)
  }
  else {
    emit('update:modelValue', newValue)
  }

  if (props.indeterminate !== null)
    emit('change', newValue)
}

function onClick() {
  if (!disabled.value) {
    toggle()
  }
  emit('click')
}

function onLabelClick(e) {
  if (props.labelDisabled) {
    e.stopPropagation()
  }
}

useExpose({
  checked,
  props,
})

defineExpose({ toggle })
</script>

<template>
  <view
    :class="
      [bem([
        direction,
        {
          'disabled': props.disabled,
          'label-disabled': props.labelDisabled,
        },
      ]), props.customClass]
    "
    :style="normalizeStyle(props.customStyle)"
    @click="onClick"
  >
    <view
      :class="
        bem('icon', [
          shape,
          {
            disabled: props.disabled,
            checked,
            indeterminate: props.indeterminate,
          },
        ])
      "
      :style="{
        fontSize: addUnit(iconSize),
      }"
    >
      <slot name="icon">
        <view
          :class="bem('icon-default')"
          :style="iconStyles"
        >
          <template v-if="props.indeterminate || checked">
            <van-icon :name="props.indeterminate ? 'minus' : 'success'" />
          </template>
        </view>
      </slot>
    </view>
    <template v-if="slots.default">
      <view
        :class="
          bem('label', [props.labelPosition,
                        {
                          disabled,
                        },
          ])
        "
        @click="onLabelClick"
      >
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
