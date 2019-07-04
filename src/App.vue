<template>
  <div id="app" class="">
    <div id="voice2" style="height:0px"></div>
    <router-view/>
      
  </div>
</template>
<script>
import Worker from './assets/js/worker.js'
import Vue from 'vue'
import { heartB,SignOut,getUserByOrder,
getSocketUrl,startConnection,
loginSocketUrl,legalOrderFindFun,
getStatus,setMarkRead } from './assets/js/api'
// import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {
            lineStatus:null,
            workerHeart:null,

            showChat: false,
            newMessage: 0,
            socketUrl:'',
            socket:null,
            arrchatTui:[],
            audio_src:require('./assets/audio/message.mp3')
        }
    },
    created(){
      // 在页面加载时读取localStorage里的状态信息
      localStorage.getItem("payment_damai") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("payment_damai"))));
      
      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
          localStorage.setItem("payment_damai",JSON.stringify(this.$store.state))
      })
      
      // this.$store.dispatch('_async_chatTui',[])
    },
    computed:{
      login(){
        return this.$store.getters.login
      },
      nav_item(){
        return this.$store.getters.nav_item
      },
      init_fabi_file(){
        return this.$store.getters.init_fabi_file
      },
      chat(){
        return this.$store.getters.chat
      },
      closeSocket(){
        return !(this.$route.path.indexOf('/sign-in')>=0 
      || this.$route.path.indexOf('/register-user')>=0 
      || this.$route.path.indexOf('/forget-pass')>=0
      || this.$route.path.indexOf('/user-know')>=0
      || this.$route.path.indexOf('/user-know-legal')>=0
      || this.$route.path.indexOf('/user-know-privacy')>=0
      || this.$route.path.indexOf('/third/') >= 0 ) 
      },
      token(){
        return this.$store.getters.user_info.token
      }
    },
    watch:{
      $route(to,from) {
        
      },
      closeSocket(n,o){
        // console.log(n,this.$refs.chatc)
        // if(n==false){
        //   if (this.$refs.chatc && this.$refs.chatc.stompClient )  {this.$refs.chatc.stompClient.disconnect(function(){
        //     console.log('断开socket')
        //   })}
        // }
      },
      login(n,o){
        if(n){
           this.autoLine()
           this.init()
        }else{
            if(this.lineStatus!=null){
              this.lineStatus.postMessage(
                  'close'
              )
            }
            this.socket.disconnect()
            this.socket.close()
        }
      },
      token(n,o) {
        // if(n && n!= o){
        //   // if(this.socket!=null) {
        //   //   this.socket.disconnect()
        //   //   this.socket = null;
        //   // }else{
        //   //   this.init()
        //   // }
        //   this.init()
        // }else{
        //     // this.socket.disconnect()
        //     // this.socket = null;
        // }
      }
    },
    async mounted(){
      // if(this.token!='' && this.token != null){
      //   if(this.socket!=null){
      //     this.socket.disconnect()
      //     this.socket = null;
      //     this.init()
      //   }else{
      //     this.init()
      //   }
      // }
      if(this.login){
        console.log(this.socket,'-----------------------------')
        // this.init()
      }
      
    },
    methods:{
      playVoice(file) {
            $('#voice2').html('<audio controls="controls" id="audio_player" style="display:none;"> <source src="' + file + '" > </audio><embed id="MPlayer_Alert" src="' + file + '" loop="false" width="0px" height="0px" /></embed>');
      },
      findOrder(item){
        let key;
        this.axios.post('/cnyOrder/findById',qs.stringify(item))
        .then((res) => {
            let data = res.data;
            if(res.data.code ==200){
                key =  data.data;
                item['amountCny']= key.amountCny
                item['id'] = key.id
                item['tradeCoinType'] = key.tradeCoinType
                item['role'] = key.role
                item['coinType'] = key.coinType
                item['tUsername'] = key.item?key.item.tUsername:''
                // console.log(item,'获取性情')
                this.$store.dispatch('_async_chatTui',item)
            }else{
                vm.$message({
                    type:'error',
                    message:data.message,
                    duration:1200,
                })
                key = false;
            }
        })
        .catch((error) => {
            console.log(error);
            vm.$message({
                type:'error',
                message:'服务器错误',
                duration:1200,
            })
            key = false
        })
      },
      async setMark(item){
        let key ;
        key = await setMarkRead(this,item).then(res => {
          return res
        })

      },
      async init() {
          let key ;
          key =  await getSocketUrl(this).then(res => {
              return res;
          })
          if(key!=false) {
            // this.socketUrl =await key.chatUrl.split('/websocket')[0];
            this.socketUrl = window.location.origin
            await this.initWebSocket();
          } else this.$message.error({ message: '获取socket失败' });
      },
      async initWebSocket() {
          let that = this;
          let key0 = await loginSocketUrl(this,this.socketUrl,{
            token:this.token
          }).then(res => {
            console.log('登录成功',res.data)
            return res;
          })
          // $.post(this.socketUrl+'/user/login',{
          //    token:this.token
          // },function(res) {
          //   console.log(res,'degnlu')
          // })
          // $.ajax({
          //   url: this.socketUrl+'/user/login',
          //   type: 'POST',
          //   dataType: "json",
          //   data:({token:this.token}),
          //   success: function (data) {
          //       console.log(data,'degnlu')
          //   },
          //   error: function(e){
          //     console.log("error",e);
          //   },
          //    xhrFields: {
          //     withCredentials: true    // 此字段标识要跨域传数据
          //   },
          //   crossDomain: true
          // });
          
          this.$store.dispatch('_async_reset_chatTui')
          this.socket = await io.connect(this.socketUrl,{
            path:'/websocket/socket.io',
          },(res) =>{

          })
          // this.socket = await io.connect(this.socketUrl,{
          //   extraHeaders: {
          //     'Authorization': this.token
          //   },
          //   query: 'token=' + this.token
          // },(res) => {
          //   console.log('res::链接socket::',res,this.socket,'00000000000000000000000000000000000000000000')
          // })
          
          // this.socket = await io.connect(this.socketUrl,{
          //   transportOptions: {
          //     polling: {
          //       extraHeaders: {
          //         'token': this.token
          //       }
          //     }
          //   }
          // },(res) => {
          //   console.log('res::链接socket::',res,this.socket,'00000000000000000000000000000000000000000000')
          // })
          this.socket.on('ping', (latency) => {
              this.socket.emit("pong")
              console.log('ping写入服务器：',latency)
          });
          this.socket.on('pong', (latency) => {
              console.log('收到ping回复：',latency)
          });
          this.socket.on('connect',  (e)=>{
            console.log('client connect server',this.socket,this.socket.id,e);
            
          });
          this.socket.on('reconnect',(e)=>{
            console.log('client reconnect server',this.socket,this.socket.id,e);
          })
          this.socket.on('disconnect', (e)=>{
            console.log('client disconnect',this.socket,this.socket.id,e);
            
          });
          this.connect();
      },
      connect(){
        this.socket.on('chat_message', (res) => {
          console.log('fanhui:::::::',res)
          console.log('：反：',this.moment().locale('zh-cn').format('HH:mm:ss'))
         
          let k = [res]
          this.$store.dispatch('_async_chatArrIn_item',k)
          this.$nextTick(() => {
            
          });
          if(this.$route.path.indexOf('legal-currency-order')>=0){
            console.log('设置已读------------------------',{
              room_id:res.room_id,
              msg_ids:[res.id]
            })
            this.setMark({
              room_id:res.room_id,
              msg_ids:[res.id]
            })
            return {
              code:200,
              mark_read: true,
              id:res.id
            }
          }else{
            console.log('设置未读')
            return {
              code:200,
              mark_read: false,
              id:res.id
            }
          }
        })
        this.socket.on('chat_unread',(res)=> {
          console.log('推送通知-------------',res)
          console.log('：推：',this.moment().locale('zh-cn').format('HH:mm:ss'))
          this.playVoice(this.audio_src)
          let item =res;
          this.$store.dispatch('_async_chatTui',item)
          // if(this.$route.path.indexOf('legal-currency-order')>=0){
          //   item.splice(item.findIndex(it => it.room_id === this.chat.room_id), 1)
          //   this.$store.dispatch('_async_chatTui',item)
          // }else{
          //   this.$store.dispatch('_async_chatTui',item)
          // }
        })
      },  
      autoLine(){
        if(this.lineStatus!=null){
            this.lineStatus.postMessage(
                'close'
            )
        }
        
        this.lineStatus = new Worker()
        this.lineStatus.postMessage(
            'infinite'
        )
        this.lineStatus.addEventListener('message',(res)=>{
            heartB(this)
        })
      },
      showChatAction() {
        this.showChat = !this.showChat;
        
        if (this.showChat && this.$route.path.indexOf("legal-currency-order") > -1) {
          getUserByOrder(this,{ id: this.$store.getters.init_fabi_file.id }).then(res => {
              let data = {};
              // if (this.$store.getters.init_fabi_file.transactionTypeOfUser == 0) {
              //   // 买入
              //   data = {
              //     userId: res.coinUser.userId,
              //     userName: res.coinUser.username
              //   };
              // } else {
              //   data = {
              //     userId: res.user.userId,
              //     userName: res.user.username
              //   };
              // }
              console.log('本地id和获取id：',this.$store.getters.init_fabi_file.item,res)
              if(this.$store.getters.init_fabi_file.item.oppositeUserId != res.coinUser.userId){
                data = {
                  userId: res.user.userId,
                  userName: res.user.username
                };
              }else{
                data = {
                  userId: res.coinUser.userId,
                  userName: res.coinUser.username
                };
              }
              this.bus.$emit("chat_connect", data);
          });
        }
    },
    beforeDestroy(){
        if(this.lineStatus!=null){
            this.lineStatus.postMessage(
                'close'
            )
        }
        this.socket.disconnect()
        this.socket= null;
        // if(this.socket!=null) {
        //   this.socket.disconnect()
        //   this.socket= null;
        // }
    }
  }
}
</script>

<style lang="scss">
// #app{
//   height: 100%;
//   background: #e5e5e5;
// }
</style>
