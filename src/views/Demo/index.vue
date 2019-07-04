<template>
    <div class="demo">

    </div>
</template>

<script>
import {getSocketUrl,legalOrderFindFun,loginSocketUrl} from '../../assets/js/api'
import io from 'socket.io-client'
export default {
    data(){
        return {

        }
    },
    computed:{
        token(){
            return this.$store.getters.user_info.token
        }
    },
    watch:{
        token(n,o) {
            console.log('token变化',n ,'<-',o)
        }
    },
    methods:{
        async init() {
          let key ;
          key =  await getSocketUrl(this).then(res => {
              return res;
          })
          if(key!=false) {
            this.socketUrl =await key.chatUrl
            await this.initWebSocket();
          } else this.$message.error({ message: '获取socket失败' });
        },
        async initWebSocket() {
          let that = this;
          let key0 = await loginSocketUrl(this,this.socketUrl,{
            token:this.token
          }).then(res => {
            console.log('登录成功-----------demo',res.data)
            return res;
          })
          this.socket = await io(this.socketUrl,{
                
            }, (res) => {
              console.log('res::链接socket::-----------demo',res,this.socket,'00000000000000000000000000000000000000000000')
            })
            // this.socket.open()
            this.socket.on('ping', (latency) => {
                this.socket.emit("pong")
                console.log('ping写入服务器：-----------demo',latency)
            });
            this.socket.on('pong', (latency) => {
                console.log('收到ping回复：-----------demo',latency)
            });
          this.socket.on('connect',  ()=>{
            console.log('client connect server-----------demo',this.socket,this.socket.id);
          });
          this.socket.on('disconnect', ()=>{
            console.log('client disconnect-----------demo',this.socket,this.socket.id);
          });
          this.socket.on('reconnect',(e) => {
              console.log('重新链接之后：-----------demo',e)
          })
          

          this.connect();
        },
        connect(){
            this.socket.on('chat_message', (res) => {
                console.log('fanhui:::::::-----------demo',res)
                let k = [res]
                this.$store.dispatch('_async_chatArrIn_item',k)
                this.$nextTick(() => {
                    
                });
                console.log(this.$route.path.indexOf('legal-currency-order')>=0)
                if(this.$route.path.indexOf('legal-currency-order')>=0){
                    console.log('已读-----------demo')
                    return {
                    code:200,
                    mark_read: true,
                    id:res.id
                    }
                }else{
                    console.log('维度-----------demo')
                    return {
                    code:200,
                    mark_read: false,
                    id:res.id
                    }
                }
            })
            

            let n = 0
            let a = [15547196541510002,15547180609560002,15547110187280004,15547101661630003,15547101292200002,15547095993820004,15547095506780003]
            setInterval(()=>{
                this.socket.emit('create_room',{
                        order_id:a[n],
                },(res)=> {
                    console.log(res,'新的发起对话-----------demo',)
                })
                n++
                a.push(a[n+1])
            },5000)
        },
    },
    mounted(){
        this.init()
    }
}
</script>

<style lang="scss" scoped>

</style>
