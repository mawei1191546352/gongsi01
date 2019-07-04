<template>
    <div class="verification-code">
        <div class="verification-box">
            <div class="code-box">
                <div id="captcha"></div>
                <div id="msg" :class="msgStatus"></div>
            </div>
        </div>
    </div>
</template>

<script>
require('../assets/js/picTest.js')
export default {
    data() {
        return {
            msgStatus:'',
        }
    },
    methods:{
        initFun(){
            let that = this;
            jigsaw.init(
                {
                    el: document.getElementById('captcha'),
                    onSuccess: function() {
                        document.getElementById('msg').innerHTML = '登录成功！'
                        that.msgStatus = "msgSta"
                        this.$store.dispatch('_async_set_verification',true)
                        that.msgStatus = ""
                    },
                onFail: this.cleanMsg,
                onRefresh: this.cleanMsg
            })
        },
        cleanMsg() {
            document.getElementById('msg').innerHTML = ''
        }
    }
}
</script>

<style lang="scss">

</style>
