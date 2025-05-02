# uni-vant-router

## 介绍

uni-vant-router 是基于 uni-app 的路由封装，基于 uni-app 的路由封装。支持 H5 和微信小程序

## 安装

```shell
pnpm add -S uni-vant-router
```

## 创建路由实例

```javascript
import { createRouter } from 'uni-vant-router'

export const router = createRouter({
  routes: [
    { 
      path: '/pages/index/index',
      meta: {}
    }
  ],
  onLaunch: true // 如果需要在 launch 中启动路由，则设置为 true
})
```

## 注册路由

```javascript
import { createSSRApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

export function createApp() {
  const app = createSSRApp(App)

  app.use(router)

  return {
    app,
  }
}
```

## 编程式导航

除 `path`、`query` 参数外，其他参数同 `uni-app` 的导航方法。

**注：`path` 参数优先于 `url` 参数** 

```javascript
import { useRouter } from 'uni-vant-router'

const router = useRouter()

router.navigateTo({ path: '', query: {} })

router.redirectTo({ path: '', query: {} })

router.navigateBack({ delta: 1 })

router.reLaunch({ path: '', query: {} })

router.switchTab({ path: '', query: {} })
```

## 在 web-view 中使用

```javascript
import { useRouter } from 'uni-vant-router'

const router = useRouter()

// 从 H5 跳转小程序页面，其他导航类型同上，只增加了 engine 参数
router.navigateTo({ path: '', query: {}, engine: wx.miniProgram })
```

## 导航守卫

```javascript
const router = createRouter({ ... })

// 全局前置守卫
router.beforeEach((to, from, next)=>{
  
  // next 必须调用，支持使用 openType 指定跳转类型，支持：navigateTo、redirectTo、reLaunch、switchTab，默认为 navigateTo
  next()
})

// 全局后置守卫
router.afterEach((to, from)=>{
  console.log('to:', to)
  console.log('from:', from)
})
```

