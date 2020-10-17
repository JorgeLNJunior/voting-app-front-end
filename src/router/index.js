import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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

export default router
