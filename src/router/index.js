import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlist from '../views/Playlist.vue'
import Files from '../views/Files.vue'
import Player from '../views/Player.vue'
import IPAddr from '../views/IPAddr.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Playlist
  },
  {
    path: '/home',
    name: 'Home',
    component: Playlist
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
