/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:03:46
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-18 15:17:52
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {legalOrderFindFunTui} from './assets/js/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAliveComponents:[],//
    os_time:null,
    login:false,
    nav_item:'1',// 0 当前在个人信息  1 法币  2 资产 3 支付 4 logopage
    payment_nav:{
      payment_item:'1',// 在支付模块 顶级状态 0待支付 1已完成 2 进行中 3已关闭
      status:'1'
    },
    token:'',
    rember_username:'',
    rember_status:false,
    verification:false, //图片验证
    binding_type:'', // 谷歌 手机 邮箱 那个一
    init_user_info:{
      // accountType:'',//0 phone 1 email
      // email:'',
      // googleAuthTag:'', //0 wei 1 bang
      // ifPayPassword:'', //0 wei 1 shezhi
      // identityAuthStatus:'',
      // phone:'',
      // phoneAreaCode:'',
      // username:'',
      // role:'',
      // realName:'',
      // walletAddressBtc:'',
      // walletAddressEth:'',
      // walletAddressUsdt:'',
      // phoneAuthStatus:'',
      // emailAuthStatus:'',
      // googleAuthStatus:'',
      token:''
    },
    init_pay_file:{
      amount:'',
      amountUsd:'',
      amountActual:'',
      coinTypeId:'',
      expiredTimestamp:'',
      handingFee:'',
      id:'',
      merchantId:'',
      merchantName:'',
      receiptAddress:'',
      remark:'',
      status:'',
      time:'',
      endTime:'',
    },
    init_fabi_file:{
      amount:'',
      amountCny:'',
      cnyUnitPrice:'',
      complaintET:'',
      coinTypeId:'',
      id:'',//订单
      referenceCode:'',
      startTime:'',
      status:'',
      transactionType:'',
      expiredTimestamp:'',
      isComplaint:'',
      complaintStatus:'',
      complaintRole:'',
      result:'',
      certificate:'',
      complaintTime:'',
      complaintDealTime:'',
      receiptWay:'',
    },
    edit_ad:{},//编辑/发布告
    third:{//第三方跳转数据 // 通过这个让后台  返回add_pay_file 中的东西//多家参数
      orderId:''
    },
    table_refresh:false,//表单自动刷新
    table:{
      total:'',
      arr:[],
    },//表格数据存储
    place_order:{
      status:'0',//0 关闭 1 开启
      io:'',// 0 买入  1 卖出
      item:{},//当前选中对象
    },//买卖 
    chatTui:[
      
    ],
    chat:{
      merchantName:'芝麻',
      room_id:'12',
      monthTradedRate:'123',//30日成交数
      remark:'哈哈哈',
    },
    custome:true,
    chatArrIn:[
      
    ],
    lang:'zh',
  },
  mutations: {
    keepAlive (state, component) {
      // 注：防止重复添加（当然也可以使用Set）
      !state.keepAliveComponents.includes(component) && 
        state.keepAliveComponents.push(component)
    },
    noKeepAlive (state, component) {
      const index = state.keepAliveComponents.indexOf(component)
      index !== -1 &&
        state.keepAliveComponents.splice(index, 1)
    },
    _set_lang(state, item) {
      state.lang = item;
    },
    _set_custome(state, item) {
      state.custome = item
    },
    _set_os_time(state,item) {
      state.os_time = item
    },
    _delete_chatTui(state,item) {
      let b = state.chatTui;
      b.splice(b.findIndex(v => v.order_id === item), 1)
      // state.chatTui = b
    },
    _reset_chatTui(state){
      state.chatTui = []
    },
    _set_chatTui(state, item) {
      state.chatTui = item
    },
    _set_chat(state, item) {
      state.chat = item
    },
    _set_chatArrIn_before(state,item) {
      for(let i=0;i<item.length;i++){
        state.chatArrIn.unshift(item[i])
      }
      state.chatArrIn= [... new Set(state.chatArrIn)]
    },
    _reset_chatArrIn(state,item) {
      state.chatArrIn = []
    },
    _set_chatArrIn( state, item ) {
      // state.chatArrIn = item
      console.log('合并',item)
      // state.chatArrIn.push(item[0])
      for(let i=0;i<item.length;i++){
        state.chatArrIn.push(item[i])
      }
      state.chatArrIn= [... new Set(state.chatArrIn)]
      // let k = [...state.chatArrIn,...item]
      // state.chatArrIn = k;
      // state.chatArrIn.reverse().reverse()
      
    },
    _set_chatArrIn_item( state, item ) {
      // state.chatArrIn = item
      console.log('添加消息',item)
      state.chatArrIn.push(item[0])

      state.chatArrIn= [... new Set(state.chatArrIn)]
      
    },
    _set_rember_username(state,item){
      state.rember_username = item
    },
    _set_sign_out(state,) {
      state.login = false;
      state.init_user_info={
        token:''
      }
    },
    _set_init_user_info(state, item) {
      state.init_user_info = item
      state.login = true;
      // state.init_user_info.accountType = item.accountType;
      // state.init_user_info.email = item.email;
      // state.init_user_info.googleAuthTag = item.googleAuthTag;
      // state.init_user_info.ifPayPassword = item.ifPayPassword;
      // state.init_user_info.phone = item.phone;
      // state.init_user_info.phoneAreaCode = item.phoneAreaCode;
      // state.init_user_info.username = item.username;
      // state.init_user_info.role = item.role;
      // state.init_user_info.realName = item.realName;
      // state.init_user_info.phoneAuthStatus = item.phoneAuthStatus;
      // state.init_user_info.emailAuthStatus = item.emailAuthStatus;
      // state.init_user_info.googleAuthStatus = item.googleAuthStatus;
      // state.init_user_info.identityAuthStatus = item.identityAuthStatus;
    },
    _set_init_pay_file (state, item) {
      state.init_pay_file = item
      // state.init_pay_file.amount = item.amount;
      // state.init_pay_file.amountUsd = item.amountUsd;
      // state.init_pay_file.amountActual = item.amountActual;
      // state.init_pay_file.coinTypeId = item.coinTypeId;
      // state.init_pay_file.expiredTimestamp = item.expiredTimestamp;
      // state.init_pay_file.handingFee = item.handingFee;
      // state.init_pay_file.id = item.id;
      // state.init_pay_file.merchantId = item.merchantId;
      // state.init_pay_file.merchantName = item.merchantName;
      // state.init_pay_file.receiptAddress = item.receiptAddress;
      // state.init_pay_file.remark = item.remark;
      // state.init_pay_file.status = item.status;
      // state.init_pay_file.time = item.time;
      // state.init_pay_file.endTime = item.endTime;
      
    },
    _set_init_fabi_file(state,item) {
      state.init_fabi_file =item;
      // state.init_fabi_file.id= item.id;
      // state.init_fabi_file.amount=item.amount;
      // state.init_fabi_file.amountCny=item.amountCny;
      // state.init_fabi_file.cnyUnitPrice=item.cnyUnitPrice;
      // state.init_fabi_file.coinTypeId=item.coinTypeId;
      // state.init_fabi_file.referenceCode=item.referenceCode;
      // state.init_fabi_file.startTime=item.startTime;
      // state.init_fabi_file.complaintET=item.complaintET;
      // state.init_fabi_file.expiredTimestamp=item.expiredTimestamp;
      // state.init_fabi_file.status=item.status;
      // state.init_fabi_file.transactionType=item.transactionType;
      // state.init_fabi_file.isComplaint=item.isComplaint;
      // state.init_fabi_file.complaintStatus=item.complaintStatus;
      // state.init_fabi_file.result=item.result;
      // state.init_fabi_file.certificate=item.certificate;
      // state.init_fabi_file.complaintTime=item.complaintTime;
      // state.init_fabi_file.complaintDealTime=item.complaintDealTime;
      // state.init_fabi_file.receiptWay=item.receiptWay;
      // state.init_fabi_file.complaintRole = item.complaintRole;
    },
    _set_third_pay(state,item) {
      state.third.orderId = item.orderId;
    },
    _reset_third_pay(state,item) {
      state.third.orderId = ''
    },
    _set_table(state, item) {
      state.table = item
    },
    _set_place_order(state,item){
      state.place_order = Object.assign({},state.place_order,item)
    },
    _set_place_order_close(state,item){
      state.place_order.status = '0'
    },
    _set_table_refresh(state, item) {
      state.table_refresh = item.table_refresh
    },
    _set_rember_status(state, item) {
      state.rember_status = item
    },
    _set_verification(state, item) {
      state.verification = item
    },
    _set_nav_item(state,item) {
      state.nav_item = item
    },
    _set_binding_type (state , item ) {
      state.binding_type = item.binding_type
    },
    _set_edit_ad(state, item) {
      state.edit_ad = item;
    },
    _reset_edit_ad(state,item) {
      state.edit_ad = {}
    },
    _set_payment_nav(state,item) {
      state.payment_nav = item
    },
  },
  actions: {
    async_set_lang(context, args) {
      context.commit('_set_lang', args);
    },
    async__set_custome(context, args) {
      context.commit('_set_custome', args)
    },
    async_set_os_time(context,args) {
      context.commit('_set_os_time',args)
    },
    delteChatTui(content, args) {
      content.commit('_delete_chatTui', args)
    },
    _async_chatTui(content, args) {
      content.commit('_set_chatTui', args)
    },
    _async_chat(context, args) {
      context.commit('_set_chat', args)
    },
    _async_reset_chatTui(context,args){
      context.commit('_reset_chatTui',args)
    },
    _async_rest_chatArrIn(context,args) {
      context.commit('_reset_chatArrIn',args)
    },
    _async_chatArrIn_before(context,args){
      context.commit('_set_chatArrIn_before',args)
    },
    _async_chatArrIn(context, args ) {
      context.commit('_set_chatArrIn',args)
    },
    _async_chatArrIn_item(context, args ) {
      context.commit('_set_chatArrIn_item',args)
    },
    _async_set_sign_out(context, args) {
      context.commit('_set_sign_out', args)
    },
    _async_set_init_pay_file(context, args) {
      context.commit('_set_init_pay_file', args)
    },
    _async_set_init_fabi_file(context, args) {
      context.commit('_set_init_fabi_file', args)
    },
    _async_set_init_user_info(context, args) {
      context.commit('_set_init_user_info', args)
    },
    _async_set_third_pay(context, args) {
      context.commit('_set_third_pay', args)
    },
    _async_set_table(context, args) {
      context.commit('_set_table', args)
    },
    _async_set_place_order(context, args) {
      context.commit('_set_place_order', args)
    },
    _async_set_table_refresh(context, args) {
      context.commit('_set_table_refresh', args)
    },
    _async_set_place_order_close(context, args) {
      context.commit('_set_place_order_close', args)
    },
    _async_set_rember_status(context, args) {
      context.commit('_set_rember_status', args)
    },
    _async_set_verification(context, args) {
      context.commit('_set_verification', args)
    },
    _async_set_binding_type (context,args) {
      context.commit('_set_binding_type',args)
    },
    _async_set_edit_ad(context, args) {
      context.commit('_set_edit_ad', args)
    },
    _async_reset_edit_ad(context,args) {
      context.commit('_reset_edit_ad',args)
    },
    _async_set_payment_nav(context,args) {
      context.commit('_set_payment_nav',args)
    },
    _async_reset_third_pay(context,args) {
      context.commit('_reset_third_pay',args)
    },
    _async_set_rember_username(context,args) {
      context.commit('_set_rember_username',args)
    }
  },
  getters:{
    lang: state => {
      return state.lang;
    },
    custome: state => {
      return state.custome
    },
    os_time: state => {
      return state.os_time
    },
    chatTui: state => {
      return state.chatTui
    },
    chat: state => {
      return state.chat
    },
    chatArrIn: state => {
      return state.chatArrIn
    },
    rember_username:state=>{
      return state.rember_username
    },
    login:state => { // 获取用户登录状态
      return state.login
    },
    verification:state => {
      return state.verification
    },
    rember:state => {
      return state.rember_status
    },
    user_info:state => { // 获取用户信息
      return state.init_user_info;
    },
    nav_item:state => { //获取当前导航页面
      return state.nav_item;
    },
    username:state => { //获取用户名
      return state.init_user_info.username
    },
    table:state => { //获取表格数据
      return state.table;
    },
    place_order:state => {
      return state.place_order;
    },
    table_refresh:state => {
      return state.table_refresh;
    },
    binding_type:state => {
      return state.binding_type
    },
    init_fabi_file:state => {
      return state.init_fabi_file;
    },
    edit_ad:state => {
      return state.edit_ad;
    },
    payment_nav:state=>{
      return state.payment_nav;
    },
    init_pay_file:state=>{
      return state.init_pay_file;
    }
  }
})
