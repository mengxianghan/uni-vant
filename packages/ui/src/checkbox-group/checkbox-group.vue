<script lang="ts" setup>
import { watch } from 'vue'
import { useChildren } from '../composables/use-relation'
import { defaultTo, makeArrayProp, type Numeric } from '../utils'
import { checkboxGroupBem as bem, CHECKBOX_KEY, checkboxGroupEmits, checkboxGroupProps, checkboxGroupName as name } from './checkbox-group'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(checkboxGroupProps)

const emit = defineEmits(checkboxGroupEmits)

const modelValue = defineModel(makeArrayProp())
const { children, linkChildren } = useChildren(CHECKBOX_KEY)

watch(
  () => modelValue.value,
  (value) => {
    emit('change', value)
  },
)

function updateValue(value: Array<Numeric>) {
  modelValue.value = value
}

interface IToggleAllOption {
  checked: boolean
  skipDisabled?: boolean
}

function toggleAll(options: IToggleAllOption | boolean) {
  if (typeof options === 'boolean') {
    options = { checked: options }
  }

  const { checked, skipDisabled } = options || {}

  const checkedChildren = children.filter((item) => {
    if (!item.props.bindGroup) {
      return false
    }
    const _checked = item.checked.value

    if (item.props.disabled && skipDisabled) {
      return _checked
    }
    return defaultTo(checked, !_checked)
  })

  const names = checkedChildren.map(item => item.props.name)

  updateValue(names)
}

linkChildren({ props, updateValue, modelValue })

defineExpose({
  toggleAll,
})
</script>

<template>
  <view
    :class="
      bem({
        [direction]: direction,
      })
    "
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
