<template>
    <div>
        <div id="third-one" v-if="data!=null?data.type==0?true:false:false">
            <div class="third-one-time">
                <div class="left-time">
                    <div class="time-top">
                        <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                        <p>订单剩余支付时间</p>
                    </div>
                    <h3>{{data!=null?data.expiredTimestamp!=undefined ?fortmatTime(time):'':''}}</h3>
                </div>
                <div class="right-tip">
                    <div class="tip-top">
                        <img :src="require('../../assets/images/third/2019-12-18/trans.png')" alt="">
                        <p>(17:00~次日8:00，单笔最大限额5万)</p>
                    </div>
                    <h3>支持<span>100万CNY</span>以内的超大额转账</h3>
                </div>
            </div>
            <div class="third-one-box">
                <div class="third-one-item">
                    <label >商家名</label>
                    <div class="text-box">
                        <p>{{data!=null?data.merchantName:''}}</p>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >付款金额（CNY）</label>
                    <div class="text-box">
                        <h3 class="amount">{{data!=null?data.amountCny:''}}</h3>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >购买数量（{{data!=null?data.coin.toUpperCase():''}}）</label>
                    <div class="text-box">
                        <p>{{data!=null?data.amount:''}}</p>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >付款方式</label>
                    <div class="text-box">
                        <div class="check">
                            <input type="checkbox" checked id="py" value="以币入金"> <label for="py">银行卡</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="name-next">
                <div class="input">
                    <input type="text" v-model="realName" placeholder="输入转账银行卡持有人姓名">
                    <p>(请输入转账银行卡持有人的真实姓名)</p>
                </div>
                <button
                @click="nextFun"
                >下一步</button>
            </div>
        </div>
        <div class="gate-way-one" v-if="data!=null?data.type==1?true:false:false">
            <div class="third-one-time">
                <div class="left-time">
                    <div class="time-top">
                        <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                        <p>订单剩余支付时间</p>
                    </div>
                    <h3>{{data!=null?data.expiredTimestamp ?fortmatTime(time):'':''}}</h3>
                </div>
                <div class="right-tip">
                    <h3>Royalbiz平台有完备的钱包体系，请放心充值。</h3>
                </div>
            </div>
            <div class="gate-way-content">
                <div class="gate-content-header">
                    <label>已选择付款方式</label>
                    <div class="check">
                        <input type="checkbox" checked id="py" value="以币入金"> <label for="py">以币入金</label>
                    </div>
                </div>
                <div class="gate-box">
                    <p>待付款数量（{{data!=null?data.coinType?data.coinType.toUpperCase():'':''}}）</p>
                    <h3>{{data!=null?data.amount:''}}</h3>
                </div>
                <div class="gate-content-bottom">
                    <div class="content-left">
                        <label>{{data!=null?data.coinType?data.coinType.toUpperCase():'':''}}充值地址</label>
                        <div class="om-erc" v-show="data!=null?data.coinType?data.coinType=='usdt'?true:false:false:false">
                            <button :class="usdtType=='OMNI'?'active':'no'" @click="usdtType='OMNI'">OMNI</button>
                            <button :class="usdtType=='ERC20'?'active':'no'" @click="usdtType='ERC20'">ERC20</button>
                        </div>
                    </div>
                    <div class="content-right">
                        <p class="address">
                            {{data!=null?(
                                data.coinType=='usdt'?(
                                    usdtType=='OMNI'?data.receiptAddress:data.ercAddress
                                ):(data.receiptAddress)
                            ):""}}
                        </p>
                        <button>复制</button>
                        <p class="qr" @mouseenter="qr=true" @mouseleave="qr=false">
                            二维码
                        </p>
                        <div id="qrcode" :class="qr?'qrcode vi':'qrcode hi'"></div>
                    </div>
                </div>
            </div>
            <div class="gate-way-info">
                <li><img src="../../assets/images/third/2019-12-18/ok1.png" alt=""> 请勿向上述地址充值任何非USDT资产，否则资产将不可找回。</li>
                <li><img src="../../assets/images/third/2019-12-18/tan.png" alt="">入金成功后数字货币将全额充值到您要付款的商户</li>
            </div>
            <div class="btn">
                <button class="pre">上一步</button>
                <button class="next" @click="nextFun1">已入金</button>
            </div>
        </div>
    </div>
