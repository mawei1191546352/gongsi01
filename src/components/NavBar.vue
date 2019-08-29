<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:09:47
 * @LastEditors: mawei
 * @LastEditTime: 2019-08-16 11:24:44
 -->
<template>
    <div class="nav-bar" id="nav-bar" :class="navBack" v-show="login || $route.path=='/sign-in' ||$route.path=='/register-user' ||$route.path=='/forget-pass'">
        <div class="banxin" >
            <div class="nav-bar-box outer" >
                <div class="left">
                    <!-- <img src="../assets/images/nav-bar/LG_gif.gif" v-show="img_show" alt=""> -->
                    <div class="" :class="img_show?'nav-bar-img':'nav-bar-img-d'" @click="$router.push('/logo-page')"></div>
                </div>
                <div class="right" v-show="right_show">
                    <div class="item">
                        <!-- <span v-show="$store.getters.user_info.isMerchant=='0'" :class="nav_item=='1'?'nav-active ':''" @click="changeModel('1')">{{$t("nav_bar.0")}}</span> -->
                        <span  :class="nav_item=='1'?'nav-active ':''" @click="changeModel('1')">{{$t("nav_bar.0")}}</span>
                        <span 
                            v-show="(user_info.isMerchant ==1 || user_info.role == '3') || (user_info.role=='5') || (user_info.role=='4')?true:false"
                        :class="nav_item=='3'?'nav-active ':''" @click="changeModel('3')">{{$t("nav_bar.1")}}</span>
                        <span  :class="nav_item=='2'?'nav-active ':''" @click="changeModel('2')">{{$t("nav_bar.2")}}</span>
                        <span  :class="nav_item=='0'?'nav-active ':''" @click="changeModel('0')">{{$t("nav_bar.3")}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navBack:'',
            right_show:true,
            i:0,
            img_show:true,
        }
    },
    computed:{
        nav_item:{
            get:function(){
                return this.$store.getters.nav_item;
            }
        },
        user_info:{
            get:function(){
                return this.$store.getters.user_info;
            }
        },
        login() {
            return this.$store.getters.login;
        }
    },
    watch:{
        childSet(n,o){
            console.log(n)
            this.navSetFun(n)
        },
        nav_item(n,o){
            switch(n) {
                case '0':
                    this.$router.push('/personal')
                    
                    break
                case '1':
                    this.$router.push('/legal-currency')
                    break
                case '2':
                    this.$router.push('/asset-manage')
                    break
                 case '3':
                    this.$router.push('/payment-system')
                    break
                 case '4':
                    this.$router.push('/logo-page')
                    break
            }
        },
    },
    created(){
        // this.$i18n.locale = 'en';
        console.log(this.nav_item,this.$i18n)
        this.navSetFun(this.childSet)
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll,true)
    },
    methods:{
        /**
         * 设置背景方法
         */
        navSetFun(n){
            switch(n) {
                case 'legal-currency':
                    this.navBack = 'legal legal-currency'
                    break
                case 'legal-currency-order':
                    this.navBack = 'legal legal-currency-order'
                    break
                case 'sign-in':
                    this.navBack = 'legal legal-currency'
                    this.right_show = false
                    break
                default:
                    this.navBack = 'legal legal-currency'
                    break
            }
        },
        /**
         * 切换模块
         */
        changeModel(str) {
            switch(str) {
                case '1':
                    this.$router.push('/legal-currency')
                    break
                case '0':
                    this.$router.push('/personal')
                    break
                case '2':
                    this.$router.push('/asset-manage')
                    break
                case '3':
                    this.$router.push('/payment-system')
                    break
                default:
                    
                    break
            }
            
            this.$store.commit('_set_nav_item',str)
        },
        /**
         * 滚动
         */
        handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(document.querySelector('#nav-bar')==null) return false
            var offsetTop = document.querySelector('#nav-bar').offsetTop
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if(scroll<0){
                if(scrollTop>100){
                    this.navBack = 'legal-fixed'
                    // this.img_show = false;
                    
                }else{
                    // this.navBack = 'legal'
                    // this.img_show = true;
                }
            }else{
                // console.log('down')
                this.navBack = 'legal'
                // this.img_show = true;
                setTimeout(()=>{
                    this.img_show = true
                },800)
            }
        },

    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    props:[
        'childSet'
    ]
}
</script>

