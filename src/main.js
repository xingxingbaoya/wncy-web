import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/assets/font/font.scss'
import App from './App'
import store from './store'
import router from './router'
import Empty from '@/components/Empty'

/* utils */
import moment from 'moment'

// import 'moment/locale/zh-cn'
import lodash from 'lodash'
// px2rem 自适应
// import 'lib-flexible'

import '@/icons' // icon
import '@/permission'
import realImage from '@/directive/realimg'
import loadmore from '@/directive/loadmore'
// import '@/utils/rem'

Vue.use(ElementUI)
Vue.use(realImage)
Vue.use(loadmore)

Vue.component('Empty', Empty)

Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '_', { value: lodash })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

