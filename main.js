import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import axios from 'axios'
// 设置反向代理，前端请求默认发送到 http://localhost:8081
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8081'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif