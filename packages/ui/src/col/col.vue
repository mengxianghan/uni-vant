<script lang="ts" setup>
import { computed } from 'vue'
import { useParent } from '../composables/use-relation'
import { ROW_KEY } from '../row'
import { colBem as bem, colEmits, colProps, colName as name } from './col'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(colProps)

const emit = defineEmits(colEmits)

const { parent, index } = useParent(ROW_KEY)

const styles = computed(() => {
  if (!parent) {
    return
  }

  const { spaces, verticalSpaces } = parent
  let styles = {}
  if (spaces && spaces.value && spaces.value[index.value]) {
    const { left, right } = spaces.value[index.value]
    styles = {
      paddingLeft: left ? `${left}px` : null,
      paddingRight: right ? `${right}px` : null,
    }
  }

  const { bottom } = verticalSpaces.value[index.value] || {}

  return Object.assign(styles, {
    marginBottom: bottom ? `${bottom}px` : null,
  })
})

function onClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <view
    :class="
      bem({
        [props.span]: props.span,
        [`offset-${props.offset}`]: props.offset,
      })
    "
    :style="styles"
    @click="onClick"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
