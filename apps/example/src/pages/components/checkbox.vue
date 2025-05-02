<script lang="ts" setup>
import { useTranslate } from '@/hooks'
import { cdnURL } from '@/utils'
import { useRefs } from 'uvant/src/composables'
import { reactive, ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    checkbox: '复选框',
    customIcon: '自定义图标',
    customIconSize: '自定义大小',
    customColor: '自定义颜色',
    customShape: '自定义形状',
    leftLabel: '左侧文本',
    title3: '复选框组',
    title4: '限制最大可选数',
    title5: '搭配单元格组件使用',
    toggleAll: '全选与反选',
    checkAll: '全选',
    inverse: '反选',
    horizontal: '水平排列',
    disableLabel: '禁用文本点击',
    indeterminate: '不确定状态',
  },
})

const state = reactive({
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  isCheckAll: false,
  isIndeterminate: true,
  checkboxLabel: true,
  checkboxIcon: true,
  leftLabel: false,
  list: ['a', 'b'],
  result: ['a', 'b'],
  checkboxShape: ['a', 'b'],
  result2: [],
  result3: [],
  result4: ['a', 'b', 'd'],
  checkAllResult: [],
  horizontalResult: [],
})

const list = ['a', 'b', 'c', 'd']

const activeIcon = cdnURL('user-active.png')
const inactiveIcon = cdnURL('user-inactive.png')

const group = ref()
const [refs, setRefs] = useRefs()

function toggle(index) {
  refs.value[index].toggle()
}

function checkAll() {
  group.value?.toggleAll(true)
}

function toggleAll() {
  group.value?.toggleAll()
}

function checkAllChange(val) {
  state.result4 = val ? list : []
  state.isIndeterminate = false
}

function checkedResultChange(value) {
  const checkedCount = value.length
  state.isCheckAll = checkedCount === list.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < list.length
}
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('basicUsage')">
      <van-checkbox v-model="state.checkbox1">
        {{ t('checkbox') }}
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-row :gutter="[0, 8]">
        <van-col :span="24">
          <van-checkbox
            :model-value="false"
            disabled
          >
            {{ t('checkbox') }}
          </van-checkbox>
        </van-col>
        <van-col :span="24">
          <van-checkbox
            :model-value="true"
            disabled
          >
            {{ t('checkbox') }}
          </van-checkbox>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block :title="t('customShape')">
      <van-checkbox-group
        v-model="state.checkboxShape"
        shape="square"
      >
        <van-row :gutter="[0, 8]">
          <van-col :span="24">
            <van-checkbox name="a">
              {{ t('customShape') }} a
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="b">
              {{ t('customShape') }} b
            </van-checkbox>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-checkbox
        v-model="state.checkbox2"
        checked-color="#ee0a24"
      >
        {{ t('customColor') }}
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('customIconSize')">
      <van-checkbox
        v-model="state.checkboxIcon"
        icon-size="24px"
      >
        {{ t('customIconSize') }}
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <van-checkbox v-model="state.checkbox3">
        {{ t('customIcon') }}
        <template #icon>
          <van-image
            height="16px"
            :src="state.checkbox3 ? activeIcon : inactiveIcon"
          />
        </template>
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('leftLabel')">
      <van-checkbox
        v-model="state.leftLabel"
        label-position="left"
      >
        {{ t('leftLabel') }}
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('disableLabel')">
      <van-checkbox
        v-model="state.checkboxLabel"
        label-disabled
      >
        {{ t('checkbox') }}
      </van-checkbox>
    </demo-block>

    <demo-block :title="t('title3')">
      <van-checkbox-group v-model="state.result">
        <van-row :gutter="[0, 8]">
          <van-col :span="24">
            <van-checkbox name="a">
              {{ t('checkbox') }} a
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="b">
              {{ t('checkbox') }} b
            </van-checkbox>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </demo-block>

    <demo-block :title="t('horizontal')">
      <van-checkbox-group
        v-model="state.horizontalResult"
        direction="horizontal"
      >
        <van-checkbox name="a">
          {{ t('checkbox') }} a
        </van-checkbox>
        <van-checkbox name="b">
          {{ t('checkbox') }} b
        </van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block :title="t('title4')">
      <van-checkbox-group
        v-model="state.result2"
        :max="2"
      >
        <van-row :gutter="[0, 8]">
          <van-col :span="24">
            <van-checkbox name="a">
              {{ t('checkbox') }} a
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="b">
              {{ t('checkbox') }} b
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="c">
              {{ t('checkbox') }} c
            </van-checkbox>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </demo-block>

    <demo-block :title="t('toggleAll')">
      <van-checkbox-group
        ref="group"
        v-model="state.checkAllResult"
      >
        <van-row :gutter="[0, 8]">
          <van-col :span="24">
            <van-checkbox name="a">
              {{ t('checkbox') }} a
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="b">
              {{ t('checkbox') }} b
            </van-checkbox>
          </van-col>
          <van-col :span="24">
            <van-checkbox name="c">
              {{ t('checkbox') }} c
            </van-checkbox>
          </van-col>
        </van-row>
      </van-checkbox-group>

      <view class="mt-4">
        <van-row :gutter="16">
          <van-col>
            <van-button
              type="primary"
              @click="checkAll"
            >
              {{ t('checkAll') }}
            </van-button>
          </van-col>
          <van-col>
            <van-button
              type="primary"
              @click="toggleAll"
            >
              {{ t('inverse') }}
            </van-button>
          </van-col>
        </van-row>
      </view>
    </demo-block>

    <demo-block
      :title="t('title5')"
      :card="false"
    >
      <van-checkbox-group v-model="state.result3">
        <van-cell-group inset>
          <van-cell
            v-for="(item, index) in state.list"
            :key="index"
            clickable
            :title="`${t('checkbox')} ${item}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox
                :ref="setRefs(index)"
                :name="item"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </demo-block>

    <demo-block :title="t('indeterminate')">
      <van-checkbox
        v-model="state.isCheckAll"
        :indeterminate="state.isIndeterminate"
        @change="checkAllChange"
      >
        {{ t('checkAll') }}
      </van-checkbox>
      <view class="border-0 border-b border-neutral-200 border-solid my-3" />
      <van-checkbox-group
        v-model="state.result4"
        @change="checkedResultChange"
      >
        <van-row :gutter="[0, 8]">
          <van-col
            v-for="item in list"
            :key="item"
            :span="24"
          >
            <van-checkbox :name="item">
              {{ t('checkbox') }} {{ item }}
            </van-checkbox>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
