<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-15 12:08:38
 -->
<template>
    <div class="publish-advertisements">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="publish-advertisements-box">
            <div class="banxin">
                <div class="nac-nav">
                    <h3>{{$t('publish.release')}}</h3>
                    <p :class="lang">{{$t('publish.release1')}}</p>
                    <p :class="lang">{{$t('publish.release2')}}</p>
                    <p :class="lang">{{$t('publish.release3')}}</p>
                    <span :class="lang" @click="rate_status=true;getFee()">{{$t('publish.fee')}}</span>
                </div>
            </div>
        </div>
        <!-- <div class="publish-advertisements-body" :class="'methods'+cities.length"> -->
        <div class="publish-advertisements-body" :class="'methods'">
            <div class="banxin">
                <!-- <div class="publish" :class="'methods'+cities.length"> -->
                <div class="publish" :class="'methods'">
                    <div class="publish-box">
                        <div class="one">
                            <p>
                                <span>{{$t('publish.pay_way')}}</span><br>
                                <el-select v-model="payWayType" :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" placeholder="请选择">
                                    <el-option
                                    v-for="item in tradePayType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                
                            </p>
                        </div>
                        <div class="one border">
                            <p>
                                <span>{{$t('publish.transaction')}}</span><br>
                                <el-select v-model="isBuy" :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" placeholder="请选择">
                                    <el-option
                                    v-for="item in tradeType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                
                            </p>
                        </div>
                        <div class="one">
                            <p class="outer">
                                <span>{{$t('publish.cryptocurrency')}}</span> <span class="right">{{$t('publish.balance')}}：<i style="color:rgba(92, 137, 204, 1)">{{allData.balance}} {{coinTypeName.toUpperCase()}}</i></span><br>
                                <el-select v-model="coinTypeId" 
                                :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" placeholder="请选择">
                                    <el-option
                                    v-for="item in coinTypeIdArr"
                                    :key="item.value"
                                    :label="item.label ? item.label.toUpperCase():''"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- <i class="el-icon-warning" style="color:red;">提示：发布交易余额不能低于{{minQty}} {{coinTypeName}}</i> -->
                            </p>
                        </div>
                        <div class="one">
                            <p>
                                <span>{{$t('publish.sele_c')}}</span><br>
                                <el-select v-model="countryInfoId" 
                                :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" placeholder="请选择国家">
                                    <el-option
                                    v-for="item in tradeCoinTypeArr"
                                    :key="item.id"
                                    :label="lang=='en'?item.countryCode:item.countryName"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="one border">
                            <p>
                                <span>{{$t('publish.currency')}}</span><br>
                                <el-select v-model="otcTradeCurrencyId" 
                                :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" placeholder="请选择">
                                    <el-option
                                    v-for="item in tradeCoinTypeArrB"
                                    :key="item.id"
                                    :label="item.coinName"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="one border cny cny1">
                            <!-- <p>
                                <span>交易单价</span><br> 
                                <el-input v-model="price" @focus="focusPrice" placeholder="请输入内容"></el-input><i>{{getName(otcTradeCurrencyId)}}</i>
                            </p> -->
                            <p>
                                <el-radio v-model="pricingType" class="fg" label="0">{{$t('publish.fixed_price')}}</el-radio>
                                <el-input v-model="price" :disabled="pricingType!=0"  @focus="focusPrice" :placeholder="$t('info_item.input_content')"></el-input><i>{{getName(otcTradeCurrencyId)}}</i>
                            </p>
                            <p class="label">
                                <el-radio v-model="pricingType" label="1">{{$t('publish.float_price')}}（{{$t('publish.float_price2')}}）</el-radio>
                            </p>
                            <p class="tetete">
                                <span>{{$t('publish.profit')}}：</span> <el-input class="te" type="number" v-model="profitRate" :disabled="pricingType!=1"  @focus="focusPrice" :placeholder="$t('info_item.input_content')"></el-input>
                                <!-- <i>{{getName(otcTradeCurrencyId)}}</i> -->
                                 <el-button type="info">%</el-button>
                            </p>
                            <p class="tete">
                                <span>{{$t('publish.market_price')}} : {{cuPrice}} {{getName(otcTradeCurrencyId)}}</span>
                                <span v-show="pricingType==1">{{$t('publish.list_price')}} : {{price2}} {{getName(otcTradeCurrencyId)}}</span>
                            </p>
                            
                        </div>
                        <div class="box-box outer">
                            <div class="left">
                                <div class="two">
                                    <div>
                                        <span>{{$t('publish.amount_limit')}}</span><br>
                                        <p>
                                            <el-input v-model="minCurrency" @keyup.native="inCNYFun(minCurrency,'min')" :placeholder="ph"></el-input><i>{{getName(otcTradeCurrencyId)}}</i>
                                        </p>
                                        <p>
                                            <el-input v-model="minQty" @keyup.native="inNUMFun(minQty,'min')" :placeholder="phn"></el-input><i>{{coinTypeName.toUpperCase()}}</i>
                                        </p>
                                        <i class="el-icon-warning" style="color:red;" v-show="minQtyStatus">{{$t('publish.tishi')}}{{allData.minPublishQty}} {{coinTypeName.toUpperCase()}}</i>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="two">
                                    <div>
                                        <span></span><br>
                                        <p>
                                            <el-input v-model="maxCurrency" @keyup.native="inCNYFun(maxCurrency,'max')" :placeholder="phx"></el-input><i>{{getName(otcTradeCurrencyId)}}</i>
                                        </p>
                                        <p>
                                            <el-input v-model="maxQty" @keyup.native="inNUMFun(maxQty,'max')" :placeholder="phxn"></el-input><i>{{coinTypeName.toUpperCase()}}</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="one cny out">
                            <div>
                                <span v-show="lang=='zh'">{{isBuy=='0'?'交易':'出售'}}限额</span><br>
                                <span v-show="lang=='en'">{{$t('publish.c_amount_limit')}}</span><br>
                                <p>
                                    <el-input v-model="limitQty" 
                                    :disabled="edit_ad.id?(
                                    edit_ad.adStatus=='1' && edit_ad.isAutoTaken == '1' 
                                ):false" :placeholder="phall"></el-input><i>{{coinTypeName.toUpperCase()}}</i>
                                </p>
                                <i class="el-icon-warning" style="color:red;" v-show="limitQtyStatus">{{$t('publish.tishi2')}}
                                    {{limitQtyInfo}} {{coinTypeName.toUpperCase()}}</i>
                            </div>
                        </div>
                        <div class="pay-way">
                            <h3 v-show="payWayType==0">{{$t('publish.pay_list')}} <i>{{$t('publish.max_pay')}}</i></h3>
                            <h3 v-show="payWayType==1">{{$t('publish.gift_list')}} <i>{{$t('publish.max_gift')}}</i></h3>
                            <div class="pay-way-box gundong">
                                <el-checkbox-group 
                                    v-model="checkedCities1"
                                    :min="payWayType==0?1:0"
                                    :max="payWayType==0?3:1">
                                    <el-checkbox v-for="(item,key) in cities" :label="item.id" :data-type="item.type" :key="key" @change="changePay($event,item)">
                                        <p v-if="payWayType==0 && item.type=='0'"><img src="../../assets/images/legal-currency/bank@2x.png" alt=""></p>
                                        <p v-if="payWayType==0 && item.type=='1'"><img src="../../assets/images/legal-currency/ali@2x.png" alt=""></p>
                                        <p v-if="payWayType==0 && item.type=='2'"><img src="../../assets/images/legal-currency/wx@2x.png" alt=""></p>
                                        <span class="pay-span-name" v-show="payWayType==0">{{item.name}}</span>
                                        <span class="pay-span" v-if="payWayType==0 && item.type=='1'">{{item.alipayAccount}} </span>
                                        <span class="pay-span" v-if="payWayType==0 && item.type=='0'">{{item.bankCardNumber}}</span>
                                        <span class="pay-span" v-if="payWayType==0 && item.type=='0'">{{item.bankAccount}}</span>
                                        <span class="pay-span" v-if="payWayType==0 && item.type=='0'">{{item.branchAccount}} </span>
                                        <span class="pay-span" v-if="payWayType==0 && item.type=='2'">{{item.wxAccount}}</span>
                                        <span class="pay-span-name" v-if="payWayType==1">{{item.cardName}}</span>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="boder"></div>
                        <div class="remark">
                            <p>
                                <span>{{$t('publish.note')}}</span><br> 
                                <!-- <el-input v-model="message"  placeholder="请输入备注内容"></el-input> -->
                                <textarea class="gundong" id="textarea" style="max-height:5rem;min-height:5rem;" ref="textarea" maxlength=500 v-model="message" :placeholder="$t('publish.text')"></textarea>
                            </p>
                        </div>
                        <div class="prompt-msg">
                            <h3>{{$t('publish.important')}}</h3>
                            <div class="left">
                                <p>1、{{$t('publish.im1')}}</p>
                                <p>2、{{$t('publish.im2')}}</p>
                                <p>3、{{$t('publish.im3')}}</p>
                                <p>4、{{$t('publish.im4')}}</p>
                                <p>5、{{$t('publish.im5')}}</p>
                            </div>
                            <div class="right">
                                <span :class="ad_active?'ad-active':''" @click="endSubmit">{{$t('publish.endsubmit')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rate" v-show="rate_status">
            <i class="el-icon-close" @click="rate_status=false;"></i>
            <h3>{{$t('publish.fee')}}</h3>
            <p>{{$t('publish.fee_info')}}：</p>
            <div class="rate-box">
               <el-table
                :row-class-name="tableRowClassName"
                header-cell-class-name="head_tab_cell"
                :data="table"
                border
                id="adTable"
                style="width: 100%;">
                    <el-table-column
                        :label="$t('publish.range')"
                        >
                        <template slot-scope="scope">
                            <div class="one">
                                <span>{{scope.row.coinName}} : {{scope.row.amountStart}} - {{scope.row.amountEnd}}</span><br>
                                <!-- <span>{{scope.row.coinName}} : {{scope.row.coinName}} - {{scope.row.coinName}}</span> -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('publish.fee_rate')"
                        >
                        <template slot-scope="scope">
                            <div class="one">
                                <span style="">{{scope.row.handingFreeRate}}%</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import {  getcoinTypeIdFun, 
QueryQtcTradeFunCountry,
QueryQtcTradeFun, 
getPublishAdParam, 
getCurrencyPriceCalcFun,
publishAdFun,
editAdFun,
legalFeeRate,getMarketPrice,
initTableHeight, getGiftCrad } from '../../assets/js/api.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            isBuy:'0',
            tradeType:this.$t('publish.tradeType'),
            payWayType:'0',
            tradePayType:this.$t('publish.tradePayType'),
            coinTypeId:'',
            coinTypeName:'',
            coinTypeIdArr:[],
            tradeCountry:'',//guojia
            tradeCoinType:'',
            tradeCoinTypeArr:[],
            tradeCoinTypeArrB:[],
            options:[],
            value:'12',
            input:'123',
            // 
            cities : [],
            checkedCities1:[],
            checkedCitiesTypes:[],
            checkedCitiesTypesItem:[],
            allData:{},
            limitQty:'',//出售限额
            limitQtyInfo:'',//提示
            maxQty:'',
            maxCurrency:'',//最大出售
            minQty:'',
            minCurrency:'',//最小出售
            price:'',//单价
            price2:'',//挂牌价
            minQtyStatus:false,
            limitQtyStatus:false,
            rate_status:false,
            table:[],
            message:'',
            countryInfoId:'',
            otcTradeCurrencyId:'',
            pricingType:'0',
            cuPrice:'',//当前市场价
            profitRate:5,
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale
        },
        ph(){
            if(this.isBuy =='1'){
                // return '输入单次最少出售的金额'
                return this.$t('publish.place_min_amount')
            }else{
                // return '输入单次最少交易的金额'
                return this.$t('publish.place_min_amount_trade')
            }
        },
        phn(){
            if(this.isBuy=='1'){
                // return '输入单次最少出售的数量'
                return this.$t('publish.place_min_crypto_amount')
            }else{
                // return '输入单次最少交易的数量'
                return this.$t('publish.place_min_crypto_amount_trade')
            }
        },
        phx(){
            if(this.isBuy=='1'){
                // return '输入单次最大出售的金额'
                return this.$t('publish.place_max_amount')
            }else{
                // return '输入单次最大交易的金额'
                return this.$t('publish.place_max_amount_trade')
            }
        },
        phxn(){
            if(this.isBuy=='1'){
                // return '输入单次最大出售的数量'
                return this.$t('publish.place_max_crypto_amount_trade')
            }else{
                // return '输入单次最大交易的数量'
                return this.$t('publish.place_max_crypto_amount')
            }
        },
        phall(){
            if(this.isBuy=='1'){
                return this.$t('publish.place_end')
                // return '请输入累计出售限额'
            }else{
                return this.$t('publish.place_end')
                // return '请输入累计交易限额'
            }
        },
        ad_active(){
            console.log(this.checkedCities1,this.countryInfoId+'=coutry',this.price+'=pr',this.minQty+'=minQAtc',this.minCurrency+'=mincurrency',this.limitQty+'=limitQty',this.maxQty+'=maxQty',this.maxCurrency+'=maxCurrency')
            console.log(this.checkedCities1.length==0 || this.countryInfoId == '' || this.price =='' || this.minQty =='' || this.minCurrency=='' || this.limitQty =='' ||this.maxQty=='' || this.maxCurrency =='')
            if(this.pricingType=='0') {
                if(this.checkedCities1.length==0 
                || this.countryInfoId == '' || this.price =='' 
                || this.minQty =='' || this.minCurrency=='' || this.limitQty =='' 
                ||this.maxQty=='' || this.maxCurrency ==''){
                    // this.$message({
                    //     type:'error',
                    //     message:'请填写完整信息',
                    //     duration:1200,
                    // })
                    return false;
                }else{
                    return true;
                }
            }else{
                if(this.checkedCities1.length==0 
                || this.countryInfoId == '' || this.profitRate =='' 
                || this.minQty =='' || this.minCurrency=='' || this.limitQty =='' 
                ||this.maxQty=='' || this.maxCurrency ==''){
                    // this.$message({
                    //     type:'error',
                    //     message:'请填写完整信息',
                    //     duration:1200,
                    // })
                    return false;
                }else{
                    return true;
                }
            }
            
            
        },
        edit_ad(){
            return this.$store.getters.edit_ad;
        },
        
    },
    watch:{
        lang(n, o) {
            this.tradeType = this.$t('publish.tradeType')
            this.tradePayType = this.$t('publish.tradePayType')
        },
        pricingType(n, o) {
            this.inNUMFun(this.minQty,'min')
            this.inNUMFun(this.maxQty,'max')
        },
        price(n,o) {
            console.log('单价变化',n)
            this.inNUMFun(this.minQty,'min')
            this.inNUMFun(this.maxQty,'max')
        },
        coinTypeId(n,o){
            this.coinTypeIdArr.forEach((el)=>{
                if(el.value==n){
                    this.coinTypeName = el.label
                    return
                }
            })
            this.limitQty='';//出售限额
            this.maxQty='';
            this.maxCurrency='';//最大出售
            this.minQty='';
            this.minCurrency='';//最小出售
            this.price='';//单价
            let item = {
                coinTypeId:n,
                countryInfoId:this.countryInfoId,
            }
            this.initData(item)

            let b = this.getName(this.otcTradeCurrencyId)
            if(b){
                this.getPrice({
                    coinTypeId:n,
                    otcTradeCurrency:b
                })
            }
        },
        isBuy(n,o) {
            this.limitQty='';//出售限额
            this.maxQty='';
            this.maxCurrency='';//最大出售
            this.minQty='';
            this.minCurrency='';//最小出售
            this.price='';//单价
            if(n==0){
                this.price2 = ((100-Number(n))/100* this.cuPrice).toFixed(3)
            }else{
                this.price2 = ((100+Number(n))/100* this.cuPrice).toFixed(3)
            }
        },
        payWayType(n,o) {
            if(n==1) {
                this.checkedCities1 = []
                this.initGiftCard()
            }else{
                this.checkedCities1 = []
                let item = {
                    coinTypeId:this.coinTypeId,
                    countryInfoId:this.countryInfoId,
                }
                this.initData(item)
            }
            
        },
        tradeCoinType(n,o){
            this.limitQty='';//出售限额
            this.maxQty='';
            this.maxCurrency='';//最大出售
            this.minQty='';
            this.minCurrency='';//最小出售
            this.price='';//单价
        },
        minQty(n,o){
            if(n<this.allData.minPublishQty){
                this.minQtyStatus = true;
            }else{
                this.minQtyStatus = false;
            }
        },
        limitQty(n,o){
            // if(n<this.minQty) {
            //     this.limitQtyStatus = true
            // }
            console.log(n,this.maxQty)
            if(this.edit_ad.adStatus=='1' && this.edit_ad.isAutoTaken == '1'){
                this.limitQtyStatus = false
            }else{
                if(Number(n)<Number(this.maxQty)){
                    this.limitQtyInfo = this.$t('publish.lower') + this.maxQty
                    this.limitQtyStatus = true;
                }else if(Number(n)>Number(this.allData.balance)){
                    if(this.isBuy=='0'){
                        // this.limitQtyInfo = '高于余额' + this.allData.balance
                        this.limitQtyStatus = false;
                    }else{
                        this.limitQtyInfo = this.$t('publish.higher') + this.allData.balance
                        this.limitQtyStatus = true;
                    }
                    
                }else{
                    this.limitQtyStatus = false;
                }
            }
            
        },
        async countryInfoId(n,o){
            let item = {
                coinTypeId:this.coinTypeId,
                countryInfoId:n,
            }
            await this.initData(item)
            let demo = await QueryQtcTradeFun(this,{countryInfoId:n})
            .then((res) => {
                return res;
            })
            if(demo!=false) {
                this.tradeCoinTypeArrB = demo;
                this.tradeCoinType = demo[0].coinName;
                this.otcTradeCurrencyId = demo[0].id;
            }
        },
        async otcTradeCurrencyId(n,o){
            let b = await this.getName(n)
            if(b){
                this.getPrice({
                    coinTypeId:this.coinTypeId,
                    otcTradeCurrency:b
                })
            }
            
        },
        profitRate(n,o){
            if(this.isBuy=='0') {//ru
                this.price2 = ((100- Number(n))/100* this.cuPrice).toFixed(3)
            }else{
                this.price2 = ((100+Number(n))/100* this.cuPrice).toFixed(3)
            }
        }
    },
    beforeDestory(){
        this.$store.dispatch('_async_reset_edit_ad','')
    },
    beforeRouteLeave(to,from,next){
        if(from.path=='/publish-advertisements'){
            this.$store.dispatch('_async_reset_edit_ad','')
            next()
        }else{
            next()
        }
        // this.$store.dispatch('_async_reset_edit_ad','')
        // next()
    },
    async created(){
        
        let key = await getcoinTypeIdFun(this)
        .then((res) => {
            return res;
        })
        if(this.edit_ad.id != undefined) {
            console.log(this.edit_ad,'广告详情')
            if(key!=false) {
                this.coinTypeIdArr = key;
                this.coinTypeId = this.edit_ad.coinTypeId+''
                this.coinTypeName = this.edit_ad.coinName+''
                let item = {
                    coinTypeId:this.coinTypeId,
                    countryInfoId:this.countryInfoId,
                }
                this.initData(item)
            }
            let keyTrade = await QueryQtcTradeFunCountry(this)
            .then((res) => {
                return res;
            })
            if(keyTrade!=false) {
                this.tradeCoinTypeArr = keyTrade;
                this.countryInfoId = this.edit_ad.countryInfoId
                this.tradeCoinType = this.edit_ad.tradeCoinType+'';
                this.otcTradeCurrencyId = this.edit_ad.otcTradeCurrencyId;
                let demo = await QueryQtcTradeFun(this,{countryInfoId:this.edit_ad.countryInfoId})
                .then((res) => {
                    return res;
                })
                if(demo!=false) {
                    this.tradeCoinTypeArrB = demo;
                }
            }
            this.isBuy = this.edit_ad.isBuy+'';
            this.payWayType = this.edit_ad.payWayType+'';
            this.message = this.edit_ad.message;
            let t = setTimeout(()=>{
                this.price = this.edit_ad.price+'';
                console.log(this.edit_ad.price,'-------------------------------------')
                this.pricingType = this.edit_ad.pricingType == null? '0':this.edit_ad.pricingType+'';
                this.profitRate = this.edit_ad.profitRate;
                this.price2 = this.edit_ad.profitRate/100*this.cuPrice
                this.minQty = this.edit_ad.minQty+'';
                this.inNUMFun(this.edit_ad.minQty,'min')
                this.maxQty = this.edit_ad.maxQty+'';
                this.limitQty = this.edit_ad.limitQty;
                this.inNUMFun(this.edit_ad.maxQty,'max')
                clearTimeout(t)
            },500)

        }else{
            if(key!=false) {
                this.coinTypeIdArr = key;
                this.coinTypeId = key[0].value
                this.coinTypeName = key[0].label
                let item = {
                    coinTypeId:this.coinTypeId,
                    countryInfoId:this.countryInfoId,
                }
                this.initData(item)
            }
            let keyTrade = await QueryQtcTradeFunCountry(this)
            .then((res) => {
                return res;
            })
            if(keyTrade!=false) {
                this.tradeCoinTypeArr = keyTrade;
                this.countryInfoId = keyTrade[0].id
                
                let demo = await QueryQtcTradeFun(this,{countryInfoId:keyTrade[0].id})
                .then((res) => {
                    return res;
                })
                if(demo!=false) {
                    this.tradeCoinTypeArrB = demo;
                    this.tradeCoinType = demo[0].coinName;
                    this.otcTradeCurrencyId = demo[0].otcTradeCurrencyId
                }
            }
        }
        
    },
    async mounted() {
        var textarea = document.getElementById('textarea');
        this.makeExpandingArea(textarea);
        let t = setTimeout(async ()=>{
            if(this.edit_ad.id != undefined){
                // this.price = this.edit_ad.price;
                // this.pricingType = this.edit_ad.pricingType ==null? '0':this.edit_ad.pricingType+''
                // this.profitRate = this.edit_ad.profitRate ==null? 5:this.edit_ad.profitRate
                // this.price = this.edit_ad.profitRate/100*this.cuPrice
                // if(this.isBuy=='0') {//ru
                //     this.price = ((100- Number(this.edit_ad.profitRate))/100* this.cuPrice).toFixed(3)
                // }else{
                //     this.price = ((100+Number(this.edit_ad.profitRate))/100* this.cuPrice).toFixed(3)
                // }
            }else{
                // if(this.isBuy=='0') {//ru
                //     this.price = ((100- Number(this.profitRate))/100* this.cuPrice).toFixed(3)
                // }else{
                //     this.price = ((100+Number(this.profitRate))/100* this.cuPrice).toFixed(3)
                // }
            }
            let b = await this.getName(this.otcTradeCurrencyId)
            // console.log(b)
            if(b){
                await this.getPrice({
                    coinTypeId:this.coinTypeId,
                    otcTradeCurrency:b
                })
                this.price = this.edit_ad.price;
                this.pricingType = this.edit_ad.pricingType ==null? '0':this.edit_ad.pricingType+''
                this.profitRate = this.edit_ad.profitRate ==null? 5:this.edit_ad.profitRate
            }
            
        },1000)
        // setInterval(() => {
        //     if(this.pricingType==0) {
        //         this.pricingType = 1
        //     }else{
        //         this.pricingType = 0
        //     }
        // },1000)
    },
    methods:{
        makeExpandingArea(el) {
            var timer = null;
            //由于ie8有溢出堆栈问题，故调整了这里
            var setStyle = function(el, auto) {
                if (auto) el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
            }
            var delayedResize = function(el) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(function() {
                    setStyle(el)
                }, 200);
            }
            if (el.addEventListener) {
                el.addEventListener('input', function() {
                    setStyle(el, 1);
                }, false);
                setStyle(el)
            } else if (el.attachEvent) {
                el.attachEvent('onpropertychange', function() {
                    setStyle(el)
                })
                setStyle(el)
            }
            if (window.VBArray && window.addEventListener) { //IE9
                el.attachEvent("onkeydown", function() {
                    var key = window.event.keyCode;
                    if (key == 8 || key == 46) delayedResize(el);

                });
                el.attachEvent("oncut", function() {
                    delayedResize(el);
                }); //处理粘贴
            }
        },
        async getPrice(item) {
            let key = await getMarketPrice(this,item)
            .then( res => {
                return res;
            })
            if(key != false) {
                this.cuPrice = key.price ==null?0:key.price;
                if(this.isBuy=='0') {//ru
                    this.price2 = ((100- Number(this.profitRate))/100* this.cuPrice).toFixed(3)
                }else{
                    this.price2 = ((100+Number(this.profitRate))/100* this.cuPrice).toFixed(3)
                }
            }
        },
        getName(id) {
            let that = this;
            let b = this.tradeCoinTypeArrB
            for(let i = 0;i<b.length;i++){
                if(b[i].id == id) {
                    return b[i].coinName
                }
            }

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
         * 获取费率
         */
        async getFee(){
            let key =await legalFeeRate(this)
            .then((res) => {
                return res;
            })
            if(key != false) {
                console.log(key)
                this.table = key;
                initTableHeight(this,7)
            }
        },
        changePay(n,o){
            console.log(n,o)
            if(n){
                // this.checkedCitiesTypes.push(o.type)
                this.checkedCitiesTypes.push(o.type)
                this.checkedCitiesTypesItem.push(o.type)
            }else{
                let da = this.checkedCitiesTypes
                for(let i = 0;i<da.length;i++){
                    if( da[i].type == o.type ) {
                        this.checkedCitiesTypes[i].splice(i,1)
                    }
                }
            }
        },
        /**
         * 初始化给广告页面
         */
        async initData(item){
            console.log('-======',item)
            if(item.countryInfoId==''){
                return false;
            }
            if(this.payWayType==0) {
                let key =await getPublishAdParam(this,item)
                .then((res) => {
                    return res;
                })
                if(key !=false) {
                    this.allData = key;
                    this.cities = key.payMethods;
                    console.log('---------',this.cities)
                    if(key.payMethods.length>0){
                        // this.checkedCities1[0] = key.payMethods[0].id
                        this.checkedCities1.push(key.payMethods[0].id)
                        this.checkedCities1.reverse()
                        // console.log(this.checkedCities1,'.................')
                        this.checkedCitiesTypes = []
                        this.checkedCitiesTypes[0] = key.payMethods[0].type
                        this.checkedCitiesTypesItem[0] = key.payMethods[0]
                    }else{
                        this.checkedCitiesTypes = []
                        this.checkedCities1.reverse()
                        this.checkedCities1=[]
                        this.checkedCitiesTypesItem=[]
                    }
                    if(this.edit_ad.id != undefined) {
                        if(this.payWayType==1) {
                            this.checkedCities1 = []
                            this.checkedCities1.push(this.edit_ad.giftCard.id)
                        }
                    }else{
                        // this.checkedCitiesTypes = []
                        // this.checkedCitiesTypes.push(this.cities[0].id)
                    }
                }
            }else{
                this.initGiftCard()
            }
        },
        /**
         * 初始化礼品卡
         */
        async initGiftCard() {
            let key = await getGiftCrad(this)
            .then((res) => {
                return res;
            })
            if(key != false) {
                // console.log(key)
                this.cities= []
                this.cities = Object.assign(this.cities,key.data) 
                this.checkedCitiesTypes = []
                this.checkedCitiesTypes.push(this.cities[0].id)
            }
        },
        async inCNYFun(n,o) {
            if(this.pricingType==0){
                if(this.price =='') {
                    this.$message({
                        type:'waring',
                        message:this.$t('publish.unit_price'),
                        duration:1200,
                    })
                    return false;
                }
            }else{
                
            }
            
            if(n=='') {
                if(o=='min'){
                    this.minQty  =''
                }else{
                    this.maxQty = ''
                }
                return false
            };
            let item;
            console.log(this.price,this.price2,'-=-=-=-=')
            if(this.pricingType==0){
                item = {
                    inputCurrencyPrice:this.price,//	交易货币单价
                    inputRmbAmount:n,//inputRmbAmount
                }
            }else{
                item = {
                    inputCurrencyPrice:this.price2,//	交易货币单价
                    inputRmbAmount:n,//inputRmbAmount
                }
            }
            let key =await getCurrencyPriceCalcFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false){
                if(o=='min'){
                    this.minQty  =key.tradeCurrencyAmount
                }else{
                    this.maxQty = key.tradeCurrencyAmount
                }
            }
            
        },
        async inNUMFun(n,o) {
            if(this.pricingType==0){
                if(this.price =='') {
                    this.$message({
                        type:'waring',
                        message:this.$t('publish.unit_price'),
                        duration:1200,
                    })
                    return false;
                }
            }
            if(n=='') {
                if(o=='min'){
                    this.minCurrency  =''
                }else{
                    this.maxCurrency = ''
                }
                return false
            };
            let item;
            if(this.pricingType==0){
                item = {
                    inputCurrencyAmount:n,//交易数量
                    inputCurrencyPrice:this.price,//	交易货币单价
                }
            }else{
                item = {
                    inputCurrencyAmount:n,//交易数量
                    inputCurrencyPrice:this.price2,//	交易货币单价
                }
            }
            
            let key =await getCurrencyPriceCalcFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false){
                if(o=='min'){
                    this.minCurrency  =key.rmbAmount
                }else{
                    this.maxCurrency = key.rmbAmount
                }
            }
        },
        focusPrice(){
            this.minQty = '';
            this.minCurrency = '';
            this.maxQty = '';
            this.maxCurrency = '';
        },
        /**
         * 发布广告
         */
        async endSubmit(){
            if(this.price =='' || this.minQty =='' || this.minCurrency=='' || this.limitQty =='' ||this.maxQty=='' || this.maxCurrency ==''){
                this.$message({
                    type:'error',
                    message:this.$t('info_item.input_all'),
                    duration:1200,
                })
                return false;
            }else{
                if(this.minQtyStatus == true || this.limitQtyStatus == true){
                    this.$message({
                        type:'error',
                        message:'请填写符合要求的数据',
                        duration:1300,
                    })
                    return false;
                }
            }
            if(!(this.checkedCities1.length>0)){
                this.$message({
                    type:'error',
                    // message:'请添加相应国家的收款方式',
                    message:this.$t('info_item.input_all'),
                    duration:1300,
                })
                return false
            }
            if(this.pricingType==0 && this.price == '') {
                this.$message({
                    type:'error',
                    // message:'请添加价格',
                    message:this.$t('info_item.input_all'),
                    duration:1300,
                })
                return false
            }
            console.log(this.checkedCities1,this.checkedCitiesTypes)
            if(this.edit_ad.id != undefined) {//编辑
            console.log(this.checkedCities1)
                let item = {
                    'coinTypeId':this.coinTypeId,
                    'id':this.edit_ad.id,
                    'isAutoTaken':'1',
                    'isBuy':this.isBuy,
                    'payWayType':this.payWayType,
                    'limitQty':this.limitQty,
                    'maxQty':this.maxQty,
                    'merchantCoinId':'0',
                    'minQty':this.minQty,
                    'price':this.pricingType==0?this.price:this.price2,
                    'tradeCoinType':this.tradeCoinType,
                    'message':this.message,
                    'countryInfoId':this.countryInfoId,
                    'otcTradeCurrencyId':this.otcTradeCurrencyId,
                    'profitRate':this.profitRate,
                    'pricingType':this.pricingType
                }
                
                if(this.payWayType==0){
                    item['payWayType'] = '0'
                    
                    item['receiptWayIds'] = this.checkedCities1.join(',')
                    item['receiptWayTypes'] = this.checkedCitiesTypes.join(',')
                }else{
                    item['payWayType'] = '1'
                    item['giftCardId'] = this.checkedCities1[0]
                }
                let key =await editAdFun(this,item)
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    this.$store.dispatch('_async_reset_edit_ad')
                    this.$router.push('/my-advertisements')
                }
            }else{ //发布
                let item = {
                    'coinTypeId':this.coinTypeId,
                    'id':this.allData.id,
                    'isAutoTaken':'1',
                    'isBuy':this.isBuy,
                    'payWayType':this.payWayType,
                    'limitQty':this.limitQty,
                    'maxQty':this.maxQty,
                    'merchantCoinId':'0',
                    'minQty':this.minQty,
                    'price':this.pricingType==0?this.price:this.price2,
                    'tradeCoinType':this.tradeCoinType,
                    'message':this.message,
                    'countryInfoId':this.countryInfoId,
                    'otcTradeCurrencyId':this.otcTradeCurrencyId,
                    'profitRate':this.profitRate,
                    'pricingType':this.pricingType
                    
                }
                if(this.payWayType==0){
                    item['payWayType'] = '0'
                    item['receiptWayIds'] = this.checkedCities1.join(',')
                    item['receiptWayTypes'] = this.checkedCitiesTypes.join(',')
                }else{
                    item['payWayType'] = '1'
                    item['giftCardId'] = this.checkedCities1[0]
                    // item.price = this.price2
                }
                let key =await publishAdFun(this,item)
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    this.$router.push('/my-advertisements')
                }
            }
            
        }
    },
    
}
</script>

