/**
 * 
 * @param {*总共倒计时} num 
 */
function timer(num) {
    let timerN = this.setInterval(function(){
        if(num==0){
            postMessage(num)
            this.close()
        }else{
            postMessage(--num)
        }

    },1000)
}