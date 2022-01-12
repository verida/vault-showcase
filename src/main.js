import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as _ from 'underscore'

import '@/plugins'
import '@/assets/scss/index.scss'

// import Vue from 'vue'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)

Vue.config.productionTip = false

window._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
