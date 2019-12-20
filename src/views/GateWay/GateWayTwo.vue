<template>
    <div class="gate-way-two">
        <div class="gate-two-header">
            <img src="../../assets/images/third/2019-12-18/ok2.png" alt="">
            <h3>订单已成功提交</h3>
        </div>
        <div class="gate-way-content">
            <div class="gate-box">
                <p>待付款数量（USDT）</p>
                <h3>2000220.03514548</h3>
            </div>
            <div class="gate-content-bottom">
                <div class="content-left">
                    <label>USDT充值地址</label>
                    <div class="om-erc">
                        <button :class="usdtType=='OMNI'?'active':'no'" @click="usdtType='OMNI'">OMNI</button>
                        <button :class="usdtType=='ERC20'?'active':'no'" @click="usdtType='ERC20'">ERC20</button>
                    </div>
                </div>
                <div class="content-right">
                    <p class="address">
                        0xa30000a5ee04a7c1cf545c661dba1e74b63bb508
                    </p>
                    <!-- <button>复制</button>
                    <p class="qr" @mouseenter="qr=true" @mouseleave="qr=false">
                        二维码
                    </p>
                    <div class="qrcode" v-show="qr"></div> -->
                </div>
            </div>
        </div>
        <div class="gate-two-search">
            <div class="search-left">
                <img src="../../assets/images/third/2019-12-18/point.png" alt="">
                <h3>订单状态</h3>
                <button>确认中</button>
            </div>
            <div class="search-right">
                <button>查询状态</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            usdtType: "OMNI",
        }
    },
    created() {
        this.$parent.nav = 1;
    },
}
</script>
<style lang="scss" scoped>
.gate-way-two {
    .gate-two-header {
        margin-top: 40px;
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;
        padding: 0px 40px;
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
        }
        h3 {
            font-size:30px;
            font-weight:bold;
            line-height:20px;
            color:rgba(34,34,34,1);
        }
    }
    .gate-way-content {
        height:270px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        margin-top: 40px;
        box-sizing: border-box;
        padding: 0px 40px;
        .gate-content-header {
            height: 71px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(230,230,230,1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            label {
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(102,102,102,1);
            }
            div.check {
                input[type=checkbox] {
                    width: 20px;
                    height: 20px;
                    border-radius: 2px!important;
                }
                input[type="checkbox"]{
                    display:none;
                }
                label {
                    cursor: pointer;
                    pointer-events: none;
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(34,34,34,1);
                }
                input[type="checkbox"] + label:before {
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border:1px solid;
                    border-radius: 3px;
                    vertical-align: middle;
                    margin-right: 5px;
                    transition: all .5s;
                }

                input[type="checkbox"]:checked + label:before {
                    content: '\2713';
                    color: white;
                    text-align: center;
                    background: #5C89CC;
                }
            }
        }
        .gate-box {
            height: calc(330px - 141px);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(102,102,102,1);
            }
            h3 {
                font-size:36px;
                font-weight:800;
                line-height:50px;
                color:rgba(92,137,204,1);
            }
        }
        .gate-content-bottom {
            height: 70px;
            box-sizing: border-box;
            border-top: 1px solid rgba(230,230,230,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content-left {
                display: flex;
                align-items: center;
                label {
                    font-size:16px;
                    font-weight:400;
                    line-height:22px;
                    color:rgba(102,102,102,1);
                }
                .om-erc {
                    width:160px;
                    height:40px;
                    background:rgba(242,242,242,1);
                    opacity:1;
                    border-radius:3px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 0px 5px;
                    button {
                        border: 0px;
                        font-size:16px;
                        font-weight:400;
                        line-height:22px;
                        color:rgba(153,153,153,1);
                        &.active {
                            width:70px;
                            height:30px;
                            background:rgba(92,137,204,1);
                            box-shadow:0px 3px 6px rgba(92,137,204,0.5);
                            opacity:1;
                            border-radius:3px;
                            font-size:16px;
                            font-weight:400;
                            line-height:22px;
                            color:rgba(255,255,255,1);
                        }

                    }
                }
            }
            .content-right {
                display: flex;
                font-size:16px;
                font-weight:400;
                line-height:22px;
                color:rgba(92,137,204,1);
                align-items: center;
                position: relative;
                .qrcode {
                    position: absolute;
                    width: 160px;
                    height: 160px;
                    box-sizing: border-box;
                    padding: 10px;
                    background: white;
                    right: 0px;
                    bottom: 50px;
                    border-radius: 5px;
                    filter: drop-shadow(2px 2px 20px rgba(55,135,254,0.2));
                    &::after {
                        content: '';
                        position: absolute;
                        width: 0;
                        right: 10%;
                        // transform: translateX(-50%);
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 8px solid white;
                        bottom: -8px;
                        border-radius: 1px;
                    }
                }
                p {
                    &.address {
                        font-size:20px;
                        font-weight:400;
                        line-height:28px;
                        color:rgba(34,34,34,1);
                    }
                    .qr {
                        color: #5C89CC;
                    }
                }
                button {
                    margin: 0px 5px;
                    width:50px;
                    height:30px;
                    background:rgba(224,232,246,1);
                    box-shadow:0px 5px 6px rgba(92,137,204,0.1);
                    color: #5C89CC;
                    opacity:1;
                    border-radius:5px;
                    border: 0px;
                }

            }
        }
    }
    .gate-two-search {
        margin-top: 40px;
        height:120px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 10px rgba(92,137,204,0.1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;
        padding: 0px 40px 0px 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-left {
            display: flex;
            align-items: center;
            img {
                width: 25px;
                height: 25px;
                margin-right: 10px;
            }
            h3 {
                font-size:20px;
                font-weight:bold;
                line-height:28px;
                color:rgba(51,51,51,1);
                letter-spacing:  0px;
            }
            button {
                width:150px;
                height:50px;
                border-radius:3px;
                border: 0px;
                color: #FFFFFF;
                margin-left: 20px;
                background:rgba(254,204,118,1);
                &.wating {
                    background:rgba(254,204,118,1);
                    opacity:1;
                }
                &.done {
                    background:rgba(82,196,149,1);
                }
            }
        }
        .search-right {
            button {
                border: 0px;
                background: none;
                font-size:20px;
                font-weight:bold;
                line-height:28px;
                color:rgba(92,137,204,1);
                text-decoration:underline;
            }
        }
    }
}
</style>