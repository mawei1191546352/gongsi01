<template>
    <div>
        <div class="shadow" :class="place_order.status=='0'?'':'place_order_active_shadow'" @click.prevent=""></div>
        <div class="place-order" :class="place_order.status=='0'?''+(place_order.io=='0'?' ru':' chu'):'place_order_active'+(place_order.io=='0'?' ru':' chu')">
            
            <h3>{{place_order.io=='0'?$t('place_holder.in'):$t('place_holder.out')}} <i class="el-icon-close" @click="closeFun"></i></h3>
            <div class="place-box">
                <div class="place-left" :class="(place_order.io=='0'?' ru':' chu')">
                    
                    <div class="center">
                        <div class="lleft">
                            <div class="img">
                                <img src="" alt="" :data-name="place_order.item.userName ? (place_order.item.userName).slice(0,1):''">
                            </div>
                            <div class="user">
                                <div class="user-top">
                                    <span class="username">{{place_order.item.userName}}</span>
                                    
                                </div>
                                <div class="user-bottom">
                                    <span :class="place_order.item.online?'status status_inline':'status status_unline'">{{place_order.item.online?'在线':'离线'}}</span>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="rright">
                            <p class="p_one"><span class="h3">{{place_order.item.price}} </span><span class="span_normal">{{place_order.item.tradeCoinType}}/{{place_order.item.coinName}}</span></p>
                            <div class="bo">
                                <p v-show="place_order.item.bankcardOn"><img src="../assets/images/legal-currency/bank@2x.png" alt=""></p>
                                <p v-show="place_order.item.alipayOn"><img src="../assets/images/legal-currency/ali@2x.png" alt=""></p>
                                <p v-show="place_order.item.wechatPayOn"><img src="../assets/images/legal-currency/wx@2x.png" alt=""></p>
                            </div>
                        </div>
                        <div class="xinyong" v-if="false">
                            <img src="../assets/images/legal-currency/xy@2x.png" alt=""><span>信用度</span><span>{{place_order.item.creditRatio}}%</span>
                        </div>
                    </div>
                    <div class="body">
                        <div>
                            <p class="p_p">{{$t('place_holder.limit')}}：{{place_order.item.minAmount}}-{{place_order.item.maxAmount}} {{place_order.item.tradeCoinType}}</p>
                            <p class="p_input"><input v-model="inCNY" type="text" :placeholder="place_order.io=='0'?$t('place_holder.amount_in_placeholder'):$t('place_holder.amount_out_placeholder')" @keyup="inCNYFun(inCNY)"><i></i></p>
                            <p class="p_p">{{$t('place_holder.limit')}}：{{place_order.item.minQty}}-{{place_order.item.maxQty}} {{place_order.item.coinName}}</p>
                            <p class="p_input"><input v-model="inNUM" type="text" :placeholder="place_order.io=='0'?$t('place_holder.total_in_placeholder'):$t('place_holder.total_out_placeholder')" @keyup="inNUMFun(inNUM)"><i></i></p>
                            <p class="p_p" v-show="place_order.item.isBuy!='1'">{{$t('place_holder.cash_pass')}}</p>
                            <p class="p_input" v-show="place_order.item.isBuy!='1'"><input v-show="place_order.item.isBuy!='1'" type="password" v-model="salaryPass" :placeholder="$t('place_holder.pass_placeholder')"><i></i></p>
                        </div>
                        <span v-show="info_status">{{info}}</span>
                        <p class="p_button" :class="button_active?(place_order.io=='0'?'p_button_active':'p_button_active_out'):''" @click="goOrderFun">  {{place_order.io=='0'?$t('place_holder.do_in'):$t('place_holder.do_out')}}<i v-show="loading" class="el-icon-loading"></i></p>
                    </div>
                </div>
                <div class="place-right">
                    <div class="p-r-top">
                        <span>{{$t('place_holder.mark')}}</span>
                        <img src="../assets/images/place/mark.png" alt="">
                    </div>
                    <p class="border"></p>
                    <div class="text gundong">
                        {{place_order.item.message}}
                        {{place_order.item.message}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import focusFun from '../assets/js/focusFun.js'
import {getCurrencyPriceCalcFun, legalSaleOrderFun, legalPurchaseOrderFun} from '../assets/js/api.js'
export default {
    data() {
        return {
            inCNY:'',
            inNUM:'',
            outCNY:'',
            outNUM:'',
            salaryPass:'',
            info_status:false,
            info:'',
            loading:false,
        }
    },
    computed:{
        place_order(){
            return this.$store.getters.place_order;
        },
        button_active(){
            if(this.place_order.item.isBuy!='0'){
                if(this.inCNY =='' || this.inNUM == ''){
                    return false
                }else{
                    return true
                }
            }else{
                if(this.inCNY =='' || this.inNUM == '' || this.salaryPass ==''){
                    return false
                }else{
                    return true
                }
            }
        },
    },
    watch:{
        
        
    },
    methods:{
        /**
         * 关闭下单弹框
         */
        closeFun(){
            // 关闭弹框时 对数据进行重置
            Object.assign(this.$data, this.$options.data())
            this.$store.dispatch('_async_set_place_order_close')
        },
        /**
         * 下单去详情页
         */
        async goOrderFun(){
            if(this.button_active){
                if(this.loading) {
                    return false;
                }
                // go
                if(this.place_order.item.isBuy!='0') {
                    if(this.inCNY=='' ){
                        this.$message({
                            type:'error',
                            message:'请填写完整信息',
                            duration:1200,
                        })
                        return false;
                    }
                    let item = {
                        amount:this.inCNY,
                        otcAdvertisementId:this.place_order.item.id,
                        tag:'1',
                        price:this.place_order.item.price
                    }
                    this.loading = true;
                    let key =await legalPurchaseOrderFun(this,item)
                    .then((res) => {
                        return res;
                    })
                    if(key !=false) {
                        // this.$router.push('/legal-currency-order')
                        // _async_set_init_fabi_file
                        await this.$store.dispatch('_async_set_place_order_close')
                        await this.$store.dispatch('_async_set_init_fabi_file',key)
                        await this.$router.push('/legal-currency-order/false/')
                        this.loading = false;
                    }else{
                        this.loading = false;
                    }
                }else{
                    if(this.inCNY=='' || this.salaryPass==''){
                        this.$message({
                            type:'error',
                            message:'请填写完整信息',
                            duration:1200,
                        })
                        return false;
                    }
                    let item = {
                        amount:this.inCNY,
                        otcAdvertisementId:this.place_order.item.id,
                        payPassword:this.salaryPass,
                        tag:'1',
                        price:this.place_order.item.price
                    }
                    this.loading = true;
                    let key =await legalSaleOrderFun(this,item)
                    .then((res) => {
                        return res;
                    })
                    if(key !=false) {
                        // this.$router.push('/legal-currency-order')
                        await this.$store.dispatch('_async_set_place_order_close')
                        await this.$store.dispatch('_async_set_init_fabi_file',key)
                        await this.$router.push('/legal-currency-order/false/')
                        this.loading = false;
                    }else{
                        this.loading = false;
                    }
                }
                
            }else{
                this.info_status = true;
                this.info = this.$t('info_item.input_all')
            }
        },
        async inCNYFun(n,o) {
            if(n=='') {
                this.inNUM= ''
                return false
            };
            let item = {
                inputCurrencyPrice:this.place_order.item.price,//	交易货币单价
                inputRmbAmount:this.inCNY,//inputRmbAmount
            }
            let key =await getCurrencyPriceCalcFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false){
                this.inNUM = key.tradeCurrencyAmount
            }
            
        },
        async inNUMFun(n,o) {
            if(n=='') {
                this.inCNY= ''
                return false
            };
            let item = {
                inputCurrencyAmount:this.inNUM,//交易数量
                inputCurrencyPrice:this.place_order.item.price,//	交易货币单价
            }
            let key =await getCurrencyPriceCalcFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false){
                this.inCNY = key.rmbAmount
            }
        }
    },
    mounted(){
        /**
         * 开始委托监听 focus事件
         */
        focusFun(this)
        
    }
}
</script>

