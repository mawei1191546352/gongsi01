<template>
<!-- 广告 -->
    <div class="market-top">
        <div class="legal-currency-body-center outer">
            <div class="legal-center outer left">
                <div class="market_one outer left" :class="custome==false?'market_one_te':''">
                    <!-- <div class="market_one_left left"> -->
                    <div class="market_one_left">
                        <h3>{{$t('ad_top.price')}}：{{topAdIn.price}} {{topAdIn.tradeCoinType}}</h3>
                        <p :class="topAdIn.payWayType==1?'gift':''">{{$t('ad_top.limit')}}：<span>{{topAdIn.minAmount}}</span> - <span>{{topAdIn.maxAmount}}</span> {{topAdIn.tradeCoinType}}</p>
                        <div class="pay-way" v-show="topAdIn.payWayType==0">{{$t('ad_top.pay_way')}}：
                            <p v-show="topAdIn.bankcardOn"><img src="../assets/images/legal-currency/bank@2x.png" alt=""></p>
                            <p v-show="topAdIn.alipayOn"><img src="../assets/images/legal-currency/ali@2x.png" alt=""></p>
                            <p v-show="topAdIn.wechatPayOn"><img src="../assets/images/legal-currency/wx@2x.png" alt=""></p>
                        </div>
                        <div class="pay-way pay-way-name" v-show="topAdIn.payWayType==1">
                            <span class="one">{{$t('ad_top.pay_way')}}：</span>
                            <span style="color:rgba(76,96,133,1);font-size:.8rem;">{{topAdIn.cardName}}</span>
                        </div>
                    </div>
                    <!-- <div class="market_one_right right" @click="placeOrderFun('0',topAdIn)"> -->
                    <div class="market_one_right" @click="placeOrderFun('0',topAdIn)">
                        {{$t('ad_top.buy')}}
                    </div>
                </div>
                <div class="market_one right" :class="custome==false?'market_one_te':''">
                    <!-- <div class="market_one_left left"> -->
                    <div class="market_one_left">
                        <h3>{{$t('ad_top.price')}}：{{topAdOut.price}} {{topAdOut.tradeCoinType}}</h3>
                        <p :class="topAdIn.payWayType==1?'gift':''">{{$t('ad_top.limit')}}：<span>{{topAdOut.minAmount}}</span> - <span>{{topAdOut.maxAmount}}</span> {{topAdOut.tradeCoinType}}</p>
                        <div class="pay-way" v-show="topAdOut.payWayType==0">{{$t('ad_top.pay_way')}}：
                            <p v-show="topAdOut.bankcardOn"><img src="../assets/images/legal-currency/bank@2x.png" alt=""></p>
                            <p v-show="topAdOut.alipayOn"><img src="../assets/images/legal-currency/ali@2x.png" alt=""></p>
                            <p v-show="topAdOut.wechatPayOn"><img src="../assets/images/legal-currency/wx@2x.png" alt=""></p>
                        </div>
                        <div class="pay-way pay-way-name" v-show="topAdOut.payWayType==1">
                            <span class="one">{{$t('ad_top.pay_way')}}：</span>
                            <span style="color:rgba(76,96,133,1);font-size:.8rem;">{{topAdOut.cardName}}</span>
                        </div>
                    </div>
                    <!-- <div class="market_one_right one2 right"  @click="placeOrderFun('1',topAdOut)"> -->
                    <div class="market_one_right one2"  @click="placeOrderFun('1',topAdOut)">
                        {{$t('ad_top.sell')}}
                    </div>
                </div>
            </div>
            <div class="legal-center-right right" v-show="custome">
                <p class="order_p" @click="$router.push('/my-legal-order-list')" @mouseenter="point_hover=true;" @mouseleave="point_hover=false">{{$t('ad_top.my_order')}}
                 <i v-show="point"></i> <span :class="lang=='en'?'en_font':''" v-show="point&&point_hover">{{$t('ad_top.youhave')}}{{inOrder}}{{$t('ad_top.order_no')}}</span></p>
                 <!--  v-show="point&&point_hover" -->
                <p class="ad_p" @click="$router.push('/my-advertisements')" v-show="user_info.isCoiner=='1'">{{$t('ad_top.my_ad')}}</p>
                <p class="send_ad" @click="goPub" v-show="user_info.isCoiner=='1'">{{$t('ad_top.my_release')}}</p>
            </div>
        </div>
        <pop-authen v-show="hackReset" :childProp="childP" ref="ni"></pop-authen>
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
import { getAdTopFun, getcoinTypeIdFun,legalOrderTradeingFun } from '../assets/js/api.js'
import Worker from '../assets/js/worker'
import PopAuthen from './PopupsAuthen.vue'
import qs from 'qs'
export default {
    components:{
        'pop-authen':PopAuthen,
    },
    data() {
        return {
            dialogVisible:false,
            topAdIn:{},
            topAdOut:{},
            coinTypeIdArr:[],
            point:false,
            inOrder:'',
            point_hover:false,
            workerAdTop:null,
            // 
            hackReset:false,
            num:0,
            box_info_pop:false,
            // lang:window.localStorage.getItem('localeLanguage') || 'zh',
            // lang:this.$i18n.locale,
            payList:'',
            childP:'no',
        }
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        },
        custome() {
            return this.$store.getters.custome;
        },
        login() {
            return this.$store.getters.login;
        },
        lang() {
            return this.$i18n.locale;
        }
    },
    async created(){
        let key = await getcoinTypeIdFun(this)
        .then((res) => {
            return res;
        })
        if(key!=false) {
            this.coinTypeIdArr = key;
        }
        // await this.init_data({coinTypeId:this.childAd.coinTypeId,countryInfoId:this.childAd.countryInfoId})
        await this.init_data({...this.childAd})

        // 是否有订单
        this.autoTime()
        // 
        if(this.custome) {
            this.initPersonal()
        }
    },
    watch:{
        childAd(n,o) {
            console.log("推荐",n)
            let ob = {
                type:this.ad_in_out_active,...n
            }
            
            this.init_data(ob)
            // this.init_data({coinTypeId:n.coinTypeId,countryInfoId:n.countryInfoId})
        },
        childTop(n, o) {
            console.log(n,'--------------------------------------------')
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
        },
        /**
         * 初始化收款方式
         */
        init_pay(){
            this.axios.post('/receiptWay/list',qs.stringify({status:1}))
            .then((res)=>{
                let data = res.data;
                if(data.code == 200) {
                    this.payList = data.data
                }else{
                    this.loading = false;
                    this.$message({
                        type:'error',
                        message:data.message
                    })
                }
                if(this.payList.length>0){
                    this.$router.push('/publish-advertisements')
                }else{
                    console.log(this.payList)
                    this.childP = 'adtop';
                    this.hackReset = true;
                    setTimeout(()=>{
                            this.$refs.ni.box_info = true;
                        },20)
                }
            }).catch((res) => {
                this.$message({
                        type:'error',
                        message:'初始化收款地址失败！',
                    })
            })
        },
        goPub(){
            this.init_pay()
            
        },
        /**
         * 初始化对应币种的广告
         */
        async init_data(item){
            console.log('置顶广告页',item)
            let num = item.coinTypeId
            if(num==undefined) {
                return false
            }
            let ob = {
                coinTypeId:num,
                isBuy:'0',
                countryInfoId:item.countryInfoId,
            }
            if(item.payWayType) {
                ob['payWayType'] = item.payWayType
            }
            if(item.otcTradeCurrencyId) {
                ob['otcTradeCurrencyId'] = item.otcTradeCurrencyId
            }
            if(item.giftCardId) {
                ob['giftCardId'] = item.giftCardId
            }
            if(item.receiptWayTypes) {
                ob['receiptWayTypes'] = item.receiptWayTypes
            }
            let k = await getAdTopFun(this,ob).then((res) => {
                return res;
            })
            if(k!=false|| (k instanceof Array)) {
                this.topAdIn = k[0]?k[0]:[];
            }
            ob.isBuy = '1'
            let k2 = await getAdTopFun(this,ob).then((res) => {
                return res;
            })
            if(k2!=false ||  (k2 instanceof Array)) {
                this.topAdOut =k2[0]? k2[0] :[]
            }
        },
        /**
         * 买入卖出弹框数据
         */
        async placeOrderFun(type,item) {
            // console.log("选中操作项目",type,item)
            // let obj = {
            //     status:'1',
            //     io:type,
            //     item:item
            // }
            // this.$store.dispatch('_async_set_place_order',obj)
            // this.childP = 'adtable';
            if(!this.login) {
                this.dialogVisible = true;
                return false;
            }
            if(Array.isArray(item)){
                return false;
            }
            if(item.isBuy==1){ //买入
                // this.childP = 'adtable'
                this.childP = item.payWayType==0 ?'adtable':'adtable_gift'
                this.hackReset = true;
                this.$refs.ni.box_info = true;
            }else{
                this.payList = '';
                // this.childP = 'adtop'
                this.childP = item.payWayType==0 ? 'adtop':'adtop_gift'
                await this.axios.post('/receiptWay/list',qs.stringify({status:1,countryInfoId:this.childAd.countryInfoId}))
                .then((res)=>{
                    let data = res.data;
                    this.payList = data.data
                    console.log(1666666666666666666666666666666666,this.payList.length > 0)
                    if(this.payList.length>0){
                        
                    }else{
                        this.hackReset = true;
                        setTimeout(()=>{
                            this.$refs.ni.box_info = true;
                        },20)
                        
                    }
                }).catch((res) => {
                    // this.$message({
                    //         type:'error',
                    //         message:'初始化收款地址失败！',
                    //     })
                    console.log(res)
                })
            }
            
            console.log("选中操作项目",type,item)
            if(await this.initBox(item)){
                console.log('==============================================',this.hackReset,this.childP)
                // if(this.childP=='adtable_gift' || this.childP=='adtop_gift') {
                if(this.childP=='adtable_gift') {
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
                }else{
                    this.hackReset = true;
                        setTimeout(()=>{
                            this.$refs.ni.box_info = true;
                        },20)
                }
            }else{
                console.log(2222222222222222222222222222222222)
                let obj = {
                    status:'1',
                    io:type,
                    item:item
                }
                
                if(item.payWayType=='0') {
                    if(this.user_info.identityAuthStatus!='2'){
                        return false;
                    }
                }else{
                    
                }
                this.$store.dispatch('_async_set_place_order',obj)
            }
        },
        /**
         * 定时器
         */
        autoTime(){
            if(this.workerAdTop!=null){
                this.workerAdTop.postMessage(
                    'close'
                )
            }
            
            this.workerAdTop = new Worker()
            this.workerAdTop.postMessage(
                'getOrder'
            )
            this.workerAdTop.addEventListener('message',(res)=>{
                // console.log(res)
                this.autoGetLegalOrder()
            })
        },
        /**
         * 获取进行中订单
         */
        async autoGetLegalOrder(){
            let key2 = await legalOrderTradeingFun(this)
            .then((res) => {
                return res;
            })
            if(key2!=false) {
                this.inOrder = key2;
                if(key2!='0'){
                    this.point =true;
                }else{
                    this.point = false;
                }
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
            // 替换上面那个
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
            console.log(this.payList.length)

            if(item.isBuy==0){
                console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu',this.payList.length)
                if(this.payList.length>0){
                    // this.box_info_pop = true;
                    return false
                }else{
                    // this.box_info_pop = false;
                    return true
                }
            }else{
                return this.box_info_pop
            }
            // return this.box_info_pop
        },
    },
    beforeDestroy(){
        if(this.workerAdTop!=null){
            this.workerAdTop.postMessage(
                'close'
            )
        }
    },
    props:[
        'childAd',
        'childTop'
    ]
}
</script>

