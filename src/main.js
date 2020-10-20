import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import io from 'socket.io-client'
import http from './api/http'

const socket = io('http://' + window.location.hostname + ':12300')
Vue.prototype.$socket = socket
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
