import { useLocale } from '@packages/ui/src/locale'

const { t, addLang } = useLocale()

addLang({
  'zh-CN': {
    add: '增加',
    red: '红色',
    tab: '标签',
    tag: '标签',
    desc: '描述信息',
    back: '返回',
    title: '标题',
    status: '状态',
    button: '按钮',
    option: '选项',
    search: '搜索',
    orange: '橙色',
    yellow: '黄色',
    purple: '紫色',
    custom: '自定义',
    content: '内容',
    username: '用户名',
    password: '密码',
    decrease: '减少',
    disabled: '禁用状态',
    uneditable: '不可编辑',
    basicUsage: '基础用法',
    usingUrl: '使用图片 URL',
    advancedUsage: '高级用法',
    loadingStatus: '加载状态',
  },
})

export function useTranslate(i18n: Record<string, unknown>) {
  if (i18n) {
    addLang(i18n)
  }

  return t
}
