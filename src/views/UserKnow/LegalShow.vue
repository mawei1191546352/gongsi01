<template>
    <div class="legal_show">
        <div class="main">
            <header>法律声明</header>
             <div class="one">
                 <h3>第一条</h3>
                 <p>
                     本网站的宗旨是在不违反新加坡共和国相关法律法规的前提下，尽可能地为全球广大数字资产爱好者及投资者提供专业的国际化水准的交易平台和金融产品。禁止使用本网站从事洗钱、走私、商业贿赂等一切非法交易活动，若发现此类事件，本站将冻结账户，立即报送有权机关。
                 </p>
             </div>
            <div class="one">
                 <h3>第二条</h3>
                 <p>
                     当有权机关出示相应的调查文件要求本站配合对指定用户进行调查时，或对用户账户采取查封、冻结或者划转等措施时，本站将按照有权机关的要求协助提供相应的用户数据，或进行相应的操作。因此而造成的用户隐私泄露、账户不能操作及因此给所造成的损失等，本站不承担任何责任。
                 </p>
             </div>
             <div class="one">
                 <h3>第三条</h3>
                 <p>
                     本网站使用者因为违反本声明的规定而触犯新加坡共和国相关法律的，本站作为服务的提供方，有义务对平台的规则及服务进行完善，但本站并无触犯新加坡共和国相关法律的动机和事实，对使用者的行为不承担任何连带责任。
                 </p>
             </div>
             <div class="one">
                 <h3>第四条</h3>
                 <p>
                     凡以任何方式登录本网站或直接、间接使用本网站服务者，视为自愿接受本网站声明的约束。
                 </p>
             </div>
             <div class="one">
                 <h3>第五条</h3>
                 <p>
                     本声明未涉及的问题参见新加坡共和国有关法律法规，当本声明与新加坡共和国相关法律法规冲突时，以新加坡共和国相关法律法规为准。
                 </p>
             </div>
             <div class="one_hei">
                 
             </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang='scss'>
.legal_show{
    background: white;
    .main{
        max-width: 60rem;
        background: #edeef0;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 2rem;
        padding: 2rem 1rem;
        header{
            font-size: 1.3rem;
            font-weight: 800;
            line-height: 2.5rem /* 50/20 */;
            text-align: center;
        }
        h3{
            text-align: left;
            font-size: 1rem;
            font-weight: bold;
            // text-indent: 2rem;
            line-height: 2rem /* 40/20 */;
        }
        p{
            text-align: left;
            text-indent: 2em;
            line-height: 1.5rem /* 30/20 */;
            font-size: .85rem /* 17/20 */;
        }
        .psan{
            line-height: 1.5rem /* 30/20 */;
            font-size: .85rem /* 17/20 */;
            text-indent: 4em;
            text-align: left;
        }
        .psan2{
            line-height: 1.5rem /* 30/20 */;
            font-size: .85rem /* 17/20 */;
            text-indent: 6em;
            text-align: left;
        }
        .one_hei{
            height:13rem /* 260/20 */;
        }
        .one{
            margin: 1rem 0;
        }
    }
}
</style>
