<template>
    <div id="third-one">
        <div class="third-one-time">
            <div class="left-time">
                <div class="time-top">
                    <img :src="require('../../assets/images/third/2019-12-18/time.png')" alt="">
                    <p>订单剩余支付时间</p>
                </div>
                <h3>{{(time)}}</h3>
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
                    <p>芝麻机构</p>
                </div>
            </div>
            <div class="third-one-item">
                <label >付款金额（CNY）</label>
                <div class="text-box">
                    <h3 class="amount">100000000.000</h3>
                </div>
            </div>
            <div class="third-one-item">
                <label >购买数量（USDT）</label>
                <div class="text-box">
                    <p>1000</p>
                </div>
            </div>
            <div class="third-one-item">
                <label >付款方式</label>
                <div class="text-box">
                    <img src="" alt="">
                    <p>银行卡</p>
                </div>
            </div>
        </div>
        <div class="name-next">
            <div class="input">
                <input type="text" placeholder="输入转账银行卡持有人姓名">
                <p>(请输入转账银行卡持有人的真实姓名)</p>
            </div>
            <button
            @click="nextFun"
            >下一步</button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data: Object,
    },
    data() {
        return {
            obj: {
                name:"nha"
            },
            swA:'zh',
            time: 0,
        }
    },
    mounted() {
        this.$parent.nav = 0;
        if(this.data!= null) {
            this.timeFun(this.data)
        }
    },
    methods: {
        nextFun() {
            let orderId = this.$route.params.orderId;
            console.log(orderId)
            this.$parent.nav=1
            this.$router.push({
                path: `/third/${orderId}/two`,
                query: {
                    key: this.obj
                }
            })
        },
        timeFun( key) {
            if(key.expiredTimestamp==0) {
                console.log('jj')
                this.time = 0;
                return false
            }else {
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
</style>