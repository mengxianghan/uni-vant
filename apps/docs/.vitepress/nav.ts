import { components, guide } from './sidebar'

export const navs = [
  { text: '指南', items: guide.reduce((prev, current) => {
    return [...prev, ...current.items]
  }, []) },
  { text: '组件', items: components.map(item => ({
    text: item.text,
    link: item.items[0].link,
  })) },
  { text: '示例', link: 'https://xuanyunet.com' },
  { text: '其他', items: [] },
  // {
  //   text: `v${version}`,
  //   items: [
  //     {
  //       text: '更新日志',
  //       link: 'https://xuanyunet.com',
  //     },
  //   ],
  // },
]
