<script lang="ts" setup>
import { computed } from 'vue'
import { BORDER_SURROUND } from '../constants'
import {
  clamp,
  makeNumberProp,
  type Numeric,
} from '../utils'
import { paginationBem as bem, paginationName as name, paginationEmits, paginationProps, paginationT as t } from './pagination'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(paginationProps)

const emit = defineEmits(paginationEmits)

const modelValue = defineModel(makeNumberProp(0))

const count = computed(() => {
  const { pageCount, totalItems, itemsPerPage } = props
  const count = +pageCount || Math.ceil(+totalItems / +itemsPerPage)
  return Math.max(1, count)
})
const prevDisabled = computed(() => modelValue.value === 1)
const nextDisabled = computed(() => modelValue.value === count.value)
const pages = computed(() => {
  const items = []
  const pageCount = count.value
  const showPageSize = +props.showPageSize
  const { forceEllipses } = props

  // Default page limits
  let startPage = 1
  let endPage = pageCount
  const isMaxSized = showPageSize < pageCount

  // recompute if showPageSize
  if (isMaxSized) {
    // Current page is displayed in the middle of the visible ones
    startPage = Math.max(modelValue.value - Math.floor(showPageSize / 2), 1)
    endPage = startPage + showPageSize - 1

    // Adjust if limit is exceeded
    if (endPage > pageCount) {
      endPage = pageCount
      startPage = endPage - showPageSize + 1
    }
  }

  // Add page number links
  for (let number = startPage; number <= endPage; number++) {
    const page = makePage(number, number, number === modelValue.value)
    items.push(page)
  }

  // Add links to move between page sets
  if (isMaxSized && showPageSize > 0 && forceEllipses) {
    if (startPage > 1) {
      const prevPages = makePage(startPage - 1, '...')
      items.unshift(prevPages)
    }

    if (endPage < pageCount) {
      const nextPages = makePage(endPage + 1, '...')
      items.push(nextPages)
    }
  }

  return items
})

function updateModelValue(value, emitChange) {
  value = clamp(value, 1, count.value)

  if (modelValue.value !== value) {
    modelValue.value = value

    if (emitChange) {
      emit('change', value)
    }
  }
}

function makePage(number: number, text: Numeric, active?: boolean) {
  return { number, text, active }
}
</script>

<template>
  <view :class="bem()">
    <view :class="bem('items')">
      <!-- prev button -->
      <view
        :class="[
          bem('item', { disabled: prevDisabled, border: props.mode === 'simple', prev: true }),
          BORDER_SURROUND,
        ]"
        @click="updateModelValue(modelValue - 1, true)"
      >
        <view :class="bem('item-button')">
          <slot name="prev-text">
            {{ props.prevText || t('prev') }}
          </slot>
        </view>
      </view>

      <!-- page desc -->
      <template v-if="props.mode === 'simple'">
        <view :class="bem('page-desc')">
          <slot name="page-desc">
            {{ modelValue }} / {{ count }}
          </slot>
        </view>
      </template>

      <!-- pages -->
      <template v-else>
        <view
          v-for="page in pages"
          :key="page.number"
          :class="[bem('item', { active: page.active, page: true }), BORDER_SURROUND]"
        >
          <view @click="updateModelValue(page.number, true)">
            <slot
              name="page"
              :text="page.text"
              :number="page.number"
              :active="page.active"
            >
              {{ page.text }}
            </slot>
          </view>
        </view>
      </template>

      <!-- next button -->
      <view
        :class="[
          bem('item', { disabled: nextDisabled, border: mode === 'simple', next: true }),
          BORDER_SURROUND,
        ]"
        @click="updateModelValue(modelValue + 1, true)"
      >
        <view :class="bem('item-button')">
          <slot name="next-text">
            {{ props.nextText || t('next') }}
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import './index';
</style>