</template>
<script>
import {bindOrderFun,thirdGetInfo,
thirdGetInfo2,alreadyPayConfirm,
updateTransferStatus,updateSearchFun, gateWayLegal, createGateLegalOrder} from '../../assets/js/api'
import Clipboard from 'clipboard';
import QRCode from 'qrcodejs2'
import Base64 from '../ThirdPart/base64'
export default {
    props:{
        data: Object,
    },
    data() {
        return {
            swA:'zh',
            time: 0,
            realName:'',
            next1: true,
            usdtType: 'OMNI',
            qr: false,
            canNext: true,
        }
    },
    watch:  {
        data: {
            handler(n, o) {
                this.timeFun(this.data)
            },
            deep: true
        },
        usdtType(n,o) {
            document.querySelector('#qrcode').innerHTML=''
            this.$nextTick(()=>{
                this.getCode()
            })
        }
    },
    created() {
        this.$parent.nav = 0;
    },
    mounted() {
        if(this.data!= null) {
            this.getCode()
        }
    },
    methods: {
        async nextFun() {
            let search = location.search
            if(/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(this.realName)){
                this.$message({
                    message: this.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                    type: 'error',
                    center:true,
                    duration:1200,
                });
                return false
            }else{
                if(/\d+/.test(this.realName)){
                    this.$message({
                        message: this.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                        type: 'error',
                        center:true,
                        duration:1200,
                    });
                    return false
                }else{

                }
            }
            if(this.realName=='') {
                this.$message({
                        message: this.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                        type: 'error',
                        center:true,
                        duration:1200,
                    });
                return
            };
            if(!this.next1) {
                return false;
            }else{
                this.next1= false;
            }
            let item = this.$route.query
            if(item.amount && item.amount!='') {
                item['inputAmountType'] = 0;
            }else{
                item['inputAmountType'] = 1;
            }
            item['amount']= this.data.amount;
            item['amountCny'] = this.data.amountCny;

            item['realName']=this.realName;
            let key =await createGateLegalOrder(this,item).then((res) => {
                return res;
            })
            if(key!=false) {
                this.next1 = true;
                key.type = 0
                console.log(key)
                this.$router.push({
                    path: `/gateway/two${search}`,
                    query: {
                        key: Base64.encode(JSON.stringify(key))
                    }
                })
            }else {
                this.next1 = true;
            }
        },
        getCode(){
            var qrcode = new QRCode('qrcode', {
            text: this.data.coinType=='usdt'?(this.usdtType=='OMNI'?this.data.receiptAddress:this.data.ercAddress):this.data.receiptAddress,
            width: 140,
            height: 140,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
            });
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
                return '0'
            }
            if(this.swA=='en') {
                return  `${h} h ${m} min ${s} second`
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
        nextFun1() {
            this.doneMoney()
        },
        async doneMoney(){
            let search = location.search
            let key;
            if(!this.canNext) {
                return false
            } else {
                this.canNext = false
            }
            key = await updateTransferStatus(this,{
                id:this.data.id
            }).then(res => {
                return res;
            })
            if(key !=false) {
                // this.dialogVisible = false
                key.type=1;
                this.$router.push({
                    path: `/gateway/two${search}`,
                    query: {
                        key: Base64.encode(JSON.stringify(this.data)),
                        item: Base64.encode(JSON.stringify(key)),
                    }
                })
                this.canNext = true
            }else {
                this.canNext = true
            }
        },
    }
}
</script>
<style lang="scss" scoped>
#third-one {
    margin-top: 41px;
    .third-one-time {
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
        .right-tip {
            flex: 1;
            padding: 23px 0px 0px 40px;
            .tip-top {
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
                font-size:22px;
                font-weight:bold;
                line-height:40px;
                color:#333333;
                margin-top: 10px;
                span {
                    display: inline-block;
                    width:125px;
                    height:40px;
                    border:2px solid rgba(92,137,204,1);
                    opacity:1;
                    border-radius:3px;
                    text-align: center;
                    color: #5C89CC;
                    margin: 0px 10px;
                }
            }
        }
    }
    .third-one-box {
        margin-top: 40px;
        height:280px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;
        padding: 0px 40px;
        display: flex;
        flex-direction: column;
        .third-one-item {
            flex: 1;
            border-bottom: 1px solid rgba(230,230,230,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
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
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(51,51,51,1);
                display: flex;
                h3.amount {
                    font-size:30px;
                    font-weight:800;
                    line-height:42px;
                    color:rgba(92,137,204,1);
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
        }
    }
    .name-next {
        
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .input {
            input {
                width:520px;
                height:60px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(204,204,204,1);
                opacity:1;
                border-radius:5px;
                padding-left: 20px;
                box-sizing: border-box;
            }
            p {
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(254,91,91,1);
            }
        }
        button {
            width:520px;
            height:60px;
            background:rgba(92,137,204,1);
            box-shadow:0px 5px 10px rgba(92,137,204,0.5);
            opacity:1;
            border-radius:5px;
            border: 0px;
            font-size:20px;
            font-weight:400;
            line-height:28px;
            color:rgba(255,255,255,1);
            margin-bottom: 70px;
        }
    }
}
.gate-way-one {
    margin-top: 41px;
    .third-one-time {
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
        .right-tip {
            flex: 1;
            padding: 0px 0px 0px 40px;
            display: flex;
            align-items: center;
            h3 {
                font-size:22px;
                font-weight:bold;
                line-height:40px;
                color:#333333;
                span {
                    display: inline-block;
                    width:125px;
                    height:40px;
                    border:2px solid rgba(92,137,204,1);
                    opacity:1;
                    border-radius:3px;
                    text-align: center;
                    color: #5C89CC;
                    margin: 0px 10px;
                }
            }
        }
    }
    .gate-way-content {
        height:330px;
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
                font-size:16px;
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
                        color:rgba(153,153,153,1);
                        &.active {
                            width:70px;
                            height:30px;
                            background:rgba(92,137,204,1);
                            box-shadow:0px 3px 6px rgba(92,137,204,0.5);
                            opacity:1;
                            border-radius:3px;
                            font-size:16px;
                            font-weight:400;
                            line-height:22px;
                            color:rgba(255,255,255,1);
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
                    &.vi {
                        visibility: visible
                    }
                    &.hi {
                        visibility: hidden;
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
    .gate-way-info {
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        margin: 30px 0px 42px 0px;
        box-sizing: border-box;
        padding: 0px 40px;
        display: flex;
        flex-direction: column;
        li {
            flex: 1;
            font-size:20px;
            color:rgba(51,51,51,1);
            display: flex;
            align-items: center;
            &:nth-child(1) {
                border-bottom: 1px solid rgba(230,230,230,1);
                color: #FE5B5B;
            }
            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }
    }
    .btn {
        display: flex;
        justify-content: space-between;
        margin-bottom: 82px;
        button {
            width:520px;
            height:60px;
            opacity:1;
            border-radius:3px;
            border: 0px;
            color:rgba(204,204,204,1);
            &.pre {
                background:rgba(250,250,250,1);
                border:1px solid rgba(204,204,204,1);
            }
            &.next {
                background:rgba(92,137,204,1);
                box-shadow:0px 5px 10px rgba(92,137,204,0.5);
                color:rgba(255,255,255,1);
            }
        }
    }
}
</style>