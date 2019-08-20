<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:09:47
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-04 17:44:42
 -->
<template>
    <div class="sign-in">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="sign-body">
            <div class="border"></div>
            <form class="form" onkeydown="if(event.keyCode==13)return false;" onSubmit="return checkSubmit();" >
                <h3 :class="lang">{{$t('sign_in.h3')}}</h3>
                <p class="p_input">
                    <input type="text" v-model="accountNumber" :placeholder="$t('sign_in.email_phone_placeholder')">
                </p>
                <p class="p_input">
                    <input type="password" v-model="password" :placeholder="$t('sign_in.pass_placeholder')" @keyup.enter="triggerLogin">
                </p>
                <div class="one rember_set outer">
                    <div class="left">
                        <span @click="setRember"><b><i :class="rember?'rember_i':''"></i></b> {{$t('sign_in.rem_account')}}</span>
                    </div>
                    <div class="right">
                        <span class="foget" @click="$router.push('/forget-pass')">{{$t('sign_in.for_pass')}}</span>
                    </div>
                    <p class="info" v-show="info_status">{{$t('sign_in.input_all')}}</p>
                    <div class="pic-test outer" v-show="pic_test">
                        <span class="left"></span><i class="el-icon-close right" @click="pic_test =false;"></i>
                        <!-- <div class="code-box" ref="codeBox">
                            <div id="captcha"></div>
                            <div id="msg" :class="msgStatus"></div>
                        </div> -->
                        <verify  @success="successFun($event)" @error="alert('error')" :imgUrl="imgUrl" :type="4" :imgName="imgArr"></verify>
                    </div>
                </div>
                <p class="p_button" @click="triggerLogin" :class="button_active?'p_button_active':''">{{$t('sign_in.login_button')}}</p>
                <p class="register" @click="$router.push('/register-user')">{{$t('sign_in.go_register')}}</p>
            </form>
        </div>
    </div>
</template>

<script>
// require('../../assets/js/picTest.js')
import focusFun from '../../assets/js/focusFun.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import { LoginFun, bindOrderFun } from '../../assets/js/api.js'
// import Verify from 'vue2-verify'
import Verify from './vue2-verify/src/components/Verify'
// console.log(Verify)

