<template>
    <div class="identity-authentication">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="identity-authentication-box">
            <div class="file_authentication_box">
                <div class="file_authentication_nav">
                    <span @click="go_file_center">{{$t('id_auth.nav_account')}}</span><i class="el-icon-arrow-right"></i><span>{{$t('id_auth.nav_id_auth')}}</span>
                </div>
                <div class="file_authentication_body">
                    <!-- <p class="msg">为保障资金安全，修改密码后24小时内不允许进行提币操作</p> -->
                    <p class="lable">{{$t('id_auth.country')}}</p>
                    <el-select class="innner_left" v-model="county" placeholder="请选择">
                        <el-option
                        v-for="item in nationality"
                        :key="item.id"
                        :label="lang=='en'?item.countryCode:item.countryName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <p class="lable">{{$t('id_auth.name')}}</p>
                    <el-input class="innner_left" v-model="true_name"  :placeholder="$t('id_auth.input_name')" ></el-input>
                    <p class="lable">{{$t('id_auth.id_type')}}</p>
                    <el-select class="innner_left" v-model="certificate" placeholder="请选择">
                        <el-option
                        v-for="item in certificates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="lable">{{$t('id_auth.id_number')}}</p>
                    <el-input class="innner_left" v-model="id_number"  :placeholder="$t('id_auth.input_num')" @focus="certificate_focus" @blur="check_certificate"></el-input><br>
                    <i class="el-icon-warning" v-show="certificate_info">{{$t('id_auth.id_format')}}</i><br>

                    <p class="lable">{{$t('id_auth.id_photo')}}</p>
                    <div class="photo_card outer">
                        <div class="photo_card_one left">
                            <input type="file" id="pic_one" @change="change_one" ref="pic_one">
                            <img width="100%" :src="dialogImageUrlHead" alt="">
                            <i class="el-icon-plus plus" @click="click_one" v-show="one_i_status"></i>
                            <span>{{$t('id_auth.pt1')}}</span>
                        </div>
                        <div class="photo_card_one right" v-show="certificate == '0'? true :false">
                            <input type="file" id="pic_two" @change="change_two" ref="pic_two">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            <i class="el-icon-plus plus" @click="click_two" v-show="two_i_status"></i>
                            <span>{{$t('id_auth.pt2')}}</span>
                        </div>
                    </div>
                    <p class="lable" style="margin-top:4rem;">{{$t('id_auth.id_hand_photo')}}</p>
                    <div class="photo_card_man outer">
                        <div class="photo_card_man_one left">
                            <input type="file" id="pic_third" @change="change_third" ref="pic_third">
                            <img width="100%" :src="dialogImageUrlMan" alt="">
                            <i class="el-icon-plus plus" @click="click_third" v-show="third_i_status"></i>
                            <!-- <span>请上传证件正面清晰照片或扫描件，格式支持jpg、png(图片大小不超1M)</span> -->
                        </div>
                        <div class="photo_card_man_one right">
                            
                        </div>
                            <span style="line-height:10rem /* 200/20 */;text-align:center;display:inline-block;width:5rem /* 100/20 */;">{{$t('id_auth.eg')}}</span>
                    </div>
                    <span class="span_last">{{$t('id_auth.pt3')}}</span><br>
                    <i class="el-icon-warning" style="margin-top:1rem;" v-show="photo_info">{{$t('id_auth.id_add_photo')}}</i><br>
                    <el-input class="innner_left input_button" type="button" :value="$t('id_auth.submit')" @click.native="submit_fun"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import {
    QueryQtcTradeFunCountry
} from '../../assets/js/api'
export default {
    components:{
        'top-nav':TopNav,
        'nav-bar': NavBar,
    },
    data() {
        return {
            legalSet:'',
            // 
            idcardReg : /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            passportReg:/^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/,
            imageUrl: '',
            reg: /^[0-9a-zA-Z]{6,16}$/,
            true_name:'',
            certificate_info:false,
            county:'1',
            nationality:[
                {
                    value:'1',
                    label:'中国',
                },
                {
                    value:'2',
                    label:'美国',
                }
            ],
            certificate:'0',
            certificates:this.$t('id_auth.certificates'),
            id_number:'',
            dialogImageUrl: '',
            dialogImageUrlHead: '',
            dialogImageUrlMan: '',
            dialogImageUrlKey: '',
            dialogImageUrlHeadKey: '',
            dialogImageUrlManKey: '',
            dialogVisible: false,
            dialogVisibleHead:false,
            dialogVisibleMan:false,
            // uploadDisabledHead:false,
            imagelist:[],
            imagelist_head:[],
            imagelist_man:[],
            photo_info:false,
            one_i_status:true,
            two_i_status:true,
            third_i_status:true,
        }
    },
    computed:{
        uploadDisabledHead() {
            // console.log( this.imagelist_head.length >0)
            return this.imagelist_head.length >0 ? 'disabled pic':'pic';
        },
        uploadDisabledMan() {
            // console.log( this.imagelist_man.length >0)
            return this.imagelist_man.length >0 ? 'disabled pic':'pic';
        },
        uploadDisabled(){
            return this.imagelist.length >0 ? 'disabled pic':'pic';
        },
        doUploadUrl() {
            return this.axios.defaults.baseURL+"file/upload";
        },
        lang() {
            return this.$i18n.locale;
        }
    },
    watch:{
        lang(n,o) {
            this.certificates = this.$t('id_auth.certificates')
        }
    },
    created(){
        this.initCountry()
    },
    methods:{
        async initCountry(){
            let key1 = await QueryQtcTradeFunCountry(this)
            .then((res) => {
                return res;
            })
            if(key1!=false) {
                console.log(key1)
                this.nationality = key1
                this.county = key1[0].id
            }
        },
        getPath(key,base){ // 还没有配置其他信息
            // this.axios.post('/file/getUrl',qs.stringify({key:key}))
            // .then((res) => {
            //     let data = res.data;
            //     if(data.code == 200){
            //        let url = data.data.url
            //        if(base=='one'){
            //            this.dialogImageUrlHead =data.data.url;
            //            this.dialogImageUrlHeadKey = key;
            //        }else if(base=='two'){
            //            this.dialogImageUrl =data.data.url;
            //            this.dialogImageUrlKey = key;
            //        }else if(base =='third'){
            //            this.dialogImageUrlMan =data.data.url;
            //            this.dialogImageUrlManKey = key;
            //        }
            //         this.img_url_test = url;
            //     }else{
            //         this.$message({
            //             type:'error',
            //             message:data.message,
            //             duration:1100,
            //         })
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })
            if(base=='one'){
                this.dialogImageUrlHead = 'http://103.75.2.198:8080'+key;
                this.dialogImageUrlHeadKey = key;
            }else if(base=='two'){
                this.dialogImageUrl = 'http://103.75.2.198:8080'+key;
                this.dialogImageUrlKey = key;
            }else if(base =='third'){
                this.dialogImageUrlMan = 'http://103.75.2.198:8080'+key;
                this.dialogImageUrlManKey = key;
            }
            this.img_url_test = 'http://103.75.2.198:8080'+key;
        },
        go_file_center() {
            this.$router.push('/personal')
                        this.$store.commit('_set_nav_item','0')
        },
        certificate_focus() {
            this.certificate_info = false;
        },
        check_certificate() {
            // 证件格式怕匹配
            let id = this.id_number
            if(this.certificate == '0'){
                if(!this.idcardReg.test(this.id_number)){
                    this.certificate_info = true;
                }
            }else{
                // if(!this.passportReg.test(this.id_number)){
                //     this.certificate_info = true;
                // }
            }
        },  
        
        submit_fun() {
            if(this.true_name == '') {
                this.$message({
                    type:"waring",
                    message:this.$t('id_auth.input_name'),
                    duration:1000,
                })
                return false;
            }
            if(this.id_number == '') {
                this.$message({
                    type:"waring",
                    message:this.$t('id_auth.input_num'),
                    duration:1000,
                })
                return false;
            }
            if(this.certificate =='0') {
                if(this.dialogImageUrl =='' || this.dialogImageUrlHead=='' || this.dialogImageUrlMan == '') {
                    this.photo_info = true;
                    return false;
                }else{
                    this.axios.post('/user/addIdentityAuthInfo',qs.stringify({
                        credentialsNumber:this.id_number,
                        credentialsPhotoBack:this.dialogImageUrlKey,
                        credentialsPhotoFront:this.dialogImageUrlHeadKey,
                        credentialsPhotoHandheld:this.dialogImageUrlManKey,
                        credentialsType:this.certificate,
                        name:this.true_name,
                        nationality:this.county,
                    })).then((res) => {
                        let data = res.data;
                        if(data.code == 200) {
                            this.$message({
                                type:'success',
                                message:this.$t('info_item.succeed'),
                                duration:1100,
                            })
                            this.$router.push('/personal')
                            this.$store.commit('_set_nav_item','0')
                        }else{
                            this.$message({
                                type:'error',
                                message:data.message,
                                duration:1100,
                            })
                        }
                    }).catch((error) => {
                         this.$message({
                                type:'error',
                                message:this.$t('info_item.error'),
                                duration:1100,
                            })
                    })
                }
            }else{
                if(this.dialogImageUrlHead =='' || this.dialogImageUrlMan == '') {
                    this.photo_info = true;
                    return false;
                }else{
                    this.axios.post('/user/addIdentityAuthInfo',qs.stringify({
                        credentialsNumber:this.id_number,
                        credentialsPhotoFront:this.dialogImageUrlHeadKey,
                        credentialsPhotoHandheld:this.dialogImageUrlManKey,
                        credentialsType:this.certificate,
                        name:this.true_name,
                        nationality:this.county,
                    })).then((res) => {
                        let data = res.data;
                        if(data.code == 200) {
                            this.$message({
                                type:'success',
                                message:this.$t('info_item.succeed'),
                                duration:1100,
                            })
                            this.$router.push('/personal')
                            this.$store.commit('_set_nav_item','0')
                        }else{
                            this.$message({
                                type:'error',
                                 message:data.message,
                                 duration:1100,
                            })
                        }
                    }).catch((error) => {
                         this.$message({
                                type:'error',
                                message:this.$t('info_item.error'),
                                duration:1100,
                            })
                    })
                }
            }
           
            
        },
        
        click_one() {
            let one = document.getElementById('pic_one');
            one.value = null;
            one.click();
        },
        click_two() {
            let one = document.getElementById('pic_two');
            one.value = null;
            one.click();
        },
        click_third() {
            let one = document.getElementById('pic_third');
            one.value = null;
            one.click();
        },
        change_one() {
            let dom_one = this.$refs.pic_one;
            let files ,that= this,fileType;
            fileType = dom_one.value;
            // console.log(fileType)
            if(!/\.(jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(fileType))//gif|
            {
                // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                this.$message({
                    type:"error",
                    message:'图片类型必须是 jpg|jpeg|png|GIF|JPG|JPEG|PNG 中一种',
                    duration:1100,
                })
                return false;
            }
            if(dom_one.files){//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
                files = dom_one.files;
                if(window.FileReader){
                    var reader = new FileReader(); 
                    reader.readAsDataURL(files[0]);
                    reader.onload = function(e){
                        let dx =(e.total/1024)/1024;
                        if(dx>=1){
                            // alert("文件大小大于2M");
                            that.$message({
                                type:"waring",
                                message:"上传图片大小不能超过 1 M",
                                duration:1100,
                            })
                            return;
                        }
                        let fd = new FormData();
                        fd.append('file', files[0])
                        var result =this.result;//这里就是转化之后的DataURL
                        that.axios.post('/file/upload',fd).then((res) => {
                            let data = res.data;
                            let k = data.data.url;
                            // that.dialogImageUrlHead =data.data.url;
                            that.getPath(k,'one')
                            that.one_i_status = false
                        })
                        .catch((err) => {
                            
                            })
                       
                    }
                    
                }else {//if(browserVersion.indexOf("SAFARI")>-1)
                    alert("不支持Safari浏览器6.0以下版本的图片预览!");
                }
            }else{
                this.$message({
                    type:'error',
                    message:"浏览器版本过低，请升级现代高级浏览器！",
                    duration:800,
                })
            }
        },
        change_two() {
            let dom_one = this.$refs.pic_two;
            let files ,that= this,fileType;
            fileType = dom_one.value;
            if(!/\.(jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(fileType))//gif|
            {
                // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                this.$message({
                    type:"error",
                    message:'图片类型必须是 jpg|jpeg|png|GIF|JPG|JPEG|PNG 中一种',
                    duration:1100,
                })
                return false;
            }
            if(dom_one.files){//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
                files = dom_one.files;
                if(window.FileReader){
                    var reader = new FileReader(); 
                    reader.readAsDataURL(files[0]);
                    reader.onload = function(e){
                        let dx =(e.total/1024)/1024;
                        if(dx>=1){
                            // alert("文件大小大于2M");
                            that.$message({
                                type:"waring",
                                message:"上传图片大小不能超过 1 M",
                                duration:1100,
                            })
                            return;
                        }
                        let fd = new FormData();
                        fd.append('file', files[0])
                        var result =this.result;//这里就是转化之后的DataURL
                        that.axios.post('/file/upload',fd).then((res) => {
                            let data = res.data;
                            // that.dialogImageUrl =data.data.url;
                            let k = data.data.url;
                            that.getPath(k,'two')
                            that.two_i_status = false
                        })
                        .catch((err) => {
                            
                            })
                        
                    }
                    
                }else {//if(browserVersion.indexOf("SAFARI")>-1)
                    alert("不支持Safari浏览器6.0以下版本的图片预览!");
                }
            }else{
                this.$message({
                    type:'error',
                    message:"浏览器版本过低，请升级现代高级浏览器！",
                    duration:800,
                })
            }
        },
        change_third() {
            let dom_one = this.$refs.pic_third;
            let files ,that= this,fileType;
            fileType = dom_one.value;
            if(!/\.(jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(fileType))//gif|
            {
                // alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                this.$message({
                    type:"error",
                    message:'图片类型必须是 jpg|jpeg|png|GIF|JPG|JPEG|PNG 中一种',
                    duration:1100,
                })
                return false;
            }
            if(dom_one.files){//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
                files = dom_one.files;
                if(window.FileReader){
                    var reader = new FileReader(); 
                    reader.readAsDataURL(files[0]);
                    reader.onload = function(e){
                        let dx =(e.total/1024)/1024;
                        if(dx>=1){
                            // alert("文件大小大于2M");
                            that.$message({
                                type:"waring",
                                message:"上传图片大小不能超过 1 M",
                                duration:1100,
                            })
                            return;
                        }
                        let fd = new FormData();
                        fd.append('file', files[0])
                        var result =this.result;//这里就是转化之后的DataURL
                        that.axios.post('/file/upload',fd).then((res) => {
                            let data = res.data;
                            // that.dialogImageUrlMan =data.data.url;
                            let k = data.data.url;
                            that.getPath(k,'third')
                            that.third_i_status = false
                        })
                        .catch((err) => {
                            
                            })
                        
                    }
                    
                }else {//if(browserVersion.indexOf("SAFARI")>-1)
                    alert("不支持Safari浏览器6.0以下版本的图片预览!");
                }
            }else{
                this.$message({
                    type:'error',
                    message:"浏览器版本过低，请升级现代高级浏览器！",
                    duration:800,
                })
            }
        },
        
    }
}
</script>

