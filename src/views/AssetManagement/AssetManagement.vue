<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @LastEditors: mawei
 * @Since: 2019-04-14 13:30:14
 * @LastEditTime: 2019-06-26 16:40:52
 -->
<template>
    <div class="asste-management">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="asste-management-box">
            <div class="asste-management-box-img"> </div>
            <div class="banxin">
                <div class="asste-management-body">
                    <div class="asset-manage-nac outer">
                        <div class="left">{{$t('asset_manage.title')}}：{{totalUsd}} USDT</div>
                        <div class="right">
                            <span @click="$router.push('/asset-operation-record')">{{$t('asset_manage.nav_record')}}</span>
                            <span class="oo" @click="$router.push('/coin-address-manage')">{{$t('asset_manage.nav_address')}}</span>
                        </div>
                    </div>
                    <div class="table-asset-manage">
                        <el-table
                            :data="tableData"
                            :row-class-name="tableRowClassName"
                            header-cell-class-name="head_tab_cell"
                            style="width: 100%">
                            <el-table-column
                            :label="$t('asset_manage.coin')"
                            >
                            <template slot-scope="scope">
                                <span style="">{{ (scope.row.coinType).toUpperCase() }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('asset_manage.available')"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.available }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('asset_manage.frozen')"
                            >
                            <template slot-scope="scope">
                                
                                <p>{{ scope.row.freeze }}</p>
                                
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('asset_manage.lump_sum')"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.valuation }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column :min-width="min_width" :label="$t('asset_manage.control')">
                                <template slot-scope="scope">
                                    <div class="bt">
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        class="button-color"
                                        @click="handleEditCb(scope.$index, scope.row)">{{$t('asset_manage.deposit')}}</el-button>
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        class="button-color"
                                        @click="handleEditTb(scope.$index, scope.row)">{{$t('asset_manage.withdraw')}}</el-button>
                                        <!-- v-show="$store.getters.role=='1'" -->
                                        <el-button
                                        v-show="$store.getters.user_info.isMerchant=='1' || $store.getters.user_info.isCoiner=='1'"
                                        size="mini"
                                        class="button-color new_color"
                                        style=""
                                        @click="handleEditTransfer(scope.$index, scope.row)">{{$t('asset_manage.transfer')}}</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="asste-management-body-static"></div>
        </div>
        <!-- 充bi -->
        <div class="mention-coin-box" v-show=" mentionCoinStatus">
            <i class="el-icon-close i-psan right" @click="mentionCoinStatus=false"></i>
            <div class="iner">
                <h3>{{$t('asset_manage.deposit')}}</h3>
                <span v-show="this.saveRow.coinTypeId=='2'" style="color:rgba(102, 102, 102, 1);font-size:.7rem;">{{$t('asset_manage.lian_name')}}</span>
                <div  class="lian" v-show="this.saveRow.coinTypeId=='2'">
                    <el-radio-group v-model="chain">
                        <el-radio-button label="OMNI"></el-radio-button>
                        <el-radio-button label="ERC20"></el-radio-button>
                    </el-radio-group>
                </div>
                <span style="color:rgba(102, 102, 102, 1);font-size:.7rem;">{{$t('asset_manage.deposit_address')}}</span>
                <div class="chargeMoneyText">
                    <span style="color:rgba(51, 51, 51, 1);font-size:1.1rem;">{{tibiAddress}}</span><span class="tag-read" style="cursor: pointer;margin:0 .5rem; color: rgba(92, 137, 204, 1);" :data-clipboard-text="(tibiAddress)" @click="copyAddressFun()">{{$t('info_item.copy')}}</span><span style="color:rgba(92, 137, 204, 1);" class="qrCode-address" @mouseover="qrCodeFun(saveRow.qrcode)" @mouseout="qrStatus=''"><img class="qrCode-address-img" :src="'http://qr.liantu.com/api.php?text='+tibiAddress+''" alt=""> {{$t('info_item.qrcode')}}</span><br>
                    <span>{{$t('asset_manage.view')}}<i @click="go_money" style="margin:0 .5rem;">{{$t('asset_manage.deposit_history')}}</i>{{$t('asset_manage.deposit_status')}}</span><br>
                    <span style="margin-top:1rem">{{$t('asset_manage.dh')}}</span><br>
                    <ul v-show="saveRow.coinTypeId == '2'">
                        <!-- <li>·请勿向上述地址充值任何非{{saveRow.coinType}}资产，否则资产将不可找回。</li>
                        <li>·您充值上述地址后，需要整个网络节点的确认，6次网络确认后到账。</li>
                        <li>·最小充值金额：{{depositMinLimit}} {{saveRow.coinType}}，小于最小金额的充值将不会上账且无法退回。</li>
                        <li>·您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</li>
                        <li>·请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li> -->
                        <li>· {{$t('asset_manage.dp1_usdt')}}</li>
                        <li>· {{$t('asset_manage.dp2_usdt')}}</li>
                        <li>· {{$t('asset_manage.dp3_usdt')}}</li>
                        <li>· {{$t('asset_manage.dp4_usdt')}}</li>
                        <li>· {{$t('asset_manage.dp5_usdt')}}</li>
                    </ul>
                    <ul v-show="saveRow.coinTypeId == '1'">
                        <!-- <li>·请勿向上述地址充值任何非 {{saveRow.coinType}} 资产，否则资产将不可找回。</li>
                        <li>·您充值上述地址后，需要整个网络节点的确认，6次网络确认后到账。</li>
                        <li>·最小充值金额：{{depositMinLimit}} {{saveRow.coinType}}，小于最小金额的充值将不会上账且无法退回。</li>
                        <li>·您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</li>
                        <li>·请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li> -->
                        <li>· {{$t('asset_manage.dp1_btc')}}</li>
                        <li>· {{$t('asset_manage.dp2_btc')}}</li>
                        <li>· {{$t('asset_manage.dp3_btc')}}</li>
                        <li>· {{$t('asset_manage.dp4_btc')}}</li>
                        <li>· {{$t('asset_manage.dp5_btc')}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 提币币 -->
        <div class="charge-coin-box" v-show="chargeCoinStatus">
            <i class="el-icon-close hove right" 
            @click="chargeCoinStatus=false;info_pop=false;address_widthdraw='';widthdraw_amount='';widthdraw_real_amount='';widthdraw_service='';"></i>
            <div class="iner">
               <h3>{{$t('asset_manage.withdraw')}}</h3>
               <span v-show="this.saveRow.coinTypeId=='2'" style="color:rgba(102, 102, 102, 1);font-size:.7rem;">{{$t('asset_manage.lian_name')}}</span>
                <div v-show="this.saveRow.coinTypeId=='2'" class="lian">
                    <el-radio-group v-model="chain2">
                        <el-radio-button label="OMNI"></el-radio-button>
                        <el-radio-button label="ERC20"></el-radio-button>
                    </el-radio-group>
                </div>
               <div class="outer">
                   <div class="one_p">
                       <span>{{$t('asset_manage.withdraw_address')}}</span>
                       <el-select
                         filterable
                         allow-create
                         clear="ul_tb"
                         v-model="address_widthdraw" :placeholder="$t('asset_manage.w_placeholder')">
                            <el-option
                            v-for="item in (saveRow.newAddress)"
                            class="li_tb"
                            :key="item.id"
                            :label="item.extractAddress"
                            :value="item.extractAddress">
                                <div style="display:flex;flex-direction:colum;">
                                    <div class="li_tb_top">
                                        <span>{{item.extractAddress}}</span>
                                        <p>
                                            <span>{{saveRow.coinType.toUpperCase()}}</span><span class="chain_li" >{{chain2}}</span>
                                        </p>
                                    </div>
                                    <div class="li_tb_bottom">
                                        {{item.remark}}
                                    </div>
                                </div>
                            </el-option>
                        </el-select>
                   </div>
                   <div class="outer">
                        <div class="left">
                            <div class="one outer">
                                <span class="left outer">{{$t('asset_manage.withdraw_amount')}}</span>
                                <!-- <span class="right">限额：<i >1500000</i></span> -->
                                <span class="right">{{$t('asset_manage.available')}}：<i style="color:rgba(92, 137, 204, 1);">{{saveRow.available}}</i></span>
                                <p>
                                    <!-- <input type="text" placeholder="请输入要购买的金额"> -->
                                    <input type="text" style="padding-right:2.5rem;" min=0 v-model="widthdraw_amount" @keyup="getCoinInfo(saveRow)"><i class="input_text_num" :data-info="saveRow.coinType">{{saveRow.coinType}}</i>
                                </p>
                            </div>
                            <div class="one outer">
                                <span class="left">{{$t('asset_manage.receive')}}</span>
                                <p>
                                    <!-- <input type="text" placeholder="请输入要购买的金额"> -->
                                    <input disabled type="text" min=0 class="input_text" v-model="widthdraw_real_amount"><i class="input_text" :data-info="saveRow.coinType">{{saveRow.coinType}}</i>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="one outer">
                                <span class="left">{{$t('asset_manage.fee')}}</span>
                                <!-- <span class="right">范围：<i>10000</i><i>-150000</i></span> -->
                                <p>
                                    <!-- <input type="text" > -->
                                    <input disabled type="text" min=0 class="input_text" v-model="widthdraw_service"><i class="input_text_te" :data-info="saveRow.coinType">{{saveRow.coinType}}</i>
                                </p>
                            </div>
                            <div class="one">
                                <span class="" style="width:100%;"> </span>
                                <p>
                                    <span class="button" :class="tiOk?'button_ok':'button_no'" @click="go_box1(saveRow)">{{$t('asset_manage.withdraw_butt')}}</span>
                                </p>
                            </div>
                        </div>
                   </div>
                   <div class="draw_list_left">
                       <ul>
                            <li>·{{$t('asset_manage.wp1_usdt')}}：{{extractMin}} {{saveRow.coinType}}</li>
                            <li>·{{$t('asset_manage.wp2_usdt')}}：{{extractMax}} {{saveRow.coinType}}</li>
                            <li>·{{$t('asset_manage.wp3_usdt1')}}{{reviewAmount}} {{saveRow.coinType}}{{$t('asset_manage.wp3_usdt2')}}</li>
                            <li>·{{$t('asset_manage.wp4_usdt')}}</li>
                            <!-- <li>·{{$t('asset_manage.wp5_usdt')}}</li> -->
                        </ul>
                   </div>
               </div>
            </div>
        </div>
        <!-- 划转 -->
        <div class="transfer-box outer" v-show="transferStatus">
            <i class="el-icon-close right" @click="transferStatus= false"></i>
            <div class="iner">
                <h3>{{$t('asset_manage.transfer')}}</h3>
                <div class="left">
                    <div class="one">
                        <!-- <span>币种</span> -->
                        <span>{{$t('asset_manage.username')}}</span>
                        <p>
                            <!-- <input type="text" v-model="saveRow.coinType" disabled> -->
                            <input type="text" v-model="transferUserName" @blur="getUser('username')" :placeholder="$t('asset_manage.t_placeholder_username')">
                        </p>
                    </div>
                    <!-- <div class="one outer">
                        <span class="left">转账数量</span><span class="right">限额：{{saveRow.freeze}}</span><span class="right">可用：<i style="color:rgba(92, 137, 204, 1);">{{saveRow.available}}</i></span>
                        <p>
                            <input type="text" placeholder="请输入转账数量" v-model="transferNum"
                            @blur="getTransferFee(saveRow.coinType,transferNum)"
                            ><i class="i-abs">{{saveRow.coinType}}</i>
                        </p>
                    </div>
                    <div class="one">
                        <span class="">资金密码</span>
                        <p>
                            <input type="password" placeholder="请输入资金密码" v-model="salary_pass">
                        </p>
                    </div> -->
                </div>
                <div class="right">
                    <div class="one">
                        <!-- <span>用户ID</span> -->
                        <span>{{$t('asset_manage.account')}}</span>
                        <p>
                            <input type="text" :placeholder="$t('asset_manage.t_placeholder_account')" @blur="getUser('accountNumber')" v-model="transferId">
                        </p>
                    </div>
                    <!-- <div class="one">
                        <span>手续费</span>
                        <p>
                            <input type="text" placeholder="" disabled v-model="transferFee"><i class="i-abs">{{saveRow.coinType}}</i>
                        </p>
                    </div>
                    <div class="one">
                        <span class="info"></span>
                        <p>
                            <span class="button" @click="confirmTransfer">确认</span>
                        </p>
                    </div> -->
                </div>
                <div class="center">
                    <div class="one outer">
                        <span class="left">{{$t('asset_manage.transfer_amount')}}</span><span class="right" v-show="false">限额：{{saveRow.transferInnerMax}}</span><span class="right">{{$t('asset_manage.available')}}：<i style="color:rgba(92, 137, 204, 1);">{{saveRow.available}}</i></span>
                        <p>
                            <input type="text" :placeholder="$t('asset_manage.t_placeholder_amount')" v-model="transferNum" id="oneHH"
                            @keyup="getTransferFee(saveRow.coinType,transferNum)"
                            ><i class="i-abs">{{saveRow.coinType}}</i><i class="i-fee">{{$t('asset_manage.fee')}}：{{transferFee}} {{saveRow.coinType}}</i>
                        </p>
                    </div>
                </div>
                <div class="left" style="">
                    <div class="one">
                        <span class="">{{$t('asset_manage.cash_pass')}}</span>
                        <p>
                            <input type="password" :placeholder="$t('asset_manage.t_placeholder_pass')" v-model="salary_pass">
                        </p>
                    </div>
                </div>
                <div class="right" style="">
                    <div class="one">
                        <span class="info"></span>
                        <p>
                            <span class="button" @click="confirmTransfer">{{$t('asset_manage.confirm')}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="top_box1" v-show="top_box1">
            <i class="el-icon-close" @click="top_box1=false"></i>
            <span>{{$t('asset_manage.input_cash_pass')}}</span><br>
            <input class="top_email_box_input _top_one" type="password" v-model="salary_pass" @focus="box1_info = false"><br>
            <b v-show="box1_info" style="color:red;" class="el-icon-warning">{{salary_pass == '' ? $t('info_item.fund_pass_null'):$t('info_item.fund_pass_error')}}</b>
            <p class="outer"><span @click="go_box2" class="submit_end left">{{this.$t('info_item.confirm')}}</span><span @click="top_box1=false" class="cancel_end right" >{{this.$t('info_item.cancle')}}</span></p>
            
        </div>
        <div class="top_box2" v-show="top_box2" :class="height_reset">
            <i class="el-icon-close right" @click="top_box2=false"></i>
            <span v-show="(user_info.phone==null?false:true)">{{$t('info_item.phone')}}</span><br>
            <input v-show="(user_info.phone==null?false:true)" class="top_email_box_input _top_one" type="text" disabled v-model="phone"><br>
            <span v-show="(user_info.phone==null?false:true)">{{$t('info_item.phone_code')}}</span><br>
            <input v-show="(user_info.phone==null?false:true)" @focus="submit_info = false" class="top_email_box_input _top_input_one" type="text" v-model="phone_code_two"><input v-show="user_info.phoneAuthStatus=='1'?false:(user_info.phone==null?false:true)"  @click="sendPhone" class="top_email_box_input _top_input_two" type="button" v-model="send_phone">
            <!--  -->
            <span v-show="(user_info.email==null?false:true)">{{$t('info_item.email')}}</span><br>
            <input v-show="(user_info.email==null?false:true)" class="top_email_box_input _top_one" type="text" disabled v-model="email"><br>
            <span v-show="(user_info.email==null?false:true)">{{$t('info_item.email_code')}}</span><br>
            <input v-show="(user_info.email==null?false:true)" @focus="submit_info = false" class="top_email_box_input _top_input_one" type="text" v-model="email_code_two"><input v-show="user_info.emailAuthStatus=='1'?false:(user_info.email==null?false:true)" @click="sendEmail_two" class="top_email_box_input _top_input_two" type="button" v-model="send_two">
            <!--  -->
            <span v-show="user_info.googleAuthTag =='0'?false:true">{{$t('info_item.google_code')}}</span><br>
            <input v-show="user_info.googleAuthTag =='0'?false:true" @focus="submit_info = false" class="top_email_box_input _top_one" placeholder="请输入谷歌验证码" type="text"  v-model="google_code">
            <p v-show="submit_info" style="margin-top:0;color:red;">{{$t('info_item.input_all')}}</p>
            <p class="outer"><span @click="submit_end" class="submit_end left">{{$t('info_item.confirm')}}</span><span @click="top_box2=false" class="cancel_end right" >{{$t('info_item.cancle')}}</span></p>
        </div>
        <!-- 提币拦截 -->
        <pop-authen v-if="hackReset" :childProp="childP"></pop-authen>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import qs from 'qs'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import PopAuthen from '../../components/PopupsAuthen.vue'
import {transferFeeFun,transferFun,
GetOtherInformation,getExtractAndDepositLimitFun } from '../../assets/js/api'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'pop-authen':PopAuthen,
    },
    data() {
        return {
            chain:'OMNI',
            chain2:"OMNI",
            childP:'liangxiang',
            legalSet:'legal-currency',
            tableData:[],
            totalUsd:'',
            mentionCoinStatus:false,
            chargeCoinStatus:false,
            transferStatus:false,
            saveRow:{
                extractAddresses:{
                    id:'',
                    extractAddress:''
                },
            },
            tibiAddress:'',
            reg:/^((([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
            /**
             * 提币相关
             */
            extractMax:'',
            extractMin:'',
            depositMinLimit:'',
            reviewAmount:'',
            address_widthdraw:'',//提笔地址
            widthdraw_amount:'',//数量
            widthdraw_service:'',//手续费
            widthdraw_real_amount:'',//到账数量
            /**
             * box
             */
            box_info:!(this.$store.getters.user_info.googleAuthTag == '1' && this.$store.getters.user_info.identityAuthStatus=='2' && this.$store.getters.user_info.ifPayPassword=='1'),
            top_box1:false,
            top_box2:false,
            num:0,
            salary_pass:'',
             height_reset:'',
            phone_code_two:'',
            email_code_two:'',
            google_code:'',
            can_send_phone:true,
            can_send_email:true,
            submit_info:false,//提示信息
            send_phone:"",
            send_two:"",
            box1_info:false,
            box_info_height:'',
            // 
            transferNum:'0',
            transferId:'',
            transferFee:'',
            transferUserName:'',
            // 
            hackReset:false, //强刷新 组件
            num:0,
            box_info_pop:false,
            min_width:'',
            checkAddMethod:false,
            oldAddress:[],
        }
    },
    watch:{
        transferNum(o,n){
            console.log(o,'n',n)
        },
        lang(){
            this.send_phone=this.$t('info_item.get_code')
            this.send_two=this.$t('info_item.get_code')
        },
        chain(o,n) {
            this.tibiAddress='';
            let t = setTimeout(()=>{
                this.handleEditCb(1,this.saveRow)
                clearTimeout(t)
            },200)
        },
        chain2(o,n) {
            function isOne(el,index,arr) {
                return el.type== (o=="OMNI"?0:1)
            }
            let ar = this.saveRow.extractAddresses.filter(isOne)
            // console.log(this.saveRow,ar)
            this.saveRow.newAddress = ar;
            let t = setTimeout(async()=>{
            // console.log(this.saveRow)
                // this.handleEditTb(1,this.saveRow)
                let item ={}
                if(this.saveRow.coinTypeId=='2'){//usdt 变化
                    if(this.chain2=='OMNI') {
                        item['coinTypeId']= this.saveRow.coinTypeId
                    }else{
                        item['coinTypeId']= 3
                    }
                }else{
                    item['coinTypeId']= this.saveRow.coinTypeId
                }
                let key =await getExtractAndDepositLimitFun(this,item)
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    this.depositMinLimit = key.depositMinLimit
                    this.extractMax = key.extractMax;
                    this.extractMin = key.extractMin;
                    this.reviewAmount = key.reviewAmount;
                    console.log(key)
                }
                clearTimeout(t)
            },200)
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
        tiOk() {
            if(this.address_widthdraw!='' && this.widthdraw_amount != '' && (this.widthdraw_amount > this.extractMin) && (this.widthdraw_amount < this.extractMax)){
                return true
            }else{
                return false
            }
        },
        user_info(){
            return this.$store.getters.user_info;
        },
        phone(){
            return this.$store.getters.user_info.phoneAreaCode+','+this.$store.getters.user_info.phone;
        },
        email(){
            return this.$store.getters.user_info.email;
        }
    },
    created(){
        this.send_phone=this.$t('info_item.get_code')
        this.send_two=this.$t('info_item.get_code')
        this.initAsset()
        let clientWidth = document.documentElement.clientWidth;
        if(clientWidth<480) {
            this.min_width='211'
        }else{
            this.min_width=''
        }
    },
    methods:{
        /**
         * 获取用户信息
         */
        async getUser(str){
            let item = {};
            if(str=='username'){
                item['username'] = this.transferUserName
            }else{
                item['accountNumber'] = this.transferId
            }
            let key =await GetOtherInformation(this,item)
            .then((res) =>{
                return res;
            })
            if(key!=false) {
                if(str=='username'){
                    this.transferId = key.accountNumber
                    // item['username'] = this.transferUserName
                }else{
                    this.transferUserName = key.username
                    // item['accountNumber'] = this.transferId
                }
            }
        },
        /**
         * 提交划转
         */
        confirmTransfer(){
            if(this.transferNum=='' || this.salary_pass =='' || this.transferUserName==''){
                this.$message({
                    type:'error',
                    message:this.$t('info_item.input_all'),
                    duration:1200,
                })
                return false;
            }
            let item = {
                amount:this.transferNum,
                coinTypeId:this.saveRow.coinTypeId,
                payPassword:this.salary_pass,
                toAccount:this.transferId,
                toUsername:this.transferUserName,
            }
            this.transfer(item)
        },
        async transfer(item){
            let key =await transferFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false){
                this.initAsset()
                this.$message({
                    type:'success',
                    message:this.$t('asset_manage.transfer_ok'),
                    duration:1000,
                })
                this.transferStatus = false;
            }else{

            }
        },
        /**
         * 获取划转手续费
         */
        async getTransferFee(coinType,num){
            if(this.transferUserName==''){
                this.$message({
                    type:'info',
                    message:this.$t('asset_manage.username_first'),
                    duration:1200,
                })
                this.transferNum = 0;
                return false;
            }
            let key =await transferFeeFun(this,{
                amount:num,
                coinTypeId:this.saveRow.coinTypeId,
                toUsername:this.transferUserName
            })
            if(key!=false) {
                this.transferFee = key.handingFee;
            }
        },
        /**
         * 初始化表格
         */
        initAsset(){
            this.axios.post('/assets/getAssets')
            .then((res) => {
                let data = res.data;
                if(data.code ==200) {
                    this.tableData = data.data.infos;
                    this.totalUsd = data.data.totalUsd
                }else{

                }
            }).catch((error) => {
                
            })
        },
        /**
         * 斑马纹
         */
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 == 1) {
                return 'warning-row';
            } else{
                return 'success-row';
            }
        },
        /**
         * 触发充币
         */
        async handleEditCb(n,row) {
            this.saveRow = row;
            this.mentionCoinStatus = true;
            this.chargeCoinStatus = false
            this.transferStatus = false
            let item= {}
            console.log(row.coinTypeId,this.chain)
            if(row.coinTypeId=='2'){//usdt 变化
                if(this.chain=='OMNI') {
                    item['coinTypeId']= row.coinTypeId
                }else{
                    item['coinTypeId']= 3
                }
            }else{
                item['coinTypeId']= row.coinTypeId
            }
            
            this.getBiAddress(item)
            let key =await getExtractAndDepositLimitFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                this.depositMinLimit = key.depositMinLimit
                this.extractMax = key.extractMax;
                this.extractMin = key.extractMin;
                this.reviewAmount = key.reviewAmount;
                console.log(key)
            }
        },
        /**
         * 查看充币记录
         */
        go_money(){
            this.$router.push('/asset-operation-record')
        },
        /**
         * 触发提币
         */
        async handleEditTb(n,row) {
            this.saveRow = row;
            let that = this;
            function isOne(el,index,arr) {
                return el.type== (that.chain2=="OMNI"?0:1)
            }
            let ar = this.saveRow.extractAddresses.filter(isOne)
            
            this.saveRow.newAddress = ar;
            this.oldAddress = row.extractAddresses;
            this.childP = 'liangxiang';
            this.hackReset = true;
            let num=0;
            // console.log('this.googleAccount:',this.googleAccount)
            if(this.user_info.email!=null){
                num++
            }
            if(this.user_info.phone!=null){
                num++
            }
            if(this.user_info.googleAuthTag=='1'){
                num++
            }
            console.log(num,'num个数')
            if(num<2){
                return false
            }
            this.mentionCoinStatus = false;
            this.transferStatus = false
            if(this.initBox()){
                this.chargeCoinStatus = false;
                
            }else{
                this.chargeCoinStatus = true;
            }
            // if(this.info_pop) {
            //     this.his.saveRow = row;
            //     this.chargeCoinStatus = false;
            // }else{
            //     this.saveRow = row;
            //     this.chargeCoinStatus = true;
            // }
            let item ={}
            if(row.coinTypeId=='2'){//usdt 变化
                if(this.chain2=='OMNI') {
                    item['coinTypeId']= row.coinTypeId
                }else{
                    item['coinTypeId']= 3
                }
            }else{
                item['coinTypeId']= row.coinTypeId
            }
            let key =await getExtractAndDepositLimitFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                this.depositMinLimit = key.depositMinLimit
                this.extractMax = key.extractMax;
                this.extractMin = key.extractMin;
                this.reviewAmount = key.reviewAmount;
                // console.log(key)
            }
            
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
            if(!this.user_info.googleAuthStatus =='0') {
                k+=1
            }
            if(this.checkAddMethod) {// 是不是添加付款方式
                if(this.num<2) {
                    this.box_info_pop = true;
                    // k+=1;
                }else{
                    this.box_info_pop = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
                }
            }else{
                this.box_info_pop = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
            }
            
            if(!this.$store.state.ifPayPassword =='1') {
                k+=1
            }
            if(k==1) {
            }else if(k ==2 ){
            }else if (k==3) {
            }else if (k ==0 ){
                this.box_info_pop  =false;
            }
            console.log(k,this.box_info_pop,'assetment:')
            return this.box_info_pop
        },
        /**
         * 触发划转
         */
        handleEditTransfer(n,row) {
            this.mentionCoinStatus = false;
            this.chargeCoinStatus = false
            if(this.user_info.ifPayPassword=='1'){
                this.saveRow = row;
                this.transferStatus = true;
            }else{
                this.childP = 'huazhuan'
                this.hackReset = true;
                
            }
            
        },
        /**
         * 获取充币地址
         */
        getBiAddress(item){
            this.axios.post('/wallet/getWalletDeposityAddress',qs.stringify(item))
            .then((res) => {
                let data  = res.data;
                if(data.code ==200) {
                    this.tibiAddress = data.message;
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:1200,
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 获取提币信息
         */
        getTbInfo(item){
            this.axios.post('/assetsExtractOrder/getExtractLimit',qs.stringify(item))
            .then((res) => {
                let data = res.data;
                if(data.code ==200) {
                    this.extractMax = data.data.extractMax;
                    this.extractMin = data.data.extractMin;
                    this.reviewAmount = data.data.reviewAmount;
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:1000,
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 
        qrCodeFun(path){
            // this.qrStatus = 'qrFalse'
            // this.toalQr = path;
        },
        /**
         * 赋值
         */
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
        /**
         * 计算
         */
        getCoinInfo(row) {
            if(!this.reg.test(this.widthdraw_amount)) {
                // this.amountUsd = '';
                // this.handingFree = '';
                this.widthdraw_service = '',
                this.widthdraw_real_amount = '',
                this.$message({
                    type:'error',
                    message:this.$t('info_item.format_error'),
                    duration:500,
                })
                return false;
            }
            this.axios.post('/assetsExtractOrder/getCalcHandingFee',qs.stringify({
                amount:this.widthdraw_amount,
                coinTypeId:row.coinTypeId,
            })).then((res) => {
                let data = res.data;
                if(data.code == 200 ) {
                    // this.widthdraw_real_amount = data.data.amountUsd;
                    this.widthdraw_real_amount = data.data.amountActual;
                    this.widthdraw_service = data.data.handingFree;
                    // this.handingFreeRate = data.data.handingFreeRate;
                    // this.amountActual = data.data.amountActual;
                }else{
                     this.$message({
                        type:'error',
                        message:data.message
                    })
                }
            }).catch((err) => {
                 this.$message({
                        type:'error',
                        // message:'获取费率和手续费失败'
                        message:this.$t('info_item.error')
                    })
            })
        },
        /**
         * 触发提币弹框
         */
        go_box1(row){
            if(this.address_widthdraw ==''){
                this.$message({
                    type:'error',
                    message:this.$t('asset_manage.w_placeholder')
                })
                return false;
            }
            if(this.widthdraw_amount>this.extractMax) {
                this.$message({
                    type:'error',
                    message:this.$t('info_item.un_available')
                })
                return false;
            }
            if(!this.tiOk) {
                this.$message({
                    type:'error',
                    message:this.$t('info_item.input_all')
                })
                return false;
            }
            this.top_box1 = true;
        },
        go_box2(){
            if(this.salary_pass != '') {
                this.axios.post('/user/checkPayPassword',qs.stringify({
                    payPassword:this.salary_pass
                })).then((res) => {
                    let data  = res.data;
                    if(data.code == 200 ) {
                        this.$message({
                            type:'success',
                            message:this.$t('info_item.succeed'),
                            duration:1200,
                        })
                        this.top_box1 =false;
                        this.top_box2 =true;
                    }else{
                        this.box1_info = true;
                        // this.$message({
                        //     type:'error',
                        //     message:'资金密码不能为空！',
                        //     duration:800,
                        // })
                    }
                }).catch((err) => {
                    this.$message({
                        type:'error',
                        message:this.$t('info_item.error'),
                        duration:1200,
                    })
                })
            }else{
                this.box1_info = true;
                this.$message({
                    type:'error',
                    message:this.$t('info_item.input_all'),
                    duration:1200,
                })
            }
        },
        sendPhone() {
            if(this.can_send_phone ) {
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:0,
                    behaviorType:7,
                    number:this.phone,
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            message: this.$t('info_item.send_code_ok'),
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                            message: this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                })
                this.can_send_phone = false
                let time = 60;
                let t = setInterval(()=>{
                    if(time == 0){
                    time = 60;
                    this.can_send_phone = true;
                    this.send_phone = this.$t('info_item.get_code')
                    clearInterval(t)
                    }else{
                    this.send_phone = --time + 's'
                    }
                },1000)
            }
        },
        sendEmail_two() {
            if(this.can_send_email ) {
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:1,
                    behaviorType:7,
                    number:this.email,
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            message: this.$t('info_item.send_code_ok'),
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                    }
                }).catch((errr) => {
                    this.$message({
                            message: this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                })
                this.can_send_email = false
                let time = 60;
                let t = setInterval(()=>{
                    if(time == 0){
                    time = 60;
                    this.can_send_email = true;
                    this.send_two = this.$t('info_item.get_code')
                    clearInterval(t)
                    }else{
                    this.send_two = --time + 's'
                    }
                },1000)
            }
        },
        submit_end() {
            let item ;
            if(this.user_info.email != null){
                if(this.email != '' && this.email_code_two ==''){
                    this.submit_info = true;
                    return false;
                }
            }
            if(this.user_info.phone != null) {
                if(this.phone != '' && this.phone_code_two ==''){
                    this.submit_info = true;
                    return false;
                }
            }
            if(this.user_info.googleAuthTag =='1') {
                if(this.googleAccount && this.google_code == ''){
                    this.submit_info = true;
                    return false;
                }
            }
            
            let item1 = {
                'receiveAddress':this.address_widthdraw,
                'amount':this.widthdraw_amount,
                'coinTypeId':this.cType =='USDT' ? '0':(this.cType=='BTC'?'1':'2'),
            }
            //合并参数
            let item2,item3,item4;
            if(this.user_info.email != null){
                if(this.email != '') {
                    item2 = {
                        'emailCode' :this.email_code_two
                    }
                }
            }
            if(this.user_info.phone != null) {
                if(this.phone != '') {
                    item3 = {
                        'phoneCode' :this.phone_code_two
                    }
                }
            }
            if(this.user_info.googleAuthTag =='1') {
                if(this.googleAccount) {
                    item4 = {
                        'googleCode' : this.google_code
                    }
                }
            }
            
            item = Object.assign(item1,item2,item3,item4)
            this.axios.post('/assetsExtractOrder/extract',qs.stringify(item))
            .then((res) => {
                let data = res.data;
                this.top_box1 =false;
                this.top_box2 =false;
                console.log(data)
                if(data.code == 200 ) {
                    this.$message({
                        // message: '提币成功/提币申请已提交',
                        message:this.$t('info_item.succeed'),
                        type: 'success'
                    });
                    this.chargeCoinStatus = false;
                    this.close_box2()
                    this.$router.push('/home/condition/recodeCt')
                }else if (data.code ==201) {
                    this.$message({
                        message: data.message,
                        type: 'error'
                    });
                    this.close_box2()
                }
            }).catch((err) => {
                console.log(err)
                // this.close_box2()
                // this.$message({
                //     message: this.$t('info_item.failed'),
                //     type: 'error'
                // });
            })
        },
    }
}
</script>

<style lang="scss">
.asste-management{
    .asste-management-box{
        // height: 18.5rem /* 370/20 */;// +90
        // height: 23rem /* 460/20 */;
        background: #F2F2F2;
        min-height: 100vh;
        .asste-management-box-img{
            height: 18.5rem /* 370/20 */;
            height: 23rem /* 460/20 */;
            background: url('../../assets/images/asset/asset@2x.jpg') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E8%B5%84%E4%BA%A7/asset%402x.jpg) no-repeat center center;
            background-size: cover;
            position: relative;
            box-sizing:border-box;
            padding-top: 8rem;
        }
        .banxin{
            height: 0;
        }
        .asste-management-body{
            position: absolute;
            width: 100%;
            top: -5rem;
            height: 18rem /* 960/20 */;
            background:rgba(255,255,255,1);
            .asset-manage-nac{
                box-sizing: border-box;
                padding: 0 .5rem;
                height: 2.5rem /* 50/20 */;
                line-height: 2.5rem;
                border-bottom:1px solid rgba(204,204,204,1);
                .right{
                    height: 2.5rem /* 50/20 */;
                    line-height: 2.5rem;
                    position: relative;
                    span{
                        display: inline-block;
                        // width:7rem /* 140/20 */;
                        box-sizing: border-box;
                        padding: 0 .6rem;
                        height:1.5rem /* 30/20 */;
                        line-height: 1.5rem;
                        text-align: center;
                        border:1px solid rgba(204,204,204,1);
                        border-radius:.25rem /* 5/20 */;
                        margin-top: 1.25rem;
                        font-size:.8rem /* 16/20 */;
                        transform: translateY(-50%);
                        margin-left:1rem;
                        cursor: pointer;
                    }
                    span.oo{
                        background:rgba(76,96,133,1);
                        color:rgba(255,255,255,1);
                    }
                }
            }
            // 
            .warning-row{
                background:rgba(255,255,255,1);
            }
            .success-row{
                background:rgba(242,242,242,1);
                
            }
            .table-asset-manage{
                height: 20.5rem /* 410/20 */;
                box-sizing: border-box;
                padding: 0.5rem .5rem;
                .head_tab_cell{
                    text-align: center;
                    color:black;
                    background: rgba(230,230,230,1);
                }
                .cell{
                    text-align: center;
                }
                .bt{
                    text-align: left;
                    button{
                        margin: 5px;
                    }
                }
                .button-color{
                    background:#5C89CC;border:0;
                }
                .button-color:hover{
                    background: rgb(121, 164, 228);
                }
                .new_color{
                    background: #229C89;
                    color:white;
                }
                .new_color:hover{
                    background: rgba(34, 156, 137,.8);
                }
            }
            
        }
    }
     // 专门替 legal-currency-body 占位
    .asste-management-body-static{
        width: 100%;
        height: 15rem /* 960/20 */;
        height: 24rem /* 960/20 */;
        background:#F2F2F2;
    }
    // 充币
    .mention-coin-box{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-32%);
        width: 37.5rem;
        // height: 20rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        box-sizing: border-box;
            padding: 1rem 3rem;
            .i-psan{
                position: absolute;
                top: 1rem;
                right: 1rem;
            }
            .i-psan:hover{
                color:#333;
                cursor: pointer;
            }
        .iner{
            h3{
                font-size: 1.2rem /* 24/20 */;
                color:rgba(51,51,51,1);
                font-weight: 500;
                line-height: 2.5rem /* 50/20 */;
            }
            span{
                line-height: 1rem;
            }
            .lian{
                margin: .2rem 0rem;
                label{
                    margin-right: 1rem;
                    width:5rem /* 100/20 */;
                    height:2rem /* 40/20 */;
                    .el-radio-button__inner{
                        width:5rem /* 100/20 */;
                        height:2rem /* 40/20 */;
                        display: flex;
                        background:rgba(238,245,255,1);
                        border-radius:.15rem /* 3/20 */;
                        border: 0px;
                            justify-content: center;
                            align-items: center;
                            color: #999;
                    }
                    &.is-active{
                        border: 1px solid rgba(92,137,204,1);
                        border-radius:.15rem /* 3/20 */;
                        .el-radio-button__inner{
                           width:5rem /* 100/20 */;
                            height:2rem /* 40/20 */;
                            color: #5C89CC;
                            background: url('../../assets/images/asset/lian.png') no-repeat center center;
                        }
                    }
                }
                
                
            }
            .chargeMoneyText{
                text-align: left;
                span{
                    font-size:.8rem /* 16/20 */;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:1.5rem /* 30/20 */;
                    display: inline-block;
                }
                i{
                    color: #5C89CC;
                    text-decoration: underline;
                }

                .qrCode-address{
                    display: inline-block!important;
                    position: relative;
                    // font-size: .5rem /* 14/20 */;
                    color: #5C9ACC;
                    img{
                        border: .4rem /* 8/20 */ solid rgba(204,204,204,1);
                        display: inline-block;
                        position:absolute;
                        top: 0rem;
                        left: 3rem;
                        width: 9rem /* 162/20 */;
                        height: 9rem /* 165/20 */;
                        display: none;
                        background: rgba(204,204,204,1);
                    }
                    
                }
                .qrCode-address-img{

                }
                .qrCode-address:hover{
                    img{
                        display: block;
                    }
                }
                ul{
                    li{
                        font-size: .7rem /* 14/20 */;
                        color: #666666;
                        line-height: 1.2rem /* 32/20 */;
                    }
                    margin-bottom: 1.15rem /* 23/20 */;
                }
            }
        }
    }
    .charge-coin-box{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-32%);
        width:41.5rem /* 830/20 */;
        // height:23rem /* 420/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        box-sizing: border-box;
        padding: 2rem 2rem;
        
        i.hove{
            cursor: pointer;
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
        i.hove:hover{
        }  
        .iner{
            h3{
                font-size: 1.2rem /* 24/20 */;
                color:rgba(51,51,51,1);
                font-weight: 500;
            }
            span{
                font-size:.7rem /* 16/20 */;
                font-family:'PingFang-SC-Regular';
                font-weight:400;
                line-height: 1rem;
                color:rgba(102,102,102,1);
                // line-height:1.5rem /* 30/20 */;
                display: inline-block;
                
            }
            .lian{
                label{
                    margin-right: 1rem;
                    width:5rem /* 100/20 */;
                    height:2rem /* 40/20 */;
                    .el-radio-button__inner{
                        width:5rem /* 100/20 */;
                        height:2rem /* 40/20 */;
                        display: flex;
                        background:rgba(238,245,255,1);
                        border-radius:.15rem /* 3/20 */;
                        border: 0px;
                            justify-content: center;
                            align-items: center;
                            color: #999;
                    }
                    &.is-active{
                         border: 1px solid rgba(92,137,204,1);
                        border-radius:.15rem /* 3/20 */;
                        
                        .el-radio-button__inner{
                           width:5rem /* 100/20 */;
                            height:2rem /* 40/20 */;
                            color: #5C89CC;
                            background: url('../../assets/images/asset/lian.png') no-repeat center center;
                        }
                    }
                }
                
            }
            .el-select{
                margin: 0.5rem 0;
                height: 2rem;
                width: 100%;
                .el-input.el-input--suffix{
                        height: 2rem;
                        line-height: 2rem;
                    input{
                            display: inline-block;
                            height: 2rem!important;
                            margin: 0;
                            text-align: left;
                    }
                    .el-input__suffix{
                        .el-input__suffix-inner{
                            height: 2rem!important;
                            
                        }
                    }
                }
            }
            .one{
                width: 18.5rem /* 370/20 */;
                height: 3rem /* 60/20 */;
                margin:1rem 0;
                span{
                    display: inline-block;
                    height: 1rem /* 20/20 */;
                    line-height: 1rem;
                    font-size: .7rem /* 14/20 */;
                    vertical-align: bottom;
                    i:hover{
                        color:black;
                    }
                }
                span.info{
                    width: 100%;
                    height: 1rem /* 20/20 */;
                    line-height: 1rem;
                    text-align: center;
                }
                p{
                    display: inline-block;
                    width: 18.5rem /* 370/20 */;
                    height:2rem /* 40/20 */;
                    line-height: 2rem;
                    position: relative;
                    input{
                        display: inline-block;
                        width: 18.5rem /* 370/20 */;
                        height:1.95rem /* 40/20 */;
                        background: white;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        box-sizing: border-box;
                        padding-left: .5rem;
                    }
                    i{
                        position: absolute;
                        display: inline-block;
                        height: 1.95rem;
                        width: 2rem;
                        font-size: .8rem /* 16/20 */;
                        right: 10px;
                        color:#666666;
                    }
                    span.button{
                        display: inline-block;
                        width: 100%;
                        height: 2rem /* 20/20 */;
                        line-height: 2rem;
                        font-size: .8rem /* 16/20 */;
                        text-align: center;
                        
                        cursor: pointer;
                        
                    }
                    .button_no{
                        background:rgba(204,204,204,1);
                        color:rgba(255,255,255,1);
                    }
                    .button_ok{
                        background:rgba(76,96,133,1);
                        color:rgba(255,255,255,1);
                    }
                }
            }
            .draw_list_left{
                ul{
                    li{
                        font-size: .7rem /* 14/20 */;
                        line-height: 1.2rem /* 20/20 */;
                        color:#666666;
                    }
                }
            }
            
            
        }
            
    }
    
    .transfer-box{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-32%);
        width:41.5rem /* 830/20 */;
        height:21rem /* 420/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        box-sizing: border-box;
        padding: 0rem 1rem;
        i{
            margin-top: .5rem;
            cursor: pointer;
        }
        i:hover{
            color:red;
        }
        .iner{
            width: 36rem /* 720/20 */;
            margin:  0 auto;
            height: 19rem /* 420/20 */;
            margin-top: 10.5rem;
            transform: translateY(-50%);
            h3{
                font-size: 1.2rem /* 24/20 */;
                color:rgba(51,51,51,1);
                font-weight: 500;
            }
            .one{
                position: relative;
                width: 17rem /* 340/20 */;
                height: 3rem /* 60/20 */;
                margin:1.5rem 0;
                span{
                    display: inline-block;
                    height: 1rem /* 20/20 */;
                    line-height: 1rem;
                    font-size: .7rem /* 14/20 */;
                }
                span.info{
                    width: 100%;
                    height: 1rem /* 20/20 */;
                    line-height: 1rem;
                    text-align: center;
                }
                p{
                    display: inline-block;
                    width:17rem /* 340/20 */;
                    height:2rem /* 40/20 */;
                    line-height: 2rem;
                    
                    input{
                        display: inline-block;
                        width:17rem /* 340/20 */;
                        height:1.95rem /* 40/20 */;
                        // background:rgba(242,242,242,1);
                        border:1px /* 1/20 */ solid rgba(204,204,204,1);
                        box-sizing: border-box;
                        padding-left: .5rem;
                        font-size: .8rem /* 16/20 */;
                    }
                    span.button{
                        display: inline-block;
                        width: 100%;
                        height: 2rem /* 20/20 */;
                        line-height: 2rem;
                        font-size: .8rem /* 16/20 */;
                        text-align: center;
                        color:rgba(255,255,255,1);
                        cursor: pointer;
                        background:rgba(76,96,133,1);
                    }
                }
            }
            .i-abs{
                position: absolute;
                right: .2rem;
                top: 50%;
                color:rgba(102,102,102,1);
                transform: translateY(-50%);
            }
            .i-fee{
                position: absolute;
                right: .2rem;
                top: 100%;
                transform: translateY(-50%);
                font-size: 14px;
            }
            .i-fee,
            .i-abs:hover{
                color:rgba(102,102,102,1);
            }
            .center{
                margin-top: 7rem;
                .one.outer{
                    width: 100%;
                    p{
                        width: 100%;
                        input{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    @media screen and(max-width: 480px) {
        .transfer-box{
            width:100%!important;
            .iner{
                width:100%!important;
                .one{
                    width: 14rem;
                    p{
                        width: 14rem;
                        input{
                            width: 14rem;
                        }
                    }
                }
            }
        }
        .mention-coin-box{
            width:100%!important;
            height: 25rem!important;
        }
        .charge-coin-box{
            width:100%!important;
            height: 38rem!important;
            .iner{
                .outer{
                    .one_p{
                        span{
                            height: 2rem;
                            line-height: 2rem;
                            span{
                                height: 2rem;
                            line-height: 2rem;
                                i{
                                    height: 2rem;
                            line-height: 2rem;
                                }
                            }
                        }
                        
                    }
                    .outer:nth-child(2){
                        .left,
                        .right{
                            width: 100%;
                        }
                        .one{
                            margin-top: 2rem;
                        }
                    }
                    
                }
            }
        }
        
    }
    // .mention-coin-box{
    //     position: fixed;
    //     top: 50%;
    //     left: 50%;
    //     transform: translateX(-50%) translateY(-32%);
    //     width:41.5rem /* 830/20 */;
    //     height:21rem /* 420/20 */;
    //     background:rgba(255,255,255,1);
    //     box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
    //     border-radius:.25rem /* 5/20 */;
    //     box-sizing: border-box;
    //     padding: 0rem 1rem;
    //     i{
    //         margin-top: .5rem;
    //         cursor: pointer;
    //     }
    //     i:hover{
    //         color:red;
    //     }
    // }
    // 
    .top_box1{
        position: fixed;
        z-index: 120;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width:24rem /* 480/20 */;
        height:12.5rem /* 250/20 */;
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
        padding: 1.5rem /* 30/20 */ 2.5rem /* 30/20 */;
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
            color: #5C9ACC;
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
                background:rgba(92,154,204,1);
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

    .top_box2{
        position: fixed;
        width: 22.5rem /* 450/20 */;
        // height: 30rem /* 600/20 */;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform:  translateX(-50%) translateY(-50%);
        background:rgba(255,255,255,1);
        border-radius:.25rem /* 5/20 */;
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);
        // padding-top: 1rem /* 20/20 */;
        // padding-left: 2rem /* 40/20 */ ;
        // padding-right: 1.5rem /* 30/20 */;
        // padding-bottom: 1rem /* 20/20 */;
        // box-sizing: border-box;
        i{
            cursor: pointer;
        }
        i:hover{
            color:#409EFF;
            transform: rotateZ(50deg)
        }
        span{
            line-height: 2.5rem /* 50/20 */;
        }
        box-sizing: border-box;
        padding: 1.5rem /* 30/20 */ 1.5rem /* 30/20 */;
        // padding-top: 1rem /* 20/20 */;
        text-align: left;
        font-size:.7rem /* 14/20 */;
        font-family:'PingFang-SC-Regular';
        font-weight:400;
        color:rgba(102,102,102,1);
        // line-height:1.5rem /* 30/20 */;
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
            color: #5C9ACC;
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
                background:rgba(92,154,204,1);
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
</style>
