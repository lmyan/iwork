import Vue from 'vue'
import App from './App'
import { router } from './router/index'
import store from './store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import moment from 'moment'
import mock from './mock'

Vue.use(iView)

Vue.prototype.moment = moment
Vue.mock = mock
Vue.config.productionTip = false

/* 启动模拟后台数据 */
// Vue.mock.init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
