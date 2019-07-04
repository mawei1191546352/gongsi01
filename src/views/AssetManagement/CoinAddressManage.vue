<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-06-05 10:29:13
 * @LastEditors: mawei
 * @LastEditTime: 2019-06-26 16:10:21
 -->
<template>
    <div class="currency-address-manage">
        <top-nav></top-nav>
        <nav-bar :childSet="legalSet"></nav-bar>
        <div class="currency-address-manage-box">
            <div class="banxin">
                <div class="nac-nav">
                    <span @click="$router.push('/asset-manage')">{{$t('asset_address.nav_asset')}}</span> <span> > </span> <span>{{$t('asset_address.nav_one')}}</span>
                </div>
            </div>
        </div>
        <div class="asset-management-body">
            <div class="banxin">
                <div class="asset-management-body-box">
                    <div class="nav">
                        <div class="nav_box">
                            <span>{{$t('asset_address.coin')}}</span><br>
                            <el-select v-model="coinTypeId" size="mini" placeholder="请选择" class="classB" :class="lang">
                                <el-option
                                v-for="item in optionsClass"
                                :key="item.value"
                                :label="item.label.toUpperCase()"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="nav_box" v-show="coinTypeId ==2">
                            <span>{{$t('asset_manage.lian_name')}}</span><br>
                            <el-select v-model="chain" size="mini" placeholder="请选择" class="classB" :class="lang">
                                <el-option
                                v-for="item in chainArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="nav_box">
                            <span>{{$t('asset_address.withdraw_address')}}</span><br>
                            <el-input v-model="address" size="mini" :placeholder="$t('asset_address.address_input')" class="address" :class="lang"></el-input>
                        </div>
                        <div class="nav_box">
                            <span>{{$t('asset_address.note')}}</span><br>
                            <el-input v-model="notes" size="mini" :placeholder="$t('asset_address.address_input')" class="notes"></el-input>
                        </div>
                        <!-- <el-button type="primary" class="add_class">添加</el-button> -->
                        <div class="add_class" @click="address_add">+{{$t('asset_address.add')}}</div>
                    </div>
                    <div class="asset-management-table">
                        <el-table
                            :data="tableData"
                            header-cell-class-name="head_tab_cell"
                            :cell-class-name="in_center"
                            id="adTable"
                            style="width: 100%;height:28rem;">
                            <!-- <el-table-column
                                type="index"
                                >
                            </el-table-column> -->
                            <el-table-column
                                :label="$t('asset_address.coin')"
                                :render-header="renderHeader"
                                >
                                <template slot-scope="scope">
                                    <!-- {{ scope.row.coinTypeId == '0'? "USDT":(scope.row.coinTypeId == '1'?"BTC":"ETH") }} -->
                                    <!-- <span style="margin-left: 10px">{{scope.row.coinTypeId}}</span> -->
                                    <span>{{scope.row.coinType.toUpperCase()}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column 
                                :label="$t('asset_address.withdraw_address')" 
                                min-width="250px"
                                prop="address">
                                <template slot-scope="scope">
                                    <div class="add_div">
                                        <span style="margin-left: 0px">{{scope.row.address}}</span>
                                    <span class="address_type">{{scope.row.type}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column 
                                :label="$t('asset_address.note')" 
                                min-width="150px"
                                prop="remark">
                            </el-table-column>
                            <el-table-column 
                                :label="$t('asset_address.control')" 
                                width="100px"
                                >
                                <template slot-scope="scope">
                                    <span style="color:#5C9ACC;cursor: pointer;" @click="deleteFun(scope.row)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        style="text-align:center;"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="address-add-verification outer" v-show="verification" :class="height_reset">
            <i class="el-icon-close right" @click="close_verification"></i>
            <!--  -->
            <span v-show="(user_info.phone==null?false:true)">{{$t('info_item.phone')}}</span><br>
            <input v-show="(user_info.phone==null?false:true)" class="top_email_box_input _top_one" type="text" disabled v-model="user_info.phone"><br>
            <span v-show="(user_info.phone==null?false:true)">{{$t('info_item.phone_code')}}</span><br>
            <input v-show="(user_info.phone==null?false:true)" @focus="submit_info = false" class="top_email_box_input _top_input_one" type="text" v-model="phone_code_two"><input v-show="user_info.phoneAuthStatus=='1'?false:(user_info.phone==null?false:true)"  @click="sendPhone" class="top_email_box_input _top_input_two" type="button" v-model="send_phone">
            <!--  -->
            <span v-show="(user_info.email==null?false:true)">{{$t('info_item.email')}}</span><br>
            <input v-show="(user_info.email==null?false:true)" class="top_email_box_input _top_one" type="text" disabled v-model="user_info.email"><br>
            <span v-show="(user_info.email==null?false:true)">{{$t('info_item.email_code')}}</span><br>
            <input v-show="(user_info.email==null?false:true)" @focus="submit_info = false" class="top_email_box_input _top_input_one" type="text" v-model="email_code_two"><input v-show="user_info.emailAuthStatus=='1'?false:(user_info.email==null?false:true)" @click="sendEmail_two" class="top_email_box_input _top_input_two" type="button" v-model="send_two">
            <!--  -->
            <span v-show="user_info.googleAuthTag =='0'?false:true">{{$t('info_item.google_code')}}</span><br>
            <input v-show="user_info.googleAuthTag =='0'?false:true" @focus="submit_info = false" class="top_email_box_input _top_one" :placeholder="$t('asset_address.p_google_code')" type="text"  v-model="google_code">
            <p v-show="submit_info" style="margin-top:0;color:red;">{{$t('info_item.input_all')}}</p>
            <p class="outer"><span @click="submit_end" class="submit_end left">{{$t('info_item.confirm')}}</span><span @click="verification=false" class="cancel_end right" >{{$t('info_item.cancle')}}</span></p>
        </div>
        <pop-authen v-if="hackReset" childProp="liangxiang"></pop-authen>
    </div>
</template>

<script>
import qs from 'qs'
import {getcoinTypeIdFun} from '../../assets/js/api.js'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import PopAuthen from '../../components/PopupsAuthen.vue'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'pop-authen':PopAuthen,
    },
    data() {
        return {
            chain:0,
            chainArr:[
                {
                    value:0,
                    label:'OMNI'
                },
                {
                    value:1,
                    label:"ERC20"
                }
            ],
            legalSet:'legal',
            currentPage:1,
            page_size:100,
            total:0,
            // 
            send_phone:'发送验证码',
            send_two:'发送验证码',
            address:'',
            notes:'',
            head_tab:'head_tab',
            head_tab_cell:'head_tab_cell',
            in_center:'in_center',
            biArray:[
                {
                    value:-1,
                    label:"全部"
                },
            ],
            form:{
                region:'1234sdfgfd'
            },
            tableData: [
                
            ],
            optionsClass: [
                {
                    value: '0',
                    label: 'USDT'
                },
                {
                    value: '1',
                    label: 'BTC'
                },
                {
                    value: '2',
                    label: 'ETH'
                }
            ],
            coinTypeId:'0',
            type:'全部',
            status:'全部',
            cPage:1,//当前页
            verification:false,//验证码弹窗
            phone_code_two:'',
            email_code_two:'',
            google_code:'',//谷歌验证码
            can_send_phone:true,
            can_send_email:true,
            submit_info:false,//提示信息
            height_reset:'',
            h:0,//gaodu
            info_box_ver:this.$t('info_item.input_all'),
            renderElem:'',
            renderColumn:'',
            renderSelf:'',
            hackReset:false,
        }
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        },
        lang() {
            return this.$i18n.locale;
        },
    },
    watch:{
        lang(n, o) {
            this.send_phone = this.$t('info_item.get_code')
            this.send_two = this.$t('info_item.get_code')
        }
    },
    async created(){
        this.send_phone = this.$t('info_item.get_code')
        this.send_two = this.$t('info_item.get_code')
        this.biArray[0] = this.$t('asset_address.biArray')[0]
        console.log(this.user_info)
        let item ;
        if(this.biAddress == '-1') {
            item = {
                page:this.cPage,
                rows:this.page_size,
            }
        }else{
            item = {
                coinTypeId:this.biAddress,
                page:this.cPage,
                rows:this.page_size,
            }
        }
        this.initData(item)
        let key = await getcoinTypeIdFun(this,)
        .then((res) => {
            return res;
        })
        if(key!= false) {
            this.biArray.push(...key);
            this.optionsClass = key;
            this.coinTypeId = key[0].value;
        }
    },
    mounted(){
        // 高度初始化
        if(this.$store.state.email != '') {
            this.h+=1
        }
        if(this.$store.state.phone != '') {
            this.h= this.h+ 1;
        }
        if(this.$store.state.googleAccount_save) {
            this.h= this.h+ 1;
        }
        if(this.h==1){
            this.height_reset = 'height_reset1'
        }else if(this.h==2) {
            this.height_reset = 'height_reset2'
        }else if(this.h==3) {
            this.height_reset = 'height_reset3'
        }
    },
    methods:{
        /**
         * 初始化表格高度
         */
        initTableHeight(){
            let dom = document.getElementById('adTable')
            dom = document.getElementsByClassName('el-table__body-wrapper')[0]
            dom.style.height= '25rem';
            dom.style.overflowY= 'auto';
        },
        initData(item){
            this.axios.post('/assetsExtractAddress/pageList',qs.stringify(item))
            .then((res) => {
                let data = res.data;
                if(data.code == 200) {
                    this.total_bi_address = data.data.total;
                    this.tableData=data.data.list
                }
            })
        },
        handleSizeChange(val){
            this.page_size = val;
            let item ;
            if(this.biAddress == -1) {
                item = {
                    page:this.cPage,
                    rows:this.page_size,
                }
            }else{
                item = {
                    coinTypeId:this.biAddress,
                    page:this.cPage,
                    rows:this.page_size,
                }
            }
            this.initData(item)
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.cPage = val;
            let item ;
            if(this.biAddress == -1) {
                item = {
                    page:this.cPage,
                    rows:this.page_size,
                }
            }else{
                item = {
                    coinTypeId:this.biAddress,
                    page:this.cPage,
                    rows:this.page_size,
                }
            }
            this.initData(item)
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        deleteFun(row) {
            let that = this;
            this.$confirm(that.$t('asset_address.delete_address'), that.$t('asset_address.tip'), {
            confirmButtonText: that.$t('info_item.confirm'),
            cancelButtonText: that.$t('info_item.cancle'),
            type: 'warning'
            }).then(() => {
                this.axios.post('/assetsExtractAddress/delete',qs.stringify({
                    id:row.id,
                })).then((res) => {
                    let data = res.data;
                    if(data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('asset_address.succeed'),
                            duration:800,
                        });
                    }else{
                        this.$message({
                            type: 'waring',
                            message: data.message,
                            duration:1000,
                        });
                    }
                })
            
            }).catch((err) => {
                this.$message({
                    type: 'info',
                    message: err
                });          
            });
        },
        changeType(v) {
            this.biAddress = v.srcElement.value
            let item ;
            if(this.biAddress == -1) {
                item = {
                    page:this.cPage,
                    rows:this.page_size,
                }
            }else{
                item = {
                    coinTypeId:this.biAddress,
                    page:this.cPage,
                    rows:this.page_size,
                }
            }
            this.initData(item)
        },
        renderHeader(createElement, { column, _self }) {
            this.renderColumn = column;
            this.renderElem = createElement;
            this.renderSelf = _self;
            this.biArray[0] = this.$t('asset_address.biArray')[0]
            let that = this;
            let label = column.label;
            let labelArr = label.split(' ');
            return createElement(
                'div',
                {
                    'class':'header-bi-type'
                },
                [
                    createElement('span',{
                        attrs:{type:'text'},
                    },[labelArr[0]]),
                    createElement('select',{
                        "class":'head-bi-select',
                        attrs:{value:'-1'},
                        on:{change:function(v){
                            that.changeType(v)
                        }}
                    },[
                        Array.apply(null,that.biArray).map( (el)=>{
                            return createElement('option',{
                                "class":'head-bi-option',
                                attrs:{value:el.value},   
                            },[el.label])
                        })
                    ]),
                ],
            );
        },
        address_add() {
            this.hackReset = true;
            let num=0;
            // console.log('this.googleAccount:',this.googleAccount)
            if(this.user_info.email!=null){
                num++
            }
            if(this.user_info.phone!=null){
                num++
            }
            if(this.user_info.googleAuthTag=='1'){
                num++
            }
            if(num<2){
                return false
            }
            if(this.address == '') {
                this.$message({
                    message: this.$t('info_item.input_all'),
                    type: 'waring'
                });
            }else{
                this.verification  =true;
            }
        },
        close_verification() {
            this.verification = false;
        },
        sendPhone() {
            if(this.can_send_phone ) {
                console.log(1)
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:0,
                    behaviorType:6,
                    number:this.user_info.phoneAreaCode+','+this.user_info.phone,
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            message: this.$t('info_item.send_code_ok'),
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                            message: err,
                            type: 'waring'
                        });
                })
                this.can_send_phone = false
                let time = 60;
                let t = setInterval(()=>{
                    if(time == 0){
                    time = 60;
                    this.can_send_phone = true;
                    this.send_phone = this.$t('info_item.get_code')
                    clearInterval(t)
                    }else{
                    this.send_phone = --time + 's'
                    }
                },1000)
            }
        },
        sendEmail_two() {
            if(this.can_send_email ) {
                console.log(1)
            // 发送接口
                this.axios.get('/getCode',{params:{
                    accountType:1,
                    behaviorType:6,
                    number:this.user_info.email,
                }}).then((res) => {
                    let data = res.data;
                    if(data.code ==200) {
                        this.$message({
                            message: this.$t('info_item.send_code_ok'),
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message:this.$t('info_item.send_code_no'),
                            type: 'waring'
                        });
                    }
                }).catch((errr) => {
                    this.$message({
                            message: err,
                            type: 'waring'
                        });
                })
                this.can_send_email = false
                let time = 60;
                let t = setInterval(()=>{
                    if(time == 0){
                    time = 60;
                    this.can_send_email = true;
                    this.send_two = this.$t('info_item.get_code')
                    clearInterval(t)
                    }else{
                    this.send_two = --time + 's'
                    }
                },1000)
            }
        },
        submit_end() {
            let item ={}
            if(this.user_info.email!=null){
                if(this.email != '' && this.email_code_two ==''){
                    console.log(1)
                    this.submit_info = true;
                    return false;
                }
            }
            if(this.user_info.phone !=null) {
                if(this.phone != '' && this.phone_code_two ==''){
                    console.log(2)
                    this.submit_info = true;
                    return false;
                }
            }
            if(this.user_info.googleAuthTag !='0') {
                if(this.googleAccount && this.google_code == ''){
                    console.log(3)
                    this.submit_info = true;
                    return false;
                }
            }
            
            
            //合并参数
             if(this.user_info.email != null){
                 if(this.email != '') {
                    item['emailCode'] = this.email_code_two
                }
             }
            if(this.user_info.phone != null) {
                if(this.phone != '') {
                    item['phoneCode'] = this.phone_code_two
                }
            }
            if(this.user_info.googleAuthTag !='0') {
                if(this.googleAccount) {
                    item['googleCode'] = this.google_code
                }
            }
            
            item['address'] = this.address;
            item['remark'] = this.notes;
            item['coinTypeId'] = this.coinTypeId;
            item['type'] = this.chain
            this.axios.post('/assetsExtractAddress/add',qs.stringify(item))
            .then((res) => {
                let data = res.data;
                if(data.code == 200 ) {
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.verification = false;
                    let item ;
                    if(this.biAddress == -1) {
                        item = {
                            page:this.cPage,
                            rows:this.page_size,
                        }
                    }else{
                        item = {
                            coinTypeId:this.biAddress,
                            page:this.cPage,
                            rows:this.page_size,
                        }
                    }
                    this.initData(item)
                }else if (data.code ==201) {
                    this.$message({
                        message: data.message,
                        type: 'error'
                    });
                    this.submit_info = true;
                    // this.close_verification()
                    this.info_box_ver = data.message;
                }
            }).catch((err) => {
                this.$message({
                    message: err,
                    type: 'error'
                });
            })
        }
    }
}
</script>

