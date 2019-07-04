<template>
    <div class="dealer">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="dealer-content">
            <div class="banxin">
                <div class="info">
                    <div class="info-top">
                        <div class="merchant">
                            <div class="img">
                                <div src="" alt="" :data-name="item.name?item.name[0]:''"></div>
                                <!-- <i></i> -->
                            </div>
                            <div class="merchant_info">
                                <h3>{{item.name?item.name:''}} <span v-show="item.coinUser">{{$t('merchant.merchant')}}</span> </h3>
                                <span>{{item.registTime}}</span>
                            </div>
                        </div>
                        <div class="test">
                            <div class="one">
                                <img v-show="item.mail" src="../../assets/images/chat/mail.png" alt="">
                                <img v-show="!item.mail" src="../../assets/images/chat/mail_no.png" alt="">
                                <span>{{$t('info_item.email_auth')}}</span>
                            </div>
                            <div class="one">
                                <img v-show="item.phone" src="../../assets/images/chat/phone.png" alt="">
                                <img v-show="!item.phone" src="../../assets/images/chat/phone_no.png" alt="">
                                <span>{{$t('info_item.phone_auth')}}</span>
                            </div>
                            <div class="one">
                                <img v-show="item.identity" src="../../assets/images/chat/user.png" alt="">
                                <img v-show="!item.identity" src="../../assets/images/chat/user_no.png" alt="">
                                <span>{{$t('info_item.shiming')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="info-bottom">
                        <div class="one">
                            <h3>{{(item.monthTradedRate*100).toFixed(2)}} %</h3>
                            <p>30{{$t('merchant.complete_rate')}}</p>
                        </div>
                        <div class="border"></div>
                        <div class="one">
                            <h3>{{item.allTradedCount}} <span>(<i class="or">{{item.buyTradedCount}}</i> | <i class="blu">{{item.sellTradedCount}}</i>)次</span> </h3>
                            <p>{{$t('merchant.trade')}}（{{$t('merchant.in')}} | {{$t('merchant.out')}}）</p>
                        </div>
                        <div class="border"></div>
                        <div class="one">
                            <h3>{{item.monthTradedCount}}{{$t('merchant.times')}}</h3>
                            <p>30{{$t('merchant.trade_in')}}{{$t('merchant.trade_day')}}</p>
                        </div>
                        <div class="border"></div>
                        <div class="one">
                            <h3>{{item.avgReleaseUseTime}}{{$t('merchant.min')}}</h3>
                            <p>{{$t('merchant.avg_release')}}</p>
                        </div>

                    </div>
                </div>
                <p>{{$t('merchant.in_u')}}</p>
                <div class="buy">
                    <div class="head">
                        
                        <li>{{$t('merchant.coin')}}</li>
                        <li>{{$t('merchant.amount')}}</li>
                        <li>{{$t('merchant.limit')}}</li>
                        <li>{{$t('merchant.unit_price')}}</li>
                        <li>{{$t('merchant.payment_method')}}</li>
                        <li class="ni">{{$t('merchant.control')}}</li>
                    </div>
                    <div v-show="arr0.length==0" class="pic_no">
                        <img src="../../assets/images/chat/pic_no.png" alt="">
                        <span>{{$t('merchant.empty')}}</span>
                    </div>
                    <div class="t-body" v-for="(item,key) in arr0" :key="key">
                        <li>
                            <img v-show="item.coinName=='usdt'" src="../../assets/images/chat/usdt_icon.png" alt="">
                            <img v-show="item.coinName =='btc'" src="../../assets/images/chat/btc_icon.png" alt="">
                            <span>{{item.coinName.toUpperCase()}}</span>
                        </li>
                        <li>
                            <p>{{item.limitQty}} {{(item.coinName).toUpperCase()}}</p>
                        </li>
                        <li>
                            <p>{{item.minAmount}}-{{item.maxAmount}} {{item.tradeCoinType}}</p>
                        </li>
                        <li>
                            {{item.price}} {{item.tradeCoinType}}
                        </li>
                        <li>
                            <img v-show="item.alipayOn" src="../../assets/images/legal-currency/ali@2x.png" alt="">
                            <img v-show="item.bankcardOn" src="../../assets/images/legal-currency/bank@2x.png" alt="">
                            <img v-show="item.wechatPayOn" src="../../assets/images/legal-currency/wx@2x.png" alt="">

                            <img v-show="item.payWayType==1" src="../../assets/images/legal-currency/gift.png" alt=""><span v-show="item.payWayType==1">{{item.cardName}}</span>
                        </li>
                        <li class="ni">
                            <el-button type="primary" @click="placeOrderFun(0,item)">{{$t('merchant.buy')}}</el-button>
                        </li>
                    </div>
                </div>
                <p>{{$t('merchant.out_u')}}</p>
                <div class="sell">
                    <div class="head">
                        <li>{{$t('merchant.coin')}}</li>
                        <li>{{$t('merchant.amount')}}</li>
                        <li>{{$t('merchant.limit')}}</li>
                        <li>{{$t('merchant.unit_price')}}</li>
                        <li>{{$t('merchant.payment_method')}}</li>
                        <li class="ni">{{$t('merchant.control')}}</li>
                    </div>
                    <div v-show="arr1.length==0" class="pic_no">
                        <img src="../../assets/images/chat/pic_no.png" alt="">
                        <span>{{$t('merchant.empty')}}</span>
                    </div>
                    <div class="t-body" v-for="(item,key) in arr1" :key="key">
                        <li>
                            <img v-show="item.coinName=='usdt'" src="../../assets/images/chat/usdt_icon.png" alt="">
                            <img v-show="item.coinName =='btc'" src="../../assets/images/chat/btc_icon.png" alt="">
                            <span>{{item.coinName.toUpperCase()}}</span>
                        </li>
                        <li>
                            <p>{{item.limitQty}} {{(item.coinName).toUpperCase()}}</p>
                        </li>
                        <li>
                            <p>{{item.minAmount}}-{{item.maxAmount}} {{item.tradeCoinType}}</p>
                        </li>
                        <li>
                            {{item.price}} {{item.tradeCoinType}}
                        </li>
                        <li>
                            <img v-show="item.alipayOn" src="../../assets/images/legal-currency/ali@2x.png" alt="">
                            <img v-show="item.bankcardOn" src="../../assets/images/legal-currency/bank@2x.png" alt="">
                            <img v-show="item.wechatPayOn" src="../../assets/images/legal-currency/wx@2x.png" alt="">

                            <img v-show="item.payWayType==1" src="../../assets/images/legal-currency/gift.png" alt=""><span v-show="item.payWayType==1">{{item.cardName}}</span>
                        </li>
                        <li class="ni">
                            <el-button type="primary" @click="placeOrderFun(1,item)">{{$t('merchant.sell')}}</el-button>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <place-order></place-order>
        <pop-authen v-show="hackReset" :childProp="childP" ref="mei"></pop-authen>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {getMarketMerchant ,getMerchantInfo} from '../../assets/js/api'
import PlaceOrder from '../../components/PlaceOrder.vue'
import PopAuthen from '../../components/PopupsAuthen.vue'
import qs from 'qs'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'place-order': PlaceOrder,
        'pop-authen':PopAuthen,
    },
    data() {
        return {
            legalSet:'legal-currency',
            item:{

            },
            arr0:[],
            arr1:[],
            payList:'',
            num:0,
            box_info_pop:false,
            hackReset:false,
            childP:'no',
        }
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        },
        lang() {
            return this.$i18n.locale;
        },
    },
    created(){
        console.log(this.$route.params.id)
        this.initInfo();
        this.initMarket()
    },
    methods:{
        async initInfo(){
            let key = await getMerchantInfo(this,{
                userId:this.$route.params.id
            }).then(res => {
                return res;
            })
            if(key!=false) {
                console.log(key,'infoinfoinfoinfoinfo')
                this.item = key;
            }
        },
        async initMarket(){
            let key = await getMarketMerchant(this,{
                isBuy:0,
                userId:this.$route.params.id
            }).then(res => {
                return res;
            })
            if(key!=false) {
                console.log(key,'000000000000')
                this.arr0 = key;
                this.arr0.reverse()
            }
            let key2 = await getMarketMerchant(this,{
                isBuy:1,
                userId:this.$route.params.id
            }).then(res => {
                return res;
            })
            if(key2!=false) {
                console.log(key2,'111111111111111')
                this.arr1 = key2
                this.arr1.reverse()
            }
        },
        /**
         * 买入卖出弹框数据
         */
        async placeOrderFun(type,item) {
            
            console.log("选中操作项目",type,item)
            if(item.isBuy==1){ //买入
                this.childP = 'adtable'
                this.hackReset = true;
                this.$refs.mei.box_info = true;
            }else{
                this.childP = 'adtop'
                await this.axios.post('/receiptWay/list',qs.stringify({status:1,countryInfoId:item.countryInfoId}))
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
            
            if(!this.$store.state.ifPayPassword =='1') {
                k+=1
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
    }
}
</script>

<style lang="scss" scoped>
$b-color :#333333FF;
$gr-color:#666666FF;
$or-color:#4C6085FF;
$blu-color:#229C89FF;
.dealer{
    font-family:PingFang SC;
    .dealer-content{
        width: 100%;
        min-height: 100vh;
        background: rgba(229,229,229,1);
        .banxin{
            box-sizing: border-box;
            padding-top: 8.5rem;
            .info{
                width: 100%;
                height: 10rem /* 120/20 */;
                background: rgba(255,255,255,1);
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
                .info-top{
                    display: flex;
                    height: 5rem;
                    flex-direction: row;
                    justify-content: space-between;
                    border-bottom:1px solid rgba(229,229,229,1);
                    .merchant{
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content:flex-start;
                        align-items: center;
                        box-sizing: border-box;
                        padding-left: 2rem;
                        .img{
                            width: 2.5rem;
                            height: 3rem;
                            display: flex;
                            align-items: center;
                            margin-right: 1rem;
                            div{
                                display: block;
                                width: 2.5rem /* 50/20 */;
                                height: 2.5rem;
                                border-radius: 50%;
                                background: #18264DFF;
                                position: relative;
                            }
                            div::before{
                                content: attr(data-name);
                                position: absolute;
                                top: 50%;
                                left:50%;
                                transform: translateX(-50%) translateY(-50%);
                                color:white;
                            }
                        }
                        .merchant_info{
                            height: 3rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            h3{
                                color:$b-color;
                                font-size: 1rem /* 18/20 */;
                                font-weight: 600;
                                span{
                                    display: inline-block;
                                    color:#5C89CCFF;
                                    border: 1px solid #5C89CCFF;
                                    padding: .15rem;
                                    padding-left: .35rem;
                                    padding-right: .35rem;
                                    border-radius: 4px;
                                }
                            }
                            span{
                                color:$gr-color;
                                font-size: .7rem /* 14/20 */;

                            }
                        }

                    }
                    .test{
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        align-items: center;
                        box-sizing: border-box;
                        padding-right: 2rem;
                        .one{
                            margin-left: 1.5rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            img{
                                display: block;
                                width: 1.5rem /* 20/20 */;
                                height: 1.5rem /* 20/20 */;
                            }
                            span{
                                color:$gr-color;
                                font-size: .6rem /* 14/20 */;
                                font-weight: 500;
                            }
                        }
                    }
                    
                }
                .info-bottom{
                    height: 5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    .one{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        h3{
                            color:$b-color;
                            font-size: 1rem /* 18/20 */;
                            font-weight: 550;
                            line-height: 1.5rem /* 30/20 */;
                            span{
                                font-size: .7rem /* 14/20 */;
                            }
                            i.or{
                                color :$or-color;
                            }
                            i.blu{
                                color:$blu-color;
                            }
                        }
                        p{
                            color:$gr-color;
                            font-size: .78rem /* 14/20 */;
                            font-weight: 500;
                        }
                    }
                    .border{
                        height: 2rem;
                        width: 1px;
                        background: rgba(204,204,204,1);
                    }
                }
            }
            .buy,
            .sell{
                // height: 6rem /* 80/20 */;
                background: rgba(255,255,255,1);
                margin-bottom: 1rem;
                box-sizing: border-box;
                .head{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                    height: 2rem;
                    background:rgba(242,242,242,1);
                    box-sizing: border-box;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    li{
                        flex: 1;
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        color:$gr-color;
                        font-size: .8rem /* 16/20 */;
                        
                    }
                    .ni{
                        width: 4.5rem /* 50/20 */;
                        flex: none;
                        justify-content: flex-start;
                        .el-button--primary{
                            width: 100%;
                        }
                    }
                }
                .t-body{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                    height: 4rem;
                    background:rgba(255,255,255,1);
                    box-sizing: border-box;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    li{
                        flex: 1;
                        height: 4rem;
                        display: flex;
                        align-items: center;
                        font-size: .8rem /* 16/20 */;
                        color:$or-color;
                        font-weight: 600;
                        border-bottom: 1px solid #e5e5e5;
                        .el-button--primary{
                            background: $or-color;
                            border: 0px;
                            width: 60%;
                            font-size: .8rem!important /* 16/20 */;
                                font-weight: 600!important;
                            span{
                                font-size: .8rem!important /* 16/20 */;
                                font-weight: 600!important;
                            }
                        }
                        img{
                            margin-right: .3rem;
                        }
                        span{
                            font-size: .7rem /* 14/20 */;
                            color:$b-color;
                            font-weight: 800;
                        }
                        p{
                            font-size: .75rem /* 15/20 */;
                            color:$gr-color;
                            font-weight: 500;
                        }
                    }
                    .ni{
                        width: 4.5rem /* 50/20 */;
                        flex: none;
                        justify-content: flex-end;
                        .el-button--primary{
                            width: 100%;
                        }
                    }
                }
                .pic_no{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-content: center;
                    align-items: center;
                    height: 4rem;
                    background:rgba(255,255,255,1);
                    box-sizing: border-box;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    span{
                        color:#CCCCCCFF;
                        font-size: .7rem /* 14/20 */;
                        font-weight: 800;
                        margin-left: .5rem;
                    }
                }
            }
            p{
                font-size: .9rem /* 18/20 */;
                color:#333333FF;
                font-weight: 800;
                line-height: 1.5rem /* 30/20 */;
            }
        }
    }
}
</style>