export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'verify':Verify,
    },
    data() {
        return {
            legalSet:'sign-in',
            password:'',
            accountNumber:'',
            info_status:false,
            info:'',
            pic_test:false,// 显示图片验证
            msgStatus:'', // 图片验证文字
            imgUrl:'https://picsum.photos/300/150/?image=',
            imgArr:['557','558','559','556','555','1','2'],
            // lang:window.localStorage.getItem('localeLanguage') || 'zh',
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
        nav_item(){
            return this.$store.getters.nav_item;
        },
        rember(){
            return this.$store.getters.rember
        },
        rember_username(){
            return this.$store.getters.rember_username
        },
        button_active(){
            if(this.accountNumber =='' || this.password == ''){
                return false
            }else{
                return true
            }
        },
        user_info(){
                return this.$store.getters.user_info;
        },
    },
    watch: {
        lang:{
            handler(newName, oldName) {
            console.log('obj.a changed');
            },
            immediate: true,
            deep: true
        }
    },
    methods:{
        func(){
            return false;
        },
        alert(str){
            if(str=='success'){
                this.login()
            }
        },
        successFun(obj){
            obj.refresh()
            this.login()
        },
        /**
         * 设置记住与忘记
         */
        setRember(){
            let rember_status = !this.rember
            console.log(rember_status)
            this.$store.dispatch('_async_set_rember_status',rember_status)
        },
        /**
         * 触发登录
         */
        triggerLogin(){
            if(this.button_active){
                // 触发滑块验证
                this.pic_test = true;
                // this.initFun()
            }else{
                this.info_status = true;
                // this.info = '请填写完整信息'
            }
        },
        
        /**
         * 初始化图片验证
         */
        // initFun(){
        //     let that = this;
        //     jigsaw.init(
        //         {
        //             el: document.getElementById('captcha'),
        //             onSuccess: function() {
        //                 document.getElementById('msg').innerHTML = '登录成功！'
        //                 that.msgStatus = "msgSta"
        //                 that.pic_test = false;
        //                 // this.$store.dispatch('_async_set_verification',true)
        //                 that.login()
        //                 that.msgStatus = ""
        //                 that.initPic()
        //             },
        //         onFail: this.cleanMsg,
        //         onRefresh: this.cleanMsg
        //     })
        // },
        /**
         * 清除文字
         */
        cleanMsg() {
            document.getElementById('msg').innerHTML = ''
        },
        /**
         * 登录方法
         */
        async login(){
            let key =await LoginFun(this,{
                accountNumber:this.accountNumber,
                password:this.password
            }).then((res) =>{
                return res;
            })
            if(key) {
                if(this.rember){
                    this.$store.dispatch('_async_set_rember_username',this.accountNumber)
                }else{
                    this.$store.dispatch('_async_set_rember_username','')
                }
                console.log('b',key)
                if(this.$store.state.third.orderId!=''){
                    this.bindOrder(this.$store.state.third.orderId)
                }else{
                    // this.$router.push('/legal-currency');
                    switch(this.nav_item) {
                        case '0':
                                this.$router.push('/personal')
                                break
                            case '1':
                                this.$router.push('/legal-currency')
                                break
                            case '2':
                                this.$router.push('/asset-manage')
                                break
                            case '3':
                                if(this.user_info.role=='5'){
                                    this.$router.push('/personal')
                                }else{
                                    this.$router.push('/payment-system')
                                }
                                break
                            case '4':
                                this.$router.push('/logo-page')
                                break
                            default:
                                this.$router.push('/personal')
                        }
                }
                
            }else{
                this.pic_test = false
            }
        },
        /**
         * 充值验证码
         */
        initPic(){
            this.$refs.codeBox.innerHTML="<div id='captcha'></div><div id='msg' :class='msgStatus'></div>"
        },
        /**
         * 绑定订单
         */
        bindOrder(id) {
            let key = bindOrderFun(this,{
                id:id
            })
            if(key) {//绑定成功
                this.$router.push('/payment-order')
            }else{
                this.$router.push('/payment-order')
            }
        }

    },
    mounted(){
        this.accountNumber = this.rember_username
        // focusFun(this)
    }
}
</script>

