// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'normalize.css'
import ElementUI from 'element-ui';
import JsonExcel from 'vue-json-excel'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/main.css';
import Box from '@/components/basic-components/Box';
import VueCookies from 'vue-cookies'
import store from './store'

Vue.use(VueCookies);
Vue.use(ElementUI);

Vue.component('downloadExcel', JsonExcel);
Vue.component('box', Box);

Vue.prototype.$message = ElementUI.Message;

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.defaults.withCredentials=false;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
