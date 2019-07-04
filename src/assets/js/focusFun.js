/**
 * 
 * @param {*vue实例} vm 
 * @param {*传入的所有要被置为false的名称 是个数组} arr 
 */
function focusFun(vm,arr){
    let input  = document.querySelectorAll('input');
    input.forEach(element => {
        element.addEventListener('focus',()=>{
            // vm.info_status = false;
            if(arr){
                arr.forEach(el => {
                    vm[el] = false
                })
            }else{
                vm.info_status = false;
            }
        })
    });
}
export default focusFun