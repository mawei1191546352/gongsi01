/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-18 18:01:22
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
      component: LogoPage,
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 个人中心
     */
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/PersonalCenter/index.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/agency-certification',
      name: 'AgencyCertification',
      component: () => import('./views/PersonalCenter/AgencyCertification.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/identity-authentication',
      name: 'IdentityAuthentication',
      component: () => import('./views/PersonalCenter/IdentityAuthentication.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/reset-pass',
      name: 'ResetPass',
      component: () => import('./views/PersonalCenter/ResetPass.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/pay-pass',
      name: 'PayPass',
      component: () => import('./views/PersonalCenter/PayPass.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/google-authentication',
      name: 'GoogleAuthentication',
      component: () => import('./views/PersonalCenter/GoogleAuthentication.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/reset-google-authentication',
      name: 'ResetGoogleAuthentication',
      component: () => import('./views/PersonalCenter/ResetGoogleAuthentication.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/binding-phone',
      name: 'BindingPhone',
      component: () => import('./views/PersonalCenter/BindingPhone.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/binding-email',
      name: 'BindingEmail',
      component: () => import('./views/PersonalCenter/BindingEmail.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 法币模块
     */
    {
      path: '/legal-currency',
      name: 'legalCurrency',
      component: () => import('./views/LegalCurrency/LegalCurrency.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/legal-currency-order/:isDetal/',
      name: 'legalCurrencyOrder',
      component: () => import('./views/LegalCurrency/LegalCurrencyOrder.vue'),
      meta: {
        title: 'B页面',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/my-advertisements',
      name: 'MyAdvertisements',
      component: () => import('./views/LegalCurrency/MyAdvertisements.vue'),
      meta: {
        title: 'B页面',
        keepAlive: true // 这里指定B组件的缓存性
      }
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
      component: () => import('./views/LegalCurrency/PublishAdvertisements.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/currency-dealer/:id/',
      name: 'CurrencyDealer',
      component: () => import('./views/CurrencyDealer/CurrencyDealer.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 登录模块
     */
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('./views/LoginModel/SignIn.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('./views/Demo/index.vue'),
    },
    {
      path: '/register-user',
      name: 'Register',
      component: () => import('./views/LoginModel/Register.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/forget-pass',
      name: 'ForgetPass',
      component: () => import('./views/LoginModel/ForgetPass.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 用户协议模块
     */
    {
      path: '/user-know',
      name: 'User',
      component: () => import('./views/UserKnow/User.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/user-know-legal',
      name: 'UserLegal',
      component: () => import('./views/UserKnow/LegalShow.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/user-know-privacy',
      name: 'UserPrivacy',
      component: () => import('./views/UserKnow/Privacy.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 资产管理模块
     */
    {
      path: '/asset-manage',
      name: 'AssetManagement',
      component: () => import('./views/AssetManagement/AssetManagement.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/coin-address-manage',
      name: 'CoinAddressManage',
      component: () => import('./views/AssetManagement/CoinAddressManage.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/asset-operation-record',
      name: 'AssetOperationRecord',
      component: () => import('./views/AssetManagement/AssetOperationRecord.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 支付模块
     */
    {
      path: '/payment-system',
      name: 'PaymentSystem',
      component: () => import('./views/PaymentSystem/PaymentSystem.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/payment-order',
      name: 'PaymentOrder',
      component: () => import('./views/PaymentSystem/PaymentOrder.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * 第三方
     */
    {
      path:'/third/:orderId/',//订单iD
      name: 'ThirdPart',
      component: () => import('./views/ThirdPart/ThirdPart.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path:'/loadding',//订单iD
      name: 'LoaddingThrid',
      component: () => import('./views/ThirdPart/LoaddingThrid.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/new_third',
      name: 'client',
      component: () => import('./views/ThirdPart/Client.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    /**
     * LoGo 模块
     */
    {
      path: '/logo-page',
      name: 'LogoPage',
      component: () => import('./views/LogoPage/LogoPage.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path: '/payment-detail',
      name: 'PaymentDetail',
      component: () => import('./views/LogoPage/PaymentDetail.vue'),
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
    },
    {
      path:'*',
      redirect:'legal-currency',
      meta: {
        title: '',
        keepAlive: false // 这里指定B组件的缓存性
      }
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


// router.beforeEach((to, from, next) => {
//   // 在路由全局钩子beforeEach中，根据keepAlive属性，统一设置页面的缓存性
//   // 作用是每次进入该组件，就将它缓存
//   if (to.meta.keepAlive) {
//     // console.log(to.name)
//     store.commit('keepAlive', to.name)
//     next()
//   }else{
//     // store.commit('noKeepAlive', from.name)
//     next()
//   }
// })
export default router;