<template>
    <div id="third-two">
        <div class="third-two-time">
            <div class="left-time">
                <div class="time-top">
                    <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                    <p>订单剩余支付时间</p>
                </div>
                <h3>1小时58分58秒</h3>
            </div>
        </div>
        <div class="third-two-box">
            <div class="two-box-item one">
                <p class="info">买家手中的 USDT 已托管锁定在Royalbiz平台，请放心付款。</p>
                <div class="oone">
                    <div class="border one">
                        <p class="wait">待付款金额（CNY）</p>
                        <h3>100000000.000</h3>
                    </div>
                    <div class="border">
                        <label>已选择付款方式</label>
                        <div class="text-box">
                            <img src="" alt="">
                            <p>银行卡</p>
                        </div>
                    </div>
                    <div class="border">
                        <label>银行卡持有人姓名</label>
                        <div class="text-box">
                            <p>芝麻机构</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="two-box-item two">
                <div class="border">
                    <label>收款姓名</label>
                    <div class="text-box">
                        <img src="" alt="">
                        <p>小西瓜</p>
                        <button>复制</button>
                    </div>
                </div>
                <div class="border">
                    <label>银行信息</label>
                    <div class="text-box">
                        <img src="" alt="">
                        <p>建设银行（萨达所大所多支行)</p>
                        <button>复制</button>
                    </div>
                </div>
                <div class="border">
                    <label>银行卡号</label>
                    <div class="text-box">
                        <p>6541 2541 3658 5412</p>
                        <button>复制</button>
                    </div>
                </div>
                <div class="border">
                    <label>付款备注</label>
                    <div class="text-box">
                        <p class="red">351257</p>
                        <button>复制</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pre-next">
            <div class="pn-left">
                <img src="../../assets/images/third/2019-12-18/ok1.png" alt="">
                <h3>购买成功后数字货币将全额充值到您要付款的商户</h3>
            </div>
            <div class="pn-right">
                <button class="pre"
                @click="preFun"
                >上一步</button>
                <button class="next"
                @click="nextFun"
                >已支付</button>
            </div>
        </div>
        <div class="info-list">
            <div class="info-bg">
                <h3 class="first">注意事项</h3>
                <li>
                    <div class="icon">1</div>
                    转账时 <span class="red">请勿备注</span> “比特币”、“虚拟币”“USDT”等信息，否则交易可能被拒绝。
                </li>
                <li>
                    <div class="icon">2</div>
                    付款时请 <span class="red">备注付款号。</span>
                </li>
                <li>
                    <div class="icon">3</div>
                    转账后请 <span class="red">务必点击“已付款”。</span>
                </li>
                <li>
                    <div class="icon">4</div>
                    币商银行收款账户仅以 <span class="red">当前显示的有效</span>，转入非当前收款账户将不会到账。
                </li>
                <h3 class="last">网银快捷入口</h3>
            </div>
        </div>
        <div class="bank-list">
            <a href="https://ebsnew.boc.cn/boc15/login.html">
                <img src="../../assets/images/third/2019-12-18/bank01.png" alt="">
            </a>
            <a href="https://perbank.abchina.com/EbankSite/startup.do?r=3B61B6CC10EB44EA">
                <img src="../../assets/images/third/2019-12-18/bank02.png" alt="">
            </a>
            <a href="https://mybank.icbc.com.cn/icbc/newperbank/perbank3/frame/frame_index.jsp">
                <img src="../../assets/images/third/2019-12-18/bank03.png" alt="">
            </a>
            <a href="http://www.ccb.com/cn/ebank/wsyh_products_list.html">
                <img src="../../assets/images/third/2019-12-18/bank04.png" alt="">
            </a>
            <a href="http://www.bankcomm.com/BankCommSite/default.shtml">
                <img src="../../assets/images/third/2019-12-18/bank05.png" alt="">
            </a>
            <a href="http://www.cmbchina.com/personal/netbank/">
                <img src="../../assets/images/third/2019-12-18/bank06.png" alt="">
            </a>
            <a href="https://bank.pingan.com.cn/m/main/index.html">
                <img src="../../assets/images/third/2019-12-18/bank07.png" alt="">
            </a>
            <a href="https://i.bank.ecitic.com/perbank6/signIn.do">
                <img src="../../assets/images/third/2019-12-18/bank08.png" alt="">
            </a>
            <a href="http://www.spdb.com.cn/">
                <img src="../../assets/images/third/2019-12-18/bank09.png" alt="">
            </a>
            <a href="http://www.cgbchina.com.cn/">
                <img src="../../assets/images/third/2019-12-18/bank10.png" alt="">
            </a>
            <a href="http://www.psbc.com/cn/index.html">
                <img src="../../assets/images/third/2019-12-18/bank11.png" alt="">
            </a>
            <a href="https://nper.cmbc.com.cn/pweb/static/login.html">
                <img src="../../assets/images/third/2019-12-18/bank12.png" alt="">
            </a>
            <a href="https://personalbank.cib.com.cn/pers/main/login.do">
                <img src="../../assets/images/third/2019-12-18/bank13.png" alt="">
            </a>
            <a href="http://ebank.cebbank.com/">
                <img src="../../assets/images/third/2019-12-18/bank14.png" alt="">
            </a>
            <a href="http://www.hxb.com.cn/wydl/index.shtml">
                <img src="../../assets/images/third/2019-12-18/bank15.png" alt="">
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$parent.nav=1
    },
    methods: {
        preFun() {
            this.$parent.nav=0;
            this.$router.go(-1)
        },
        nextFun() {
            let orderId = this.$route.params.orderId;
            console.log(orderId)
            this.$parent.nav=2
            this.$router.push({
                path: `/third/${orderId}/three`,
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#third-two {
    margin-top: 41px;
    .third-two-time {
        display: flex;
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        .left-time {
            flex: 1;
            padding: 23px 0px 0px 40px;
            border-right: 1px solid rgba(230,230,230,1);
            .time-top {
                display: flex;
                img {
                    width: 22px;
                    height: 22px;
                }
                p {
                    margin-left: 5px;
                    font-size:16px;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(102,102,102,1);
                }
            }
            h3 {
                font-size:30px;
                font-weight:bold;
                line-height:40px;
                color:rgba(92,137,204,1);
                margin-top: 10px;
            }
        }
    }
    .third-two-box {
        margin-top: 40px;
        margin-bottom: 40px;
        height: 280px;
        display: flex;
        justify-content: space-between;
        .two-box-item {
            background:rgba(255,255,255,1);
            box-shadow:0px 5px 10px rgba(92,137,204,0.1);
            opacity:1;
            border-radius:5px;
            box-sizing: border-box;
            height: inherit;
            &.one {
                width: 520px;
                height: inherit;
                p {
                    &.info {
                        height:40px;
                        background:rgba(254,171,99,1);
                        opacity:1;
                        border-radius:5px 5px 0px 0px;
                        font-size:16px;
                        font-weight:400;
                        line-height:40px;
                        color:rgba(255,255,255,1);
                    }
                    padding-left: 20px;
                }
                .oone {
                    height: 240px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0px 20px;
                }
                .border {
                    flex: 1;
                    padding: 0px 20px;
                    border-bottom: 1px solid rgba(230,230,230,1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    &:nth-last-child(1) {
                        border-bottom: 0px;
                    }
                    &.one {
                        text-align: center;
                        flex-direction: column;
                        p {
                            font-size:16px;
                            font-weight:400;
                            line-height:22px;
                            color:rgba(102,102,102,1);
                            margin-top: 15px;
                        }
                        h3 {
                            font-size:30px;
                            font-weight:800;
                            line-height:42px;
                            color:rgba(92,137,204,1);
                            margin-bottom: 20px;
                        }
                    }
                    label {
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(102,102,102,1);
                    }
                    .text-box {
                        display: flex;
                        align-items: center;
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(51,51,51,1);
                    }
                }
            }
            &.two {
                padding: 0px 20px;
                width: 550px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .border {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(230,230,230,1);
                    &:nth-last-child(1) {
                        border-bottom: 0px;
                    }
                    .text-box {
                        display: flex;
                        font-size:16px;
                        font-weight:bold;
                        line-height:22px;
                        color:rgba(34,34,34,1);
                        display: flex;
                        align-items: center;
                        button {
                            width:50px;
                            height:30px;
                            background:rgba(224,232,246,1);
                            box-shadow:0px 5px 6px rgba(92,137,204,0.1);
                            opacity:1;
                            border-radius:5px;
                            border: 0px;
                            font-size:16px;
                            font-weight:400;
                            line-height:22px;
                            color:rgba(92,137,204,1);
                            margin-left: 20px;
                        }
                        p.red {
                            color: #FE5B5B;
                        }
                    }
                    label {
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(102,102,102,1);
                    }
                }
            }
        }
    }
    .pre-next {
        display: flex;
        justify-content: space-between;
        .pn-left {
            width:520px;
            height:60px;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:0px 0px 5px 5px;
            box-sizing: border-box;
            padding: 0px 20px;
            display: flex;
            align-items: center;
            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            h3 {
                font-size:20px;
                font-weight:bold;
                line-height:28px;
                color:rgba(51,51,51,1);
            }
        }
        .pn-right {
            width:550px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 62px;
            .pre {
                width:260px;
                height:60px;
                background:rgba(250,250,250,1);
                border:1px solid rgba(204,204,204,1);
                opacity:1;
                border-radius:3px;
                font-size:20px;
                font-weight:400;
                line-height:28px;
                color:rgba(204,204,204,1);
            }
            .next {
                width:260px;
                height:60px;
                background:rgba(92,137,204,1);
                box-shadow:0px 5px 10px rgba(92,137,204,0.5);
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
    .info-list {
        height: 220px;
        margin-bottom: 10px;
        background: #FAFAFA;
        display: flex;
        justify-content: center;
        flex-direction: column;
        z-index: 2;
        
        .info-bg {
            position: absolute;
            margin: 0 auto;
            width: 1100px;
            height: 220px;
            height: 220px;
            z-index: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            &::before {
                position: absolute;
                top: -.5px;
                width: 90%;
                left: 10%;
                content: "";
                height: 1px;
                background: rgba(217,217,217,1);
            }
            &::after {
                position: absolute;
                bottom: -.5px;
                width: 80%;
                left: 15%;
                content: "";
                height: 1px;
                background: rgba(217,217,217,1);
            }
            h3 {
                position: absolute;
                width: 250px;
                overflow: hidden;
                &.first {
                    top: -10px;
                }
                &.last {
                    bottom: -6px;
                }
            }
            li {
                height: 40px;
                display: flex;
                align-items: center;
                font-size:16px;
                font-weight:400;
                line-height:24px;
                color:rgba(34,34,34,1);
                .icon {
                    background-image: linear-gradient(top, #fff, #C7D9F6);
                    width: 15px;
                    height: 20px;
                    margin-top: 5px;
                    margin-right: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 4px;
                    box-sizing: border-box;
                }
                span.red {
                    color: #FE5B5B;
                }
            }
        }
        &::after {
            position: absolute;
            content: '';
            width: 100%;
            left: 0px;
            background: #FAFAFA;
            height: 220px;
            z-index: 0;
        }
    }
    .bank-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        a {
            margin-bottom: 20px;
            box-shadow:0px 3px 10px transparent;
            box-sizing: border-box;
            width: 200px;
            height: 60px;
            &:hover {
                background:rgba(255,255,255,1);
                border:1px solid rgba(230,230,230,1);
                box-shadow:0px 3px 10px rgba(92,137,204,0.3);
                border-radius:3px;
            }
        }
    }
}
</style>
