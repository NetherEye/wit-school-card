import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.withCredentials = true //让ajax携带cookie

import './assets/css/public.css'
import 'babel-polyfill' // 解决 ie 或者其他浏览器Promise未定义的问题
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import fetch from '@/assets/http/fetch'
import allApi from '@/assets/api/school'

import '@/assets/http/global'

Vue.use(ElementUI)

import Crumbs from '@/components/Crumbs'
Vue.component('my-crumbs', Crumbs)

// import './assets/http/http'

Vue.config.productionTip = false

// 时间format
import moment from 'moment'
Vue.prototype.$moment = moment

import {
  Message
} from 'element-ui'

//拦截，没有登录的时候  退回登录页
router.beforeEach((to, from, next) => {
  if (to.name === '被迫下线') {
    next()
    return
  }
  fetch.get(allApi.isLogin, '', res => {
    if (res.code === 201) {
      window.location.href = res.data
    } else if (res.code === 403) {
      // 该角色没登录该系统的权限
      Message({
        type: 'error',
        message: res.message
      })
      setTimeout(() => {
        fetch.get(allApi.logout, '', res => {
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = res
        })
      }, 1500)
      return
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      if (to.name === '根页面') {
        next({
          name: '首页'
        })
      } else {
        next()
      }
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')