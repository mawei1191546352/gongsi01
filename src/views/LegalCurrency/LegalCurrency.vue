<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:09:47
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-17 11:26:01
 -->
<template>
    <div class="legal-currency">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="legal-currency-box">
            <div class="legal-currency-box-img" :class="login?'':'box-img_te'">
                <div class="banxin">
                    <h3>{{$t('legal_currency.h3')}}</h3>
                    <p>{{$t('legal_currency.p')}}</p>
                </div>
            </div>
            <div class="banxin">
                <div class="ads-publick">
                    <div class="left-icon">
                        <img :src="audio_img" alt="">
                        <span>公告</span>
                    </div>
                    <div class="right-content">
                        <span>ROYALBIZ OTC 现已开通</span>
                        <div class="border1">
                            <span class="color">$</span>
                            <span>美元</span>
                        </div>
                        <span>及</span>
                        <div class="border2">
                            <span class="color">HK$</span>
                            <span>港币</span>
                        </div>
                        <span>的承兑业务，为您提供更全面的场外交易体验。</span>
                    </div>
                </div>
                <div class="legal-currency-body">
                    <div class="nav-bi">
                        <div class="span-item">
                            <span v-for="(item,key) in allBi" :key="key" 
                            :class="nav_active==item.value?'nav-bi-active':''"
                            @click="changeType(item)"
                            >
                                {{ item.label.toUpperCase()}} 
                            </span>
                        </div>
                        <!-- <el-select class="nation" :data-logo="getLogo(countryInfoId)" v-model="countryInfoId" placeholder="请选择国家">
                            <el-option
                            style="display:flex;justify-content:flex-start;flex-direction: row;align-items: center;"
                            v-for="item in options"
                            :key="item.id"
                            :label="item.countryName"
                            :value="item.id">
                            <img style="width:1.5rem;height:1.5rem;" :src="item.logo" alt=""> <span style="margin-left:1rem;">{{item.countryName}}</span>
                            </el-option>
                        </el-select>
                        <img class="iconCom" :src="getLogo(countryInfoId)" alt=""> -->
                        <div class="search outer">
                            <div class="search-content">
                                <div class="item-one" @click="sele_box=true">
                                    {{getCountryName(options,countryInfoId,lang=='en'?'countryCode':'countryName')}}
                                </div>
                                <div class="item-one" @click="sele_box=true">
                                    {{getCountryName(optionsFa,otcTradeCurrencyId,'coinName')}}
                                </div>
                                <div class="item-one" @click="sele_box=true">
                                    {{getCountryName(optionsPayWay,payWayType,'countryName')}}
                                </div>
                            </div>
                            <div class="search-icon" @click="sele_box = !sele_box"></div>
                            <div class="sele-box" v-if="sele_box" id="sele_box_id"
                                tabindex="0" outline="0" hidefocus="true" 
                                @blur="sele_box=false">
                                <div class="sele-one">
                                    <span class="one-left">{{$t('legal_currency.sele.country')}}</span>
                                    <el-select class="box_event" @focus="sele_box=true" v-model="countryInfoId" placeholder="请选择国家">
                                        <el-option
                                        style=""
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="lang=='en'?item.countryCode:item.countryName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="sele-one">
                                    <span class="one-left">{{$t('legal_currency.sele.legal')}}</span>
                                    <el-select class="box_event" @focus="sele_box=true" v-model="otcTradeCurrencyId" placeholder="请选择国家">
                                        <el-option
                                        style=""
                                        v-for="item in optionsFa"
                                        :key="item.id"
                                        :label="item.coinName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="sele-one">
                                    <span class="one-left">{{$t('legal_currency.sele.payment')}}</span>
                                    <el-select class="box_event" @focus="sele_box=true" v-model="payWayType" placeholder="请选择国家">
                                        <el-option
                                        style=""
                                        v-for="item in optionsPayWay"
                                        :key="item.id"
                                        :label="item.countryName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="sele-one" v-show="payWayType==0">
                                    <span class="one-left"></span>
                                    <el-select class="box_event" @focus="sele_box=true" v-model="receiptWayTypes" placeholder="请选择现金支付方式">
                                        <el-option
                                        style=""
                                        v-for="item in optionsPayWayCash"
                                        :key="item.id"
                                        :label="item.countryName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="sele-one" v-show="payWayType==1">
                                    <span class="one-left"></span>
                                    <el-select class="box_event" @focus="sele_box=true" v-model="giftCardId" placeholder="请选择礼品卡支付方式">
                                        <el-option
                                        style=""
                                        v-for="item in optionsPayWayGift"
                                        :key="item.id"
                                        :label="item.cardName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="button-search">
                                    <span class="cancle" @click="sele_box=false;">{{$t('legal_currency.sele.cancle')}}</span>
                                    <span class="sure" @click="doGet">{{$t('legal_currency.sele.search')}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="legal-currency-body-center-bottom">
                        <ad-top :childAd="adSet" :childTop="topSet"></ad-top>
                        <ad-table :childAd="adSet" style="margin-top:1.5rem;"></ad-table>
                    </div>
                </div>
            </div>
            <div class="legal-currency-body-static test-1"></div>
        </div>
    </div>
</template>

<script>

import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import AdTop from '../../components/AdTop.vue'
import AdTable from '../../components/AdTable.vue'
import { getcoinTypeIdFun,QueryQtcTradeFunCountry,
getGiftCrad, QueryQtcTradeFun  } from '../../assets/js/api.js'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'ad-top': AdTop,
        'ad-table': AdTable,
        
    },
    data() {
        return {
            options: [],
            countryInfoId: '',
            topSet:{custome:true},
            optionsFa:[],
            optionsPayWay:[],
            optionsPayWayCash:[ ],
            optionsPayWayGift:[],
            payWayType:'0',
            otcTradeCurrencyId:'-1',
            giftCardId:'-1',//具体支付方式
            receiptWayTypes:'-1',
            legalSet:'legal-currency',
            allBi:[
                {
                    type:'2',
                    value:'2',
                    label:'USDT',
                },
                {
                    type:'1',
                    value:'1',
                    label:'BTC',
                }
            ],
            nav_active:'',
            adSet:{},// 通知广告 币种类型
            item:null,
            sele_box:false,
            audio_img: require('../../assets/images/legal-currency/audio.png')
        }
    },
    computed: {
        login() {
            return this.$store.getters.login;
        },
        lang() {
            return this.$i18n.locale;
        },
    },
    async created(){
        this.optionsFa[0]=this.$t('legal_currency.optionsFa')[0]
        this.optionsPayWay=this.$t('legal_currency.optionsPayWay')
        this.optionsPayWayCash=this.$t('legal_currency.optionsPayWayCash')
        this.optionsPayWayGift[0]=this.$t('legal_currency.optionsPayWayGift')[0]
        this.item = this.allBi[0]
        await this.init_data()
        this.initGiftCard()
        console.log(this.$store.getters.user_info)
        let keyTrade = await QueryQtcTradeFunCountry(this)
        .then((res) => {
            return res;
        })
        if(keyTrade!=false) {
            this.options = keyTrade;
            this.countryInfoId = keyTrade[0].id
        }
        this.initCurrency()
        await this.init_coinTypeId({value:this.allBi[0].value})
        this.$store.commit('_set_nav_item','1')


    },
    methods:{
        setFocus() {
            let dom = document.getElementById('sele_box_id');
            if(dom) {
                dom.focus()
            }
        },
        /**
         * 初始化交易货币
         */
        async initCurrency() {
            let demo = await QueryQtcTradeFun(this,{countryInfoId:this.countryInfoId})
            .then((res) => {
                return res;
            })
            if(demo!=false) {
                demo.unshift(this.optionsFa[0])
                this.optionsFa = demo;
                this.otcTradeCurrencyId = this.optionsFa[0].id
            }
        },
        /**
         * 初始化礼品卡
         */
        async initGiftCard() {
            let that = this;
            let key = await getGiftCrad(this)
            .then((res) => {
                return res;
            })
            if(key != false) {
                // console.log(key)
                this.optionsPayWayGift = [that.$t('legal_currency.optionsPayWayGift')[0],...key.data]
                console.log(this.optionsPayWayGift)
            }
        },
        doGet() {
            // 修改这个
            // this.adSet = Object.assign({},this.adSet,{coinTypeId:this.item.value,countryInfoId:n})
            this.sele_box = false;
        },
        getCountryName(item,id, name) {
            let ar = item;
            let k = ar.filter((ite) => {
                return ite.id==id
            })
            return k[0] ?k[0][name]:''
        },
        getLogo(id) {
            for(let i = 0;i<this.options.length;i++) {
                if(this.options[i].id == id) {
                    return this.options[i].logo
                }
            }
        },
        /**
         * 初始化页面
         */
        async init_data(){
            let key = await getcoinTypeIdFun(
                this
            ).then((res) => {
                return res;
            })
            
            if(key!=false) {
                this.allBi= key
                this.item = this.allBi[0]
            }
        },
        /**
         * 初始化某币种数据
         */
        init_coinTypeId(item){
            this.nav_active = item.value;
            // 重新条用广告
            let obj = {
                    coinTypeId:item.value,
                    countryInfoId:this.countryInfoId,
                    payWayType:this.payWayType,
                }
            if(this.otcTradeCurrencyId!='-1') {
                obj['otcTradeCurrencyId'] = this.otcTradeCurrencyId
            }
            if(this.payWayType==0) {//现金
                console.log('全部receiptWayTypes',obj)
                if(this.receiptWayTypes!='-1'){
                    console.log('设置receiptWayTypes')
                    obj['receiptWayTypes'] = this.receiptWayTypes
                }
                
            }else{
                console.log('全部giftCardId',obj)
                if(this.giftCardId!='-1') {
                    console.log('设置giftCardId')
                    obj['giftCardId'] = this.giftCardId
                }
            }
            // this.adSet = Object.assign({},obj)
            this.adSet = obj
            
        },
        /**
         * 改变币种
         */
        changeType(item){
            this.item = item;
            this.init_coinTypeId(item)
        },
        
        
    },
    watch:{
        lang(n, o) {
            console.log(n,'变化')
            this.optionsFa[0]=this.$t('legal_currency.optionsFa')[0]
            this.optionsPayWay=this.$t('legal_currency.optionsPayWay')
            this.optionsPayWayCash=this.$t('legal_currency.optionsPayWayCash')
            this.optionsPayWayGift[0]=this.$t('legal_currency.optionsPayWayGift')[0]
        },
        async countryInfoId(n,o) {
            this.setFocus()
            if(this.item != null){
                this.nav_active = this.item.value;
                console.log(this.item,'=============')
                // 重新条用广告
                // this.adSet = Object.assign({},this.adSet,{coinTypeId:this.item.value,countryInfoId:n})
                await this.initCurrency()
                this.init_coinTypeId(this.item)
            }
        },
        payWayType(n,o) {
            this.setFocus()
            console.log('payWayType::',n)
            if(this.receiptWayTypes != '-1' || this.giftCardId != '-1') {
                this.receiptWayTypes = '-1'
                this.giftCardId = '-1'
            } else {
                this.receiptWayTypes = '-1'
                this.giftCardId = '-1'
                this.init_coinTypeId(this.item)
            }
            console.log(this.receiptWayTypes,this.giftCardId,'////////////////////////')
            // if(n==1){
            //     console.log('payWayType::1::',n)
            //     this.receiptWayTypes = '-1'
            //     this.giftCardId = '-1'
            //      // 重新条用广告
            //     // this.adSet = Object.assign({},this.adSet,{
            //     //     coinTypeId:this.countryInfoId
            //     // })
            //     // this.init_coinTypeId(this.item)
            // }else{
            //     this.receiptWayTypes = '-1'
            //     this.giftCardId = '-1'
            //      // 重新条用广告
            //     // this.adSet = Object.assign({},this.adSet,{coinTypeId:this.item.value,countryInfoId:n})
            //     // this.init_coinTypeId(this.item)
            // }
            
        },
        receiptWayTypes(n,o) {
            this.setFocus()
            console.log(n,'receiptWayTypesreceiptWayTypesreceiptWayTypesreceiptWayTypes')
            // this.giftCardId = '-1'
            this.receiptWayTypes = n
            this.init_coinTypeId(this.item)
        },
        giftCardId(n,o) {
            this.setFocus()
            console.log(n,'giftCardIdgiftCardIdgiftCardIdgiftCardIdgiftCardId')
            // this.receiptWayTypes = '-1'
            this.giftCardId = n
            this.init_coinTypeId(this.item)
        },
        sele_box(n,o) {
            if(n) {
                let k = setTimeout(() => {
                    this.setFocus()
                    clearTimeout(k)
                },200)
            }
        }
    }
}
</script>

