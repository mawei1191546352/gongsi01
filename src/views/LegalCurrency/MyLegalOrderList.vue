<template>
    <div class="my-legal-order-list">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="my-legal-order-list-box">
            <div class="banxin">
                <div class="nac-nav">
                    <span @click="$router.push('/legal-currency')">{{$t('legal_list.nav_legal')}}</span> <span> > </span> <span>{{$t('legal_list.nav_list')}}</span>
                </div>
            </div>
        </div>
        <div class="my-legal-order-list-body">
            <div id="voice" style="height:0px">
            </div>
            <div class="banxin">
                <div class="nav">
                    <div class="one">
                        <span>{{$t('legal_list.country')}}</span>
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
                        <span>{{$t('legal_list.status')}}</span>
                        <el-select v-model="adStatus"  size="mini" placeholder="请选择" class="classB">
                            <el-option
                            v-for="item in $t('legal_list.adStatusArr')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="one one-length">
                        <span>{{$t('legal_list.trade_type')}}</span>
                        <el-select v-model="isBuy"  size="mini" placeholder="请选择" class="classB">
                            <el-option
                            v-for="item in $t('legal_list.isBuyArr')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="one te">
                        <span>{{$t('legal_list.trade')}}&emsp;</span>
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
                    
                    <div class="one one-adv">
                        <span>{{$t('legal_list.search')}}</span>
                        <el-input
                            :placeholder="$t('legal_list.search_placeholder')"
                            v-model="id">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div class="one one-time">
                        <span>{{$t('legal_list.date')}}</span>
                        <el-date-picker
                            v-model="time"
                            class="right"
                            type="datetimerange"
                            :range-separator="$t('legal_list.to')"
                            :start-placeholder="$t('info_item.start_time')"
                            :end-placeholder="$t('info_item.end_time')">
                        </el-date-picker>
                    </div>
                    <div class="one export right">
                        <span @click="getExcel">{{$t('info_item.export')}}</span>
                    </div>
                </div>
                <div class="refresh" v-show="orderShow">
                    <div class="shou" @click="getNew">
                        <i class="el-icon-refresh-right"></i> 您有 {{ countNum }} 笔新订单，请刷新
                    </div>
                </div>
                <div class="ad-table-t">
                    <el-table
                    :row-class-name="tableRowClassName"
                    header-cell-class-name="head_tab_cell"
                    :data="table"
                    v-loading="loading"
                    id="adTable"
                    style="width: 100%;height:28rem;">
                        <el-table-column
                            :label="$t('legal_list.order')"
                            width="170"
                            >
                            <template slot-scope="scope">
                                <div class="one">
                                    <!-- <div class="img"><img src="" alt=""><i class="inline"></i></div> -->
                                    <span style="">{{scope.row.id}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('legal_list.trade_type')"
                            >
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="" ><i :class="scope.row.transactionType=='0'?'span-in':'span-out'">{{scope.row.transactionType=='0'?$t('legal_list.do_in'):$t('legal_list.do_out')}}</i> <i>{{scope.row.amount}} {{scope.row.coinType}}</i> </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('legal_list.total_price')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="">{{scope.row.amountCny}} {{scope.row.tradeCoinType}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('legal_list.unit_price')">
                            <template slot-scope="scope">
                                <div class="two">
                                    <span style="">{{scope.row.cnyUnitPrice}} {{scope.row.tradeCoinType}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        width="170"
                            :label="$t('legal_list.time')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="">{{scope.row.startTime}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('legal_list.status')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="" v-show="scope.row.status=='0' || scope.row.status=='1' ||scope.row.status=='5'"><img src="../../assets/images/legal-currency/cancle.png" alt=""> {{$t('legal_list.s_cancelled')}}</span>
                                    <span style="" v-show="scope.row.status=='2' || scope.row.status=='6'"><img src="../../assets/images/legal-currency/don.png" alt=""> {{$t('legal_list.s_complete')}}</span>
                                    <span style="" v-show="scope.row.status=='3'"><img src="../../assets/images/legal-currency/online.png" alt=""> {{$t('legal_list.s_unpaid')}}</span>
                                    <span style="" v-show="scope.row.status=='4'"><img src="../../assets/images/legal-currency/online.png" alt=""> {{$t('legal_list.s_paid')}}<br><i v-show="scope.row.isComplaint=='1'">({{scope.row.complaintRole=='1'?$t('legal_list.appealed'):$t('legal_list.appealing')}})</i></span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('legal_list.conterparty')">
                            <template slot-scope="scope">
                                <div class="">
                                    <span style="" v-show="scope.row.tUsername!=''&& scope.row.tUsername!= null">{{scope.row.tUsername}}</span><br v-show="scope.row.tUsername!=''&& scope.row.tUsername!= null">
                                    <span class="span-out" style="">{{scope.row.tRealName}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            id="order-center"
                            :label="$t('legal_list.control')">
                            <template slot-scope="scope">
                                <div class="buy">
                                    <span class="color" v-show="scope.row.optStatus=='0'" @click="goDetail(scope.row)">{{$t('legal_list.detail')}}</span>
                                    <span class="button-color" v-show="scope.row.optStatus=='1'" @click="goDetail(scope.row)">{{$t('legal_list.pay')}}</span>
                                    <span class="button-color" v-show="scope.row.optStatus=='2'" @click="goDetail(scope.row)">{{$t('legal_list.release')}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination" v-show="pShow">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-pages.sync="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getcoinTypeIdFun, legalOrderListFun,
getExcelMyLegalOrderList,
initTableHeight,
QueryQtcTradeFunCountry,
QueryQtcTradeFun,getUnReadOrder } from '../../assets/js/api.js'
let Worker= require('../../assets/js/worker.js')
import TopNav from '../../components/TopNav.vue'
import $ from 'jquery'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            orderShow:false,
            countNum:0,
            workerRefresh2:null,
            pShow:true,
            loading:true,
            otcTradeCurrencyId:'-1',
            tradeCoinTypeArr:[
                {
                    id:'-1',
                    countryName:'全部',
                }
            ],
            
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
                    label:'买入',
                },
                {
                    value:'1',
                    label:'卖出',
                }
            ],
            adStatusArr:[
                {
                    value:'-1',
                    label:'全部',
                },
                {
                    value:'0',
                    label:'待支付',
                },
                {
                    value:'1',
                    label:'已支付',
                },
                {
                    value:'2',
                    label:'完成',
                },
                {
                    value:'3',
                    label:'关闭',
                },
            ],
            tradeCoinTypeArrB:[
                {
                    id:'-1',
                    coinName:"全部"
                }
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
            audio_src:require('../../assets/audio/order.mp3')
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
    },
    
    async created(){
        this.tradeCoinTypeArr[0] = this.$t('legal_list.tradeCoinTypeArr')[0]
        this.tradeCoinTypeArrB[0] = this.$t('legal_list.tradeCoinTypeArrB')[0]
        this.coinTypeArr[0] = this.$t('legal_list.coinTypeArr')[0]
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
            if(demo!=false) {
                this.tradeCoinTypeArrB.push(...demo);
                this.otcTradeCurrencyId = this.tradeCoinTypeArrB[0].id
            }
        }
        // let keyTrade = await QueryQtcTradeFun(this)
        // .then((res) => {
        //     return res;
        // })
        // if(keyTrade!=false) {
        //     this.tradeCoinTypeArr = keyTrade;
        //     this.countryInfoId = keyTrade[0].id
        // }
        let key = await getcoinTypeIdFun(this)
        .then((res) => {
            return res;
        })
        if(key!=false) {
            this.coinTypeArr.push(...key);
        }

        let item = {};
        if(this.adStatus!='-1') {
            item['status'] = this.adStatus
        }
        if(this.coinTypeId!='-1') {
            item['coinTypeId'] = this.coinTypeId
        }
        if(this.isBuy != '-1') {
            item['transactionType'] = this.isBuy
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
        // this.initPage(item)
    },
    watch:{
        async countryInfoId(n,o){
            console.log('hahhahahhahahh')
            let item = {};
            let b = {}
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
            }
            if(this.id!= '') {
                item['id'] = this.id
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(n != '-1') {
                item['countryInfoId'] = n
                b['countryInfoId'] = n
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
            let demo = await QueryQtcTradeFun(this,b)
            .then((res) => {
                return res;
            })
            if(demo!=false) {
                this.tradeCoinTypeArrB = []
                this.tradeCoinTypeArrB[0] = this.$t('legal_list.tradeCoinTypeArrB')[0]
                this.tradeCoinTypeArrB.push(...demo);
                this.otcTradeCurrencyId = this.tradeCoinTypeArrB[0].id
            }
        },
        otcTradeCurrencyId(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        coinTypeId(n,o){
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(n!='-1') {
                item['coinTypeId'] = n
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
        adStatus(n,o) {
            let item = {};
            if(n!='-1') {
                item['status'] = n
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
        isBuy(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(n != '-1') {
                item['transactionType'] = n
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
        id(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        time(n,o) {
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
            console.log(n)
            if(n!=null) {
                let start = this.formatDate(new Date(n[0]));
                let end = this.formatDate(new Date(n[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            this.initPage(item)
        },
        lang(){
            console.table('list:',this.$t('legal_list'))
            console.table('one:',this.$t('legal_list.tradeCoinTypeArr'))
            console.table('arr:',this.$t('legal_list.tradeCoinTypeArr'))
            this.tradeCoinTypeArr[0] = this.$t('legal_list.tradeCoinTypeArr')[0]
            this.tradeCoinTypeArrB[0] = this.$t('legal_list.tradeCoinTypeArrB')[0]
            this.coinTypeArr[0] = this.$t('legal_list.coinTypeArr')[0]
            // this.tradeCoinTypeArr[0].countryName = this.$t('legal_list.tradeCoinTypeArr[0].countryName')
        }
    },
    activated() {
        console.warn('List', 'activated');
        // let dom = document.getElementsByClassName('el-table__body-wrapper')[0]
        // console.log(dom)
        // console.log(dom.classList.add)
        // dom.classList.remove('is-scrolling-none')
        // initTableHeight()
    },
    deactivated() {
        console.warn('List', 'deactivated');
        
    },
    mounted(){
        console.warn('List', 'chuci');
        initTableHeight()
        if(this.workerRefresh2 == null) {
            this.workerRefresh2 = new Worker()
            this.workerRefresh2.postMessage(
                'infinite3'
            )
            this.workerRefresh2.addEventListener('message',(res)=>{
                this.getUnread()
            })
        }else{
            this.workerRefresh2.postMessage(
                'close'
            )
            this.workerRefresh2 = null;
            this.workerRefresh2 = new Worker()
            this.workerRefresh2.postMessage(
                'infinite3'
            )
            this.workerRefresh2.addEventListener('message',(res)=>{
                this.getUnread()
            })
        }
    },
    beforeDestroy(){
        if(this.workerRefresh2!=null){
            this.workerRefresh2.postMessage(
                'close'
            )
        }else{
        }
    },
    beforeRouteLeave (to, from, next) {
        // 如果下一个页面不是详情页（C），则取消列表页（B）的缓存
        if (to.name !== 'legalCurrencyOrder') {
            console.warn('离开:'+from.name)
            this.$store.commit('noKeepAlive', from.name)
             if(this.workerRefresh2!=null){
                this.workerRefresh2.postMessage(
                    'close'
                )
            }else{
            }
            next()
        }else{
            next()
        }
    },
    updated(){
        // this.loading = false;
    },
    methods:{
        // 
        playVoice(file) {
            $('#voice').html('<audio controls="controls" id="audio_player" style="display:none;"> <source src="' + file + '" > </audio><embed id="MPlayer_Alert" src="' + file + '" loop="false" width="0px" height="0px" /></embed>');
        },
        async getUnread() {
            let k = await getUnReadOrder(this)
            .then((res) => {return res})
            // console.log(k)
            if(k!=false && k.count != 0) {
                this.orderShow = true;
                if(this.countNum == k.count) {
                    this.countNum = k.count
                }else{
                    this.playVoice(this.audio_src)
                    this.countNum = k.count
                }
                
                
            }
        },
        // 
        getNew() {
            console.log('进入',this.currentPage)
            if(this.currentPage == 1) {
                let item = {};
                if(this.adStatus!='-1') {
                    item['status'] = this.adStatus
                }
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] = this.coinTypeId
                }
                if(this.isBuy != '-1') {
                    item['transactionType'] = this.isBuy
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
                item['page'] = 1;
                this.initPage(item)
            }else{
                let d = document.querySelector('.number');
                d.click()
            }
            this.orderShow = false;
            // let d = document.querySelector('.number');
            // d.click()
        },
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
        async getExcel(){
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] =await this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId']= await this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] =await this.isBuy
            }
            
            if(this.time!=null) {
                let start =await this.formatDate(new Date(this.time[0]));
                let end =await this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.otcTradeCurrencyId != '-1'){
                item['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.countryInfoId != '-1') {
                item['countryInfoId'] = this.countryInfoId
            }
            item['rows'] = this.pageSize;
            item['page'] = this.currentPage;
            let key  =await getExcelMyLegalOrderList(this,item)
            .then((res) => {
                return res;
            })
            if(key  !=false) {
                console.log(key)
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
            if(val==1) {
                this.orderShow = false;
            }
            this.currentPage = val
            let item = {};
            if(this.adStatus!='-1') {
                item['status'] = this.adStatus
            }
            if(this.coinTypeId!='-1') {
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.isBuy != '-1') {
                item['transactionType'] = this.isBuy
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
            item['page'] = val;
            this.initPage(item)
        },
        /**
         *初始化页面数据
         */
        async initPage(item) {
            this.loading  = true;
            let key = await legalOrderListFun(this,
            item)
            .then((res) => {
                return res;
            })
            console.log(key,'key------------------------------')
            if(key!=false) {
                this.table = key.data.list;
                this.total = key.data.total;
                let m = setTimeout(() => {
                    this.loading  = false;
                    clearTimeout(m)
                },300)
            }
            
        },
        /**
         * 初始化表格高度
         */
        initTableHeight(){
            let dom = document.getElementById('adTable')
            dom = document.getElementsByClassName('el-table__body-wrapper')[0]
            dom.style.height= '25rem';
            dom.style.overflowY= 'auto';
        },
        /**
         * 去详情页面
         */
        async goDetail(row){
            await this.$store.dispatch('_async_set_init_fabi_file',row)
            this.$router.push('/legal-currency-order/true/')
            
        }
    }
}
</script>

<style lang="scss">
.my-legal-order-list{
    .my-legal-order-list-box{
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
    .my-legal-order-list-body{
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
                width:20rem /* 130/20 */;
                height: 1.5rem /* 30/20 */;
                position: relative;
                span{
                    margin-right: .9rem;
                }
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
            
        }
        .nav:nth-child(1) {
            .one{
                margin:.5rem 0.5rem;
                // height: 1.5rem /* 30/20 */;
                display: inline-block;
                vertical-align: middle;
                font-size: .8rem /* 16/20 */;
                // width: 9rem /* 150/20 */;
                margin-bottom: 0;
                
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
                        height: 2.5rem /* 30/20 */!important;
                        input{
                            width: 98%!important;
                            height: 2.5rem /* 30/20 */!important;
                        }
                        span{
                            height: 2.5rem /* 30/20 */!important;
                            span{
                                height: 2.5rem /* 30/20 */!important;
                                i{
                                    height: 2.5rem /* 30/20 */!important;
                                }
                            }
                        }
                    }
                     .el-date-editor{
                         display: none;
                         width: 99%;
                         height: 2.5rem /* 30/20 */;
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
                .one.one-time{
                    display: none;
                }
            }
        }
        .refresh{
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(92,137,204,.15);
            font-size: .8rem;
            margin-bottom: .2rem;
            .shou{
                cursor: pointer;
                 color:rgba(92,137,204,1);
            }
            div.shou:hover{
               color: #409EFF;
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
            .span-in{
                color:#4C6085;
            }
            .span-out{
                color:#229C89;
            }
            .cell{
                text-align: left;
            }
            .buy{
                text-align: left;
                .gray-color{
                    display: inline-block;
                    width:4.5rem /* 90/20 */;
                    height:2rem /* 40/20 */;
                    background:rgba(204,204,204,1);
                    border-radius:.15rem /* 3/20 */;
                    line-height: 2rem;
                    cursor: pointer;
                }
                .blue-color{
                    display: inline-block;
                    line-height: 2rem;
                    width:4.5rem /* 90/20 */;
                    height:2rem /* 40/20 */;
                    background:rgba(76,96,133,1);
                    border-radius:.15rem /* 3/20 */;
                    width:90px;
                    color:white;
                    cursor: pointer;
                }
                .color{
                    color:rgba(92,137,204,1);
                    cursor: pointer;
                }
                .button-color{
                    cursor: pointer;
                    display: inline-block;
                    width:3.5rem /* 70/20 */;
                    line-height: 1.5rem;
                    text-align: center;
                    height:1.5rem /* 30/20 */;
                    background:rgba(76,96,133,1);
                    border-radius:.15rem /* 3/20 */;
                    color:white;
                }
            }
            .pagination{
                text-align: center;
                margin-bottom: 2rem;
            }
        }
    }
}
</style>
