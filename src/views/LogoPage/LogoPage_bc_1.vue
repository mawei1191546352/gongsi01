<template>
    <div class="logo-page">
        <top-nav></top-nav>
        <!-- <nav-bar :childSet="legalSet"></nav-bar> -->
        <div class="logo-page-box">
            <div class="legal-currency-box-img">
                <div class="banxin">
                    <!-- <h3>RoyalbizOTC 用心服务每一个细节</h3> -->
                </div>
            </div>
            <div class="logo-top-center">
                <div class="banxin">
                    <div class="header">
                        <h3>Royalbiz简介</h3>
                        <p class="p-border"></p>
                        <!-- <p class="p-head">INTRODUCTION</p> -->
                        <p class="p-text">Royalbiz是一基于区块链技术研发的数字货币兑换系统，是一个不涉及第三方的区块链资产交易平台，</p>
                        <p class="p-text">帮助机构客户实现数字资产的大额、实时、安全、合规交易， 致力于解决数字资产与传统货币之间的结算问题。</p>
                        <p class="p-text">业务范围包括电商、食品、旅游、娱乐等。</p>
                    </div>
                </div>
            </div>
            <div class="logo-bottom-back"></div>
            <div class="order_way">
                <div class="p_left" @mouseenter="text_right=true" @mouseleave="text_right=false" :class="login?'login':''">
                    <img src="../../assets/images/logopage/tu16.png" alt="" v-show="login?true:!text_right" data-info="普通用户">
                    <span data-info="普通用户" v-show="login?true:!text_right"></span>
                    <div class="text text_right" v-show="login?false:text_right" >
                        <!-- <h3>普通用户</h3> -->
                        <!-- <span></span> -->
                        <p>通过平台进行数字货币的买卖承兑</p>
                        <p>使用数字货币进行支付结算</p>
                        <button @click="$router.push('/register-user')">立即注册</button>
                    </div>
                </div>
                <div class="p_right" @mouseenter="text_left=true" @mouseleave="text_left=false">
                    <img src="../../assets/images/logopage/tu17.png" alt="" v-show="!text_left" data-info="入驻商户">
                    <span data-info="入驻商户" v-show="!text_left"></span>
                    <div class="text text_left" v-show="text_left">
                        <!-- <h3>入驻商户</h3> -->
                        <!-- <span></span> -->
                        <p>平台撮合下帮助客户完成订单交易</p>
                        <p>满足商户的充币&提币需求</p>
                        <button @click="open">接入指引</button>
                    </div>
                </div>
            </div>
            <div class="logo-bottom-box">
                <div class="banxin">
                    <div class="bottom-head">
                        <h3>为什么选择Royalbiz？</h3>
                        <p class="p-border"></p>
                        <!-- <p class="p-head">WHY YOU CHOOSE</p> -->
                    </div>
                    <div class="logo-bottom-center">
                        <!-- <p>安全性</p> -->
                        <div class="box">
                            <div class="one"  @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/3.png" alt="">
                                <span>冷储存、SSL、多重加密</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/4.png" alt="">
                                <span>冷、温、热钱包的尖端存储设计</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/5.png" alt="">
                                <span>资金水位动态配置</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/1.png" alt="">
                                <span>自动报单</span>
                            </div>
                            <div class="one" @mouseenter="inFun($event)" @mouseleave="outFun($event)">
                                <img src="../../assets/images/logopage/2.png" alt="">
                                <span>API接口</span>
                            </div>
                        </div>
                        <!-- <p>技术性</p>
                        <div class="box">
                            <div class="one">
                                <img src="../../assets/images/logopage/1.png" alt="">
                                <span>自动报单</span>
                            </div>
                            <div class="one">
                                <img src="../../assets/images/logopage/2.png" alt="">
                                <span>API接口</span>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="bottom-head">
                        <h3>我能通过Royalbiz做什么？</h3>
                        <p class="p-border"></p>
                        <p class="p-head">WHAT CAN BE DONE</p>
                    </div> -->
                </div>
            </div>
            
            <div class="logo-foot">
                <!-- <p>当前服务器时间：Thu Dec 06 2018 09:33:10 GMT+0800 (中国标准时间)</p> -->
                <p>当前服务器时间：{{time}}</p>
                <p>Royalbiz.co版权所有©{{moment().year()}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import moment from 'moment'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'legal',
            text_right:false,
            text_left:false,
            time:null,
        }
    },
    computed:{
        login(){
            return this.$store.getters.login
        }
    },
    created(){
        setInterval(()=>{
            // console.log(new Date(this.$store.getters.os_time+1))
          this.time = new Date(new Date(moment().millisecond(this.$store.getters.os_time)+1)).toString()
        },1000)
    },
    methods:{
        open(){
            window.open('http://doc.royalbiz.co/docs/a1/a1-1')
        },
        inFun(dom) {
            let t = setTimeout(()=>{
                console.log(dom.srcElement.classList.contains('img'))
                if(dom.srcElement.classList.contains('img')) {
                }else{
                        dom.srcElement.classList.add('img')
                }
                clearTimeout(t)
            },900)
        },
        outFun(dom) {
            let t = setTimeout(()=>{
                dom.srcElement.classList.remove('img')
                clearTimeout(t)
            },900)
        }
    }
}
</script>

