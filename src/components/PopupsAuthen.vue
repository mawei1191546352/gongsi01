<template>
    <div class="pop-ups" v-show="box_info">
        <div class="box_info_center box_info_open" ref="box_info" v-show="box_info" :class="box_info_height">
            <i class="el-icon-close close" @click="close_box_info" ></i>
            <div class="outer" style="height:3rem;line-height:3rem;" 
            v-show="user_info.identityAuthStatus!='2' && childProp!='pass' && childProp!='huazhuan' && childProp!='adtop' && childProp!='adtop_gift' && childProp!='adtable_gift'">
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_id_ver')}}</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goAuthen">{{$t('info_item.verification')}}</span>
            </div>
            <div class="outer" style="height:3rem;line-height:3rem;" 
            v-show="childProp?(childProp=='liangxiang' && childProp!='adtop' && num<2?true:false):false">
            <!-- v-show="childProp?(childProp=='liangxiang' && childProp!='adtop'?true:false):false"> -->
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_auth')}}({{num}}/3)</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goAuthen">{{$t('info_item.bind')}}</span>
            </div>
            <div class="outer" style="height:3rem;line-height:3rem;" v-show="
            (user_info.ifPayPassword=='0' && childProp!='adtable' && childProp!='adtable_gift')
            
            ">
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_fund_pass')}}</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goSalary">{{$t('info_item.set')}}</span>
            </div>
            <div class="outer" style="height:3rem;line-height:3rem;" 
            v-show="(childProp=='adtop' || childProp=='adtop_gift') && childProp!='adtop_gift'">
                <span > <i class="el-icon-warning"></i> {{$t('info_item.first_pay')}}</span> <span style="float:right;color:#5C9ACC;cursor: pointer;" @click="goPayway">{{$t('info_item.set')}}</span>
            </div>
        </div>
        <div class="shandow" v-show="box_info"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            identify_staus:false,
            box_info:false,
            box_info_height:'',
            num:0,
        }
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        }
    },
    watch:{
        box_info(n,o){
            if(!n){
                this.$parent.hackReset=false;
            }else{
                this.initBox()
            }
        }
    },
    mounted(){
        this.initBox()
        console.log(this.childProp)
    },
    props:['childProp'],
    methods:{
        close_box_info() {
            this.$refs.box_info.classList.remove('box_info_open')
            this.$refs.box_info.classList.add('box_info_close')
            let t = setTimeout(()=>{
                this.$refs.box_info.classList.add('box_info_open')
                this.box_info = false;
                clearTimeout(t)
            },800)
            
        },
        goAuthen() {
            this.box_info = false;
            this.authentication_verification_fun()

        },
        authentication_verification_fun(){
            this.go_identify_company()
            // if(this.user_info.identityAuthStatus=='2'){
            //     this.go_identify_company()
            // }else{
            //     this.identify_staus = true;
            // }
        },
        go_identify_company() {
            // this.$router.push('/agency-certification')
            this.identify_staus = false;
            this.$router.push('/personal')
            this.$store.commit('_set_nav_item','0')
        },
        goSalary() {
            // this.$router.push('/home/center/file')
            this.box_info = false;
            this.$router.push({name:'PayPass'})
        },
        goPayway(){
            this.box_info = false;
            this.$router.push('/personal')
            this.$store.commit('_set_nav_item','0')
        },
        initBox(){
            this.num=0;
            // console.log('this.googleAccount:',this.googleAccount)
            if(this.user_info.email!=null){
                this.num++
            }
            if(this.user_info.phone!=null){
                this.num++
            }
            if(this.user_info.googleAuthTag=='1'){
                this.num++
            }
            let k=0 ;
            if(this.user_info.identityAuthStatus !='2' && this.childProp != 'adtable_gift' && this.childProp != 'adtop_gift') {
                k+=1
            }
            // if(this.checkAddMethod) {// 是不是添加付款方式
            //     if(this.num<2) {
            //         this.box_info = true;
            //         // k+=1;
            //     }else{
            //         this.box_info = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
            //     }
            // }else{
            //     this.box_info = !(this.user_info.identityAuthStatus=='2' && this.user_info.ifPayPassword =='1')
            // }
            if(this.user_info.ifPayPassword !='1' && this.childProp !='adtable' && this.childProp !='adtable_gift') {
                k+=1
            }
            
            if(this.childProp=='pass'){
                this.box_info = !(this.user_info.identityAuthStatus=='2')
            }else if(this.childProp == 'liangxiang'){
                if(this.num>=2){
                    this.box_info = false;
                }else{
                    this.box_info = true
                    k+=1
                }
                // if(this.user_info.ifPayPassword =='0'){
                //     k+=1
                // }
            }else if( this.childProp == 'adtop'){
                this.num = 1;
                // k=1
                console.log(k,'ooooooooooooo')
                k = k+1
                this.box_info = true;
                
            }else if(this.childProp == 'huazhuan') {
                this.num = 1;
                if(this.user_info.ifPayPassword !='1') {
                    k=1
                    this.box_info = true;
                }
            }else if(this.childProp == 'adtable'){
                if(this.num<2) {
                    // k+=1;
                }
                // if(this.user_info.identityAuthStatus=='2'){
                //     this.box_info = false;
                //     return false
                // }
            }else if(this.childProp == 'no') {
                console.log('sdfgdfgd')
                this.box_info = false;
            }
            console.log(k,'具体是几个','m:',this.num,'childProp:',this.childProp)
            // if(k==0 && this.num==1 && this.childProp=='adtop_gift') {
            //     k =1
            // }
            if(k==1) {
                this.box_info_height = 'box_height1'
                this.box_info = true;
            }else if(k ==2 ){
                this.box_info_height = 'box_height2'
                this.box_info = true;
            }else if (k==3) {
                this.box_info_height = 'box_height3'
                this.box_info = true;
            }else if (k ==0 ){
                this.box_info  =false;
            }
            if(this.childProp == 'no') {
                console.log('sdfgdfgd')
                this.box_info = false;
            }
        },
    }
}
</script>

