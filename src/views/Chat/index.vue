<template>
    <div class="chat-new">
        <div class="chat-head">
            <h3>{{init_fabi_file.item?init_fabi_file.item.tUsername:''}}</h3>
            <p>({{$t('chat.trade')}} | {{init_fabi_file.item?init_fabi_file.item.monthTradedCount:''}})</p>
        </div>
        <div class="chat-body gundong">
            <div class="chat-remark">
                <p>{{init_fabi_file.otcAdvertisementMessage}}</p>
            </div>
            <div class="chat-list" id="chat-list">
                <li class="date" v-show="this.page>Math.ceil(this.total/this.size)">
                    <span>{{$t('chat.no_more')}}</span>
                </li>
                <!-- <li class="date">
                    <span class="date-span">{{moment().locale('zh-cn').format('YYYY-MM-DD')}}</span>
                </li> -->
                <li v-for="(item,key) in chatArrIn" :key="key" v-show="chat.room_id==item.room_id" :data-time="item.type?item.create_time:''"
                :class="item.content ?item.type?(item.type=='2000'?'tui tui-blue':(
                    item.type=='2101'?'tui tui-blue':(
                        item.type=='2102'?'tui tui-blue':(
                            item.type=='2103'?'tui tui-red':(
                                item.type =='2104'?'tui tui-red':(
                                    item.type=='2105'?'tui tui-black':(
                                        item.type=='2106'?'tui tui-green':(
                                            item.type=='2107'?'tui tui-black':(
                                                item.type=='2108'?'tui tui-black':(
                                                    item.type=='2100'?'tui tui-green':'tui tui-blue'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )):
                (item.content[0].id==chat.id?'send':'receive'):''" 
                :data-id="item.content?(item.content[0].id):''"
                 :data-user="chat.id">
                    <div class="img_rec outer" v-show="item.type?false:item.content ?( item.content[0].id!=chat.id) :true">
                        <img src="" alt="" :data-name="init_fabi_file.item?init_fabi_file.item.tUsername[0]:''">
                    </div>
                    <div v-show="!item.type" class="" 
                    :class="item.content? (item.content[0].id==chat.id? 'text-send':'text-receive'):''" 
                    :data-time='item.content?(item.content[0].time):""'>
                        <p>
                            <!-- +"."+ item.content[0].filename -->
                            <!-- <a :href='"/websocket/chat/room/image/download?filename=" +item.content?( item.content[0].message):""'
                            > -->
                            <!-- </a> -->
                            <img 
                            class="noclick"
                            v-show="item.content? item.content[0].type=='img':false"
                            :src='"/websocket/chat/room/image/download?filename="+(item.content ?item.content[0].message :"")' 
                            @click="setImgFun"
                            @error="errorImg"
                            alt="">
                            <span v-if="item.content? item.content[0].type!='img':false">{{item.content ?item.content[0].message :''}}</span>
                        </p>
                    </div>
                    <p v-show="item.type">
                        {{item.content}}
                    </p>
                </li>
            </div>
        </div>
        <div class="chat-input">
            <div
                id="editor"
                class="editor"
                contenteditable="true"
                ref="editor"
                @keyup="getCursor"
                @keydown.enter.prevent="submit"
                @paste.prevent="onPaste"
                @click="getCursor">
            </div>
        </div>
        <div class="chat-button">
            <div class="icon-button" @click="doGet"><input @change="getFile" ref="input" type="file" accept="image/*"><img src="../../assets/images/chat/icon_pic.png" alt=""> {{$t('chat.pic')}}</div>
            <div class="send-button" @click="submit()">{{$t('chat.enter')}}</div>
        </div>
        <div class="show_img" v-show="setImgShow">
            <img :src="setImg" alt="" ref="imgTe">
        </div>
    </div>
</template>

<script>
import {getSocketUrl,startConnection,
uploadChatFile ,getChatList,
getChatImg,sysTui} from '../../assets/js/api'
import paste from './paste'
export default {
    data() {
        return {
            socketUrl:'',
            room_id:null,

            editor: null,
            cursorPosition:0,
            e:null,
            chatWindow:null,
            total:0,
            allPage:1,
            page:1,
            size:20,
            scrollTop:0,
            setImg:'',
            setImgShow:true,

        }
    },
    computed:{
        init_fabi_file(){
            return this.$store.getters.init_fabi_file;
        },
        user_info(){
            return this.$store.getters.user_info
        },
        chat(){
            return this.$store.getters.chat;
        },
        chatArrIn(){
            return this.$store.getters.chatArrIn;
        }
    },
    created() {
        this.$store.dispatch('_async_rest_chatArrIn')
    },
    watch:{
        token: function(n,o) {
        if(n && n!= o){
            // this.init()
        }
        console.log('次数')
        },
        chat: function (n,o) {
            this.$store.dispatch('_async_rest_chatArrIn')
            this.page = 1;
        },
        chatArrIn(){
            this.moveFun(false)
        },
        init_fabi_file(n,o){
            console.log(n,'//////////////////////////////////',o)
            this.page = 1;
            let time = setTimeout( async()=>{
                await this.startChat()
                    clearTimeout(time)
            },1000)
            
        }
    },
    
    async mounted() {
        this.editor = this.$refs['editor']
        // await this.startChat()
        
        
        let time = setTimeout( async()=>{
        // await this.startChat()
            clearTimeout(time)
        },500)
        // let time2 = setTimeout( async()=>{
        //     // location.reload()
        //     await this.getList()
        //     this.moveFun(false)
        //     this.getInfo()
        //     clearTimeout(time2)
        // },500)
        
        
    },
    updated(){
        // this.moveFun(false)
    },
    beforeDestroy(){
        
    },
    methods:{
        errorImg(e){
            // console.log(e)
            // e.target.src = '../../assets/images/legal-currency/tu.gif'
        },
        setImgFun(e){
            let dom = e.currentTarget
            let imgT = this.$refs.imgTe
            this.setImg = dom.src
            document.addEventListener('click', (e) => {
                let items = document.querySelectorAll('.noclick')
                if(e.target!= imgT) {
                    let b;
                    if(items) {
                        items = Array.from(items);
                        b = items.find(function(value,index,arr){
                            return value == e.target
                        })
                        if(b){

                        }else{
                            this.setImg = ''
                        }
                    }
                }
            })
        },
        getInfo(){
            let dom = document.querySelector('.chat-body');
            dom.addEventListener('scroll',async res => {
                // console.log(dom.scrollTop)
                this.scrollTop = dom.scrollTop;
                if(dom.scrollTop==0){
                    this.page = Number(this.page)+1
                    if(this.page>Math.ceil(this.total/this.size)){
                        return false
                    }
                    let key = await getChatList(this,{
                        room_id:this.chat.room_id,
                        page:this.page,
                        size:this.size,
                        unread:0,
                        reversed:1,
                    }).then(res => {
                        return res
                    })
                    if(key != false) {
                        console.log(key,'列表-----')
                        this.$store.dispatch('_async_chatArrIn_before',key.items)
                        this.total = key.total
                        this.$nextTick(()=>{
                            dom.scrollTop = this.scrollTop
                        })
                    }
                }
            },true)
        },
        moveFun(status){
            this.$nextTick(()=>{
                var box = document.querySelector('.chat-body'),
                targetElm = document.querySelectorAll('.chat-body li:last-child')[0];
                 
                if(status) {
                    this.scrollToElm( box, targetElm , 600 );
                }else{
                    let d = this.$el.querySelector('.chat-body')
                    this.$nextTick(()=>{
                        var box = document.querySelector('.chat-body');
                        if(this.page==1){
                            document.querySelector('.chat-body').scrollTop = d.scrollHeight
                        }else{
                            document.querySelector('.chat-body').scrollTop = this.scrollTop
                        }
                    })
                }
            })
        },
        scrollTo(element, to, duration, onDone) {
            let that = this;
            function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t }
            var start = element.scrollTop,
                change = to - start,
                startTime = performance.now(),
                val, now, elapsed, t;

            function animateScroll(){
                now = performance.now();
                elapsed = (now - startTime)/1000;
                t = (elapsed/duration);
                that.$nextTick(()=>{
                    element.scrollTop = start + change * easeInOutQuad(t);
                })
                if( t < 1 )
                    window.requestAnimationFrame(animateScroll);
                else
                    onDone && onDone();
            };

            animateScroll();
        },
        getRelativePos(elm){
            console.log(elm,elm.parentNode)
            var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
                cPos = elm.getBoundingClientRect(), // target pos
                pos = {};

            pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
            pos.right  = cPos.right  - pPos.right,
            pos.bottom = cPos.bottom - pPos.bottom,
            pos.left   = cPos.left   - pPos.left;

            return pos;
        },
        // 滚动
         scrollToElm(container, elm, duration){
            var pos = this.getRelativePos(elm);
            this.scrollTo( container, pos.top , 2);  // duration in seconds
        },
        async getSys(){
            let key = await sysTui(this)
            .then(res => {
                return res
            })
            if(key != false) {
                console.log('系统通知',key)
            }
        },
        async getImg(name) {
            let key = await getChatImg(this,{
                filename:name
            }).then((res) => {
                return false;
            })
            if(key != false) {
                console.log(key,'tttttttttttttttttttttttt')
            }
        },
        scrollToBottom(){
            this.chatWindow = document.getElementById('chat-list')
            let isScrolledToBottom =
                this.chatWindow.scrollHeight - this.chatWindow.clientHeight <=
                this.chatWindow.scrollTop + 1;
            if (!isScrolledToBottom){
                this.chatWindow.scrollTo({
                    top: this.chatWindow.scrollHeight,
                    behavior: "smooth"
                });
                console.log('执行了')
            }
                
        },
        async getList(){
            let key = await getChatList(this,{
                room_id:this.chat.room_id,
                page:this.page,
                size:this.size,
                unread:0,
                reversed:1,
            }).then(res => {
                return res
            })
            if(key != false) {
                console.log(key,'获取聊天列表-----room_id:',this.chat.room_id,'此操作后台会默认设置所有消息已读')
                this.$store.dispatch('_async_chatArrIn',key.items)
                this.total = key.total
                this.moveFun(false)
            }
        },
        async submit (e) {
            // console.log(e,'eeeeeeeeee')
            // if(e == undefined){
            //     e = this.e
            // }else{
            //     this.e = e;
            // }
            await this.send(e)
            // const value = e.target.innerHTML.replace(/[\n\r]$/, '')
            // if (value) {
            //     console.info('Submit text', { value })
            //     e.target.innerText = ''
            // }
        },
        /**
         * 获取光标位置
         * @param {DOMElement} element 输入框的dom节点
         * @return {Number} 光标位置
         */
        getCursorPosition (element) {
            let caretOffset = 0
            if(element.ownerDocument){
                const doc = element.ownerDocument || element.document
                const win = doc.defaultView || doc.parentWindow
                const sel = win.getSelection()
                if (sel.rangeCount > 0) {
                    const range = win.getSelection().getRangeAt(0)
                    const preCaretRange = range.cloneRange()
                    preCaretRange.selectNodeContents(element)
                    preCaretRange.setEnd(range.endContainer, range.endOffset)
                    caretOffset = preCaretRange.toString().length
                }
                return caretOffset
            }
            
        },

        /**
         * 设置光标位置
         * @para、·  {DOMElement} element 输入框的dom节点n+

         */
        setCursorPosition (element, cursorPosition) {
            const range = document.createRange()
            range.setStart(element.firstChild, cursorPosition)
            range.setEnd(element.firstChild, cursorPosition)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        },
        async onPaste (e) {
            this.e = e;
            const result = await paste(e)
            const imgRegx = /^data:image\/png;base64,/
            console.log(result,'===========================')
            if (imgRegx.test(result)) {
                // const sel = window.getSelection()
                // if (sel && sel.rangeCount === 1 && sel.isCollapsed) {
                //   const range = sel.getRangeAt(0)
                //   const img = new Image()
                //   img.src = result
                //   range.insertNode(img)
                //   range.collapse(false)
                //   sel.removeAllRanges()
                //   sel.addRange(range)
                // }

                document.execCommand('insertImage', false, result)
            } else {
                document.execCommand('insertText', false, result)
            }
        },
        getCursor (e) {
            this.e = e;
            this.cursorPosition = this.getCursorPosition(this.$refs.editor)
        },
        doGet(){
            (this.$refs.input).click();
        },
        async startChat(){
            let that = this;
            await this.$parent.$parent.socket.emit('create_room',{
                order_id:this.init_fabi_file.id,
            },async (res)=> {
                // that.room_id = res.data.room_id
                that.$store.dispatch('_async_chat',{
                    merchantName:this.init_fabi_file?this.init_fabi_file.item.tUsername?this.init_fabi_file.item.tUsername:'':'',
                    room_id:res?res.data.room_id:22,
                    monthTradedRate:this.init_fabi_file?this.init_fabi_file.item.monthTradedRate:'',//30日成交数
                    remark:this.init_fabi_file?this.init_fabi_file.item.remark:'',
                    page:1,
                    size:20,
                    unread:0,
                    id:that.user_info.userId,
                })
                console.log(res,'新的发起对话',this.chat)
                this.$store.dispatch('_async_rest_chatArrIn')
                this.getList()
            })
            
        },
        convertBase64UrlToBlob(urlData){
    
            var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
            
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob( [ab] , {type : 'image/png'});
        },
        async send(e){
            let that = this;
            let editor = e = this.$refs.editor;
            let text = editor.innerText
            let dom = Array.from(editor.children);
            // console.log('输入框中得内容',dom)
            // console.log('输入框中得内容-----------',text,text=='')
            if(dom.length>0){
                for(let i=0;i<dom.length;i++) {
                    let d = dom[i]
                    let formData = new FormData(); 
                    formData.append('image', this.convertBase64UrlToBlob(d.src));
                    let config = {
                        headers:{'Content-Type':'multipart/form-data;charset=UTF-8'}
                    };
                    let key = await uploadChatFile(this,formData)
                    .then(res => {
                        return res;
                    })
                    if(key!=false) {
                        this.$parent.$parent.socket.emit("chat_message", {
                            room_id:that.chat.room_id, 
                            content:[
                                {
                                    type:'img',
                                    filename:d.title.split('.')[d.title.split('.').length - 1],
                                    message:key.filename,
                                    img:'',
                                    id:that.user_info.userId,
                                    time:that.moment().locale('zh-cn').format('HH:mm:ss'),
                                    date:that.moment().locale('zh-cn').format('YYYY-MM-DD'),
                                }
                            ], 
                            amountCny: this.init_fabi_file.amountCny,
                            id : this.init_fabi_file.id,
                            tradeCoinType: this.init_fabi_file.tradeCoinType,
                            role : this.init_fabi_file.role,
                            coinType :this.init_fabi_file.coinType,
                            tUsername : this.init_fabi_file.item?this.init_fabi_file.item.tUsername:'',
                            user_id:this.user_info.userId,
                            user_name:this.user_info.username,
                        }, res => {

                        })
                    }else{
                        this.$message({
                            type:'error',
                            message:'图片上传失败'
                        })
                    }
                }
            }
            if(text!='') {
                this.$parent.$parent.socket.emit("chat_message", {
                    room_id:that.chat.room_id, 
                    content:[
                        {
                            type:'string',
                            message:text,
                            img:'',
                            id:that.user_info.userId,
                            time:that.moment().locale('zh-cn').format('HH:mm:ss'),
                            date:that.moment().locale('zh-cn').format('YYYY-MM-DD'),
                        }
                    ], 
                    amountCny: this.init_fabi_file.amountCny,
                    id : this.init_fabi_file.id,
                    tradeCoinType: this.init_fabi_file.tradeCoinType,
                    role : this.init_fabi_file.role,
                    coinType :this.init_fabi_file.coinType,
                    tUsername : this.init_fabi_file.item?this.init_fabi_file.item.tUsername:'',
                    user_id:this.user_info.userId,
                    user_name:this.user_info.username,
                }, res => {
                    // console.log(res,'消息后')
                })
            }
            console.log('：发：',this.moment().locale('zh-cn').format('HH:mm:ss'))
             editor.innerHTML = ''
            // const value = editor.innerHTML.replace(/[\n\r]$/, '')
            // if (value) {
            //     console.info('Submit text', { value })
            //     e.target.innerText = ''
            // }
            
            
        },
        async getFile(){
            let that =this;
            let obj_img=document.createElement("img");
            // 
            let editor = document.getElementById('editor');
            let file = this.file = this.$refs.input.files[0];
            if (!/image\/\w+/.test(file.type)) {
                this.$message({
                    type:'error',
                    message:"不支持的图片格式"
                })
                return false;
            }
            console.log('shang--------tupian--',this.file)
            let reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.addEventListener("load", function () {
                var image = new Image();
                image.height = 40;
                image.title = file.name;
                image.src = this.result;
                editor.appendChild( image );
            }, false);
            this.$refs.input.value=''
            // console.log('shang--------reader--',reader)
            // let formData = new FormData(); 
            // formData.append('image', this.file);
            // let config = {
            //     headers:{'Content-Type':'multipart/form-data;charset=UTF-8'}
            // };
            
        },
        sendFun(){

        }
    },
}
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_965823_0h4ivembfcvu.css');
$bl-clor:#333333FF;
$gr-color:#666666FF;
$remark-color:#CEDBF0;
$font-color:#FFFFFFFF;
$obj-color:rgba(255,255,255,1);
$tui-color:#7CA0D6FF;
$time-color:#999999FF;
$icon-button:#5C89CCFF;
$send-button:#4C6085FF;
$border-color:#CCCCCCFF;
$tui-blue:#7CA0D6;
$tui-red:#D55457;
$tui-black:#333333;
$tui-green:#229C89;
.chat-new{
    width: 100%;
    display: flex;
    flex-direction: column;
    .chat-head{
        display: flex;
        flex-direction: column;
        height: 4rem;
        align-content: center;
        justify-content: center;
        h3{
            flex: 1;
            color:$bl-clor!important;
            font-size: 24px!important;
            font-weight: bold!important;
            padding: 0!important;
            border: 0!important;
            text-align: center;
        }
        p{
            flex: 1;
            text-align: center;
            color:$gr-color;
            font-size: 12px;
        }
    }
    .chat-body{
        width: 100%;
        overflow: auto;
        overflow-x: hidden;
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        // flex: 1;
        height: 28rem;
        height: 33rem;
        display: flex;
        flex-direction: column;
        background: white;
        .chat-remark{
            // height: 1.5rem;
            background: $remark-color;
            display: flex;
            justify-content: flex-start;
            p{
                box-sizing: border-box;
                padding-left: 1rem;
                flex: 1;
                color:$gr-color;
                line-height: 1.2rem /* 24/20 */;
                display: flex;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
                font-size: 14px;
            }
            line-height: 30px;
        }
        .chat-list{
            flex:1;
            background: white;
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            li{
                width: 100%;
                box-sizing: border-box;
                padding-left: .4rem;
                padding-right: .4rem;
                // margin: 1rem 0;
            }
            .date{
                // display: flex;
                justify-content: center;
                text-align: center;
                color:$gr-color;
                font-size: 14px;
                line-height: 28px;
            }
            .receive{
                position: relative;
                // display: flex;
                // flex-direction: row;
                // justify-content: flex-start;
                margin: .5rem 0;
                .img_rec{
                    width: 1.5rem;
                    height: 100%;
                    float: left;
                    display: flex;
                    align-items: center;
                    margin-right: .5rem;
                    img{
                        display: block;
                        width: 1.5rem /* 30/20 */;
                        height: 1.5rem;
                        background: $send-button;
                        border-radius: 50%;
                        position: absolute;
                        z-index: 5000;
                        position: relative;
                    }
                    img::after{
                        position: absolute;
                        content: attr( data-name);
                        width: 1.5rem;
                        height: 1.5rem;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color:white;
                    }
                }
                .text-receive{
                    float: left;
                    // width: 88%;
                    max-width: 88%;
                    position: relative;
                    // margin-left: .5rem;
                    background:rgba(230,230,230,1);
                    // border-top-left-radius: 10px;
                    // border-top-right-radius: 10px;
                    // border-bottom-right-radius: 10px;
                    border-radius: 10px;
                    box-sizing:border-box;
                    padding: .4rem .6rem;
                    padding-left: .7rem;
                    // display: flex;
                    display: block;
                    // justify-content: center;
                    // align-items: center;
                    // margin-left: 40px;
                    p{
                        // width:166px;
                        // height:30px;
                        line-height: 22px;
                        color:$gr-color;
                        font-size: 14px;
                       img{
                           width: 2.5rem /* 50/20 */;
                           height: 2rem;
                           cursor: pointer;
                       }
                    }
                    
                }
                .text-receive::after{
                    content: attr( data-time );
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    color:$time-color;
                    font-size: 10px;
                    transform: translateY(100%)
                }
                // .text-receive::before{
                //     position: absolute;
                //     content: '';
                //     width: 0;
                //     height: 0;
                //     bottom: 0;
                //     left: -.7rem;
                //     border-bottom: 15px solid rgba(230,230,230,1);
                //     border-left: 20px solid transparent; 
                // }
            }
            // .receive::before{
            //     position: absolute;
            //     content: '';
            //     width: 1rem;
            //     height: 1rem;
            //     bottom: 0;
            //     left: .85rem /* 15/20 */;
            //     z-index: 1;
            //     border-radius: 50%;
            //     background: white;
            //     transform:  rotate(206deg);
            // }
            .send{
                position: relative;
                // display: flex;
                justify-content: flex-end;
                text-align: right;
                margin: .5rem 0;
                .text-send{
                    position: relative;
                    margin-left: .3rem;
                    background:$gr-color;
                    // border-top-left-radius: 10px;
                    // border-top-right-radius: 10px;
                    // border-bottom-left-radius: 10px;
                    border-radius: 10px;
                    // box-sizing: border-box;
                    display: flex;
                    display: inline-block;
                    justify-content: center;
                    align-items: center;
                    padding: .5rem .6rem;
                    padding-left: .7rem;
                    p{
                        // width:166px;
                        // height:30px;
                        line-height: 22px;
                        color:$font-color;
                        font-size: 14px;
                        text-align: left;
                       img{
                           width: 2.5rem /* 50/20 */;
                           height: 2rem;
                           cursor: pointer;
                       }
                    }
                }
                .text-send::after{
                    content: attr( data-time );
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    color:$time-color;
                    font-size: 10px;
                    transform: translateY(100%)
                }
                // .text-send::before{
                //     position: absolute;
                //     content: '';
                //     width: 0;
                //     height: 0;
                //     bottom: 0;
                //     right: -20px;
                //     border-bottom: 20px solid $gr-color;
                //     border-right: 20px solid transparent; 
                // }
                
            }
            // .send::after{
            //     position: absolute;
            //     content: '';
            //     width: 2rem;
            //     width: 1rem;
            //     height: 2.6rem;
            //     height: 1.6rem;
            //     bottom: 0rem;
            //     // right: -1.2rem;
            //     border-radius: 50%;
            //     background: white;
            // }
            .tui{
                margin: .8rem 0;
                box-sizing: border-box;
                padding: .8rem .3rem;
                position: relative;
                // background: $tui-color;
                color:$font-color;
                font-size: 14px;
                line-height: 22px;
            }
            .tui.tui-blue{
                background: $tui-blue;
            }
            .tui.tui-black{
                background: $tui-black;
            }
            .tui.tui-green{
                background: $tui-green;
            }
            .tui.tui-red{
                background: $tui-red;
            }
            .tui::after{
                content: attr( data-time );
                position: absolute;
                bottom: 0;
                left: 1rem;
                color:$time-color;
                font-size: 10px;
                transform: translateY(80%)
            }
        }
    }
    .chat-input{
        display: flex;
        height: 4rem;
        justify-content: center;
        align-items: center;
        margin: .7rem 0 .5rem 0;
        textarea{
            width:420px;
            height:80px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(204,204,204,1);
            border-radius:3px;
            resize: none;
            overflow:hidden
        }
        .editor{
            width:420px;
            height:80px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(204,204,204,1);
            border-radius:3px;
            resize: none;
            overflow:hidden
        }
    }
    .chat-button{
        height: 1.5rem;
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: .5rem;
        color:$font-color;
        font-size: 14px;
        margin-bottom: .5rem;
        .icon-button{
            width:80px;
            height:30px;
            background:$icon-button;
            border-radius:2px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            input{
                position: absolute;
                left: 0;
                bottom: 10000000000000rem;
                z-index: -2000000;
            }
            img{
                margin-right: .3rem;
            }
            cursor: pointer;
        }
        .send-button{
            width:80px;
            height:30px;
            background:$send-button;
            border-radius:2px;
            margin-left: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
    .show_img{
        position: fixed;
        z-index: inherit;
        top: 50%;
        left: 50%;
        
        // width: 15rem /* 300/20 */;
        // height: 10rem /* 200/20 */;
        background: white;
        transform: translateX(-50%) translateY(-50%);
        box-shadow: 0 0 10px gray;
        img{
            max-width: 50rem /* 500/20 */;
            max-height: 32rem /* 400/20 */;
        }
    }
}
</style>
