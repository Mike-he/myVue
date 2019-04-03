import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/Login'
import Login from '@/components/Login'
import Order from '@/components/order/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    }
  ]
})
