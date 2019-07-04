<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-04 17:46:58
 -->
<template>
    <div class="register-user">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="sign-body">
            <div class="border"></div>
            <verify class="right" id="verify" v-show="pic_test" @success="successFun($event)" @error="alert('error')" :imgUrl="imgUrl" :type="4" :imgName="imgArr"></verify>
            <form class="form">
                <h3>{{$t('sign_up.h3')}}</h3>
                <p class="select_type">
                    <span :class="type=='1'?'active_h':''" @click="_set('1')">{{$t('sign_up.nav_email')}}</span> | 
                    <span :class="type=='0'?'active_h':''" @click="_set('0')">{{$t('sign_up.nav_phone')}}</span>
                </p>
                <p class="username p_input">
                    <input type="text" :placeholder="$t('sign_up.user_placeholder')"  onkeyup="this.value=this.value.replace(' ','')" @focus="_set_status" v-model="userName">
                    <i class="el-icon-warning" v-show="user_info">{{$t('sign_up.invalid_username')}}</i>
                </p>
                <div class="email p_input" v-show="email">
                    <input type="text" :placeholder="$t('sign_up.email_placeholder')" @focus="_set_status" @blur="checkEmail" v-model="emailName">
                    <i class="el-icon-warning" v-show="email_info">{{$t('sign_up.email_regular')}}</i>
                </div>
                <div class="phone p_input" v-show="phone">
                    <p style="width:20rem;margin:0 auto;">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select><input type="text" @focus="_set_status" @blur="checkPhone" :placeholder="$t('sign_up.phone_placeholder')" v-model="phoneName">
                    </p>
                    <i class="el-icon-warning" v-show="phone_info">{{$t('sign_up.phone_regular')}}</i>
                </div>
                <div class="yanzheng p_input">
                    <p>
                        <input type="text" @focus="_set_status" :placeholder="$t('sign_up.test_code')" v-model="yanzhengName"><span @click="sendFun">{{send_mess}}</span>
                    </p>
                    <i class="el-icon-warning" v-show="yanzheng_info">{{$t('sign_up.test_wrong')}}</i>
                </div>
                <div class="mima p_input">
                    <input type="password" @focus="_set_status" @blur="checkPass" :placeholder="$t('sign_up.pass_placeholder')" v-model="passName">
                    <i class="el-icon-warning" v-show="password_info">{{$t('sign_up.pass_regular')}}</i>
                </div>
                <div class="mima2 p_input">
                    <input type="password" @focus="_set_status" :placeholder="$t('sign_up.pass_t_placeholder')" v-model="passNewName">
                    <i class="el-icon-warning" v-show="passwordNew_info">{{$t('sign_up.test_check')}}</i>
                </div>
                <div class="one rember_set outer">
                    <div class="left">
                        <span @click="redme=!redme;xiyi_info = false;"><b><i :class="redme?'rember_i':''"></i></b> {{$t('sign_up.accept')}}</span>
                        <span class="text_every" style="cursor:pointer;color:#65a9e0;" @click="openRead">{{text_one}}</span>
                        <span class="text_every" style="cursor:pointer;color:#65a9e0;" @click="openRead1">{{text_one1}}</span>
                        <span class="text_every" style="cursor:pointer;color:#65a9e0;" @click="openRead2">{{text_one2}}</span>
                    </div>
                    <i class="el-icon-warning" v-show="xiyi_info">请阅读并同意相关协议</i>
                    <p class="info" v-show="info_status">{{info}}</p>
                    <div class="pic-test2 outer" v-show="pic_test">
                        <!-- <span class="left">完成拼图验证</span><i class="el-icon-close right" @click="pic_test =false;"></i> -->
                        <!-- <div class="code-box" ref="codeBox">
                            <div id="captcha"></div>
                            <div id="msg" :class="msgStatus"></div>
                        </div> -->
                        <!-- <verify id="verify" v-show="pic_test" @success="successFun($event)" @error="alert('error')" :imgUrl="imgUrl" :type="4" :imgName="imgArr"></verify> -->
                    </div>
                </div>
                <p class="p_button" @click="goRegister" :class="button_active?'p_button_active':''">{{$t('sign_up.register')}}</p>
                <p class="register" @click="loginButton">{{$t('sign_up.go_login')}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
// require('../../assets/js/picTest.js')
import focusFun from '../../assets/js/focusFun.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {RegisterFun, bindOrder} from '../../assets/js/api.js'
// import Verify from 'vue2-verify'
import Verify from './vue2-verify/src/components/Verify'
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

            phone_reg:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            email_reg : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            pass_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,// /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/ 至少包含数字.字母.符号中的2种
            type:'',//0 shouji  1 youxiang
            text_one:'《'+this.$t('sign_up.user_agreement')+'》',
            text_one1:'《'+this.$t('sign_up.legal_notice')+'》',
            text_one2:'《'+this.$t('sign_up.privacy_policy')+'》',
            yanzheng_info:false,
            testSta:true,
            user_info:false,
            email_info:false,
            phone_info:false,
            xiyi_info:false,
            passwordNew_info:false,
            password_info:false,
            email:false,
            phone:false,
            // 
            remClass:'',
            value:'',
            send_mess:'',
            options:require('../../assets/js/country.json'),
            userName:'',
            emailName:'',
            phoneName:'',
            yanzhengName:'',
            passName:'',
            passNewName:'',
            redme:false,
            can_send:'',
            t:'',
            // 
            imgUrl:'https://picsum.photos/300/150/?image=',
            imgArr:['557','558','559','556','555','1','2'],
        }
    },
    computed:{
        rember(){
            return this.$store.getters.rember
        },
        button_active(){
            console.log(this.userName != '' && this.phoneName != '' && this.yanzhengName != '' && this.passName != '' && this.passNewName != '' && this.redme == true,'==============')
            if(this.type == '0'){
                if(this.userName != '' && this.phoneName != '' && this.yanzhengName != '' && this.passName != '' && this.passNewName != '' && this.redme == true ) {
                    return true;
                }else{
                    return false;
                }
            }else if(this.type =='1'){
                if(this.userName != '' && this.emailName != '' && this.yanzhengName != '' && this.passName != '' && this.passNewName != '' && this.redme == true ) {
                    return true;
                }else{
                    return false;
                }
            }
            
        },
        orderId:{
            get:function (){
                return  this.$store.state.third.orderId;
            }
        },
        nav_item(){
            return this.$store.getters.nav_item;
        },
    },
    watch:{
        type(n,o){
            this.send_mess = this.$t('sign_up.get_code');
            this.can_send = true;
            this.redme = false;
            this.remClass = ''
            this.testSta = false;
            clearInterval(this.t);
            if(n=='0'){
                this.phone = true;
                this.email = false;
                
                this.userName='';
                this.emailName='';
                this.phoneName='';
                this.yanzhengName='';
                this.passName='';
                this.passNewName='';
                this.value = '+86'
            }else{
                this.phone = false;
                this.email = true;
                this.userName='';
                this.emailName='';
                this.phoneName='';
                this.yanzhengName='';
                this.passName='';
                this.passNewName='';
                this.value = ''
            }
        },
        
    },
    mounted:function(){
        // focusFun(this);
        this._set('1')
    },
    methods:{
        alert(str){
            if(str=='success'){
                this.loginFun()
            }
        },
        successFun(obj){
            obj.refresh()
            this.loginFun()
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
        triggerRegister(){
            // this.pic_test = true;
                // this.initFun()
            if(this.button_active){
                // 触发滑块验证
                this.pic_test = true;
                this.move()
                // this.initFun()
            }else{
                this.info_status = true;
                this.info = this.$t('sign_up.input_all')
            }
        },
        move(){
            let d =  document.getElementsByClassName('verify-move-block');
            let b = d[0]
            console.log('2354353',b)
           
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
        //                 that.register()
        //                 // that.loginFun()
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
        async register(){
            let key =await RegisterFun(this,{
                accountNumber:this.type=='0'?this.value+','+this.phoneName:this.emailName,
                accountType:this.type,
                code:this.yanzhengName,
                username:this.userName,
                password:this.passName
            }).then((res) =>{
                return res
            })
            if(key!=false) {
                if(this.$store.state.third.orderId!=''){
                    this.bindOrder(this.$store.state.third.orderId)
                }else{
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
                                this.$router.push('/payment-system')
                                break
                            case '4':
                                this.$router.push('/logo-page')
                                break
                            default:
                                this.$router.push('/personal')
                        }
                }
            }
        },
        /**
         * 充值验证码
         */
        initPic(){
            this.$refs.codeBox.innerHTML="<div id='captcha'></div><div id='msg' :class='msgStatus'></div>"
        },
        /**
         * 设置种类
         */
        _set(str){
            if(str== '0'){
                this.type = '0'
            }else{
                this.type = '1'
            }
        },
        /**
         * 清楚提示框--以后优化
         */
        _set_status(){
            this.yanzheng_info=false;
            this.testSta=false;
            this.user_info=false;
            this.email_info=false;
            this.phone_info=false;
            this.xiyi_info=false;
            this.passwordNew_info=false;
            this.password_info=false;
        },
        agree(){
            this.redme = !this.redme
            if(this.redme){
                this.xiyi_info = false;
            }
            if(this.remClass == 'toogleBack' ) {
                this.remClass = 'no'
            }else{
                this.remClass = 'toogleBack'
            }
        },
        loginButton(){
            this.$router.push('/sign-in')
        },
        
        openRead(){
            const {href} = this.$router.resolve({name:'User'})
            window.open(href, '_blank');
        },
        openRead1(){
            const {href} = this.$router.resolve({name:'UserLegal'})
            window.open(href, '_blank');
        },
        openRead2(){
            const {href} = this.$router.resolve({name:'UserPrivacy'})
            window.open(href, '_blank');
        },
        /**
         * 比对密码
         */
        comPass(){
            if(this.passName != this.passNewName) {
                this.$message({
                    type:'error',
                    message:this.$t('sign_up.pass_check'),
                    duration:900,
                })
                this.passwordNew_info = true;
                return false;
            }else{
                return true
            }
        },
        /**
         * 校验密码
         */
        checkPass(){
            if(!this.pass_reg.test(this.passName)){
                this.$message({
                    type:'error',
                    message:this.$t('sign_up.pass_regular'),
                    duration:900,
                })
                this.password_info = true;
                return false;
            }else{
                return true
            }
        },
        /**
         * 检测手机号
         */
        checkPhone(){
            // console.log(this.phone_reg.test(this.value+''+this.phoneName))
            if(!this.phone_reg.test(this.value+''+this.phoneName)){
                this.phone_info = true;
                this.$message({
                    type:'error',
                    message:this.$t('sign_up.phone_regular'),
                    duration:900,
                })
                return false;
            }else{
                return true
            }
        },
        /**
         * 检测邮箱
         */
        checkEmail(){
            if(!this.email_reg.test(this.emailName)){
                this.email_info = true;
                this.$message({
                    type:'error',
                    message:this.$t('sign_up.email_regular'),
                    duration:900,
                })
                return false;
            }else{
                return true
            }
        },
        /**
         * 发送消息
         */
        sendFun(){
            if(this.type=='0'){
                // console.log(this.value.split("+")[1])
                if(!this.phone_reg.test(this.phoneName)){
                    this.phone_info = true;
                    this.$message({
                        type:'error',
                        message:this.$t('sign_up.phone_regular'),
                        duration:800,
                    })
                    return false;
                }
            }else{
                if(!this.email_reg.test(this.emailName)){
                    this.email_info = true;
                    this.$message({
                        type:'error',
                        message:this.$t('sign_up.email_regular'),
                        duration:900,
                    })
                    return false;
                }
            }
            // 
            if(!this.can_send) {
                return false;
            }
            this.timeInit()
            this.axios.get('/getCode',{params:{
                'accountType':this.type,
                'behaviorType':0,//0 zhuce
                'number':this.type=='0'?(this.value+","+this.phoneName):(this.emailName)
            }}).then((res) => {
                let data = res.data;
                if(data.code ==200){
                    this.$message({
                        type:'success',
                        message:`发送验${this.type=='0'?'手机':'邮箱'}证码成功！`,
                        duration:900,
                    })
                    
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:900,
                    })
                }
            }).catch((err)=>{

            })
        },
        /**
         * 倒计时
         */
        timeInit(){
            let time = 60;
            this.can_send = false;
            this.t = setInterval(()=>{
                if(time == 0){
                    time = 60;
                    this.can_send = true;
                    this.send_mess = this.$t('sign_up.get_code')
                    clearInterval(this.t)
                }else{
                    this.send_mess = --time + 's'
                }
            },1000)
        },
        /**
         * 去注册
         */
        goRegister(){
            console.log('格式',this.type)
            if(this.type=='0'){
                if(!this.checkPhone()){
                    return false;
                }
            }else if(this.type=='1'){
                if(!this.checkEmail()){
                    return false;
                }
            }
            
            if(!this.checkPass()){
                return false;
            }
            if(!this.comPass()){
                return false;
            }
            if(!this.redme) {
                this.xiyi_info = true;
                return false;
            }
            console.log(this.type,this.userName,this.emailName,this.phoneName,this.yanzhengName,this.passName,this.passNewName,this.redme,'---')
            if(!this.button_active){
                this.$message({
                        type:'error',
                        message:this.$t('sign_up.input_all'),
                        duration:1000,
                    })
                return false
            }else{
                
                this.triggerRegister()
            }
        },
        /**
         * 注册
         */
        loginFun(){
            console.log(this.type,this.userName,this.emailName,this.phoneName,this.yanzhengName,this.passName,this.passNewName,this.redme,'====')
            this.testSta = false;
            if(!this.button_active){
                this.$message({
                    type:'error',
                    message:this.$t('sign_up.input_all'),
                    duration:1200,
                })
                return false;
            }
            this.axios.post('/registered',qs.stringify({
            'accountNumber':this.type=='0'?(this.value+","+this.phoneName):(this.emailName),
            'accountType':this.type,
            'code':this.yanzhengName,
            'password':this.passName,
            'username':this.userName,
            })).then((res) => {
                let data = res.data;
                if(data.code ==200) {
                    // 成功
                    let user  = this.userName; //后台返回的用户名
                    let login = true // 成功之后设置 状态
                    let phone = this.phoneName
                    let email = this.emailName ;
                    let register_type = this.type;
                    let rember_user = this.phoneName==''?this.emailName:this.phoneName;
                    
                    this.$store.commit({
                        type:'_register',
                        user,
                        phone,
                        email,
                        login,
                        register_type,
                        rember_user,
                    })
                    let item = data.data;
                        this.$store.dispatch('_async_initUserInfo',item)
                    if(this.orderId!=''){
                        this.initOrder()
                    }else{
                        // this.$router.push('/home/center/file')
                        this.$router.push('/home/condition/')
                    }
                }else if(data.code == 201){// shibai
                    // this.tipShow = "show"
                    // this.info = data.message
                    this.pic_test =false;
                    this.$message({
                        message: data.message,
                        type: 'waring',
                        duration:1200,
                    });
                }else{
                    // this.tipShow = "show"
                    this.pic_test =false;
                    // this.info = data.message
                    this.$message({
                        message: data.message,
                        type: 'waring',
                        duration:1200,
                    });
                }
            }).catch((res) => {
                this.$message({
                        message: this.$t('system_item.system_wrong'),
                    type: 'waring'
                });
            })
        },
        initOrder(){
            event.$emit('noPayAll')// 出发全局
            this.axios.post('/payOrder/bingDingUser',qs.stringify({id:this.$store.state.third.orderId}))
            .then((res) => {
                let data = res.data;
                if(data.code==200){
                    this.$store.dispatch('_async_set_add_pay_orderId',data.data)
                    let t = setTimeout(()=>{
                    this.$router.push('/home/pay/file/confirm')
                    clearTimeout(t)
                    },300)
                }else{
                    this.$store.dispatch('_async_reset_third_pay');
                    this.$message({
                    type:'error',
                    message:'获取订单失败，请重新发起!',
                    duration:900,
                    })
                    let t = setTimeout(()=>{
                    // this.$router.push('/home/center/file')
                    this.$router.push('/home/condition')
                    clearTimeout(t)
                    },300)
                }
            }).catch((err) => {

            })
        },
    },
   
}
</script>

