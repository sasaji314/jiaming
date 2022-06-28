import Vue from 'vue'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false

// 设置反向代理，前端请求默认发送到 http://localhost:8081
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8081'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
