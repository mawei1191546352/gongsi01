<template>
    <div class="payment-detail">
        <top-nav></top-nav>
        <div class="payment-box">
            <div class="payment-de-top">
                <div class="payment-top-video">
                    <div class="top-video-left">
                        <div class="v-left-top">
                            <h3 :class="lang">{{$t('video.title')}}</h3>
                            <p :class="lang">{{$t('video.all_p')}}</p>
                        </div>
                        <div class="v-button" :class="lang">
                            <p :class="videoActive==0?'active':''" @click="videoActive=0">{{$t('video.cny')}}</p>
                            <p :class="videoActive==1?'active':''" @click="videoActive=1">{{$t('video.usdt')}}</p>
                        </div>
                    </div>
                    <div class="video">
                        <video id="video" :src="videoSrc" preload="auto" class="" controls webkit-playsinline style="object-fit:fill;">
                            <p>您的设备不支持 H5 播放器</p>
                        </video>
                        <!-- <div class="controls">
                            <div>
                                <div class="progressBar">
                                    <div class="timeBar"></div>
                                </div>
                            </div>
                            <div><span class="current">00:00</span>/<span class="duration">00:00</span></div>
                            <div><span class="fill">全屏</span></div>
                        </div> -->
                    </div>
                </div>
                <div class="payment-top-merchant">
                    <div class="merchant-left">
                        <img src="../../assets/images/logopage/payment-detail/ruzhu.png" alt="">
                        <h3>{{$t('video.merchant')}}</h3>
                    </div>
                    <div class="merchant-right">
                        <p>{{$t('video.m_p')}}</p>
                        <span @click="open" :class="lang">{{$t('video.go')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-bottom">
            <h3>{{$t('video.item2_title')}}</h3>
            <p class="borderp"></p>
            <div class="bao-box">
                <div class="bao-box-one" :class="baoActive==0?'bao-active':''" @mouseenter="baoActive=0">
                    <img 
                    :src="baoActive==0?peifu:peifu_un" alt="">
                    <h3 :class="lang">{{$t('video.item2_it1_h')}}</h3>
                    <p>{{$t('video.item2_it1_p')}}</p>
                </div>
                <div class="bao-box-one" :class="baoActive==1?'bao-active':''" @mouseenter="baoActive=1">
                    <img 
                    :src="baoActive==1?qianbao:qianbao_un" alt="">
                    <h3 :class="lang">{{$t('video.item2_it2_h')}}</h3>
                    <p>{{$t('video.item2_it2_p')}}</p>
                </div>
                <div class="bao-box-one" :class="baoActive==2?'bao-active':''" @mouseenter="baoActive=2">
                    <img 
                    :src="baoActive==2?suo:suo_un" alt="">
                    <h3 :class="lang">{{$t('video.item2_it3_h')}}</h3>
                    <p>{{$t('video.item2_it3_p')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
export default {
    components:{
        'top-nav': TopNav,
    },
    data() {
        return {
            baoActive:0,
            peifu:require('../../assets/images/logopage/payment-detail/peifu.png'),
            peifu_un:require('../../assets/images/logopage/payment-detail/peifu-un.png'),
            qianbao:require('../../assets/images/logopage/payment-detail/qianbao.png'),
            qianbao_un:require('../../assets/images/logopage/payment-detail/qianbao-un.png'),
            suo:require('../../assets/images/logopage/payment-detail/suo.png'),
            suo_un:require('../../assets/images/logopage/payment-detail/suo-un.png'),
            videoActive:0,
            cnyVideo: require('../../assets/video/cny.mp4'),
            usdtVideo: require('../../assets/video/usdt.mp4'),
            // cnyVideo: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            videoSrc:null,
            media:null,
        }
    },
    computed:{
        lang() {
             return this.$i18n.locale
        }
    },
    watch: {
        videoActive(n, o) {
            // this.cnyVideo = null;
            // this.media.removeAttribute("src");
            console.log(this.media,this.media.src)
            if(n ==1) {
                // this.media.removeAttribute("src");
                this.media.preload = this.usdtVideo
                this.videoSrc = this.usdtVideo
            }else {
                this.media.preload = this.cnyVideo
                this.videoSrc = this.cnyVideo
            }
        }
    },
    created() {
        this.videoSrc = this.cnyVideo
    },
    mounted() {
        this.media = document.getElementById('video');
        window.scrollTo(0, 0)

    },
    methods:{
        open(){
            if(this.lang=='en') {
                window.open('http://doc.royalbiz.co/docs/docs/docs-1-1')
                // window.open('http://doc.royalbiz.co/docs/docsdocs-1bglfibdopqha/docs-1-1')
            }else{
                window.open('http://doc.royalbiz.co/docs/a1/a1-1')
                // window.open('http://doc.royalbiz.co/docs/a1a1-1bfl89mvqg72h/a1-1')
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.payment-detail{
    .payment-box{
        height:100vh;
        background:#4773A5;
        background-image: url('../../assets/images/logopage/payment-detail/bg.jpg');
        background-size: cover;
        .payment-de-top{
            width:60rem /* 1200/20 */;
            margin: 0 auto;
            box-sizing: border-box;
            padding-top: 6rem;
            .payment-top-video{
                width:60rem /* 1200/20 */;
                height:29.5rem /* 590/20 */;
                background:rgba(0,0,0,.6);
                box-sizing: border-box;
                padding: 2.35rem /* 47/20 */ 1.75rem /* 35/20 */ 2.4rem /* 48/20 */ 1.75rem /* 35/20 */;
                display: flex;
                justify-content: space-between;
                .top-video-left{
                    width: 10.75rem /* 215/20 */;
                    .v-left-top{
                        h3{
                            font-size:1.5rem /* 30/20 */;
                            font-weight:800;
                            line-height:3rem /* 60/20 */;
                            color:rgb(255,255,255);
                            text-shadow:0px 0px 10px rgba(43,43,100,0.50);
                        }
                        h3.en{
                            font-size: 1.3rem;
                        }
                        p{
                            font-size:.8rem /* 16/20 */;
                            font-weight:400;
                            line-height:1.6rem /* 32/20 */;
                            color:rgba(230,230,230,1);
                            text-shadow:0px 0px 10px rgba(43,43,100,0.50);
                        }
                        p.en{
                            line-height: 1.4rem;
                        }
                    }
                    .v-button{
                        margin-top: 5.5rem /* 100/20 */;
                        p{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width:10.75rem /* 215/20 */;
                            height:3rem /* 60/20 */;
                            border:3px solid rgba(255,255,255,1);
                            margin-top: .6rem /* 12/20 */;
                            font-size:1rem /* 20/20 */;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            box-sizing: border-box;
                            transition: all .5s ease-in-out;
                            cursor: pointer;
                            position: relative;
                        }
                        p::after{
                            content: '';
                            position: absolute;
                            right: -14px;
                            border-top: 14px solid transparent;
                            border-left: 14px solid rgba(92,137,204,0);
                            border-bottom: 14px solid transparent;
                            transition: border .5s ease-in-out;
                            transition: all .6s ease-in-out;
                        }
                        p.active{
                            border:3px solid rgba(92,137,204,1);
                            background: rgba(92,137,204,1);
                            position: relative;
                            
                        }
                        p.active::after{
                            content: '';
                            position: absolute;
                            right: -14px;
                            border-top: 14px solid transparent;
                            border-left: 14px solid rgba(92,137,204,1);
                            border-bottom: 14px solid transparent;
                        }
                    }
                    .v-button.en{
                        margin-top: 4rem;
                    }
                }
                .video{
                    // flex: 1;
                    width:44rem /* 880/20 */;
                    height:24.75rem /* 495/20 */;
                    background:rgba(6,6,6,1);
                    video{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .payment-top-merchant{
                margin-top: 1.75rem /* 35/20 */;
                height: 6rem /* 120/20 */;
                display: flex;
                justify-content: space-between;
                .merchant-left{
                    width:12.5rem /* 250/20 */;
                    background:rgba(0,0,0,.3);
                    box-sizing: border-box;
                    padding-left: 1.75rem /* 35/20 */;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 2.5rem /* 50/20 */;
                        height: 2.5rem /* 50/20 */;
                        margin-right: 1rem;
                    }
                    h3{
                        font-size:24px;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                    }
                }
                .merchant-right{
                    flex: 1;
                    background:rgba(0,0,0,.6);
                    box-sizing: border-box;
                    padding-right: 1.75rem /* 35/20 */;
                    padding-left: 1.75rem /* 35/20 */;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        font-size:18px;
                        font-weight:400;
                        color:rgba(230,230,230,1);
                    }
                    span{
                        width:6rem /* 120/20 */;
                        height:3rem /* 60/20 */;
                        // background:rgba(34,156,137,.8);
                        border: .1rem /* 2/20 */ solid rgba(34,156,137,1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size:1rem /* 20/20 */;
                        font-weight:400;
                        color:rgba(34,156,137,1);
                        cursor: pointer;
                        transition: all .5s ease-in-out;
                        text-align: center;
                    }
                    span.en{
                        font-size: .8rem;
                    }
                    span:hover{
                        background:rgba(34,156,137,1);
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
    }
    .payment-bottom{
        height: 28.85rem /* 577/20 */;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding-top: 2.5rem /* 50/20 */;
        h3{
            font-size:1.5rem /* 30/20 */;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        p.borderp{
            width:3rem /* 60/20 */;
            height:.25rem /* 5/20 */;
            background:rgba(76,96,133,1);
            opacity:1;
            margin-top: 1.5rem;
            margin-bottom: 2rem;
        }
        .bao-box{
            display: flex;
            justify-content: space-between;
            width: 60rem;
            .bao-box-one{
                width:16.25rem /* 325/20 */;
                height:16.25rem /* 325/20 */;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 10px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 1.5rem /* 30/20 */ 1.75rem /* 35/20 */ 2.4rem /* 48/20 */ 1.75rem /* 35/20 */;
                cursor: pointer;
                transition: all .2s ease-in-out;
                img{
                    width: 4rem /* 80/20 */;
                    height: 4rem /* 80/20 */;
                }
                h3{
                    font-size:1.2rem /* 24/20 */;
                    font-weight:bold;
                    line-height:3rem /* 60/20 */;
                    color:rgba(51,51,51,1);
                    text-align: center;
                }
                h3.en{
                    font-size: .8rem;
                }
                p{
                    font-size:.8rem /* 16/20 */;
                    font-weight:400;
                    line-height:1.5rem /* 30/20 */;
                    color:rgba(153,153,153,1);
                    text-align: center;
                }
            }
            .bao-box-one:hover{
                border:3px solid rgba(92,137,204,1);
                box-shadow:0px 0px 10px rgba(0,0,0,0.2);
                margin-top: -.5rem;
            }
        }
    }
}
</style>
