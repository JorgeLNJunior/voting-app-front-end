import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Decode from 'jwt-decode'
import isAfter from 'date-fns/isAfter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/survey/:id',
    name: 'SurveyShow',
    component: () => import('../views/Survey.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/errors/Error404.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/errors/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('AUTH_TOKEN')) {
    const decode = Decode(localStorage.getItem('AUTH_TOKEN'))
    if (isAfter(Date.now(), decode.expiresIn)) {
      localStorage.removeItem('AUTH_TOKEN')
    }
    next()
  }
  next()
})

export default router
