<template>
    <div id="third">
        <div class="third-header">
            <div class="third-box">
                <img src="../../assets/images/nav-bar/2nav-logo@2x.png" alt="">
                <!-- 只有 以币入金才有中英文 -->
                <div class="sw" >
                    <span :class="swA=='ch'?'ac':'no'" @click="swA='ch'">中文</span>
                    <span :class="swA=='en'?'ac':'no'" @click="swA='en'">English</span>
                </div>
            </div>
        </div>
        <div class="third-nav" v-if="data!=null?data.type==0?true:false:false">
            <div class="third-box">
                <div :class="nav==0|| nav==1 || nav==2?(nav==0?'third-nav-item active':'third-nav-item line'):'third-nav-item'">
                    <p>01</p>
                    <p>选择付款方式</p>
                    <div class="border"></div>
                </div>
                <div :class="nav==1 || nav==2?(nav==1?'third-nav-item active':'third-nav-item line'):'third-nav-item'">
                    <p>02</p>
                    <p>付款转账</p>
                    <div class="border"></div>
                </div>
                <div :class="nav==2?'third-nav-item active':'third-nav-item'">
                    <p>03</p>
                    <p>确认付款信息</p>
                    <div class="border"></div>
                </div>
            </div>
        </div>
        <div class="third-nav" v-if="data!=null?data.type==1?true:false:false">
            <div class="third-box">
                <div :class="nav==0|| nav==1 || nav==2?(nav==0?'third-nav-item active':'third-nav-item line'):'third-nav-item'">
                    <p>01</p>
                    <p>充值入金</p>
                    <div class="border"></div>
                </div>
                <div :class="nav==1 || nav==2?'third-nav-item active':'third-nav-item'">
                    <p>02</p>
                    <p>状态查询</p>
                    <div class="border"></div>
                </div>
            </div>
        </div>
        <div class="third-content">
            <div v-if="data==null">
                {{requeset?'请求数据中...':'请求错误请重试'}}
            </div>
            <router-view :data="data"></router-view>
        </div>
        <div class="third-bottom" v-show="data!=null?(
            data.type==0?(
                nav!=2?true:false
            ):(nav!=1?true:false)
        ):false">
            <div class="third-bottom-box">
                <div class="third-bottom-item">
                    <img src="../../assets/images/third/2019-12-18/pei.png" alt="">
                    <h3>10倍赔付</h3>
                    <p>客户充值过程中若产生损失平台10倍赔付</p>
                </div>
                <div class="third-bottom-border"></div>
                <div class="third-bottom-item">
                    <img src="../../assets/images/third/2019-12-18/money.png" alt="">
                    <h3>保证金</h3>
                    <p>卖家已向Royalbiz平台缴纳足额保证金</p>
                </div>
                <div class="third-bottom-border"></div>
                <div class="third-bottom-item">
                    <img src="../../assets/images/third/2019-12-18/suo.png" alt="">
                    <h3>托管锁定</h3>
                    <p>卖家出售的 USDT 已托管锁定在Royalbiz平台</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {bindOrderFun,thirdGetInfo,
thirdGetInfo2,alreadyPayConfirm,
updateTransferStatus,updateSearchFun, deleteAdFun} from '../../assets/js/api'
export default {
    data() {
        return {
            type: 0, //
            swA: 'ch',
            nav: 0,//
            usdtType: 'OMNI',//在第一步设置的时候。把这个也设置，第二部会用到
            data: null,
            init_pay_file :{
                payVersion: 2,
                type: 0,
            },
            requeset: true,
        }
    },
    
    computed: {
        login(){
            return this.$store.getters.login
        },
    },
    async mounted() {
        let orderId = this.$route.params.orderId;
        // console.log(this.$route)
        let key =await thirdGetInfo(this,{
            id: orderId
        }).then((res) => {
            return res;
        })
        if(key!=false) {
            this.data = key;
            this.init_pay_file = key
            if(key.type==0) {//type==0
                // this.$router.push({
                //     path: `/third/${orderId}/third0`,
                //     query: {
                //         key: Base64.encode(JSON.stringify(key))
                //     }
                // })
            }else { //type==1
                // this.$router.push({
                //     path: `/third/${orderId}/third1/one`,
                //     query: {
                //         key: Base64.encode(JSON.stringify(key))
                //     }
                // })
            }

        }else {
            // alert('hh')
            this.requeset = false;
        }
        
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
#third {
    background: #F2F2F2;
    min-height: 100vh;
    .third-header {
        height: 60px;
        display: flex;
        align-items: center;
        .third-box {
            margin: 0 auto;
            width: 1100px;
            display: flex;
            justify-content: space-between;
            img {
                width: 160px;
                height: 32px;
            }
            .sw {
                display: flex;
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(34,34,34,1);
                    cursor: pointer;
                    margin-left: 10px;
                    box-sizing: border-box;
                        padding: 0px 10px;
                        height:40px;
                    &:hover {
                        background: #D4DDEB;
                        box-sizing: border-box;
                        padding: 0px 10px;
                        height:40px;
                        border-radius: 5px;
                    }
                    &.ac {
                        // width:65px;
                        box-sizing: border-box;
                        padding: 0px 10px;
                        height:40px;
                        background:rgba(92,137,204,1);
                        box-shadow:0px 3px 10px rgba(92,137,204,0.5);
                        opacity:1;
                        border-radius:5px;
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(250,250,250,1);
                        &:hover {
                            background:rgba(92,137,204,.8);
                        }
                    }
                }
            }
        }
    }
    .third-nav {
        height:90px;
        background:rgba(244,246,250,1);
        border:1px solid rgba(230,230,230,1);
        display: flex;
        align-items: center;
        .third-box {
            height: inherit;
            display: flex;
            margin: 0 auto;
            width: 1100px;
            .third-nav-item {
                height: inherit;
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size:22px;
                font-weight:400;
                line-height:30px;
                color:rgba(102,102,102,1);
                position: relative;
                &.line {
                    color:rgba(92,137,204,1);
                    .border {
                        position: absolute;
                        bottom: 0px;
                        width: 100%;
                        height:5px;
                        background:rgba(92,137,204,1);
                        border-radius:3px 3px 0px 3px;
                    }
                }
                &.active {
                    color:rgba(92,137,204,1);
                    .border {
                        position: absolute;
                        bottom: 0px;
                        width: 100%;
                        height:5px;
                        background:rgba(92,137,204,1);
                        border-radius:3px 3px 0px 3px;
                        &::after {
                                content: '';
                                position: absolute;
                                width: 0;
                                left: 50%;
                                transform: translateX(-50%);
                                height: 0;
                                border-left: 20px solid transparent;
                                border-right: 20px solid transparent;
                                border-bottom: 12px solid rgba(92,137,204,1);
                                bottom: 0px;
                                border-radius: 1px;
                            }
                    }
                    &:last-of-type {
                        .border {
                            position: absolute;
                            bottom: 0px;
                            width: 100%;
                            height:5px;
                            background:rgba(92,137,204,1);
                            border-radius:3px 3px 0px 3px;
                            &::after {
                                content: '';
                                position: absolute;
                                width: 0;
                                left: 50%;
                                transform: translateX(-50%);
                                height: 0;
                                border-left: 20px solid transparent;
                                border-right: 20px solid transparent;
                                border-bottom: 12px solid rgba(92,137,204,1);
                                bottom: 0px;
                                border-radius: 1px;
                            }
                        }
                    }
                }
            }
        }
    }
    .third-content {
        width: 1100px;
        margin: 0 auto;
    }
    .third-bottom {
        height:150px;
        background:rgba(250,250,250,1);
        border-top: 1px solid rgba(230,230,230,1);
        .third-bottom-box {
            display: flex;
            width: 1100px;
            margin: 0 auto;
            height: inherit;
            align-items: center;
            .third-bottom-item {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 40px;
                    height: 35px;
                }
                h3 {
                    font-size:20px;
                    font-weight:800;
                    line-height:28px;
                    color:rgba(34,34,34,1);
                    margin: 5px 0px 10px 0px;
                }
                p {
                    font-size:16px;
                    font-weight:400;
                    line-height:21px;
                    color:rgba(102,102,102,1);
                }
            }
            .third-bottom-border {
                width: 1px;
                height:50px;
                background:rgba(230,230,230,1);
            }
        }
    }
}
</style>