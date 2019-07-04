<template>
    <div class="binding-phone">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="binding-phone-box">
            <div class="file_google_box_phone">
                <div class="file_google_nav">
                    <span @click="go_file_center">{{$t('bind_phone.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{this.type_binding=='email'? $t('info_item.nav_email'):(this.type_binding=='phone' ?$t('info_item.nav_phone'):$t('info_item.nav_google'))}}</span>
                </div>
                <div class="phone_email_google_nav">
                    <div v-show="email==null?true:false" class="email_binding binding" :class="type_binding=='email' ? 'active_binding':''" @click="go_type(0)">{{$t('bind_item.bind_email')}}</div><div class="phone_binding binding" :class="type_binding=='phone' ? 'active_binding':''" @click="go_type(1)">{{$t('bind_item.bind_phone')}}</div><div class="google_binding binding" :class="type_binding=='google' ? 'active_binding':''" @click="go_type(2)">{{$t('bind_item.bind_google')}}</div>
                </div>
                <div class="file_google_body">
                    <div class="msg" v-show="phone==''? false:true">{{$t('bind_phone.forbide')}}</div>
                    <div class="email"><span class="email_span">{{$t('bind_phone.phone_num')}}</span><br>
                        <el-select class="phone_code" v-model="county" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <select  id="" class="phone_code" v-model="county">
                            <option v-for="(item,key) in options" :value="item.key" :key="key">{{item.value}}</option>
                        </select> -->
                        <input @focus="email_input_info=false;" type="email" class="email_input" style="vertical-align: bottom;margin-left:0.05rem;" v-model="phone_real" :placeholder="$t('info_item.input_phone')" @blur="phone_blur">
                    </div>
                    <i class="el-icon-warning" style="margin-top:.3rem;" v-show="email_input_info">{{$t('info_item.phone_format')}}</i>
                    <div class="email"><span class="email_span">{{$t('info_item.phone_code')}}</span><br><input type="email" @focus="submit_info=false" class="email_input_code" v-model="email_code" :placeholder="$t('info_item.p_phone_code')" ><el-input  type="button" class="input_one_tete_fa" v-model="send" @click.native="sendEmail" placeholder="请输入内容"></el-input></div>
                    <p style="height:1.5rem;width:21.1rem;background:rgba(255,211,217,1);" v-show="submit_info">{{call_info}}</p>
                    <el-input class="innner_left email_button" :class="email_active" type="button" :value="$t('bind_phone.link')" @click.native="submit_fun"></el-input>
                </div>
            </div>
            <div class="top_email_box" v-show="top_box">
                <i class="el-icon-close" @click="close_box"></i>
                <span>{{user_info.accountType == '1' ? $t('info_item.email'):$t('info_item.phone')}}</span><br>
                <input class="top_email_box_input _top_one" type="text" disabled v-model="phone_email"><br>
                <span>{{user_info.accountType == '1' ? $t('info_item.email_code'):$t('info_item.phone_code')}}</span><br>
                <input class="top_email_box_input _top_input_one" type="text" v-model="email_phone_code_two"><input @click="sendEmail_two" class="top_email_box_input _top_input_two" type="button" v-model="send_two">
                <p class="outer"><span @click="submit_end" class="submit_end left">{{$t('info_item.confirm')}}</span><span @click="cancel_end" class="cancel_end right" >{{$t('info_item.cancle')}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import qs from 'qs'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {
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
            county:'+86',
            qrcode:'',
            google_verification:'',
            email_code:'',
            input_info:false,
            email_phone_code_two:'',

            // email:'',
            phone_real:'',
            send:this.$t('info_item.get_code'),
            send_two:this.$t('info_item.get_code'),
            can_send:true,
            can_send_end:true,
            email_input_info:false,//有没有填写邮箱
            email_reg : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            // phone_reg : /^1(3|4|5|7|8)\d{9}$/,
            phone_reg:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            submit_info:false,
            top_box:false,
            options:require('../../assets/js/country.json'),
            call_info:this.$t('info_item.verification_code_error'),
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
    },
    mounted(){
        if(this.$store.state.login) {
            // this.$router.push('/home/center/file')
        }else{
            this.$router.push('/logi/login')
        }
    },
    watch:{
        lang(n,o){
            this.send=this.$t('info_item.get_code')
            this.send_two=this.$t('info_item.get_code')
            this.call_info = this.$t('info_item.verification_code_error')
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
        user_info(){
            return this.$store.getters.user_info;
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
        phone_email(){
            if(this.$store.getters.user_info.accountType=='0'){
                return this.$store.getters.user_info.phoneAreaCode+','+this.$store.getters.user_info.phone
            }else{
                return this.$store.getters.user_info.email
            }
        },
        email_active:{
            set:function () {
                if(this.phone_real != '' && this.email_code != '') {
                    return 'email_active'
                }else{
                    return '';
                }
                
            },
            get:function () {
                if(this.phone_real != '' && this.email_code != '') {
                    return 'email_active'
                }else{
                    return '';
                }
            }
        },
        register_type:{
            get:function () {
                return this.$store.getters.user_info.accountType;
            },
            set:function () {
                return this.$store.getters.user_info.accountType;
            }
        },
        email(){
            // return '';
            return this.$store.getters.user_info.email;
        },
        phone() {
            return this.$store.getters.user_info.phoneAreaCode+','+this.$store.getters.user_info.phone;
        }
    },
    methods:{
        phone_blur(){
            if(this.phone_reg.test(this.phone_real)) {
                
            }else{
                this.email_input_info = true;
            }
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
                if(this.$store.getters.user_info.googleAuthTag=='1'){
                    this.$router.push('/reset-google-authentication')
                }else{
                    this.$router.push('/google-authentication')
                }
            }
        },
        close_box(){
            this.top_box = false;
        },
        go_file_center() {
            this.$router.push("/personal")
        },
        send_email_fun() {
            // 
            this.$message({
                type: 'success',
                message: '发送验邮箱证码成功!',
                duration:1000,
            });
        },
        async submit_fun() {
            // 
            //
            if(!this.phone_reg.test(this.phone_real)){
                this.email_input_info = true;
                return false
            }else{ // 发送给后台
                // this.submit_info = true; //错误提示
                let item = {
                    type:'phone',
                    phone:this.county+','+this.phone_real,
                    phoneCode:this.email_code
                }
                let key = await bindingPhoneEmailGoogle(this,item)
                .then((res) =>{
                    return res;
                })
                if(key){
                    // 陈工
                    this.top_box = true;
                }else{
                    this.top_box = false;
                    this.email_code = '';
                }
            }
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
        sendEmail() {
            if(this.phone_real == ''){
                this.can_send = false;
                this.email_input_info = true;
            }else if(!this.phone_reg.test(this.phone_real)){
                this.can_send = false;
                this.email_input_info = true;
            }else{
                this.can_send = true;
            }
            if(this.can_send ) {
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:0,
                    behaviorType:8,
                    number:this.county+','+this.phone_real,
                }}).then((res) => {
                    let k = res.data;
                    if(k.code == 200) {
                        this.$message({
                            message: k.message,
                            type: 'success',
                            duration:1000,
                        });
                        this.can_send = false
                        let time = 60;
                        let t = setInterval(()=>{
                            if(time == 0){
                            time = 60;
                            this.can_send = true;
                            this.send = this.$t('info_item.get_code')
                            clearInterval(t)
                            }else{
                            this.send = --time + 's'
                            }
                        },1000)
                    }else{
                        this.$message({
                            message: k.message,
                            type: 'warning',
                            duration:1100,
                        });
                        this.call_info = k.message;
                    }
                }).catch((res) => {

                })
                
            }
        },
        sendEmail_two(){
            console.log(2)
            if(this.can_send_end ) {
                console.log(21)
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:this.user_info.accountType,
                    behaviorType:9,//0：注册 1:修改密码 2：忘记密码 3：设置资金密码 4：重置资金密码 5：Google验证 6：添加提币地址 7：提币 8：绑定手机-新手机号验证 9:绑定手机-账号验证 10：支付 11：绑定邮箱
                    number:this.user_info.accountType == '0'?(this.county+','+this.phone) : this.user_info.email,
                }}).then((res) => {
                    let k = res.data;
                    console.log(k)
                    if(k.code == 200) {
                        this.$message({
                            message: k.message,
                            type: 'success',
                            duration:1000,
                        });
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
                    }else{
                        this.$message({
                            message: k.message,
                            type: 'warning',
                            duration:1100,
                        });
                        this.call_info = k.message;
                    }
                }).catch((res) => {

                })
                
            }
        },
        submit_end() {
            if(this.email_phone_code_two == '') {//不执行

            }else if(this.email_code == ''){

            }else{
                // 发送数据后台
                this.axios.post('/user/bindingPhone',qs.stringify({
                    accountCode:this.email_phone_code_two,//账号验证码
                    phone:this.county+','+this.phone_real,//手机号码
                    phoneCode:this.email_code,//验证码--新手机号验证码
                })).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            type:'success',
                            message:data.message
                        })
                        this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
                    }else{
                        this.top_box = false;
                        this.submit_info = true;
                        // this.$message({type:"error"})
                        this.call_info = data.message;
                        this.$message({
                            type:'error',
                            message:data.message,
                            duration:1100,
                        })
                    }
                }).catch((res) => {

                })

                // 返回成功跳转 个人
                
            }
        },
        cancel_end() {
            this.top_box = false;
        }
    }
}
</script>