<style lang="scss">
.pop-ups{
    .box_info_center{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width:24rem /* 480/20 */;
        height:10rem /* 200/20 */;
        background:rgba(255,255,255,1);
        border-radius:.25rem /* 5/20 */;
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);
        box-sizing: border-box;
        padding: 1.5rem /* 30/20 */ 1.5rem /* 30/20 */;
        padding-top: 1rem /* 20/20 */;
        text-align: left;
        font-size:.7rem /* 14/20 */;
        font-family:'PingFang-SC-Regular';
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:1.5rem /* 30/20 */;
        transition: box-shadow 0.4s ease-in-out;
        z-index: 1000;
        .close{
            position: absolute;
            top: .25rem /* 5/20 */;
            right: .4rem /* 8/20 */;
            cursor: pointer;
            color:black;
            
        }
        i{
            color: red;
        }
    }
    .box_info_center:hover{
        transform: 8s;
        box-shadow:0rem /* 0/20 */ .5rem /* 0/20 */ 1.5rem /* 13/20 */ rgba(153,153,153,1);
    }
    @keyframes rightIn {
        from {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
        to {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
    }
    @keyframes rightOut {
        from {
            opacity: 1;
            background: white;
            transform: translate3d(-50%,-50%,0);
        }
        to {
            opacity: 0;
            background: red;
            transform: translate3d(-50%,-500%,0);
        }
    }
    .box_info_close{
        animation: rightOut 1s;
    }
    .box_info_open{
        animation: rightIn 1s;
    }
    // 
    .shandow{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0, 0,0, 0.4);
        z-index: 200;
    }
}
.box_height1{
    height:5rem!important /* 200/20 */;
}
.box_height2{
    height: 8rem!important;
}
.box_height3{
    height:10rem!important /* 200/20 */;
}
</style>
