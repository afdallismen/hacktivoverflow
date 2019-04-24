import Vue from 'vue'
import Buefy from 'buefy'
import CKEditor from '@ckeditor/ckeditor5-vue'

import 'buefy/dist/buefy.css'
import 'bulma-divider/dist/css/bulma-divider.min.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/padding.css'
import './assets/margin.css'

Vue.use(Buefy)
Vue.use(CKEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
