<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-11 16:53:27
 -->
<template>
    <div class="market-table">
        <div class="legal-currency-body-bottom">
            <div class="market-show-top">
                <div class="market-in-out left">
                    <span :class="ad_in_out_active=='0'?'market-in-out-active':''" @click="checkAdFun('0')">{{$t('ad_table.in')}}</span>
                    <span :class="ad_in_out_active=='1'?'market-in-out-active':''" @click="checkAdFun('1')">{{$t('ad_table.out')}}</span>
                </div>
                <div class="market-auto right">
                    <span>
                        <el-checkbox v-model="checked" @change="changeRefresh">{{$t('ad_table.fresh')}}</el-checkbox>
                        <i class="el-icon-refresh" @click="refresh" ref="refresh" :class="animation"></i>
                    </span>
                </div>
            </div>
            <div class="market-table-t">
                <el-table
                :row-class-name="tableRowClassName"
                :header-cell-class-name="head_tab_cell"
                v-loading="loading"
                :data="table"
                id="adTable"
                style="width: 100%;height:28rem;">
                    <el-table-column
                        :label="$t('ad_table.table.name')"
                        >
                        <template slot-scope="scope">
                            <div class="one">
                                <div class="img">
                                    <img @click="goDe(scope.row)" :class="imgArr[Math.floor((Math.random()*imgArr.length))]" src="" alt="" 
                                    :data-name="(scope.row.userName).slice(0,1)"><i :class="scope.row.online?'inline':'unline'"></i>
                                </div>
                                <span style="">{{scope.row.userName}}</span>
                                <!-- <el-tooltip content="点击发起对话" effect="light">
                                <span @click="bus.$emit('chat_connect',scope.row)" style="margin-left: 0.5rem;color:#445E93;font-weight:bold;font-family:'PingFang-SC-Bold';white-space:nowrap;cursor:pointer;">
                                    {{ scope.row.userName }}&nbsp;<template v-if="scope.row.orderCount">({{scope.row.orderCount}})</template></span>
                                </el-tooltip> -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="信用"
                        v-if="false"
                        >
                        <template slot-scope="scope">
                            <div class="">
                                <span style="">{{scope.row.creditRatio}}%</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ad_table.table.limit')">
                        <template slot-scope="scope">
                            <div class="">
                                <span style="">{{scope.row.minAmount}}-{{scope.row.maxAmount}} {{scope.row.tradeCoinType}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ad_table.table.pay_way')">
                        <template slot-scope="scope">
                            <div class="two" v-show="scope.row.payWayType==0">
                                <p v-show="scope.row.bankcardOn"><img src="../assets/images/legal-currency/bank@2x.png" alt=""></p>
                                <p v-show="scope.row.alipayOn"><img src="../assets/images/legal-currency/ali@2x.png" alt=""></p>
                                <p v-show="scope.row.wechatPayOn"><img src="../assets/images/legal-currency/wx@2x.png" alt=""></p>
                            </div>
                            <div class="two" v-show="scope.row.payWayType==1">
                                 <span style="color:rgba(76,96,133,1);font-size:.8rem;">{{scope.row.cardName}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ad_table.table.price')">
                        <template slot-scope="scope">
                            <div class="">
                                <span style="">{{scope.row.price}} {{scope.row.tradeCoinType}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ad_table.table.discount')"
                        v-if="childAd.payWayType==1"
                        >
                        <template slot-scope="scope">
                            <div class="">
                                <span style="">{{scope.row.salePrice}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('ad_table.table.operate')">
                        <template slot-scope="scope">
                            <div class="buy">
                                <span style="" @click="placeOrderFun(ad_in_out_active,scope.row)" :class="ad_in_out_active=='0'?'':'out'">{{ad_in_out_active=='0'?$t('ad_table.row.in'):$t('ad_table.row.out')}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :childPagination="setPagination"></pagination>
            </div>
        </div>
        <place-order></place-order>
        <pop-authen v-show="hackReset" :childProp="childP" ref="mei"></pop-authen>
        <el-dialog
        :title="$t('info_item.prompt')"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>{{$t('info_item.no_login')}}</span>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button class="primary_te" @click="goLogin">{{$t('info_item.login')}}</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import PlaceOrder from './PlaceOrder.vue'
import PopAuthen from './PopupsAuthen.vue'
import qs from 'qs'
export default {
    components:{
        'pagination': Pagination,
        'place-order': PlaceOrder,
        'pop-authen':PopAuthen,
    },
    data () {
        return {
            dialogVisible:false,
            loading:true,
            ad_in_out_active:'',//0买入  1卖出
            checked:this.$store.getters.table_refresh,
            animation:'',
            can_refresh:true,
            head_tab_cell:'head_tab_cell',
            setPagination:{},
            // 
            hackReset:false,
            num:0,
            box_info_pop:false,
            imgArr:['one','two','three','four','five','six'],
            lang:window.localStorage.getItem('localeLanguage') || 'zh',
            childP:'no',
            payList:'',
        }
    },
    created(){
        /**
         * 初始化一次广澳
         */
        this.ad_in_out_active = '0',
        this.getAdFun({coinTypeId:this.childAd.coinTypeId,type:this.ad_in_out_active,countryInfoId:this.childAd.countryInfoId})
        this.setPagination = Object.assign({},this.setPagination,{coinTypeId:this.childAd.coinTypeId,type:this.ad_in_out_active,countryInfoId:this.countryInfoId})
    },
    computed:{
        table(){
            if(this.$store.getters.table.data){
                return this.$store.getters.table.data.list
            }else{
                return []
            }
            
        },
        user_info(){
            return this.$store.getters.user_info;
        },
        login() {
            return this.$store.getters.login;
        }
        
    },
    mounted(){
        this.initTableHeight()
    },
    watch:{
        childAd(n,o) {
            let ob = {
                type:this.ad_in_out_active,...n
            }
            
            this.getAdFun(ob)
            // this.getAdFun({coinTypeId:n.coinTypeId,type:this.ad_in_out_active,countryInfoId:n.countryInfoId})
            // this.setPagination = Object.assign({},this.setPagination,{coinTypeId:n.coinTypeId,type:this.ad_in_out_active})//往上
        },
        ad_in_out_active(n,o){
            let ob = {
                type:n,...this.childAd
            }
            
            this.getAdFun(ob)
            // this.getAdFun({coinTypeId:this.childAd.coinTypeId,type:n,countryInfoId:this.childAd.countryInfoId})
            // this.setPagination = Object.assign({},this.setPagination,{coinTypeId:n.coinTypeId,type:this.ad_in_out_active})
        }
    },
    methods:{
        goLogin() {
            this.dialogVisible = false
            this.$router.push('/sign-in')
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        goDe(item) {
            console.log(1111111111111111111111)
            this.$router.push({name:'CurrencyDealer',params:{id:item.userId}})
        },
        /**
         * 根据不同币种 不同行为 获取广告
         */
        getAdFun(item){
            console.log('获取所有广澳',item)
            // this.setPagination = Object.assign({},this.setPagination,item)
            this.setPagination =  item
            setTimeout(()=>{
                this.can_refresh = true;
                this.animation = '';
            },5000)
        },
        /**
         * 买入还是卖出
         */
        checkAdFun(str){
            this.ad_in_out_active = str;
        },
        /**
         * 改变刷新数据的方式
         */
        changeRefresh(n){
            let table_refresh = n;
            this.$store.dispatch({
                type:'_async_set_table_refresh',
                table_refresh
            })
        },
        /**
         * 刷新数据
         */
        refresh(){
            if(this.can_refresh){
                this.can_refresh = false;
                this.animation = 'animation'
                this.getAdFun({coinTypeId:this.childAd.coinTypeId,type:this.ad_in_out_active,countryInfoId:this.childAd.countryInfoId})
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
         * 初始化表格高度
         */
        initTableHeight(){
            let dom = document.getElementById('adTable')
            dom = document.getElementsByClassName('el-table__body-wrapper')[0]
            dom.style.height= '25rem';
            dom.style.overflowY= 'auto';
        },
        /**
         * 买入卖出弹框数据
         */
        async placeOrderFun(type,item) {
            if(!this.login) {
                this.dialogVisible = true;
                return false;
            }
            
            console.log("选中操作项目",type,item)
            if(item.isBuy==1){ //买入
                this.childP = item.payWayType==0 ?'adtable':'adtable_gift'
                // this.childP = 'adtable'
                this.hackReset = true;
                this.$refs.mei.box_info = true;
            }else{
                // this.childP = item.payWayType==0 ? 'adtop':'adtop_gift'
                this.childP = item.payWayType==0 ? 'adtop':'adtop_gift'
                // this.childP = 'adtop'
                await this.axios.post('/receiptWay/list',qs.stringify({status:1,countryInfoId:this.childAd.countryInfoId}))
                .then((res)=>{
                    let data = res.data;
                    this.payList = data.data
                    // if(data.code == 200) {
                    //     this.payList = data.data
                    // }else{
                    //     this.loading = false;
                    //     this.$message({
                    //         type:'error',
                    //         message:data.message
                    //     })
                    // }
                    if(this.payList.length>0){
                        
                    }else{
                        console.log(this.payList)
                        this.hackReset = true;
                        setTimeout(()=>{
                            this.$refs.mei.box_info = true;
                        },20)
                    }
                }).catch((res) => {
                    this.$message({
                            type:'error',
                            message:'初始化收款地址失败！',
                        })
                })
            }
            if(await this.initBox(item)){
                if(this.childP=='adtable_gift') {
                // if(this.childP=='adtable_gift' || this.childP=='adtop_gift') {
                    let obj = {
                        status:'1',
                        io:type,
                        item:item
                    }
                    this.$store.dispatch('_async_set_place_order',obj)
                }else if(this.childP=='adtop_gift'){
                    let obj = {
                        status:'1',
                        io:type,
                        item:item
                    }
                    this.$store.dispatch('_async_set_place_order',obj)
                }
            }else{
                let obj = {
                    status:'1',
                    io:type,
                    item:item
                }
                this.$store.dispatch('_async_set_place_order',obj)
            }
           
        },
        initBox(item){
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
            
            // if(!this.$store.state.ifPayPassword =='1') {
            //     k+=1
            // }
            if(item.isBuy==0) {
                if(!this.$store.state.ifPayPassword =='1') {
                    k+=1
                }
            }else{
                
            }
            if(k==1) {
            }else if(k ==2 ){
            }else if (k==3) {
            }else if (k ==0 ){
                this.box_info_pop  =false;
            }
            if(item.isBuy==0){
                console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu',this.payList.length)
                if(this.payList.length>0){
                    // this.box_info_pop = true;
                    console.log('999999999999999999999999999999999999999999')
                    return false
                }else{
                    // this.box_info_pop = false;
                    return true
                }
            }else{
                return this.box_info_pop
            }
        },
    },
    props:[
        'childAd'
    ]
}
</script>

<style lang="scss">
.market-table{
    .el-dialog__wrapper{
        padding-top: 20%!important;
        box-sizing: border-box!important;
    }
    .el-dialog{
        margin-top: 0px!important;
        .el-dialog__body{
            span{
                font-size: .8rem /* 16/20 */;
            }
        }
        .primary_te{
            background: #5c89cc;
            color: white;
            border-color: #5c89cc;
            &:hover{
                 background: #68A5FF;
                border-color: #68A5FF;
            }
        }
        
    }
    .legal-currency-body-bottom{
        // margin-top: 1.5rem /* 30/20 */;
        .market-show-top{
            height: 2.5rem /* 50/20 */;
            background:rgba(242,242,242,1);
            .market-in-out{
                height: 2.5rem;
                font-size: .9rem /* 18/20 */;
                box-sizing: border-box;
                padding-left: .3rem;
                span{
                    display: inline-block;
                    height: 2.5rem;
                    width: 5.5rem;
                    font-weight: 700;
                    line-height: 2.5rem;
                    color:rgba(153, 153, 153, 1);
                    cursor: pointer;
                }
                span.en_font{
                    font-size: .9rem;
                }
                span.market-in-out-active{
                    color:rgba(76,96,133,1);
                }
            }
            .market-auto{
                height: 2.5rem;
                font-size: .9rem /* 18/20 */;
                span{
                    display: inline-block;
                    line-height: 2.5rem;
                    cursor: pointer;
                    i{
                        margin-left: .5rem;
                        margin-right: .5rem;
                        // transition: all 2s infinite;
                    }
                    i.animation{
                        // transition: 20s;
                        animation:xunzhuan 2s infinite;
                        color: #3a8ee6;
                    }
                    @keyframes xunzhuan {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(-360deg);
                        }
                    }
                }
            }
        }
    }
    .market-table-t{
        .one{
            .img{
                display: inline-block;
                width: 2.5rem /* 50/20 */;
                height: 2.5rem;
                margin-right: .3rem;
                position: relative;
                img{
                    display: inline-block;
                    width: 2.5rem /* 50/20 */;
                    height: 2.5rem;
                    background:rgba(24,38,77,1);
                    border-radius:1.25rem /* 25/20 */;
                    cursor: pointer;
                }
                img.one{
                    background: #8797af;
                }
                img.two{
                    background: #f66965;
                }
                img.three{
                    background: #81b29a;
                }
                img.four{
                    background: #2e294e;
                }
                img.five{
                    background: #247ba0;
                }
                img.six{
                    background: rgba(24,38,77,1);
                }
                i.inline{
                    position: absolute;
                    bottom: .13rem /* 10/20 */;
                    right: .13rem;
                    display: inline-block;
                    width: .5rem /* 10/20 */;
                    height: .5rem /* 10/20 */;
                    border-radius: .25rem /* 5/20 */;
                    background: rgba(36,175,65,1);
                }
                i.unline{
                    position: absolute;
                    bottom: .13rem /* 10/20 */;
                    right: .13rem;
                    display: inline-block;
                    width: .5rem /* 10/20 */;
                    height: .5rem /* 10/20 */;
                    border-radius: .25rem /* 5/20 */;
                    background: rgba(153,153,153,1);
                }
            }
            img::after{
                content: attr( data-name ) "";
                width: 2.5rem /* 50/20 */;
                height: 2.5rem;
                position: absolute;
                z-index: 120;
                color: white;
                text-align: center;
                line-height: 2.5rem;
            }
            span{
                color:rgba(68, 94, 147, 1);
            }
        }
        .two{
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
        .buy{
            span{
                display: inline-block;
                text-align: center;
                width: 3.5rem /* 70/20 */;
                height: 1.5rem /* 30/20 */;
                line-height: 1.5rem;
                background:rgba(76,96,133,1);
                border-radius:.25rem /* 5/20 */;
                color:rgba(255,255,255,1);
                cursor: pointer;
            }
            span.out{
                background:#229C89;
            }
        }
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
    }
}
</style>
