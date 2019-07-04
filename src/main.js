/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-04 16:11:07
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales/index'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import moment from 'moment';
import './assets/css/reset.css'

import bus from './assets/js/eventBus'



Vue.config.productionTip = false
Vue.prototype.bus = bus
Vue.prototype.axios = axios;
Vue.prototype.moment = moment
Vue.use(ElementUI);

// axios.defaults.baseURL = 'http://127.0.0.1:8085/pay/';//cookie 放在这下面 /pay 文件夹下
// axios.defaults.baseURL = 'http://192.168.10.71:8085/pay/';
// axios.defaults.baseURL = 'http://52.195.6.132:8086/zhima/';//cookie 放在这下面 /pay 文件夹下
// axios.defaults.baseURL = 'http://161.117.2.64:8085/pay/';//cookie 放在这下面 /pay 文件夹下
// axios.defaults.headers.post['Content-Type'] ='application/json'
axios.defaults.baseURL = '/pay/'
axios.defaults.withCredentials=true
axios.defaults.timeout = 2500000;
let allCookies = document.cookie;


axios.interceptors.request.use(function (config) {
  // Do something before request is sent
    config.cookie = allCookies;
    return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use( async function(res){ // 拦截请求后的状态
  let data = res.data;
  store.dispatch('async_set_os_time',res.headers.date)
  if(res.data.code ==407) {
    Vue.prototype.$message({
      type:"error",
      message:"登录过期，请重新登录！",
      duration:1300,
    })
    store.dispatch('_async_set_sign_out')
    store.dispatch('async__set_custome',false)
    router.push('/sign-in')
    return res
  }else{
    return res
  }
}, function (error) {
  // Do something with request error
  console.log(error,'错误',error.response)
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