<style lang="scss">
// @import url('../../assets/css/picTest.css');
#verify{
    display: inline-block;
    position: absolute;
    bottom: 12rem;
    left: 40%;
    z-index: 120;
}
@media screen and(max-width: 480px) {
    .verify-img-out{
        width: 250px!important;
        .verify-img-panel{
            width: 250px!important;
            background-size: cover!important;
        }
    }
    .verify-bar-area{
        width: 250px!important;
    }
    .register{
        margin-top: 2rem!important;
    }
    #verify{
        display: inline-block;
        position: absolute;
        bottom: 12rem;
        left: 18%;
        z-index: 120;
    }
}
.active_h{
    color:#5C89CC!important;
}
.register-user{
    .sign-body{
        height: 36.5rem /* 730/20 */;
        height: 50.5rem /* 730/20 */;
        // background: url('../../assets/images/sign/sign@2x.png') no-repeat center center;
        background:rgba(230, 230, 230, 1);
        background-size: cover;
        box-sizing: border-box;
        padding-top: 7rem;
        position: relative;
        .border{
            height:1px;
            background:rgba(204,204,204,1);
        }
        .form{
            // display: inline-block;
            width: 33rem /* 660/20 */;
            height: 36rem /* 720/20 */;
            background:rgba(255,255,255,1);
            border:.05rem /* 1/20 */ solid rgba(204, 204, 204, 1);
            position: relative;
            margin-top: 20rem /* 60/20 */;
            left:50%;
            transform: translateX(-50%) translateY(-50%);
            box-sizing: border-box;
            input{
                text-align: left;
                box-sizing: border-box;
                padding-left: 1rem;
                font-size: .8rem /* 16/20 */;
            }
            .el-icon-warning{
                display: inline-block;
                font-size: .6rem /* 12/20 */;
                line-height: 1.2rem /* 15/20 */;
                color:rgba(240,91,95,1);
                text-align: left;
                width: 19rem /* 380/20 */;
            }
            .rember_set{
                width:19rem /* 380/20 */;
                height:1rem /* 50/20 */;
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
                    top: 1rem;
                    font-size: .7rem /* 14/20 */;
                    color:rgba(51,51,51,1);
                    text-align: center;
                    background:rgba(255,211,217,1);
                }
                .pic-test2{
                    position: absolute;
                    // width: 19rem /* 380/20 */;
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
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:3rem /* 36/20 */;
                text-align: center;
                background:rgba(76,96,133,1);
                height: 3rem /* 60/20 */;
                letter-spacing: 1px;
            }
            .select_type{
                width:19rem /* 380/20 */;
                height:2rem /* 50/20 */;
                line-height: 2rem;
                margin: 1.5rem auto;
                color:#BCBDC0;
                margin-bottom: -.5rem;
                span{
                    display: inline-block;
                    height:.85rem /* 17/20 */;
                    font-size:.9rem /* 16/20 */;
                    font-family:'PingFang-SC-Regular';
                    font-weight:400;
                    color: #BCBDC0;
                    // margin-bottom: 1rem /* 20/20 */;
                    cursor: pointer;
                }
            }
            .p_input{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                input{
                    width:19rem /* 380/20 */;
                    height:2.5rem /* 48/20 */;
                    box-sizing: border-box;
                    padding-left: 1rem;
                    text-align: left;
                    box-sizing: border-box;
                    padding-left: 1rem;
                    font-size: .8rem /* 16/20 */;
                }
                border:1px /* 1/20 */ solid rgba(204,204,204,1);
            }
            
            .p_input.phone{
                .el-select{
                    width: 5rem /* 100/20 */;
                    height: 2.5rem /* 50/20 */;
                    input{
                        width: 5rem /* 380/20 */;
                        height: 2.5rem!important /* 50/20 */;
                        margin: 0 auto;
                        font-size:.7rem /* 14/20 */;
                        font-family:'PingFang-SC-Regular';
                        font-weight:400;
                        color:#333333;
                        // line-height:1.8rem /* 36/20 */;
                        text-align: left;
                        outline:none;
                        border: none;
                        border-radius: 0;
                        padding-right: 1.1rem;
                        
                    }
                    span{
                        width: 1rem;
                        span{
                            width: 1rem;
                            i{
                                width: 1rem;
                            }
                        }
                    }
                }
                input{
                    width: 14rem /* 380/20 */;
                    height: 2.5rem /* 50/20 */;
                    margin: 0 auto;
                    font-size:.7rem /* 14/20 */;
                    font-family:'PingFang-SC-Regular';
                    font-weight:400;
                    color:#333333;
                    // line-height:1.8rem /* 36/20 */;
                    text-align: left;
                    outline:none;
                    border-left: 1px solid gray;
                }
            }
            .p_input.yanzheng{
                p{
                    height: 2.5rem /* 50/20 */;
                    box-sizing: border-box;
                    
                    input{
                        width: 14rem /* 380/20 */;
                        height: 2.5rem /* 50/20 */;
                        margin: 0 auto;
                        font-size:.7rem /* 14/20 */;
                        font-family:'PingFang-SC-Regular';
                        font-weight:400;
                        color:#333333;
                        // line-height:1.8rem /* 36/20 */;
                        text-align: left;
                        outline:none;
                        display: inline-block;
                        vertical-align: bottom;
                        border-right: 1px solid gray;
                    }
                    span{
                        display: inline-block;
                        height: 2.5rem /* 50/20 */;
                        width: 5rem;
                        font-size:.7rem /* 16/20 */;
                        font-family:'PingFang-SC-Regular';
                        font-weight:400;
                        color: #65a9e0;
                        cursor: pointer;
                        background: white;
                        line-height: 2.5rem;
                        text-align: center;
                    }
                }
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
                background:rgba(92, 137, 204,1);
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
                text-decoration: underline;
            }
        }
    }
}
</style>
