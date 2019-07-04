/**
 * 
 * @param {*vue实例} vm 
 * @param {*账号/手机/邮箱} number 
 * @param {*账户类型} accountType 
 * @param {*行为} behaviorType 
 */
function getCode(vm,number,accountType,behaviorType){
    vm.axios.get('/getCode',{
        params:{
            accountType:accountType,
            number:number,
            behaviorType:behaviorType
        }
    })
    .then((res) => {
        if(res.data.code ==200){
            vm.$message({
                type:'success',
                message:'获取验证码成功',
                duration:1200,
            })
            return true;
        }else{
            vm.$message({
                type:'error',
                message:'获取验证码失败',
                duration:1200,
            })
        }
    })
    .catch((error) => {
        console.log(error);
        vm.$message({
            type:'error',
            message:'服务器错误',
            duration:1200,
        })
        return false
    })
}

export default getCode;