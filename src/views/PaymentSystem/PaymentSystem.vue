<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:09:47
 * @LastEditors: mawei
 * @LastEditTime: 2019-08-16 18:17:52
 -->
<template>
    <div class="payment-system">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="payment-system-box">
            <div class="payment-system-box-img"> </div>
            <div class="banxin">
                <div class="asste-management-body">
                    <div class="asset-manage-nac outer">
                        <div class="flex-d">
                            <div>
                                <span class="span-i" v-show="user_info.role!='1'" @click="initPage('0','0')" :class="payment_nav.payment_item=='0'?'span-active':''">{{$t('pay_order.nav_unpay')}}
                                <i v-show="num!='0'" style="color:white;">{{num}}</i></span>
                                <span @click="initPage('1','1')" :class="payment_nav.payment_item=='1'?'span-active':''">{{$t('pay_order.nav_complete')}}</span>
                                <!--  -->
                                <span v-show="user_info.role=='1'" @click="initPage('2','0')" :class="payment_nav.payment_item=='2'?'span-active':''">{{$t('pay_order.nav_process')}}</span>
                                <span @click="initPage('3','2')" :class="payment_nav.payment_item=='3'?'span-active':''">{{$t('pay_order.nav_closed')}}</span>
                            </div>
                            <div class="merchant-list" >
                                <p>商户</p>
                                <el-select v-model="merchantId" placeholder="请选择">
                                    <el-option
                                    v-for="item in dataAgent"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="payment-search">
                        <el-select v-show="user_info.role!='1'" v-model="timeTag" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-date-picker
                            v-model="time"
                            type="datetimerange"
                            :range-separator="$t('info_item.to')"
                            :start-placeholder="$t('info_item.start_time')"
                            :end-placeholder="$t('info_item.end_time')">
                        </el-date-picker>
                        <el-input
                            :placeholder="user_info.role=='1'?$t('pay_order.input_place1'):$t('pay_order.input_place2')"
                            v-model="content">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                         <el-button @click="getExcel" type="primary" class="right" style="border:none;font-size:.7rem;">{{$t('pay_order.export')}}</el-button>
                    </div>
                    <div class="table-asset-manage">
                        <div class="cointy-box">
                            <span v-for="(item,key) in coinTypeIdArr" 
                            :key="key" 
                            @click="getTypeCoin(item.value)"
                            :class="coinTypeId==item.value?'coinTypeId-active':''">{{item.label?item.label.toUpperCase():''}}
                                <i v-show="key!=(coinTypeIdArr.length-1)"></i>
                            </span>
                            <!-- <span class="span-export right" @click="getExcel">导出</span> -->
                        </div>
                        <el-table
                            :data="tableData"
                            :row-class-name="tableRowClassName"
                            header-cell-class-name="head_tab_cell"
                            v-loading="loading"
                            style="width: 100%;height:42rem;">
                            <el-table-column
                            :label="$t('pay_order.create_time')"
                            width="180"
                            >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{scope.row.startTime}}</span>
                            </template>
                            </el-table-column>
                            <!-- :label="payment_nav.status=='0'?'创建时间':(payment_nav.status=='1'?'完成时间':'关闭时间')" -->
                            <!-- {{ payment_nav.status=='0'? scope.row.startTime:(payment_nav.status=='1'?scope.row.endTime:scope.row.endTime) }} -->
                            <el-table-column
                            :label="payment_nav.status=='0'?$t('pay_order.remain_time'):(payment_nav.status=='1'?$t('pay_order.complete_time'):$t('pay_order.closed_time'))"
                            v-if="user_info.role=='1' || user_info.role=='5'"
                            width="180"
                            >
                            <template slot-scope="scope">
                                <p>{{ payment_nav.status=='0'?fortmatTime(scope.row.expiredTimestamp) :(payment_nav.status=='1'?scope.row.endTime:scope.row.endTime)}}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="(user_info.role=='1' || user_info.role=='5')?$t('pay_order.merchant_id'):$t('pay_order.pay_id')"
                            width="180"
                            >
                            <template slot-scope="scope">
                                <p>{{(user_info.role=='1' || user_info.role=='5')?scope.row.merchantOrderSn: scope.row.id }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('pay_order.payer')"
                             v-if="(user_info.role=='1' || user_info.role=='5')"
                            >
                            <template slot-scope="scope">
                                <p class="user">
                                    <!-- <span v-if="user_info.role!=1">{{scope.row.username}}</span><br v-if="user_info.role!=1">
                                    <span style="color:#229C89;">{{scope.row.realName}}</span> -->
                                    <span v-show="scope.row.username!=''&& scope.row.username!= null">{{scope.row.username}}</span>
                                    <!-- <br v-show="scope.row.username!='' && scope.row.username!= null"> -->
                                    <span style="color:#229C89;">{{scope.row.realName}}</span>
                                </p>
                            </template>
                            </el-table-column>
                            <!-- v-if="user_info.role=='1'"  下面的 -->
                            <el-table-column
                            :label="$t('pay_order.contact')"
                             v-if="false"
                             width="240"
                            >
                            <template slot-scope="scope">
                                <p class="user">
                                    <span>{{$t('pay_order.phone')}}:{{scope.row.phone}}</span><br>
                                    <span>{{$t('pay_order.email')}}:{{scope.row.email}}</span>
                                </p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('pay_order.merchant')"
                             v-if="user_info.role!='1' && user_info.role!=5"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.merchantName }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('pay_order.coin')"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.coinType ? scope.row.coinType.toUpperCase():'' }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            :label="$t('pay_order.amount')"
                            >
                            <template slot-scope="scope">
                                <p style="color:rgba(92, 137, 204, 1);">{{ scope.row.amount }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            v-if="user_info.role!='1' && user_info.role!=5"
                            :label="$t('pay_order.to_us')"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.amountUsd }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            v-if="user_info.role=='1' || user_info.role=='5'"
                            :label="$t('pay_order.fee')"
                            >
                            <template slot-scope="scope">
                                <p>{{ scope.row.handingFee }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column
                            width="120"
                            v-if="user_info.role=='1'"
                            :label="$t('pay_order.actual_amount')"
                            >
                            <template slot-scope="scope">
                                <p v-show="scope.row.type==0"><span style="color:#229c89;">￥</span>{{ scope.row.amountCny }}</p>
                                <!-- 后台说不变 -->
                                <p v-show="scope.row.type==1"><span style="color:#229c89;">U </span>{{ scope.row.amountCny }}</p>
                            </template>
                            </el-table-column>
                            <el-table-column :label="$t('pay_order.control')" 
                            v-if="user_info.role!='1' && user_info.role!=5"
                            >
                            <template slot-scope="scope" v-show="$store.getters.role!='1'">
                                <el-button
                                size="mini"
                                v-show="scope.row.status=='1' || scope.row.status=='2' ||scope.row.status=='3'"
                                @click="handleEdit(scope.$index, scope.row)">{{$t('pay_order.view')}}</el-button>
                                <!-- <el-button
                                size="mini"
                                v-show="scope.row.status=='0'"
                                @click="handleEditCancel(scope.$index, scope.row)">取消</el-button> -->
                                <el-button
                                v-show="scope.row.status=='0'"
                                size="mini"
                                type="primary"
                                style="background:#4c6085;border:0;"
                                @click="handleEdit(scope.$index, scope.row)">{{$t('pay_order.pay')}}</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination
                        style="text-align:center;"
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
            <div class="asste-management-body-static"></div>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {getcoinTypeIdFun,
paymentOrderList,
initTableHeight,
getExcelPay,
PayInNumFun,
PayCancelOrderFun,
agentMerchantList} from '../../assets/js/api'
import Worker from '../../assets/js/worker.js'
import { setTimeout, clearTimeout } from 'timers';
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    computed:{
        payment_nav(){
            return this.$store.getters.payment_nav;
        },
        user_info(){
            return this.$store.getters.user_info;
        },
        lang() {
            return this.$i18n.locale;
        },
    },
    data() {
        return {
            loading:true,
            legalSet:'legal-currency',
            total:0,
            currentPage:1,
            pageSize:100,
            tableData:[],
            timeTag:'0',
            time:null,
            options:[
                {
                    value:'0',
                    label:'按提交时间查询',
                },
                {
                    value:'1',
                    label:'按完成时间查询',
                }
            ],
            coinTypeIdArr:[
                {
                    value:'-1',
                    label:'全部',
                }
            ],
            content:'',
            tableData:[],
            coinTypeId:'-1',
            status:'',
            workerPay:null,
            workerPhoneSys:null,
            phoneTime:'',
            num:'0',
            dataAgent:[
                {
                    id:-1,
                    name:'全部'
                }
            ],
            merchantId:-1,// 默认全部
        }
    },
    watch:{
        lang(n,o) {
            this.options = this.$t('pay_order.options')
            this.coinTypeIdArr[0]=this.$t('pay_order.coinTypeIdArr')[0]
        },
        coinTypeId(n,o){
            let item ={};
            if(n!='-1'){
                item['coinTypeId'] = n
            }
            if(this.content!= '') {
                item['content'] = this.content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            this.loading = true;
            this.getList(item)
        },
        time(n,o) {
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = this.content
            }
            if(n!= null) {
                let start = this.formatDate(new Date(n[0]));
                let end = this.formatDate(new Date(n[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            this.loading = true;
            this.getList(item)
        },
        content(n,o){
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(n!= '') {
                item['content'] = n
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            this.loading = true;
            this.getList(item)
        },
        timeTag(n,o){
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = this.content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(n==-1) {
                let na = [];
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = n
            }
            this.loading = true;
            this.getList(item)
        },
        merchantId(n,o) {
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = this.content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = n
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(n==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = n
            }
            this.loading = true;
            this.getList(item)
        }
    },
    async created(){
        this.getAgentList()
        let ti = setTimeout(async()=>{
            this.options = this.$t('pay_order.options')
            this.coinTypeIdArr[0]=this.$t('pay_order.coinTypeIdArr')[0]
            if(this.user_info.role=='1'){
                if(this.payment_nav.payment_item=='0'){// 如何用户是 商家且导航到 待支付 => 重置 已完成
                    this.initPage('1','1')
                }else{
                    this.initPage(this.payment_nav.payment_item,this.payment_nav.status)
                }
            }else{
                if(this.payment_nav.payment_item=='2'){//如何用户不是商家 且导航到 进行中 => 重置 已完成
                    this.initPage('1','1')
                }else{
                    this.initPage(this.payment_nav.payment_item,this.payment_nav.status)
                }
            }
            let key =await getcoinTypeIdFun(this)
            .then((res) => {
                return res;
            })
            if(key!= false) {
                this.coinTypeIdArr.push(...key);
            }
            clearTimeout(ti)
        },800)
        
    },
    mounted(){
        initTableHeight(this,39)
        this.autoGet()
    },
    beforeDestroy(){
        if(this.workerPay!=null){
            this.workerPay.postMessage(
                'close'
            )
        }
    },
    methods:{
        async getAgentList(){
            let k = await agentMerchantList(this)
            .then((res) => {
                return res;
            })
            if(k) {
                if(k.length==1) {
                    this.dataAgent=k
                    this.merchantId = k[0].id;
                }else{
                    this.dataAgent.push(...k)
                }
            }
        },
        /**
         * 取消订单
         */
        async handleEditCancel(n,row){
            let item = {
                id:row.id
            }
            let key = PayCancelOrderFun(this,item)
            .then((res) =>{
                return res;
            })
            if(key!=false) {
                this.initPage('0','0')
            }
        },
        /**
         * 自动请求
         */
        autoGet(){
            if(this.workerPay!=null){
                this.workerPay.postMessage(
                    'close'
                )
            }
            
            this.workerPay = new Worker()
            this.workerPay.postMessage(
                'getOrder'
            )
            this.workerPay.addEventListener('message',(res)=>{
                this.getPayNum()
            })
        },
        async getPayNum(){
            let key =await PayInNumFun(this)
            .then((res) =>{
                return res;
            })
            if(key!=false) {
                this.num = key.num
            }
        },
        autoTime(t,str){
            if(this.workerPhoneSys!=null){
                this.workerPhoneSys.postMessage(
                    'close'
                )
            }
            
            this.workerPhoneSys = new Worker()
            this.workerPhoneSys.postMessage(
                t
            )
            this.workerPhoneSys.addEventListener('message',(res)=>{
                // console.log(res)
                // this.phoneTime = res.data;
                return res.data
            })
        },
        /**
         * 格式化时间
         */
        fortmatTime(leftTime,length){
            let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                // vm.$emit('time-end')
                return '0'
            }
            if(length){
                return  `${m}:${s}`
            }
            return  `${d}天${h}小时${m}分${s}秒`
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
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
         * 初始化
         */
        initPage(payment_item,status) {
            this.status = status;
            this.loading=true;
            this.tableData=[];
            this.$store.dispatch('_async_set_payment_nav',{payment_item:payment_item,status:status})
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = this.content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
                console.log(na)
            }else{
                item['merchantId'] = this.merchantId
            }
            item['status'] = status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            this.getList(item)
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
        getExcel(){
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = this.pageSize;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            let key = getExcelPay(this,item)
            .then((res) => {
                return res;
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = this.currentPage;
            item['rows'] = val;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            this.loading = true;
            this.getList(item)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let item ={};
            if(this.coinTypeId!='-1'){
                item['coinTypeId'] = this.coinTypeId
            }
            if(this.content!= '') {
                item['content'] = content
            }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start;
                item['endTime'] =end;
            }
            if(this.user_info.role!='1'){
                item['timeTag'] = this.timeTag
            }
            item['status'] = this.status;
            item['page'] = val;
            item['rows'] = this.pageSize;
            if(this.merchantId==-1) {
                let na = [];
                
                if(this.dataAgent.length>1){
                   this.dataAgent.map((te,ide)=>{if(ide>0){na.push(te.id)}})
                }
                item['merchantId'] = na.join(',')
            }else{
                item['merchantId'] = this.merchantId
            }
            this.loading = true;
            this.getList(item)
        },
        /**
         * 变化币种
         */
        getTypeCoin(coinTypeId){
            this.coinTypeId = coinTypeId
        },
        /**
         * 获取列表
         */
        async getList(item){
            let key =await paymentOrderList(this,item)
            .then((res) => {
                return res;
            })
            if(key!= false) {
                this.total=key.data.total
                this.tableData = key.data.list
                this.loading = false;
            }
        },
        async handleEdit(n,row){
            await this.$store.dispatch('_async_set_init_pay_file',row)
            await this.$router.push('/payment-order')
        }
    }
}
</script>

<style lang="scss">
.payment-system{
    background: #F2F2F2;
    .payment-system-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 23rem /* 460/20 */;
        .payment-system-box-img{
            height: 18.5rem /* 370/20 */;
            height: 23rem /* 460/20 */;
            background: url('../../assets/images/payment/payment@2x.jpg') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E6%94%AF%E4%BB%98%E8%AE%A2%E5%8D%95/payment%402x.jpg) no-repeat center center;
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
            top: -6rem;
            height: 55rem /* 1100/20 */;
            background:rgba(255,255,255,1);
            .asset-manage-nac{
                box-sizing: border-box;
                padding: 0 1rem;
                height: 2.5rem /* 50/20 */;
                line-height: 2.5rem;
                border-bottom:1px solid rgba(204,204,204,1);
                .flex-d{
                    display: flex;
                    justify-content: space-between;
                }
                div{
                    height: 2.5rem /* 50/20 */;
                    line-height: 2.5rem;
                    position: relative;
                    span{
                        display: inline-block;
                        width:7rem /* 140/20 */;
                        height: 2.4rem /* 50/20 */;
                        line-height: 2.4rem;
                        text-align: center;
                        font-size:1rem /* 20/20 */;
                        cursor: pointer;
                        vertical-align: bottom;
                        position: relative;
                        color:#666666;
                    }
                    span.oo{
                        background:rgba(76,96,133,1);
                        color:rgba(255,255,255,1);
                    }
                    span.span-active{
                        border-bottom: 2px solid rgba(76,96,133,1);
                        color:#4C6085;
                        font-size: 1rem;
                    }
                    span.span-i{
                        i{
                            position: absolute;
                            display: inline-block;
                            width:1rem /* 20/20 */;
                            height:1rem /* 20/20 */;
                            background:rgba(240,91,95,1);
                            border-radius:50%;
                            line-height: 1rem;
                            text-align: center;
                            color: white;
                            font-size: .4rem;
                        }
                    }
                }
                .merchant-list{
                    max-width: 280px;
                    display: flex;
                    justify-content: space-between;
                    p{
                        font-size: 16px;
                        margin-right: 5px;
                    }
                    span{
                        display: inline-block;
                        width: 1rem;
                        height: 2rem;
                        line-height: 2.3rem;
                        text-align: center;
                        font-size: 1rem;
                        cursor: pointer;
                        vertical-align: bottom;
                        position: relative;
                        color: #666666;
                        position: absolute;
                        padding-right: 13px;
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
            
        }
        @media screen and(max-width: 480px) {
            .asste-management-body{
                height: 61rem;;
            }
        }
        // 搜索信息
        .payment-search{
            box-sizing: border-box;
            height: 2rem;
            padding:0 1rem;
            margin: .5rem 0;
            .el-select{
                width: 10rem;
                input{
                    width: 10rem;
                }
            }
            .el-date-editor{
                 width: 14rem;
                 margin-left: .6rem;
            }
            .el-input{
                margin-left: .5rem;
                width: 20rem /* 400/20 */;
            }
            .el-input:nth-child(1){
                margin-left: 0;
            }
            button{
                width: 6rem /* 120/20 */;
                background: rgba(76, 96, 133, 1);
            }
        }
        @media screen and(max-width: 480px) {
            .payment-search{
                height: 14rem;
                .el-select{
                    width: 100%;
                    input{
                        width: 100%;
                    }
                }
                .el-date-editor{
                    width: 100%;
                    margin-top: 1.2rem;
                    margin-left: 0;
                }
                .el-input{
                    margin-top: 1.2rem;
                    width: 100% /* 400/20 */;
                    margin-left: 0;
                }
                button{
                    display: none;
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
            height: 45rem;
            box-sizing: border-box;
            padding: 0 1rem;
            .head_tab_cell{
                text-align: left;
                box-sizing: border-box;
                color:black;
                background: rgba(230,230,230,1);
            }
            .head_tab_cell:nth-child(1){
                padding-left: .5rem;
            }
            .cell{
                text-align: left;
            }
            // .el-table_4_column_21.is-leaf.head_tab_cell,
            // .el-table_4_column_20.is-leaf.head_tab_cell{
            //     box-sizing: border-box;
            //     padding-left: .5rem;
            // }
            .cointy-box{
                height: 2rem /* 50/20 */;
                background:rgba(242,242,242,1);
                box-sizing: border-box;
                padding: 0 .5rem;
                span{
                    display: inline-block;
                    width: 3rem;
                    height: 2rem;
                    line-height: 2rem;
                    position: relative;
                    text-align: center;
                    color:#999999;
                    cursor: pointer;
                    i{
                        display: inline-block;
                        width: 2px;
                        height: 1rem;
                        background: rgba(153, 153, 153, 1);
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
                span.coinTypeId-active{
                    color:#5C89CC;
                }
                .span-export{
                    width:3.5rem /* 70/20 */;
                    height:1.5rem /* 30/20 */;
                    background:rgba(92,137,204,1);
                    border-radius:.75rem /* 15/20 */;
                    color:white;
                    line-height: 1.5rem;
                    text-align: center;
                    display: inline-block;
                    margin-top: .3rem;
                    cursor: pointer;
                }
            }
        }
    }
    // 专门替 legal-currency-body 占位
    .asste-management-body-static{
        width: 100%;
        height: 55rem /* 1100/20 */;
        background:#F2F2F2;
    }
}
</style>
