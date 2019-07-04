<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @LastEditors: mawei
 * @Since: 2019-04-14 13:30:14
 * @LastEditTime: 2019-05-28 10:51:42
 -->
<template>
    <div class="personal">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="personal-box">
            <div class="personal-box-img">
            </div>
            <div class="banxin">
                <div class="personal-box-body">
                    <div class="center_file_info outer">
                        <div class="account_security">
                            <div class="person_info">
                                <div class="img outer"> 
                                    <div class="im">
                                        <img src="" alt="" :data-name="user_info.username[0]"><i>{{user_info.username[0]}}</i>
                                    </div>
                                    <div class="infor">
                                        <span class="name">{{user_info.username}}</span>
                                        <span>{{user_info.accountType=='0'?user_info.phone:user_info.email}}</span>
                                    </div>
                                </div>
                                <div class="pass">
                                    <p :class="lang"><img src="../../assets/images/personal/pass.png" alt=""><span class="modify_salary" @click="go_file_reset">{{$t('my_account.reset_pass')}}</span></p>
                                    <p class="p_border" :class="lang"><img src="../../assets/images/personal/pay_pass.png" alt=""><span class=" " @click="go_file_reset_salary"><i class="modify_salary">{{user_info.ifPayPassword=='1'?$t('my_account.reset_fund_pass'):$t('my_account.set_fund_pass')}}</i></span></p>
                                </div>
                            </div>
                            <div class="border_padding">
                                <div class="border one">
                                    <div class="icon">
                                        <img src="../../assets/images/personal/email.png" alt="">
                                        <span>{{$t('info_item.email')}}</span>
                                    </div>
                                    <div class="center">
                                        <span>{{(user_info.email== null || user_info.email== '')? $t('my_account.not_link'):user_info.email}}</span>
                                    </div>
                                    <div class="last" 
                                    
                                    >
                                        <span @click="google_account_fun('email')" v-show="(user_info.email ==null || user_info.email=='')">{{$t('my_account.e_link')}}</span>
                                        <span class="done" v-show="(user_info.email !=null && user_info.email!='')">{{$t('my_account.linked')}}</span>
                                    </div>
                                </div>
                                <div class="border one">
                                    <div class="icon">
                                        <img src="../../assets/images/personal/google.png" alt="">
                                        <span>{{$t('info_item.google_auth')}}</span>
                                    </div>
                                    <div class="center">
                                        <span>{{user_info.googleAuthTag== '1'? $t('my_account.linked'):$t('my_account.not_link') }}</span>
                                    </div>
                                    <div class="last" 
                                    
                                    >
                                        <span
                                        @click="google_account_fun(user_info.googleAuthTag=='1'?'google':'google',user_info.googleAuthTag=='1'?'k':'')"
                                        >{{user_info.googleAuthTag =='1'? $t('my_account.g_c_link'):$t('my_account.g_link')}}</span>
                                    </div>
                                </div>
                                <div class="border one">
                                    <div class="icon">
                                        <img src="../../assets/images/personal/phone.png" alt="">
                                        <span>{{$t('info_item.phone')}}</span>
                                    </div>
                                    <div class="center">
                                        <span>{{user_info.phone != null? user_info.phone:$t('my_account.not_link')}}</span>
                                    </div>
                                    <div class="last" 
                                
                                    >
                                        <span  @click="google_account_fun('phone')">{{user_info.phone != null? $t('my_account.p_c_link'):$t('my_account.p_link')}}</span>
                                    </div>
                                </div>
                                <div class="border one">
                                    <div class="icon">
                                        <img src="../../assets/images/personal/id.png" alt="">
                                        <span>{{$t('my_account.id_ver')}}</span>
                                    </div>
                                    <div class="center">
                                        <span class="">{{user_info.identityAuthStatus=='0'?$t('my_account.id_un_certify'):(user_info.identityAuthStatus=='1'?$t('my_account.tijiao_weishenhe')+'('+(user_info.role =='0' || user_info.role=='2' ? $t('my_account.geren'):$t('my_account.jigou'))+')':(user_info.identityAuthStatus=='2'?$t('my_account.tijiao_shenhe_ok')+'('+(user_info.role =='0' || user_info.role=='2' ? $t('my_account.geren'):$t('my_account.jigou'))+')':$t('my_account.tijiao_shenhe_no')+'('+(user_info.role =='0' || user_info.role=='2' ? $t('my_account.geren'):$t('my_account.jigou'))+')'))}}</span>
                                    </div>
                                    <div class="last" 
                                    >
                                        <span class="span_three identify_class" :class="user_info.identityAuthStatus=='0'?'duan'+lang:'chang'+lang" v-if="user_info.role=='1' ? false:true" @click="authentication_verification_fun" :data-real="user_info.identityAuthStatus=='0' ? $t('my_account.certify'):user_info.identityAuthStatus=='1'&& (user_info.role=='0' || user_info.role=='2') ?$t('my_account.com_id'):(user_info.identityAuthStatus=='3' ? $t('my_account.certify'):$t('my_account.com_id')) "></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="center_file_pay_methods" :class="height_set" v-loading="loading">
                        <div class="pay_methods_header">
                            <h3 class="">{{$t('my_account.payment')}}</h3><span :class="lang">({{$t('my_account.payment_de')}})</span>
                        </div>
                        <div class="pay_methods_none pay_methods_body"  v-if="methods.length>0?false:true">
                            <p class="addPaymentMethodClassInfo">{{$t('my_account.null_method')}}</p>
                            <p @click="addPaymentMethod()" class="addPaymentMethodClass">{{$t('my_account.null_add_payment')}}</p>
                        </div>
                        <div class="pay_methods_have pay_methods_body"  :class="height_set_child"   v-if="methods.length>0?true:false">
                            <!-- <li class="li_head">
                                <span class="h_flex2" style="padding-left:.3rem;display:flex;just-content:space-between;"><i style="flex:7;">方式</i><span id="uu-name-h" class="span_center" style="flex:3;padding-left:0rem;text-align:left;">收款人</span></span>
                                <span class="h_flex span_center" style="">收款账户</span>
                                <p class="h_flex span_text color_text" style="">
                                    <span class=" color_text">操作</span>
                                </p>
                            </li> -->
                            <!-- <li class="li_body" v-for="(item,k) in methods" :key="k">
                                <span class="h_flex2" style="padding-left:.3rem;box-sizing:border-box;display:flex;just-content:space-between;"><img :src="item.logo" alt=""><i class="p-d" style="flex:7;" :title="item.type=='0'?(''+item.bankAccount+'('+item.branchAccount+')'):(item.type=='1'?'支付宝 ':'微信 ')">{{item.type=='0'?((''+item.bankAccount+'('+item.branchAccount+')').length>=18?(''+item.bankAccount+'('+item.branchAccount+')').substr(0,15)+'...':(''+item.bankAccount+'('+item.branchAccount+')')):(item.type=='1'?'支付宝 ':'微信 ')}}</i> <i id="uu-name" style="flex:3;text-align:left;">{{item.name}}</i> </span>
                                <span class="h_flex span_center" style="">{{item.type=='0'?item.bankCardNumber:(item.type=='1'?item.alipayAccount:item.wxAccount)}}</span>
                                <p class="h_flex span_text" style="" >
                                    <span class="delete" style="color:#5c89cc !important" @click="delete_pay_method(item.id)">删除</span>
                                    <el-switch
                                        :data-nimei="item.id"
                                        v-model="item.status"
                                        @change="changeStaus(item.status,item.id,item)"
                                        style="">
                                    </el-switch>
                                </p>
                            </li> -->
                            <li class="li_item" v-for="(item,k) in methods" :key="k">
                                <div class="icon">
                                    <img :src="item.logo" alt="">
                                    <span class="title">{{item.type==0?$t('my_account.bank'):(item.type==1?$t('my_account.ali'):$t('my_account.wx'))}}</span>
                                </div>
                                <div class="account_info">
                                    <span class="sp1">{{item.type==0?item.bankCardNumber:(item.type==1?item.alipayAccount:item.wxAccount)}}</span>
                                    
                                    <!-- <span class="sp2" :title="item.name">{{item.name.length>5?item.name.slice(0,3)+'...':item.name}}</span> -->
                                    <span class="sp2" :title="item.name">{{setString(item.name,10)}}</span>
                                    <!-- <span class="sp3" :title="item.type==0?item.bankAccount+(item.branchAccount!='' && item.branchAccount!=null ?'('+item.branchAccount+')':''):(item.type==1?'支付宝':'微信')">{{item.type==0?item.bankAccount+(item.branchAccount!='' && item.branchAccount!=null ?'('+((item.branchAccount.length>23?item.branchAccount.slice(0,17)+'...':item.branchAccount))+')':''):(item.type==1?'支付宝':'微信')}}</span> -->
                                    <span class="sp3" :title="item.type==0?item.bankAccount+(item.branchAccount!='' && item.branchAccount!=null ?'('+item.branchAccount+')':''):(item.type==1?$t('my_account.ali'):$t('my_account.wx'))">{{item.type==0?item.bankAccount+(item.branchAccount!='' && item.branchAccount!=null ?'('+setString(item.branchAccount,30)+')':''):(item.type==1?$t('my_account.ali'):$t('my_account.wx'))}}</span>
                                </div>
                                <div class="operate">
                                    <el-switch
                                        :data-nimei="item.id"
                                        v-model="item.status"
                                        @change="changeStaus(item.status,item.id,item)"
                                        style="">
                                    </el-switch>
                                    <div class="delete" @click="delete_pay_method(item.id)">
                                        <img src="../../assets/images/personal/deletepng.png" alt="">
                                    </div>
                                </div>
                            </li>
                            <p @click="addPaymentMethod()" class="addPaymentMethodClassHave" v-show="this.methods.length>=12 ? false:true"><img src="../../assets/images/personal/add.png" alt=""> {{$t('my_account.add_payment')}}</p>
                        </div>
                    </div>
                    <div class="center_file_looger">
                        <h3>{{$t('my_account.login_history')}}</h3>
                        <li class="li_logger_head li-head"><span class="logger_left">{{$t('my_account.time')}}</span><span class="logger_center">{{$t('my_account.type')}}</span><span class="logger_end">{{$t('my_account.ip')}}</span></li>
                        <li class="li_logger_head" v-for="(item,j) in logger" :key="j"><span class="logger_left">{{item.loginTime}}</span><span class="logger_center">{{item.loginType}}</span><span class="logger_end">{{item.ip}}</span></li>
                    </div>
                </div>
            </div>
            <div class="personal-box-body-static"></div>
        </div>
        <div class="add_method" v-show="add_method_status">
            <div class="add_header outer" :class="active">
                <h3>{{$t('my_account.add_payment')}}</h3> <span class="el-icon-close" @click="closeAdd"></span>
            </div>
            <div class="add_form outer">
                <p>{{$t('my_account.country')}}</p>
                    <el-select class="innner_left" v-model="countryInfoId" placeholder="请选择">
                    <el-option
                    v-for="item in tradeCoinTypeArr"
                    :key="item.id"
                    :label="lang=='en'?item.countryCode:item.countryName"
                    :value="item.id">
                    </el-option>
                </el-select>
                <p>{{$t('my_account.payment')}}</p>
                    <el-select class="innner_left" v-model="method" placeholder="请选择">
                    <el-option
                    v-for="item in pay_methods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <p>{{$t('my_account.name')}}</p>
                <el-input class="innner_left" id="nameSet" ref="nameSet" :disabled="disabled" v-model="inputName" :placeholder="$t('my_account.input_name')" ></el-input>
                <p v-show="method =='0' ? true:false">{{$t('my_account.bank_name')}}</p>
                <!-- <el-input class="innner_left" v-model="bank"  placeholder="开户银行由卡号自动得出" ></el-input> -->
                <el-input v-show="method =='0' ? true:false" class="innner_left" v-model="bank"  :placeholder="$t('my_account.input_bank')" ></el-input>
                <p v-show="method =='0' ? true:false">{{$t('my_account.branch_name')}}({{$t('my_account.optional')}})</p>
                <el-input v-show="method =='0' ? true:false" class="innner_left" v-model="bank_branch"  :placeholder="$t('my_account.input_branch')" ></el-input>
                <p v-show="method =='0' ? true:false">{{$t('my_account.bank_account')}}</p>
                <el-input v-show="method =='0' ? true:false" class="innner_left" v-model="bank_card_id"  :placeholder="$t('my_account.input_account')" ></el-input>
                <p v-show="method =='1' ? true:false">{{$t('my_account.ali')}}</p>
                <el-input v-show="method =='1' ? true:false" class="innner_left" v-model="zhi_card_id"  :placeholder="$t('my_account.input_ali')" ></el-input>
                <p  v-show="method =='1' ? true:false">{{$t('my_account.add_qrcode')}}</p>
                <p  v-show="method =='1' ? true:false" class="outer">
                    <img v-show="method =='1' ? true:false" width="100%" :src="zhiImgUrlReal" alt="">
                    <input v-show="method =='1' ? true:false" type="file" id="pic_zhi" @change="postImg('pic_zhi')" ref="pic_zhi">
                    <!-- <i class="el-icon-plus plus" @click="click_one" v-show="method =='1' ? true:false"></i> -->
                </p>
                <p v-show="method =='2' ? true:false">{{$t('my_account.wx')}}</p>
                <el-input v-show="method =='2' ? true:false" class="innner_left" v-model="wei_card_id"  :placeholder="$t('my_account.input_wx')" ></el-input>
                <p  v-show="method =='2' ? true:false">{{$t('my_account.add_qrcode')}}</p>
                <p v-show="method =='2' ? true:false" class="outer">
                    <img v-show="method =='2' ? true:false" width="100%" :src="weiImgUrlReal" alt="">
                    <input v-show="method =='2' ? true:false" type="file" id="pic_wei" @change="postImg('pic_wei')" ref="pic_wei">
                    <!-- <i class="el-icon-plus plus" @click="click_one" v-show="method =='2' ? true:false"></i> -->
                </p>
                <!-- <p>谷歌验证码</p>
                <el-input class="innner_left" v-model="google_account"  placeholder="请输入谷歌验证码" @focus="google_blur"></el-input>
                <span v-show="google_account_status">谷歌验证码错误</span> -->
                <p>{{$t('my_account.fund_pass')}}</p>
                <el-input class="innner_left" v-model="salary_input" type="password"  :placeholder="$t('my_account.input_fund_pass')" @focus="salary_blur"></el-input>
                <span v-show="salary_input_info" style="display:inline-block;width:100%;background:#FFD3D9;color:#333;line-height:1.5rem;margin-top:.5rem;">{{end_info}}</span>
            </div>
            <div class="add_button outer">
                <span class="button_cancle left" @click="closeAdd">{{$t('info_item.cancle')}}</span><span class="button_confirm right" @click="confirm_add_methods">{{$t('info_item.confirm')}}</span>
            </div>
        </div>
        <div class="id_select_box outer" v-show="identify_staus">
            <i class="el-icon-close " @click="close_identify"></i>
            <!-- <p>
                <span class="id_select_person left" @click="go_identify_person">个人身份认证</span>
                <span class="id_select_company right" @click="go_identify_company">平台机构认证</span>
            </p> -->
            <div>
                <p @click="go_identify_person">
                    <img src="../../assets/images/personal/ge.png" alt="">
                    <span class="id_select_person left" :class="lang">{{$t('my_account.one_id')}}</span>
                </p>
                <p @click="go_identify_company">
                    <img src="../../assets/images/personal/tai.png" alt="">
                    <span class="id_select_company right" :class="lang">{{$t('my_account.com_id')}}</span>
                </p>
            </div>
        </div>
        <div class="box_info_center box_info_open" ref="box_info" v-show="box_info" :class="box_info_height">
            <i class="el-icon-close close"  style="color:black;" @click="close_box_info"></i>
            <div class="outer" style="height:3rem;line-height:3rem;" v-show="user_info.identityAuthStatus!='2'">
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_id_ver')}}</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goAuthen">{{$t('info_item.verification')}}</span>
            </div>
            <!-- <div class="outer" style="height:3rem;line-height:3rem;" v-show="num<2?true:false">
                <span > <i class="el-icon-warning"></i> 完成至少两项账号安全绑定({{num}}/3)</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="box_info=false;">去绑定</span>
            </div> -->
            <div class="outer" style="height:3rem;line-height:3rem;" v-show="user_info.ifPayPassword!='1'">
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_fund_pass')}}</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goSalary">{{$t('info_item.set')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import {getLogFun,
QueryQtcTradeFunCountry} from '../../assets/js/api.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav':TopNav,
        'nav-bar': NavBar,
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        },
        lang() {
            return this.$i18n.locale;
        },
    },
    data(){
        return {
            legalSet:'legal-currency',
            /**
             * 收款相关
             */
            height_set:'',
            height_set_child:'',
            methods:[
                
            ],
            pay_methods:[
                {
                    value:'0',
                    label:"银行卡",
                },
                {
                    value:'1',
                    label:"支付宝",
                },
                {
                    value:'2',
                    label:"微信",
                }
            ],
            add_method_status:false,
            box_info:false,
            checkAddMethod:true,
            inputName:'',
            disabled:false,
            loading : false,
            /**
             * 日志相关
             */
            logger:[],
            /**
             * 添加支付方式相关
             */
            active:'',
            method:'0',
            zhiImgUrl:'',
            weiImgUrl:'',
            zhiImgUrlReal:'',
            weiImgUrlReal:'',
            bank:'',// 格局填的号码 由后台返回
            bank_branch:'',
            bank_card_id:'',
            zhi_card_id:'',
            wei_card_id:'',
            salary_input:'',
            salary_input_info:false,
            end_info:this.$t('my_account.fund_pass_err'),
            box_info_height:'',
            identify_staus:false,// 选择认证状态
            num:0,
            tradeCoinTypeArr:'',
            countryInfoId:''
        }
    },
    watch:{
        methods(n,o){
            let k = this.methods.length;
            // console.log(k)
            if(k>=5){
                if(k==5){
                    this.height_set='height_set1';
                    this.height_set_child = 'height_set_child1';
                }else if(k==6){
                    this.height_set='height_set2';
                    this.height_set_child = 'height_set_child2';
                }else if(k==7){
                    this.height_set='height_set3';
                    this.height_set_child = 'height_set_child3';
                }else if(k==8){
                    this.height_set='height_set4';
                    this.height_set_child = 'height_set_child4';
                }else if(k==9){
                    this.height_set='height_set5';
                    this.height_set_child = 'height_set_child5';
                }else if(k==10){
                    this.height_set='height_set6';
                    this.height_set_child = 'height_set_child6';
                }else if(k==11){
                    this.height_set='height_set7';
                    this.height_set_child = 'height_set_child7';
                }else if(k==12){
                    this.height_set='height_set8';
                    this.height_set_child = 'height_set_child8';
                }
            }
        },
        countryInfoId(n,o) {
            console.log(n)
            if(n!=1) {
                this.pay_methods = this.$t('my_account.pay_methods_one')
            }else{
                this.pay_methods = this.$t('my_account.pay_methods')
            }
            this.method = '0'
        },
        lang(n, o) {
            if(this.countryInfoId!=1) {
                this.pay_methods = this.$t('my_account.pay_methods_one')
            }else{
                this.pay_methods = this.$t('my_account.pay_methods')
            }
        }
    },
    async mounted() {
        if(this.countryInfoId!=1) {
                this.pay_methods = this.$t('my_account.pay_methods_one')
            }else{
                this.pay_methods = this.$t('my_account.pay_methods')
            }
        getLogFun(this);
        this.init_pay()
        this.initPersonal()
        console.log(this.user_info)
        let keyTrade = await QueryQtcTradeFunCountry(this)
            .then((res) => {
                return res;
            })
            if(keyTrade!=false) {
                this.tradeCoinTypeArr = keyTrade;
                this.countryInfoId = keyTrade[0].id
                
                
            }
    },
    methods:{
        setString(str, len) {  
            var strlen = 0;  
            var s = "";  
            for (var i = 0; i < str.length; i++) {  
                if (str.charCodeAt(i) > 128) {  
                    strlen += 2;  
                } else {  
                    strlen++;  
                }  
                s += str.charAt(i);  
                if (strlen >= len) {  
                    return s+"...";  
                }  
            }  
            return s;  
        }, 
        /**
         * 个人信息相关
         */
        google_account_fun(type,k) {
            
            this.$store.dispatch({
                type:'_async_set_binding_type',
                binding_type:type
            })
            // console.log(1,type,k)
            if(type=='phone') {
                this.$router.push({name:'BindingPhone',params:{type:type}})
            }else if(type=='email') {
                this.$router.push({name:'BindingEmail',params:{type:type}})
            }else if(type=='google' && k!='k'){
                this.$router.push({name:'GoogleAuthentication',params:{type:type}})
            }else if(type=='google' && k=='k'){
                this.$router.push({name:'ResetGoogleAuthentication',params:{type:type}})
            }
        },
        authentication_verification_fun(){
            if(this.user_info.identityAuthStatus=='2'){
                this.go_identify_company()
            }else{
                this.identify_staus = true;
            }
        },
        go_file_reset(){
            this.$router.push({name:'ResetPass'})
        },
        go_file_reset_salary(){
            this.$router.push({name:'PayPass'})
        },
        /**
         * 初始化收款方式
         */
        async init_pay(){
            this.axios.post('/receiptWay/list')
            .then((res)=>{
                let data = res.data;
                if(data.code == 200) {
                    this.methods= data.data
                    this.loading = false;
                    for(let i = 0;i<this.methods.length;i++) {
                        this.methods[i].status = this.methods[i].status =='0' ? false:true
                    }
                }else{
                    this.loading = false;
                    this.$message({
                        type:'error',
                        message:data.message
                    })
                }
            }).catch((res) => {
                this.$message({
                        type:'error',
                        message:res,
                    })
            })
            let keyTrade = await QueryQtcTradeFunCountry(this)
            .then((res) => {
                return res;
            })
            if(keyTrade!=false) {
                this.tradeCoinTypeArr = keyTrade;
                this.countryInfoId = keyTrade[0].id
                
                
            }
        },
        addPaymentMethod(){
            this.checkAddMethod = false
            this.initBox();
            let that = this;
            if(this.box_info == true){
                    return false
                }
             if(this.user_info.identityAuthStatus!='2'){
                 this.$message({
                     type:'error',
                     message:that.$t('info_item.first_id_ver'),
                     duration:1100,
                 })
                 return false;
             }
            this.add_method_status = true;
            this.active = 'active'
            if(this.user_info.role=='0'){
                // console.log('0')
                this.disabled = true
                this.inputName = this.user_info.realName;
            }else{
                // console.log('1')
                this.disabled = false
            }
        },
        delete_pay_method(k) {
            let id = k;
            let that = this;
            this.$confirm(that.$t('my_account.delete_pay'), {
                confirmButtonText: that.$t('info_item.confirm'),
                cancelButtonText: that.$t('info_item.cancle'),
                // type: 'warning',
                customClass:'ppp-button',
                center: true
                }).then(() => {
                    // 删除
                    this.axios.post('/receiptWay/delete',qs.stringify({id:k}))
                    .then((res) => {
                        let data = res.data;
                        if(data.code ==200) {
                            that.$message({
                                type: 'success',
                                message: data.message
                            });
                            this.init_pay()
                        }else{
                            that.$message({
                                type: 'waring',
                                message: data.message
                            });
                        }
                    }).catch((err) => {
                        that.$message({
                            type: 'error',
                            message: err
                        });
                    })
                    
                }).catch(() => {
                // that.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        },
        changeStaus(k,id,item){
            // let id = this.$refs.nimei[0].$attrs['data-nimei'];
            // console.log(id,this.$refs.nimei[0].$attrs['data-nimei'])
            let n=0;
            this.methods.forEach(it => {
                if(it.status=='1'){
                    n+=1
                }
            });
            if(n>3) {
                setTimeout(()=>{
                    item.status= !item.status
                },200)
                return false
            }
            if(k) {
                k = '1'
            }else{
                k='0'
            }
            this.axios.post('/receiptWay/activation',qs.stringify({id:id,status:k}))
        },
        /**
         * 添加收款方式相关
         */
        // 关闭添加收款弹窗
        closeAdd(){
            this.add_method_status = false;
        },
        /**
         * 获取图片
         */
        postImg(item){
            
            // let dom_one = this.$refs.pic_zhi;
            let dom_one = document.getElementById(item);
            // let dom_one = item;
            // console.log(dom_one)
            let files ,that= this,fileType;
            fileType = dom_one.value;
            if(!/\.(jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(fileType))//gif|
            {
                // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                this.$message({
                    type:"error",
                    message:'图片类型必须是 jpg|jpeg|png|GIF|JPG|JPEG|PNG 中一种'
                })
                return false;
            }
            if(dom_one.files){//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
                files = dom_one.files;
                if(window.FileReader){
                    var reader = new FileReader(); 
                    reader.readAsDataURL(files[0]);
                    reader.onload = function(e){
                        let dx =(e.total/1024)/1024;
                        if(dx>=1){
                            // alert("文件大小大于2M");
                            that.$message({
                                type:"waring",
                                message:"上传图片大小不能超过 1 M"
                            })
                            return;
                        }
                        let fd = new FormData();
                        fd.append('file', files[0])
                        var result =this.result;//这里就是转化之后的DataURL
                        that.axios.post('/file/upload',fd).then((res) => {
                            console.log(1)
                            let data = res.data;
                            if(item=='pic_zhi'){
                                console.log(2)
                                that.zhiImgUrlReal =data.data.url;
                                that.zhiImgUrl =data.data.url;
                                console.log(that.weiImgUrlReal)
                                that.getPath(data.data.url,'pic_zhi')
                            }else{
                                console.log(3)
                                that.weiImgUrlReal =data.data.url;
                                that.weiImgUrl =data.data.url;
                                console.log(that.weiImgUrl)
                                that.getPath(data.data.url,'pic_wei')
                            }
                            that.two_i_status = false
                        })
                        .catch((err) => {
                            
                            })
                        
                    }
                    
                }else {//if(browserVersion.indexOf("SAFARI")>-1)
                    alert("不支持Safari浏览器6.0以下版本的图片预览!");
                }
            }else{
                this.$message({
                    type:'error',
                    message:"浏览器版本过低，请升级现代高级浏览器！",
                    duration:800,
                })
            }
        },
        salary_blur(){
            this.salary_input_info = false;
        },
        confirm_add_methods(){
            // 请求 
            let item;//根据支付方式 配置参数
            if(this.method == '0'){
                if(this.inputName=='' || this.bank =='' || this.bank_card_id == '' || this.salary_input== ''){
                    this.salary_input_info =true;
                    this.end_info = '请填写完整信息';
                    return false;
                }
                item = {
                    name:this.inputName,
                    bankAccount:this.bank,
                    bankCardNumber:this.bank_card_id,
                    branchAccount:this.bank_branch,
                    payPassword:this.salary_input,
                    type:'0',
                    countryInfoId:this.countryInfoId
                }
            }else if(this.method == '1'){
                if(this.inputName=='' || this.zhi_card_id =='' || this.salary_input == '' || this.zhiImgUrlReal ==''){
                    this.salary_input_info =true;
                    this.end_info = '请填写完整信息';
                    return false;
                }
                item = {
                    name:this.inputName,
                    alipayAccount:this.zhi_card_id,
                    payPassword:this.salary_input,
                    qrCode:this.zhiImgUrl,
                    type:'1',
                    countryInfoId:this.countryInfoId
                }
            }else if(this.method == '2'){
                if(this.inputName=='' || this.wei_card_id =='' || this.salary_input == '' || this.weiImgUrlReal == '' ){
                    this.salary_input_info =true;
                    this.end_info = '请填写完整信息';
                    return false;
                }
                item = {
                    name:this.inputName,
                    wxAccount:this.wei_card_id,
                    payPassword:this.salary_input,
                    qrCode:this.weiImgUrl,
                    type:'2',
                    countryInfoId:this.countryInfoId
                }
            }
            this.axios.post('/receiptWay/save',qs.stringify(item))
            .then((res) => {
                let data = res.data;
                if(data.code ==200) {
                    this.add_method_status = false;
                    this.$message({
                        type: 'success',
                        message: data.message,
                        duration:1000,
                    });
                    this.init_pay();
                    this.initPage()
                    Object.assign(this.$data, this.$options.data())
                    
                }else if(data.code ===201){
                    this.$message({
                        type: 'error',
                        message: data.message,
                        duration:1100,
                    });
                }else{
                   this.$message({
                        type: 'error',
                        message: data.message,
                        duration:1100,
                    });
                }
            }).then(() =>{
                this.init_pay()
            }).catch((err) => {
                console.log(err)
            })
            
        },
        close_identify(){
            this.checkAddMethod = true;
            this.identify_staus=false
        },
        go_identify_person() {
            this.identify_staus = false;
            this.$router.push('/identity-authentication')
        },
        go_identify_company() {
            this.identify_staus = false;
            this.$router.push('/agency-certification')
        },
        close_box_info() {
            this.$refs.box_info.classList.remove('box_info_open')
            this.$refs.box_info.classList.add('box_info_close')
            let t = setTimeout(()=>{
                this.$refs.box_info.classList.add('box_info_open')
                this.box_info = false;
                clearTimeout(t)
            },800)
        },
        goAuthen() {
            this.box_info = false;
            this.authentication_verification_fun()
        },
        goSalary() {
            // this.$router.push('/home/center/file')
            this.box_info = false;
            this.go_file_reset_salary()
        },
        initBox(){
            this.num=0;
            // console.log('this.googleAccount:',this.googleAccount)
            if(this.user_info.email!=null){
                this.num++
            }
            if(this.user_info.phone!=null){
                this.num++
            }
            if(this.user_info.googleAuthTag=='1'){
                this.num++
            }
            let k=0 ;
            if(this.user_info.identityAuthStatus !='2') {
                k+=1
            }
            if(this.user_info.ifPayPassword !='1') {
                k+=1
            }
            if(this.checkAddMethod) {// 是不是添加付款方式
                if(this.num<2) {
                    this.box_info = true;
                    // k+=1;
                }else{
                    this.box_info = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
                }
            }else{
                this.box_info = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
            }
            
            if(k==1) {
                this.box_info_height = 'box_height1'
            }else if(k ==2 ){
                this.box_info_height = 'box_height2'
            }else if (k==3) {
                this.box_info_height = 'box_height3'
            }else if (k ==0 ){
                this.box_info  =false;
            }
            
        },
        getPath(key,base){
            console.log('获取',key,base)
            this.axios.post('/file/getUrl',qs.stringify({key:key}))
            .then((res) => {
                let data = res.data;
                if(data.code == 200){
                   let url = data.data.url
                   if(base=='pic_zhi'){
                       this.zhiImgUrlReal = url
                   }else{
                       this.weiImgUrlReal = url
                   }
                    // console.log(base)
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:1200,
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        /**
         * 初始化个人信息
         */
        initPersonal(){
            this.axios.post('/user/getOwnInfo')
            .then((res) => {
                let data = res.data;
                if(data.code ==200){
                    this.$store.dispatch('_async_set_init_user_info',data.data)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss">
.personal{
    background: #F2F2F2;
    .personal-box{
        height: 23rem /* 460/20 */;
        .personal-box-img{
            height: 18.5rem /* 370/20 */;
            height: 23rem /* 460/20 */;
            background: url('../../assets/images/personal/personal@2x.png') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83/personal%402x.png) no-repeat center center;
            background-size: cover;
            position: relative;
            box-sizing:border-box;
            padding-top: 8rem;
        }
        .banxin{
            height: 0;
        }
        .personal-box-body{
            position: absolute;
            width: 100%;
            top: -5rem;
            // height: 48rem /* 960/20 */;
            background:rgba(242,242,242,1);
            box-sizing: border-box;
            padding:1.5rem /* 22/20 */ 1rem /* 20/20 */ ;
            .center_file_info{
                // width: 60rem /* 1200/20 */;
                .account_security,
                .basic_info{
                    width: 28.5rem /* 570/20 */;
                    width: 100%;
                    // height: 13.75rem /* 275/20 */;
                    background:rgba(255,255,255,1);
                    h3{
                        height: 2.5rem /* 50/20 */;
                        background:rgba(92,154,204,1);
                        background:rgba(204,204,204,1);
                        font-size:.9rem /* 18/20 */;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        color:rgba(51,51,51,1);
                        line-height:2.5rem /* 50/20 */;
                        text-align: left;
                        padding-left: 2rem /* 40/20 */;
                    }
                    @media screen and(max-width:480px) {
                        h3{
                            padding-left:1rem;
                        }
                        p{
                            padding-left:1rem!important;
                        }
                    }
                    p{
                        height: 2.75rem /* 55/20 */;
                        border-bottom: .05rem /* 1/20 */ solid rgba(255,255,255,1);
                        font-size:.8rem /* 16/20 */;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:3.5rem /* 70/20 */;
                        line-height:2.75rem /* 50/20 */;
                        text-align: left;
                        padding-left: 2rem /* 40/20 */;
                        .span_left{
                            display: inline-block;
                            width: 4.5rem /* 80/20 */;
                        }
                        .span_right{
                            display: inline-block;
                            width: 8.5rem /* 170/20 */;
                            margin-left: 6.5rem /* 130/20 */;
                            margin-left: 5rem /* 130/20 */;
                        }
                        .span_three{
                            margin-left: 2.5rem /* 50/20 */;
                            position: relative;
                            color:#5c89cc!important;
                            cursor: pointer;
                        }
                        .identify_class{
                            display: inline-block;
                            // font-size: .6rem /* 12/20 */;
                            position: relative;
                            color: #5c89cc!important;
                        }
                        .identify_class::before{
                            content: attr(data-real);
                            position: absolute;
                            // width: 4.7rem;
                            height: 1rem;
                            line-height: 1rem;
                            font-size: .75rem;
                            border: 0.05rem solid #5c89cc!important;
                            border-radius: 0.5rem;
                            border:.05rem /* 1/20 */ solid rgba(92,154,204,1);
                            text-align: center;
                            top: 20%;
                            top:-.4rem;
                            right: -2rem /* 20/20 */;
                            transform: translateX(50%) translateY(-50%) scale(1);
                        }
                        .identify_class:hover::before{
                            color:rgba(255,255,255,1)!important;
                            background: #5c89cc !important;
                        }
                        .modify{
                            position: absolute;
                            display: inline-block;
                            width: 2.7rem /* 54/20 */;
                            height: 1rem /* 20/20 */;
                            border:  .05rem /* 1/20 */ solid #5c89cc !important;
                            border-radius:.5rem /* 10/20 */;
                            color: rgba(92,154,204,1);
                            color:#5c89cc ;
                            cursor: pointer;
                            top: 0;
                            left: 0;
                            font-size: .6rem /* 12/20 */;
                            // margin-top: 1.975rem /* 39.5/20 */;
                            // transform: translateY(50%);
                        }
                        .modify:hover{
                            color:rgba(255,255,255,1);
                            background:#5c89cc !important;
                        }
                        .modify::after{
                            content:'修改';
                            position: absolute;
                            font-size: .75rem;
                            top: -0.85rem;
                            right: -0.6rem /* 0/20 */;
                            width: 2.7rem /* 54/20 */;
                            height: 1rem /* 20/20 */;
                        }
                        .modify_salary{
                            margin-left: .65rem /* 13/20 */;
                        }
                    }
                    .p_border{
                        border: none;
                    }
                }
                .basic_info{
                    // float: left;
                }
                .account_security{
                    // float: right;
                    .border_padding{
                        padding: 0 1.3rem;
                    }
                    .border{
                        border-bottom: 1px solid rgba(230,230,230,1);
                        // padding: 0 1.3rem;
                    }
                    .border:last-child{
                        border: none;
                    }
                    .person_info{
                        display: flex;
                        justify-content: space-between;
                        height: 4.5rem;
                        padding: 0 1.3rem;
                        border-bottom: 1px solid rgba(230,230,230,1);
                        div.img{
                            display: flex;
                            justify-content: space-between;
                            position: relative;
                            .im{
                                width:4rem;
                                    height:4rem;
                                position: relative;
                                img{
                                    width:4rem;
                                    height:4rem;
                                    background:rgba(76,96,133,1);
                                    position: absolute;
                                    top: -.5rem;
                                }
                                img:afeter{
                                    content: attr(data-name);
                                }
                                i{
                                    position: absolute;
                                    display: flex;
                                    top: -.5rem;
                                    width: 100%;
                                    height: 100%;
                                    justify-content: center;
                                    align-items: center;
                                    color:rgba(255,255,255,1);
                                    font-size: 1.5rem;
                                }
                            }
                            .infor{
                                display: flex;
                                flex-direction: column;
                                padding-left: .25rem;
                                justify-content: flex-end;
                                padding-bottom: 1rem;
                                span{
                                    color:rgba(51,51,51,1);
                                    font-size: .8rem;
                                }
                                span.name{
                                    color:rgba(51,51,51,1);
                                    font-size: 1rem;
                                    font-weight: 800;
                                    line-height: 1.5rem;
                                }
                            }
                        }
                        .pass{
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            p{
                                padding: 0;
                                width:7.5rem;
                                height:2rem;
                                background:rgba(237,239,243,1);
                                border-radius: 1rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: #4C6085;
                                cursor: pointer;
                                font-size: .8rem;
                                font-weight: 800;
                                transition: all .6s ease-in-out;
                            }
                            p:hover{
                                background: rgba(76, 96, 133, 1);
                                color: white;
                                overflow: hidden;
                                img{
                                    margin-left: -2rem;
                                    margin-right: 2rem;
                                    // filter: drop-shadow(2rem 0 #fff); 
                                    filter: drop-shadow(rgb(255, 255, 255) 2rem 0px);
                                }
                            }
                            p:nth-child(2){
                                margin-left: .5rem;
                            }
                            p.en{
                                width:9.5rem;
                            }
                            p.p_border.en{
                                width:11.5rem;
                            }
                        }
                    }
                    .one{
                        display: flex;
                        justify-content: space-between;
                        height: 3rem;
                        align-items: center;
                        color:rgba(51,51,51,1);
                        font-size: .8rem;
                        
                        .icon{
                            flex:1.4;
                            display: flex;
                            align-items: center;
                            img{
                                margin-right: .5rem;
                                width: 1.3rem;
                                height: 1.3rem;
                            }
                            span{
                                color:rgba(102,102,102,1);
                                font-size: .8rem;
                                display: flex;
                                align-items: center;
                            }
                        }
                        .center{
                            flex:1;
                            span{
                                color:rgba(51,51,51,1);
                                font-size: .8rem;
                                display: flex;
                                align-items: center;
                            }
                        }
                        .last{
                            flex:1;
                            display: flex;
                            justify-content: flex-end;
                            
                            span{
                                color:rgba(92,137,204,1);
                                font-size: .8rem;
                                height: 3rem;
                                display: flex;
                                align-items: center;
                                cursor: pointer;
                            }
                            .done{
                                color:rgba(102,102,102,1);
                            }
                            .identify_class{
                                display: inline-block;
                                // font-size: .6rem /* 12/20 */;
                                position: relative;
                                color: #5c89cc!important;
                                // width: 100%;
                            }
                            .identify_class::before{
                                content: attr(data-real);
                                position: absolute;
                                width: 4.7rem;
                                height: 1rem;
                                line-height: 1rem;
                                font-size: .75rem;
                                border: 0.05rem solid #5c89cc!important;
                                border-radius: 0.5rem;
                                border:.05rem /* 1/20 */ solid rgba(92,154,204,1);
                                text-align: center;
                                top: 50%;
                                // top:-.4rem;
                                // right: -2rem /* 20/20 */;
                                right: 0;
                                transform: translateY(-50%) scale(1);
                                cursor: pointer;
                            }
                            .changen.identify_class::before{
                                width: 12.7rem;
                            }
                            .identify_class:hover::before{
                                color:rgba(255,255,255,1)!important;
                                background: #5c89cc !important;
                            }
                            .modify{
                                position: absolute;
                                display: inline-block;
                                width: 2.7rem /* 54/20 */;
                                height: 1rem /* 20/20 */;
                                border:  .05rem /* 1/20 */ solid #5c89cc !important;
                                border-radius:.5rem /* 10/20 */;
                                color: rgba(92,154,204,1);
                                color:#5c89cc ;
                                cursor: pointer;
                                top: 0;
                                left: 0;
                                font-size: .6rem /* 12/20 */;
                                // margin-top: 1.975rem /* 39.5/20 */;
                                // transform: translateY(50%);
                            }
                            .modify:hover{
                                color:rgba(255,255,255,1);
                                background:#5c89cc !important;
                            }
                            .modify::after{
                                content:'修改';
                                position: absolute;
                                font-size: .75rem;
                                top: -0.85rem;
                                right: -0.6rem /* 0/20 */;
                                width: 2.7rem /* 54/20 */;
                                height: 1rem /* 20/20 */;
                            }
                            .modify_salary{
                                margin-left: .65rem /* 13/20 */;
                            }
                        }
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .center_file_info{
                    .basic_info,
                    .account_security{
                        width: 100%;
                    }
                    .account_security{
                        margin-top: 1rem;
                    }
                    .span_left{
                        width: 5.5rem!important;
                    }
                    .identify_class::before{
                        width: 6rem!important;
                    }
                }
                .center_file_pay_methods{
                    .pay_methods_have.pay_methods_body{
                        padding-left: 0;
                        padding-right: 0;
                        .h_flex{
                            flex: 2!important;
                        }
                    }
                    li>.span_center{
                        padding-left: 0!important;
                    }
                    li{
                        .span_text{
                            span.delete{
                                width: 23%!important;
                            }
                        }
                    }
                }
                
            }
            .center_file_pay_methods{
                margin-top: 1.5rem /* 30/20 */;
                // width: 60rem /* 1200/20 */;
                height: 12.6rem /* 252/20 */;
                height: 15.6rem /* 252/20 */;
                // background:rgba(254,254,254,1);
                .pay_methods_header{
                    background:rgba(254,254,254,1);
                    border-bottom: 1px solid rgba(230,230,230,1);
                    height: 2.5rem /* 50/20 */;
                    text-align: left;
                    padding-left: 1.3rem /* 40/20 */;
                    line-height: 2.5rem /* 50/20 */;
                    color:rgba(255,255,255,1);
                    h3{
                        display: inline-block;
                        font-size:1rem;
                        font-weight:800;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        font-size: .8rem;
                        margin-left: .5rem /* 10/20 */;
                        color:rgba(102,102,102,1);
                    }
                    span.en{
                        font-size: .7rem /* 14/20 */;
                    }
                    
                }
                .pay_methods_none{
                    line-height: 10.1rem /* 202/20 */;
                    position: relative;
                    p{
                        font-size:.8rem /* 16/20 */;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:1.5rem /* 30/20 */;
                    }
                    .addPaymentMethodClassInfo{
                        position: absolute;
                        top: 50%;
                        top: 70%;
                        left: 50%;
                        transform: translateY(-2.75rem /* 55/20 */) translateX(-50%);
                    }
                    .addPaymentMethodClass{
                        display: inline-block;
                        width:10.75rem /* 215/20 */;
                        height:2rem /* 40/20 */;
                        line-height: 2rem /* 40/20 */;
                        
                        color: #4C6085;
                        border-radius:1rem /* 20/20 */;
                        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .5rem /* 10/20 */ #ccc;
                        cursor: pointer;
                    }
                    .addPaymentMethodClass:hover{
                        // background:rgba(68,94,147,1);
                        // color:rgba(255,255,255,1);
                        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ 1rem /* 10/20 */ #ccc;
                    }
                }
                @media screen and(max-width: 480px) {
                    .pay_methods_header{
                        padding-left: 1rem;
                        span{
                            font-size: .6rem /* 12/20 */;
                        }
                    }
                }
                .pay_methods_have{
                    padding-top: .25rem /* 5/20 */;
                    li{
                        height: 2rem;
                        list-style: none;
                        line-height:  2rem /* 40/20 */;
                        border-bottom: .05rem /* 1/20 */ solid rgba(230,230,230,1);
                        span{
                            display: inline-block;
                            // width: 34%;
                            text-align: left;
                            // height: 2rem /* 40/20 */;
                            // line-height:  2rem /* 40/20 */;
                        }
                        .span_center{
                            padding-left: 8rem /* 40/20 */;
                            box-sizing: border-box;
                        }
                        .span_text{
                            text-align: right;
                            cursor: pointer;
                            color:rgba(92,154,204,1);
                            
                        }
                        .color_text{
                            color:rgba(51,51,51,1);
                        }
                    }
                    .li_body{
                        font-size:.8rem /* 16/20 */;
                        font-family:'PingFang-SC-Regular';
                        text-align: left;
                        span{
                            .p-d{
                                display: inline-block; 
                                width:12rem;
                            }
                        }
                        p{
                            div{
                                span.el-switch.is-checked.el-switch__core{
                                    background-color:rgba(76,96,133,1);
                            border-color:rgba(76,96,133,1);
                            margin-right:2rem;
                                }   
                            }
                        }
                        .el-switch.is-checked.el-switch__core{
                            background-color:rgba(76,96,133,1);
                            border-color:rgba(76,96,133,1);
                            margin-right:2rem;
                        }
                    }
                    padding-left: 1.3rem /* 40/20 */;
                    padding-right: 1.3rem /* 40/20 */;
                    box-sizing: border-box;
                    .addPaymentMethodClassHave{
                        margin-top: 1rem /* 20/20 */;
                        // font-size:.8rem /* 16/20 */;
                        // font-family:'PingFang-SC-Regular';
                        // font-weight:400;
                        // color:#5c89cc!important;
                        // width: 6.5rem /* 130/20 */;
                        // cursor: pointer;
                        // text-align: left;
                        // line-height: .8rem /* 16/20 */;
                        width:55rem;
                        height:2.3rem;
                        background:rgba(237,239,243,1);
                        border-radius:.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color:#4C6085;
                        font-size: .8rem;
                        transition: all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
                        img{
                            width: 1.3rem;
                            height: 1.3rem;
                            margin-right: .5rem;
                            transition: all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
                        }
                        cursor: pointer;
                    }
                    .addPaymentMethodClassHave:hover{
                        background: rgba(76, 96, 133, .2);
                        box-shadow: 0 10px 20px rgba(230,230,230,1);
                        img{
                            transform: scale(1.2);
                        }
                    }
                    @media screen and(max-width: 480px) {
                        .li_body{
                            span{
                                .p-d{
                                    display: inline-block; 
                                }
                                #uu-name{
                                    display: none;
                                }
                            }
                            p{
                                div{
                                    margin-right: 0;
                                }
                            }
                        }
                        .li_head {
                            span{
                                #uu-name-h{
                                    display: none;
                                }
                            }
                        }
                        .addPaymentMethodClassHave{
                            width:7.5rem;
                        }
                    }
                    
                }
                .pay_methods_body{
                    // width: 60rem /* 1200/20 */;
                    height: 10.1rem /* 202/20 */;
                    height: 13.1rem /* 202/20 */;
                    height: 14.1rem /* 202/20 */;
                    background:rgba(242,242,242,1);
                    background:rgba(254,254,254,1);
                    text-align: center;
                    // .li_head{
                    //     display: flex;
                    //     justify-content: space-between;
                    //     .h_flex{
                    //         flex: 1;
                    //     }
                        
                    //     .h_flex1{
                    //         flex: 1;
                    //     }
                    //     .h_flex2{
                    //         flex: 2;
                    //     }
                    // }
                    // .li_body{
                    //     display: flex;
                    //     justify-content: space-between;
                    //     .h_flex{
                    //         flex: 1;
                    //     }
                    //     .h_flex1{
                    //         flex: 1;
                    //         img{
                    //             width: 1.5rem /* 30/20 */;
                    //             height: 1.5rem;
                    //             border-radius: .75rem /* 15/20 */;
                    //             background: gray;
                    //         }
                    //     }
                    //     .h_flex2{
                    //         flex: 2;
                    //         display: flex;
                    //         align-items: center;
                    //         img{
                    //             margin-right:.2rem;
                    //             width: 1.3rem /* 30/20 */;
                    //             height: 1.3rem;
                    //             border-radius: .65rem /* 15/20 */;
                    //             background: gray;
                    //         }
                    //     }
                    // }
                    .li_item{
                        display: flex;
                        justify-content: space-between;
                        height: 2.5rem;
                        color:rgba(102,102,102,1);
                        font-size: .8rem;
                        .icon{
                            flex:1.3;
                            flex:1.8;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            img{
                                width: 1.3rem;
                                height: 1.3rem;
                                margin-right: .5rem;
                            }
                        }
                        .account_info{
                            flex:3;
                            flex:5;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .sp1{
                                // flex:1.4;
                                margin-right: 1rem;
                            }
                            .sp2{
                                // flex:.7;
                                margin-right: 1rem;
                            }
                            .sp3{
                                // flex:3;
                            }
                        }
                        .operate{
                            flex:1;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            .delete{
                                margin-left: .5rem;
                                cursor: pointer;
                                img{
                                    vertical-align: sub;
                                }
                            }
                        }
                        p{
                            div{
                                span.el-switch.is-checked.el-switch__core{
                                    background-color:rgba(76,96,133,1);
                            border-color:rgba(76,96,133,1);
                            margin-right:2rem;
                                }   
                            }
                        }
                        .el-switch.is-checked.el-switch__core{
                            background-color:rgba(76,96,133,1);
                            border-color:rgba(76,96,133,1);
                            margin-right:2rem;
                        }
                    }
                }
            }
            .center_file_looger{
                box-sizing: border-box;
                margin-top: 2.2rem /* 30/20 */;
                margin-bottom: 1rem /* 20/20 */;
                background:rgba(254,254,254,1);
                h3{
                    padding-left: 1.3rem /* 40/20 */;
                    padding-right: 1.3rem /* 40/20 */;
                    height: 2.5rem /* 50/20 */;
                    font-size:1rem /* 18/20 */;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    line-height:2.5rem /* 50/20 */;
                    border-bottom: .05rem /* 1/20 */ solid rgba(242,242,242,1);
                    text-align: left;
                }
                li{
                    padding-left: 1.3rem /* 40/20 */;
                    padding-right: 1.3rem /* 40/20 */;
                    list-style: none;
                    height: 2.25rem /* 45/20 */;
                    line-height: 2.25rem;
                    display: flex;
                    span{
                        display: inline-block;
                        // width: 33.3%;
                        font-size:.7rem /* 14/20 */;
                        font-family:PingFang-SC-Regular;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                    }
                    border-bottom:1px solid rgba(230,230,230,1);
                }
                
                li:nth-child(odd){
                    // background:rgba(242,242,242,1);
                }
                li:nth-child(even){

                }
                .li-head{
                    // background:rgba(230,230,230,1);
                }
                .logger_left{
                    flex:1.4;
                    display: flex;
                    justify-content: flex-start;
                }
                .logger_center{
                    display: flex;
                    justify-content: flex-start;
                    flex:1;
                }
                .logger_end{
                    display: flex;
                    justify-content: flex-end;
                    flex:1;
                }
            }
        }
        // 专门替 personal-box-bodyy 占位
        .personal-box-body-static{
            width: 100%;
            height: 48rem /* 960/20 */;
            height: 56rem /* 960/20 */;
            background: #e6e6e6;;
        }
    }
    // 
    .box_info_center{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width:24rem /* 480/20 */;
        height:10rem /* 200/20 */;
        background:rgba(255,255,255,1);
        border-radius:.25rem /* 5/20 */;
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);
        box-sizing: border-box;
        padding: 1.5rem /* 30/20 */ 1.5rem /* 30/20 */;
        padding-top: 1rem /* 20/20 */;
        text-align: left;
        font-size:.7rem /* 14/20 */;
        font-family:'PingFang-SC-Regular';
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:1.5rem /* 30/20 */;
        transition: box-shadow 0.4s ease-in-out;
        z-index: 60;
        .close{
            position: absolute;
            top: .25rem /* 5/20 */;
            right: .4rem /* 8/20 */;
            cursor: pointer;
            
        }
        i{
            color: red;
        }
    }
    .box_info_center:hover{
        transform: 8s;
        box-shadow:0rem /* 0/20 */ .5rem /* 0/20 */ 1.5rem /* 13/20 */ rgba(153,153,153,1);
    }
    // 
    // 弹出选择身份认证
    .id_select_box{
        width:20.5rem /* 410/20 */;
        height:12rem /* 240/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ 5rem /* 0/20 */ rgba(153,153,153,1);
        border-radius:.15rem /* 3/20 */;
        position: fixed;
        z-index: 50;
        top: 50%;
        left:50%;
        transform:  translateX(-50%) translateY(-50%);
        i{
            position: absolute;
            top: .25rem /* 5/20 */;
            right: .4rem /* 8/20 */;
            cursor: pointer;
        }
        // padding:4.75rem /* 195/20 */ 2.5rem /* 50/20 */;
        padding: 1.75rem 1.5rem;
        box-sizing: border-box;
        div{
            display: flex;
            justify-content: space-between;
        }
        div p{
            flex:1;
            // width: 15rem /* 300/20 */;
            // height: 1rem /* 20/20 */;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img{
                width: 7rem;
                height: 7rem;
                box-sizing: border-box;
                padding: 2rem;
                background:rgba(230,230,230,1);
            }
            span{
                display: inline-block;
                width:7rem /* 140/20 */;
                // height:2rem /* 40/20 */;
                // background:rgba(230,230,230,1);
                // background:rgba(92,154,204,1);
                border-radius:.15rem /* 3/20 */;
                font-size:.8rem /* 16/20 */;
                font-family:'PingFang-SC-Regular';
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height: 2rem /* 40/20 */;
                cursor: pointer;
                text-align: center;
            }
            span.en{
                font-size: .7rem;
                line-height: 1rem;
            }
            .id_select_person{
                // background:rgba(230,230,230,1);
            }
            .id_select_company{
                // background:rgba(92,154,204,1);
                // color: white;
            }
            span:hover{
                // background:rgba(92,154,204,1);
                // color: white;
            }
        }
        p:hover{
            img{
                background:rgba(76,96,133,1);
                
            }
        }
    }
    @keyframes rightIn {
        from {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
        to {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
    }
    @keyframes rightOut {
        from {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
        to {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
    }
    // 
    .add_method{
        position: fixed;
        z-index: 10;
        top: 4rem /* 110/20 */;
        top: 50%;
        left: 50%;
        width: 22.5rem /* 450/20 */;
        // height: 36rem /* 720/20 */;
        transform: translateX(-50%) translateY(-50%);
        background:rgba(255,255,255,1);
        border-radius:.25rem /* 5/20 */;
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);
        padding-top: 1rem /* 20/20 */;
        padding-left: 2rem /* 40/20 */ ;
        padding-right: 1.5rem /* 30/20 */;
        padding-bottom: 1rem /* 20/20 */;
        box-sizing: border-box;
        z-index: 30;
        .add_header{
            h3{
                display: inline-block;
                float: left;
                font-weight: bold;
            }
            span{
                float: right;
                cursor: pointer;
                transform:  rotate(0deg);
                transition-duration:.2S;
            }
            span:hover{
                transform:  rotate(180deg);
                transition-duration:.2S;
            }
        }
        .add_form{
            margin-top: 1rem /* 20/20 */;
            text-align: left;
            font-size:.7rem /* 14/20 */;
            font-family:'PingFang-SC-Regular';
            font-weight:400;
            color:rgba(102,102,102,1);
            position: relative;
            p{
                margin-top: .75rem /* 15/20 */;
                margin-bottom: .5rem /* 10/20 */;
                text-align: left;
            }
            .el-select{
                box-sizing: border-box;
                text-align: left;
                width: 19rem /* 380/20 */;
                height: 2rem /* 40/20 */;
            }
            .el-input.is-disabled{
                text-align: left!important;
                height: 2rem /* 40/20 */;
            }
            .el-input__inner{
                text-align: left!important;
                border:1px solid rgba(204,204,204,1);
            }
            span{
                display: inline-block;
                // width: 19rem /* 380/20 */;
                // height:1.5rem /* 30/20 */;
                // background:rgba(255,211,217,1);
                // line-height: 1.5rem /* 30/20 */;
                // margin-top: .5rem /* 10/20 */;
                text-align: center;
            }
            .outer{
                height: 4rem /* 80/20 */;
                img{
                    display: inline-block;
                    width: 4rem /* 50/20 */;
                    height: 4rem /* 50/20 */;
                }
            }
        }
        @media screen and(max-width: 480px) {
            .add_form{
                p{
                    margin-top:1.75rem;
                }
            }
        }
        .add_button{
            margin-top: 1rem /* 20/20 */;
            .button_cancle{
                display: inline-block;
                width:5.5rem /* 110/20 */;
                height:2rem /* 40/20 */;
                background:rgba(230,230,230,1);
                border-radius:.25rem /* 5/20 */;
                line-height: 2rem /* 40/20 */;
                cursor: pointer;
                color:rgba(51,51,51,1);
                font-size:.8rem /* 16/20 */;
                font-weight:400;
                text-align: center;
            }
            .button_confirm{
                display: inline-block;
                text-align: center;
                background:#4c6085;
                width:5.5rem /* 110/20 */;
                height:2rem /* 40/20 */;
                border-radius:.25rem /* 5/20 */;
                line-height: 2rem /* 40/20 */;
                cursor: pointer;
                color:rgba(255,255,255,1);
                font-size:.8rem /* 16/20 */;
                font-weight:400;
            }
        }
    }
    @keyframes rightIn {
        from {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
        to {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
    }
    @keyframes rightOut {
        from {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
        to {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
    }
    .box_info_close{
        animation: rightOut 1s;
    }
    .box_info_open{
        animation: rightIn 1s;
    }
}
.height_set1{
    height: 19rem!important;
}
.height_set_child1{
    height: 17rem!important;
}
.height_set2{
    height: 20rem!important;
}
.height_set_child2{
    height: 19rem!important;
}
.height_set3{
    height: 23rem!important;
}
.height_set_child3{
    height: 21rem!important;
}
.height_set4{
    height: 25rem!important;
}
.height_set_child4{
    height: 24rem!important;
}
.height_set5{
    height: 27rem!important;
}
.height_set_child5{
    height: 26rem!important;
}
.height_set6{
    height: 29rem!important;
}
.height_set_child6{
    height: 28rem!important;
}
.height_set7{
    height: 31rem!important;
}
.height_set_child7{
    height: 30rem!important;
}
.height_set8{
    height: 33rem!important;
}
.height_set_child8{
    height: 30rem!important;
}
// 
.box_height1{
        height:5rem /* 200/20 */!important;
    }
    .box_height2{
        height: 8rem!important;
    }
    .box_height3{
        height:10rem /* 200/20 */!important;
    }
</style>
