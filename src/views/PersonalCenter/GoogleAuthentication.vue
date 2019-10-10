<template>
    <div class="google-authentication">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="google-authentication-box">
            <div class="file_google_box">
                <div class="file_google_nav">
                    <span @click="go_file_center">{{$t('bind_phone.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{this.type_binding=='email'? $t('info_item.nav_email'):(this.type_binding=='phone' ?$t('info_item.nav_phone'):$t('info_item.nav_google'))}}</span>
                </div>
                <div class="phone_email_google_nav">
                    <div v-show="email==null?true:false" class="email_binding binding" :class="type_binding=='email' ? 'active_binding':''" @click="go_type(0)">{{$t('bind_item.bind_email')}}</div><div class="phone_binding binding" :class="type_binding=='phone' ? 'active_binding':''" @click="go_type(1)">{{$t('bind_item.bind_phone')}}</div><div class="google_binding binding" :class="type_binding=='google' ? 'active_binding':''" @click="go_type(2)">{{$t('bind_item.bind_google')}}</div>
                </div>
                <div class="file_google_body">
                    <i class="i_text">{{$t('bind_google.title')}}</i>
                    <h3>1.{{$t('bind_google.item1_h')}}</h3>
                    <p>{{$t('bind_google.item1_p1')}}</p>
                    <p>{{$t('bind_google.item1_p2')}}</p>
                    <span class="apple">App Store</span><span class="android">Google Play</span>
                    <h3>2.{{$t('bind_google.item2_h')}}</h3>
                    <p>{{$t('bind_google.item2_p1')}}</p>
                    <p style="color:red;">{{$t('bind_google.item2_p2')}}</p>
                    <span class="qrcode"><img :src="img_url" alt="" ref="img" @error="img_error"></span><span class="qrcode_text"><i class="qrcode_text_title">{{$t('bind_google.key')}}</i><br><i class="qrcode_text_content">{{qrcode.toUpperCase()}}</i><i class="qrcode_text_do tag-read" :data-clipboard-text="qrcode.toUpperCase()" @click="copyAddressFun()">{{$t('info_item.copy')}}</i></span>
                    <h3>3.{{$t('bind_google.item3_h')}}</h3>
                    <!-- <el-input class=" send_email" v-model="email_code"  placeholder="请输入邮箱验证码  " ></el-input><span class=" send_email_button" @click="send_email_fun">获取验证码</span> -->
                    <el-input class="innner_left google_verification" type="text" @focus="submit_info = false" v-model="google_verification"  :placeholder="$t('info_item.p_google_code')" ></el-input><br>
                    <i class="el-icon-warning" style="color:red;" v-show="submit_info">{{$t('info_item.p_google_code')}}</i><br>
                    <el-input class="innner_left input_info" type="button" :value="$t('info_item.old_pass_error')" v-show="input_info"></el-input>
                    <el-input class="innner_left input_button" type="button" :value="$t('bind_google.submit')" @click.native="submit_fun"></el-input>
                </div>
            </div>
            <div class="top_email_box" v-show="top_box">
                <i class="el-icon-close" @click="close_box"></i>
                <span>{{user_info.accountType == '1' ? $t('info_item.email'):$t('info_item.phone')}}</span><br>
                <input class="top_email_box_input _top_one" type="text" disabled v-model="email_phone"><br>
                <span>{{user_info.accountType == '1' ? $t('info_item.email_code'):$t('info_item.phone_code')}}</span><br>
                <input class="top_email_box_input _top_input_one" type="text" v-model="email_phone_code_two"><input @click="sendEmail_two" class="top_email_box_input _top_input_two" type="button" v-model="send_two">
                <p v-show="info_end" style="height:.5rem;margin-top:0;text-align:left;"><i class="el-icon-warning" style="color:red;float:left;margin-right:13rem;" >{{$t('info_item.input_code')}}</i></p>
                <p class="outer"><span @click="submit_end" class="submit_end left">{{$t('info_item.confirm')}}</span><span @click="cancel_end" class="cancel_end right" >{{$t('info_item.cancle')}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import Clipboard from 'clipboard';
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
            qrcode:'',
            google_verification:'',
            email_code:'',
            input_info:false,
            // type_binding:this.$route.params.type,
            email_phone_code_two:'',
            send_two:this.$t('info_item.get_code'),
            top_box:false,
            can_send_end:true,
            img_url_test:'',
            submit_info:false,
            info_end:false,
        }
    },
    mounted(){
        let binding_type = this.$route.params.type
        if(binding_type) {
            this.$store.dispatch({
                type:'_async_set_binding_type',
                binding_type
            })
        }
        // //取谷歌验证器信息
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
                message:this.$t('info_item.error')
            })
        }) 
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
        user_info(){
            return this.$store.getters.user_info;
        },
        img_url:{
            set:function (v) {
                this.img_url_test = v
            },
            get:function () {
                return this.img_url_test;
            }
        },
        email_phone(){
            if(this.$store.getters.user_info.accountType=='0'){
                return this.$store.getters.user_info.phoneAreaCode+','+this.$store.getters.user_info.phone
            }else{
                return this.$store.getters.user_info.email
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
        email() {
            // return '';
            return this.$store.getters.user_info.email;
        },
        register_type:{
            get:function () {
                return this.$store.state.register_type;
            },
            set:function () {
                return this.$store.state.register_type;
            }
        },
        phone() {
            return this.$store.state.phone;
        },
    },
    methods:{
        getPath(key){
            this.img_url_test = 'http://103.75.2.198:8080'+key;
            // this.axios.post('/file/getUrl',qs.stringify({key:key}))
            // .then((res) => {
            //     let data = res.data;
            //     if(data.code == 200){
            //        let url = data.data.url
            //         this.img_url_test = url;
            //     }else{
            //         this.$message({
            //             type:'error',
            //             message:data.message,
            //             duration:1100,
            //         })
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })
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
            if(this.google_verification != '') {
                // this.top_box = true;
                let item = {
                    type:'google',
                    googleCode:this.google_verification,
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
            }else{
                this.submit_info = true; //错误提示
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
        close_box(){
            this.top_box = false;
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
            }
        },
        sendEmail_two(){
            console.log(2)
            if(this.can_send_end ) {
                console.log(1)
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:this.$store.getters.user_info.accountType,
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
                    }else{
                        this.$message({
                            message: data.message,
                            type: 'waring',
                            duration:1100,
                        });
                    }
                }).catch((err) => {
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
        submit_end() {
            if(this.email_phone_code_two == '') {//不执行
                this.info_end = true;
            }else{
                // 发送数据后台
                this.axios.post('/user/bindingGoogleAuth',qs.stringify({
                    code:this.email_phone_code_two,
                    googleCode:this.google_verification,
                })).then((res) => {
                    let data = res.data;
                    if(data.code == 200) {
                        this.$message({
                            // message: '绑定谷歌验证器成功！',
                            message: data.message,
                            type: 'success',
                            duration:1100,
                        });
                        this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
                    }else{
                         this.$message({
                            message: data.message,
                            type: 'error',
                            duration:1100,
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        message: err,
                        type: 'error',
                        duration:1100,
                    });
                }) 
                // 返回成功跳转 个人
                // this.$router.push('/home/center/file')
            }
        },
        cancel_end() {
            this.top_box = false;
        },
        img_error(err){
            // this.$message({
            //     message: '二维码获取失败！',
            //     type: 'error'
            // });
        }
    }
}
</script>

<style lang="scss">
.google-authentication{
    .google-authentication-box{
        height: 60.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_google_box{
            width: 60rem /* 800/20 */;
            height: 52rem /* 880/20 */;
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
                color:rgba(153,153,153,1);
                margin-top: .5rem /* 10/20 */;
                text-align: left;
                .i_text{
                    display: inline-block;
                    text-align: left;
                    line-height: 2rem /* 40/20 */;
                    color:rgba(153,153,153,1);
                    width: 100%;
                }
                .el-input{
                    width: 21rem!important /* 420/20 */;
                    height: 2.25rem /* 45/20 */;
                }
                .el-input__inner{
                    height: 2.25rem!important /* 45/20 */;
                    line-height: 2.25rem!important /* 45/20 */;
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
                    color: #5c89cc;
                }
                .google_verification{
                    margin-top: 1rem /* 20/20 */;
                }
                .input_button{
                    margin-top: .5rem /* 10/20 */;
                    margin-bottom: 1.5rem!important /* 30/20 */;
                    height: 1.5rem!important /* 30/20 */;
                    .el-input__inner{
                        background:#4c6085;
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
                    background:#4c6085;
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    padding-left: 1rem;
                    box-sizing: border-box;
                    cursor: pointer;
                    position: relative;
                }
                .apple:before{
                    content: url('../../assets/images/agency/apple@3x.png');
                    position: absolute;
                    display: inline-block;
                    width:.9rem /* 18/20 */;
                    height:1.05rem /* 21/20 */;
                    z-index: 1;
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
                    background:#4c6085;
                    border-radius:.25rem /* 5/20 */;
                    text-align: center;
                    padding-left: 1rem;
                    box-sizing: border-box;
                    cursor: pointer;
                    position: relative;
                }
                .android:before{
                    content: url('../../assets/images/agency/android@3x.png');
                    position: absolute;
                    display: inline-block;
                    width:.9rem /* 18/20 */;
                    height:1.05rem /* 21/20 */;
                    z-index: 1;
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
                        color:#5c89cc;
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
                    transform: scale(1);
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
        @media screen  and(max-width: 480px){
            .file_google_box{
                width:100%;
            }
        }
        // 
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
