/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-18 15:36:18
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// const LogoPage = () => import('./views/LogoPage/LogoPage.vue')
import LogoPage from './views/LogoPage/LogoPage.vue'
Vue.use(Router)

let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LogoPage',
      component: LogoPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    /**
     * 个人中心
     */
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/PersonalCenter/index.vue')
    },
    {
      path: '/agency-certification',
      name: 'AgencyCertification',
      component: () => import('./views/PersonalCenter/AgencyCertification.vue')
    },
    {
      path: '/identity-authentication',
      name: 'IdentityAuthentication',
      component: () => import('./views/PersonalCenter/IdentityAuthentication.vue')
    },
    {
      path: '/reset-pass',
      name: 'ResetPass',
      component: () => import('./views/PersonalCenter/ResetPass.vue')
    },
    {
      path: '/pay-pass',
      name: 'PayPass',
      component: () => import('./views/PersonalCenter/PayPass.vue')
    },
    {
      path: '/google-authentication',
      name: 'GoogleAuthentication',
      component: () => import('./views/PersonalCenter/GoogleAuthentication.vue')
    },
    {
      path: '/reset-google-authentication',
      name: 'ResetGoogleAuthentication',
      component: () => import('./views/PersonalCenter/ResetGoogleAuthentication.vue')
    },
    {
      path: '/binding-phone',
      name: 'BindingPhone',
      component: () => import('./views/PersonalCenter/BindingPhone.vue')
    },
    {
      path: '/binding-email',
      name: 'BindingEmail',
      component: () => import('./views/PersonalCenter/BindingEmail.vue')
    },
    /**
     * 法币模块
     */
    {
      path: '/legal-currency',
      name: 'legalCurrency',
      component: () => import('./views/LegalCurrency/LegalCurrency.vue')
    },
    {
      path: '/legal-currency-order/:isDetal/',
      name: 'legalCurrencyOrder',
      component: () => import('./views/LegalCurrency/LegalCurrencyOrder.vue')
    },
    {
      path: '/my-advertisements',
      name: 'MyAdvertisements',
      component: () => import('./views/LegalCurrency/MyAdvertisements.vue')
    },
    {
      path: '/my-legal-order-list',
      name: 'MyLegalOrderList',
      component: () => import('./views/LegalCurrency/MyLegalOrderList.vue'),
      meta: {
        title: 'B页面',
        keepAlive: true // 这里指定B组件的缓存性
      }
    },
    {
      path: '/publish-advertisements',
      name: 'PublishAdvertisements',
      component: () => import('./views/LegalCurrency/PublishAdvertisements.vue')
    },
    {
      path: '/currency-dealer/:id/',
      name: 'CurrencyDealer',
      component: () => import('./views/CurrencyDealer/CurrencyDealer.vue')
    },
    /**
     * 登录模块
     */
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('./views/LoginModel/SignIn.vue')
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('./views/Demo/index.vue')
    },
    {
      path: '/register-user',
      name: 'Register',
      component: () => import('./views/LoginModel/Register.vue')
    },
    {
      path: '/forget-pass',
      name: 'ForgetPass',
      component: () => import('./views/LoginModel/ForgetPass.vue')
    },
    /**
     * 用户协议模块
     */
    {
      path: '/user-know',
      name: 'User',
      component: () => import('./views/UserKnow/User.vue')
    },
    {
      path: '/user-know-legal',
      name: 'UserLegal',
      component: () => import('./views/UserKnow/LegalShow.vue')
    },
    {
      path: '/user-know-privacy',
      name: 'UserPrivacy',
      component: () => import('./views/UserKnow/Privacy.vue')
    },
    /**
     * 资产管理模块
     */
    {
      path: '/asset-manage',
      name: 'AssetManagement',
      component: () => import('./views/AssetManagement/AssetManagement.vue')
    },
    {
      path: '/coin-address-manage',
      name: 'CoinAddressManage',
      component: () => import('./views/AssetManagement/CoinAddressManage.vue')
    },
    {
      path: '/asset-operation-record',
      name: 'AssetOperationRecord',
      component: () => import('./views/AssetManagement/AssetOperationRecord.vue')
    },
    /**
     * 支付模块
     */
    {
      path: '/payment-system',
      name: 'PaymentSystem',
      component: () => import('./views/PaymentSystem/PaymentSystem.vue')
    },
    {
      path: '/payment-order',
      name: 'PaymentOrder',
      component: () => import('./views/PaymentSystem/PaymentOrder.vue')
    },
    /**
     * 第三方
     */
    {
      path:'/third/:orderId/',//订单iD
      name: 'ThirdPart',
      component: () => import('./views/ThirdPart/ThirdPart.vue')
    },
    {
      path:'/loadding',//订单iD
      name: 'LoaddingThrid',
      component: () => import('./views/ThirdPart/LoaddingThrid.vue')
    },
    {
      path: '/new_third',
      name: 'client',
      component: () => import('./views/ThirdPart/Client.vue')
    },
    /**
     * LoGo 模块
     */
    {
      path: '/logo-page',
      name: 'LogoPage',
      component: () => import('./views/LogoPage/LogoPage.vue')
    },
    {
      path: '/payment-detail',
      name: 'PaymentDetail',
      component: () => import('./views/LogoPage/PaymentDetail.vue')
    },
    {
      path:'*',
      redirect:'legal-currency'
    },
  ]
})


const whiteList = ['/sign-in', '/new_third' , '/register-user', '/forget-pass', '/user-know','/user-know-legal','/user-know-privacy','/third/:orderId/','/loadding','/logo-page']

//路由拦截器
// router.beforeEach((to, from, next) => {
  // let user = localStorage.getItem('userPayMsg')
  // user = user ? user.user : ''
  // user = user || store.state.user
  // console.log(to.path)
  // console.log('router.beforeEach:', user)
  // if (user) { // 判断是否登录
  //   next();
  // } else { //没登录 则跳转页面
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     getUserInfo().then(res => {
  //       if (res.code == 200) {
  //         store.dispatch('_async_initUserInfo', res.data)
  //         next()
  //       } else {
  //         next({
  //           path: '/logi/login',
  //           query: { redirect: to.fullPath }
  //         })
  //       }
  //     }).catch(err =>
  //       next({
  //         path: '/logi/login',
  //         query: { redirect: to.fullPath }
  //       }))
  //   }
  // }
// });
router.beforeEach((to, from, next) => {
  // 在路由全局钩子beforeEach中，根据keepAlive属性，统一设置页面的缓存性
  // 作用是每次进入该组件，就将它缓存
  if (to.meta.keepAlive) {
    // console.log(to.name)
    store.commit('keepAlive', to.name)
    next()
  }else{
    next()
  }
})
export default router;