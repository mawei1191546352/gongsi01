<template>
    <div class="reset-google-authentication">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="reset-google-authentication-box">
            <div class="file_google_modify_box">
                <div class="file_google_modify_nav">
                    <span @click="go_file_center">{{$t('res_ggole.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{this.type_binding=='email'? $t('info_item.nav_email'):(this.type_binding=='phone' ?$t('info_item.nav_phone'):$t('info_item.nav_google'))}}</span>
                </div>
                <div class="phone_email_google_nav">
                    <div v-show="email==null?true:false" class="email_binding binding" :class="type_binding=='email' ? 'active_binding':''" @click="go_type(0)">{{$t('bind_item.bind_email')}}</div><div class="phone_binding binding" :class="type_binding=='phone' ? 'active_binding':''" @click="go_type(1)">{{$t('bind_item.bind_phone')}}</div><div class="google_binding binding" :class="type_binding=='google' ? 'active_binding':''" @click="go_type(2)">{{$t('bind_item.bind_google')}}</div>
                </div>
                <div class="file_google_modify_body">
                    <h3>1.{{$t('res_google.item1_h')}}</h3>
                    <p>{{$t('res_google.item1_p1')}}</p>
                    <p style="color:red;" class="blink">{{$t('res_google.item1_p2')}}</p>
                    <!-- <span class="qrcode"><img :src="img_url" alt="" ref="img" @error="img_error"></span><span class="qrcode_text"><i class="qrcode_text_title">密钥</i><br><i class="qrcode_text_content">{{qrcode.toUpperCase()}}</i><i class="qrcode_text_do tag-read" :data-clipboard-text="qrcode.toUpperCase()" @click="copyAddressFun()">复制</i></span> -->
                    <span class="qrcode"><img :src="img_url" alt="" ref="img" ></span><span class="qrcode_text"><i class="qrcode_text_title">{{$t('bind_google.key')}}</i><br><i class="qrcode_text_content">{{qrcode.toUpperCase()}}</i><i class="qrcode_text_do tag-read" :data-clipboard-text="qrcode.toUpperCase()" @click="copyAddressFun()">{{$t('info_iten.copy')}}</i></span>
                    <h3>2.{{$t('res_google.item2_h')}}</h3>
                    <el-input class=" send_email" v-model="email_code"  :placeholder="$t('info_item.p_email_code')  " ></el-input><span class=" send_email_button" @click="send_email_fun">{{send_two}}</span>
                    <el-input class="innner_left google_verification" type="text" v-model="google_verification"  :placeholder="$t('info_item.p_google_code')" ></el-input>
                    <el-input class="innner_left google_verification" type="text" v-model="google_verification_new"  :placeholder="$t('info_item.p_google_code')" ></el-input>
                    <el-input class="innner_left input_info" type="button" :value="$t('info_item.old_pass_error')" v-show="input_info"></el-input>
                    <el-input class="innner_left input_button" type="button" :value="$t('info_item.submit')" @click.native="submit_fun"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import qs from 'qs'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import{
    bindingPhoneEmailGoogle
}from '../../assets/js/api.js'
export default {
    components:{
        'top-nav':TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            // 
            qrcode:'fdkngfkkfdmk',
            google_verification:'',
            google_verification_new:'',
            email_code:'',
            input_info:false,
            img_url_test:'',
            submit_info:false,
            info_end:false,

            can_send_end:true,
            top_box:false,
            send_two:this.$t('info_item.get_code'),
        }
    },
    created(){
        let binding_type = this.$route.params.type
        if(binding_type) {
            this.$store.dispatch({
                type:'_async_set_binding_type',
                binding_type
            })
        }
        this.axios.post('/user/getGoogleAuthInfo').then((res) => {
            let data = res.data;
            if(data.code == 200) {
                this.qrcode = data.data.secret;
                // this.img_url_test =data.data.url;
                let k = data.data.url;
                this.getPath(k)
                
            }else{
                this.$message({
                    type:'error',
                    message:data.message
                })
            }
        }).catch((err) => {
            console.log(err)
            this.$message({
                type:'waring',
                message:err
            })
        })
    },
    computed:{
        img_url:{
            set:function (v) {
                this.img_url_test = v
            },
            get:function () {
                return this.img_url_test;
            }
        },
        type_binding:{
           set:function (v) {
                let binding_type = v
                this.$store.commit({
                    type:'_set_binding_type',
                    binding_type
                })
                // return this.$store.state.binding_type;
            },
            get:function () {
                return this.$store.state.binding_type;
            }
        },
        email() {
            // return '';
            return this.$store.getters.user_info.email;
        },
        email_phone:{
            get:function () {
                return this.$store.state.register_type == 'email' ? this.$store.state.email :this.$store.state.phone;
            }
        },
    },
    methods:{
        getPath(key){
            this.axios.post('/file/getUrl',qs.stringify({key:key}))
            .then((res) => {
                let data = res.data;
                if(data.code == 200){
                    let url = data.data.url
                    this.img_url_test = url;
                }else{
                   this.$message({
                        type:'error',
                        message:data.message
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        close_box(){
            this.top_box = false;
        },
        go_type(n){
            if(n==0) {
                this.type_binding = 'email'
                this.$router.push('/binding-email')
            }else if(n==1) {
                this.type_binding = 'phone'
                this.$router.push('/binding-phone')
            }else if(n == 2) {
                this.type_binding = 'google'
                this.$router.push('/google-authentication')
            }
        },
        go_file_center() {
            this.$router.push('/personal')
            this.$store.commit('_set_nav_item','0')
        },
        send_email_fun() {
            // 
            // this.$message({
            //     type: 'success',
            //     message: '发送验邮箱证码成功!'
            // });
            if(this.can_send_end ) {
                // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:this.register_type == 'phone'? 0:1,
                    behaviorType:5,//绑定谷歌验证器
                    number:this.email_phone,
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            message: data.message,
                            type: 'success',
                            duration:1100,
                        });
                        this.can_send = false
                    
                    }else{
                        this.$message({
                            message: data.message,
                            type: 'waring',
                            duration:1100,
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
                this.can_send_end = false
                let time = 60;
                let t = setInterval(()=>{
                    if(time == 0){
                    time = 60;
                    this.can_send_end = true;
                    this.send_two = this.$t('info_item.get_code')
                    clearInterval(t)
                    }else{
                    this.send_two = --time + 's'
                    }
                },1000)
            }
        },
        submit_fun() {
            // 
            if(this.google_verification != '' && this.google_verification_new != '' && this.email_code != '') {
                this.axios.post('/user/changeGoogleAuth',qs.stringify({
                    code:this.email_code,
                    oldGoogleCode:this.google_verification,
                    newGoogleCode:this.google_verification_new,
                })).then((res) => {
                    let data = res.data;
                    if(data.code==200){
                        this.$message({
                            type:'success',
                            message:data.message,
                            duration:1100,
                        })
                        this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
                    }else{
                        this.$message({
                            type:'error',
                            message:data.message,
                            duration:1100,
                        })
                    }
                }).catch((err) => {

                })
            }else{
                this.submit_info = true; //错误提示
            }
            // this.input_info = true;
        },
        copyAddressFun(){
            let that =this;
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
                console.log('复制成功')
                // 释放内存
                clipboard.destroy()
                that.$message({
                    message: this.$t('info_item.copy_succeed'),
                    type: 'success',
                    center:true,
                    duration:500,
                });
            })
            clipboard.on('error', e => {
                // 不支持复制
                console.log('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
            })
        },
    }
}
</script>

<style lang="scss">
.reset-google-authentication{
    .reset-google-authentication-box{
        height: 50.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_google_modify_box{
            width: 60rem /* 800/20 */;
            // height: 44rem /* 880/20 */;
            // height: 40rem /* 800/20 */;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            padding: .75rem /* 15/20 */  2.5rem /* 50/20 */;
            font-size:.7rem /* 14/20 */;
            margin-bottom: 1rem /* 20/20 */;
            box-sizing: border-box;
            margin-top: 7.05rem /* 141/20 */;
            .file_google_modify_nav{
                text-align: left;
                font-size:.8rem /* 16/20 */;
                font-weight:400;
                color:rgba(51,51,51,1);
                span{
                    cursor: pointer;
                }
                padding-bottom: .5rem /* 10/20 */;
                border-bottom: .05rem /* 1/20 */ solid rgba(204,204,204,1);
            }
            .file_google_modify_body{
                font-size:.7rem /* 14/20 */;
                font-weight:400;
                color:rgba(153,153,153,1);
                margin-top: .5rem /* 10/20 */;
                text-align: left;
                .blink{
                    color: #dd4814;
                    animation: blink 1s linear infinite;  
                    /* 其它浏览器兼容性前缀 */
                    -webkit-animation: blink 1s linear infinite;
                    -moz-animation: blink 1s linear infinite;
                    -ms-animation: blink 1s linear infinite;
                    -o-animation: blink 1s linear infinite;
                }
                @keyframes blink{
                0% { opacity: 1; }
                    50% { opacity: 1; }
                    50.01% { opacity: 0; }
                    100% { opacity: 0; }
                }
                i{
                    display: inline-block;
                    text-align: left;
                    line-height: 2rem /* 40/20 */;
                }
                .el-input{
                    width: 21rem!important /* 420/20 */;
                    height: 2.25rem /* 45/20 */;
                }
                .el-input__inner{
                    height: 2.25rem!important /* 45/20 */;
                    line-height: 2.25rem!important /* 45/20 */;
                    border-radius: 0;
                }
                .innner_left{
                    width: 28rem!important /* 420/20 */;
                }
                .send_email{
                    margin-top: 1rem /* 20/20 */;
                }
                .send_email_button{
                    display: inline-block;
                    margin-top: 1rem /* 20/20 */;
                    height: 2.15rem /* 43/20 */;
                    width: 7rem /* 140/20 */;
                    border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
                    border-left: none;
                    vertical-align:top;
                    line-height: 2.15rem /* 43/20 */;
                    text-align: center;
                    cursor: pointer;
                    color: rgba(147,195,233,1);
                }
                .google_verification{
                    margin-top: 1rem /* 20/20 */;
                }
                .input_button{
                    margin-top: .5rem /* 10/20 */;
                    margin-bottom: 1.5rem!important /* 30/20 */;
                    height: 1.5rem!important /* 30/20 */;
                    .el-input__inner{
                        background:rgba(101,169,224,1);
                        color: white;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .input_info{
                    margin-top: .5rem /* 10/20 */;
                    // margin-bottom: .5rem /* 10/20 */;
                    height: 1.5rem!important /* 30/20 */;
                    .el-input__inner{
                        background:rgba(255,211,217,1);
                        height: 1.5rem!important /* 30/20 */;
                        line-height: 1.5rem!important /* 30/20 */;
                        border: none;
                        color: black;
                        text-align: center;
                    }
                }
                h3{
                    color:rgba(102,102,102,1);
                    text-align: left;
                    margin-top: 3.4rem /* 68/20 */;
                    line-height: 1.5rem /* 30/20 */;
                }
                p{
                    text-align: left;
                    line-height: 1.5rem /* 30/20 */;
                }
                .apple{
                    margin-top: .9rem /* 18/20 */;
                    display: inline-block;
                    color:rgba(255,255,255,1);
                    font-weight:400;
                    width:7.4rem /* 148/20 */;
                    height:2.2rem /* 44/20 */;
                    line-height: 2.2rem /* 44/20 */;
                    background:rgba(92,154,204,1);
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    cursor: pointer;
                    position: relative;
                }
                .apple:before{
                    content: url('../../assets/images/agency/apple@3x.png');
                    position: absolute;
                    display: inline-block;
                    width:.9rem /* 18/20 */;
                    height:1.05rem /* 21/20 */;
                    z-index: 100;
                    top: .1rem /* 2/20 */;
                    left:15%;
                }
                .android{
                    margin-left: 1.5rem /* 30/20 */;
                    display: inline-block;
                    color:rgba(255,255,255,1);
                    font-weight:400;
                    width:7.4rem /* 148/20 */;
                    height:2.2rem /* 44/20 */;
                    line-height: 2.2rem /* 44/20 */;
                    background:rgba(92,154,204,1);
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    cursor: pointer;
                    position: relative;
                }
                .android:before{
                    content: url('../../assets/images/agency/android@3x.png');
                    position: absolute;
                    display: inline-block;
                    width:.9rem /* 18/20 */;
                    height:1.05rem /* 21/20 */;
                    z-index: 100;
                    top: .1rem /* 2/20 */;
                    left:12%;
                }
                .qrcode{
                    margin-top: 1.5rem /* 30/20 */;
                    display: inline-block;
                    width:6.7rem /* 134/20 */;
                    height:6.7rem /* 134/20 */;
                    // background-color: black;
                    // background: attr(data-img_url) ;
                    position: relative;
                    img{
                        display: inline-block;
                        width:6.7rem /* 134/20 */;
                        height:6.7rem /* 134/20 */;
                    }
                }
                .qrcode::before{
                    width:6.7rem /* 134/20 */;
                    height:6.7rem /* 134/20 */;
                    position: absolute;
                    top: 0;
                    left: 0;
                    // content: attr(data-img_url);
                }
                .qrcode_text{
                    display: inline-block;
                    height: 1.5rem /* 30/20 */;
                    margin-left: 1.5rem /* 30/20 */;
                    .qrcode_text_title{
                        line-height: 1rem;
                    }
                    .qrcode_text_content{

                    }
                    .qrcode_text_do{
                        margin-left: 5.5rem /* 10/20 */;
                        color:#5C9ACC;
                        cursor: pointer;
                    }
                    i{
                        display: inline-block;
                        text-align: left;
                        line-height: 2rem /* 40/20 */;
                        color:rgba(153,153,153,1);
                        width: 5rem /* 100/20 */;
                    }
                }
            }
            .phone_email_google_nav{
                width: 22.1rem /* 442/20 */;
                height: 1.75rem /* 35/20 */;
                margin-top: .5rem /* 10/20 */;
                text-align: left;
                .binding{
                    display: inline-block;
                    width: 7.3rem /* 146/20 */;
                    height: 1.65rem /* 33/20 */;
                    border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                    line-height: 1.65rem /* 33/20 */;
                    text-align: center;
                }
                .email_binding{
                    border-right: none;
                }
                .phone_binding{
                    
                }
                .google_binding{
                    border-left: none;
                }
                .binding.active_binding{
                    background: rgba(92,154,204,1);
                    color: white;
                }
            }
        }
        @media screen and(max-width: 480px) {
            .file_google_modify_box{
                width:100%;
            }
        }
    }
}
</style>
