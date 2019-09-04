<template>
    <div class="logo-page">
        <top-nav></top-nav>
        <div class="logo-page-box">
            <div class="legal-currency-box-img">
                <div class="banxin">
                    <h3 class="ff">{{$t('logo.title')}}</h3>
                    <div class="allpay">
                        <div class="allpay-top">
                            <h3>{{$t('logo.mult_way')}}</h3>
                            <span @click="goMarket">{{$t('logo.more_payment')}}></span>
                        </div>
                        <div class="allpay-list">
                            <div class="pay-item" :class="active_num==0?'active':''" @click="active_num=0">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/bank.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h1')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p1')}}</p>
                                </div>
                            </div>
                            <div class="pay-item" :class="active_num==1?'active':''" @click="active_num=1">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/ali.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h2')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p2')}}</p>
                                </div>
                            </div>
                            <div class="pay-item" :class="active_num==2?'active':''" @click="active_num=2">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/amazon.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h3')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p3')}}</p>
                                </div>
                            </div>
                            <div class="pay-item" :class="active_num==3?'active':''" @click="active_num=3">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/itunes.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h4')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p4')}}</p>
                                </div>
                            </div>
                            <div class="pay-item" :class="active_num==4?'active':''" @click="active_num=4">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/js.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h5')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p5')}}</p>
                                </div>
                            </div>
                            <div class="pay-item" :class="active_num==5?'active':''" @click="active_num=5">
                                <div class="pay-left">
                                    <img src="../../assets/images/logopage/2019-5-9/shiyou.png" alt="">
                                </div>
                                <div class="pay-right">
                                    <h3 :class="lang">{{$t('logo.pay_h6')}}</h3>
                                    <p :class="lang">{{$t('logo.pay_p6')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="calculate">
                        <div class="one-input-select sel-one">
                            <div class="input-label">
                                <label for="">{{$t('logo.want')}}</label>
                                <input type="number" v-model="legal_num" @focus="getInputFocus('legal')">
                            </div>
                            <div class="input-sele">
                                <div class="select" tabindex="-2" @click.stop="legal_show= !legal_show" @focus="getInputFocus('legal')" @blur="legal_show=false">
                                    <span >{{legalArr.length>0 ? (legalArr.filter(item => item.id == legal))[0].coinName :''}}</span>
                                    <i class="icon-font el-icon-caret-bottom" :class="legal_show?'i-top':''"></i>
                                    <!-- <i class="icon-font" :class="legal_show?'el-icon-caret-top':'el-icon-caret-bottom'"></i> -->
                                    <!-- <ul v-show="legal_show" tabindex="-1" @blur="legal_show=false" id="legal_box_id"> -->
                                    <div class="ul"  @click.stop="">
                                        <ul :class="legal_show?'les':''"  @blur="legal_show=false" id="legal_box_id">
                                            <li v-for="(item,key) in legalArr" :key="key" @click="setItem(item.id)" :class="item.id==legal?'active':''">{{item.coinName}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img class="dui" src="../../assets/images/logopage/2019-5-9/duihuan.png" alt="">
                        <div class="one-input-select sel-two">
                            <div class="input-label">
                                <label for="">{{$t('logo.get')}}</label>
                                <input type="number" v-model="qtc_num" @focus="getInputFocus('qtc')">
                            </div>
                            <div class="input-sele">
                                <div class="select" tabindex="-3" @click.stop="qtc_show= !qtc_show" @focus="getInputFocus('qtc')" @blur="qtc_show=false">
                                    <span >{{qtcArr.length >0 ? (qtcArr.filter(item => item.id == qtc))[0].abbreviation.toUpperCase():''}}</span>
                                    <i class="icon-font el-icon-caret-bottom" :class="qtc_show?'i-top':''"></i>
                                    <!-- <i class="icon-font" :class="qtc_show?'el-icon-caret-top':'el-icon-caret-bottom'"></i> -->
                                    <div class="ul" @click.stop="">
                                        <ul :class="qtc_show?'les':''" @blur="qtc_show=false" id="qtc_box_id">
                                        <!-- <ul v-show="qtc_show" tabindex="0" @blur="qtc_show=false" id="qtc_box_id"> -->
                                            <li v-for="(item,key) in qtcArr" :key="key" @click="qtc=item.id" :class="item.id==qtc?'active':''">{{item.abbreviation.toUpperCase()}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="go-market">
                        <p></p>
                        <div class="market-box" @click="goMarket">
                            <img src="../../assets/images/logopage/2019-5-9/cart.png" alt="">
                            <span >{{$t('logo.button')}}</span>
                        </div>
                        <p></p>
                    </div>
                    <p class="fp">{{$t('logo.all_p')}}</p>
                </div>
            </div>
            <div class="logo-bottom-back"></div>
            <div class="pay-way-carousel">
                <h3>{{$t('logo.mult_way')}}</h3>
                <p class="border-point"></p>
                <p class="text">
                    {{$t('logo.item2_p1')}}
                </p>
                <p class="text" style="max-width:60rem;margin:0 auto;">
                    {{$t('logo.item2_p2')}}
                </p>
                <el-carousel :interval="4000" :autoplay='true' type="card" height="17rem" >
                    <el-carousel-item v-for="(item,key) in arr" :key="key" >
                        <div class="img-box">
                            <img :src="item.src" alt="">
                        </div>
                        <h3>{{item.h3}}</h3>
                        <p>{{item.p}}</p>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="platform_serve">
                <div class="banxin">
                    <h3>{{$t('logo.item3_title')}}</h3>
                    <p class="border-platform"></p>
                    <div class="serve">
                        <div class="serve-box">
                            <div class="serve-one last" @mouseenter="first_show=true" @mouseleave="first_show=false">
                                <img src="../../assets/images/logopage/2019-5-9/net.png" alt="">
                                <div class="last last-no" v-show="first_show">
                                    <p class="last-img" >
                                        <img src="../../assets/images/logopage/2019-5-9/serve-one.png" alt="">
                                    </p>
                                </div>
                                <div :class="first_show?'active':''">
                                    <h4>{{$t('logo.item3_it1_h')}}</h4>
                                    <p :class="lang">{{$t('logo.item3_it1_p')}}</p>
                                </div>
                            </div>
                            <div class="serve-one last" @mouseenter="second_show=true" @mouseleave="second_show=false" >
                                <img src="../../assets/images/logopage/2019-5-9/chat.jpg" alt="">
                                <div class="last last-no" v-show="second_show" >
                                    <p class="last-img" >
                                        <img src="../../assets/images/logopage/2019-5-9/serve-two.png" alt="">
                                    </p>
                                </div>
                                <div :class="second_show?'active':''">
                                    <h4>{{$t('logo.item3_it2_h')}}</h4>
                                    <p :class="lang">{{$t('logo.item3_it2_p')}}</p>
                                </div>
                            </div>
                            <div class="serve-one last" @mouseenter="last_show=true" @mouseleave="last_show=false" >
                                <img src="../../assets/images/logopage/2019-5-9/pay.jpg" alt="" 
                                
                                >
                                <div class="last" v-show="last_show">
                                    <p class="last" @click="$router.push('/payment-detail')">
                                        <span >{{$t('logo.item3_it3_dd')}}</span><img src="../../assets/images/logopage/2019-5-9/arrow.png" alt="">
                                    </p>
                                </div>
                                <div :class="last_show?'active':''">
                                    <div>
                                        <h4 :class="lang">{{$t('logo.item3_it3_h')}}</h4>
                                        <span @click="$router.push('/payment-detail')">{{$t('logo.item3_it3_de')}}</span>
                                    </div>
                                    <p :class="lang">{{$t('logo.item3_it3_p')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="platform_safe">
                <div class="banxin">
                    <h3>{{$t('logo.item4_title')}}</h3>
                    <p class="border-platform"></p>
                    <div class="safe-box">
                        <div class="safe-top">
                            <div class="one" data-src='../../assets/images/logopage/2019-5-9/safe-ok.png'>
                                <h3 :class="lang">{{$t('logo.item4_it1_h')}}</h3>
                                <p :class="lang">{{$t('logo.item4_it1_p')}}</p>
                                <img src="../../assets/images/logopage/2019-5-9/safe-ok.png" alt="">
                            </div>
                            <div class="one" data-src='../../assets/images/logopage/2019-5-9/safe-refer.png'>
                                <h3 :class="lang">{{$t('logo.item4_it2_h')}}</h3>
                                <p :class="lang">{{$t('logo.item4_it2_p')}}</p>
                                <img src="../../assets/images/logopage/2019-5-9/safe-refer.png" alt="">
                            </div>
                            <div class="one" data-src='../../assets/images/logopage/2019-5-9/safe-walt.png'>
                                <h3 :class="lang">{{$t('logo.item4_it3_h')}}</h3>
                                <p :class="lang">{{$t('logo.item4_it3_p')}}</p>
                                <img src="../../assets/images/logopage/2019-5-9/safe-walt.png" alt="">
                            </div>
                        </div>
                        <div class="safe-bottom">
                            <div class="one2" data-src='../../assets/images/logopage/2019-5-9/safe-fa.png'>
                                <h3 :class="lang">{{$t('logo.item4_it4_h')}}</h3>
                                <p :class="lang">{{$t('logo.item4_it4_p')}}</p>
                                <img src="../../assets/images/logopage/2019-5-9/safe-fa.png" alt="">
                            </div>
                            <div class="one2" data-src='../../assets/images/logopage/2019-5-9/safe-suo.png'>
                                <h3 :class="lang">{{$t('logo.item4_it5_h')}}</h3>
                                <p :class="lang">{{$t('logo.item4_it5_p')}}</p>
                                <img src="../../assets/images/logopage/2019-5-9/safe-suo.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="logo-bottom-box">
                <div class="banxin">
                    <div class="bottom-head">
                        <!-- <h3>为什么选择Royalbiz？</h3> -->
                        <h3>{{$t('logo.item5_title')}}</h3>
                        <p class="p-border"></p>
                    </div>
                    <div class="logo-bottom-center">
                        <div class="box">
                            <div class="one"  @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2019-5-9/api.png" alt="">
                                <span>{{$t('logo.item5_it1')}}</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2019-5-9/zijin.png" alt="">
                                <span>{{$t('logo.item5_it2')}}</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2019-5-9/baodan.png" alt="">
                                <span>{{$t('logo.item5_it3')}}</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2019-5-9/cunchu.png" alt="">
                                <span>{{$t('logo.item5_it4')}}</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2019-5-9/jiami.png" alt="">
                                <span>{{$t('logo.item5_it5')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="logo-foot">
                <!-- <p>当前服务器时间：Thu Dec 06 2018 09:33:10 GMT+0800 (中国标准时间)</p> -->
                <p>{{$t('info_item.server_time')}}：{{time}}</p>
                <p>{{$t('info_item.copyright')}} © {{moment().year()}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {
    QueryQtcTradeFunIndex,
    QueryLegalTradeFunIndex,
    priceCalcFunIndex,
} from '../../assets/js/api.js'
import moment from 'moment'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            text_right:false,
            text_left:false,
            time:null,
            last_show:false,
            first_show:false,
            second_show:false,
            active_num:0,
            arr:[],
            qtc:'',
            qtc_show:false,
            qtcArr:[],
            legal:'',
            legal_show:false,
            legalArr:[],
            legal_num:100,
            qtc_num:null,
            canPrice:null,
            src1:require('../../assets/images/logopage/2019-5-9/gift_pay.png'),
            src2:require('../../assets/images/logopage/2019-5-9/net_pay.png'),
            src3:require('../../assets/images/logopage/2019-5-9/bank_pay.png'),
        }
    },
    computed:{
        login(){
            return this.$store.getters.login
        },
        lang() {
             return this.$i18n.locale
        }
    },
    watch:{
        lang(n, o) {
            this.arr = this.$t('logo.arr');
            this.arr[0].src = this.src1
            this.arr[1].src = this.src2
            this.arr[2].src = this.src3
        },
        qtc_show(n,o) {
            console.log(n,'--------------')
            this.setFocus('qtc')
            // if(n) {
            //     let k = setTimeout(() => {
            //         this.setFocus('qtc')
            //         clearTimeout(k)
            //     },1000)
            // }
        },
        legal_show(n,o) {
            this.setFocus('legal')
            // if(n) {
            //     let k = setTimeout(() => {
            //         this.setFocus('legal')
            //         clearTimeout(k)
            //     },1000)
            // }
        },
        legal_num(n, o) {
            if(this.canPrice!='legal') { return false }
            if(this.legalArr.length>0) {
                let name = (this.legalArr.filter(item => item.id == this.legal))[0].coinName
                let name2 = (this.qtcArr.filter(item => item.id == this.qtc))[0].abbreviation
                let item = {
                    amount:n,//输入金额
                    inputCoinType:0,//输入类型  0计算交易币种数量（填了左边），1计算法币金额（填了右边）
                    legalTenderCoinName:name,//法币名称
                    tradeCoinName:name2,//交易币种
                }
                this.initPrice(item)
            }
        },
        legal(n ,o) {
            if(this.legalArr.length>0) {
                let name = (this.legalArr.filter(item => item.id == n))[0].coinName
                let name2 = (this.qtcArr.filter(item => item.id == this.qtc))[0].abbreviation
                let item = {
                    amount:this.legal_num,//输入金额
                    inputCoinType:0,//输入类型  0计算交易币种数量（填了左边），1计算法币金额（填了右边）
                    legalTenderCoinName:name,//法币名称
                    tradeCoinName:name2,//交易币种
                }
                this.initPrice(item)
            }
        },
        qtc(n, o) {
            if(this.legalArr.length>0) {
                let name = (this.legalArr.filter(item => item.id == this.legal))[0].coinName
                let name2 = (this.qtcArr.filter(item => item.id == n))[0].abbreviation
                let item = {
                    amount:this.qtc_num,//输入金额
                    inputCoinType:1,//输入类型  0计算交易币种数量（填了左边），1计算法币金额（填了右边）
                    legalTenderCoinName:name,//法币名称
                    tradeCoinName:name2,//交易币种
                }
                this.initPrice(item)
            }
        },
        qtc_num(n, o) {
            if(this.canPrice!='qtc') { return false }
            if(this.legalArr.length>0) {
                let name = (this.legalArr.filter(item => item.id == this.legal))[0].coinName
                let name2 = (this.qtcArr.filter(item => item.id == this.qtc))[0].abbreviation
                let item = {
                    amount:n,//输入金额
                    inputCoinType:1,//输入类型  0计算交易币种数量（填了左边），1计算法币金额（填了右边）
                    legalTenderCoinName:name,//法币名称
                    tradeCoinName:name2,//交易币种
                }
                this.initPrice(item)
            }
        },
    },
    async created(){
        this.arr = this.$t('logo.arr');
            this.arr[0].src = this.src1
            this.arr[1].src = this.src2
            this.arr[2].src = this.src3
        setInterval(()=>{
            // console.log(new Date(this.$store.getters.os_time+1))
            if(this.lang=='en') {
                this.time = new Date(new Date(moment().millisecond(this.$store.getters.os_time)+1)).toUTCString().replace("GMT","UTC")+' +0'
            }else{
                this.time = new Date(new Date(moment().millisecond(this.$store.getters.os_time)+1)).toUTCString().replace("GMT","UTC")+' +0'
            }
        },1000)
        await this.initQtc()
        await this.initLegal()
        if(this.legalArr.length>0) {
            let name = (this.legalArr.filter(item => item.id == this.legal))[0].coinName
            let name2 = (this.qtcArr.filter(item => item.id == this.qtc))[0].abbreviation
            let item = {
                amount:this.legal_num,//输入金额
                inputCoinType:0,//输入类型  0计算交易币种数量（填了左边），1计算法币金额（填了右边）
                legalTenderCoinName:name,//法币名称
                tradeCoinName:name2,//交易币种
            }
            this.initPrice(item)
        }
       
    },
    methods:{
        setItem(id) {
            console.log('iiii',id)
            this.legal= id
        },
        goMarket() {
            if(this.login) {
                this.$store.dispatch('async__set_custome',true)
            }else {
                this.$store.dispatch('async__set_custome',false)
            }
            this.$router.push({name:'legalCurrency',params:{custome:false}})
        },
        getInputFocus(str) {
            console.log(str)
            this.canPrice = str;
        },
        setFocus(str) {
            if(str=='legal') {
                let dom2 = document.getElementById('legal_box_id');
                if(dom2) {
                    dom2.focus()
                }
            }else {
                let dom = document.getElementById('qtc_box_id');
                if(dom) {
                    dom.focus()
                }
            }
        },
        open(){
            window.open('http://doc.royalbiz.co/docs/a1/a1-1')
        },
        inFun(dom) {
            let t = setTimeout(()=>{
                console.log(dom.srcElement.classList.contains('img'))
                if(dom.srcElement.classList.contains('img')) {
                }else{
                        dom.srcElement.classList.add('img')
                }
                clearTimeout(t)
            },900)
        },
        outFun(dom) {
            let t = setTimeout(()=>{
                dom.srcElement.classList.remove('img')
                clearTimeout(t)
            },900)
        },
        async initQtc() {
            let key = await QueryQtcTradeFunIndex(this)
            .then((res) => {return res})
            if(key != false) {
                // console.log(key)
                this.qtcArr = key
                this.qtc = key[0].id
            }
        },
        async initLegal() {
            let key = await QueryLegalTradeFunIndex(this)
            .then((res) => {return res})
            if(key != false) {
                this.legalArr = key
                this.legal = key[0].id
            }
        },
        async initPrice(item) {
            let tem = item;
            let key = await priceCalcFunIndex(this,item)
            .then((res) => {return res})
            if(key != false) {
                // console.log(key)
                
                if(tem.inputCoinType==1) {
                    this.legal_num = key.legalTenderCoinAmount
                } else {
                    this.qtc_num = key.tradeCoinAmount
                }
                
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>
.logo-page{
    .logo-page-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 23rem /* 460/20 */;
        h3{
            font-weight: 600;
        }
        .legal-currency-box-img{
            height: 90vh;
            background: url('../../assets/images/logopage/2019-5-9/top.jpg') no-repeat;
            // background-image: linear-gradient(30deg,#1E225A,#3A6797);
            // background: url('../../assets/images/logopage/tu9@2x.png') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E9%A6%96%E9%A1%B5/tu9%402x.png) no-repeat center center;
            background-size: cover;
            position: relative;
            box-sizing:border-box;
            padding-top: 8rem;
            h3.ff{
                font-size:30px;
                font-weight:800;
                line-height:30px;
                color:rgba(255,255,255,1);
                text-shadow:0px 0px 10px rgba(43,43,100,0.50);
                text-align: center;
            }
            .allpay{
                margin-top: 1.5rem;
                .allpay-top{
                    height:55px;
                    background:rgba(255,255,255,1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 1rem;
                    h3{
                        font-size:1rem /* 20/20 */;
                        font-weight:bold;
                        line-height:1.5rem /* 30/20 */;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        // width:160px;
                        height:1.5rem /* 30/20 */;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(92,137,204,1);
                        opacity:1;
                        border-radius:.9rem /* 18/20 */;
                        cursor: pointer;
                        font-size:.7rem /* 14/20 */;
                        font-weight:400;
                        color:rgba(92,137,204,1);
                        box-sizing: border-box;
                        padding: 0 .5rem;
                    }
                    span:hover{
                        background:rgba(92,137,204,1);
                        color:rgba(255,255,255,1);
                        border:1px solid rgba(255,255,255,1);
                    }
                }
                .allpay-list{
                    margin-top: 1px;
                    display: flex;
                    justify-content: space-between;
                    .pay-item{
                        box-sizing: border-box;
                        padding-left: .5rem;
                        height:5rem /* 100/20 */;
                        width: 9.959rem /* 199/20 */;//9.955
                        background:rgba(255,255,255,.5);
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                        transition: all .2s ease-in-out;
                        .pay-left{
                            box-sizing: border-box;
                            padding-top: 1.1rem;
                            width: 1.25rem /* 25/20 */;
                            display: flex;
                            flex-direction: row;
                            align-items: flex-start;
                            img{
                                // margin-top: 1.25rem /* 25/20 */;
                            }
                            margin-right: .5rem;
                        }
                        .pay-right{
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            flex:1;
                            h3{
                                font-size: .8rem /* 16/20 */;
                                font-weight:800;
                                color:rgba(34,34,34,1);
                            }
                            h3.en{
                                font-size: .75rem /* 15/20 */;
                            }
                            p{
                                font-size: .7rem /* 14/20 */;
                                font-weight:400;
                                line-height:2rem /* 40/20 */;
                                color:rgba(51,51,51,1);
                            }
                            p.en{
                                // line-height: 1.2rem;
                                font-size: .6rem /* 12/20 */;
                            }
                        }
                    }
                    .pay-item.active{
                        background:rgba(255,255,255,.8);
                        border-bottom: 5px solid #68A5FF;
                    }
                }
            }
            .calculate{
                height:5rem /* 100/20 */;
                background:rgba(255,255,255,.5);
                // opacity:0.5;
                box-sizing: border-box;
                padding: .5rem;
                margin-top: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                input[type=number] {
                    -moz-appearance:textfield;
                }
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                img.dui{
                    width: 1.5rem /* 30/20 */;
                    height: 1.5rem;
                }
                .one-input-select{
                    width:26rem /* 520/20 */;
                    height:4rem /* 80/20 */;
                    background:rgba(255,255,255,1);
                    box-sizing: border-box;
                    padding: 0rem /* 8/20 */ 0 .5rem /* 10/20 */ 1rem /* 20/20 */;
                    display: flex;
                    justify-content: space-between;
                    label{
                        font-size:.7rem /* 14/20 */;
                        font-weight:400;
                        line-height:1.5rem /* 30/20 */;
                        color:rgba(102,102,102,1);
                    }
                    .input-label{
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        input{
                            font-family: Myriad Variable Concept;
                            font-size: 1.3rem /* 26/20 */;
                            font-weight: bold;
                            color: #333;
                        }
                    }
                    .input-sele{
                        width:7rem /* 140/20 */;
                        height:4rem /* 80/20 */;
                        background:rgba(92,137,204,1);
                        position: relative;
                        .select{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;
                            padding: 0 .7rem;
                            align-items: center;
                            cursor: pointer;
                            span{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size:28px;
                                font-weight:800;
                                flex: 1;
                                line-height:30px;
                                color:rgba(255,255,255,1);
                            }
                            i{
                                color: rgba(255,255,255,1);
                                transition: all .4s ease-in-out;
                            }
                            i.i-top{
                                transform: rotateZ(180deg);
                            }
                        }
                        .ul{
                            position: absolute;
                            top: 4rem /* 80/20 */;
                            width: 7rem /* 140/20 */;
                            overflow: hidden;
                            right: 0px;
                            height: 15rem;
                            overflow-y: auto;
                            cursor:default;
                            &::-webkit-scrollbar {
                                display: none;
                            }
                            
                            &::-webkit-scrollbar-track {
                                display: none;
                            }
                            
                            &::-webkit-scrollbar-thumb {
                                display: none;
                            }
                            
                            &::-webkit-scrollbar-button:start {
                                display: none;
                            }
                            
                            &::-webkit-scrollbar-button:end {
                                display: none;
                            }    
                        }
                        ul{
                            width: 7rem /* 140/20 */;
                            position: absolute;
                            // top: 4rem /* 80/20 */;
                            top: -12rem;
                            z-index: -1;
                            // height: 0px;
                            // visibility: hidden;
                            // opacity: 0;
                            transition: all .4s ease-in-out;
                            li{
                                background:rgb(255,255,255);
                                height:4rem /* 80/20 */;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size:1.4rem /* 28/20 */;
                                font-weight:800;
                                color:rgb(92,137,204);
                            }
                            li.active{
                                background:#DEE7F5
                            }
                            li:hover{
                                background:#DEE7F5;
                            }
                        }
                        ul.les{
                            // visibility: visible;
                            top: 0.05rem;
                            // height: 15rem /* 300/20 */;
                            z-index: 2;
                        }
                    }
                }
                .one-input-select.sel-two{
                    label{
                        font-size:14px;
                        font-weight:400;
                        line-height:30px;
                        color:#229C89;
                    }
                    .input-sele{
                        width:7rem /* 140/20 */;
                        height:4rem /* 80/20 */;
                        background:rgba(34,156,137,1);
                        ul{
                            width: 7rem /* 140/20 */;
                            position: absolute;
                            // top: 4rem /* 80/20 */;
                            li{
                                background:rgb(255,255,255);
                                height:4rem /* 80/20 */;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size:1.4rem /* 28/20 */;
                                font-weight:800;
                                color:rgb(34,156,137);
                            }
                            li.active{
                                background:#d2ebe7cc;
                                background:#D2EBE7;
                            }
                            li:hover{
                                background:#D2EBE7;
                            }
                        }
                    }
                }
            }
            .go-market{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 5rem /* 150/20 */;
                margin-top: 2.25rem /* 45/20 */;
                p{
                    width:15rem /* 300/20 */;
                    height:1px;
                    background:rgba(227,230,238,1);
                }
                .market-box{
                    height: 5rem /* 100/20 */;
                    width: 21rem /* 420/20 */;
                    background:rgba(104,165,255,1);
                    border-radius:5px;
                    border-bottom: .5rem /* 10/20 */ solid #5384CC;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow:0px 0px 20px rgba(27,56,109,1);
                    cursor: pointer;
                    img{
                        width: 2.25rem /* 55/20 */;
                        height: 2.25rem;
                        margin-right: 1rem;
                    }
                    span{
                        font-size:1.2rem /* 24/20 */;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        
                    }
                }
                .market-box:hover{
                    background: #86B7FF;
                    box-shadow:0px 0px 20px rgba(27,56,109,1);
                    border-bottom: .5rem /* 10/20 */ solid #5384CC;
                }
            }
            p.fp{
                font-size:.9rem /* 18/20 */;
                font-weight:400;
                line-height:1.8rem /* 36/20 */;
                color:rgba(230,230,230,1);
                text-align: center;
                margin-top: 2.5rem /* 50/20 */;
            }
        }
        
        .logo-bottom-back{
            height: 0rem /* 10/20 */;
            background:rgba(230,230,230,1);
        }
        .pay-way-carousel{
            // background:bisque;
            text-align: center;
            padding-top: 1.85rem;
            p.border-point{
                height: .25rem /* 5/20 */;
                width: 3rem /* 60/20 */;
                background:rgba(76,96,133,1);
                margin: 15px auto;
            }
            p.text{
                font-size:.9rem /* 18/20 */;
                font-weight:400;
                line-height:1.8rem /* 36/20 */;
                color:rgba(128,128,128,1);
            }
            h3{
                font-size:1.5rem /* 30/20 */;
                font-weight:bold;
                line-height:2.5rem /* 30/20 */;
                color:rgba(0,0,0,1);
                // margin-top: .75rem /* 15/20 */;
            }
            height: 30.5rem /* 610/20 */;
            .el-carousel.el-carousel--card{
                width: 60rem /* 1200/20 */;
                margin: 0 auto;
                margin-top: 2rem;
                overflow: hidden;
                .el-carousel__container{
                    
                    .el-carousel__item--card.is-active{
                        .img-box{
                            display: flex;
                            width:12rem /* 240/20 */;
                            height:12rem /* 240/20 */;
                            background:rgba(255,255,255,1);
                            box-shadow:0px 5px 20px rgba(81,100,144,0.3);
                            justify-content: center;
                            align-items: center;
                            img{
                                width: 7rem /* 140/20 */;
                                height: 7rem;
                                // transform:scaleX(1.3) scaleY(1.3);
                            }
                        }
                        
                    }
                    h3{
                        font-size:1rem /* 20/20 */;
                        font-weight:bold;
                        line-height:1.5rem /* 30/20 */;
                        color:rgba(0,0,0,1);
                        margin-top: .5rem;
                    }
                    p{
                        font-size:.7rem /* 14/20 */;
                        font-weight:400;
                        line-height:1.4rem /* 28/20 */;
                        color:rgba(128,128,128,1);
                    }
                }
                
                .el-carousel__item--card{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                .el-carousel__item--card.is-in-stage{
                    .img-box{
                        display: flex;
                        justify-content: center;
                            align-items: center;
                        width:8rem /* 160/20 */;
                        height:8rem /* 160/20 */;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 1px 10px rgba(81,100,144,0.2);
                        img{
                            width: 4rem /* 80/20 */;
                            height: 4rem;
                        }
                    }
                    
                }
            }
        }
        .platform_serve{
            height: 24rem /* 480/20 */;
            background: url('../../assets/images/logopage/2019-5-9/center.png') no-repeat;
            background-size: cover;
            box-sizing: border-box;
            padding-top: 1rem;
            h3{
                text-align: center;
                font-size:1.5rem /* 30/20 */;
                font-weight:bold;
                line-height:3.5rem /* 30/20 */;
                color:rgba(255,255,255,1);
            }
            p.border-platform{
                width: 3rem /* 60/20 */;
                height:5px;
                background:rgba(255,255,255,1);
                margin: 0 auto;
            }
            .serve{
                position: absolute;
                width: 100%;
                top: 7rem;
            }
            .serve-box{
                display: flex;
                justify-content: space-between;
                .serve-one{
                    width: 19rem /* 380/20 */;
                    height: 26.5rem /* 530/20 */;
                    img{
                        width: 19rem /* 380/20 */;
                        height: 16rem /* 320/20 */;
                    }
                    background: white;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 10px 20px rgba(81,100,144,0.3);
                    transition: all 0.2s ease-in,color 0.2s ease-out;
                    border: 0px solid white;
                }
                .serve-one:hover{
                    margin-top: -1rem;
                    // border: 1px solid #5C89CC;
                    // transform: scaleX(.98) scaleY(.98);
                }
                .serve-one>div{
                    height: 10.5rem /* 210/20 */;
                    box-sizing: border-box;
                    padding: 1.5rem /* 30/20 */ 1rem /* 20/20 */ .65rem /* 13/20 */;
                    background: rgba(255,255,255,1);
                    transition: all .5s ease-in-out;
                    h4{
                        font-size:1.2rem /* 24/20 */;
                        font-weight:bold;
                        line-height:3rem /* 60/20 */;
                        color:rgba(51,51,51,1);
                    }
                    p{
                        font-size:.7rem /* 14/20 */;
                        font-weight:400;
                        line-height:1.5rem /* 30/20 */;
                        color:rgba(153,153,153,1);
                    }
                    h4.en{
                        width: 70%;
                        line-height: 2rem;
                    }
                    p.en{
                        line-height: 1.2rem;
                    }
                    div{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width:80px;
                            height:30px;
                            border:1px solid rgba(92,137,204,1);
                            opacity:1;
                            border-radius:17px;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(92,137,204,1);
                            cursor: pointer;
                        }
                        span:hover{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width:80px;
                            height:30px;
                            border:1px solid white;
                            opacity:1;
                            border-radius:17px;
                            font-size:14px;
                            font-weight:400;
                            color:white;
                            background: rgba(92,137,204,1);
                            cursor: pointer;
                        }
                    }
                }
                .serve-one>div.active{
                    background: #5C89CC;
                    h4{
                        color: white;
                    }
                    p{
                        color: #e6e6e6;
                    }
                    div{
                        span{
                            border:1px solid white;
                            opacity:1;
                            border-radius:17px;
                            font-size:14px;
                            font-weight:400;
                            background:white;
                            color: rgba(92,137,204,1);
                        }
                    }
                }
                .serve-one.last{
                    position: relative;
                    img{
                        cursor: pointer;
                    }
                    div.last{
                        width: 19rem /* 380/20 */;
                        height: 16rem /* 320/20 */;
                        background:rgba(76,96,133,.6);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        p{
                            border:1px solid rgba(255,255,255,1);
                            padding: 1rem;
                            span{
                                color:rgba(255,255,255,1);
                                font-size: 1.2rem /* 24/20 */;
                                // font-weight: bold;
                            }
                            img{
                                width: .45rem /* 9/20 */;
                                height: .75rem /* 15/20 */;
                                font-weight: bold;
                                vertical-align: baseline;
                                margin-left: .7rem;
                            }
                        }
                        p.last-img{
                            width: 3rem /* 60/20 */;
                            height: 3rem /* 60/20 */;
                            border: 0px;
                            img{
                                width: 3rem /* 60/20 */;
                                height: 3rem /* 60/20 */;
                                margin-left: 0;
                            }
                        }
                    }
                    div.last.last-no{
                        background:none;
                        img{
                            display: none;
                        }
                    }
                }
            }
        }
        .platform_safe{
            height: 42.6rem /* 852/20 */;
            box-sizing: border-box;
            padding-top: 15rem /* 300/20 */;
            h3{
                text-align: center;
                font-size:1.5rem /* 30/20 */;
                font-weight:bold;
                line-height:3.5rem /* 30/20 */;
                color:rgba(51,51,51,1);
            }
            p.border-platform{
                width: 3rem /* 60/20 */;
                height:5px;
                background:rgba(76,96,133,1);
                margin: 0 auto;
            }
            .safe-box{
                margin-top: 2.5rem /* 50/20 */;
                .safe-top{
                    display: flex;
                    justify-content: space-between;
                    .one{
                        width:19.5rem /* 390/20 */;
                        height:7.5rem /* 150/20 */;
                        background:rgba(234,239,248,1);
                        box-sizing: border-box;
                        padding: 1rem 1.5rem /* 30/20 */;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        position: relative;
                        h3{
                            font-size:1.2rem /* 24/20 */;
                            font-weight:bold;
                            line-height:2.5rem /* 50/20 */;
                            color:rgba(51,51,51,1);
                            text-align: left;
                        }
                        h3.en{
                            font-size: .9rem;
                        }
                        p{
                            font-size:.8rem /* 16/20 */;
                            font-weight:400;
                            line-height:1.5rem /* 30/20 */;
                            color:rgba(102,102,102,1);
                        }
                        img{
                            position: absolute;
                            width: 3rem;
                            height: 3rem;
                            top: -.5rem;
                            right: 2rem;
                        }
                    }
                }
                .safe-bottom{
                    margin-top: 1.25rem /* 25/20 */;
                    display: flex;
                    justify-content: space-between;
                    .one2{
                        width:29.6rem /* 592/20 */;
                        height:7.5rem /* 150/20 */;
                        background:rgba(234,239,248,1);
                        box-sizing: border-box;
                        padding: 1rem 1.5rem /* 30/20 */;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        position: relative;
                        h3{
                            font-size:1.2rem /* 24/20 */;
                            font-weight:bold;
                            line-height:2.5rem /* 50/20 */;
                            color:rgba(51,51,51,1);
                        }
                        h3.en{
                            font-size: .9rem;
                        }
                        p{
                            font-size:.8rem /* 16/20 */;
                            font-weight:400;
                            line-height:1.5rem /* 30/20 */;
                            color:rgba(102,102,102,1);
                        }
                        p.en{
                            line-height: 1rem;
                        }
                        img{
                            position: absolute;
                            width: 3rem;
                            height: 3rem;
                            top: -.5rem;
                            right: 2rem;
                        }
                    }
                }
            }
        }
        .logo-bottom-box{
            height: 55.5rem /* 1110/20 */;
            height: 20rem /* 400/20 */;
            background: url('../../assets/images/logopage/2019-5-9/bottom.jpg') no-repeat;
            background-size: cover;
            box-sizing: border-box;
            padding-top: 1.5rem;
            .bottom-head{
                text-align: center;
                // margin-top: 2.5rem /* 50/20 */;
                h3{
                    font-size: 1.2rem /* 24/20 */;
                    color:rgba(51,51,51,1);
                    color:#000;
                    color:rgba(255,255,255,1);
                    line-height: 4rem /* 50/20 */;
                    box-sizing: border-box;
                    padding-left: .3rem;
                }
                p.p-border{
                    height: .25rem /* 8/20 */;
                    width:3rem /* 140/20 */;
                    background:rgba(76,96,133,1);
                    background: rgba(255,255,255,1);
                    margin-left: 50%;
                    transform: translateX(-50%);
                }
                p.p-head{
                    font-size: .8rem /* 16/20 */;
                    color:rgba(204,204,204,1);
                    line-height: 1.5rem /* 40/20 */;
                    margin-bottom: .4rem;
                    letter-spacing: 2px;
                }
            }
            .logo-bottom-center{
                // margin-top: 1.75rem /* 35/20 */;
                p{
                    text-align: center;
                    font-size: 1rem /* 20/20 */;
                    color:rgba(102,102,102,1);
                    line-height: 1.5rem /* 30/20 */;
                    margin-bottom: 2rem;
                }
                .box{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2.5rem;
                    .one{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        box-sizing: border-box;
                        padding:0rem 0.9rem ;
                        width: 12rem /* 240/20 */;
                        img{
                            display: inline-block;
                            width: 4.5rem /* 90/20 */;
                            height: 5.25rem /* 105/20 */;
                            // border:1px dashed rgba(204,204,204,1);
                            transform: rotateY(0deg);
                            animation:  imgRotateInit 1s;
                        }
                        span{
                            margin-top: 1rem;
                            font-size: .9rem /* 18/20 */;
                            font-size: .7rem /* 14/20 */;
                            color:rgba(102,102,102,1);
                            color:rgba(255,255,255,1);
                            line-height: 1.05rem /* 21/20 */;
                            text-align: center;
                        }
                    }
                    
                    @keyframes imgRotate {
                        0%{
                        }
                        100%{
                            transform:rotateY(180deg);
                        }
                    }
                    @keyframes imgRotateInit {
                        0%{
                            transform:rotateY(180deg);
                        }
                        100%{
                            transform:rotateY(0deg);
                        }
                    }
                    .one:hover{
                        img{
                            animation: imgRotate 1s;
                        }
                    }
                    .one.img{
                        img{
                            transform:rotateY(180deg);
                        }
                    }
                }
            }
        }
        
        .logo-foot{
            height: 5rem /* 100/20 */;
            background:rgba(76,96,133,1);
            background:rgba(242,242,242,1);
            // background: #011525;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
                text-align: center;
                font-size: .7rem /* 14/20 */;
                color:rgba(255, 255, 255, 1);
                color:rgba(51,51,51,1);
                // color:white;
                line-height: 1.5rem /* 30/20 */;
            }
        }
    }
}

 @media screen and(max-width: 480px) {
                
    .logo-top-center{
        width: 30rem!important;
    }
    .logo-bottom-box{
        height: 29rem!important;
        .box{
            flex-wrap: wrap;
        }
    }
    
}
</style>
