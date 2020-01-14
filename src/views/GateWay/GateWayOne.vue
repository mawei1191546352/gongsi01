<template>
    <div>
        <div id="third-one" v-if="data!=null?data.type==0?true:false:false">
            <div class="third-one-time">
                <!-- <div class="left-time">
                    <div class="time-top">
                        <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                        <p>订单剩余支付时间</p>
                    </div>
                    <h3>{{data!=null?data.expiredTimestamp!=undefined ?fortmatTime(time):'':''}}</h3>
                </div> -->
                <div class="right-tip" :class="$parent.swA">
                    <h3><img :src="require('../../assets/images/third/2019-12-18/transL.png')" alt="">{{languageType0[$parent.swA].rightTipHLeft}}<span>{{languageType0[$parent.swA].rightTipHCenter}}</span>{{languageType0[$parent.swA].rightTipHRight}}</h3>
                    <div class="tip-top">
                        <p>{{languageType0[$parent.swA].rightTipInfo}}</p>
                    </div>
                </div>
            </div>
            <div class="third-one-box">
                <div class="third-one-item">
                    <label >{{languageType0[$parent.swA].oneBoxMerchant}}</label>
                    <div class="text-box">
                        <p class="merchant">{{data!=null?data.merchantName:''}}</p>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >{{languageType0[$parent.swA].oneBoxWaitPay}}</label>
                    <div class="text-box">
                        <h3 class="amount">{{data!=null?data.amountCny:''}} CNY</h3>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >{{languageType0[$parent.swA].oneBoxAmount}}</label>
                    <div class="text-box">
                        <p>{{data!=null?data.amount:''}} {{data!=null?data.coin.toUpperCase():''}}</p>
                    </div>
                </div>
                <div class="third-one-item">
                    <label >{{languageType0[$parent.swA].oneBoxPayType}}</label>
                    <div class="text-box">
                        <div class="check">
                            <input type="checkbox" checked id="py" value="以币入金"> <label for="py">{{languageType0[$parent.swA].oneBoxBank}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="name-next">
                <div class="input">
                    <input type="text" v-model="realName" :placeholder="languageType0[$parent.swA].inputRealNameInfo" 
                    @keyup="realName = realName.replace(/\s+/g,'')"
                    >
                    <p>({{languageType0[$parent.swA].inputRealName}})</p>
                </div>
                <button
                class="net"
                @click="nextFun"
                >{{languageType0[$parent.swA].nextBtn}}</button>
            </div>
        </div>
        <div class="gate-way-one" v-if="data!=null?data.type==1?true:false:false">
            <div class="third-one-time">
                <div class="left-time">
                    <div class="time-top">
                        <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                        <p>{{languageType1[$parent.swA].leftTime}}</p>
                    </div>
                    <h3>{{fortmatTime(time)}}</h3>
                    <!-- <h3>{{data!=null?data.expiredTimestamp ?fortmatTime(time):'':''}}</h3> -->
                </div>
                <div class="right-tip" :class="$parent.swA">
                    <h3>{{languageType1[$parent.swA].rightTipAll}}</h3>
                </div>
            </div>
            <div class="gate-way-content">
                <div class="gate-content-header">
                    <label>{{languageType1[$parent.swA].paiedType}}</label>
                    <div class="check">
                        <input type="checkbox" checked id="py" value="以币入金"> <label for="py">{{languageType1[$parent.swA].biRu}}</label>
                    </div>
                </div>
                <div class="gate-box">
                    <p>{{languageType1[$parent.swA].depositAmount}}（{{data!=null?data.coinType?data.coinType.toUpperCase():'':''}}）</p>
                    <h3>{{data!=null?data.amount:''}}</h3>
                </div>
                <div class="gate-content-bottom">
                    <div class="content-left">
                        <label>{{data!=null?data.coinType?data.coinType.toUpperCase():'':''}}{{languageType1[$parent.swA].depositAddress}}</label>
                        <div class="om-erc" v-show="data!=null?data.coinType?data.coinType=='usdt'?true:false:false:false">
                            <button :class="usdtType=='ERC20'?'active':'no'" @click="usdtType='ERC20'">ERC20</button>
                            <button :class="usdtType=='OMNI'?'active':'no'" @click="usdtType='OMNI'">OMNI</button>
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
                        <button class="cp tag-read" @click="copyAddressFun"
                        :data-clipboard-text="data!=null?(
                                data.coinType=='usdt'?(
                                    usdtType=='OMNI'?data.receiptAddress:data.ercAddress
                                ):(data.receiptAddress)
                            ):''"
                        >{{languageType1[$parent.swA].cp}}</button>
                        <p class="qr" @mouseenter="qr=true" @mouseleave="qr=false">
                            {{languageType1[$parent.swA].qrcode}}
                        </p>
                        <div id="qrcode" :class="qr?'qrcode vi':'qrcode hi'"></div>
                    </div>
                </div>
            </div>
            <div class="gate-way-info">
                <li><img src="../../assets/images/third/2019-12-18/tan.png" alt=""> {{languageType1[$parent.swA].info011}}{{data!=null?data.coinType.toUpperCase():''}} {{languageType1[$parent.swA].info012}}</li>
                <li><img src="../../assets/images/third/2019-12-18/ok1.png" alt="">{{languageType1[$parent.swA].info02}}</li>
            </div>
            <div class="btn">
                <button class="pre">{{languageType1[$parent.swA].btnPre}}</button>
                <button class="next" @click="nextFun1">{{languageType1[$parent.swA].btnDeposit}}<p>{{languageType1[$parent.swA].btnInfo01}}<span>{{languageType1[$parent.swA].btnInfo02}}</span> </p></button>
            </div>
        </div>
        <div class="modal-next" v-show="modalStaus">
            <div class="box" v-if="data!=null?data.type==0?true:false:false">
                <h3>{{languageType0[$parent.swA].modal00h1}} <img @click="modalCloseFun" src="../../assets/images/third/2019-12-18/close.png" alt=""></h3>
                <div class="modal-top" :class="$parent.swA">
                    <li>
                        <div class="icon">1</div>
                        <p><span>{{languageType0[$parent.swA].modal00p10}}</span>{{languageType0[$parent.swA].modal00p11}}</p>
                    </li>
                    <li>
                        <div class="icon">2</div>
                        <p>{{languageType0[$parent.swA].modal00p20}}<span>{{languageType0[$parent.swA].modal00p21}} </span></p>
                    </li>
                    <li>
                        <div class="icon">3</div>
                        <p>{{languageType0[$parent.swA].modal00p30}}<span>{{languageType0[$parent.swA].modal00p31}} </span></p>
                    </li>
                </div>
                <div class="border"></div>
                <div class="modal-bottom">
                    <h3>{{languageType0[$parent.swA].modal00h2}}</h3>
                    <li class="light">
                        <p>{{languageType0[$parent.swA].modal00p40}}<span>{{languageType0[$parent.swA].modal00p41}}</span>{{languageType0[$parent.swA].modal00p42}}</p>
                    </li>
                    <li class="light">
                        <p>{{languageType0[$parent.swA].modal00p50}}<span>{{languageType0[$parent.swA].modal00p51}} </span></p>
                    </li>
                    <li class="light">
                        <p>{{languageType0[$parent.swA].modal00p60}}</p>
                    </li>
                </div>
                <div class="btn-modal">
                    <button class="cancle" @click="modalCloseFun">{{languageType0[$parent.swA].shaohouBtn}}</button>
                    <button class="confirm" @click="modalConfirmFun">{{languageType0[$parent.swA].nextBtn}}</button>
                </div>
            </div>
            <div class="box2" v-if="data!=null?data.type==1?true:false:false">
                <h3>{{languageType1[$parent.swA].modal01H}} <img @click="modalCloseFun" src="../../assets/images/third/2019-12-18/close.png" alt=""></h3>
                <div class="modal-top">
                    <li>
                        <p>{{languageType1[$parent.swA].modal01p01}}<span>{{data!=null?data.amount:''}} {{data!=null?data.coinType.toUpperCase():''}}</span></p>
                    </li>
                </div>
                <div class="btn-modal">
                    <button class="cancle" @click="modalCloseFun">{{languageType1[$parent.swA].modal01btnCancle}}</button>
                    <button class="confirm" @click="modalConfirmFun">{{languageType1[$parent.swA].modal01btnConfirm}}</button>
                </div>
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
import {
    languageType0,
    languageType1
} from '../../locales/languages'
export default {
    props:{
        data: Object,
    },
    data() {
        return {
            // swA:'zh',
            time: 0,
            realName:'',
            next1: true,
            usdtType: 'ERC20',
            qr: false,
            canNext: true,
            modalStaus: false,
            languageType0: languageType0,
            languageType1: languageType1,
        }
    },
    watch:  {
        data: {
            handler(n, o) {
                this.$nextTick(()=>{
                    if(this.data!= null && this.data.type==1) {
                        this.getCode()
                    }
                })
                this.timeFun(this.data)
            },
            deep: true
        },
        usdtType(n,o) {
            if(document.querySelector('#qrcode')) {
                document.querySelector('#qrcode').innerHTML=''
            }
            this.$nextTick(()=>{
                this.$parent.usdtType = n;
                if(this.data!= null && this.data.type==1) {
                    this.getCode()
                }
            })
        }
    },
    created() {
        this.$parent.nav = 0;
    },
    mounted() {
        this.usdtType = this.$parent.usdtType;
        if(this.data!= null && this.data.type==1) {
            this.getCode()
        }
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
                    message: that.$parent.swA=='ch'?'复制成功':'Copy successful',
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
        async nextFun() {
            let search = location.search
            if(/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(this.realName)){
                this.$message({
                    message: this.$parent.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                    type: 'error',
                    center:true,
                    duration:1200,
                });
                return false
            }else{
                if(/\d+/.test(this.realName)){
                    this.$message({
                        message: this.$parent.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
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
                        message: this.$parent.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
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
            this.modalStaus = true;
            
        },
        modalCloseFun() {
            this.modalStaus = false;
            if(this.data.type==0) {
                this.next1 = true;
            }else {
                this.canNext = true;
            }
        },
        async modalConfirmFun(e) {
            // console.log(e.target)
            if(this.data.type==0) {
                let search = location.search
                let dom = e.target
                dom.innerHTML = '请求中'
                dom.style.pointerEvents = 'none'
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
                    dom.innerHTML = '下一步'
                    dom.style.pointerEvents = 'all'
                    this.modalStaus = false
                    this.$router.push({
                        path: `/gateway/two${search}`,
                        query: {
                            key: Base64.encode(JSON.stringify(key))
                        }
                    })
                }else {
                    this.next1 = true;
                    this.modalStaus = false
                    dom.innerHTML = '下一步'
                    dom.style.pointerEvents = 'all'
                }
            }else if(this.data.type==1) {
                let search = location.search
                let key = await updateTransferStatus(this,{
                    id:this.data.id
                }).then(res => {
                    return res;
                })
                if(key !=false) {
                    key.type=1;
                    if(key.message!=null && key.message!='') {
                        this.$message({
                            message: key.message,
                            type: 'waring',
                            center:true,
                            duration:1200,
                        });
                    }
                    this.$router.push({
                        path: `/gateway/two${search}`,
                        query: {
                            key: Base64.encode(JSON.stringify(this.data)),
                            item: Base64.encode(JSON.stringify(key)),
                        }
                    })
                    this.canNext = true
                    this.modalStaus = false
                }else {
                    this.canNext = true
                    this.modalStaus = false
                }
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
        nextFun1() {
            this.doneMoney()
        },
        async doneMoney(){
            // let search = location.search
            if(!this.canNext) {
                return false
            } else {
                this.canNext = false
            }
            this.modalStaus = true;
        },
    }
}
</script>
<style lang="scss" scoped>
#third-one {
    margin-top: 41px;
    .third-one-time {
        display: flex;
        // height:120px;
        height:100px;
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
            // padding: 23px 0px 0px 40px;
            padding: 0px 40px 0px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
                img {
                    margin-right: 10px;
                }
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
            &.en {
                h3 {
                    span {
                        width: 165px;
                    }
                }
                .tip-top {
                    p {
                        width: 300px;
                    }
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
                p {
                    &.merchant {
                        font-size: 20px;
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
            &.net {
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
            &.en {
                h3 {
                    line-height: 23px;
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
                    margin-right: 5px;
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
                        background: none;
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
                    margin: 0px 10px;
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
                position: relative;
                transition: all .3s ease-in-out;
                p {
                    position: absolute;
                    bottom: -25px;
                    right: 30%;
                    right: 3%;
                    width: 100%;
                    font-size:16px;
                    color:  #666666;
                    span {
                       color: #FE5B5B;
                    }
                }
                &:hover {
                    &::after{
                        content: '';
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: inherit;
                        height: inherit;
                        background: rgba(250,250,250,.2);
                    }
                }
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
    z-index: 3;
    div.box {
        border-bottom: 10px solid rgba(92,137,204,1);
        width:720px;
        height:520px;
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
        li {
            display: flex;
            font-size:18px;
            font-weight:400;
            line-height:24px;
            color:rgba(34,34,34,1);
            .icon {
                margin-right: 10px;
                position: relative;
                &::after {
                    position: absolute;
                    content: '';
                    width:15px;
                    height:10px;
                    background:rgba(199,217,246,1);
                    opacity:1;
                    z-index: -1;
                    bottom: 5px;
                    left: 0px;
                }
            }
            span {
                color: #FE5B5B;
            }
            &.light {
                font-size:16px;
                font-weight:400;
                line-height:32px;
                color:rgba(102,102,102,1);
            }
        }
        .modal-top {
            li {
                line-height: 32px;
                height: 45px;
                display: flex;
                align-items: center;
            }
            &.en {
                li {
                    line-height: 20px;
                    font-size: 16px;
                }
            }
        }
        .modal-bottom {
            li {
            height: 40px;
                display: flex;
                align-items: center;
            }
            margin-bottom: 10px;
        }
        .border {
            height: 1px;
            background:  rgba(204,204,204,1);
            margin: 28px 0px;
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