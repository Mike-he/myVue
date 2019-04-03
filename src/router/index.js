import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/login/Login')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../components/order/Order')
    }
  ]
})