<style lang="scss">
.logo-page{
    .logo-page-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 23rem /* 460/20 */;
        h3{
            font-weight: 600;
        }
        .legal-currency-box-img{
            // background-color: red;
            // height: 32rem /* 460/20 */;
            height: 100vh;
            background: url('../../assets/images/logopage/tu9@2x.png') no-repeat center center;
            // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E9%A6%96%E9%A1%B5/tu9%402x.png) no-repeat center center;
            background-size: cover;
            position: relative;
            box-sizing:border-box;
            padding-top: 8rem;
            .banxin{
                // margin-top: 12.5rem /* 250/20 */;
            }
        }
        .logo-top-center{
            height: 14rem /* 280/20 */;
            background:rgba(242,242,242,.8);
            // border-bottom: 5px solid rgba(242,242,242,1);
            // max-width: 60rem;
            width: 60rem;
            margin: 0 auto;
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: .5rem /* 10/20 */;
            .header{
                text-align: center;
                box-sizing: border-box;
                padding-top: 3rem;
                h3{
                    font-size: 1.2rem /* 24/20 */;
                    color:rgba(51,51,51,1);
                    color:#000000;
                    line-height: 2rem /* 50/20 */;
                }
                p.p-border{
                    height: .25rem /* 8/20 */;
                    width:3rem /* 140/20 */;
                    background:rgba(76,96,133,1);
                    margin-left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 1rem /* 20/20 */;
                }
                p.p-head{
                    font-size: .8rem /* 16/20 */;
                    color:rgba(204,204,204,1);
                    line-height: 1.5rem /* 40/20 */;
                    margin-bottom: .4rem;
                    letter-spacing: 2px;
                }
                p.p-text{
                    font-size: .9rem /* 18/20 */;
                    color:rgba(102, 102, 102, 1);
                    line-height: 1.5rem;
                    color:#333333;

                }
            }
        }
        .logo-bottom-back{
            height: 0rem /* 10/20 */;
            background:rgba(230,230,230,1);
        }
        .logo-bottom-box{
            height: 55.5rem /* 1110/20 */;
            height: 26rem /* 480/20 */;
            .bottom-head{
                text-align: center;
                margin-top: 2.5rem /* 50/20 */;
                h3{
                    font-size: 1.2rem /* 24/20 */;
                    color:rgba(51,51,51,1);
                    color:#000;
                    line-height: 2rem /* 50/20 */;
                    box-sizing: border-box;
                    padding-left: .3rem;
                }
                p.p-border{
                    height: .25rem /* 8/20 */;
                    width:3rem /* 140/20 */;
                    background:rgba(76,96,133,1);
                    margin-left: 50%;
                    transform: translateX(-50%);
                }
                p.p-head{
                    font-size: .8rem /* 16/20 */;
                    color:rgba(204,204,204,1);
                    line-height: 1.5rem /* 40/20 */;
                    margin-bottom: .4rem;
                    letter-spacing: 2px;
                }
            }
            .logo-bottom-center{
                margin-top: 1.75rem /* 35/20 */;
                p{
                    text-align: center;
                    font-size: 1rem /* 20/20 */;
                    color:rgba(102,102,102,1);
                    line-height: 1.5rem /* 30/20 */;
                    margin-bottom: 2rem;
                }
                .box{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 3.5rem;
                    .one{
                        width:15rem /* 300/20 */;
                        height:14.5rem /* 290/20 */;
                        width: 9.55rem /* 191/20 */;
                        height: 12.1rem /* 242/20 */;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(204,204,204,1);
                        border-radius:.25rem /* 5/20 */;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        box-sizing: border-box;
                        padding:0rem 0.9rem ;
                        img{
                            display: inline-block;
                            width: 6.75rem /* 135/20 */;
                            height: 7.8rem /* 156/20 */;
                            width: 6.25rem /* 125/20 */;
                            height: 7rem /* 140/20 */;
                            // border:1px dashed rgba(204,204,204,1);
                            transform: rotateY(0deg);
                            animation:  imgRotateInit 1s;
                        }
                        span{
                            font-size: .9rem /* 18/20 */;
                            font-size: .7rem /* 14/20 */;
                            color:rgba(102,102,102,1);
                            line-height: 1.05rem /* 21/20 */;
                        }
                    }
                    
                    @keyframes imgRotate {
                        0%{
                        }
                        100%{
                            transform:rotateY(180deg);
                        }
                    }
                    @keyframes imgRotateInit {
                        0%{
                            transform:rotateY(180deg);
                        }
                        100%{
                            transform:rotateY(0deg);
                        }
                    }
                    .one:hover{
                        img{
                            animation: imgRotate 1s;
                        }
                    }
                    .one.img{
                        img{
                            transform:rotateY(180deg);
                        }
                    }
                }
            }
        }
        .order_way{
            display: flex;
            justify-content: space-between;
            height: 14.15rem /* 163/20 */;
            margin-top: .25rem /* 5/20 */;
            position: relative;
            .p_left{
                flex: 1;
                background: url('../../assets/images/logopage/tu7@2x.png');
                // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E9%A6%96%E9%A1%B5/tu7%402x.png);
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                justify-content:center;
                padding-right: 1rem /* 20/20 */;
                margin-right: .25rem /* 5/20 */;
                position: relative;
                img{
                    position: absolute;
                    width: 6.5rem /* 65/20 */;
                    height: 6.5rem /* 65/20 */;
                    right: 50%;
                    top: 41%;
                    transform: translateX(50%) translateY(-50%);
                }
                span::after{
                    content: attr( data-info );
                    display: block;
                    height:20px!important;
                    position: absolute;
                    top:70%;
                    left:50%;
                    transform: translateX(-50%);
                    font-size: 1.1rem /* 22/20 */;
                    color: #fff;
                }
                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: flex-end;
                    align-items: center;
                    color:#FFFFFF;
                    height: 11rem;
                    z-index: 200000000;
                    margin-top: 1.5rem;
                    box-sizing: border-box;
                    padding: 1.5rem 0rem;
                    h3{
                        font-size: 1.2rem /* 18/20 */;
                        font-weight: bold;
                    }
                    span{
                        display: inline-block;
                        height: 1px;
                        width: 2rem /* 30/20 */;
                        background: #FFFFFF;
                    }
                    p{
                        font-size: 1.1rem /* 12/20 */;
                    }
                    button{
                        display: inline-block;
                        width:6.55rem /* 71/20 */;
                        height:2rem /* 20/20 */;
                        outline: none;
                        background-color:transparent;
                        border:1px solid rgba(255,255,255,1);
                        color:#FFF;
                        border-radius:3px;
                        font-size: .8rem /* 12/20 */;
                        cursor: pointer;
                    }
                    button:hover{
                        background: white;
                        color:rgba(100,110,116,1);
                    }
                }
            }
            .p_left:hover::after{
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0%;
                background:rgba(76,96,133,.8);
            }
            .login.p_left:hover::after{
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0%;
                background:rgba(76,96,133,0);
            }
            .p_right:hover::after{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                right: 0%;
                top: 0;
                background:rgba(76,96,133,.8);
            }
            .p_right{
                flex: 1;
                background: url('../../assets/images/logopage/tu8@2x.png');
                // background: url(https://s3-ap-southeast-1.amazonaws.com/royalbiz/%E9%A6%96%E9%A1%B5/tu8%402x.png);
                display: flex;
                justify-content: center;
                padding-left: 1rem /* 20/20 */;
                position: relative;
                img{
                    position: absolute;
                    width: 6.5rem /* 65/20 */;
                    height: 6.5rem /* 65/20 */;
                    left: 50%;
                    top: 41%;
                    transform: translateX(-50%) translateY(-50%);
                    
                }
                span::after{
                    content: attr( data-info );
                    display: block;
                    height:20px!important;
                    position: absolute;
                    top:70%;
                    left:50%;
                    transform: translateX(-50%);
                    font-size: 1.1rem /* 22/20 */;
                    color: #fff;
                }
                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    // color:#333333;
                    color:#FFFFFF;
                    height: 11rem;
                    margin-top: 1.5rem;
                    z-index: 200000000;
                    box-sizing: border-box;
                    padding: 1.5rem 0rem;
                    h3{
                        font-size: 1.2rem /* 18/20 */;
                        font-weight: bold;
                    }
                    p{
                        font-size: 1.1rem /* 12/20 */;
                    }
                    span{
                        display: inline-block;
                        height: 1px;
                        width: 2rem /* 30/20 */;
                        background: #333;
                        background: #fff;
                    }
                    button{
                        display: inline-block;
                        width:6.55rem /* 71/20 */;
                        height:2rem /* 20/20 */;
                        outline: none;
                        background-color:transparent;
                        border:1px solid #333;
                        border:1px solid #fff;
                        border-radius:3px;
                        font-size: .8rem /* 12/20 */;
                        cursor: pointer;
                        color:#fff;
                    }
                    button:hover{
                        background: black;
                        background: #fff;
                        color:rgba(165,231,218,1);
                        color:rgba(100,110,116,1);
                    }
                }
            }
        }
        .logo-foot{
            height: 5rem /* 100/20 */;
            background:rgba(76,96,133,1);
            background:rgba(242,242,242,1);
            background: #011525;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
                text-align: center;
                font-size: .7rem /* 14/20 */;
                color:rgba(255, 255, 255, 1);
                color:rgba(51,51,51,1);
                color:white;
                line-height: 1.5rem /* 30/20 */;
            }
        }
    }
}

 @media screen and(max-width: 480px) {
                
    .logo-top-center{
        width: 30rem!important;
    }
    .logo-bottom-box{
        height: 29rem!important;
        .box{
            flex-wrap: wrap;
        }
    }
    
}
</style>
