<template>
    <div id="logo-page">
        <top-nav data="width"></top-nav>
        <div class="logo-top">
            <h3>{{$t('logo.title')}}</h3>
            <p>{{$t('logo.all_p')}}</p>
            <div class="input-box">
                <div class="box-one">
                    <label for="">{{$t('logo.want')}}</label>
                    <div class="sel">
                        <input type="text" :placeholder="$t('logo.want')" 
                        v-model="legal_num" 
                        @focus="getInputFocus('legal')"
                        >
                        <div class="select">
                            <span>{{legalArr.length>0 ? (legalArr.filter(item => item.id == legal))[0].coinName :''}}</span>
                            <div class="icon" ref="icon1" @click="legal_show = !legal_show">
                                <img :class="legal_show?'active':''" src="../../assets/images/logopage/2019-12-17/sele.png" alt="">
                            </div>
                            <div class="select-ul">
                                <ul :class="legal_show?'gundong2 les':'gundong2'">
                                    <li v-for="(item,key) in legalArr" :key="key" @click="legal= item.id" :class="item.id==legal?'active':''">{{item.coinName}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-one">
                    <label for="">{{$t('logo.get')}}</label>
                    <div class="sel">
                        <input type="text" :placeholder="$t('logo.get')"
                        v-model="qtc_num" 
                        @focus="getInputFocus('qtc')"
                        >
                        <div class="select">
                            <span>{{qtcArr.length >0 ? (qtcArr.filter(item => item.id == qtc))[0].abbreviation.toUpperCase():''}}</span>
                            <div class="icon" ref="icon2" @click="qtc_show= !qtc_show">
                                <img :class="qtc_show?'active':''" src="../../assets/images/logopage/2019-12-17/sele.png" alt="">
                            </div>
                            <div class="select-ul">
                                <ul :class="qtc_show?'gundong2 les':'gundong2'">
                                    <li v-for="(item,key) in qtcArr" :key="key" @click="qtc=item.id" :class="item.id==qtc?'active':''">{{item.abbreviation.toUpperCase()}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn">
                <button
                @click="goMarket"
                >
                    <img :src="img_transfer" alt="">
                    {{$t('logo.button')}}
                </button>
            </div>
        </div>
        <div class="logo-card">
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_bank" alt="">
                    <h3>{{$t('logo.pay_h1')}}</h3>
                </div>
                <p>{{$t('logo.pay_p1')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_ali" alt="">
                    <h3>{{$t('logo.pay_h2')}}</h3>
                </div>
                <p>{{$t('logo.pay_p2')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_wechat" alt="">
                    <h3>{{$t('logo.pay_h9')}}</h3>
                </div>
                <p>{{$t('logo.pay_p9')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_amazon" alt="">
                    <h3>{{$t('logo.pay_h3')}}</h3>
                </div>
                <p>{{$t('logo.pay_p3')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_itunes" alt="">
                    <h3>{{$t('logo.pay_h4')}}</h3>
                </div>
                <p>{{$t('logo.pay_p4')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_jd" alt="">
                    <h3>{{$t('logo.pay_h5')}}</h3>
                </div>
                <p>{{$t('logo.pay_p5')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_sh" alt="">
                    <h3>{{$t('logo.pay_h6')}}</h3>
                </div>
                <p>{{$t('logo.pay_p6')}}</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_all" alt="">
                    <h3>{{$t('logo.pay_h10')}}</h3>
                </div>
                <!-- <p>即时交易-价格最优</p> -->
            </div>
        </div>
        <div class="line-way">
            <div class="line-header">
                <div class="he">
                    <img :src="img_way" alt="">
                    <h3>{{$t('logo.mult_way')}}</h3>
                </div>
                <p>{{$t('logo.item2_p1')}}{{$t('logo.item2_p2')}}</p>
            </div>
            <div class="item-all">
                <div class="item-way">
                    <img :src="img_b_bank" alt="">
                    <h3>{{$t('logo.arr[2].h3')}}</h3>
                    <p>{{$t('logo.arr[2].p')}}</p>
                </div>
                <div class="item-way">
                     <img :src="img_b_net" alt="">
                    <h3>{{$t('logo.arr[1].h3')}}</h3>
                    <p>{{$t('logo.arr[1].p')}}</p>
                </div>
                <div class="item-way">
                     <img :src="img_b_gift" alt="">
                    <h3>{{$t('logo.arr[0].h3')}}</h3>
                    <p>{{$t('logo.arr[0].p')}}</p>
                </div>
            </div>
        </div>
        <div class="column-way">
            <div class="img-box">
                <img :src="img_way01" alt=""
                :class="nav==0?'active':'no'"
                >
                <img :src="img_way02" alt=""
                :class="nav==1?'active':'no'"
                >
                <img :src="img_way03" alt=""
                :class="nav==2?'active':'no'"
                >
            </div>
            <div class="select-way">
                <div :class="nav==0?'select-item active':'select-item'"
                @mouseenter="nav=0"
                >
                    <h3>{{$t('logo.item3_it1_h')}}</h3>
                    <p>{{$t('logo.item3_it1_p')}}</p>
                </div>
                <div :class="nav==1?'select-item active':'select-item'"
                @mouseenter="nav=1"
                >
                    <h3>{{$t('logo.item3_it2_h')}}</h3>
                    <p>{{$t('logo.item3_it2_p')}}</p>
                </div>
                <div :class="nav==2?'select-item active':'select-item'"
                @mouseenter="nav=2"
                >
                    <h3>{{$t('logo.item3_it3_h')}}</h3>
                    <p>{{$t('logo.item3_it3_p')}}</p>
                    <!-- <button @click="$router.push('/payment-detail')">{{$t('logo.item3_it3_de')}}</button> -->
                </div>
            </div>
        </div>
        <div class="safe">
            <div class="safe-h" ref="hs">
                <img :src="img_way" alt="">
                <h3>{{$t('logo.item4_title')}}</h3>
            </div>
            <div class="safe-list" :class="lang" ref="hss">
                <div class="safe-item">
                    <img :src="list01" alt="">
                    <h3>{{$t('logo.item4_it1_h')}}</h3>
                    <p>{{$t('logo.item4_it1_p')}}</p>
                </div>
                <div class="safe-item">
                    <img :src="list02" alt="">
                    <h3>{{$t('logo.item4_it2_h')}}</h3>
                    <p>{{$t('logo.item4_it2_p')}}</p>
                </div>
                <div class="safe-item">
                    <img :src="list03" alt="">
                    <h3>{{$t('logo.item4_it4_h')}}</h3>
                    <p>{{$t('logo.item4_it4_p')}}</p>
                </div>
                <div class="safe-item">
                    <img :src="list04" alt="">
                    <h3>{{$t('logo.item4_it3_h')}}</h3>
                    <p>{{$t('logo.item4_it3_p')}}</p>
                </div>
                <div class="safe-item">
                    <img :src="list05" alt="">
                    <h3>{{$t('logo.item4_it5_h')}}</h3>
                    <p>{{$t('logo.item4_it5_p')}}</p>
                </div>
            </div>
        </div>
        <div class="logo-bottom">
            <div class="safe-box" ref="hh">
                <div class="safe-item">
                    <div class="img">
                        <img :src="safe01" alt="">
                    </div>
                    <p>{{$t('logo.item5_it4')}}</p>
                </div>
                <div class="safe-item">
                    <div class="img">
                        <img :src="safe02" alt="">
                    </div>
                    <p>{{$t('logo.item5_it6')}}</p>
                </div>
                <div class="safe-item">
                    <div class="img">
                        <img :src="safe03" alt="">
                    </div>
                    <p>{{$t('logo.item5_it3')}}</p>
                </div>
                <div class="safe-item">
                    <div class="img">
                        <img :src="safe04" alt="">
                    </div>
                    <p>{{$t('logo.item5_it1')}}</p>
                </div>
                <div class="safe-item">
                    <div class="img">
                        <img :src="safe05" alt="">
                    </div>
                    <p>{{$t('logo.item5_it5')}}</p>
                </div>
            </div>
            <div class="time">
                <p>{{$t('info_item.server_time')}}：{{time}} </p>
                <p>{{$t('info_item.copyright')}} © {{moment().year()}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import {
    QueryQtcTradeFunIndex,
    QueryLegalTradeFunIndex,
    priceCalcFunIndex,
    clientLeaveMessage,
} from '../../assets/js/api.js'
import TopNav from '../../components/TopNav.vue'
export default {
    components:{
        'top-nav': TopNav,
    },
    data() {
        return {
            img_top: require('../../assets/images/logopage/2019-12-17/top-bg.png'),
            img_transfer: require('../../assets/images/logopage/2019-12-17/btn.png'),
            img_bank: require('../../assets/images/logopage/2019-12-17/bank.png'),
            img_ali: require('../../assets/images/logopage/2019-12-17/ali.png'),
            img_wechat: require('../../assets/images/logopage/2019-12-17/wechat.png'),
            img_amazon: require('../../assets/images/logopage/2019-12-17/amazon.png'),
            img_itunes: require('../../assets/images/logopage/2019-12-17/iTunes.png'),
            img_jd: require('../../assets/images/logopage/2019-12-17/jd.png'),
            img_sh: require('../../assets/images/logopage/2019-12-17/sh.png'),
            img_all: require('../../assets/images/logopage/2019-12-17/all.png'),

            img_way: require('../../assets/images/logopage/2019-12-17/way.png'),
            img_b_bank: require('../../assets/images/logopage/2019-12-17/b-bank.png'),
            img_b_net: require('../../assets/images/logopage/2019-12-17/b-net.png'),
            img_b_gift: require('../../assets/images/logopage/2019-12-17/b-gift.png'),

            nav: 0,
            img_way01: require('../../assets/images/logopage/2019-12-17/way02.png'),
            img_way02: require('../../assets/images/logopage/2019-12-17/way01.png'),
            img_way03: require('../../assets/images/logopage/2019-12-17/way03.png'),
            list01: require('../../assets/images/logopage/2019-12-17/list01.png'),
            list02: require('../../assets/images/logopage/2019-12-17/list02.png'),
            list03: require('../../assets/images/logopage/2019-12-17/list03.png'),
            list04: require('../../assets/images/logopage/2019-12-17/list04.png'),
            list05: require('../../assets/images/logopage/2019-12-17/list05.png'),
            safe01: require('../../assets/images/logopage/2019-12-17/safe01.png'),
            safe02: require('../../assets/images/logopage/2019-12-17/safe02.png'),
            safe03: require('../../assets/images/logopage/2019-12-17/safe03.png'),
            safe04: require('../../assets/images/logopage/2019-12-17/safe04.png'),
            safe05: require('../../assets/images/logopage/2019-12-17/safe05.png'),
            time: '',

            legal_num:100,
            qtc_num:null,
            canPrice:null,
            qtc:'',
            legal:'',
            qtcArr:[],
            legalArr:[],
            legal_show: false,
            qtc_show: false,
            observer:null,
        }
    },
    computed: {
        lang() {
             return this.$i18n.locale
        },
        login(){
            return this.$store.getters.login
        },
    },
    watch:{
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
    },
    async created() {
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
    mounted(){
        window.addEventListener('click',this.hide, false)
        if ('IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
            // do something
            this.observer = new IntersectionObserver(entries => {
                if (entries[0].intersectionRatio > 0) {
                    console.log('进入可视区域');
                    let arr = entries[0].target.querySelectorAll('.safe-item')
                    this.doSetTimeout(arr,0);
                    // do something
                } else {
                    console.log('移出可视区域');
                    let arr = entries[0].target.querySelectorAll('.safe-item')
                   arr.forEach((e) => {
                        e.style.visibility = 'hidden';
                        e.classList.remove('botTop')
                    })
                    // do something
                }
            });
            this.observer.observe(this.$refs.hss);
            // this.observer.observe(this.$refs.hh);
        }else {
            let arr = this.$refs.hh.querySelectorAll('.safe-item');
            for(let i = 0;i<arr.length;i++) {
                arr[i].style.visibility = 'visible';
                arr[i].classList.add('botTop')
            }
        }
    },
    beforeDestroy() {
        if(this.observer!=null) {
            this.observer.disconnect();
        }
    },
    methods: {
        doSetTimeout(arr,len) {
            arr[len].style.visibility = 'visible';
            arr[len].classList.add('botTop')
            len += 1
            if(len == arr.length) {
                return
            }
            setTimeout(() => {
                console.log(1)
                this.doSetTimeout(arr,len)
             }, 300);
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
        catIn(target, parent) {
            let path = []
            let parentNode = target
            while (parentNode && parentNode !== document.body) {
                path.push(parentNode)
                parentNode = parentNode.parentNode
            }
            return path.indexOf(parent) !== -1
        },
        hide (e) {
            var that = this;
            // console.log(e.target,this.$el)
            // if(e.target != this.$refs.icon1) {
            //     this.legal_show = false
            // }
            // console.log(that.catIn(e.target, that.$refs.icon1))
            if(!that.catIn(e.target, that.$refs.icon1)) {
                this.legal_show = false;
            }
            if(!that.catIn(e.target, that.$refs.icon2)) {
                this.qtc_show = false;
            }
            // if (!that.catIn(e.target, that.$el)) {
            //     // this.aricon = false
            //     console.log('hha')
            //     // that.legal_show = false;
            //     // that.qtc_show = false;
            // }
        },
        getInputFocus(str) {
            console.log(str)
            this.canPrice = str;
        },
        goMarket() {
            if(this.login) {
                this.$store.dispatch('async__set_custome',true)
            }else {
                this.$store.dispatch('async__set_custome',false)
            }
            this.$router.push({name:'legalCurrency',params:{custome:false}})
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
    }
}
</script>
<style lang="scss" scoped>
#logo-page {
    overflow: hidden;
    min-width: 1300px;
    .logo-top {
        text-align: center;
        background: url(../../assets/images/logopage/2019-12-17/top-bg.png);
        height:611px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
            font-size:30px;
            font-weight:800;
            line-height:42px;
            color:rgba(255,255,255,1);
            margin-bottom: 20px;
        }
        p {
            font-size:16px;
            font-weight:400;
            line-height:22px;
            color:rgba(230,230,230,1);
        }
        .input-box {
            width: 1300px;
            box-sizing: border-box;
            height:200px;
            border:3px solid rgba(107,139,187,1);
            background:linear-gradient(360deg,rgba(25,38,103,1) 0%,rgba(13,21,64,1) 100%);
            box-shadow:0px 0px 99px rgba(23,34,100,0.5);
            opacity:1;
            border-radius:3px;
            margin: 0 auto;
            margin-top: 26px;
            color: #E6E6E6;
            display: flex;
            align-items: center;
            .box-one {
                flex: 1;
                height: inherit;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                padding: 30px 40px 30px 80px;
                align-items: flex-start;
                label {
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(63,199,95,1);
                }
                .sel {
                    margin-top: 30px;
                    height: 42px;
                    display: flex;
                    width: 100%;
                    font-size:30px;
                    font-weight:800;
                    line-height:42px;
                    color:rgba(255,255,255,1);
                    input {
                        height: inherit;
                        background: none;
                        color: #E6E6E6;
                        // width: calc( 100% - 130px);
                        flex: 1;
                        margin-right: 5px;
                    }
                    .select {
                        // width: 130px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        .icon {
                            margin-left: 5px;
                            width:30px;
                            height:30px;
                            background:rgba(255,255,255,1);
                            opacity:1;
                            border-radius:3px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            img {
                                transition: all .3s ease-in-out;
                                &.active {
                                    transform: rotateZ(-180deg);
                                }
                            }
                        }
                        .select-ul {
                            position: absolute;
                            right: 0px;
                            top: 38px;
                            
                            ul {
                                width:130px;
                                max-height:0px;
                                background:rgba(255,255,255,1);
                                box-shadow:0px 0px 10px rgba(34,45,112,0.5);
                                opacity:1;
                                border-radius:3px;
                                overflow-y: auto;
                                font-size:20px;
                                font-weight:400;
                                line-height:28px;
                                color:rgba(102,102,102,1);
                                visibility: hidden;
                                transition: all .3s ease-in-out;
                                li {
                                    height: 40px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;
                                    &.active {
                                        color: #3787FE;
                                    }
                                    &:hover {
                                        background: #D7E7FF;
                                    }
                                }
                                &.les {
                                    width:130px;
                                    max-height:170px;
                                    background:rgba(255,255,255,1);
                                    box-shadow:0px 0px 10px rgba(34,45,112,0.5);
                                    opacity:1;
                                    border-radius:3px;
                                    overflow-y: auto;
                                    font-size:20px;
                                    font-weight:400;
                                    line-height:28px;
                                    color:rgba(102,102,102,1);
                                    visibility: visible;
                                }
                            }

                        }
                    }
                }
                &:nth-child(1) {
                    border-right: 3px solid rgba(107,139,187,1);
                    label {
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(230,230,230,1);
                    }
                }
            }
        }
        .btn {
            margin-top: 50px;
            button {
                width:340px;
                height:80px;
                background:linear-gradient(180deg,rgba(55,135,254,1) 0%,rgba(45,91,242,1) 100%);
                box-shadow:0px 0px 10px rgba(34,45,112,0.5);
                opacity:1;
                border-radius:3px;
                border: 0px;
                font-size:20px;
                font-weight:400;
                line-height:28px;
                color:rgba(255,255,255,1);
                &:hover {
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        width:340px;
                        height:80px;
                        background: rgba(0,0,0,.1);
                        z-index: 2;
                        left: 0px;
                        top: 0px;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
    .logo-card {
        display: flex;
        background:rgba(242,242,242,1);
        height:120px;
        .card-item {
            flex: 1;
            height: inherit;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid rgba(153,153,153,.2);
            .card-img {
                display: flex;
                align-items: center;
                h3 {
                    font-size:18px;
                    font-weight:400;
                    line-height:25px;
                    color:rgba(34,34,34,1);
                    margin-left: 10px;
                }
                img {
                    width: 25px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
            p {
                font-size:14px;
                font-weight:400;
                line-height:20px;
                color:rgba(153,153,153,1);
            }
            &:nth-child(:last-child) {
                border-right: 0px;
            }
            box-sizing: border-box;
            padding: 30px 0px 30px 40px;
        }
    }
    .line-way {
        height: 570px;
        box-sizing: border-box;
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .line-header {
            text-align: center;
            margin-bottom: 20px;
            .he {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 25px;
                    height: 30px;
                }
                h3 {
                    margin-left: 10px;
                    font-size:30px;
                    font-weight:800;
                    line-height:42px;
                    color:rgba(34,34,34,1);
                }
            }
            p {
                font-size:16px;
                font-weight:400;
                line-height:32px;
                color:rgba(153,153,153,1);
                text-align: center;
                width: 1300px;
                margin: 0 auto;
            }
        }
        
        .item-all {
            width: 1300px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .item-way {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width:400px;
                height:240px;
                background:rgba(242,247,254,1);
                opacity:1;
                border-radius:5px 5px 0px 0px;
                position: relative;
                img {
                    width: 190px;
                    height: 140px;
                    position: absolute;
                    left: 50%;
                    top: -90px;
                    transform: translateX(-50%);
                }
                h3 {
                    font-size:20px;
                    font-weight:400;
                    line-height:32px;
                    color:rgba(34,34,34,1);
                }
                p {
                    font-size:16px;
                    font-weight:400;
                    line-height:32px;
                    color:rgba(153,153,153,1);
                }
            }
        }
    }
    .column-way {
        height: 640px;
        display: flex;
        background:rgba(40,51,121,1);
        color: #FFFFFF;
        div  {
            flex: 1;
            overflow: hidden;
            &.img-box {
                transition: all .3s cubic-bezier(0.175, -0.200, 0.775, 1.385);
                img {
                    width: 600px;
                    height: 500px;
                }
                display: flex;
                justify-content: flex-end;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                flex-direction: column;
                padding-right: 217px;
                .active {
                    
                    animation: show .7s;
                }
                .no {
                    animation: hide .3s;
                    width: 0px;
                    height: 0px;
                    
                }
                @keyframes show {
                    from { opacity: 0;width: 0px;height: 0px;}
                    89% { opacity: 1;width: 600px;height: 500px;}
                    90% { opacity: 1;transform: scale(1.05);}
                    100% { opacity: 1;transform: scale(1);}
                }
                @keyframes hide {
                    from { opacity: 1; width: 600px;height: 500px;}
                    50% { opacity: 0; width: 300px;height: 250px; }
                    52% { opacity: 0; width: 0px;height: 0px; }
                    to { opacity: 0;width: 0px;height: 0px; }
                }
            }
            &.select-way {
                height: 640px;
                box-sizing: border-box;
                .select-item {
                    width:100%;
                    height:200px;
                    background:rgba(55,135,254,.1);
                    margin-bottom: 20px;
                    cursor: pointer;
                    &:nth-last-child(1) {
                        margin-bottom: 0px;
                    }
                    box-sizing: border-box;
                    // padding: 54px 0px 0px 66px;
                    padding-left: 66px;
                    transition: all .3s ease-in-out;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    &.active {
                        border-left: 20px solid rgba(55,135,254,1);
                        background:rgba(55,135,254,.6);
                        color: #F6FAFF;
                        padding-left: 46px;
                    }
                    h3 {
                        font-size:24px;
                        font-weight:800;
                        line-height:33px;
                        color:rgba(255,255,255,1);
                    }
                    p {
                        font-size:14px;
                        font-weight:400;
                        line-height:32px;
                        color:rgba(255,255,255,1);
                        width: 585px;
                        word-wrap: auto;
                        word-break: break-all;
                    }
                    button {
                        width:100px;
                        height:30px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 0px 10px rgba(27,44,112,1);
                        opacity:1;
                        border-radius:17px;
                        color: #293C87;
                        border: 0px;
                        font-size: 14px;
                        transition: all .3s cubic-bezier(0.225, -0.385, 0.780, 1.265);
                        &:hover {
                            box-shadow:0px 0px 20px rgba(27,44,112,1);
                        }
                    }
                }
            }
        }
    }
    .safe {
        // background: red;
        height: 622px;
        background: url(../../assets/images/logopage/2019-12-17/safe-bg2.png) left bottom no-repeat;
        box-sizing: border-box;
        padding-top: 100px;
        .safe-h {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
            height: 42px;
            h3 {
                font-size:30px;
                font-weight:800;
                line-height:42px;
                color:rgba(34,34,34,1);
                margin-left: 10px;
            }
            img {
                width: 25px;
                height: 30px;
            }
        }
        .safe-list {
            width: 1300px;
            margin: 0 auto;
            margin-bottom: 100px;
            height: 268px;
            display: flex;
            justify-content: space-between;
            position: relative;
            .safe-item {
                transition: all .3s ease-in-out;
                background: #FFFFFF;
                // box-shadow:0px 0px 20px rgba(55,135,254,0.2);
                box-shadow: (2px 2px 10px rgba(55,135,254,0.2));
                filter: drop-shadow(2px 2px 10px rgba(55,135,254,0.2));
                width: 240px;
                height: 268px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-sizing: border-box;
                padding-top: 55px;
                align-items: center;
                border-radius: 5px;
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 0;
                    border-left: 32px solid transparent;
                    border-right: 32px solid transparent;
                    border-top: 27px solid #ffffff;
                    bottom: -26px;
                    border-radius: 1px;
                }
                img {
                    width: 40px;
                    height: 40px;
                    margin-bottom: 20px;
                }
                h3 {
                    font-size:20px;
                    font-weight:bold;
                    line-height:30px;
                    color:rgba(51,51,51,1);
                    margin-bottom: 12px;
                    text-align: center;
                }
                p {
                    font-size:14px;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(102,102,102,1);
                    width: 182px;
                    text-align: center;
                    text-align: center;
                }
                &:hover {
                    box-shadow: (2px 2px 20px rgba(55,135,254,0.2));
                    filter: drop-shadow(2px 2px 20px rgba(55,135,254,0.2));
                    margin-top: -20px;
                }
                &.botTop {
                    animation: move1 1s;
                }
                @keyframes move1{
                    from{ opacity:0; margin-top: 40px}
                    to{ opacity:1; margin-top: 0px;}
                }
            }
            &.en {
                .safe-item {
                    padding-top: 35px;
                    p {
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .logo-bottom {
        height:268px;
        background:rgba(25,34,84,1);
        // overflow: hidden;
        .safe-box {
            width: 1300px;
            margin: 0 auto;
            height: 100px;
            display: flex;
            justify-content: space-between;
            position: relative;
            .safe-item {
                visibility: visible;
                flex: 1;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                // position: absolute;
                // bottom: -1000px;
                // right: -1000px;
                // -webkit-z-index: 100;
                // -moz-z-index: 100;
                // -ms-z-index: 100;
                // -o-z-index: 100;
                z-index: 100;
                transition: all .4s ease-in-out; 
                
                p {
                    font-size:14px;
                    font-weight:400;
                    line-height:24px;
                    color:rgba(230,230,230,1);
                    text-align: center;
                }
                @keyframes rainbow {
                    0% { transform:  rotateY(0deg); }
                    50% { transform:  rotateY(90deg); }
                    100% { transform:  rotateY(180deg); }
                }
                @keyframes rainbow2 {
                    0% { transform: rotateY(180deg); }
                    50% { transform: rotateY(90deg); }
                    100% { transform: rotateY(0deg); }
                }
                div.img {
                    width: 60px;
                    height: 69px;
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    background: url('../../assets/images/logopage/2019-12-17/bg-item.png') no-repeat;
                    transform: translateX(-50%);
                    z-index: 200;
                }
                img {
                    width: 60px;
                    height: 69px;
                    // position: absolute;
                    // top: -40px;
                    // left: 50%;
                    // transform: translateX(-50%) rotateY(0deg);
                    animation: 1s rainbow2 alternate forwards;
                    &:hover {
                        left: 50%;
                        // transform: translateX(-50%);
                        animation: 1s rainbow alternate forwards;
                    }
                }
                &.botTop {
                    visibility: visible;
                    flex: 1;
                    box-sizing: border-box;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    // right: 0px;
                    // bottom: 0px;
                    // z-index: 100;
                    animation:move 1s;
                    div.img {
                        width: 60px;
                        height: 69px;
                        position: absolute;
                        top: -40px;
                        left: 50%;
                        background: url('../../assets/images/logopage/2019-12-17/bg-item.png') no-repeat;
                        transform: translateX(-50%);
                        z-index: 200;
                    }
                }
                @keyframes move{
                    from{ opacity:0; margin-left:500px;}
                    to{ opacity:1; margin-left:0;}
                }
            }
        }
        .time {
            border-top: 1px solid  rgba(112,112,112,.3);
            height: 168px;
            text-align: center;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                font-size:16px;
                font-weight:400;
                line-height:24px;
                color:rgba(255,255,255,1);
            }
        }
    }
}
</style>