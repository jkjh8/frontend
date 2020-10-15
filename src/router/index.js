import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Files from '../views/Files.vue'
import Player from '../views/Player.vue'
import IPAddr from '../views/IPAddr.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/ipaddr',
    name: 'IPAddr',
    component: IPAddr
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