<style lang="scss">
.identity-authentication{
    .identity-authentication-box{
        height: 67.7rem /* 1014/20 */;
        background:RGBA(242, 242, 242, 1) ;
        box-sizing: border-box;
        padding-top: 1rem;
        // 
        .file_authentication_box{
            width: 60rem /* 800/20 */;
            // height: 44rem /* 880/20 */;
            // height: 40rem /* 800/20 */;
            background:rgba(255,255,255,1);
            margin: 0 auto;
            padding: .75rem /* 15/20 */  2.5rem /* 50/20 */;
            font-size:.7rem /* 14/20 */;
            box-sizing: border-box;
            color:rgba(102,102,102,1);
            margin-top: 7.05rem /* 141/20 */;
            .file_authentication_nav{
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
            .file_authentication_body{
                text-align: left;
                .msg{
                    width: 35rem /* 700/20 */;
                    height: 3rem /* 60/20 */;
                    background:rgba(251,242,242,1);
                    margin: 0 auto;
                    margin-top:.75rem /* 15/20 */ ;
                    line-height: 3rem /* 60/20 */;
                    padding-left: 2rem /* 40/20 */;
                    box-sizing: border-box;
                }
                .lable{
                    text-align: left;
                    font-weight:400;
                    // color:rgba(153,153,153,1);
                    margin-top:1rem /* 20/20 */;
                    margin-bottom:.75rem /* 15/20 */;
                }
                .el-input{
                    width: 21rem /* 420/20 */;
                    height: 2.25rem /* 45/20 */;
                }
                .el-input__inner{
                    height: 2.25rem!important /* 45/20 */;
                    line-height: 2.25rem!important /* 45/20 */;
                }
                .send_email{
                    width: 14rem /* 280/20 */;
                }
                .send_email_button{
                    display: inline-block;
                    height: 2.15rem /* 43/20 */;
                    width: 7rem /* 140/20 */;
                    border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
                    border-left: none;
                    vertical-align:top;
                    line-height: 2.15rem /* 43/20 */;
                    text-align: center;
                    cursor: pointer;
                    color: rgba(147,195,233,1);
                }
                i{
                    display: inline-block;
                    // color:rgba(240,91,95,1);
                    color: #ccc;
                }
                .input_button{
                    width: 15rem /* 300/20 */;
                    margin-top: .5rem /* 10/20 */;
                    margin-bottom: 1.5rem!important /* 30/20 */;
                    height: 1.5rem!important /* 30/20 */;
                    .el-input__inner{
                        // background:rgba(101,169,224,1);
                        background: #4C6085;
                        color: white;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .input_info{
                    margin-top: .5rem /* 10/20 */;
                    // margin-bottom: .5rem /* 10/20 */;
                    height: 1.5rem!important /* 30/20 */;
                    .el-input__inner{
                        background:rgba(255,211,217,1);
                        height: 1.5rem!important /* 30/20 */;
                        line-height: 1.5rem!important /* 30/20 */;
                        border: none;
                        color: black;
                        text-align: center;
                    }
                }
                .photo_card_man_one{
                    display: inline-block;
                    width: 15rem /* 300/20 */;
                    height: 10rem /* 200/20 */;
                    box-sizing: border-box;
                }
                .photo_card_man_one.right{
                    border: .05rem /* 1/20 */ dotted #c0ccda;
                    background: url('../../assets/images/agency/2man@3x.png')  no-repeat;
                    background-size: cover;
                    
                }
                .photo_card{
                    width:64%;
                }
                .photo_card_man{
                    width: 64%;
                }
                .photo_card_one{
                    display: inline-block;
                    width: 15rem /* 300/20 */;
                    height: 10rem /* 200/20 */;
                    box-sizing: border-box;
                    border:.05rem /* 1/20 */ dashed #c0ccda;
                    border-radius: .3rem /* 6/20 */;
                    position: relative;
                    input{
                        position: absolute;
                        z-index: -1;
                    }
                    img{
                        display: inline-block;
                        width: 15rem /* 300/20 */;
                        height: 10rem /* 200/20 */;
                    }
                    .plus{
                        position: absolute;
                        width: 1.5rem /* 30/20 */;
                        height: 1.5rem /* 30/20 */;
                        top: 50%;
                        left: 50%;
                        font-size: 1.5rem /* 30/20 */;
                        transform: translateX(-50%) translateY(-50%);
                        cursor: pointer;
                    }
                    span{
                        display: inline-block;
                        width: 15rem /* 300/20 */;
                        margin-top: 1rem /* 20/20 */;
                    }
                }
                .span_last{
                    display: inline-block;
                    margin-top:1rem /* 20/20 */ ;
                    //  width: 15rem /* 300/20 */;
                }
                .photo_card_man_one{
                    display: inline-block;
                    width: 15rem /* 300/20 */;
                    height: 10rem /* 200/20 */;
                    box-sizing: border-box;
                    border:.05rem /* 1/20 */ dashed #c0ccda;
                    border-radius: .3rem /* 6/20 */;
                    position: relative;
                    input{
                        position: absolute;
                        z-index: -1;
                    }
                    img{
                        display: inline-block;
                        width: 15rem /* 300/20 */;
                        height: 10rem /* 200/20 */;
                    }
                    .plus{
                        position: absolute;
                        width: 1.5rem /* 30/20 */;
                        height: 1.5rem /* 30/20 */;
                        top: 50%;
                        left: 50%;
                        font-size: 1.5rem /* 30/20 */;
                        transform: translateX(-50%) translateY(-50%);
                        cursor: pointer;
                    }
                    span{
                        display: inline-block;
                        width: 15rem /* 300/20 */;
                        margin-top: 1rem /* 20/20 */;
                    }
                }
            }
        }
        @media screen and(max-width: 480px) {
            .file_authentication_box{
                width:100%;
            }
        }
    }
}
</style>