<style lang="scss">
// @import url('../../assets/css/picTest.css');
@media screen and(max-width: 480px) {
    .verify-img-out{
        width: 250px!important;
        .verify-img-panel{
            width: 250px!important;
        }
    }
    .verify-bar-area{
        width: 250px!important;
    }
    .register{
        margin-top: 2rem!important;
    }
}
.sign-in{
    .sign-body{
        height: 36.5rem /* 730/20 */;
        background: url('../../assets/images/sign/sign@2x.png') no-repeat center center;
        // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E7%99%BB%E9%99%86/sign%402x.png) no-repeat center center;
        background-size: cover;
        box-sizing: border-box;
        padding-top: 7rem;
        position: relative;
        .border{
            height:1px;
            background:rgba(204,204,204,1);
        }
       
        .form{
            display: inline-block;
            width: 22.5rem /* 450/20 */;
            height: 24.3rem /* 486/20 */;
            background:rgba(255,255,255,1);
            border:.05rem /* 1/20 */ solid rgba(204, 204, 204, 1);
            position: absolute;
            top: 10rem /* 60/20 */;
            right: 18rem /* 360/20 */;
            box-sizing: border-box;
            padding-top: 2rem;
            .rember_set{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 0 auto;
                position: relative;
                div{
                    span{
                        font-size: .7rem /* 14/20 */;
                        line-height: 1rem;
                        vertical-align: bottom;
                        b{
                            display: inline-block;
                            line-height: 1rem;
                            width: .8rem /* 10/20 */;
                            height: .8rem;
                            border-radius: .4rem;
                            // background:rgba(255,255,255,1) ;
                            background:#000 ;
                            position: relative;
                            i{
                                display: inline-block;
                                line-height: 1rem;
                                width: .6rem /* 10/20 */;
                                height: .6rem;
                                border-radius: .3rem;
                                // background:#000 ;
                                background:rgba(255,255,255,1) ;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                            }
                            i::after{
                                content: '';
                                display: inline-block;
                                line-height: 1rem;
                                width: .4rem /* 10/20 */;
                                height: .4rem;
                                border-radius: .2rem;
                                // background:#000 ;
                                background:rgba(255,255,255,1) ;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                            }
                            i.rember_i::after{
                                // background:rgba(255,255,255,1) ;
                                background:#000 ;
                            }
                        }
                    }
                    span:hover{
                        color:rgba(101,169,224,1);
                        color:#5C89CC;
                        cursor: pointer;
                    }
                    .foget{
                        text-decoration: underline;
                    }
                }
                p{
                    position: absolute;
                    width: 100%;
                    height:1.5rem /* 30/20 */;
                    line-height: 1.5rem;
                    top: 2rem;
                    font-size: .7rem /* 14/20 */;
                    color:rgba(51,51,51,1);
                    text-align: center;
                    background:rgba(255,211,217,1);
                }
                .pic-test{
                    position: absolute;
                    width: 19rem /* 380/20 */;
                    // height:12rem /* 240/20 */;
                    bottom: -1rem;
                    font-size: .7rem /* 14/20 */;
                    color:rgba(51,51,51,1);
                    text-align: center;
                    background:rgba(255,255,255,1);
                    box-sizing: border-box;
                    padding-top: .5rem;
                    box-shadow:0rem /* 0/20 */ .15rem /* 3/20 */ .5rem /* 10/20 */ 0rem /* 0/20 */ rgba(153,153,153,1);
                    i{
                        margin-right: .3rem;
                    }
                    i:hover{
                        color: red;
                        cursor: pointer;
                    }
                    .code-box{
                        position: relative;
                        margin-top: 1rem;
                        #captcha{
                        }
                        #msg {
                            width: 100%;
                            height: 1.75rem /* 35/20 */;
                            height: 35px /* 35/20 */;
                            line-height: 1.75rem /* 35/20 */;
                            font-size: .7rem /* 14/20 */;
                            background-color: #00BD9D;
                            border-radius: .9rem /* 18/20 */;
                            text-align: center;
                            display: none;
                            z-index: 100;
                            // position: absolute;
                            bottom: 0rem /* 35/20 */;
                            left: 0px;
                        }
                        #msg.msgSta{
                            display: inline-block;
                        }
                    }
                }
            }
            h3{
                font-size:1.5rem /* 30/20 */;
                font-weight:bold;
                color:rgba(102,102,102,1);
                line-height:1.8rem /* 36/20 */;
                text-align: center;
            }
            h3.en{
                font-size: 1.35rem;
            }
            .p_input{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                input{
                    width:19rem /* 380/20 */;
                    height:2.4rem /* 48/20 */;
                    box-sizing: border-box;
                    padding-left: 1rem;
                    font-size: .8rem /* 16/20 */;
                }
                border:1px /* 1/20 */ solid rgba(204,204,204,1);
            }
            .p_button{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                margin-bottom: .5rem;
                text-align: center;
                color:rgba(255,255,255,1);
                // background:rgba(76,96,133,1);
                background: #ccc;
                line-height: 2.5rem;
                cursor: pointer;
            }
            .p_button.p_button_active{
                // background:rgba(92,137,204,1);
                background:rgba(76,96,133,1);
            }
            .p_button:hover{
                background: #5C89CC;
            }
            .register{
                margin: 0 auto;
                width:19rem /* 380/20 */;
                height:1.5rem /* 50/20 */;
                text-align: center;
                font-size: .7rem /* 14/20 */;
                cursor: pointer;
            }
            .register:hover{
                color:rgba(76,96,133,1);
                color:#5C89CC;
                text-decoration: underline;
            }
        }
         @media screen and (max-width: 480px) {
            .form{
                right: 2rem;
            }
        }
    }
}
</style>