<style lang="scss">
.nav-bar{
    height: 5rem /* 100/20 */;
    background:rgba(255,255,255,.8);
    .nav-bar-box{
        height: 5rem;
        @media screen and(max-width: 480px){
                .left{
                    display: none;
                }
        }
        .left,
        .right{
            height: 5rem;
        }
        img{
            display: inline-block;
            width:1.9rem /* 38/20 */;
            height: 2.5rem /* 50/20 */;
            // background: url('../assets/images/nav-bar/LG_gif22.gif') no-repeat center center;
            background-size: cover;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .nav-bar-img{
            display: inline-block;
            width: 5.55rem /* 111/20 */;
            width:8.55rem /* 111/20 */;
            width:10rem /* 111/20 */;
            height: 2rem /* 45/20 */;
            background: url('../assets/images/nav-bar/nav-logo-n@2x.png') no-repeat center center;
            background-size: cover;
            position: absolute;
            top: 50%;
            // left: 2.5rem;
            transform: translateY(-50%);
            cursor: pointer;
        }
        
        .item{
            height: 5rem;
            color:rgba(102,102,102,1);
            span{
                display: inline-block;
                height: 5rem;
                line-height: 5rem;
                font-size: .9rem /* 20/20 */;
                width: 7.5rem /* 150/20 */;
                cursor: pointer;
                text-align: center;
            }
            span.nav-active{
                color:rgba(76,96,133,1);
                background:rgba(255,255,255,1);
            }
        }
    }
}
@keyframes topLegal {
    from {
        opacity: 1;
        top:2rem;
        height: 0rem;
        background:rgba(242, 242, 242,1);
        // transform: translate3d(0%,-0%,0);
    }
    to {
        height: 5rem;
        top:-100;
        // transform: translate3d(0%,0%,0);
    }
}
@keyframes fiexLegal {
    // from {
    //     height: 0;
    //     top:-1rem;
    //     right: 0;
    //     width: 0;
    //     background: red;
    // }
    // to {
    //     height: 5rem;
    //     width: 100%;
    //     background:rgba(242, 242, 242,1);
    //     background: red;
    //     top: 2rem;
    // }
    from {
        opacity: 1;
        top:2rem;
        height: 0rem;
        background:rgba(242, 242, 242,1);
        // transform: translate3d(0%,-0%,0);
    }
    to {
        height: 5rem;
        top:-100;
        // transform: translate3d(0%,0%,0);
    }
}
.legal-fixed{
    position: fixed;
    top: 2rem;
    width: 100%;
    z-index: 10;
    background:rgba(242, 242, 242,1);
    animation: fiexLegal .5s;
    // background: #4c6085;
    background:#f3f4f7;
    box-shadow: 0 1px 11px #3e3e3e2e;
    .nav-bar-img{
        
    }
    .nav-bar-img-d{
        display: inline-block;
        width: 9.15rem /* 163/20 */;
        width: 10rem /* 163/20 */;
        height: 2rem /* 50/20 */;
        // background: url('../assets/images/nav-bar/nav-logo-w.png') no-repeat center center!important;
        background: url('../assets/images/nav-bar/nav-logo-n@2x.png') no-repeat center center;
        background-size: cover;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .item{
        height: 5rem;
        // color: white!important;
        color:#666666;
        span.nav-active{
            color:rgba(255,255,255,1);
            background:rgba(76,96,133,1);
            // border-bottom: 1px solid #4c6085;
            transform: translateY(-1px);
            animation: fiexLegal .5s;
        }
        span:hover{
            background: #6681b2;
            color:rgba(255,255,255,1);
        }
    }
}
.legal{
    position: absolute;
    top: 2rem;
    width: 100%;
    z-index: 10;
    animation: topLegal .8s;
    span.nav-active{
        color:rgba(255,255,255,1);
        background:rgba(76,96,133,1);
        animation: topLegal .8s;
    }
    
}
.legal-currency{
    background:rgba(255,255,255,.8);
}
.legal-currency-order{
    background:rgba(255,255,255,1);
    .nav-bar-box{
        .item{
            height: 5rem;
            color:rgba(102,102,102,1);
            span{
                display: inline-block;
                height: 5rem;
                line-height: 5rem;
                font-size: 1rem /* 20/20 */;
                width: 7.5rem /* 150/20 */;
                cursor: pointer;
                text-align: center;
            }
            span.nav-active{
                color:rgba(255,255,255,1);
                background:rgba(76,96,133,1);
            }
        }
    }
}
</style>