<style lang="scss">
.el-select-dropdown{
    background: #fafafa;
}
.legal-currency{
    // background: #F2F2F2;
    .legal-currency-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 23rem /* 460/20 */;
        .legal-currency-box-img{
            // background-color: red;
            height: 18.5rem /* 370/20 */;
            height: 23rem /* 460/20 */;
            background: url('../../assets/images/litter-bg@2x.png') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E6%B3%95%E5%B8%81/litter-bg%402x.png) no-repeat center center;
            background-size: cover;
            position: relative;
            box-sizing:border-box;
            padding-top: 8rem;
            h3{
                font-size: 1.6rem /* 32/20 */;
                line-height: 2.5rem /* 50/20 */;
                color:rgba(255,255,255,1);
                text-align: center;
            }
            p{
                font-size: 1.3rem /* 26/20 */;
                color:rgba(255,255,255,1);
                height: 2rem;
                line-height: 4rem;
                text-align: center;
                font-weight: 200;
            }
            .banxin{
                margin-top: 1.5rem;
            }
        }
        .legal-currency-box-img.box-img_te{
            height: 18.5rem;
            padding-top: 5rem;
        }
        .banxin{
            height: 0;
            
        }
        .ads-publick {
            position: absolute;
            top: -6rem;
            width: 100%;
            height:2.5rem;
            // background:rgba(249,189,85,0.2);
            background: #FEF2DD;
            border:2px solid rgba(249,189,85,1);
            opacity:1;
            border-radius:3px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .left-icon {
                width:100px;
                height:2.5rem;
                background:rgba(249,189,85,1);
                border-radius:3px 0px 0px 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                }
                span {
                    color: white;
                    margin-left: 5px;
                }
            }
            .right-content {
                flex:1 ;
                height: inherit;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 0px 1rem;
                font-size: 16px;
                .border1 {
                    width:90px;
                    height:30px;
                    border:1px solid rgba(34,156,137,1);
                    opacity:1;
                    border-radius:3px;
                    display: flex;
                    align-items: center;
                    margin: 0px 5px;
                    span {
                        height: inherit;
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgba(34,156,137,1);
                        &.color {
                            background:rgba(34,156,137,1);
                            border-radius:2px 0px 0px 2px;
                            color: #FFFFFF;
                        }
                    }
                }
                .border2 {
                    width:90px;
                    height:30px;
                    border:1px solid rgba(92,137,204,1);
                    opacity:1;
                    border-radius:3px;
                    display: flex;
                    align-items: center;
                    margin: 0px 5px;
                    span {
                        height: inherit;
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgba(92,137,204,1);
                        &.color {
                            background:rgba(92,137,204,1);
                            border-radius:2px 0px 0px 2px;
                            color: #FFFFFF;
                        }
                    }
                }
            }
        }
        .legal-currency-body{
            position: absolute;
            width: 100%;
            top: -5rem;
            top: -3rem;
            height: 48rem /* 960/20 */;
            background:rgba(255,255,255,1);
            // border: 1px solid black;
            .nav-bi{
                height: 2.5rem /* 50/20 */;
                border-bottom: .05rem /* 1/20 */ solid rgba(204,204,204,1);
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                padding-left: 1rem;
                .span-item{
                    span{
                        display: inline-block;
                        height: 2.5rem;
                        height: 2.4rem;
                        line-height: 2.5rem;
                        width: 4rem;
                        text-align: center;
                        font-size: 1.1rem /* 22/20 */;
                        cursor: pointer;
                    }
                    span.nav-bi-active{
                        color:rgba(88,147,196,1);
                        border-bottom: .1rem /* 2/20 */ solid rgba(88,147,196,1);
                    }
                }
                .nation {
                    float: right;
                    transform: translateX(-10%) translateY(12%);
                    input{
                        text-align: left;
                        text-indent: 4em;
                    }
                    span{
                         height: 2rem;
                        line-height: 2rem;
                        width: 1.5rem;
                    }
                    position: relative;
                }
                .search{
                    width:15rem /* 290/20 */;
                    height:1.75rem /* 35/20 */;
                    // background:rgba(242,242,242,1);
                    border:1px solid rgba(204,204,204,1);
                    border-radius:.15rem /* 3/20 */;
                    transform: translateX(-1rem) translateY(.4rem);
                    display: flex;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding-left: .35rem /* 7/20 */;
                    padding-right: .5rem /* 10/20 */;
                    align-items: center;
                    position: relative;
                    // z-index: 102;
                    z-index: 9;
                    .search-content{
                        flex:1;
                        display: flex;
                        align-items: center;
                        .item-one{
                            height:1.25rem /* 25/20 */;
                            background:rgba(92,137,204,1);
                            border-radius:3px;
                            color:rgba(242,242,242,1);
                            font-size: .7rem /* 14/20 */;
                            padding-left: .5rem;
                            padding-right: .5rem;
                            width:auto; 
                            // display:inline-block !important;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            margin-right: .3rem;
                            cursor: pointer;
                        }
                    }
                    .search-icon{
                        width: 1rem;
                        height: 1rem;
                        mix-blend-mode: difference;
                        // background-image: url('../../assets/images/legal-currency/search1.png') ,linear-gradient(#f00, #00f);
                        background-image: url('../../assets/images/legal-currency/search.png');
                        // background-blend-mode: lighten;
                        // background-size: cover;
                        cursor: pointer;
                    }
                    .sele-box{
                        position: absolute;
                        width:15rem /* 290/20 */;
                        height:15rem /* 300/20 */;
                        background:rgba(255,255,255,1);
                        // border:1px solid rgba(0,0,0,0);
                        box-shadow:0px 0px 10px rgba(54,92,149,0.2);
                        z-index: 10000;
                        top: 1.8rem;
                        right: -.05rem;
                        .sele-one{
                            display: flex;
                            box-sizing: border-box;
                            padding: .5rem .8rem;
                            justify-content: space-between;
                            .one-left{
                                display: flex;
                                width: 3rem /* 60/20 */;
                                color:rgba(102,102,102,1);
                                font-size: .7rem /* 14/20 */;
                                align-items: center;
                            }
                            .el-select{
                                width: 9rem /* 180/20 */;
                                input{
                                    pointer-events: none;
                                }
                            }
                        }
                        .button-search{
                            display: flex;
                            justify-content: flex-end;
                            box-sizing: border-box;
                            padding-right: .9rem;
                            span{
                                width:80px;
                                height:30px;
                                display: flex;
                                border-radius:3px;
                                font-size: 14px;
                                cursor: pointer;
                                justify-content: center;
                                align-items: center;
                                margin-left: .9rem;
                            }
                            .cancle{
                                background:rgba(242,242,242,1);
                                color:rgba(204,204,204,1);
                            }
                            .sure{
                                background:rgba(76,96,133,1);
                                color:rgba(242,242,242,1);
                            }
                        }
                    }
                }
                @media screen and(max-width: 480px) {
                
                    .nation{
                        width: 100px;
                        height: 25px;
                        input{
                            height: 25px!important;
                            line-height: 25px!important;
                        }
                        span{
                             height: 25px!important;
                            line-height: 25px!important;
                            i{
                                 height: 25px!important;
                            line-height: 25px!important;
                            }
                        }
                    }
                }
                .iconCom{
                    float: right;
                    transform: translateX(90%) translateY(53%);
                    width: 1.2rem;
                    height: 1.2rem;
                    vertical-align: middle;
                }
                // .nation::before{
                //     content: url( data-logo );
                //     position: absolute;
                //     left :0;
                //     top: 0;
                //     z-index: 3000;
                // }
            }
            .legal-currency-body-center-bottom{
                box-sizing: border-box;
                padding: 0 1rem;
            }
        }
    }
    // 专门替 legal-currency-body 占位
    .legal-currency-body-static{
        width: 100%;
        height: 48rem /* 960/20 */;
        background:#F2F2F2;
    }
}
@media screen and(max-width: 480px) {
                
    .el-select-dropdown.el-popper{
        width: 100px;
        // height: 25px;
        left: 265px;
        .el-select-dropdown__item{
            padding: 0 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
}
</style>
