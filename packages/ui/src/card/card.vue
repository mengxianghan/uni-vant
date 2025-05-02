<script lang="ts" setup>
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import VanImage from '../image/image.vue'
import VanTag from '../tag/tag.vue'
import { isDef } from '../utils'
import { cardBem as bem, cardEmits, cardProps, cardName as name } from './card'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(cardProps)

const emit = defineEmits(cardEmits)

const slots = useSlots()

const integer = ref()
const decimal = ref()

watch(() => props.price, formatPrice)

const showNum = computed(() => slots.num || isDef(props.num))
const showPrice = computed(() => slots.price || isDef(props.price))
const showOriginPrice = computed(() => slots['origin-price'] || isDef(props.originPrice))
const showBottom = computed(() => showNum.value || showPrice.value || showOriginPrice.value)

onMounted(() => {
  formatPrice()
})

function onClickThumb(evt: MouseEvent) {
  emit('clickThumb', evt)
}

function formatPrice() {
  const [_integer, _decimal] = props.price?.toString().split('.') || []
  integer.value = _integer
  decimal.value = _decimal
}
</script>

<template>
  <view :class="bem()">
    <view :class="bem('header')">
      <!-- thumb -->
      <template v-if="slots.thumb || props.thumb">
        <view
          :class="bem('thumb')"
          @click="onClickThumb"
        >
          <slot name="thumb">
            <van-image
              :custom-class="bem('thumb-img')"
              :src="props.thumb"
              fix="aspectFill"
            />
          </slot>

          <template v-if="slots.tag || props.tag">
            <view :class="bem('tag')">
              <slot name="tag">
                <van-tag
                  mark
                  type="primary"
                >
                  {{ props.tag }}
                </van-tag>
              </slot>
            </view>
          </template>
        </view>
      </template>
      <view :class="bem('content', { centered: props.centered })">
        <view>
          <!-- title -->
          <slot name="title">
            <view
              class="van-multi-ellipsis--l2"
              :class="[bem('title')]"
            >
              {{ props.title }}
            </view>
          </slot>
          <!-- desc -->
          <slot name="desc">
            <view
              class="van-ellipsis"
              :class="[bem('desc')]"
            >
              {{ props.desc }}
            </view>
          </slot>
          <slot name="tags" />
        </view>
        <!-- bottom -->
        <template v-if="showBottom">
          <view :class="bem('bottom')">
            <slot name="price-top" />
            <template v-if="showPrice">
              <view :class="bem('price')">
                <slot name="price">
                  <view>
                    <text :class="bem('price-currency')">
                      {{ props.currency }}
                    </text>
                    <text :class="bem('price-integer')">
                      {{ integer }}
                    </text>
                    <template v-if="isDef(decimal)">
                      <text>.</text><text :class="bem('price-decimal')">
                        {{ decimal }}
                      </text>
                    </template>
                  </view>
                </slot>
              </view>
            </template>
            <template v-if="showOriginPrice">
              <view :class="bem('origin-price')">
                <slot name="origin-price">
                  {{ props.currency }}{{ props.originPrice }}
                </slot>
              </view>
            </template>
            <template v-if="showNum">
              <view :class="bem('num')">
                <slot name="num">
                  x{{ props.num }}
                </slot>
              </view>
            </template>
            <slot name="bottom" />
          </view>
        </template>
      </view>
    </view>
    <!-- footer -->
    <template v-if="slots.footer">
      <view :class="bem('footer')">
        <slot name="footer" />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
