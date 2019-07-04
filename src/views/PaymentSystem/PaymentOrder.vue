<template>
    <div class="payment-order">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="payment-order-box">
            <div class="banxin">
                <div class="payment-order-box-main">
                    <div class="payment-order-nav">
                        <span class="one" @click="$router.push('/payment-system')">支付订单</span><span>></span><span>订单详情</span>
                        <span class="order-span right">订单号：{{pay_file.id}}</span>
                    </div>
                    <div class="payment-order-body">
                        <div class="left">
                            <div class="left-top">
                                <h3>商家名</h3>
                                <div class="left-center">
                                    <img :class="img_logo==''?'img_bg':''" :src="img_logo" alt=""><i>{{pay_file.merchantName}}</i>
                                </div>
                            </div>
                            <div class="left-body">
                                <p class="p-normal">支付币种：</p>
                                <p class="p-underline">{{pay_file.coinType}}</p>

                                <p class="p-normal">支付金额：</p>
                                <p class="p-underline color-blue">{{pay_file.amount}}  {{pay_file.coinType}}</p>

                                <p class="p-normal">折合美金：</p>
                                <p class="p-underline">{{pay_file.amountUsd}} USD</p>

                                <p class="p-normal">创建时间：</p>
                                <p class="p-underline">{{pay_file.startTime}}</p>

                                <p class="p-normal">{{(pay_file.status=='1' || pay_file.status=='3')?'关闭时间':'完成时间'}}：</p>
                                <p class="p-underline">{{pay_file.endTime}}</p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="right-top">
                                <h3 class="black" v-show="pay_file.status=='1' || pay_file.status=='3'">已关闭订单<i>{{pay_file.status=='1' ?'已超时':'已取消'}}</i></h3>
                                <h3 class="green" v-show="pay_file.status=='2'">已完成订单</h3>
                                <h3 class="red" v-show="pay_file.status=='0'">待支付订单</h3>
                                <div class="left-center">
                                    <p v-show="pay_file.status=='2'">您已支付{{pay_file.amount}} {{pay_file.coinType}} 给 {{pay_file.merchantName}}</p>
                                    <p v-show="pay_file.status=='1' || pay_file.status=='3'">{{pay_file.status=='1'?'您的订单已超时，系统自动关闭。':'您已取消该订单；系统已关闭该订单。'}}</p>
                                    <p class="p-button" v-show="pay_file.status=='0' "><i class="el-icon-time"></i><span>请在 </span><i>{{fortmatTime(time)}} </i>内完成支付，超时订单将被取消。</p>
                                    <span v-show="pay_file.status=='0' " class="button" @click="PayRealFun">立即支付</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="confirm_pay" v-show="confirm_pay">
            <i class="el-icon-close" @click="confirm_pay=false;"></i>
            <h3>确认支付</h3>
            <p class="p-input">
                <input type="password" v-model="pass_salary" placeholder="请输入资金密码"> 
            </p>
            <p class="button">
                <span class="button-cancel" @click="confirm_pay=false;pass_salary=''">取消</span>
                <span class="button-sure right" @click="payFun">确定</span>
            </p>
        </div>
        <pop-authen v-if="hackReset" childProp="pass"></pop-authen>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import PopAuthen from '../../components/PopupsAuthen.vue'
