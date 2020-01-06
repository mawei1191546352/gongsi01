<template>
    <div class="my-advertisements">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="my-advertisements-box">
            <div class="banxin">
                <div class="nac-nav">
                    <span @click="$router.push('/legal-currency')">{{$t('ads.nav_list')}}</span> <span> > </span> <span>{{$t('ads.nav_one')}}</span>
                </div>
            </div>
        </div>
        <div class="my-advertisements-body">
            <div class="banxin">
                <div class="nav">
                    <div class="one">
                        <span>{{$t('ads.country')}}</span>
                        <el-select class="nation" v-model="countryInfoId" placeholder="请选择国家">
                            <el-option
                            v-for="item in tradeCoinTypeArr"
                            :key="item.id"
                            :label="lang=='en'?item.countryCode:item.countryName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="one">
                        <span>{{$t('ads.status')}}</span>
                        <el-select v-model="adStatus"  size="mini" placeholder="请选择" class="classB">
                            <el-option
                            v-for="item in adStatusArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="one one-length">
                        <span>{{$t('ads.trade_type')}}</span>
                        <el-select v-model="isBuy"  size="mini" placeholder="请选择" class="classB">
                            <el-option
                            v-for="item in isBuyArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="one te">
                        <span>{{$t('ads.trade')}}&emsp;</span>
                        <el-select v-model="otcTradeCurrencyId"  size="mini" placeholder="请选择币种" class="classB">
                            <el-option
                            v-for="item in tradeCoinTypeArrB"
                            :key="item.id"
                            :label="item.coinName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <i class="el-icon-sort"></i>
                        <el-select v-model="coinTypeId"  size="mini" placeholder="请选择法币" class="classB">
                            <el-option
                            v-for="item in coinTypeArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="nav">
                    
                    <!-- <div class="one right"> -->
                    <div class="one one-adv" :class="lang">
                        <span class="hh">{{$t('ads.search')}}</span>
                        <el-input
                            :placeholder="$t('ads.search_placeholder')"
                            v-model="id">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div class="one one-time">
                        <span>{{$t('ads.date')}}</span>
                        <el-date-picker
                        size="mini"
                            v-model="time"
                            class="right"
                            type="datetimerange"
                            :range-separator="$t('ads.to')"
                            :start-placeholder="$t('info_item.start_time')"
                            :end-placeholder="$t('info_item.end_time')">
                        </el-date-picker>
                    </div>
                    <div class="one one-time">
                        <span>{{$t('ads.pay_way')}}</span>
                        <el-select v-model="payWayType"  size="mini" placeholder="请选择支付方式" class="classB">
                            <el-option
                            v-for="item in optionsPayWay"
                            :key="item.id"
                            :label="item.countryName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="ad-table-t">
                    <el-table
                    :row-class-name="tableRowClassName"
                    header-cell-class-name="head_tab_cell"
                    :data="table"
                    id="adTable"
                    v-loading="loading"
                    style="width: 100%;height:28rem;">
                        <el-table-column
                            :label="$t('ads.ad_id')"
                            width="100"
                            >
                            <template slot-scope="scope">
                                <div class="one">
                                    <!-- <div class="img"><img src="" alt=""><i class="inline"></i></div> -->
                                    <span style="color:rgba(68, 94, 147, 1);">{{scope.row.id}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('ads.ad_type')"
                            width="100"
                            >
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="color:rgba(68, 94, 147, 1);" v-show="scope.row.isBuy=='0'">{{$t('ads.in')}}</span>
                                    <span style="color:rgba(34, 156, 137, 1);" v-show="scope.row.isBuy=='1'">{{$t('ads.out')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('ads.amount')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="">{{scope.row.limitQty}} {{scope.row.coinName}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('ads.limit')">
                            <template slot-scope="scope">
                                <div class="two">
                                    <span>{{scope.row.minAmount}} - {{scope.row.maxAmount}} {{scope.row.tradeCoinType}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        width="120"
                            :label="$t('ads.unit_price')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="">{{scope.row.price}} {{scope.row.tradeCoinType}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        width="140"
                            :label="$t('ads.paym')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="" v-show="scope.row.payWayType==1">{{scope.row.giftCard?scope.row.giftCard.cardName:''}} </span>
                                    <p style="" v-show="scope.row.payWayType==0">
                                        <img style="margin-left:.2rem;margin-right:.2rem;" v-show="scope.row.bankcardOn" src="../../assets/images/legal-currency/bank@2x.png" alt="">
                                        <img style="margin-left:.2rem;margin-right:.2rem;" v-show="scope.row.wechatPayOn" src="../../assets/images/legal-currency/wx@2x.png" alt="">
                                        <img style="margin-left:.2rem;margin-right:.2rem;" v-show="scope.row.alipayOn" src="../../assets/images/legal-currency/ali@2x.png" alt="">
                                    </p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('ads.time')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="">{{scope.row.createTime}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('ads.control')">
                            <template slot-scope="scope">
                                <div class="buy">
                                    <!-- isAutoTaken 1正常接单，2停止接单 -->
                                    <!-- <span style="" @click="placeOrderFun(ad_in_out_active,scope.row)">{{ad_in_out_active=='0'?'买入':'卖出'}}</span> -->
                                    <span v-show="scope.row.adStatus=='1' && scope.row.isAutoTaken == '1'" @click="bookOff(scope.row)">{{$t('ads.put_off')}}</span>
                                    <span v-show="scope.row.adStatus=='2' || (scope.row.adStatus=='1' && scope.row.isAutoTaken == '1')" @click="edit(scope.row)">{{$t('ads.put_edit')}}</span>
                                    <span v-show="scope.row.adStatus=='2'" @click="shelf(scope.row)">{{$t('ads.put_on')}}</span>
                                    <span v-show="scope.row.adStatus=='2'" @click="delete_a(scope.row)">{{$t('ads.put_delete')}}</span>
                                    <span class="span-cancle" v-show="scope.row.adStatus=='1' && scope.row.isAutoTaken == '2'" @click="cancel_f(scope.row)">{{$t('ads.undo_put_off')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 预约下架 -->
        <div class="book-off" :class="lang" v-show="book_off">
            <i class="el-icon-close" @click="book_off=false"></i>
            <div class="book-off-box">
                <h3>{{$t('ads.item1_h')}}</h3>
                <p>{{$t('ads.item1_p1')}}</p>
                <p>{{$t('ads.item1_p2')}}</p>
            </div>
            <div class="book-off-button">
                <p>
                    <span class="book-off-cancle" @click="book_off=false">{{$t('info_item.cancle')}}</span>
                    <span class="book-off-sure" @click="book_off=false;next_advertisement=true;">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <!-- 下架广告 -->
        <div class="next-advertisement" v-show="next_advertisement">
            <i class="el-icon-close" @click="next_advertisement=false"></i>
            <div class="next-advertisement-box">
                <h3>{{$t('ads.item2_h')}}</h3>
                <p>{{$t('ads.item2_p')}}</p>
            </div>
            <div class="next-advertisement-button">
                <p>
                    <span class="next-advertisement-cancle" @click="next_advertisement=false">{{$t('info_item.cancle')}}</span>
                    <span class="next-advertisement-sure" @click="next_advertisement=false;subMitBook()">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <!-- 取消下架 -->
        <div class="cancel-off" v-show="cancel_off">
            <i class="el-icon-close" @click="cancel_off=false"></i>
            <div class="next-advertisement-box">
                <h3>{{$t('ads.item3_h')}}</h3>
                <p>{{$t('ads.item3_p')}}  </p>
            </div>
            <div class="next-advertisement-button">
                <p>
                    <span class="next-advertisement-cancle" @click="cancel_off=false">{{$t('info_item.cancle')}}</span>
                    <span class="next-advertisement-sure" @click="cancel_off=false;subMitCancel()">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <!-- 删除 -->
        <div class="delete-ad" v-show="delete_ad">
            <i class="el-icon-close" @click="delete_ad=false"></i>
            <div class="next-advertisement-box">
                <h3>{{$t('ads.item4_h')}}</h3>
                <p>{{$t('ads.item4_p')}}  </p>
            </div>
            <div class="next-advertisement-button">
                <p>
                    <span class="next-advertisement-cancle" @click="delete_ad=false">{{$t('info_item.cancle')}}</span>
                    <span class="next-advertisement-sure" @click="delete_ad=false;deleteAd()">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { QueryUserAdListFun, 
getcoinTypeIdFun, 
QueryQtcTradeFun,
QueryQtcTradeFunCountry,
UnAdFun,
shelfAdFun,
cancelUnAdPublishFun,
deleteAdFun,
initTableHeight } from '../../assets/js/api.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            loading:true,
            otcTradeCurrencyId:'',
            tradeCoinTypeArr:[
                {
                    id:'-1',
                    countryName:'全部',
                }
            ],
            tradeCoinTypeArrB:[
                {
                    id:'-1',
                    countryName:'全部',
                }
            ],
            optionsPayWay:[
                {
                    id:'-1',
                    countryName:'全部',
                },
                {
                    id: '0',
                    countryName: '现金支付'
                },
                {
                    id: '1',
                    countryName: '礼品卡支付'
                }
            ],
            payWayType: '-1',
            countryInfoId: '',
            legalSet:'legal',
            table:[],
            currentPage:1,
            pageSize:100,
            total:0,
            isBuyArr:[
                {
                    value:'-1',
                    label:'全部',
                },
                {
                    value:'0',
                    label:'购买',
                },
                {
                    value:'1',
                    label:'出售',
                }
            ],
            adStatusArr:[
                {
                    value:'-1',
                    label:'全部',
                },
                {
                    value:'1',
                    label:'已上架',
                },
                {
                    value:'2',
                    label:'已下架',
                },
            ],
            coinTypeArr:[
                {
                    value:'-1',
                    label:'全部',
                }
            ],
            time:null,
            // 
            adStatus:'-1',
            coinTypeId:'-1',
            isBuy:'-1',
            id:'',
            book_off:false,
            next_advertisement:false,
            cancel_off:false,
            delete_ad:false,
            book_save_row:'',
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale
        },
    },
    watch:{
        lang(n,o){
            this.tradeCoinTypeArr[0] = this.$t('ads.tradeCoinTypeArr')[0]
            this.tradeCoinTypeArrB[0] = this.$t('ads.tradeCoinTypeArrB')[0]
            this.coinTypeArr[0] = this.$t('ads.coinTypeArr')[0]
            this.isBuyArr = this.$t('ads.isBuyArr')
            this.optionsPayWay = this.$t('ads.optionsPayWay')
            this.adStatusArr = this.$t('ads.adStatusArr')
        },
        async countryInfoId(n,o){
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(n != '-1') {
                item['countryInfoId'] = n
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
            let it ;
            if(n!='-1') {
                let demo = await QueryQtcTradeFun(this,{countryInfoId:n})
                .then((res) => {
                    return res;
                })
                if(demo!=false) {
                    this.tradeCoinTypeArrB = this.$t('ads.tradeCoinTypeArrB')
                    this.tradeCoinTypeArrB.push(...demo);
                    this.otcTradeCurrencyId = this.tradeCoinTypeArrB[0].id
                }
            }else{
                let demo = await QueryQtcTradeFun(this)
                .then((res) => {
                    return res;
                })
                if(demo!=false) {
                    this.tradeCoinTypeArrB = this.$t('ads.tradeCoinTypeArrB')
                    this.tradeCoinTypeArrB.push(...demo);
                    this.otcTradeCurrencyId = this.tradeCoinTypeArrB[0].id
                }
            }
            
        },
        otcTradeCurrencyId(n,o){
            let item = {};
            if(this.adStatus !='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(n != '-1'){
                item['otcTradeCurrencyId'] = n
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        adStatus(n,o){
            let item = {};
            if(n!='-1') {
                item['adStatus'] = n
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        coinTypeId(n,o){
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(n!='-1') {
                item['coinTypeId'] = n
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        isBuy(n,o){
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(n != '-1') {
                item['isBuy'] = n
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        id(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(n!= '') {
                item['id'] = n
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        time(n,o){
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(n!=null) {
                let start = this.formatDate(new Date(n[0]));
                let end = this.formatDate(new Date(n[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.payWayType!='-1'){                 item['payWayType'] = this.payWayType             }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        payWayType(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(n!='-1') {
                item['payWayType'] = n
            }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        }
    },
    async created(){
        this.tradeCoinTypeArr[0] = this.$t('ads.tradeCoinTypeArr')[0]
        this.tradeCoinTypeArrB[0] = this.$t('ads.tradeCoinTypeArrB')[0]
        this.coinTypeArr[0] = this.$t('ads.coinTypeArr')[0]
        this.isBuyArr = this.$t('ads.isBuyArr')
        this.optionsPayWay = this.$t('ads.optionsPayWay')
        this.adStatusArr = this.$t('ads.adStatusArr')
        let key1 = await QueryQtcTradeFunCountry(this)
        .then((res) => {
            return res;
        })
        if(key1!=false) {
            this.tradeCoinTypeArr.push(...key1);
            this.countryInfoId = this.tradeCoinTypeArr[0].id

            let demo = await QueryQtcTradeFun(this)
            .then((res) => {
                return res;
            })
            console.log(demo)
            if(demo!=false) {
                this.tradeCoinTypeArrB.push(...demo);
                console.log(demo,this.tradeCoinTypeArrB)
                this.otcTradeCurrencyId = this.tradeCoinTypeArrB[0].id
            }else{
                console.log('1111111111111111111111111')
            }
        }
        let key = await getcoinTypeIdFun(this)
        .then((res) => {
            return res;
        })
        if(key!=false) {
            
            this.coinTypeArr.push(...key);
        }
        
        let item = {};
        if(this.adStatus!='-1') {
            item['adStatus'] = this.adStatus
        }
        if(this.coinTypeId!='-1') {
            item['coinTypeId'] = this.coinTypeId
        }
        if(this.isBuy != '-1') {
            item['isBuy'] = this.isBuy
        }
        if(this.id!= '') {
            item['id'] = this.id
        }
        if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
        if(this.time!=null) {
            let start = this.formatDate(new Date(this.time[0]));
            let end = this.formatDate(new Date(this.time[1]));
            item['startTime'] = start;
            item['endTime'] =end;
        }
        item['rows'] = this.pageSize;
        item['page'] = this.currentPage;
        this.initPage(item)
    },
    mounted(){
        initTableHeight()
    },
    beforeRouteLeave (to, from, next) {
        // 如果下一个页面不是详情页（C），则取消列表页（B）的缓存
        if (to.name !== 'PublishAdvertisements') {
            console.warn('离开:'+from.name)
            this.$store.commit('noKeepAlive', from.name)
            next()
        }else{
            next()
        }
    },
    methods:{
        formatDate(date) {
            // let date = new Date(parseInt(row.subscribeTime) * 1000);
            let Y = date.getFullYear() + '-';
            let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            item['rows'] = val;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let item = {};
            if(this.adStatus!='-1') {
                item['adStatus'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['isBuy'] = this.isBuy
            }
            if(this.id!= '-1') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            if(this.time!=null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            item['rows'] = this.pageSize;
            item['page'] = val;
            this.initPage(item)
        },
        /**
         *初始化页面数据
         */
        async initPage(item) {
            let key = await QueryUserAdListFun(this,
            item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                this.table = key.data.list;
                this.total = key.data.total;
                this.loading = false;
            }
        },
        /**
         * 预约下架
         */
        bookOff(row){
            this.book_save_row = row;
            if(row.adStatus=='1' && row.haveTradeingOrder==true) {
                this.book_off = true;
            }else{
                this.next_advertisement=true;
            }
        },
        delete_a(row) {
            this.book_save_row = row;
            this.delete_ad = true;
        },
        /**
         * 确认下架
         */
        async subMitBook(){
            let item = {
                adId: this.book_save_row.id,
            }
            let key = await UnAdFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                let item = {};
                if(this.adStatus!='-1') {
                    item['adStatus'] = this.adStatus
                }
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] = this.coinTypeId
                }
                if(this.isBuy != '-1') {
                    item['isBuy'] = this.isBuy
                }
                if(this.id!= '') {
                    item['id'] = this.id
                }
                if(this.otcTradeCurrencyId != '-1'){
                    item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
                }
                if(this.countryInfoId != '-1') {
                    item['countryInfoId'] = this.countryInfoId
                }
                if(this.time!=null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start;
                    item['endTime'] =end;
                }
                item['rows'] = this.pageSize;
                item['page'] = this.currentPage;
                this.initPage(item)
            }
        },
        /**
         * bianji
         */
        async edit(row) {
            await this.$store.dispatch('_async_set_edit_ad',row)
            await this.$router.push('/publish-advertisements')
        },
        /**
         * shangjia
         */
        async shelf(row) {
            let item = {
                adId: row.id,
            }
            let key =await shelfAdFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                let item = {};
                if(this.adStatus!='-1') {
                    item['adStatus'] = this.adStatus
                }
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] = this.coinTypeId
                }
                if(this.isBuy != '-1') {
                    item['isBuy'] = this.isBuy
                }
                if(this.id!= '') {
                    item['id'] = this.id
                }
                if(this.otcTradeCurrencyId != '-1'){
                    item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
                }
                if(this.countryInfoId != '-1') {
                    item['countryInfoId'] = this.countryInfoId
                }
                if(this.time!=null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start;
                    item['endTime'] =end;
                }
                item['rows'] = this.pageSize;
                item['page'] = this.currentPage;
                this.initPage(item)
            }
        },
        /**
         * 取消预约
         */
        cancel_f(row){
            this.book_save_row = row;
            this.cancel_off = true;
        },
        async subMitCancel(){
            let item = {
                adId: this.book_save_row.id,
            }
            let key =await cancelUnAdPublishFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                let item = {};
                if(this.adStatus!='-1') {
                    item['adStatus'] = this.adStatus
                }
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] = this.coinTypeId
                }
                if(this.isBuy != '-1') {
                    item['isBuy'] = this.isBuy
                }
                if(this.id!= '') {
                    item['id'] = this.id
                }
                if(this.otcTradeCurrencyId != '-1'){
                    item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
                }
                if(this.countryInfoId != '-1') {
                    item['countryInfoId'] = this.countryInfoId
                }
                if(this.time!=null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start;
                    item['endTime'] =end;
                }
                item['rows'] = this.pageSize;
                item['page'] = this.currentPage;
                this.initPage(item)
            }
        },
        /**
         * 删除
         */
        async deleteAd(){
            
            let item = {
                adId: this.book_save_row.id,
            }
            let key =await deleteAdFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                let item = {};
                if(this.adStatus!='-1') {
                    item['adStatus'] = this.adStatus
                }
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] = this.coinTypeId
                }
                if(this.isBuy != '-1') {
                    item['isBuy'] = this.isBuy
                }
                if(this.id!= '') {
                    item['id'] = this.id
                }
                if(this.otcTradeCurrencyId != '-1'){
                    item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
                }
                if(this.countryInfoId != '-1') {
                    item['countryInfoId'] = this.countryInfoId
                }
                if(this.time!=null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start;
                    item['endTime'] =end;
                }
                item['rows'] = this.pageSize;
                item['page'] = this.currentPage;
                this.initPage(item)
            }
        }

    }
}
</script>

<style lang="scss">
.my-advertisements{
    .my-advertisements-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 11rem /* 460/20 */;
        background:RGBA(242, 242, 242, 1);
        .nac-nav{
            position: absolute;
            top: 9.7rem;
            span{
                font-size: .8rem /* 16/20 */;
                cursor: pointer;
            }
            span:hover{
                color:#337ab7;
            }
        }
    }
    .my-advertisements-body{
        .nav{
            .one{
                margin:1.5rem 0.5rem;
                // height: 1.5rem /* 30/20 */;
                display: inline-block;
                vertical-align: middle;
                font-size: .8rem /* 16/20 */;
                width: 9rem /* 150/20 */;
                width: 11rem /* 150/20 */;
                span{
                        margin-right: .5rem;
                    }
                .el-select{
                    width: 7rem /* 130/20 */;
                    width: 6rem /* 130/20 */;
                    span{
                        margin-right: 0rem;
                        span{
                            display: inline-block;
                        }
                    }
                }
                .el-input{
                    width: 6.5rem /* 130/20 */;
                    height: 1.5rem /* 30/20 */;
                    input{
                        width: 6.5rem /* 130/20 */;
                        height: 1.5rem /* 30/20 */;
                    }
                    span{
                        margin-right: 0rem;
                        i{
                            height: 1.5rem /* 30/20 */;
                            line-height: 1.5rem;
                        }
                    }
                }
                
            }
            .one.one-time{
                width: 12.5rem /* 130/20 */;
                width: 10.5rem /* 130/20 */;
                width: 13.5rem /* 130/20 */;
                .el-date-editor{
                    width: 12.5rem /* 130/20 */;
                    width: 10.5rem /* 130/20 */;
                    width: 11.5rem /* 130/20 */;
                    height: 1.5rem /* 30/20 */;
                    span{
                        height: 1.5rem /* 30/20 */;
                    }
                    i{
                        height: 1.5rem /* 30/20 */;
                    }
                }
                span{
                    margin-right: 0rem;
                    line-height: 1.5rem;
                    i{
                        height: 1.5rem /* 30/20 */;
                        line-height: 1.5rem;
                    }
                }
                .el-select{
                    margin-left: .35rem;
                }
            }
            .one-length{
                width: 11rem;
            }
            .one.export{
                width: 3rem;
                display: inline-block;
                width:4.5rem /* 90/20 */;
                height:1.5rem /* 30/20 */;
                background:rgba(76,96,133,1);
                color: white;
                text-align: center;
                line-height: 1.5rem;
                border-radius:.25rem /* 5/20 */;
                cursor: pointer;
                span{
                    margin-right: 0;
                }
            }
            .one.one-adv{
                width:10.5rem /* 130/20 */;
                width:19rem /* 130/20 */;
                height: 1.5rem /* 30/20 */;
                position: relative;
                .el-input{
                    width: 8.5rem /* 130/20 */;
                    width: 10.5rem /* 130/20 */;
                    width: 16.5rem /* 130/20 */;
                    input{
                        width: 8.5rem /* 130/20 */;
                        width: 10.5rem /* 130/20 */;
                        width: 16.5rem /* 130/20 */;
                        height: 1.5rem /* 30/20 */;
                    }
                    span{
                        margin-right: 0rem;
                        float: right;
                        i{
                            height: 1.5rem /* 30/20 */;
                            line-height: 1.5rem;
                        }
                    }
                }
                
            }
            .one.one-adv.en{
                width: 20rem;
                span.hh{
                    margin-right: .8rem;
                }
            }
        }
        .nav:nth-child(1) {
            .one{
                margin:.5rem 0.5rem;
                // height: 1.5rem /* 30/20 */;
                display: inline-block;
                vertical-align: middle;
                font-size: .8rem /* 16/20 */;
                width: 9rem /* 150/20 */;
                width: 11rem /* 150/20 */;
                margin-bottom: 0;
               &.en{
                   margin-right: 1rem;
               } 
            }
            .one.te{
                width: 20rem /* 150/20 */;
                i.el-icon-sort{
                    margin: 0 1rem;
                    display: inline-block;
                    transform:rotate(90deg);
                }  
            }
            .one-length{
                width: 11rem;
            }
        }
        @media screen and(max-width: 480px) {
            .nav{
                .one{
                    width:100%!important;
                    .el-select{
                        width: 99%;
                        input{
                            width: 100%;
                        }
                        span{
                            height: 2.5rem /* 30/20 */;
                            span{
                                height: 2.5rem /* 30/20 */;
                                i{
                                    height: 2.5rem /* 30/20 */;
                                }
                            }
                        }
                    }
                    .el-input{
                        width: 99%!important;
                        height: 2.5rem /* 30/20 */;
                        input{
                            width: 99%!important;
                            height: 2.5rem /* 30/20 */;
                        }
                        span{
                            height: 2.5rem /* 30/20 */;
                            span{
                                height: 2.5rem /* 30/20 */;
                                i{
                                    height: 2.5rem /* 30/20 */;
                                }
                            }
                        }
                    }
                     .el-date-editor{
                         width: 21.5rem!important;
                         height: 2.5rem!important /* 30/20 */;
                         input{
                            width: 100%;
                        }
                        span{
                            height: 2.5rem /* 30/20 */;
                        }
                        i{
                            height: 2.5rem /* 30/20 */;
                        }
                     }
                }
                
            }
        }
        .ad-table-t{
            .warning-row{
                background:rgba(255,255,255,1);
            }
            .success-row{
                background:rgba(242,242,242,1);
                
            }
            .head_tab_cell{
                // text-align: center;
                background: rgba(230,230,230,1);
            }
            .pagination{
                text-align: center;
                margin-bottom: 2rem;
            }
            .buy{
                span{
                    display: inline-block;
                    // width: 2.5rem /* 50/20 */;
                    box-sizing: border-box;
                    padding: 0 .4rem;
                    height: 1.5rem /* 30/20 */;
                    line-height: 1.5rem;
                    text-align: left;
                    color: #337ab7;
                    cursor: pointer;
                }
                span.span-cancle{
                    width: 5.5rem /* 100/20 */;
                }
            }
        }
    }
    // 预约下架
    .book-off{
        position: fixed;
        width:24rem /* 480/20 */;
        height:15rem /* 300/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-sizing: border-box;
        padding: 0 1.5rem;
        i{
            position: absolute;
            top: 1rem ;
            right: 1.5rem;
            font-size: .8rem /* 16/20 */;
        }
        i:hover{
            color:red;
            cursor: pointer;
        }
        .book-off-box{
            margin-top: 2rem;
            h3{
                color:rgba(51,51,51,1);
                font-size: 1.4rem /* 28/20 */;
                line-height: 2.5rem /* 50/20 */;
            }
            p{
                font-size: .8rem /* 16/20 */;
                line-height: 1.5rem /* 40/20 */;
            }
        }
        .book-off-button{
            margin-top: 2rem;
            p{
                text-align: right;
                span{
                    display: inline-block;
                    line-height: 2rem;
                    text-align: center;
                    cursor: pointer;
                    width:5.5rem /* 110/20 */;
                    height:2rem /* 40/20 */;
                    border:1px solid rgba(204,204,204,1);
                    border-radius:.25rem /* 5/20 */;
                }
                span.book-off-sure{
                    background:rgba(76,96,133,1);
                    color:white;
                    margin-left: 1rem;
                }
            }
        }
    }
    .book-off.en{
        height: 16rem;
    }
    // 下架
    .delete-ad,
    .cancel-off,
    .next-advertisement{
        position: fixed;
        width:24rem /* 480/20 */;
        height:15rem /* 300/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-sizing: border-box;
        padding: 0 1.5rem;
        i{
            position: absolute;
            top: 1rem ;
            right: 1.5rem;
            font-size: .8rem /* 16/20 */;
        }
        i:hover{
            color:red;
            cursor: pointer;
        }
        .next-advertisement-box{
            margin-top: 2rem;
            h3{
                color:rgba(51,51,51,1);
                font-size: 1.4rem /* 28/20 */;
                line-height: 2.5rem /* 50/20 */;
            }
            p{
                font-size: .8rem /* 16/20 */;
                line-height: 1.5rem /* 40/20 */;
            }
        }
        .next-advertisement-button{
            margin-top: 2rem;
            p{
                text-align: right;
                span{
                    display: inline-block;
                    line-height: 2rem;
                    text-align: center;
                    cursor: pointer;
                    width:5.5rem /* 110/20 */;
                    height:2rem /* 40/20 */;
                    border:1px solid rgba(204,204,204,1);
                    border-radius:.25rem /* 5/20 */;
                }
                span.next-advertisement-sure{
                    background:rgba(76,96,133,1);
                    color:white;
                    margin-left: 1rem;
                }
            }
        }
    }
}

@media screen and(max-width: 480px) {
    .el-date-range-picker{
        width: 100%!important;
        left: 0;
        .el-date-range-picker__time-header{
             width: 75%!important;
        }
        .el-date-range-picker__content{
            width: 75%!important;
        }
    }

}
</style>