<style lang="scss">
.el-radio__input.is-checked .el-radio__inner{
    border-color: black;
    background: black;
}
.el-radio__input.is-checked+.el-radio__label{
    color: rgba(102,102,102,1);
}
.publish-advertisements{
    .publish-advertisements-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 13rem /* 460/20 */;
        background:rgba(206,219,240,1);
        .nac-nav{
            // height: 6rem /* 120/20 */;
            width: 100%;
            background:rgba(206,219,240,1);
            position: absolute;
            top: 7rem;
            font-size: .7rem /* 14/20 */;
            h3{
                font-size: .8rem /* 16/20 */;
                line-height: 1.5rem /* 30/20 */;
                border-bottom: 1px solid rgba(255,255,255,1);
            }
            p{
                line-height: 1.2rem /* 30/20 */;
            }
            p.en{
                line-height: 1rem;
                width: 85%;
            }
            span{
                font-size: .8rem /* 16/20 */;
                text-align: center;
                line-height: 2rem;
                // display: inline-block;
                // width:6.85rem /* 137/20 */;
                box-sizing: border-box;
                padding: 0 .5rem;
                height:2rem /* 40/20 */;
                background:rgba(92,137,204,1);
                border-radius:.5rem /* 10/20 */;
                color: white;
                cursor: pointer;
                position: absolute;
                right: 0;
                top: 2.5rem;
            }
            span.en{

            }
        }
    }
    .publish-advertisements-body{
        height: 75rem /* 1500/20 */;
        height: 81rem /* 1500/20 */;
        height: 92rem;
        background:RGBA(230, 230, 230, 1);
        box-sizing: border-box;
        padding-top: 1rem;
        .publish{
            height: 73rem /* 1460/20 */;
            height: 79rem /* 1460/20 */;
            height: 90rem;
            background:RGBA(255, 255, 255, 1);
            box-sizing: border-box;
            padding: 1rem 1.5rem;
            .publish-box{
                width: 55.1rem /* 1102/20 */;
                box-sizing: border-box;
                .one{
                    width: 22.75rem /* 455/20 */;
                    height: 5.5rem /* 70/20 */;
                    box-sizing: border-box;
                    padding: 1rem 0;
                    p{
                        width: 22.75rem /* 455/20 */;
                        height: 2rem /* 40/20 */;
                        
                        .el-select{
                            width: 22.75rem /* 455/20 */;
                            height: 2rem /* 40/20 */;
                            input{
                                border-radius: 0;
                                height: 2rem /* 40/20 */;
                            }
                        }
                        span{
                            font-size: .8rem /* 16/20 */;
                            line-height: 1.5rem /* 20/20 */;
                        }
                        i{
                            font-size: .7rem /* 14/20 */;
                        }
                    }
                }
                .one.border{
                    width: 100%;
                    border-bottom: 1px solid rgba(242,242,242,1);
                }
                .one.cny1{
                    height: 16rem;
                }
                .one.cny{
                    // height: 16rem;
                    p{
                        width: 22.75rem /* 455/20 */;
                        height: 5.5rem /* 40/20 */;
                        position: relative;
                        input{
                            border-radius: 0;
                            height: 2rem /* 40/20 */;
                        }
                        i{
                            position: absolute;
                            top: 50%;
                            transform: translateY(-80%);
                            right: 10px;
                            color:rgba(102, 102, 102, 1);
                            font-size: .8rem /* 16/20 */;
                        }
                    }
                    p.label{
                        height: 1.5rem;
                    }
                    p.tetete{
                        height: 3rem;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        span{
                            font-size: .8rem /* 16/20 */;
                            color:rgba(102,102,102,1);
                        }
                        .el-input{
                            width: 50%;
                            input{
                                padding-right: 0!important;
                            }
                        }
                        button{
                            height: 2rem;
                            border-radius: 0px!important;
                            background-color: #CCCCCC;
                            display: flex;
                            align-items: center;
                            line-height: 2rem;
                            border:0px;
                            span{
                                line-height: 1rem!important;
                            }
                        }
                        
                    }
                    p.tete{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        span{
                            display: flex;
                            flex-direction: row;
                            height: 2rem;
                            background:rgba(206,219,240,1);
                            margin-bottom: .05rem;
                            box-sizing: border-box;
                            padding-left: .5rem;
                            align-items: center;
                            color:#666666;
                        }
                    }
                }
                .one.cny.out{
                    font-size: .8rem /* 16/20 */;
                    span{
                        line-height: 1.5rem;
                    }
                    p{
                        input{
                            border-radius: 0;
                            height: 2rem /* 40/20 */;
                        }
                        width: 22.75rem /* 455/20 */;
                        height: 2rem /* 40/20 */;
                        position: relative;
                        i{
                            position: absolute;
                            top: 59%;
                            transform: translateY(-80%);
                            right: 10px;
                            color:rgba(102, 102, 102, 1);
                            font-size: .8rem /* 16/20 */;
                        }
                    }
                    i{
                        font-size: .7rem /* 14/20 */;
                    }
                }
                .two{
                    width: 22.75rem /* 455/20 */;
                    height: 9rem /* 70/20 */;
                    box-sizing: border-box;
                    padding: 1rem 0;
                    .el-select{
                        width: 22.75rem /* 455/20 */;
                        height: 2rem /* 40/20 */;
                        margin:.5rem 0;
                        input{
                            border-radius: 0;
                            height: 2rem /* 40/20 */;
                        }
                    }
                    span{
                        font-size: .8rem /* 16/20 */;
                        line-height: 1.5rem /* 20/20 */;
                    }
                    i{
                        font-size: .7rem /* 14/20 */;
                    }
                    p{
                        width: 22.75rem /* 455/20 */;
                        // height: 5.5rem /* 40/20 */;
                        position: relative;
                        input{
                            margin:.5rem 0;
                            height: 2rem /* 40/20 */;
                            border-radius: 0;
                        }
                        i{
                            position: absolute;
                            top: 58%;
                            transform: translateY(-80%);
                            right: 10px;
                            color:rgba(102, 102, 102, 1);
                            font-size: .8rem /* 16/20 */;
                        }
                    }
                }
                .pay-way{
                    background:RGBA(250, 250, 250, 1);
                    border-bottom: 2px solid rgba(230,230,230,1);
                    box-sizing: border-box;
                    margin-bottom: 2rem;
                    margin-top: 1.5rem;
                    h3{
                        height: 2.9rem /* 58/20 */;
                        line-height: 2.9rem;
                        box-sizing: border-box;
                        padding-left: 1rem;
                        border: 1px solid #E6E6E6;
                        font-size: .9rem /* 18/20 */;
                        border-bottom:2px solid rgba(230,230,230,1);
                        i{
                            font-size: .7rem /* 14/20 */;
                        }
                    }
                    .pay-way-box{
                        height: 13rem /* 260/20 */;
                        height: 6rem;
                        overflow: hidden;
                        overflow-y: auto;
                        .el-checkbox-group{
                            box-sizing: border-box;
                            padding: 0 1rem;
                            border-left:1px solid #E6E6E6;
                            border-right:1px solid #E6E6E6;
                            label{
                                width: 100% /* 455/20 */;
                                height: 2rem /* 40/20 */;
                                margin-left: 0;
                                line-height: 2rem;
                                .el-checkbox+.el-checkbox{
                                    margin-left: 0;
                                }
                                span{
                                    p{
                                        display: inline-block;
                                        width: 1.7rem /* 34/20 */;
                                        height: 1.3rem /* 26/20 */;
                                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                                        border-radius:.2rem /* 4/20 */;
                                        margin: 0 .3rem;
                                        vertical-align: middle;
                                        text-align: center;
                                        line-height: 1.3rem;
                                        img{
                                            display: inline-block;
                                            width: 1.15rem /* 23/20 */;
                                            height: .9rem /* 18/20 */;
                                        }
                                    }
                                }
                                .el-checkbox__label{
                                    width: 90%;
                                    .pay-span-name{
                                        margin-right: .4rem;
                                    }
                                    .pay-span{
                                        display: inline-block;
                                        // width: 10rem;
                                        margin-right: 1rem;
                                        text-align: left;
                                    }
                                }
                                
                            }
                        }
                    }
                }
                .boder{
                    height: 1px;
                    background:#f2f2f2;
                }
                .remark{
                    margin-top: .5rem /* 10/20 */;
                    p{
                        font-size: .8rem /* 16/20 */;
                        span{
                            line-height: 1.5rem;
                        }
                    }
                    textarea{
                        width: 100%;
                        border: 1px solid #dcdfe6;
                        overflow-y:auto;
                        resize: none;
                    }
                }
                .prompt-msg{
                    box-sizing: border-box;
                    // padding-top: 3rem;
                    h3{
                        font-size: .8rem /* 16/20 */;
                        color:rgba(51,51,51,1);
                        line-height: 2rem /* 40/20 */;
                    }
                    .left{
                        width:44.65rem /* 833/20 */;
                        font-size:.8rem /* 16/20 */;
                        height: 7.5rem /* 150/20 */;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:1.5rem /* 30/20 */;
                        p{

                        }
                    }
                    .right{
                        width: 9.1rem /* 182/20 */;
                        height: 7.5rem /* 150/20 */;
                        position: relative;
                        span{
                            position: absolute;
                            bottom: 0;
                            display: inline-block;
                            width:9.1rem /* 182/20 */;
                            height:2.6rem /* 52/20 */;
                            background:rgba(204,204,204,1);
                            border-radius:.25rem /* 5/20 */;
                            text-align: center;
                            line-height: 2.6rem;
                            color: white;
                            cursor: pointer;
                        }
                        span.ad-active{
                            background:rgba(76,96,133,1);
                        }
                    }
                }
            }
        }
        .publish.methods0,
        .publish.methods1{
            height: 79rem;
            height: 84rem;
            height: 85rem;
        }
        .publish.methods2{
            height: 81rem;
            height: 86rem;
            height: 87rem;
        }
        .publish.methods3{
            height: 83rem;
            height: 88rem;
            height: 89rem;
        }
        .publish.methods4{
            height: 85rem;
            height: 90rem;
            height: 91rem;
        }
        .publish.methods5{
            height: 87rem;
            height: 92rem;
            height: 93rem;
        }
        .publish.methods6{
            height: 89rem;
            height: 94rem;
            height: 95rem;
        }
        .publish.methods7{
            height: 91rem;
            height: 96rem;
            height: 97rem;
        }
        .publish.methods8{
            height: 93rem;
            height: 98rem;
            height: 99rem;
        }
        .publish.methods9{
            height: 95rem;
            height: 100rem;
            height: 101rem;
        }
        .publish.methods10{
            height: 97rem;
            height: 102rem;
            height: 103rem;
        }
        .publish.methods11{
            height: 99rem;
            height: 104rem;
            height: 105rem;
        }
        .publish.methods12{
            height: 101rem;
            height: 106rem;
            height: 107rem;
        }
    }
    .publish-advertisements-body.methods0,
    .publish-advertisements-body.methods1{
        height: 81rem;
        height: 86rem;
        height: 87rem;
    }
    .publish-advertisements-body.methods2{
        height: 83rem;
        height: 89rem;
        height: 90rem;
    }
    .publish-advertisements-body.methods3{
        height: 85rem;
        height: 90rem;
        height: 91rem;
    }
    .publish-advertisements-body.methods4{
        height: 87rem;
        height: 92rem;
        height: 93rem;
    }
    .publish-advertisements-body.methods5{
        height: 89rem;
        height: 94rem;
        height: 95rem;
    }
    .publish-advertisements-body.methods6{
        height: 91rem;
        height: 96rem;
        height: 97rem;
    }
    .publish-advertisements-body.methods7{
        height: 93rem;
        height: 98rem;
        height: 99rem;
    }
    .publish-advertisements-body.methods8{
        height: 95rem;
        height: 100rem;
        height: 101rem;
    }
    .publish-advertisements-body.methods9{
        height: 97rem;
        height: 102rem;
        height: 103rem;
    }
    .publish-advertisements-body.methods10{
        height:99rem;
        height: 104rem;
        height: 105rem;
    }
    .publish-advertisements-body.methods11{
        height: 101rem;
        height: 106rem;
        height: 107rem;
    }
    .publish-advertisements-body.methods12{
        height: 103rem;
        height: 108rem;
        height: 109rem;
    }
    .rate{
        width:32rem /* 640/20 */;
        height:18.5rem /* 370/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        position: absolute;
        top: 20%;
        left:50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        padding: .5rem 1rem;
        i{
            position: absolute;
            top: .5rem;
            right: .7rem;
        }
        i:hover{
            cursor: pointer;
            color:red;
        }
        h3{
            margin-top: 1.5rem;
            font-size: 1.4rem /* 28/20 */;
            color:rgba(51,51,51,1);
            line-height: 2.5rem /* 50/20 */;
        }
        p{
            font-size: .8rem /* 16/20 */;
            color:rgba(51,51,51,1);
            line-height: 1.5rem /* 30/20 */;
        }
        .rate-box{
            .warning-row{
                background:rgba(255,255,255,1);
            }
            .success-row{
                background:rgba(242,242,242,1);
                
            }
            .head_tab_cell{
                text-align: center;
                background: rgba(230,230,230,1);
            }
            .one{
                text-align: center;
            }
            table{
                height: 7rem;
            }
        }
    }
}
</style>