<style lang="scss">
.market-top{
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
    .legal-currency-body-center{
        margin-top: .9rem /* 18/20 */;
        .legal-center{
            // margin-top: .9rem /* 18/20 */;
            .market_one{
                width: 23rem /* 460/20 */;
                height: 8.5rem /* 160/20 */;
                background:rgba(230,230,230,1);
                display: flex;
                .market_one_left{
                    box-sizing: border-box;
                    padding-left: 2rem;
                    // padding-left: 1rem;
                    padding-top: 1rem;
                    flex:1;
                    h3{
                        color:rgba(102,102,102,1);
                        font-size: 1.1rem /* 22/20 */;
                        font-weight: bold;
                        line-height: 1.5rem /* 30/20 */;
                    }
                    p{
                        color:rgba(102,102,102,1);
                        font-size: .7rem /* 14/20 */;
                        line-height: 2.5rem /* 50/20 */;
                    }
                    p.gift{
                        line-height: 3rem /* 50/20 */;
                    }
                    .pay-way{
                        color:rgba(102,102,102,1);
                        font-size: .7rem /* 14/20 */;
                        line-height: 2.5rem /* 50/20 */;
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
                    .pay-way.pay-way-name{
                        line-height: 1.5rem!important;
                        display: flex;
                        span.one{
                            width: 6rem;
                        }
                    }
                }
                .market_one_right{
                    width: 3rem /* 60/20 */;
                    height: 8.5rem;
                    line-height: 8.5rem;
                    text-align: center;
                    background:rgba(76,96,133,1);
                    cursor: pointer;
                    color:rgba(255,255,255,1);
                    font-size: .9rem /* 18/20 */;
                }
                .market_one_right.one2{
                    background:rgba(34,156,137,1);
                }
            }
            .market_one_te{
                width: 28rem;
            }
            .market_one:nth-child(1){
                margin-right: 2rem /* 40/20 */;
            }
            @media screen and(max-width: 480px) {
                
               .market_one{
                   width: 100%;
               }
               .market_one:nth-child(2){
                   margin-top: 1rem;
               }
            }
        }
        @media screen  and(max-width: 480px)  {
            .legal-center{
                    width: 100%;
                }
        }
        .legal-center-right{
            // margin-top: .5rem /* 10/20 */;
            width: 9rem /* 180/20 */;
            height: 8.5rem /* 170/20 */;
            background:rgba(242,242,242,1);
            border-radius:.5rem /* 10/20 */;
            p{
                width: 8rem /* 160/20 */;
                height: 2rem /* 40/20 */;
                border-radius:.5rem /* 10/20 */;
                margin: 0.63rem auto;
                line-height: 2rem;
                text-align: center;
                font-size: .9rem /* 18/20 */;
                color:rgba(255,255,255,1);
                cursor: pointer;
            }
            p.order_p{
                background:rgba(76,96,133,1);
                position: relative;
                i{
                    position: absolute;
                    display: inline-block;
                    width: .5rem /* 10/20 */;
                    height: .5rem /* 10/20 */;
                    border-radius: .25rem /* 5/20 */;
                    background: #F05B5F;
                    top: 20%;
                }
                span{
                    // content: '您有订单待处理!';
                    display: inline-block;
                    width:9rem /* 160/20 */;
                    box-sizing: border-box;
                    padding: 0 .5rem;
                    height: 2.5rem /* 60/20 */;
                    background: white;
                    position: absolute;
                    right:8.3rem;
                    top:-.2rem;
                    color:#F05B5F;
                    line-height: 2.5rem;
                    font-size: .8rem /* 16/20 */;
                    border-radius: .5rem;
                    // animation: rightOutGou .8s;
                    box-shadow: 0 0 .5rem /* 10/20 */ #bababa;
                }
                span.en_font{
                    font-size: .7rem;
                    width: 11rem;
                }
            }
            
            p.ad_p{
                background:rgba(34,156,137,1);
            }
            p.ad_p_top{
                margin-top: 2rem;
            }
            p.send_ad{
                background:rgba(92,137,204,1);
            }
        }
        @media screen and(max-width: 480px) {
            .legal-center-right{
                margin-top: 1rem;
                width: 100%;
                 p.order_p{
                     span{
                         width: 11rem;
                     }
                 }
            }
            
        }
    }
   
}
@keyframes rightOutGou {
    from {
        width: 8rem /* 160/20 */;
        height: 0;
        right:8.3rem;
        top:-.2rem;
        // transform: translate3d(-50%,0%,0);
    }
    to {
        width:8rem /* 160/20 */;
        height: 2.5rem /* 60/20 */;
        right:8.3rem;
        top:-.2rem;
        // background:rgba(242, 242, 242,1);
    }
}
</style>
