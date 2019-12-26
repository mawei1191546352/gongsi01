<template>
    <div>
        <div id="third-two" v-if="data!=null?data.type==0?true:false:false">
            <div class="third-two-time">
                <div class="left-time">
                    <div class="time-top">
                        <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                        <p>订单剩余支付时间</p>
                    </div>
                    <h3>{{fortmatTime(time)}}</h3>
                </div>
            </div>
            <div class="third-two-box">
                <div class="two-box-item one">
                    <p class="info">买家手中的 USDT 已托管锁定在Royalbiz平台，请放心付款。</p>
                    <div class="oone">
                        <div class="border one">
                            <p class="wait">待付款金额（{{data!=null?data.tradeCoinType:''}}）</p>
                            <h3>{{data!=null?data.amountCny:''}}</h3>
                        </div>
                        <div class="border">
                            <label>银行卡持有人姓名</label>
                            <div class="text-box">
                                <p>{{data!=null?data.payOrderRealName:''}}</p>
                            </div>
                        </div>
                        <div class="border">
                            <label>已选择付款方式</label>
                            <div class="text-box">
                                <div class="check">
                                    <input type="checkbox" checked id="pd" value="以币入金"> <label for="pd">银行卡</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="two-box-item two">
                    <div class="border">
                        <label>收款姓名</label>
                        <div class="text-box">
                            <img src="" alt="">
                            <p>{{data!=null?data.adReceiptWay.name:''}}</p>
                            <button class="cp tag-read" @click="copyAddressFun()" 
                            :data-clipboard-text="data!=null?data.adReceiptWay.name:''"
                            >复制</button>
                        </div>
                    </div>
                    <div class="border">
                        <label>银行信息</label>
                        <div class="text-box">
                            <img src="" alt="">
                            <p>{{data!=null?data.adReceiptWay.bankAccount+data.adReceiptWay.branchAccount:''}}</p>
                            <button class="cp tag-read" @click="copyAddressFun()" 
                            :data-clipboard-text="data!=null?data.adReceiptWay.bankAccount+data.adReceiptWay.branchAccount:''"
                            >复制</button>
                        </div>
                    </div>
                    <div class="border">
                        <label>银行卡号</label>
                        <div class="text-box">
                            <p>{{data!=null?data.adReceiptWay.bankCardNumber:''}}</p>
                            <button class="cp tag-read" @click="copyAddressFun()"
                            :data-clipboard-text="data!=null?data.adReceiptWay.bankCardNumber:''"
                            >复制</button>
                        </div>
                    </div>
                    <div class="border">
                        <label>付款备注</label>
                        <div class="text-box">
                            <p class="red">{{data!=null?data.referenceCode:''}}</p>
                            <button class="cp tag-read" @click="copyAddressFun()"
                            :data-clipboard-text="data!=null?data.referenceCode:''"
                            >复制</button>
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
                    >已付款</button>
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
                        付款时除了备注付款号之外 <span class="red">不要备注任何其他信息。</span>
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
        <div class="gate-way-two" v-if="data!=null?data.type==1?true:false:false">
            <div class="gate-two-header">
                <img src="../../assets/images/third/2019-12-18/ok2.png" alt="">
                <h3>订单已成功提交</h3>
            </div>
            <div class="gate-way-content">
                <div class="gate-box">
                    <p>待付款数量（{{data!=null?data.coinType.toUpperCase():''}}）</p>
                    <h3>{{data!=null?data.amount:''}}</h3>
                </div>
                <div class="gate-content-bottom">
                    <div class="content-left">
                        <label>{{data!=null?data.coinType.toUpperCase():''}}充值地址</label>
                        <div class="om-erc" v-show="data!=null?data.coinType=='usdt'?true:false:false">
                            <button disabled :class="$parent.usdtType=='OMNI'?'active':'no'" @click="$parent.usdtType='OMNI'" v-show="$parent.usdtType=='OMNI'">OMNI</button>
                            <button disabled :class="$parent.usdtType=='ERC20'?'active':'no'" @click="$parent.usdtType='ERC20'" v-show="$parent.usdtType=='ERC20'">ERC20</button>
                        </div>
                    </div>
                    <div class="content-right">
                        <p class="address">
                            {{data!=null?(
                                data.coinType=='usdt'?(
                                    $parent.usdtType=='OMNI'?data.receiptAddress:data.ercAddress
                                ):(data.receiptAddress)
                            ):""}}
                        </p>
                        <!-- <button>复制</button>
                        <p class="qr" @mouseenter="qr=true" @mouseleave="qr=false">
                            二维码
                        </p>
                        <div class="qrcode" v-show="qr"></div> -->
                    </div>
                </div>
            </div>
            <div class="gate-two-search">
                <div class="search-left">
                    <img src="../../assets/images/third/2019-12-18/point.png" alt="">
                    <h3>订单状态</h3>
                    <button>{{item!=null?item.data.status==0?'确认中':'已完成':'确认中'}}</button>
                </div>
                <div class="search-right">
                    <button @click="findStatusFun">查询状态</button>
                </div>
            </div>
        </div>
        <div class="modal-next" v-show="modalStaus">
            <div class="box2">
                <h3>确认付款 <img @click="modalCloseFun" src="../../assets/images/third/2019-12-18/close.png" alt=""></h3>
                <div class="modal-top">
                    <li>
                        <p>确认已付款 <span>{{data!=null?data.amountCny:''}} {{data!=null?data.tradeCoinType:''}}</span></p>
                    </li>
                </div>
                <div class="btn-modal">
                    <button class="cancle" @click="modalCloseFun">取消</button>
                    <button class="confirm" @click="modalConfirmFun">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {bindOrderFun,thirdGetInfo,
thirdGetInfo2,alreadyPayConfirm,
updateTransferStatus,updateSearchFun} from '../../assets/js/api'
import Base64 from '../ThirdPart/base64'
import Clipboard from 'clipboard';
export default {
    data(){
        return {
            data: null,
            canNext: true,
            url: '',
            time: 0,
            // usdtType: 'OMNI',
            item:null,
            modalStaus: false,
        }
    },
    created() {
        // this.$parent.nav = 1;
    },
    mounted() {
        this.$parent.nav=1
        window.addEventListener("beforeunload",() => {
            localStorage.setItem("usdtType",this.$parent.usdtType)
        })
        if(localStorage.getItem("usdtType") != '') {
            this.$parent.usdtType = localStorage.getItem("usdtType")
        }
        try {
            this.data = JSON.parse(Base64.decode(this.$route.query.key))
        } catch(e) {
            console.log(e)
            this.$message({
                message: this.swA=='ch'?'你的url参数有误，请回到之前页面 重新选择：':'你的url参数有误，请回到之前页面 重新选择：',
                type: 'error',
                center:true,
                duration:1200,
            });
        }
        if(this.data.type==1) {
            this.item = JSON.parse(Base64.decode(this.$route.query.item))
        }
        console.log(this.data,this.item)
        if(this.data!= null) {
            this.timeFun(this.data)
        }
        // this.timeFun(this.data)
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload',()=>{
            
        })
        localStorage.setItem("usdtType",'')
    },
    methods: {
        copyAddressFun(){
            let that =this;
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
                console.log('复制成功')
                // 释放内存
                clipboard.destroy()
                that.$message({
                    message: '复制成功',
                    type: 'success',
                    center:true,
                    duration:500,
                });
            })
            clipboard.on('error', e => {
                // 不支持复制
                console.log('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
            })
        },
        async findStatusFun() {
            let key;
            key = await updateSearchFun(this,{
                id:this.data.id
            }).then(res => {
                return res;
            })
            if(key !=false) {
                this.item = key
                // console.log(key)
            }
        },
        preFun() {
            this.$parent.nav=0;
            this.$router.go(-1)
        },
        modalCloseFun() {
            this.modalStaus = false;
            this.canNext = true;
        },
        async modalConfirmFun(e) {
            let search = location.search
            let key =await alreadyPayConfirm(this,{
                id: this.data.id,
                receiptWayId: this.data.adReceiptWay.id
            }).then((res) => {
                return res;
            })
            // debugger
            if(key!=false) {
                this.$parent.nav=2
                this.$router.push({
                    path:`/gateway/three${search}`,
                    query: {
                        key: Base64.encode(JSON.stringify(key))
                    }
                })
                this.canNext = true;
                this.modalStaus = false
            } else {
                this.canNext = true;
                this.modalStaus = false
            }
        },
        async nextFun() {
            // 
            console.log(this.data,this.canNext)
            if(this.data==null) {
                return
            }
            if(!this.canNext) {
                return
            }else {
                this.canNext = false;
            }
            this.modalStaus = true
        },
        timeFun( key) {
            if(key.expiredTimestamp==0) {
                console.log('jj')
                this.time = 0;
                return false
            }else {
                console.log('kl')
                let k = key.expiredTimestamp;
                let t  = setInterval(()=>{
                    if(k ==0) {
                        this.time = 0
                        return false
                    }
                    this.time = --k
                },1000)
            }
        },
        fortmatTime(leftTime){
            let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                // vm.$emit('time-end')
                return '00：00：00'
            }
            if(this.$parent.swA=='en') {
                return  `${h} h ${m} m ${s} s`
            }else{
                return  `${h}小时${m}分${s}秒`
            }
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
    }
}
</script>
<style lang="scss" scoped>
#third-two {
    margin-top: 41px;
    .third-two-time {
        display: flex;
        // height:120px;
        height:100px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        .left-time {
            flex: 1;
            // padding: 23px 0px 0px 40px;
            padding: 0px 40px 0px 40px;
            border-right: 1px solid rgba(230,230,230,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
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
                // margin-top: 10px;
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
                    // padding: 0px 20px;
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
                    label {
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(102,102,102,1);
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
            // background:rgba(255,255,255,1);
            background: #F4F6FA;
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
                position: relative;
                &:hover {
                    &::after {
                        content: '';
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 100%;
                        height: 60px;
                        background: rgba(250,250,250,.2);
                    }
                }
            }
        }
    }
    .info-list {
        // height: 220px;
        height: 200px;
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
            // height: 220px;
            height: 200px;
            z-index: 1;
            display: flex;
            justify-content: flex-start;
            box-sizing: border-box;
            padding-top: 34px;
            flex-direction: column;
            &::before {
                position: absolute;
                top: -.5px;
                top: -10px;
                width: 90%;
                left: 10%;
                content: "";
                height: 1px;
                background: rgba(217,217,217,1);
            }
            &::after {
                position: absolute;
                bottom: -.5px;
                bottom: -10px;
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
                font-weight: bold;
                &.first {
                    top: -10px;
                    top: -20px;
                }
                &.last {
                    bottom: -6px;
                    bottom: -18px;
                }
            }
            li {
                height: 30px;
                display: flex;
                align-items: center;
                font-size:16px;
                font-weight:400;
                line-height:24px;
                color:rgba(34,34,34,1);
                .icon {
                    // background-image: linear-gradient(top, #fff 30%, #C7D9F6);
                    width: 15px;
                    height: 20px;
                    margin-top: 5px;
                    margin-right: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    // padding-bottom: 4px;
                    box-sizing: border-box;
                    position: relative;
                    &::after {
                        content: "";
                        position: absolute;
                        width:15px;
                        height:10px;
                        background:rgba(199,217,246,1);
                        z-index: -1;
                        bottom: 1px;
                    }
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
        margin-top: 30px;
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
    div.check {
        input[type=checkbox] {
            width: 20px;
            height: 20px;
            border-radius: 2px!important;
        }
        input[type="checkbox"]{
            display:none;
        }
        label {
            cursor: pointer;
            pointer-events: none;
            font-size:16px;
            font-weight:400;
            line-height:22px;
            color:rgba(34,34,34,1);
        }
        input[type="checkbox"] + label:before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            border:1px solid;
            border-radius: 3px;
            vertical-align: middle;
            margin-right: 5px;
            transition: all .5s;
        }

        input[type="checkbox"]:checked + label:before {
            content: '\2713';
            color: white;
            text-align: center;
            background: #5C89CC;
        }
    }
}
.gate-way-two {
    .gate-two-header {
        margin-top: 40px;
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;
        padding: 0px 40px;
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
        }
        h3 {
            font-size:30px;
            font-weight:bold;
            line-height:20px;
            color:rgba(34,34,34,1);
        }
    }
    .gate-way-content {
        height:270px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        margin-top: 40px;
        box-sizing: border-box;
        padding: 0px 40px;
        .gate-content-header {
            height: 71px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(230,230,230,1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            label {
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(102,102,102,1);
            }
            div.check {
                input[type=checkbox] {
                    width: 20px;
                    height: 20px;
                    border-radius: 2px!important;
                }
                input[type="checkbox"]{
                    display:none;
                }
                label {
                    cursor: pointer;
                    pointer-events: none;
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(34,34,34,1);
                }
                input[type="checkbox"] + label:before {
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border:1px solid;
                    border-radius: 3px;
                    vertical-align: middle;
                    margin-right: 5px;
                    transition: all .5s;
                }

                input[type="checkbox"]:checked + label:before {
                    content: '\2713';
                    color: white;
                    text-align: center;
                    background: #5C89CC;
                }
            }
        }
        .gate-box {
            height: calc(330px - 141px);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                font-size:20px;
                font-weight:400;
                line-height:22px;
                color:rgba(102,102,102,1);
            }
            h3 {
                font-size:36px;
                font-weight:800;
                line-height:50px;
                color:rgba(92,137,204,1);
            }
        }
        .gate-content-bottom {
            height: 70px;
            box-sizing: border-box;
            border-top: 1px solid rgba(230,230,230,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content-left {
                display: flex;
                align-items: center;
                label {
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(102,102,102,1);
                }
                .om-erc {
                    width:160px;
                    height:40px;
                    background:rgba(242,242,242,1);
                    opacity:1;
                    border-radius:3px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 0px 5px;
                    button {
                        border: 0px;
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:#5C89CC;
                        background:rgba(255,255,255,1);
                        &.active {
                            width:70px;
                            height:30px;
                            // background:rgba(92,137,204,1);
                            background:rgba(255,255,255,1);
                            // box-shadow:0px 3px 6px rgba(92,137,204,0.5);
                            border:1px solid rgba(92,137,204,1);
                            box-shadow:0px 5px 10px rgba(92,137,204,0.1);
                            opacity:1;
                            border-radius:3px;
                            font-size:16px;
                            font-weight:400;
                            line-height:22px;
                            color:#5C89CC;
                        }
                    }
                }
            }
            .content-right {
                display: flex;
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(92,137,204,1);
                align-items: center;
                position: relative;
                .qrcode {
                    position: absolute;
                    width: 160px;
                    height: 160px;
                    box-sizing: border-box;
                    padding: 10px;
                    background: white;
                    right: 0px;
                    bottom: 50px;
                    border-radius: 5px;
                    filter: drop-shadow(2px 2px 20px rgba(55,135,254,0.2));
                    &::after {
                        content: '';
                        position: absolute;
                        width: 0;
                        right: 10%;
                        // transform: translateX(-50%);
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 8px solid white;
                        bottom: -8px;
                        border-radius: 1px;
                    }
                }
                p {
                    &.address {
                        font-size:20px;
                        font-weight:400;
                        line-height:28px;
                        color:rgba(34,34,34,1);
                    }
                    .qr {
                        color: #5C89CC;
                    }
                }
                button {
                    margin: 0px 5px;
                    width:50px;
                    height:30px;
                    background:rgba(224,232,246,1);
                    box-shadow:0px 5px 6px rgba(92,137,204,0.1);
                    color: #5C89CC;
                    opacity:1;
                    border-radius:5px;
                    border: 0px;
                }

            }
        }
    }
    .gate-two-search {
        margin-top: 40px;
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;
        padding: 0px 40px 0px 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-left {
            display: flex;
            align-items: center;
            img {
                width: 25px;
                height: 25px;
                margin-right: 10px;
            }
            h3 {
                font-size:20px;
                font-weight:bold;
                line-height:28px;
                color:rgba(51,51,51,1);
                letter-spacing:  0px;
            }
            button {
                width:150px;
                height:50px;
                border-radius:3px;
                border: 0px;
                color: #FFFFFF;
                margin-left: 20px;
                background:rgba(254,204,118,1);
                &.wating {
                    background:rgba(254,204,118,1);
                    opacity:1;
                }
                &.done {
                    background:rgba(82,196,149,1);
                }
            }
        }
        .search-right {
            button {
                border: 0px;
                background: none;
                font-size:20px;
                font-weight:bold;
                line-height:28px;
                color:rgba(92,137,204,1);
                text-decoration:underline;
            }
        }
    }
}
.modal-next {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(153,153,153,.5);
    div.box2 {
        border-bottom: 10px solid rgba(92,137,204,1);
        width:545px;
        height:280px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 20px rgba(0,0,0,0.2);
        opacity:1;
        border-radius:5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-sizing: border-box;
        padding: 30px 30px;
         h3 {
            display: flex;
            justify-content: space-between;
            font-size:22px;
            font-weight:bold;
            line-height:30px;
            color:rgba(34,34,34,1);
            img {
                width: 15px;
                height: 15px;
                cursor: pointer;
            }
        }
        .modal-top {
            height: 130px;
            margin-top: 10px;
            li {
                line-height: 32px;
                height: 45px;
                display: flex;
                align-items: center;
                font-size:16px;
                color: #666666;
                span {
                    color: #5C89CC;
                }
            }
        }
        .btn-modal {
            display: flex;
            justify-content: flex-end;
            button {
                font-size: 16px;
                border: 0px;
                &.cancle {
                    width:180px;
                    height:50px;
                    background:rgba(242,242,242,1);
                    opacity:1;
                    border-radius:5px;
                    color: #666666;
                    margin-right: 20px;
                }
                &.confirm {
                    width:180px;
                    height:50px;
                    background:rgba(92,137,204,1);
                    box-shadow:0px 5px 10px rgba(92,137,204,0.5);
                    opacity:1;
                    border-radius:5px;
                    color: #FFFFFF;
                    position: relative;
                    &:hover {
                        &::after {
                            content: '';
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            width: 100%;
                            height: inherit;
                            background: rgba(242,242,242,.3);
                        }
                    }
                }
                &.no {
                    pointer-events: none;
                }
            }
        }
    }
}
</style>