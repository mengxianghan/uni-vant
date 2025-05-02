<script setup lang="ts">
import { useTranslate } from '@/hooks'

const t = useTranslate({
  'zh-CN': {
    cell: '单元格',
    group: '分组',
    router: '页面导航',
    urlRoute: 'URL 跳转',
    vueRoute: '路由跳转',
    useSlots: '使用插槽',
    showIcon: '展示图标',
    showArrow: '展示箭头',
    largeSize: '单元格大小',
    groupTitle: '分组标题',
    insetGrouped: '卡片风格',
    verticalCenter: '垂直居中',
  },
})
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-cell-group>
        <van-cell
          :title="t('cell')"
          :value="t('content')"
        />
        <van-cell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      :title="t('insetGrouped')"
      :card="false"
    >
      <van-cell-group inset>
        <van-cell
          :title="t('cell')"
          :value="t('content')"
        />
        <van-cell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      :title="t('largeSize')"
      :card="false"
    >
      <van-cell
        :title="t('cell')"
        :value="t('content')"
        size="large"
      />
      <van-cell
        :title="t('cell')"
        :value="t('content')"
        size="large"
        :label="t('desc')"
      />
    </demo-block>

    <demo-block
      :title="t('showIcon')"
      :card="false"
    >
      <van-cell
        :title="t('cell')"
        :value="t('content')"
        icon="location-o"
      />
    </demo-block>

    <demo-block
      :title="t('showArrow')"
      :card="false"
    >
      <van-cell
        :title="t('cell')"
        is-link
      />
      <van-cell
        :title="t('cell')"
        is-link
        :value="t('content')"
      />
      <van-cell
        :title="t('cell')"
        is-link
        arrow-direction="down"
        :value="t('content')"
      />
    </demo-block>

    <demo-block
      :title="t('groupTitle')"
      :card="false"
    >
      <van-cell-group :title="`${t('group')} 1`">
        <van-cell
          :title="t('cell')"
          :value="t('content')"
        />
      </van-cell-group>
      <van-cell-group :title="`${t('group')} 2`">
        <van-cell
          :title="t('cell')"
          :value="t('content')"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      :title="t('useSlots')"
      :card="false"
    >
      <van-cell
        :value="t('content')"
        is-link
      >
        <template #title>
          {{ t('cell') }}
          <van-tag type="primary">
            {{ t('tag') }}
          </van-tag>
        </template>
      </van-cell>

      <van-cell
        icon="shop-o"
        :title="t('cell')"
      >
        <template #right-icon>
          <van-icon name="search" />
        </template>
      </van-cell>
    </demo-block>

    <demo-block
      :title="t('verticalCenter')"
      :card="false"
    >
      <van-cell
        center
        :title="t('cell')"
        :value="t('content')"
        :label="t('desc')"
      />
    </demo-block>
  </view>
</template>

<style lang="scss" scoped>
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>
