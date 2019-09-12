<template>
    <div class="agency-certification">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="agency-box">
            <div class="identify_company_box">
                <div class="identify_company_nav">
                    <span @click="go_file_center">个人信息</span><i class="el-icon-arrow-right"></i><span>身份认证</span>
                </div>
                <div class="identify_company_body">
                    <div class="download_application_form"><a class="" :href="application" download="机构账户申请表.docx">下载机构账户申请表<i></i></a> </div>
                    <p>填写相关信息并上传机构资质文件，审核结果将在3-5个工作日内以邮件的形式给予反馈。</p>
                    <h3>认证机构所需材料：</h3>
                    <ul class="ul_form">
                        <li>1.公司名称&公司国籍</li>
                        <li>2.被授权人姓名</li>
                        <li>3.被授权人联系方式</li>
                        <li>4.UID</li>
                        <li>5.董事、股东以及最终受益人身份证件</li>
                        <li>6.被授权开户、操作人的身份证件</li>
                        <li>7.公司营业执照或其他官方的公司注册证明</li>
                        <li>8.ICP备案截图</li>
                        <li>9.董事会决议（公司注册地在中国大陆地区的客户可不填；其他地区客户必填）</li>
                        <li>10.承诺书</li>
                        <li>11.授权委托书</li>
                    </ul>
                    <p style="margin-top:2rem;">请将机构账户申请表填写完成后与认证机构所需材料发送至邮箱：support@royalbiz.co。请勿重复发送，感谢理解与配合！</p>
                    <p style="margin-top:2rem;">我们收到您的申请邮件后会尽快进行处理，请不要把您的资料泄露给除本平台以外的任何地方，泄露后所导致的问
    题我们将不负任何责任。所有条款Royalbiz平台享有最终解释权。</p>

                    <p style="margin-top:2rem;color:#5C9ACC;">申请表所涉及的文件样式可通过以下附件进行下载</p>
                    <a class="a_set" :href="promise" download="承诺书.docx">承诺书-commitment letter <span>点击下载</span> </a>
                    <a class="a_set" :href="shouquan" download="授权委托书.docx">授权委托书-Power of Attorney <span>点击下载</span> </a>
                    <a class="a_set" :href="dongshi" download="董事会决议.doc">董事会决议-Board Resolution <span>点击下载</span> </a>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
export default {
    components:{
        'top-nav':TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'',
            promise:require("../../assets/company_certification/承诺书-commitment letter.docx"),
            shouquan:require('../../assets/company_certification/授权委托书-Power of Attorney.docx'),
            dongshi:require('../../assets/company_certification/董事会决议-Board Resolution.doc'),
            application:require('../../assets/company_certification/机构认证申请表.docx')
        }
    },
    computed:{
        lang() {
            return this.$i18n.locale;
        }
    },
    methods:{
        go_file_center() {
            this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
        }
    }
}
</script>

<style lang="scss">
.agency-certification{
    .agency-box{
        height: 50.7rem /* 1014/20 */;
        height: 64.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .identify_company_box{
            width: 60rem /* 800/20 */;
            // height: 44rem /* 880/20 */;
            // height: 40rem /* 800/20 */;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            padding: .75rem /* 15/20 */  2.5rem /* 50/20 */;
            font-size:.7rem /* 14/20 */;
            box-sizing: border-box;
            margin-top: 7.05rem /* 141/20 */;
            color:rgba(102,102,102,1);
        }
        @media screen and(max-width: 480px) {
            .identify_company_box{
                width:100%;
                .a_set{
                    width: 19rem!important;
                }
            }
            .identify_company_body{
                .download_application_form{
                     a{
                         i::after{
                            content: '';
                            width: 1rem!important;
                            height: 1rem!important;
                            position: absolute;
                            top: 50%;
                            left: 85%!important;
                            right: -1rem;
                            transform: translateX(-50%) translateY(-50%);
                            background: url('../../assets/images/agency/download@2x.png') no-repeat center center;
                            z-index: 1;
                         }
                     }
                }
            }
        }
        .identify_company_nav{
            text-align: left;
            font-size:.8rem /* 16/20 */;
            font-weight:400;
            color:rgba(51,51,51,1);
            span{
                cursor: pointer;
            }
            padding-bottom: .5rem /* 10/20 */;
            border-bottom: .05rem /* 1/20 */ solid rgba(204,204,204,1);
        }
        .identify_company_body{
            .download_application_form{
                margin-top: 1rem /* 20/20 */;
                margin-bottom: .5rem /* 20/20 */;
                width:11rem /* 220/20 */;
                height:2.1rem /* 42/20 */;
                background:#4c6085;
                border-radius:.15rem /* 3/20 */;
                line-height: 2.1rem /* 42/20 */;
                font-size: .8rem /* 16/20 */;
                color:rgba(255,255,255,1);
                cursor: pointer;
                text-align: left;
                position: relative;
                a{
                    position: absolute;
                    z-index: 100;
                    left: 11%;
                    color: white;
                    text-decoration: none;
                    width:11rem /* 220/20 */;
                    height:2.1rem /* 42/20 */;
                    i::after{
                        content: '';
                        width: 2rem /* 20/20 */;
                        height: 2rem /* 20/20 */;
                        position:absolute;
                        top: 50%;
                        left: 73%;
                        right: -1rem;
                        transform: translateX(-50%) translateY(-50%);
                        background: url('../../assets/images/agency/download@2x.png') no-repeat center center;
                        z-index: 1;
                    }
                }
            }
            // .download_application_form::after{
            //     content: '';
            //     width: 2rem /* 20/20 */;
            //     height: 2rem /* 20/20 */;
            //     position:absolute;
            //     top: 50%;
            //     right: -1rem;
            //     transform: translateX(-50%) translateY(-50%);
            //     background: url('../../assets/images/agency/download@2x.png') no-repeat center center;
            //     z-index: 1;
            // }
            p{
                text-align: left;
                font-size: .7rem /* 14/20 */;
                line-height: 1.5rem /* 30/20 */;
            }
            h3{
                font-size: .7rem /* 14/20 */;
                line-height: 1.5rem /* 30/20 */;
                font-family:'PingFang-SC-Regular';
                font-weight:450;
                color:#333333;
                text-align: left;
            }
            .ul_form{
                width:35rem /* 700/20 */;
                height:22rem /* 440/20 */;
                border:.05rem /* 1/20 */ solid rgba(230,230,230,1);
                margin-top: 1rem /* 20/20 */;
                li{
                    height:2rem /* 40/20 */;
                    text-align: left;
                    box-sizing: border-box;
                    padding-left: .75rem /* 15/20 */;
                    line-height: 2rem /* 40/20 */;
                    letter-spacing:.05rem /* 1/20 */;
                }
                li:nth-child(even){
                    background:rgba(230,230,230,1);
                }
            }
            .a_set{
                outline: none;
                text-decoration:none;
                display: block;
                width:15rem /* 300/20 */;
                height:1rem;
                font-size:.7rem /* 14/20 */;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:14px;
                text-align: left;
                margin-top: .75rem /* 15/20 */;
                margin-bottom: .75rem /* 15/20 */;
                position: relative;
                padding-left: 1.25rem /* 25/20 */;
            }
            .a_set::before{
                content: '';
                display: block;
                width: .8rem;
                height: .8rem;
                left: 0;
                top: -.1rem /* 2/20 */;
                position: absolute;
                background: url('../../assets/images/agency/file.png');
                background-size: cover;
            }
        }
    }
}
</style>