<style lang="scss">

.shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -98;
}
.place_order_active_shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index:2000;
    background: rgba(0, 0, 0,.3);
}
.place-order{
    width:40.5rem /* 810/20 */;
    height:22rem /* 440/20 */;
    background:rgba(247,251,255,1);
    box-shadow:0px 0px 13px rgba(0,0,0,0.3);
    border-radius:.25rem /* 5/20 */;
    box-sizing: border-box;
    position: fixed;
    top: 85%;
    top: 42%;
    left: 50%;
    z-index: 3000;
    transform: translateX(-50%) translateY(-50%);
    display: none;
    // padding: .5rem 1rem;
    i{
        position: absolute;
        top: .5rem /* 10/20 */;
        right: .5rem /* 10/20 */;
    }
    i:hover{
        color: red;
        cursor: pointer;
    }
    h3{
        height:2rem /* 40/20 */;
        background:linear-gradient(88deg,rgba(92,137,204,1) 0%,rgba(76,96,133,1) 100%);
        opacity:1;
        border-radius:5px 5px 0px 0px;
        text-align: center;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 2rem /* 40/20 */;
    }
    .place-box{
        display: flex;
        justify-content: space-between;
        padding: .8rem /* 16/20 */ 1rem /* 20/20 */ 1.05rem 1rem;
        box-sizing: border-box;
        background: url('../assets/images/place/bg.png') center bottom no-repeat;
    }
    .place-left{
        width:25.5rem /* 510/20 */;
        height:18.4rem /* 360/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 15px rgba(92,137,204,0.2);
        border-radius:.15rem /* 3/20 */;
        box-sizing: border-box;
        padding: 15px 14px;
        padding: 15px 40px;
        .p_one{
            // margin-top: 1.9rem;
            span.h3{
                font-weight:550;
                font-size: 1.4rem /* 28/20 */;
                color:rgba(51, 51, 51, 1);
            }
            span.span_normal{
                color:rgba(102, 102, 102, 1);
                font-size: .8rem /* 16/20 */;
                font-weight: bold;
            }
        }
        .center{
            height: 2.5rem /* 50/20 */;
            margin: .8rem 0;
            display: flex;
            justify-content: space-between;
            .lleft{
                display: flex;
                justify-content: space-between;
            }
            .rright{
                display: flex;
                flex-direction: column;
                .bo{
                    display: flex;
                    justify-content: flex-end;
                    p{
                        margin-left: .3rem;
                    }
                }
            }
            .img{
                display: inline-block;
                width: 2.5rem /* 50/20 */;
                height: 2.5rem;
                vertical-align: super;
                img{
                    display: inline-block;
                    width: 2.5rem /* 50/20 */;
                    height: 2.5rem;
                    border-radius: 1.25rem /* 25/20 */;
                    background: rgba(24,38,77,1);
                }
                img::after{
                    content: attr( data-name ) "";
                    width: 2.5rem /* 50/20 */;
                    height: 2.5rem;
                    position: absolute;
                    font-size: .9rem /* 18/20 */;
                    z-index: 120;
                    color: white;
                    text-align: center;
                    line-height: 2.35rem;
                }
            }
            
            .user{
                // display: inline-block;
                display: flex;
                flex-direction: column;
                // height: 3rem;
                justify-content: space-between;
                // width: 8rem /* 120/20 */;

                .user-top{
                    display: inline-block;
                    box-sizing: border-box;
                    padding-left: .3rem;
                    .username{
                        color:rgba(51,51,51,1);
                        font-size: .8rem /* 16/20 */;
                        font-weight: 550;
                    }
                    span{
                        
                    }
                    .status{
                        box-sizing: border-box;
                        display: inline-block;
                        width:1.75rem /* 35/20 */;
                        height:1rem /* 20/20 */;
                        border-radius:.25rem /* 5/20 */;
                        font-size: .6rem /* 12/20 */;
                        line-height: .9rem;
                        text-align: center;
                        color: white;
                        margin-left: .5rem;
                        vertical-align: middle;
                    }
                    @media screen and(max-width: 480px) {
                        .status{
                            font-size: 0.6rem;
                        }
                    }
                    .status.status_inline{
                        background:rgba(34,156,137,1);
                    }
                    .status.status_unline{
                        background:rgba(153,153,153,1);
                        color: white;
                    }
                }
                .user-bottom{
                    display: inline-block;
                    margin-top:.2rem;
                    margin-top:.1rem;
                    // width: 7.4rem /* 148/20 */;
                    // height: 1.4rem /* 28/20 */;
                    .status{
                        box-sizing: border-box;
                        display: inline-block;
                        width:1.75rem /* 35/20 */;
                        height:1rem /* 20/20 */;
                        border-radius:.25rem /* 5/20 */;
                        font-size: .6rem /* 12/20 */;
                        line-height: .9rem;
                        text-align: center;
                        color: white;
                        margin-left: .5rem;
                        vertical-align: middle;
                    }
                    @media screen and(max-width: 480px) {
                        .status{
                            font-size: 0.6rem;
                        }
                    }
                    .status.status_inline{
                        background:rgba(34,156,137,1);
                    }
                    .status.status_unline{
                        background:rgba(153,153,153,1);
                        color: white;
                    }
                    p{
                        display: inline-block;
                        width: 1.7rem /* 34/20 */;
                        width: 1.5rem;
                        height: 1.3rem /* 26/20 */;
                        height: 1.2rem;
                        border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                        border-radius:.2rem /* 4/20 */;
                        margin: 0 .3rem;
                        vertical-align: middle;
                        text-align: center;
                        // line-height: 1.3rem;
                        img{
                            display: inline-block;
                            width: 1.15rem /* 23/20 */;
                            height: .9rem /* 18/20 */;
                        }
                    }
                }
            }
            .xinyong{
                display:inline-block;
                width: 12rem;
                height: 2.5rem;
                text-align: right;
                img{
                    display: inline-block;
                    width: 1.15rem /* 23/20 */;
                    height: 1.15rem /* 18/20 */;
                    margin-right: .3rem;
                }
                span{
                    color:rgba(102,102,102,1);
                    font-size: .7rem /* 14/20 */;
                    font-weight: 500;
                    margin-right: .2rem;
                }
            }
        }
        .body{
            margin-top: 1.7rem;
            .p_p{
                margin-top: .5rem;
                height:1.5rem /* 30/20 */;
                line-height: 1.5rem /* 30/20 */;
                background:rgba(255,255,255,1);
                font-size: .8rem /* 16/20 */;
                color:rgba(102,102,102,1);
            }
            .p_input{
                height:2rem /* 40/20 */;
                width: 100%;
                input{
                    width: 100%;
                    display: inline-block;
                    height:1.9rem /* 38/20 */;
                    font-size: .8rem /* 16/20 */;
                    background:rgba(255,255,255,1);
                    border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                    box-sizing: border-box;
                    padding-left: .5rem;
                }
            }
            .p_button{
                height:2rem /* 40/20 */;
                // line-height: 2rem;
                text-align: center;
                background:rgba(204,204,204,1);
                color:rgba(255,255,255,1);
                border-radius:.25rem /* 5/20 */;
                cursor: pointer;
                margin-top: 1rem; 
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                i{
                    position: relative!important;
                    top: 0rem;
                    left: .2rem;
                }
            }
            .p_button_active{
                background:rgba(76,96,133,1);
            }
            .p_button_active_out{
                background:rgba(34,156,137,1);
            }
            span{
                display: inline-block;
                width: 100%;
                margin-top: .5rem;
                height: 1.5rem /* 30/20 */;
                line-height: 1.5rem;
                text-align: center;
                background: rgba(255,0,0,.4);
                color: black;
                font-size: .75rem /* 15/20 */;
            }
        }
    }
    .place-left.chu{
        height: 22.5rem;
    }
    .place-right{
        width: 12rem /* 240/20 */;
        
        .p-r-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size:.8rem /* 16/20 */;
                font-weight:800;
                line-height:1.5rem /* 30/20 */;
                color:rgba(51,51,51,1);
            }
            img{
                width: .8rem /* 16/20 */;
                height: 1rem;
            }
        }
        p.border{
            height: 1px;
            background: rgba(102,102,102,1);
            margin-top: .35rem;
            margin-bottom: .2rem;
        }
        div.text{
            font-size:.8rem /* 14/20 */;
            line-height: 1.15rem /* 25/20 */;
            color:rgba(102,102,102,1);
            height: 15.9rem /* 318/20 */;
            overflow-y: auto;
        }
    }
    
}
.place-order.chu{
    height: 26rem;
}
.place_order_active{
    display: block;
}
</style>
