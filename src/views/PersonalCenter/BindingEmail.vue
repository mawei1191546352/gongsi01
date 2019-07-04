<template>
    <div class="binding-email">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="binding-email-box">
            <div class="file_google_box_email">
                <div class="file_google_nav">
                    <span @click="go_file_center">{{$t('bind_phone.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{this.type_binding=='email'? $t('info_item.nav_email'):(this.type_binding=='phone' ?$t('info_item.nav_phone'):$t('info_item.nav_google'))}}</span>
                </div>
                <div class="phone_email_google_nav">
                    <div class="email_binding binding" :class="type_binding=='email' ? 'active_binding':''" @click="go_type(0)">{{$t('bind_item.bind_email')}}</div><div class="phone_binding binding" :class="type_binding=='phone' ? 'active_binding':''" @click="go_type(1)">{{$t('bind_item.bind_phone')}}</div><div class="google_binding binding" :class="type_binding=='google' ? 'active_binding':''" @click="go_type(2)">{{$t('bind_item.bind_google')}}</div>
                </div>
                <div class="file_google_body">
                    <div class="msg">{{$t('bind_email.forbide')}}</div>
                    <div class="email"><span class="email_span">{{$t('info_item.email')}}</span><br><input @focus="email_input_info=false;" type="email" class="email_input" v-model="email" :placeholder="$t('info_item.input_email')" ></div>
                    <i class="el-icon-warning" v-show="email_input_info">{{$t('info_item.email_format')}}</i>
                    <div class="email"><span class="email_span">{{$t('info_item.email_code')}}</span><br><input type="email" @focus="submit_info=false" class="email_input_code" v-model="email_code" :placeholder="$t('info_item.p_email_code')" ><el-input  type="button" class="input_one_tete_fa" v-model="send" @click.native="sendEmail" placeholder="请输入内容"></el-input></div>
                    <p style="height:1.5rem;width:22.1rem;background:rgba(255,211,217,1);"  v-show="submit_info">{{send_call}}</p>
                    <el-input class="innner_left email_button" :class="email_active" type="button" :value="$t('bind_phone.link')" @click.native="submit_fun"></el-input>
                </div>
            </div>
            <div class="top_email_box" v-show="top_box">
                <i class="el-icon-close" @click="close_box"></i>
                <span>{{register_type == 'email' ? $t('info_item.email'):$t('info_item.phone')}}</span><br>
                <input class="top_email_box_input _top_one" type="text" disabled v-model="older_way"><br>
                <span>{{register_type == 'email' ? $t('info_item.email_code'):$t('info_item.phone_code')}}</span><br>
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
            qrcode:'',
            google_verification:'',
            email_code:'',
            email_phone_code_two:'',
            input_info:false,
            email:'',
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
            send_call:'',
        }
    },
    mounted(){
        if(this.$store.state.login) {
            // this.$router.push('/home/center/file')
        }else{
            this.$router.push('/logi/login')
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
    watch:{
        lang(n, o) {
            this.send=this.$t('info_item.get_code')
            this.send_two=this.$t('info_item.get_code')
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
        older_way:{
            get:function (){
                if(this.$store.getters.user_info.accountType=='0'){
                    return this.$store.getters.user_info.phoneAreaCode+this.$store.getters.user_info.phone;
                }else{
                    return this.$store.getters.user_info.email;
                }
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
        email_active:{
            // set:function () {
            //     if(this.email != '' && this.email_code != '') {
            //         return 'email_active'
            //     }else{
            //         return '';
            //     }
                
            // },
            get:function () {
                if(this.email != '' && this.email_code != '') {
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
        
    },
    methods:{
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
                duration:1100,
            });
        },
        async submit_fun() {
            //
            if(!this.email_reg.test(this.email)){
                this.email_input_info = true;
                return false
            }else{ // 发送给后台
                // this.submit_info = true; //错误提示

                let item = {
                    type:'email',
                    email:this.email,
                    emailCode:this.email_code
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
            if(this.email == ''){
                this.can_send = false;
                this.email_input_info = true;
            }else if(!this.email_reg.test(this.email)){
                this.can_send = false;
                this.email_input_info = true;
            }else{
                this.can_send = true;
            }
            if(this.can_send ) {
            // 发送接口
                this.axios.get('/getCode',{params:{
                    'accountType':'1',
                    'behaviorType':11,// 新邮箱
                    'number':this.email
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200){
                        this.$message({
                            type:'success',
                            // message:`发送验邮箱证码成功！`,
                            message:data.message,
                            duration:900,
                        })
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
                        this.submit_info = true;
                        this.send_call = data.message;
                        this.$message({
                            type:'error',
                            message:data.message,
                            duration:900,
                        })
                    }
                }).catch((err)=>{

                })
                
            }
        },
        sendEmail_two(){
            console.log(2)
            if(this.can_send_end ) {
                console.log(1)
                // 发送接口
                this.can_send_end = false
                this.axios.get('/getCode',{params:{
                    accountType:this.register_type,
                    behaviorType:12,// 新邮箱
                    number:this.older_way
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200){
                        this.$message({
                            type:'success',
                            // message:`发送验${this.type=='0'?'手机':'邮箱'}证码成功！`,
                            message:data.message,
                            duration:900,
                        })
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
                            type:'error',
                            message:data.message,
                            duration:900,
                        })
                    }
                }).catch((err)=>{

                })
                
            }
        },
        submit_end() {
            if(this.email_phone_code_two == '') {//不执行
                this.$message({
                    type:'error',
                    message:this.$t('info_item.input_all'),
                    duration:1000,
                })
            }else{
                // 发送数据后台
                let item;
                if(this.register_type =='phone'){
                    item = {
                        accountCode:this.email_phone_code_two,
                        email:this.email,
                        emailCode:this.email_code,
                    }
                }else{
                    item = {
                        accountCode:this.email_phone_code_two,
                        emailCode:this.email_code,
                        email:this.email,
                    }
                }
                this.axios.post('/user/bindingEmail',qs.stringify(item))
                .then((res) => {
                    let data = res.data;
                    if(data.code ==200){
                        this.$message({
                            type:'success',
                            // message:"邮箱绑定成功！",
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
                        this.top_box = false;
                        this.submit_info = true;
                        this.send_call = data.message;
                    }
                }).catch((err) => {
                    console.log(err)
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
.binding-email{
    .binding-email-box{
        height: 50.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_google_box_email{
            width: 60rem /* 800/20 */;
            // height: 44rem /* 880/20 */;
            // height: 40rem /* 800/20 */;
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
                    width: 22.1rem /* 442/20 */;
                    height: 3rem /* 60/20 */;
                    background: rgba(251,242,242,1);
                    text-align: center;
                    line-height: 3rem /* 60/20 */;
                    font-size:.7rem /* 14/20 */;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-top: 1rem /* 20/20 */;
                }
                .email{
                    width: 21.15rem /* 423/20 */;
                    width: 22.1rem /* 423/20 */;
                    margin-top: .5rem /* 10/20 */;
                    .email_span{
                        line-height: 1.5rem /* 30/20 */;
                    }
                    .email_input{
                        outline: none;
                        display: inline-block;
                        width:21.15rem /* 423/20 */;
                        width:22.1rem;
                        height:2.45rem /* 49/20 */;
                        font-size:.7rem /* 14/20 */;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        box-sizing: border-box;
                        padding-left: .5rem /* 10/20 */;

                    }
                    .email_input_code{
                        outline: none;
                        display: inline-block;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        box-sizing: border-box;
                        padding-left: .5rem /* 10/20 */;
                        width:15.555rem /* 300/20 */;
                        height:2.55rem /* 49/20 */;
                        font-size:.7rem /* 14/20 */;
                    }
                    .input_one_tete_fa{
                        display: inline-block;
                        width: 5.5rem!important /* 123/20 */;
                        height:2.55rem /* 51/20 */!important;
                        outline: none!important;
                        vertical-align: bottom;
                        
                        .el-input__inner{
                            display: inline-block;
                            width: 6.5rem!important;
                            font-size:.7rem /* 14/20 */;
                            height:2.55rem /* 51/20 */!important;
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
                    width:22.1rem /* 423/20 */;
                    height:2.45rem /* 49/20 */;
                    margin-bottom: 1rem /* 20/20 */;
                    .el-input__inner{
                        display: inline-block;
                        border: none;
                        outline: none!important;
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
