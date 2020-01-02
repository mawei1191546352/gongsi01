<template>
    <div id="third-three">
        <img src="../../assets/images/third/2019-12-18/ok2.png" alt="">
        <h3>{{languageType0[$parent.swA].page3h}}</h3>
        <h4>{{languageType0[$parent.swA].page3h2}}</h4>
        <h4>{{languageType0[$parent.swA].page3h3}}<span>{{languageType0[$parent.swA].page3h32}}</span></h4>
        <p><span>5s</span> {{languageType0[$parent.swA].page3p1}} </p>
        <button>{{languageType0[$parent.swA].page3back}}</button>
    </div>
</template>
<script>
import Base64 from './base64'
import {
    languageType0,
    languageType1
} from '../../locales/languages'
export default {
    data() {
        return {
            data: null,
            languageType0: languageType0,
            languageType1: languageType1,
        }
    },
    mounted() {
        this.$parent.nav = 2;
        try {
            this.data = JSON.parse(Base64.decode(this.$route.query.key))
        } catch(e) {
            console.log(e)
            this.$message({
                message: this.$parent.swA=='ch'?'你的url参数有误，请回到之前页面 重新选择：':'你的url参数有误，请回到之前页面 重新选择：',
                type: 'error',
                center:true,
                duration:1200,
            });
        }
        setTimeout(()=>{
            window.location = this.data.redirectUrl
        },5000)
    },
}
</script>
<style lang="scss" scoped>
#third-three {
    width:1100px;
    height:500px;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 10px rgba(92,137,204,0.1);
    opacity:1;
    border-radius:5px;
    margin: 50px 0px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
        width: 80px;
        height: 80px;
    }
    h3 {
        font-size:30px;
        font-weight:bold;
        line-height:30px;
        color:rgba(34,34,34,1);
        margin: 20px 0px;
    }
    h4 {
        font-size:22px;
        font-weight:400;
        line-height:30px;
        color:rgba(51,51,51,1);
        margin: 4px 0px;
        span {
            color: #FE5B5B;
        }
    }
    p {
        font-size:16px;
        font-weight:400;
        line-height:22px;
        color:rgba(102,102,102,1);
        margin-top: 20px;
        margin-bottom: 37px;
        span {
            color: #5C89CC;
        }
    }
    button {
        width:200px;
        height:50px;
        background:rgba(92,137,204,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.5);
        opacity:1;
        border-radius:3px;
        border: 0px;
        font-size:16px;
        font-weight:400;
        line-height:22px;
        color:rgba(242,242,242,1);
    }
}
</style>