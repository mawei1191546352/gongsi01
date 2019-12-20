<template>
    <div id="third-three">
        <img src="../../assets/images/third/2019-12-18/ok2.png" alt="">
        <h3>提交成功</h3>
        <h4>购买成功后，数字货币将全额充值到您要付款的商户，完成付款</h4>
        <h4>订单已开始处理，预计到账时间：<span>15分钟</span></h4>
        <p><span>5s</span> 后将自动跳转至商户平台，如果没有跳转，请手动点击返回商户平台按钮 </p>
        <button>返回商户平台</button>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$parent.nav = 2;
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