import {PayOrderConfirm} from '../../assets/js/api'
import Worker from '../../assets/js/worker.js'
import qs from 'qs';
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'pop-authen':PopAuthen,
    },
    data() {
        return {
            legalSet:'legal',
            workerSystem:null,
            time:'',
            confirm_pay:false,
            pass_salary:'',
            hackReset:false,
            box_info_pop:false,
            img_logo:'',
        }
    },
    computed:{
        pay_file(){
            return this.$store.getters.init_pay_file;
        },
        user_info(){
            return this.$store.getters.user_info;
        }
    },
    created(){
        this.autoTime(this.pay_file.expiredTimestamp)
        this.$store.dispatch('_async_reset_third_pay')
        this.getPath(this.pay_file.merchantLogo)
    },
    methods:{
        autoTime(t){
            if(this.workerSystem!=null){
                this.workerSystem.postMessage(
                    'close'
                )
            }
            
            this.workerSystem = new Worker()
            this.workerSystem.postMessage(
                t
            )
            this.workerSystem.addEventListener('message',(res)=>{
                console.log(res)
                this.time = res.data;
            })
        },
        /**
         * 格式化时间
         */
        fortmatTime(leftTime){
            let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                // vm.$emit('time-end')
                return '0'
            }
            return  `${d}天${h}小时${m}分${s}秒`
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
        /**
         * 支付
         */
        async payFun(){
            const {href} = this.$router.resolve({name:'LoaddingThrid'})
            let winHandler = window.open(href, '_blank')
            if(this.pass_salary =='') {
                this.$message({
                    type:'error',
                    message:"请填写资金密码",
                    duration:1200,
                })
                return false
            }
            let item = {
                id:this.pay_file.id,
                payPassword:this.pass_salary
            }
            let key  = await PayOrderConfirm(this,item)
            .then((res) => {
                return res;
            })
            console.log(key,'=====================================')
            if(key!=false) {
                this.confirm_pay = false;
                winHandler.location.href = key.redirectUrl
                this.$router.push('/payment-system')
            }else{
                winHandler.close()
            }
        },
        /**
         * 支付
         */
        PayRealFun(){
            this.hackReset = true;
            if(this.initBox()){

            }else{
                this.confirm_pay=true;
            }
        },
        initBox(){
            this.num=0;
            // console.log('this.googleAccount:',this.googleAccount)
            if(this.user_info.email!=null){
                this.num++
            }
            if(this.user_info.phone!=null){
                this.num++
            }
            if(this.user_info.googleAuthTag=='1'){
                this.num++
            }
            let k=0 ;
            // if(!this.user_info.googleAuthStatus =='0') {
            //     k+=1
            // }
            // if(this.checkAddMethod) {// 是不是添加付款方式
            //     if(this.num<2) {
            //         this.box_info_pop = true;
            //         // k+=1;
            //     }else{
            //         this.box_info_pop = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
            //     }
            // }else{
            //     this.box_info_pop = !(this.user_info.ifPayPassword =='1')
            // }
            
            if(this.user_info.ifPayPassword !='1') {
                k+=1
            }
            if(k==1) {
                this.box_info_pop  =true;
            }else if(k ==2 ){
                this.box_info_pop  =true;
            }else if (k==3) {
                this.box_info_pop  =true;
            }else if (k ==0 ){
                this.box_info_pop  =false;
            }
            return this.box_info_pop
        },
        /**
         * 获取图片真实参数
         */
        getPath(key,base){
            console.log(key)
            this.axios.post('/file/getUrl',qs.stringify({key:key}))
            .then((res) => {
                let data = res.data;
                if(data.code == 200){
                   let url = data.data.url
                   this.img_logo = url;
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:1200,
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
    },
    beforeDestroy(){
        if(this.workerSystem!=null){
            this.workerSystem.postMessage(
                'close'
            )
        }
    }
}
</script>

<style lang="scss">
.payment-order{
    .payment-order-box{
        background:rgba(230, 230, 230, 1);
        box-sizing: border-box;
        padding-top: 10rem;
        padding-bottom: 3rem;
        .payment-order-box-main{
            height: 37.75rem /* 755/20 */;
            background: white;
            .payment-order-nav{
                height: 2.5rem /* 50/20 */;
                border-bottom: 1px solid rgba(204,204,204,1);
                box-sizing: border-box;
                padding: 0 1rem;
                span{
                    display: inline-block;
                    height: 2.5rem;
                    line-height: 2.5rem;
                }
                span.one:hover{
                    color:#409eff;
                    cursor: pointer;
                }
                span.order-span{
                    font-size: .8rem /* 16/20 */;
                    color:rgba(102,102,102,1);
                }
            }
            .payment-order-body{
                box-sizing: border-box;
                padding: 0 1.5rem;
                .right,
                .left{
                    box-sizing: border-box;
                    padding:  1rem 0;
                }
                .left-top{
                    width:26.5rem /* 530/20 */;
                    height:8rem /* 160/20 */;
                    background:rgba(242,242,242,1);
                    h3{
                        height: 2.25rem /* 45/20 */;
                        line-height: 2.25rem;
                        background:rgba(230,230,230,1);
                        box-sizing: border-box;
                        padding: 0 1rem ;
                    }
                    .left-center{
                        height: 5.75rem;
                        line-height: 4.5rem;
                        box-sizing: border-box;
                        padding: 0 1rem ;
                        img{
                            display: inline-block;
                            width:2.75rem /* 55/20 */;
                            height:2.75rem /* 55/20 */;
                            background:#d9e3ec;
                            border: 1px solid #ccc;
                            // padding: 3px;
                            border-radius:50%;
                        }
                        img.img_bg{
                            background:rgba(24,38,77,1);
                        }
                        i{
                            color:rgba(51,51,51,1);
                            margin-left: 1rem;
                        }
                    }
                }
                .left-body{
                    .p-normal{
                        font-size: .7rem /* 14/20 */;
                        color:rgba(102,102,102,1);
                        line-height: 2rem /* 40/20 */;
                    }
                    .p-underline{
                        font-size: 1.2rem /* 24/20 */;
                        color:rgba(51,51,51,1);
                        line-height: 2.5rem /* 50/20 */;
                        border-bottom: 1px solid rgba(204,204,204,1);
                    }
                    .p-underline.color-blue{
                        color:rgba(76, 96, 133, 1);
                    }
                }
                .right-top{
                    width:26.5rem /* 530/20 */;
                    height:8rem /* 160/20 */;
                    background:rgba(242,242,242,1);
                    h3{
                        height: 2.25rem /* 45/20 */;
                        line-height: 2.25rem;
                        background:rgba(230,230,230,1);
                        box-sizing: border-box;
                        padding: 0 1rem ;
                    }
                    h3.red{
                        background:rgba(213,84,87,1);
                        color: white;
                    }
                    h3.green{
                        background:rgba(34,156,137,1);
                        color:white;
                    }
                    h3.black{
                        background:rgba(51,51,51,1);
                        color: white;
                    }
                    .left-center{
                        height: 5.75rem;
                        line-height: 4.5rem;
                        box-sizing: border-box;
                        padding: 0 1rem ;
                        position: relative;
                        p.p-button{
                            line-height: 2rem;
                            height: 2rem;
                            i{
                                color:red;
                            }
                        }
                        span.button{
                            display: inline-block;
                            width:5.5rem /* 110/20 */;
                            height:1.5rem /* 30/20 */;
                            line-height: 1.5rem;
                            text-align: center;
                            color:white;
                            background:rgba(76,96,133,1);
                            border:1px solid rgba(76,96,133,1);
                            border-radius:.75rem /* 15/20 */;
                            position: absolute;
                            right: 1rem;
                            bottom: 1rem;
                            cursor: pointer;
                        }
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .payment-order-body{
                    box-sizing: border-box;
                    padding: 0 1.5rem;
                    .right,
                    .left{
                        width: 100%;
                    }
                }
            }
        }
         @media screen and(max-width: 480px) {
                .payment-order-box-main{
                    height:45.75rem
                }
         }
    }
    // 
    .confirm_pay{
        width:22.5rem /* 450/20 */;
        height:13rem /* 260/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        box-sizing: border-box;
        padding: 1rem 1.5rem;
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
            font-size: 1rem /* 20/20 */;
            font-weight: bold;
            color:rgba(51,51,51,1);
            line-height: 2.5rem /* 50/20 */;
        }
        p.p-input{
            width:18.5rem /* 370/20 */;
            height:2rem /* 40/20 */;
            line-height: 2rem /* 50/20 */;
            
            input{
                width:18.5rem /* 370/20 */;
                height:1.9rem /* 38/20 */;
                border:1px solid rgba(204,204,204,1);
                box-sizing: border-box;
                padding-left: .7rem;
            }
        }
        p.button{
            margin-top: 2rem;
            line-height: 2.5rem /* 50/20 */;
            span{
                display: inline-block;
                width:5.5rem /* 110/20 */;
                height:2rem /* 40/20 */;
                line-height: 2rem;
                text-align: center;
                background:rgba(76,96,133,1);
                border-radius:.25rem /* 5/20 */;
                cursor: pointer;
            }
            .button-cancel{
                background:rgba(230,230,230,1);
                color: black;
            }
            .button-sure{
                background:rgba(76,96,133,1);
                color: white;
            }
        }
    }
}
</style>
