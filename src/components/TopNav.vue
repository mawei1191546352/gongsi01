<template>
    <div class="top-nav" :class="login==true?'top-nav-unline':'top-nav-nologin'">
        <div class="banxin outer mess-banxin" 
        :style="{'max-width':data?'1300px':'1200px;'}"
        :class="$route.path.indexOf('/legal-currency-order')>=0?'ban-left':''">
            <div class="top-nav-box">
                <!-- <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.label">
                    </el-option>
                </el-select>
                <span class="text"> ≈ {{value}} USD</span> -->
                <img style="cursor: pointer;" src="../assets/images/logopage/logo-lolo@2x.png" alt="" 
                v-show="$route.path=='/logo-page' || $route.path=='/' || $route.path=='' || $route.path=='/payment-detail' || (!login && $route.path=='/legal-currency') || $route.path.indexOf('/legal-currency-order')>=0 ?true:false"
                @click="$router.push('/')"
                >
                <el-select v-model="lang_one" placeholder="请选择">
                    <el-option
                    v-for="item in optionsLang"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="top-nav-box box2">
                <div class="unline_box" v-show="login==false?true:false">
                    <span @click="$router.push('/sign-in')">{{$t('top_nav.login')}}</span>
                    <span> | </span>
                    <span @click="$router.push('/register-user')">{{$t('top_nav.register')}}</span>
                </div>
                <div class="inline_box" v-show="login">
                    <p>
                        <span>{{$t('top_nav.hi')}}，</span>
                        <span class="username" @click="$router.push('/personal');$store.commit('_set_nav_item','0')">{{username}} </span>
                        <span @click="logOut"> [ {{$t('top_nav.sign_out')}} ]</span>
                    </p>
                </div>
            <!-- </div> -->
            <div class="mess" @mouseenter="mesList= !mesList"  v-show="login">
                <img src="../assets/images/chat/have.png" v-show="chatTui.length>0" alt="">
                <img src="../assets/images/chat/no.png" v-show="chatTui.length<=0" alt="">
                <span>{{$t('top_nav.message')}}</span>
            </div>
            <div class="mess-list" v-show="mesList" @mouseleave="mesList= !mesList">
                <h3 class="mes-head">{{$t('top_nav.message')}}</h3>
                <div class="mes-body gundong">
                    <li v-for="(item,key) in chatTui" :key="key">
                        <div class="img">
                            <img src="" :class="imgArr[Math.floor((Math.random()*imgArr.length))]" alt="" :data-name="item.messages[0].tUsername?item.messages[0].tUsername.slice(0,1):''">
                        </div>
                        <div class="content">
                            <div class="content-1">
                                <span>{{item.messages[0].role==0?$t('top_nav.in'):$t('top_nav.out')}}{{item.messages[0].coinType}}</span>
                                <span>{{item.messages[0].amountCny}} {{item.messages[0].tradeCoinType}}</span>
                            </div>
                            <h3 @click="goChat(item.order_id)">{{$t('top_nav.info_one')}}{{item.messages[0].type?item.order_id:(item.messages[0].user_id == user_info.userId ?item.messages[0].tUsername:item.messages[0].user_name)}}{{$t('top_nav.info_two')}}</h3>
                            <div class="content-3">
                                <span>{{item.messages?item.messages[item.messages.length-1].create_time:''}}</span>
                                <i>{{item.total}}</i>
                            </div>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="img">
                            <img src="" alt="">
                        </div>
                        <div class="content">
                            <div class="content-1">
                                <span>购买BTC</span>
                                <span>10000 CNY</span>
                            </div>
                            <h3>来自鱼儿...的新交易信息</h3>
                            <div class="content-3">
                                <span>2019-3-21 15:00:30</span>
                                <i>1</i>
                            </div>
                        </div>
                    </li> -->
                </div>
                <div class="mes-foot">
                    <el-button type="primary" size="small " @click="$router.push('/my-legal-order-list')">{{$t('top_nav.view')}}</el-button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { SignOut ,
legalOrderFindFun, 
getLang} from '../assets/js/api.js'
export default {
    props:{
        data: String,
    },
    data() {
        return {
            options:[],
            value:'',
            mesList:false,
            imgArr:['one','two','three','four','five','six'],
            optionsLang:[
                {
                    value:'zh',
                    label:'简体中文'
                },
                {
                    value:'en',
                    label:"English"
                }
            ],
            lang_one:window.localStorage.getItem('localeLanguage')
        }
    },
    computed:{
        username(){
            return this.$store.getters.username
        },
        login(){
            return this.$store.getters.login
        },
        chatTui(){
            return this.$store.getters.chatTui;
        },
        user_info(){
            return this.$store.getters.user_info;
        }
    },
    watch:{
        chatTui(n,o){
            // console.log(n)
        },
        lang_one(n,o) {
            if(n!='zh') {
                this.$i18n.locale = 'en'
            }else{
                this.$i18n.locale = 'zh'
            }
            window.localStorage.setItem('localeLanguage', this.$i18n.locale)
            this.initLang()
        }
    },
    created(){
        this.init_price()
        this.initLang()
        // console.log(this.chatTui)
    },
    methods:{
        async initLang(){
            let item;
            if(this.lang_one=='zh') {
                item = {
                    locale:"zh_CN"
                }
            }else{
                item = {
                    locale:"en_US"
                }
            }
            
            let k = await getLang(this,item)
        },
        async goChat(k){
            let key = await legalOrderFindFun(this,{id:k})
            .then((res) => {
                return res;
            })
            // debugger
            if(key!=false) {
                this.$store.dispatch('delteChatTui',k)
                await this.$store.dispatch('_async_set_init_fabi_file',key)
                if(this.$route.path.indexOf('/legal-currency-order/')>=0){

                }else{
                    await this.$router.push('/legal-currency-order/true/')
                }
            }
        },
        /**
         * init_price 初始化币种展示价格
         */
        init_price(){
            this.axios.post('/assets/ticker')
            .then((res) => {
                let data = res.data;
                if(data.code ==200){
                    let arr = data.data;
                    this.options = arr;
                    this.value = arr[0].label
                    
                }else{
                    this.$message({
                        type:'error',
                        message:data.message,
                        duration:1100,
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        /**
         * 退出登录
         */
        logOut(){
            SignOut(this)
        }
    }
}
</script>

<style lang="scss">
.top-nav{
    height: 2rem /* 20/20 */;
    background:rgba(1,23,41,.9);
    color:rgba(204,204,204,1);
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 100;
    .mess-banxin{
        display: flex;
        justify-content: space-between;
    }
    .mess{
        display: flex;
        background:rgba(255,255,255,0.2);
        // position: fixed;
        // top: 0;
        // right: 2rem;
        height: 2rem;
        width: 6rem;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span{
            color:#CCCCCCFF;
            font-size: .8rem /* 16/20 */;
            margin-left: .3rem;
        }
    }
    @media screen and (min-width: 1500px) {
        .mess{
            display: flex;
            background:rgba(255,255,255,0.2);
            position: fixed;
            top: 0;
            right: 2rem;
            height: 2rem;
            width: 6rem;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        
    }
    .banxin.ban-left{
        margin-left:11rem;
        .el-select{
                width: 5rem;
                height: 1.2rem;
                // position: absolute;
                // top: 50%;
                // margin-top: 1rem;
                // transform: translateY(-50%);
                margin-right: .2rem;
                .el-input {
                    height: 1.2rem;
                    input{
                        height: 1.2rem;
                        line-height: 1.2rem;
                        border-radius: 0;
                        padding-left: .5rem;
                        padding-right: .5rem;
                        background-color: transparent;
                        color: white;
                        // border-color: inherit;
                        border-color: transparent;
                    }
                    span{
                        display: inline-block;
                        height: 1.2rem;
                        line-height: 1.2rem;
                        i{
                            line-height: 1.2rem;
                            color: white;
                        }
                    }
                }
            }
    }
    .mess-list{
        display: flex;
        background:rgba(255,255,255,0.2);
        position: absolute;
        position: fixed;
        top: 2rem;
        right: -15rem;
        right: 2rem;
        width:305px;
        height:480px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(204,204,204,1);
        box-shadow:0px 3px 10px rgba(0,0,0,0.2);
        opacity:1;
        border-radius:3px;
        display: flex;
        flex-direction: column;

        .mes-head{
            height: 30px;
            line-height: 30px;
            color:#333333FF;
            box-sizing: border-box;
            padding-left: 1rem;
            font-size: 15px;
        }
        .mes-body{
            flex: 1;
            border-top:1px solid rgba(204,204,204,1);
            border-bottom:1px solid rgba(204,204,204,1);
            display: flex;
            flex-direction: column;
            overflow: auto;
            overflow-x: hidden;
            li{
                // flex:1;
                display: flex;
                display: -webkit-box; 
                height: 77px;
                justify-content: space-between;
                margin-top: .5rem;
                .img{
                    width: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    img{
                        display: block;
                        width: 30px;
                        height: 30px;
                        // background: red;
                        border-radius: 50%;
                    }
                    img::before{
                        content: attr(data-name);
                        display: flex;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                        color:rgba(255,255,255,1);
                        font-size: 15px;
                    }
                    img.one{
                        background: #8797af;
                    }
                    img.two{
                        background: #f66965;
                    }
                    img.three{
                        background: #81b29a;
                    }
                    img.four{
                        background: #2e294e;
                    }
                    img.five{
                        background: #247ba0;
                    }
                    img.six{
                        background: rgba(24,38,77,1);
                    }
                }
                .content{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding-right: .8rem;
                    padding-bottom: .3rem;
                    border-bottom: 1px solid rgba(204,204,204,1);
                    .content-1{
                        display: flex;
                        justify-content: space-between;
                        height: 15px;
                        span{
                            color:#666666FF;
                            font-size: 14px;
                        }
                    }
                    h3{
                        color:#333333FF;
                        font-size: 14px;
                        font-weight: 800;
                        line-height: 20px;
                        cursor: pointer;
                    }
                    .content-3{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span{
                            color:#666666FF;
                            font-size: 12px;
                        }
                        i{
                            display: flex;
                            width: 20px;
                            height: 20px;
                            background: #F05B5FFF;
                            justify-content: center;
                            border-radius: 50%;
                            align-items: center;
                            color:#FFFFFFFF;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .mes-foot{
            height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-sizing: border-box;
            padding-right: 1rem;
            .el-button--primary{
                background:rgba(92,137,204,1);
                border: 0px;
            }
        }
    }
    .top-nav-box{
        // width: 50%;
        flex: 1;
        height: 2rem;
        // line-height: 2rem;
        position: relative;
        // line-height: 2rem;
        display: flex;
        align-items: center;
        font-size: .9rem /* 18/20 */;
        .el-select{
            width: 4.5rem;
            width: 5rem;
            height: 1.2rem;
            // position: absolute;
            // top: 50%;
            // margin-top: 1rem;
            // transform: translateY(-50%);
            margin-right: .2rem;
                margin-top: .3rem;
            .el-input {
                height: 1.2rem;
                input{
                    height: 1.2rem;
                    line-height: 1.2rem;
                    border-radius: 0;
                    padding-left: .5rem;
                    padding-right: .5rem;
                    background-color: transparent;
                    color: #cccccc;
                    // border-color: inherit;
                    border-color: transparent;
                    font-size: .8rem /* 17/20 */;
                }
                span{
                    display: inline-block;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    i{
                        line-height: 1.2rem;
                        color: #cccccc;
                    }
                }
            }
        }
        span.text{
            width: 3rem;
            height: 2rem;
            line-height: 2rem;
            margin-left:4.5rem;
        }
        .unline_box{
            // width: 100%;
            display: inline-block;
            height: 2rem;
            text-align: right;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span{
                line-height: 2rem;
                cursor: pointer;
                font-size: .9rem /* 18/20 */;
            }
            span:hover{
                color:#5C89CC;
                text-decoration: underline;
            }
            .el-select{
                width: 4.5rem;
                height: 1.2rem;
                // position: absolute;
                // margin-top: 1rem;
                // top: 50%;
                // transform: translateY(-50%);
                margin-right: .2rem;
                .el-input {
                    height: 1.2rem;
                    input{
                        height: 1.2rem;
                        line-height: 1.2rem;
                        border-radius: 0;
                        padding-left: .5rem;
                        padding-right: .5rem;
                        background-color: transparent;
                        color: white;
                        // border-color: inherit;
                         border-color: transparent;
                    }
                    span{
                        display: inline-block;
                        height: 1.2rem;
                        line-height: 1.2rem;
                        i{
                            line-height: 1.2rem;
                            color: white;
                        }
                    }
                }
            }
        }
        .inline_box{
            // width: 100%;
            display: inline-block;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            text-align: right;
            p{
                span{
                    line-height: 2rem;
                    cursor: pointer;
                    font-size: .9rem /* 18/20 */;
                }
                span.username:hover{
                    color:#5c89cc;
                    text-decoration: underline;
                }
            }
            .el-select{
                width: 4.5rem;
                height: 1.2rem;
                // position: absolute;
                // top: 50%;
                // margin-top: 1rem;
                // transform: translateY(-50%);
                margin-right: .2rem;
                .el-input {
                    height: 1.2rem;
                    input{
                        height: 1.2rem;
                        line-height: 1.2rem;
                        border-radius: 0;
                        padding-left: .5rem;
                        padding-right: .5rem;
                        background-color: transparent;
                        color: white;
                        // border-color: inherit;
                        border-color: transparent;
                    }
                    span{
                        display: inline-block;
                        height: 1.2rem;
                        line-height: 1.2rem;
                        i{
                            line-height: 1.2rem;
                            color: white;
                        }
                    }
                }
            }
        }
    }
    .top-nav-box.box2{
        justify-content: flex-end;
        &div{
            margin-left:1rem;
        }
    }
}
.top-nav-unline{
    background:rgba(1,23,41,.9);
}
.top-nav-nologin{
   background: #011729;
   background: rgba(1, 23, 41, 0.6);
}
</style>