<style lang="scss">
.binding-phone{
    .binding-phone-box{
        height: 50.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_google_box_phone{
            width: 60rem /* 800/20 */;
            // height: 44rem /* 880/20 */;
            // height: 100%;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            padding: .75rem /* 15/20 */  2.5rem /* 50/20 */;
            font-size:.7rem /* 14/20 */;
            box-sizing: border-box;
            margin-top: 7.05rem /* 141/20 */;
            .file_google_nav{
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
            .file_google_body{
                font-size:.7rem /* 14/20 */;
                font-family:'PingFang-SC-Regular';
                font-weight:400;
                color:rgba(102,102,102,1);
                text-align: left;
                i{
                    display: inline-block;
                    font-size: .6rem /* 12/20 */;
                    color:rgba(240,91,95,1);
                    text-align: left;
                    width: 19rem /* 380/20 */;
                    
                }
                .msg{
                    width: 21.15rem /* 442/20 */;
                    width: 22.1rem /* 442/20 */;
                    height: 3rem /* 60/20 */;
                    background: rgba(251,242,242,1);
                    text-align: center;
                    // line-height: 3rem /* 60/20 */;
                    font-size:.7rem /* 14/20 */;
                    font-family:'PingFang-SC-Regular';
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-top: 1rem /* 20/20 */;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .email{
                    width: 21.15rem /* 423/20 */;
                    width: 22.1rem /* 442/20 */;
                    margin-top: .5rem /* 10/20 */;
                    .email_span{
                        line-height: 1.5rem /* 30/20 */;
                    }
                    .phone_code{
                        display: inline-block;
                        width: 7rem;
                        height: 2.45rem;
                        position: relative;
                        // margin-right: -.2rem /* 4/20 */;
                        border-right:1px solid rgba(204,204,204,1);
                        .el-input{
                            width: 7rem;
                            height: 2.45rem;
                            .el-input__inner{
                                width: 7rem;
                                height: 2.45rem!important;
                                line-height: 2.45rem;
                                border-color: rgba(204,204,204,1);
                                border-radius: 0;
                                border-right: none;
                                padding: 0;
                                text-align: center!important;
                            }
                            .el-input__suffix{
                                width: 7rem;
                                    left: 0;
                                    i{
                                        color:gray;
                                    }
                            }
                            .el-input__suffix-inner{
                                display: inline-block;
                                width: 7rem;
                                height: 2.45rem!important;
                                line-height: 2.45rem;
                                .el-select__caret.el-input__icon.el-icon-arrow-up{
                                    display: inline-block;
                                    width: 7rem;
                                    height: 2.45rem!important;
                                    line-height: 2.45rem;
                                }
                            }
                        }
                    }
                    .email_input{
                        outline: none;
                        display: inline-block;
                        // width:21.15rem /* 423/20 */;
                        width:14rem;
                        width:15rem;
                        height:2.45rem /* 49/20 */;
                        font-size:.7rem /* 14/20 */;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        border:1px /* 1/20 */ solid rgba(204,204,204,1);
                        padding-left: .5rem /* 10/20 */;
                        box-sizing: border-box;
                        margin-left: 0px!important;
                    }
                    .email_input_code{
                        outline: none;
                        display: inline-block;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        border:1px /* 1/20 */ solid rgba(204,204,204,1);
                        padding-left: .5rem /* 10/20 */;
                        width:15rem /* 300/20 */;
                        width:16rem /* 300/20 */;
                        height:2.45rem /* 49/20 */;
                        font-size:.7rem /* 14/20 */;
                        box-sizing: border-box;
                    }
                    .input_one_tete_fa{
                        display: inline-block;
                        width: 6rem!important /* 123/20 */;
                        height:2.45rem /* 51/20 */!important;
                        outline: none!important;
                        vertical-align: bottom;
                        
                        .el-input__inner{
                            display: inline-block;
                            width: 6rem!important;
                            font-size:.7rem /* 14/20 */;
                            height:2.45rem /* 51/20 */!important;
                            outline: none!important;
                            border: 1px solid rgba(204,204,204,1);
                            border-left: none;
                            border-top-left-radius: 0!important;
                            border-bottom-left-radius: 0!important;
                            color: #5c89cc;
                        }
                    }
                    
                }
                p{
                    margin-top: 1rem /* 20/20 */;
                    text-align: center;
                    line-height: 1.5rem /* 30/20 */;
                    color:rgba(51,51,51,1);
                }
                .email_button{
                    margin-top: 1.5rem /* 30/20 */;
                    width:21.15rem /* 423/20 */;
                    width: 22.1rem /* 442/20 */;
                    height:2.45rem /* 49/20 */;
                    margin-bottom: 1rem /* 20/20 */;
                    .el-input__inner{
                        display: inline-block;
                        border: none;
                        outline: none!important;
                        width:21.15rem /* 423/20 */;
                        width:22.1rem /* 423/20 */;
                        height:2.45rem!important /* 49/20 */;
                        background:rgba(224,224,224,1);
                        text-align: center;
                        color:rgba(102,102,102,1);
                        cursor: pointer;

                    }
                }
                .email_button.email_active{
                    .el-input__inner{
                        background:#4c6085;
                        text-align: center;
                        color:white;
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
                    background: #4c6085;
                    color: white;
                }
            }
        }
        @media screen and(max-width: 480px) {
            .file_google_box_phone{
                width:100%;
            }
        }
        .top_email_box{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width:22rem /* 480/20 */;
            height:14.5rem /* 290/20 */;
            background:rgba(255,255,255,1);
            border-radius:.25rem /* 5/20 */;
            box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);

            i{
                position: absolute;
                top: .25rem /* 5/20 */;
                right: .4rem /* 8/20 */;
                cursor: pointer;
            }
            span{
                line-height: 2.5rem /* 50/20 */;
            }
            box-sizing: border-box;
            padding: 1.5rem /* 30/20 */ 1.5rem /* 30/20 */;
            padding-top: 1rem /* 20/20 */;
            text-align: left;
            font-size:.7rem /* 14/20 */;
            font-family:'PingFang-SC-Regular';
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:1.5rem /* 30/20 */;
            .top_email_box_input{
                outline: none;
                padding-left: .75rem /* 15/20 */;
            }
            ._top_one{
                display: inline-block;
                width: 19rem /* 380/20 */;
                height: 2rem /* 40/20 */;
                background:rgba(242,242,242,1);
                // margin-top: .5rem /* 10/20 */;
                box-sizing: border-box;
            }
            ._top_input_one{
                display: inline-block;
                width: 13rem /* 240/20 */;
                height: 2rem /* 40/20 */;
                border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
                box-sizing: border-box;
            }
            ._top_input_two{
                display: inline-block;
                width:6rem /* 120/20 */;
                height: 2rem /* 40/20 */;
                border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
                border-left: none;
                box-sizing: border-box;
                color: #5c89cc;
                vertical-align: bottom;
            }
            P{
                margin-top: 1.5rem /* 30/20 */;
                position: relative;
                width: 19rem /* 380/20 */;
                .submit_end{
                    display: inline-block;
                    width:5.5rem /* 110/20 */;
                    height:2rem /* 40/20 */;
                    background:#4c6085;
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    line-height: 2rem /* 40/20 */;
                    color: white;
                    cursor: pointer;
                }
                .cancel_end{
                    display: inline-block;
                    background:rgba(230,230,230,1);
                    width:5.5rem /* 110/20 */;
                    height:2rem /* 40/20 */;
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    line-height: 2rem /* 40/20 */;
                    cursor: pointer;
                    
                }
            }
        }
    }
}
</style>
