import qs from 'qs'
import axios from 'axios'
import axios2 from 'axios'
axios2.defaults.withCredentials=true
axios.defaults.baseURL = '/websocket'
let instance = axios.create({
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});
let instanceTui = axios.create({
    baseURL: '/pay/',
    timeout: 10000,
});
let instanceFile = axios.create({
    timeout: 10000,
    headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}
});
let instanceMark = axios.create({
    timeout: 10000,
});

/**
 * @param {*vue实例} vm 
 * @param {*账号} accountNumber 
 * @param {*密码} password 
 */
async function LoginFun(vm,item) {
    let key ;
    await vm.axios.post('/login',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            await vm.$store.dispatch('_async_set_init_user_info',data.data)
            // vm.$router.push('legal-currency')
            key = true;
            vm.$store.dispatch('async__set_custome',true)
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 登录页忘记密码
 * @param {*} vm 
 * @param {*} item 
 */
async function resetPassB(vm,item) {
    let key ;
    await vm.axios.post('/resetPassword',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            key = true;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 已入金按钮接口
 * @param {*} vm 
 * @param {*} item 
 */
async function updateTransferStatus(vm,item) {
    let key ;
    await vm.axios.post('/api/updateTransferStatus',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 初始化礼品卡
 * @param {*} vm 
 * @param {*} item 
 */
async function getGiftCrad(vm) {
    let key;
    await vm.axios.post('/market/queryGiftCard')
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 客户留言
 * @param {*} vm 
 */
async function clientLeaveMessage(vm,item) {
    let key;
    await vm.axios.post('/index/emailMessage',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 已入金支付状态查询
 * @param {*} vm 
 * @param {*} item 
 */
async function updateSearchFun(vm,item) {
    let key ;
    await vm.axios.post('/api/getPayCoinOrderInfo',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 绑定手机/邮箱/google号码时验证是否合适
 * @param {*} vm 
 * @param {*} item 
 */
async function bindingPhoneEmailGoogle(vm,item) {
    let key ;
    await vm.axios.post('/user/prebinding',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            key = true;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 注册方法
 * @param {*} vm 
 * @param {*} item 
 */
async function RegisterFun(vm,item) {
    let key ;
    await vm.axios.post('/registered',qs.stringify(item))
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            await vm.$store.dispatch('_async_set_init_user_info',data.data)
            // vm.$router.push('/personal')
            key = true;
            vm.$store.dispatch('async__set_custome',true)
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false;
    })
    return key;
}

/**
 * 绑定订单
 * @param {*} vm 
 * @param {*} item 
 */
async function bindOrderFun(vm,item) {
    let key ;
    await vm.axios.post('/payOrder/bingDingUser',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:data.message,
                duration:1200,
            })
            
            key  = true;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key=  false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key
}

/**
 * 退出登录
 * @param {*} vm 
 */
async function SignOut(vm) {
    let key;
    await vm.axios.post('/logout')
    .then(async (res) => {
        if(res.data.code ==200){
            await vm.$store.dispatch('_async_set_sign_out')
            vm.$router.push('/sign-in')
            key= true;
        }else{
            vm.$message({
                type:'error',
                message:res.data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key =  false
    })
    return key;
}

/**
 * 获取日志
 * @param {*} vm 
 */
async function getLogFun(vm) {
    let key;
    await vm.axios.post('/user/getLoginLog')
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            // vm.$message({
            //     type:'success',
            //     message:'获取日志成功',
            //     duration:1200,
            // })
            vm.logger = data.data;
            key = true;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key= false
    })
    return key;
}

/**
 * 获取置顶广告
 * @param {*} vm 
 * @param {*} item 
 */
async function getAdTopFun(vm,item) {
    let key;
    await vm.axios.post('/market/queryTopMarketList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key= false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * gateway法币获取详情
 * @param {*} vm 
 * @param {*} item 
 */
async function gateWayLegal(vm,item) {
    let key;
    await vm.axios.post('/api/getPayOrderInfo',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key= false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * gateway法币创建订单
 * @param {*} vm 
 * @param {*} item 
 */
async function createGateLegalOrder(vm,item) {
    let key;
    await vm.axios.post('/api/create',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key= false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 查询分页广告
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryAllAdListFun(vm,item) {
    let key;
    await vm.axios.post('/market/queryAllMarketList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key= false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 查询我的广告
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryUserAdListFun(vm,item) {
    let key;
    await vm.axios.post('/market/queryUserMarketList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key = data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key= false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取币种
 * @param {*} vm 
 * @param {*} item 
 */
async function getcoinTypeIdFun(vm,item) {
    let key;
    await vm.axios.post('/coin/coins')
    .then(async (res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 场外交易币种查询
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryQtcTradeFun(vm,item){
    let key;
    await vm.axios.get('/market/queryOtcMarketCurrency',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}
/**
 * 获取订单更新的
 * @param {} vm 
 */
async function getUnReadOrder(vm) {
    let key;
    await vm.axios.get('/cnyOrder/getUnReadOrderCount')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 首页币种查询
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryQtcTradeFunIndex(vm,item){
    let key;
    await vm.axios.get('/index/queryTradeCoin',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 首页法币查询
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryLegalTradeFunIndex(vm,item){
    let key;
    await vm.axios.get('/index/queryLegalTenderCoin',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 首页金额计算
 * @param {*} vm 
 * @param {*} item 
 */
async function priceCalcFunIndex(vm,item){
    let key;
    await vm.axios.post('/index/priceCalc',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 切换语言
 */
async function  getLang(vm,item) {
    let key;
    await vm.axios.get('/app/setLanguage',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 场外交易币种查询
 * @param {*} vm 
 * @param {*} item 
 */
async function QueryQtcTradeFunCountry(vm,item){
    let key;
    // vm.axios.get('/market/queryOtcTradeCoin')
    await vm.axios.get('/market/queryCountryList')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 *  下单时金额计算
 * @param {*} vm 
 * @param {*} item 
 */
async function getCurrencyPriceCalcFun(vm,item){
    let key;
    await vm.axios.post('/market/getCurrencyPriceCalc',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 购买法币订单
 * @param {*} vm 
 * @param {*} item 
 */
async function legalPurchaseOrderFun(vm, item) {
    let key;
    await vm.axios.post('/cnyOrder/buy',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 卖出法币订单
 * @param {*} vm 
 * @param {*} item 
 */
async function legalSaleOrderFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/sell',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 法币订单详情
 * @param {*} vm 
 * @param {*} item 
 */
async function legalOrderFindFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/findById',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}
async function legalOrderFindFunTui(item) {
    let key;
    await instanceTui.post('/cnyOrder/findById',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            // vm.$message({
            //     type:'error',
            //     message:data.message,
            //     duration:1200,
            // })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        // vm.$message({
        //     type:'error',
        //     message:vm.$t('info_item.server_error'),
        //     duration:1200,
        // })
        key = false
    })
    return key;
}
/**
 * 法币订单分页查询
 * @param {*} vm 
 * @param {*} item 
 */
async function legalOrderListFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/pageList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 发布广告页面需要的信息
 * @param {*} vm 
 * @param {*} item 
 */
async function getPublishAdParam(vm,item) {
    let key;
    await vm.axios.post('/market/getPublishMarketParam',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 发布广告
 * @param {*} vm 
 * @param {*} item 
 */
async function publishAdFun(vm,item){
    let key;
    // let axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json;',
    //     }
    //   };
    await vm.axios.post('/market/publishMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 编辑广告
 * @param {*} vm 
 * @param {*} item 
 */
async function editAdFun(vm,item){
    let key;
    // let axiosConfig = {
    //     headers: {
    //         'Content-Type': 'application/json;',
    //     }
    //   };
  
    await vm.axios.post('/market/editMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 下架广告
 * @param {*} vm 
 * @param {*} item 
 */
async function UnAdFun(vm,item) {
    let key;
    await vm.axios.post('/market/unMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 上架
 * @param {*} vm 
 * @param {*} item 
 */
async function shelfAdFun(vm,item) {
    let key;
    await vm.axios.post('/market/rePublishMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 取消预约
 * @param {*} vm 
 * @param {*} item 
 */
async function cancelUnAdPublishFun(vm,item) {
    let key;
    await vm.axios.post('/market/cancleUnPublishMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 取消预约
 * @param {*} vm 
 * @param {*} item 
 */
async function deleteAdFun(vm,item) {
    let key;
    await vm.axios.post('/market/deleteMarket',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取平台收款地址
 * @param {*} vm 
 * @param {*} item 
 */
async function listForSysPayWayFun(vm,item){
    let key;
    await vm.axios.post('/receiptWay/listForSys')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取yonghu收款地址
 * @param {*} vm 
 * @param {*} item 
 */
async function listPayWayFun(vm,item){
    let key;
    await vm.axios.post('/receiptWay/list')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 最终合并后的获取收款方式
 * @param {*} vm 
 * @param {*} item 
 */
async function listPayWayAllFun(vm,item){
    let key;
    await vm.axios.post('/cnyOrder/receiptWays',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 确认法币支付
 * @param {*} vm 
 * @param {*} item 
 */
async function legalConfrimPay(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/confirmPay',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 取消法币订单
 * @param {*} vm 
 * @param {*} item 
 */
async function legalCancelOrderFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/cancel',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 取消支付订单
 * @param {*} vm 
 * @param {*} item 
 */
async function PayCancelOrderFun(vm,item){
    let key;
    await vm.axios.post('/payOrder/cancel',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 放行法币
 * @param {*} vm 
 * @param {*} item 
 */
async function legalReleaseOrderFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/release',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 法币订单申诉
 * @param {*} vm 
 * @param {*} item 
 */
async function legalAppealOrderFun(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/complaint',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 待处理法币订单
 * @param {*} vm 
 * @param {*} item 
 */
async function legalOrderTradeingFun(vm, item){
    let key;
    await vm.axios.post('/market/getOtcMarketOrderCount')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            // vm.$message({
            //     type:'success',
            //     message:data.message,
            //     duration:1000,
            // })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取支付订单
 * @param {*} vm 
 * @param {*} item 
 */
async function paymentOrderList(vm,item) {
    let key;
    await vm.axios.post('/payOrder/pageList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data;
            // vm.$message({
            //     type:'success',
            //     message:data.message,
            //     duration:1000,
            // })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 确认支付订单
 * @param {*} vm 
 * @param {*} item 
 */
async function PayOrderConfirm(vm,item){
    let key;
    await vm.axios.post('/payOrder/confirm',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取费率
 * @param {*} vm 
 * @param {*} item 
 */
async function legalFeeRate(vm,item) {
    let key;
    await vm.axios.get('/market/queryOtcMarketFeeRate')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            // vm.$message({
            //     type:'success',
            //     message:data.message,
            //     duration:1000,
            // })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 心跳；链接
 * @param {*} vm 
 */
async function heartB(vm){
    let key;
    await vm.axios.get('/heartbeat')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 内部划转手续费
 * @param {*} vm 
 * @param {*} item 
 */
async function transferFeeFun(vm,item){
    let key;
    await vm.axios.post('/transferInner/handingFee',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}


/**
 * 查询用户代理商户列表
 * @param {*} vm 
 * @param {*} item 
 */
async function agentMerchantList(vm,item){
    let key;
    await vm.axios.get('/payOrder/queryAgentMerchantList')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 内部划转
 * @param {*} vm 
 * @param {*} item 
 */
async function transferFun(vm,item) {
    let key;
    await vm.axios.post('/transferInner/transfer',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
            vm.$message({
                type:'success',
                message:data.message,
                duration:1000,
            })
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 根据第三方跳转查询订单
 * @param {*} vm 
 * @param {*} item 
 */
async function thirdGetInfo(vm,item) {
    let key;
    await vm.axios.post('/api/orderInfo',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}
/**
 * 根据第三方跳转查询订单2
 * @param {*} vm 
 * @param {*} item 
 */
async function thirdGetInfo2(vm,item) {
    let key;
    await vm.axios.post('/payOrder/createCnyTransactionOrder',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}


/**
 * 根据第三方跳转 确认订单2
 * @param {*} vm 
 * @param {*} item 
 */
async function alreadyPayConfirm(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/payOrderConfirmPay',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 充币提币记录
 * @param {*} vm 
 * @param {*} item 
 */
async function getWithdrawList(vm,item){
    let key;
    await vm.axios.post('/wallet/getWithdrawOrDepositList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 内部划转记录
 * @param {*} vm 
 * @param {*} item 
 */
async function transferInnerFun(vm,item) {
    let key;
    await vm.axios.post('/transferInner/pageList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取我的法币订单 excel
 * @param {*} vm 
 * @param {*} item 
 */
function getExcelMyLegalOrderList(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'cnyOrder/getExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
      return key;
}

/**
 * 获取法币excel导出
 * @param {*} vm 
 * @param {*} item 
 */
async function getExcelLegal(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'payOrder/getExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
    // await vm.axios.post('/cnyOrder/getExcel',qs.stringify(item),{responseType:'arraybuffer'})
    // .then((res) => {
    //     let data = res.data;
    //     console.log(data,res)
    //     if(res.status ==200 || res.status==201){
    //         key =true;
    //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel;charset=utf-8"}); 
    //         let objectUrl = URL.createObjectURL(blob); 
    //         window.location.href = objectUrl; 
            
    //     }else{
    //         vm.$message({
    //             type:'error',
    //             message:data.message,
    //             duration:1200,
    //         })
    //         key = false;
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    //     vm.$message({
    //         type:'error',
    //         message:vm.$t('info_item.server_error'),
    //         duration:1200,
    //     })
    //     key = false
    // })
    return key;
}

/**
 * 获取支付excel导出
 * @param {*} vm 
 * @param {*} item 
 */
async function getExcelPay(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'/payOrder/getExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
    // await vm.axios.post('/payOrder/getExcel',qs.stringify(item))
    // .then((res) => {
    //     let data = res.data;
    //     if(res.status ==200 || res.status==201){
    //         key =true;
    //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel;charset=utf-8;"}); 
    //         let objectUrl = URL.createObjectURL(blob); 
    //         window.location.href = objectUrl; 
            
    //     }else{
    //         vm.$message({
    //             type:'error',
    //             message:data.message,
    //             duration:1200,
    //         })
    //         key = false;
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    //     vm.$message({
    //         type:'error',
    //         message:vm.$t('info_item.server_error'),
    //         duration:1200,
    //     })
    //     key = false
    // })
    return key;
}

/**
 * 获取对方信息 内部划转
 * @param {*} vm 
 * @param {*} item 
 */
async function GetOtherInformation(vm,item) {
    let key;
    await vm.axios.post('/user/getUserInfo',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 充币导出
 * @param {*} vm 
 * @param {*} item 
 */
async function exportExcelLegalIn(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'/wallet/exportDepositExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
      
    // await vm.axios.post('/wallet/exportDepositExcel',qs.stringify(item),{responseType:'arraybuffer'})
    // .then((res) => {
    //     let data = res.data;
    //     if(res.status ==200 || res.status==201){
    //         key =true;
    //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
    //         let objectUrl = URL.createObjectURL(blob); 
    //         window.location.href = objectUrl; 
    //     }else{
    //         vm.$message({
    //             type:'error',
    //             message:data.message,
    //             duration:1200,
    //         })
    //         key = false;
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    //     vm.$message({
    //         type:'error',
    //         message:vm.$t('info_item.server_error'),
    //         duration:1200,
    //     })
    //     key = false
    // })
    return key;
}

/**
 * 提币导出
 * @param {*} vm 
 * @param {*} item 
 */
async function exportExcelLegalOut(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'/wallet/exportWithdrawExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
    // await vm.axios.post('/wallet/exportWithdrawExcel',qs.stringify(item),{responseType:'arraybuffer'})
    // .then((res) => {
    //     let data = res.data;
    //     if(res.status ==200 || res.status==201){
    //         key =true;
    //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
    //         let objectUrl = URL.createObjectURL(blob); 
    //         window.location.href = objectUrl; 
    //     }else{
    //         vm.$message({
    //             type:'error',
    //             message:data.message,
    //             duration:1200,
    //         })
    //         key = false;
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    //     vm.$message({
    //         type:'error',
    //         message:vm.$t('info_item.server_error'),
    //         duration:1200,
    //     })
    //     key = false
    // })
    return key;
}

/**
 * 划转导出
 * @param {*} vm 
 * @param {*} item 
 */
async function exportExcelTransferFun(vm,item) {
    let key;
    let url = vm.axios.defaults.baseURL+'/transferInner/getExcel' + '?'
      let param = item
      if(JSON.stringify(param) =='{}'){
        window.open(url)
      }else{
        for (let k in param) url += k + '=' + param[k] + '&'
        console.log(url.substr(0, url.lastIndexOf('&')))
        window.open(url.substr(0, url.lastIndexOf('&')))
      }
    // await vm.axios.post('/transferInner/getExcel',qs.stringify(item),{responseType:'arraybuffer'})
    // .then((res) => {
    //     let data = res.data;
    //     if(res.status ==200 || res.status==201){
    //         key =true;
    //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
    //         let objectUrl = URL.createObjectURL(blob); 
    //         window.location.href = objectUrl; 
    //     }else{
    //         vm.$message({
    //             type:'error',
    //             message:data.message,
    //             duration:1200,
    //         })
    //         key = false;
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    //     vm.$message({
    //         type:'error',
    //         message:vm.$t('info_item.server_error'),
    //         duration:1200,
    //     })
    //     key = false
    // })
    return key;
}

/**
 * 查询待支付订单数量
 * @param {*} vm 
 * @param {*} item 
 */
async function PayInNumFun(vm) {
    let key;
    await vm.axios.post('/payOrder/unPayNum')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 商户资料
 * @param {*} vm 
 * @param {*} item 
 */
async function getMerchantInfo(vm,item) {
    let key;
    await vm.axios.get('/market/userMarketDetail',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取商户广告
 * @param {*} vm 
 * @param {*} item 
 */
async function getMarketMerchant(vm,item) {
    let key;
    await vm.axios.post('/market/userMarketList',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取冲币和提币限额信息
 * @param {*} vm 
 * @param {*} item 
 */
async function getExtractAndDepositLimitFun(vm,item) {
    let key;
    await vm.axios.post('/assetsExtractOrder/getExtractAndDepositLimit',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取提币地址数组
 * @param {*} vm 
 * @param {*} item 
 */
async function assetsExtractAddress(vm,item) {
    let key;
    await vm.axios.post('/assetsExtractAddress/queryExtractAddress',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取资产管理总额
 * @param {*} vm 
 * @param {*} item 
 */
async function getAssetsConvertUsdtAmount(vm,item) {
    let key;
    await vm.axios.post('/assets/getAssetsConvertUsdtAmount',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取socket地址
 */
async function getSocketUrl(vm,item) {
    let key;
    await vm.axios.get('/constant/chat')
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 登录socket
 */
async function loginSocketUrl(vm,url,item) {
    let key;
    await instance.post('/user/login',item)
    .then((res) => {
        // let data = res.data;
        if(res){
            key =  res
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:'登录socket失败，请刷新页面',
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取聊天记录
 * @param {*} vm 
 * @param {*} item 
 */
async function getChatList(vm,item){
    let key;
    await instance.get('/chat/room/message/list',{params:item})
    .then((res) => {
        let data = res.data;
        // console.log(data,'-----------------------')
        key =  data
        // if(res.data.code ==200){
        //     key =  data.data;
        // }else{
        //     vm.$message({
        //         type:'error',
        //         message:data.message,
        //         duration:1200,
        //     })
        //     key = false;
        // }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 发起对话
 */
async function startConnection(vm,item) {
    let key;
    await instance.post('/chat/room',item)
    .then((res) => {
        let data = res.data;
        if(res){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取用户登录状态
 * @param {} vm 
 */
async function getStatus(vm){
    let key;
    await vm.axios.get('/407')
    .then(res => {
        if(res){
            key =  res;
        }else{
            vm.$message({
                type:'error',
                message:res,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:error,
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 系统通知
 * @param {*} vm 
 * @param {*} item 
 */
async function sysTui(vm,item ) {
    let key;
    await instance.post('/chat/room/notice/order',item)
    .then((res) => {
        if(res.status ==200){
            key =  res.data
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 上传聊天图片
 * @param {*} vm 
 * @param {*} item 
 */
async function uploadChatFile(vm,item) {
    let key;
    await instanceFile.post('/chat/room/image/upload',item)
    .then((res) => {
        if(res.status ==200){
            key =  res.data
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 标记已读消息
 * @param {*} vm 
 * @param {*} item 
 */
async function setMarkRead(vm,item) {
    let key;
    await instanceMark.post('/chat/room/message/mark_read',item)
    .then((res) => {
        if(res.status ==200){
            key =  res.data
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取聊天图片
 * @param {*} vm 
 * @param {*} item 
 */
async function getChatImg(vm,item) {
    let key;
    await instance.get('/chat/room/image/download',{params:item})
    .then((res) => {
        let data = res.data;
        
        if(res) {
            key = data
        }else{
            key = false
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 获取订单链接信息
 */
async function getUserByOrder(vm,item) {
    let key;
    await vm.axios.post('/cnyOrder/users',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message || "获取订单交易对象出错",
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 聊天图片
 */
async function chatImg(vm,item) {
    let key;
    await vm.axios.post('/websocket/chat/upload',qs.stringify(item))
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

/**
 * 给表格制作滚动
 * @param {*} vm 
 * @param {*} item 
 */
function initTableHeight(vm,item) {
    if(item) {
        let dom = document.getElementById('adTable')
        dom = document.getElementsByClassName('el-table__body-wrapper')[0]
        dom.classList.add('gundong')
        dom.style.height= `${item}rem`;
        dom.style.overflowY= 'auto';
    }else{
        let dom = document.getElementById('adTable')
        dom = document.getElementsByClassName('el-table__body-wrapper')[0]
        dom.classList.add('gundong')
        dom.style.height= '25rem';
        dom.style.overflowY= 'auto';
    }
}

/**
 * 获取法币实时价格
 * @param {*} vm 
 * @param {*} item 
 */
async function getMarketPrice(vm,item) {
    let key;
    await vm.axios.get('/market/getPrice',{params:item})
    .then((res) => {
        let data = res.data;
        if(res.data.code ==200){
            key =  data.data;
        }else{
            vm.$message({
                type:'error',
                message:data.message,
                duration:1200,
            })
            key = false;
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:vm.$t('info_item.server_error'),
            duration:1200,
        })
        key = false
    })
    return key;
}

export  {
    LoginFun,
    resetPassB,
    RegisterFun,
    SignOut,
    bindOrderFun,
    getLogFun,
    getAdTopFun,
    getcoinTypeIdFun,
    QueryAllAdListFun,
    QueryUserAdListFun,
    QueryQtcTradeFun,
    QueryQtcTradeFunCountry,
    getCurrencyPriceCalcFun,
    legalPurchaseOrderFun,
    legalSaleOrderFun,
    legalOrderFindFun,
    legalOrderListFun,
    getPublishAdParam,
    publishAdFun,
    editAdFun,
    UnAdFun,
    shelfAdFun,
    cancelUnAdPublishFun,
    deleteAdFun,
    initTableHeight,
    listForSysPayWayFun,
    listPayWayFun,
    listPayWayAllFun,
    legalConfrimPay,
    legalCancelOrderFun,
    PayCancelOrderFun,
    legalReleaseOrderFun,
    legalAppealOrderFun,
    legalOrderTradeingFun,
    paymentOrderList,
    PayOrderConfirm,
    legalFeeRate,
    heartB,
    transferFeeFun,
    thirdGetInfo,
    thirdGetInfo2,
    alreadyPayConfirm,
    transferFun,
    getWithdrawList,
    transferInnerFun,
    getExcelLegal,
    getExcelMyLegalOrderList,
    getExcelPay,
    GetOtherInformation,
    exportExcelLegalIn,
    exportExcelLegalOut,
    exportExcelTransferFun,
    PayInNumFun,
    getExtractAndDepositLimitFun,
    assetsExtractAddress,
    bindingPhoneEmailGoogle,
    getSocketUrl,
    loginSocketUrl,//
    startConnection,//
    uploadChatFile,//
    setMarkRead,
    sysTui,
    getChatImg,
    getUserByOrder,
    chatImg,
    getMerchantInfo,
    getMarketMerchant,
    getChatList,
    getMarketPrice,
    getStatus,
    updateTransferStatus,
    updateSearchFun,
    getGiftCrad,
    QueryQtcTradeFunIndex,
    QueryLegalTradeFunIndex,
    priceCalcFunIndex,
    getLang,
    getUnReadOrder,
    agentMerchantList,
    gateWayLegal,
    createGateLegalOrder,
    clientLeaveMessage,
    getAssetsConvertUsdtAmount,
}