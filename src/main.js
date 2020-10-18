import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import io from 'socket.io-client'

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

// var socket = io('http://localhost:12300', {
//   transports: ['websocket']
// })
// Vue.prototype.$socket = socket
const socket = io('http://localhost:12300')
Vue.prototype.$socket = socket

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

// Vue.use(VueNativeSock, 'ws://localhost:12300')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
