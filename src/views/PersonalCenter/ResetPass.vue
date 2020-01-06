<template>
    <div class="reset-pass">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="reset-box">
            <div class="file_reset_box">
                <div class="file_reset_nav">
                    <span @click="go_file_center">{{$t('pay_pass.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{$t('pay_pass.nav_pass')}}</span>
                </div>
                <div class="file_reset_body">
                    <p class="msg">{{$t('pay_pass.pass_info')}}</p>
                    <p class="lable">{{$t('pay_pass.old_pass')}}</p>
                    <el-input class="innner_left" type="password" v-model="pass_old"  :placeholder="$t('pay_pass.input_old_p')" ></el-input>
                    <p class="lable">{{$t('pay_pass.new_pass')}}</p>
                    <el-input class="innner_left" type="password" v-model="pass_new"  :placeholder="$t('pay_pass.input_new_p')" @focus="new_pass_focus" @blur="check_pass"></el-input><br>
                    <i class="el-icon-warning" v-show="new_pass_info">{{$t('info_item.pass_info')}}</i>
                    <p class="lable">{{$t('pay_pass.new_pass2')}}</p>
                    <el-input class="innner_left" type="password" v-model="pass_new_two"  :placeholder="$t('pay_pass.input_new_p2')" @focus="new_pass_two_focus" @blur="check_pass_equal"></el-input><br>
                    <i class="el-icon-warning" v-show="new_pass_two_info">{{$t('info_item.pass_no_com')}}</i>
                    <p class="lable">{{user_info.accountType=='0'?$t('info_item.phone'):$t('info_item.email')}}</p>
                    <el-input class="innner_left" v-model="email" disabled="" placeholder="" ></el-input>
                    <p class="lable">{{user_info.accountType=='0'?$t('info_item.phone_code'):$t('info_item.email_code')}}</p>
                    <div>
                        <el-input class="innner_left send_email" v-model="email_phone_code"  :placeholder="user_info.accountType=='0'? $t('info_item.p_phone_code'):$t('info_item.p_email_code')" ></el-input><span class="innner_left send_email_button" @click="send_email_fun">{{send}}</span>
                    </div>
                    <el-input class="innner_left input_info" type="button" :value="$t('info_item.old_pass_error')" v-show="input_info"></el-input><br>
                    <el-input class="innner_left input_button" :class="button_active" type="button" :value="$t('info_item.submit')" @click.native="submit_fun"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav':TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            // 
            new_pass_info:false,
            new_pass_two_info:false,
            input_info:false,
            pass_old:'',
            pass_new:'',
            pass_new_two:'',
            email:'',
            email_phone_code:'',
            reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,

            send:this.$t('info_item.get_code'),
            can_send:true,
            // register_type:'phone',//注册方式
            can_submit:false,
        }
    },
    computed:{
        button_active:{
            get:function () {
                if(this.pass_old != '' && this.pass_new != '' && this.pass_new_two != ''  && this.email_phone_code !=''  && this.pass_new==this.pass_new_two) {
                    this.can_submit = true
                    return 'button_active'
                }
            },
            set:function () {
                if(this.pass_old != '' && this.pass_new != '' && this.pass_new_two != ''  && this.email_phone_code !='' && this.pass_new==this.pass_new_two) {
                    this.can_submit = false
                    return ''
                }
            }
        },
        user_info:{
            get:function(){
                return this.$store.getters.user_info;
            }
        },
        register_type:{
            get:function (){
                return this.$store.state.register_type;
            }
        },
        emailReal:{
            get:function (){
                return this.$store.state.init_user_info.email;
            }
        },
        phone:{
            get:function (){
                return this.$store.state.init_user_info.phoneAreaCode+","+this.$store.state.init_user_info.phone;
            }
        }
    },
    created(){
        if(this.user_info.accountType =='0'){
            this.email = this.phone
        }else{
            this.email = this.emailReal
        }
    }, 
    methods:{
        check_pass() {
            // console.log(1,this.reg.test(this.pass_new))
            if(!this.reg.test(this.pass_new)) {
                this.new_pass_info = true;
            }
        },
        check_pass_equal() {
            if(!this.reg.test(this.pass_new_two)) {
                this.new_pass_two_info = true;
            }
            if(this.pass_new != this.pass_new_two){
                this.new_pass_two_info = true;
            }
        },
        new_pass_focus() {
             this.new_pass_info = false;
        },
        new_pass_two_focus () {
            this.new_pass_two_info = false;
        },
        send_email_fun() {
            // 
            if(this.can_send ) {
            // 发送接口
                this.axios.post('/getCode',qs.stringify({
                    accountType:this.user_info.accountType,
                    behaviorType:1,
                    number:this.email,
                })).then((res) => {
                    let data = res.data;
                    if(data.code == 200 ){
                        this.$message({
                            type: 'success',
                            message: data.message,
                            duration:1000,
                        });
                    }else{
                        this.$message({
                            type: 'waring',
                            message: data.message,
                            duration:1000,
                        }); 
                    }
                }).catch((res) => {
                    this.$message({
                        type: 'waring',
                        message: res,
                        duration:1000,
                    }); 
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
                
            }
        },
        submit_fun() {
            // 
            if(this.can_submit) {
                this.axios.post('/user/changePassword',qs.stringify({
                    code:this.email_phone_code,
                    newPassword:this.pass_new,
                    oldPassword:this.pass_old,
                })).then((res) => {
                    let data = res.data;
                    if(data.code == 200){
                        this.$message({
                            type: 'success',
                            message: data.message,
                            duration:800,
                        });
                        this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
                    }else{
                        this.$message({
                            type: 'error',
                            message: data.message,
                            duration:800,
                        });
                        this.input_info = true;
                    }
                }).catch((res) => {
                    this.$message({
                        type: 'waring',
                        message: res,
                        duration:1000,
                    });
                })
            }else{
                this.$message({
                    type: 'error',
                    message: this.$t('info_item.input_all'),
                    duration:800,
                })
            }
        },
        go_file_center() {
            this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
        }
    }
}
</script>

<style lang="scss">
.reset-pass{
    .reset-box{
        height: 50.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_reset_box{
            width: 60rem /* 800/20 */;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            padding: .75rem /* 15/20 */  2.5rem /* 50/20 */;
            font-size:.7rem /* 14/20 */;
            font-family:PingFang-SC-Regular;
            margin-bottom: 1rem /* 20/20 */;
            margin-bottom: 10rem /* 20/20 */;
            box-sizing: border-box;
            margin-top: 7.05rem /* 141/20 */;
            .file_reset_nav{
                text-align: left;
                font-size:.8rem /* 16/20 */;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                span{
                    cursor: pointer;
                }
                padding-bottom: .5rem /* 10/20 */;
                border-bottom: .05rem /* 1/20 */ solid rgba(204,204,204,1);
            }
            .file_reset_body{
                text-align: left;
                .msg{
                    // width: 35rem /* 700/20 */;
                    height: 3rem /* 60/20 */;
                    background:rgba(206,219,240,1);
                    margin: 0 auto;
                    margin-top:.75rem /* 15/20 */ ;
                    line-height: 3rem /* 60/20 */;
                    padding-left: 2rem /* 40/20 */;
                    box-sizing: border-box;
                }
                .lable{
                    text-align: left;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    margin-top:1rem /* 20/20 */;
                    margin-bottom:.75rem /* 15/20 */;
                }
                .el-input{
                    width: 21rem /* 420/20 */;
                    height: 2.25rem /* 45/20 */;
                }
                .el-input__inner{
                    height: 2.25rem!important /* 45/20 */;
                    line-height: 2.25rem!important /* 45/20 */;
                    outline: none!important;
                    border-color: rgba(204,204,204,1);
                }
                .send_email{
                    width: 14rem /* 280/20 */;
                    .el-input__inner{
                        // border-right: none!important;
                        border-top-right-radius: 0!important;
                        border-bottom-right-radius: 0!important;
                    }
                }
                .send_email_button{
                    display: inline-block;
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
                i{
                    display: inline-block;
                    color:rgba(240,91,95,1);
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
                .input_button{
                    .el-input__inner{
                        background: rgba(204,204,204,1);
                    }
                }
                .button_active{
                    .el-input__inner{
                        background:#4c6085;
                    }
                }
            }
        }
        @media screen and(max-width: 480px) {
            .file_reset_box{
                width:100%;
            }
        }
    }
}
</style>
