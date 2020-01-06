<template>
    <div class="forget-pass">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="forget-body">
            <div class="border"></div>
            <form>
                <h3>{{$t('forget_pass.h3')}}</h3>
                
                <div class="one" v-show="one_two">
                    <p class="select_type">
                        <span :class="type=='1'?'active_h':''" @click="_set('1')">{{$t('forget_pass.nav_email')}}</span> | 
                        <span :class="type=='0'?'active_h':''" @click="_set('0')">{{$t('forget_pass.nav_phone')}}</span>
                    </p>
                    <div class="email_phone ">
                        <p style="">
                            <el-select v-model="value" placeholder="请选择"
                            v-show="type=='0'"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select><input class="" :class="type=='0'?'placeholder':'placeholder-nor'" ref="placeholder" type="text" @blur="checkAccount" :placeholder="type=='0'?$refs.placeholder=$t('forget_pass.phone'):$refs.placeholder=$t('forget_pass.email')" v-model="email_phone">
                        </p>
                        <i class="el-icon-warning" v-show="email_phone_info_status">{{email_phone_info}}</i>
                    </div>
                    <p class=" yanzhengma">
                        <input class="yan-code" type="text" v-model="picLyanzhengma" :placeholder="$t('forget_pass.code')"><input class="yan-button" type="button" id="code" @click="createCode" v-model="checkCode"/>
                        <i class="el-icon-warning" v-show="picLyanzhengma_status">{{picLyanzhengma_info}}</i>
                    </p>
                    <p class="p_button_one" :class="p_button_one?'p_button_one_active':'p_button_one'" @click="goSecondPage">{{$t('forget_pass.one_button')}} </p>
                </div>
                <div class="one" v-show="!one_two">
                    <div class="">
                        <p class="p_input">
                            <input type="text" :placeholder="type=='1'?$t('forget_pass.email_code'):$t('forget_pass.phone_code')"  v-model="callBackCode"><span style="cursor: pointer;" @click="sendFun">{{send_mess}}</span>
                        <i class="el-icon-warning" v-show="yanzheng_info">{{$t('forget_pass.code_wrong')}}</i>
                        </p>
                    </div>
                    <div class="">
                        <p class="p_input">
                            <input type="password" style="width:100%;"  :placeholder="$t('forget_pass.pass_new')" v-model="pass">
                        <i class="el-icon-warning" v-show="pass_info_status">{{pass_info}}</i>
                        </p>
                    </div>
                    <div class="">
                        <p class="p_input">
                            <input type="password" style="width:100%;" :placeholder="$t('forget_pass.pass_new_t')" v-model="pass_two">
                        <i class="el-icon-warning" v-show="pass_two_info_status">{{pass_two_info}}</i>
                        </p>
                    </div>
                    <p class="p_input button_end" :class="p_button_two?'button_end_active':''" @click="submitAll">{{$t('forget_pass.submit')}}</p>
                    <p class="p-end-return">
                        <span class="left" @click="$router.push('/sign-in')">{{$t('forget_pass.go_login')}}</span>
                        <span class="right" @click="$router.push('/register-user')">{{$t('forget_pass.register')}}</span>
                    </p>
                    <p class="p-text-t">
                        {{$t('forget_pass.info')}}
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import focusFun from '../../assets/js/focusFun.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import  getCode from '../../assets/js/getCode.js'
import {resetPassB} from '../../assets/js/api.js'
import * as Worker from '../../assets/js/worker.js'
// import * as Worker from "worker-loader!~/assets/js/worker.js'"
let code ='';
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'sign-in',
            picLyanzhengma:'',
            checkCode:'',
            options:require('../../assets/js/country.json'),
            type:'',
            email_phone:'',
            value:'+86',
            phone_reg:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            email_reg : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            pass_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,// /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/ 至少包含数字.字母.符号中的2种
            email_phone_info:'',
            email_phone_info_status:false,
            one_two:true,
            picLyanzhengma_status:false,
            picLyanzhengma_info:'',
            callBackCode:'',//发送验证码返回的
            send_mess:'获取验证码',
            yanzheng_info:false,
            pass:'',
            pass_two:'',
            pass_info_status:false,
            pass_info:'',
            pass_two_info:'',
            pass_two_info_status:false,
            worker:null,
            can_send:true,
        }
    },
    mounted(){
        this._set('1');
        focusFun(this,['email_phone_info_status','picLyanzhengma_status','pass_info_status','pass_two_info_status']);
        this.createCode();
        this.send_mess = this.$t('forget_pass.get_code')
    },
    computed:{
        p_button_one(){
            if(this.email_phone =='' || this.picLyanzhengma ==''){
                return false
            }else{
                return true
            }
        },
        p_button_two(){
            if(this.callBackCode=='' || this.pass=='' || this.pass_two==''){
                return false
            }else{
                if(!this.pass_reg.test(this.pass)){
                    this.pass_info_status = true;
                    this.pass_info = this.$t('info_item.pass_regular')
                    return false
                }else{
                    if(this.pass!= this.pass_two){
                        this.pass_two_info_status = true;
                        this.pass_two_info =this.$t('info_item.pass_check')
                        return false
                    }else{
                        return true
                    }
                }
            }
        }
    },
    watch:{
        type(n,o){
            
        },
        
    },
    methods:{
         /**
         * 设置种类
         */
        _set(str){
            Object.assign(this.$data, this.$options.data())
            this.createCode();
            if(str== '0'){
                this.type = '0'
            }else{
                this.type = '1'
            }
        },
        /**
         * 生成验证码
         */
        createCode(){
            code = "";    
            var codeLength = 4;//验证码的长度   
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
           'S','T','U','V','W','X','Y','Z');//随机数   
            for(var i = 0; i < codeLength; i++) {//循环操作   
                 var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
                code += random[index];//根据索引取得随机数加到code上   
            }   
            this.checkCode = code;//把code值赋给验证码   
        },
        /**
         * 检测账号是否符合
         */
        checkAccount(){
            if(this.type=='0') {
                if(!this.phone_reg.test(this.email_phone)){
                    this.email_phone_info_status = true;
                    this.email_phone_info = this.$t('forget_pass.phone_regular')
                    return false;
                }else{
                    return true
                }
            }else if(this.type=='1'){
                if(!this.email_reg.test(this.email_phone)){
                    this.email_phone_info_status = true;
                    this.email_phone_info = this.$t('forget_pass.email_regular')
                    return false;
                }else{
                    return true
                }
            }
        },
        /**
         * 第一页验证码检测
         */
        checkYanCode(){
            if(this.picLyanzhengma.toUpperCase() == this.checkCode){
                return true
            }else{
                return false
            }
        },
        /**
         * 去第二页
         */
        goSecondPage(){
            if(!this.p_button_one){
                this.email_phone_info_status = true;
                this.email_phone_info = this.$t('info_item.input_all')
                return false
            }
            if(!this.checkYanCode()){
                this.picLyanzhengma_status = true;
                this.picLyanzhengma_info = this.$t('forget_pass.code_wrong')
                return false
            }
            if(this.checkAccount()){
                this.one_two = !this.one_two
            }
        },
        /**
         * 获取验证码
         */
        sendFun(){
            let k;
            if(this.can_send){
                this.can_send = false;
                this.timerFun()
                if(this.type=='0'){
                    k = getCode(this,this.value+','+this.email_phone,this.type,'2')
                }else{
                    k = getCode(this,this.email_phone,this.type,'2')
                }
                
            }
        },
        /**
         * 倒计时
         */
        timerFun(){
            if(this.worker!=null){
                this.worker.postMessage(
                    'close'
                )
            }
            console.log(Worker)
            this.worker = new Worker()
            this.worker.postMessage(60)
            this.worker.addEventListener('message',(res)=>{
                console.log(res)
                let n = res.data
                if(n==0){
                    this.can_send = true;
                    this.send_mess = this.$t('forget_pass.get_code')
                }else{
                    this.send_mess = n+'S'
                }
            })
        },
        async submitAll(){
            let k;
            if(this.type=='0'){
                k = await resetPassB(this,{
                    accountNumber:this.value+','+this.email_phone,
                    accountType:0,
                    code:this.callBackCode,
                    password:this.pass,
                }).then((res) =>{
                    return res;
                })
            }else{
                k = await resetPassB(this,{
                    accountNumber:this.email_phone,
                    accountType:1,
                    code:this.callBackCode,
                    password:this.pass,
                }).then((res) =>{
                    return res;
                })
            }
            if(k){
                this.$router.push('/sign-in')
            }else{
                this.$message({
                    type:'error',
                    message:'重置密码失败',
                    duration:1200,
                })
            }
        }
    },
    beforeDestroy(){
        if(this.worker!=null){
            this.worker.postMessage(
                'close'
            )
        }
    }
}
</script>

