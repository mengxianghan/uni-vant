<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useRect } from '../composables/use-rect'
import { useParent } from '../composables/use-relation'
import { addUnit, type Numeric } from '../utils'
import { PLACEHOLDER_KEY, vcPlaceholderProps } from './vc-placeholder'

defineOptions({
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(vcPlaceholderProps)
const height = ref<Numeric>('')

const { parent } = useParent(PLACEHOLDER_KEY)

onMounted(() => {
  setHeight()
})

onUpdated(() => {
  setHeight()
})

function setHeight() {
  if (props.disabled || !parent.selector) {
    return
  }

  useRect(`.${parent.selector}`, parent.instance).then((data) => {
    if (!data) {
      return
    }
    height.value = data.height
  })
}
</script>

<template>
  <template v-if="props.disabled">
    <slot />
  </template>
  <template v-else>
    <view
      :class="props.bem('placeholder')"
      :style="{ height: addUnit(height) }"
    >
      <slot />
    </view>
  </template>
</template>

<style lang="scss">
</style>
