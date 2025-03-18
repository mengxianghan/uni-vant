<script setup lang="ts">
import { useTranslate } from '@/composables'
import { computed, ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    option1: '选项一',
    option2: '选项二',
    option3: '选项三',
    subname: '描述信息',
    showIcon: '展示图标',
    showCancel: '展示取消按钮',
    buttonText: '弹出菜单',
    customPanel: '自定义面板',
    description: '这是一段描述信息',
    optionStatus: '选项状态',
    coloredOption: '着色选项',
    disabledOption: '禁用选项',
    showDescription: '展示描述信息',
  },
})
const showBasic = ref(false)
const showIcon = ref(false)
const showCancel = ref(false)
const showTitle = ref(false)
const showStatus = ref(false)
const showDescription = ref(false)

const simpleActions = computed(() => [{ name: t('option1') }, { name: t('option2') }, { name: t('option3') }])

const iconActions = computed(() => [
  { name: t('option1'), icon: 'cart-o' },
  { name: t('option2'), icon: 'shop-o' },
  { name: t('option3'), icon: 'star-o' },
])

const statusActions = computed(() => [
  { name: t('coloredOption'), color: '#ee0a24' },
  { name: t('disabledOption'), disabled: true },
  { loading: true },
])

const actionsWithDescription = computed(() => [
  { name: t('option1') },
  { name: t('option2') },
  { name: t('option3'), subname: t('subname') },
])

function onSelect(item) {
  showBasic.value = false
  uni.showToast({ title: item.name, icon: 'none' })
}

function onSelectIcon(item) {
  showIcon.value = false
  uni.showToast({ title: item.name, icon: 'none' })
}

const onCancel = () => uni.showToast({ title: t('cancel'), icon: 'none' })
</script>

<template>
  <view class="demo-doc">
    <demo-block
      card
      :title="t('basicUsage')"
    >
      <van-cell
        is-link
        :title="t('basicUsage')"
        @click="showBasic = true"
      />
      <van-cell
        is-link
        :title="t('showIcon')"
        @click="showIcon = true"
      />
      <van-cell
        is-link
        :title="t('showCancel')"
        @click="showCancel = true"
      />
      <van-cell
        is-link
        :title="t('showDescription')"
        @click="showDescription = true"
      />
    </demo-block>

    <demo-block
      card
      :title="t('optionStatus')"
    >
      <van-cell
        is-link
        :title="t('optionStatus')"
        @click="showStatus = true"
      />
    </demo-block>

    <demo-block
      card
      :title="t('customPanel')"
    >
      <van-cell
        is-link
        :title="t('customPanel')"
        @click="showTitle = true"
      />
    </demo-block>

    <van-action-sheet
      v-model:show="showBasic"
      :actions="simpleActions"
      @select="onSelect"
    />

    <van-action-sheet
      v-model:show="showIcon"
      :actions="iconActions"
      @select="onSelectIcon"
    />

    <van-action-sheet
      v-model:show="showCancel"
      :actions="simpleActions"
      close-on-click-action
      :cancel-text="t('cancel')"
      @cancel="onCancel"
    />

    <van-action-sheet
      v-model:show="showDescription"
      :actions="actionsWithDescription"
      close-on-click-action
      :cancel-text="t('cancel')"
      :description="t('description')"
    />

    <van-action-sheet
      v-model:show="showStatus"
      close-on-click-action
      :actions="statusActions"
      :cancel-text="t('cancel')"
    />

    <van-action-sheet
      v-model:show="showTitle"
      :title="t('title')"
    >
      <div class="px-4 pt-4 pb-40">
        {{ t('content') }}
      </div>
    </van-action-sheet>
  </view>
</template>

<style scoped lang="scss"></style>
