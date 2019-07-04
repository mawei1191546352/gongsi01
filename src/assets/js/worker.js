'use strict'
addEventListener('message',function (event) {
    switch (event.data){
        case 'infinite':
            this.console.log(1)
            let timerA  = setInterval(function(){
                postMessage('0')
            },30000)
            break;
        case 'infinite3':
            this.console.log(4)
            let timerC  = setInterval(function(){
                postMessage('0')
            },3000)
            break;
        case 'close':
            this.console.log(2)
            this.close()
            this.terminate()
            break;
        case 'getOrder':
            postMessage('0')
            let timerB  = setInterval(function(){
                postMessage('0')
            },30000)
            break;
        default:
            this.console.log(3)
            let num = event.data;
            let timerN = this.setInterval(function(){
                if(num==0){
                    postMessage(num)
                    this.close()
                    this.terminate()
                }else{
                    postMessage(--num)
                }

            },1000)
            break
    }
});