<style lang="scss">
.currency-address-manage{
    .currency-address-manage-box{
        height: 18.5rem /* 370/20 */;// +90
        height: 11rem /* 460/20 */;
        background:RGBA(242, 242, 242, 1);
        .nac-nav{
            position: absolute;
            top: 9.7rem;
            span{
                font-size: .8rem /* 16/20 */;
                cursor: pointer;
            }
            span:hover{
                color:#337ab7;
            }
        }
    }
     .asset-management-body{
        width: 100%;
        height: 18rem /* 960/20 */;
        background:rgba(255,255,255,1);
        margin-top: 1rem;
        .asset-management-body-box{
            .nav{
                position: relative;
                display: flex;
                justify-content: space-between;
                margin-bottom: 1.5rem /* 30/20 */;
                height: 2rem /* 30/20 */;
                height: 4.5rem;
                text-align: left;
                font-size: .8rem /* 16/20 */;
                span{
                    font-weight:400;
                    line-height:30px;
                    color:rgba(51,51,51,1);
                }
                input{
                    border-radius:0;
                    height: 1.5rem /* 30/20 */;
                    height: 1.8rem;
                    font-size: .75rem;
                    border-radius: .15rem /* 3/20 */;
                }
                .el-select{
                    width: 6.5rem /* 130/20 */;
                    height: 2rem /* 30/20 */;
                }
                
                .type,
                .classB{
                    // margin-right: 7rem /* 80/20 */;
                    width: 5rem /* 100/20 */;
                    // margin-left: .25rem /* 5/20 */;
                }
                .classB.en{
                    // margin-right: 1rem;
                }
                .status{
                    margin-left: .25rem /* 5/20 */;
                }
                .el-input{
                }
                .el-input.address{
                    display: inline-block!important;
                    width: 20rem!important /* 400/20 */;
                    width: 25.2rem /* 504/20 */!important;
                    // margin-left: .25rem /* 5/20 */;
                    // margin-right: 2.95rem /* 59/20 */;
                    text-align: left;
                }
                .el-input.address.en{
                    // margin-right: .95rem;
                }
                .el-input.notes{
                    display: inline-block!important;
                    width: 12.5rem!important /* 250/20 */;
                    width: 19.5rem /* 390/20 */!important;
                    // margin-left: .25rem /* 5/20 */;
                }
                .el-input__inner{
                    text-align: left;
                }
                .el-button{
                    font-size:.1rem!important /* 16/20 */;
                    font-family:PingFang-SC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    // line-height:1.5rem /* 30/20 */;
                    float: right;
                }
                .add_class{
                    position: absolute;
                    right: 0px;
                    bottom: -1rem;
                    z-index: 200;
                    display: inline-block;
                    width:5rem /* 100/20 */;
                    height:1.8rem /* 30/20 */;
                    background:rgba(76,96,133,1);
                    border-radius:.15rem /* 3/20 */;
                    padding: 0!important;
                    vertical-align: top;
                    color: white!important;
                    text-align: center;
                    line-height: 2rem /* 30/20 */;
                    line-height: 1.8rem /* 30/20 */;
                    font-size: .8rem /* 16/20 */;
                    cursor: pointer;
                    span{
                        width: 3rem!important /* 60/20 */;
                        height: 2rem!important /* 30/20 */;
                        
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .nav{
                    width: 30.75rem ;
                    padding: 0;
                    height: 14rem;
                    .el-select{
                        width: 100%;
                        margin-bottom: 1.5rem;
                        margin-right: 0!important;
                    }
                    .el-input{
                        width: 100%;
                        input{
                            width: 100%;
                        }
                    }
                    .el-input.notes,
                    .el-input.address{
                        margin-bottom: 1.5rem;
                        width: 100%!important;
                        margin-right: 0!important;
                        input{
                            width: 100%;
                        }
                    }
                }
            }
            .asset-management-table{
                .head_tab_cell{
                    // text-align: center;
                    background: rgba(230,230,230,1);
                }
                .head-bi-select{
                    border:0;
                    height: 1.4rem /* 28/20 */;
                    margin-left:.3rem;
                }
                tbody{
                    tr:nth-child(odd){
                        background:rgba(242,242,242,1);
                    }
                }
                .add_div{
                    display: flex;
                    .address_type{
                        width:2.5rem /* 50/20 */;
                        height:1rem;
                        border:1px solid rgba(92,137,204,1);
                        border-radius:2px;
                        color: #5C89CC;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: .3rem;
                    }
                }
            }
        }
    }
    // 
    .address-add-verification{
        position: absolute;
        width: 22.5rem /* 450/20 */;
        // height: 30rem /* 600/20 */;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform:  translateX(-50%) translateY(-50%);
        background:rgba(255,255,255,1);
        border-radius:.25rem /* 5/20 */;
        box-shadow:0rem /* 0/20 */ 0rem /* 0/20 */ .65rem /* 13/20 */ rgba(153,153,153,1);
        // padding-top: 1rem /* 20/20 */;
        // padding-left: 2rem /* 40/20 */ ;
        // padding-right: 1.5rem /* 30/20 */;
        // padding-bottom: 1rem /* 20/20 */;
        // box-sizing: border-box;
        i{
            cursor: pointer;
        }
        i:hover{
            color:#409EFF;
            transform: rotateZ(50deg)
        }
        span{
            line-height: 2.5rem /* 50/20 */;
        }
        box-sizing: border-box;
        padding: 1.5rem /* 30/20 */ 1.5rem /* 30/20 */;
        // padding-top: 1rem /* 20/20 */;
        text-align: left;
        font-size:.7rem /* 14/20 */;
        font-family:'PingFang-SC-Regular';
        font-weight:400;
        color:rgba(102,102,102,1);
        // line-height:1.5rem /* 30/20 */;
        .top_email_box_input{
            outline: none;
            padding-left: .75rem /* 15/20 */;
        }
        ._top_one{
            display: inline-block;
            width: 19rem /* 380/20 */;
            height: 2rem /* 40/20 */;
            background:rgba(242,242,242,1);
            // margin-top: .5rem /* 10/20 */;
            box-sizing: border-box;
        }
        ._top_input_one{
            display: inline-block;
            width: 13rem /* 240/20 */;
            height: 2rem /* 40/20 */;
            border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
            box-sizing: border-box;
        }
        ._top_input_two{
            display: inline-block;
            width:6rem /* 120/20 */;
            height: 2rem /* 40/20 */;
            border: .05rem /* 1/20 */ solid rgba(204,204,204,1);
            border-left: none;
            box-sizing: border-box;
            color: #5C9ACC;
            vertical-align: bottom;
        }
        P{
            margin-top: 1.5rem /* 30/20 */;
            position: relative;
            width: 19rem /* 380/20 */;
            .submit_end{
                display: inline-block;
                width:5.5rem /* 110/20 */;
                height:2rem /* 40/20 */;
                background:rgba(92,154,204,1);
                border-radius:.25rem /* 5/20 */;
                text-align: center;
                line-height: 2rem /* 40/20 */;
                color: white;
                cursor: pointer;
            }
            .cancel_end{
                display: inline-block;
                background:rgba(230,230,230,1);
                width:5.5rem /* 110/20 */;
                height:2rem /* 40/20 */;
                border-radius:.25rem /* 5/20 */;
                text-align: center;
                line-height: 2rem /* 40/20 */;
                cursor: pointer;
                
            }
        }
    }
}
</style>
