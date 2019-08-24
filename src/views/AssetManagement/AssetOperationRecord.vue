<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-06-25 15:07:46
 -->
<template>
    <div class="asset-operation-record">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="asset-operation-record-box">
            <div class="banxin">
                <div class="nac-nav">
                    <span @click="$router.push('/asset-manage')">{{$t('asset_record.nav_asset')}}</span> <span> > </span> <span>{{$t('asset_record.nav_one')}}</span>
                </div>
            </div>
        </div>
        <div class="asset-management-body">
            <div class="banxin">
                <div class="asset-management-body-box">
                    <div class="nav">
                        <span style="margin-right:.2rem;">{{$t('asset_record.coin')}}</span>
                        <el-select v-model="coinTypeId" placeholder="请选择"><el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-date-picker
                            v-model="time"
                            class="right"
                            type="datetimerange"
                            :range-separator="$t('info_item.to')"
                            :start-placeholder="$t('info_item.start_time')"
                            :end-placeholder="$t('info_item.end_time')">
                        </el-date-picker>
                    </div>
                    <div class="top">
                        <h3>{{$t('asset_record.record')}}</h3> 
                        <span v-for="(item,key) in operationTypes" :key="key" 
                        :class="item.value==operationOne?'span-select':''"
                            @click="changeOperation(item.value)"
                         >{{item.label}}</span>

                         <span class="span-export right" 
                         @click="exportFun"
                         >{{$t('info_item.export')}}</span>
                    </div>
                    <div class="asset-management-table">
                        <el-table
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="head_tab_cell"
                        :data="table"
                        id="adTable"
                        style="width: 100%;height:28rem;">
                            <el-table-column
                                :label="$t('asset_record.time')"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <div class="one">
                                        <span style="padding-left:.6rem;">{{operationOne=='0'||operationOne=='1' ?scope.row.time:scope.row.time}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- v-if="=='-1'" -->
                            <el-table-column
                            v-if="operationOne=='-1'"
                                :label="$t('asset_record.opreate_type')"
                                >
                                <template slot-scope="scope">
                                    <div class="one">
                                        <span style="">{{operationOne=='0'||operationOne=='1' ?scope.row.time:scope.row.time}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- v-if="!='-1'" -->
                            <el-table-column
                            v-if="operationOne!='-1'"
                            width="100"
                                :label="$t('asset_record.coin')">
                                <template slot-scope="scope">
                                    <div class="">
                                        <span style="">{{operationOne=='0'||operationOne=='1' ?scope.row.coinName:scope.row.coinType}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="180"
                                :label="$t('asset_record.amount')"
                                >
                                <template slot-scope="scope">
                                    <div class="">
                                        <span style="">{{operationOne=='0'||operationOne=='1' ?(operationOne=='0'?'+'+scope.row.qty:'-'+scope.row.qty):(operationOne=='3'?'-'+scope.row.amount:'+'+scope.row.amount)}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- v-if="operationOne=='-1' ||operationOne =='3' ||operationOne =='2'" -->
                            <el-table-column
                                :label="$t('asset_record.fee')"
                                >
                                <template slot-scope="scope">
                                    <div class="">
                                        <span style="">{{operationOne=='0'||operationOne=='1' ?scope.row.fee:scope.row.handingFree}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- v-if="=='-1' || =='0' || =='1'" -->
                            <el-table-column
                            v-if="operationOne=='-1' || operationOne=='0' || operationOne=='1'"
                            width="100"
                                :label="$t('asset_record.status')"
                                >
                                <template slot-scope="scope">
                                    <div class="">
                                        <span v-show="scope.row.operationType =='0'">{{scope.row.status=='0'?'成功':(scope.row.status=='1'?'处理中':'失败')}}</span>
                                        <span v-show="scope.row.operationType =='1'">{{scope.row.status=='0'?'审核中':(scope.row.status=='1'?'处理中':(scope.row.status=='2'?'成功':'失败'))}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                             <!-- v-if="=='0' || =='1'" -->
                            <el-table-column
                            v-if="operationOne=='0' || operationOne=='1'"
                                :label="$t('asset_record.address')">
                                <template slot-scope="scope">
                                    <span>{{operationOne=='0'||operationOne=='1' ?scope.row.address:scope.row.address}}</span>
                                    <span class="address_type" v-show="scope.row.coinTypeId!=1">{{scope.row.type}}</span>
                                </template>
                            </el-table-column>
                            <!-- v-if="=='0' || =='1'" -->
                            <el-table-column
                            v-if="operationOne=='0' ||operationOne =='1'"
                                :label="$t('asset_record.txid')">
                                <template slot-scope="scope">
                                    <span>{{operationOne=='0'||operationOne=='1' ?scope.row.txId:scope.row.txId}}</span>
                                </template>
                            </el-table-column>
                            <!-- v-if="=='3' || =='2'" -->
                            <el-table-column
                            v-if="operationOne=='3' || operationOne=='2'"
                                :label="$t('asset_record.reciprocal_account')">
                                <template slot-scope="scope">
                                    <div class="">
                                        <span style="">{{operationOne=='0'||operationOne=='1' ?scope.row.username:scope.row.username}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
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
            </div>
        </div>
    </div>

</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {getcoinTypeIdFun,initTableHeight,getWithdrawList,transferInnerFun ,
exportExcelLegalOut,exportExcelLegalIn,exportExcelTransferFun} from '../../assets/js/api.js'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            head_tab_cell:'head_tab_cell',
            coinTypeId:'-1',
            table:[],
            options:[
                
            ],
            operationOne:'',
            operationTypes:[
                // {
                //     value:'-1',
                //     label:'所有',
                // },
                {
                    value:'0',
                    label:'充币',
                },
                {
                    value:'1',
                    label:'提币',
                },
                {
                    value:'2',
                    label:'内部转入',
                },
                {
                    value:'3',
                    label:'内部转出',
                }
            ],
            currentPage:1,
            pageSize:100,
            total:0,
            time:null,
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        },
    },
    watch:{
        lang(n, o) {
            this.options[0] = this.$t('asset_record.options')[0]
            this.operationTypes = this.$t('asset_record.operationTypes')
        },
        coinTypeId(n,o) {
            let item = {}
            if(this.operationOne=='0' || this.operationOne=='1'){
                if(n!='-1') {
                    item['coinTypeId'] =n;
                }
                item['queryType'] = this.operationOne;
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getBiList(item)
            }else{
                
                if(n!='-1') {
                    item['coinTypeId'] =n;
                }
                item['tag'] = this.operationOne=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getTransfer(item)
            }
        },
        time(n,o) {
            let item = {}
            if(this.operationOne=='0' || this.operationOne=='1'){
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['queryType'] = this.operationOne;
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(n!= null) {
                    let start = this.formatDate(new Date(n[0]));
                    let end = this.formatDate(new Date(n[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getBiList(item)
            }else{
                
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['tag'] = this.operationOne=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(n!= null) {
                    let start = this.formatDate(new Date(n[0]));
                    let end = this.formatDate(new Date(n[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                console.log('123423453',item)
                this.getTransfer(item)
            }
        },
        operationOne(n,o){
            let item = {};
            if(n=='0' || n=='1'){
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['queryType'] = n;
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getBiList(item)
            }else{
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['tag'] = n=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getTransfer(item)
            }
            
        }
    },
    mounted(){
        initTableHeight();
    },
    async created(){
        this.options[0] = this.$t('asset_record.options')[0]
        this.operationTypes = this.$t('asset_record.operationTypes')
        let key =await getcoinTypeIdFun(this)
        .then((res) => {
            return res;
        })
        if(key!=false) {
            this.options.push(...key);
            // this.coinTypeId = key[0].value;
        }
        await this.changeOperation('0')
        let item = {};
        if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
        item['queryType'] = '0';
        item['page'] = this.currentPage;
        item['rows'] = this.pageSize;
        this.getBiList(item)
    },
    methods:{
        /**
         * 导出
         */
        exportFun(){
            let item = {
                
            }
            if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
            if(this.time!= null) {
                let start = this.formatDate(new Date(this.time[0]));
                let end = this.formatDate(new Date(this.time[1]));
                item['startTime'] = start+'';
                item['endTime'] =end+'';
            }
            let key ;
            if(this.operationOne=='0'){
                key = exportExcelLegalIn(this,item)
                .then((res) => {
                    return res;
                })
            }else if(this.operationOne =='1'){
                key = exportExcelLegalOut(this,item)
                .then((res) => {
                    return res;
                })
            }else if(this.operationOne=='2'){
                item['tag'] = '0'
                key = exportExcelTransferFun(this,item)
                .then((res) => {
                    return res;
                })
            }else if(this.operationOne=='3'){
                item['tag'] = '1'
                key = exportExcelTransferFun(this,item)
                .then((res) => {
                    return res;
                })
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
        changeOperation(value){
            this.operationOne=value
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
            let item ={};
            if(this.operationOne=='0' || this.operationOne=='1'){
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['queryType'] = this.operationOne=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = val;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getBiList(item)
            }else{
                let item ={};
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['tag'] = this.operationOne=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = val;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getTransfer(item)
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            if(this.operationOne=='0' || this.operationOne=='1'){
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['queryType'] = this.operationOne=='2'?'0':'1';
                item['page'] = this.currentPage;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getBiList(item)
            }else{
                if(this.coinTypeId!='-1') {
                    item['coinTypeId'] =this.coinTypeId;
                }
                item['tag'] = this.operationOne=='2'?'0':'1';
                item['page'] = val;
                item['rows'] = this.pageSize;
                if(this.time!= null) {
                    let start = this.formatDate(new Date(this.time[0]));
                    let end = this.formatDate(new Date(this.time[1]));
                    item['startTime'] = start+'';
                    item['endTime'] =end+'';
                }
                this.getTransfer(item)
            }
        },
        /**
         * 获取充提币
         */
        async getBiList(item){
            let key =await getWithdrawList(this,item)
            .then((res) =>{
                return res
            })
            if(key!=false) {
                this.table = key.data.list
                this.total = key.data.total
            }
        },
        /**
         * 内部划转
         */
        async getTransfer(item){
            let key =await transferInnerFun(this,item)
            .then((res) =>{
                return res
            })
            if(key!=false) {
                this.table = key.data.list
                this.total = key.data.total
            }
        }
    }
}
</script>

<style lang='scss'>
.asset-operation-record{
    .el-table_1_column_1.is-leaf.head_tab_cell{
        padding-left: .6rem;
    }
    .asset-operation-record-box{
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
    .asset-management-body{
        width: 100%;
        height: 18rem /* 960/20 */;
        background:rgba(255,255,255,1);
        margin-top: 1rem;
        .asset-management-body-box{
            .nav{
                height: 1.5rem /* 30/20 */;
                // line-height: 2.25rem /* 45/20 */;
                font-size: .8rem /* 16/20 */;
                margin: .8rem 0;
                .el-select{
                    width: 6.5rem /* 130/20 */;
                    height: 1.5rem;
                    span{
                         height: 1.5rem;
                        i{
                            height: 1.5rem;
                            line-height: 1.5rem;
                        }
                    }
                }
                .el-date-editor{
                    height: 1.5rem;
                    input{
                        height: 1.4rem;
                    }
                    span{
                        height: 1.5rem;
                        line-height: 1.5rem;
                    }
                    i{
                        height: 1.5rem;
                        line-height: 1.5rem;
                    }
                }
                input{
                    height: 1.5rem;
                }
            }
            @media screen and(max-width: 480px){
                .nav{
                    height: 4.5rem;
                    .el-date-editor{
                        height: 1.7rem;
                        margin-top: 1.2rem;
                        width: 100%;
                    }
                }
                .top{
                    span{
                        width:4.5rem!important;
                        margin:0 .5rem!important;
                    }
                }
            }
            .top{
                background: RGBA(242, 242, 242, 1);
                box-sizing: border-box;
                padding: 0 1rem;
                h3 {
                    line-height: 2.5rem /* 50/20 */;
                    display: inline-block;
                }
                span{
                    // line-height: 2.5rem /* 50/20 */;
                    display: inline-block;
                    // width: 6rem /* 80/20 */;
                    font-size: .8rem /* 16/20 */;
                    text-align: center;
                    margin: 0 1rem;
                    height: 1.5rem;
                    line-height: 1.4rem;
                    // width: 4rem;
                    box-sizing: border-box;
                    padding: 0 .6rem;
                    cursor: pointer;
                    box-sizing: border-box;
                }
                span.span-select{
                    border:1px solid rgba(92, 137, 204, 1);
                    color:#4C6085;
                    // padding: .2rem .4rem;
                    border-radius:.15rem /* 3/20 */;
                }
                span.span-export{
                    width:3.5rem /* 70/20 */;
                    height:1.5rem /* 30/20 */;
                    background:rgba(92,137,204,1);
                    border-radius:.75rem /* 15/20 */;
                    color:white;
                    line-height: 1.5rem;
                    text-align: center;
                    margin-top: .55rem;
                }
            }
            .asset-management-table{
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
                .head_tab_cell:nth-child(1){
                    padding-left: .5rem;
                }
                .address_type{
                    width:2.5rem /* 50/20 */;
                    height:1rem;
                    border:1px solid rgba(92,137,204,1);
                    border-radius:2px;
                    color: #5C89CC;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .body-top-nav{
            height: 3.95rem /* 79/20 */;
            
        }
        
    }
}
</style>