<style lang="scss">
.forget-pass{
    .forget-body{
        height: 35rem /* 660/20 */;
        height: 36rem /* 660/20 */;
        background:rgba(230, 230, 230, 1);
        background-size: cover;
        box-sizing: border-box;
        padding-top: 7rem;
        position: relative;
        .border{
            height:1px;
            background:rgba(204,204,204,1);
        }
        form{
            width: 33rem /* 660/20 */;
            height: 23.5rem /* 470/20 */;
            height: 24.5rem;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            margin-top: 2rem;
            
            .el-icon-warning{
                display: inline-block;
                font-size: .6rem /* 12/20 */;
                line-height: 1.2rem /* 15/20 */;
                color:rgba(240,91,95,1);
                text-align: left;
                width: 19rem /* 380/20 */;
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
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                text-align: left;
                span{
                    cursor: pointer;
                    color:RGBA(153, 153, 153, 1);
                    font-size: .9rem /* 18/20 */;
                }
                span.active_h{
                    color:#5C89CC;
                }
            }
            .email_phone{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                border: 1px solid #dcdfe6;
                box-sizing: border-box;
                .el-select{
                    width: 4rem /* 40/20 */;
                    input{
                        border-radius: 0;
                        border: 0;
                    }
                }
                .placeholder{
                    width: 14rem;
                    height:2.3rem /* 50/20 */;
                    // border: 1px solid #dcdfe6;
                    border-left:  1px solid #dcdfe6;
                }
                .placeholder-nor{
                    width: 100%;
                    height:2.3rem /* 50/20 */;
                    line-height: 2.3rem;
                }
            }
            .yanzhengma{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                border: .05rem /* 1/20 */ solid #dcdfe6;
                box-sizing: border-box;
                .yan-code{
                    width: 12.9rem /* 260/20 */;
                    height: 2.2rem;
                    line-height: 2.4rem;
                    
                }
                .yan-button{
                    width: 6rem /* 260/20 */;
                    height: 2.4rem;
                }
            }
            .p_button_one{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 2.5rem auto;
                box-sizing: border-box;
                color:rgba(255,255,255,1);
                background:rgba(76,96,133,1);
                line-height: 2.5rem;
                text-align: center;
                cursor: pointer;
            }
            .p_button_one:hover{
                background: #5C89CC;
            }
            .p_button_one.p_button_one_active{
                background:rgba(92,137,204,1);
            }
            .p_input{
                width:19rem /* 380/20 */;
                height:2.5rem /* 50/20 */;
                margin: 1.5rem auto;
                input{
                    width:14rem /* 380/20 */;
                    height:2.5rem /* 48/20 */;
                    box-sizing: border-box;
                    padding-left: 1rem;
                    font-size: .8rem /* 16/20 */;
                    box-sizing: border-box;
                    padding-left: 1rem;
                    text-align: left;
                }
                border:1px /* 1/20 */ solid rgba(204,204,204,1);
                span{
                    display: inline-block;
                    width: 4.95rem;
                    height: 2.5rem;
                    line-height: 2.5rem;
                    color: RGBA(92, 137, 204, 1);
                    border-left: .05rem /* 1/20 */ /* 1/20 */ solid rgba(204,204,204,1);
                    font-size: .7rem /* 14/20 */;
                    text-align: center;
                    vertical-align: bottom;
                }
            }
            .p_input.button_end{
                height:2.5rem /* 50/20 */;
                background:rgba(76,96,133,1);
                color:rgba(255,255,255,1);
                line-height: 2.5rem /* 50/20 */;
                text-align: center;
                cursor: pointer;
                margin-bottom: .5rem;
            }
            .button_end:hover{
                background: #5C89CC;
            }
            .button_end.button_end_active{
                background:rgba(92,137,204,1);
            }
            .p-end-return{
                width:19rem /* 380/20 */;
                height:.5rem /* 50/20 */;
                margin: .5rem auto;
                font-size: .7rem /* 14/20 */;
                span{
                    cursor: pointer;
                }
                span:hover{
                    color:#5C89CC;
                }
            }
            .p-text-t{
                width:19rem /* 380/20 */;
                height:1.5rem /* 50/20 */;
                line-height: 1rem;
                margin: .9rem auto;
                font-size: .7rem /* 14/20 */;
                color: rgba(102, 102, 102, 1);
            }
        }
        input{
            padding-left: 1rem;
            font-size: .8rem /* 16/20 */;
            box-sizing: border-box;
            padding-left: 1rem;
            text-align: left;
        }
    }
}
</style>
