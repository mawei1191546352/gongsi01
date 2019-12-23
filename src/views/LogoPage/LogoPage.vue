<template>
    <div id="logo-page">
        <div class="logo-top">
            <h3>即时购买USDT与BTC</h3>
            <p>Royalbiz 是连接买家与卖家的 P2P 数字货币场外交易市场。您可以选择您希望使用的支付方式进行数字货币购买&出售。</p>
            <div class="input-box">
                <div class="box-one">
                    <label for="">你想要多少</label>
                    <div class="sel">
                        <input type="text" placeholder="请输入您想要的购买的金额" 
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
                    <label for="">您将获得多少数额虚拟货币</label>
                    <div class="sel">
                        <input type="text" placeholder="请输入您想要获得多少数额虚拟货币"
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
                    登陆账号，立即购买/出售
                </button>
            </div>
        </div>
        <div class="logo-card">
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_bank" alt="">
                    <h3>银行卡</h3>
                </div>
                <p>即时交易-价格最优</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_ali" alt="">
                    <h3>支付宝</h3>
                </div>
                <p>即时交易-价格最优</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_wechat" alt="">
                    <h3>微信</h3>
                </div>
                <p>即时交易-价格最优</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_amazon" alt="">
                    <h3>Amazon礼品卡</h3>
                </div>
                <p>即时交易-私密转账</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_itunes" alt="">
                    <h3>iTunes Gift Card</h3>
                </div>
                <p>即时交易-私密转账</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_jd" alt="">
                    <h3>京东礼品卡</h3>
                </div>
                <p>即时交易-私密转账</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_sh" alt="">
                    <h3>中石化油卡</h3>
                </div>
                <p>即时交易-私密转账</p>
            </div>
            <div class="card-item">
                <div class="card-img">
                    <img :src="img_all" alt="">
                    <h3>全部付款方式</h3>
                </div>
                <!-- <p>即时交易-价格最优</p> -->
            </div>
        </div>
        <div class="line-way">
            <div class="line-header">
                <div class="he">
                    <img :src="img_way" alt="">
                    <h3>支持多种付款方式</h3>
                </div>
                <p>Royabiz支持多种付款方式，包含支付宝、微信、银行卡、PayPal等，包括各种礼品卡（例如亚马逊礼品卡）。更可以快速筛选出支持各个国家银行卡的广告，快速交易，安全便捷。</p>
            </div>
            <div class="item-all">
                <div class="item-way">
                    <img :src="img_b_bank" alt="">
                    <h3>银行卡</h3>
                    <p>即时交易-需要身份证件</p>
                </div>
                <div class="item-way">
                     <img :src="img_b_net" alt="">
                    <h3>网上转账</h3>
                    <p>即时交易-可能需要身份证件</p>
                </div>
                <div class="item-way">
                     <img :src="img_b_gift" alt="">
                    <h3>礼品卡</h3>
                    <p>即时交易-私密转账</p>
                </div>
            </div>
        </div>
        <div class="column-way">
            <div class="img-box">
                <img :src="nav==0?img_way01:(
                    nav==1?img_way02:img_way03
                )" alt="">
            </div>
            <div class="select-way">
                <div :class="nav==0?'select-item active':'select-item'"
                @mouseenter="nav=0"
                >
                    <h3>强有力的承兑网络</h3>
                    <p>Royalbiz合作了全球主流数字货币兑换地区及承兑商，拥有一个强有力的承兑网络。各个国家的人们都可以用本国货币进行交易兑换，获得所需要数字货币。</p>
                </div>
                <div :class="nav==1?'select-item active':'select-item'"
                @mouseenter="nav=1"
                >
                    <h3>支持在线聊天</h3>
                    <p>Royalbiz支持在线聊天功能，实时通讯。买方与卖方在线面对面快速交流，减少沟通成本，促使买方与卖方达成共识，完成交易。</p>
                </div>
                <div :class="nav==2?'select-item active':'select-item'"
                @mouseenter="nav=2"
                >
                    <h3>快捷兑换，立即到账</h3>
                    <p>帮助机构客户实现数字资产的大额，实时，安全，合规交易，致力于解决数字资产与传统货币之间的结算问题。业务范围包括电商，食品，旅游，娱乐等。</p>
                    <button @click="$router.push('/payment-detail')">查看详情</button>
                </div>
            </div>
        </div>
        <div class="safe">
            <div class="safe-h">
                <img :src="img_way" alt="">
                <h3>平台资金安全</h3>
            </div>
            <div class="safe-list">
                <div class="safe-item">
                    <img :src="list01" alt="">
                    <h3>担保交易</h3>
                    <p>交易过程全程进行担保。</p>
                </div>
                <div class="safe-item">
                    <img :src="list02" alt="">
                    <h3>赔付机制</h3>
                    <p>客户充值过程中若产生损失，平台10倍赔付。</p>
                </div>
                <div class="safe-item">
                    <img :src="list03" alt="">
                    <h3>2FA认证体系</h3>
                    <p>通过两步认证体系和成熟的设备识别算法，确保账户不被非法入侵。</p>
                </div>
                <div class="safe-item">
                    <img :src="list04" alt="">
                    <h3>私密钱包体系</h3>
                    <p>私立研发数字货币钱包，保护用户资金安全。</p>
                </div>
                <div class="safe-item">
                    <img :src="list05" alt="">
                    <h3>托管锁定</h3>
                    <p>买家卖家数字货币均托管锁定在Royalbiz平台。</p>
                </div>
            </div>
        </div>
        <div class="logo-bottom">
            <div class="safe-box">
                <div class="safe-item">
                    <img :src="safe01" alt="">
                    <p>冷、温、热钱包尖端存储</p>
                </div>
                <div class="safe-item">
                    <img :src="safe02" alt="">
                    <p>资金水位动态配置</p>
                </div>
                <div class="safe-item">
                    <img :src="safe03" alt="">
                    <p>自动报单</p>
                </div>
                <div class="safe-item">
                    <img :src="safe04" alt="">
                    <p>API接口</p>
                </div>
                <div class="safe-item">
                    <img :src="safe05" alt="">
                    <p>冷储存、SSL多重加密</p>
                </div>
            </div>
            <div class="time">
                <p>当前服务器时间：{{time}} </p>
                <p>Royalbiz.co版权所有 © {{moment().year()}}</p>
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
export default {
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
            img_way01: require('../../assets/images/logopage/2019-12-17/way01.png'),
            img_way02: require('../../assets/images/logopage/2019-12-17/way02.png'),
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
    },
    methods: {
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
            &.img-box {
                transition: all .3s ease-in-out;
                img {
                    width: 645px;
                    height: 590px;
                }
                display: flex;
                justify-content: flex-end;
                align-items: center;
                box-sizing: border-box;
                padding-right: 135px;
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
                    padding: 54px 0px 0px 66px;
                    transition: all .3s ease-in-out;
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
            display: flex;
            justify-content: space-between;
            // height: 270px;
            .safe-item {
                // background: url('./bg.svg') no-repeat;
                background: #FFFFFF;
                // box-shadow:0px 0px 20px rgba(55,135,254,0.2);
                box-shadow: (2px 2px 20px rgba(55,135,254,0.2));
                filter: drop-shadow(2px 2px 20px rgba(55,135,254,0.2));
                width: 240px;
                // width: 340px;
                height: 290px;
                height: 268px;
                // height: 350px;
                display: flex;
                flex-direction: column;
                justify-content: center;
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
                    margin-bottom: 15px;
                }
                p {
                    font-size:14px;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(102,102,102,1);
                    width: 182px;
                    text-align: center;
                }
            }
        }
    }
    .logo-bottom {
        height:268px;
        background:rgba(25,34,84,1);
        .safe-box {
            width: 1300px;
            margin: 0 auto;
            height: 100px;
            display: flex;
            justify-content: space-between;
            .safe-item {
                box-sizing: border-box;
                position: relative;
                display: flex;
                align-items: center;
                p {
                    font-size:14px;
                    font-weight:400;
                    line-height:24px;
                    color:rgba(230,230,230,1);
                }
                img {
                    width: 60px;
                    height: 69px;
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
        .time {
            border-top: 1px solid  rgba(112,112,112,1);
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