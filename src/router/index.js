import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Landing from '@/views/Landing'

import { RouteGuard } from '@/helpers/RouteGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authorized: true
    }
  },
  {
    path: '/connect',
    name: 'connect',
    component: Landing,
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve(RouteGuard)

export default router
