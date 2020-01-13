<template>
    <div class="third">
        <div class="third-header">
            <div class="banxin">
                <img src="../../assets/images/nav-bar/2nav-logo@2x.png" alt="">
                <!-- <div class="sw" v-show="init_pay_file.payVersion==2 && init_pay_file.type!=0"> -->
                <div class="sw" v-show="init_pay_file.payVersion==2 ">
                    <span :class="swA=='ch'?'ac':'no'" @click="swA='ch'">中文</span>
                    <span :class="swA=='en'?'ac':'no'" @click="swA='en'">English</span>
                </div>
            </div>
        </div>
        <div class="body" v-show="init_pay_file.payVersion==1 ?true:init_pay_file.type==0" :class="init_pay_file.payVersion=='1'?'bd1':(active==1?'bd2_ac1':(active==2?'bd2_ac2':'bd2_ac3'))">
            <div class="banxin">
                <p class="border"
                    v-show="(init_pay_file.payVersion=='1' && active!=3) ? true :false"
                >您的订单在 <i style="color:rgba(76, 96, 133, 1);">{{fortmatTime(time)}}</i> 内未付款将被关闭，请尽快完成付款</p>
                <div class="c2"
                v-show="(init_pay_file.payVersion=='2' && active!=3) ? true :false"
                :class="active==1?'c21 '+swA:(active==2?'c22 '+swA:(active==3?'c22 '+swA:'c22 '+swA))">
                    <p class="c2one setColor"> <i class="num setColor">1</i> {{center_language[swA].nav_1}}</p>
                    <p class="c2one" :class="active>=2?'setColor':''"> <i class="num" :class="active>=2?'setColor':''">2</i> {{center_language[swA].nav_2}}</p>
                    <p class="c2one" :class="active>=3?'setColor':''"> <i class="num" :class="active>=3?'setColor':''">3</i> {{center_language[swA].nav_3}}</p>
                    <p class="c2two"> <i class="el-icon-time"></i> <span>{{center_language[swA].nav_4}}：</span><span class="time">{{fortmatTime(time)}}</span></p>
                </div>
                <div class="shangjia"
                    v-show="init_pay_file.payVersion=='1'"
                >
                    <span class="span-p">商家名：{{obj.merchantName}}</span><br>
                    <span class="span-p">付款：
                        <i style="color:rgba(76, 96, 133, 1);">{{obj.amount}} </i> 
                        <i style="color:rgba(76, 96, 133, 1);">{{coinType[init_pay_file.coinType]}} -> </i>
                        <i style="color:rgba(76, 96, 133, 1);">{{init_pay_file.amountUsd}} USD</i></span>
                    <div class="box">
                        <div class="box-one le">
                            <h3 class="le">有ZHIMA PAY账户</h3>
                            <span class="le" @click="goSignIn">直接登录</span>
                        </div>
                        <div class="box-one ri">
                            <h3 class="ri">没有ZHIMA PAY账户</h3>
                            <span class="ri" @click="goRegister">立即注册</span>
                        </div>
                    </div>
                </div>
                <div class="shangjia2"
                    v-show="init_pay_file.payVersion=='2'"
                >
                    <div class="box2"
                        v-show="active==1"
                    >   
                        <div class="llef">
                            <span class="span-p">{{center_language[swA].marketName}}：{{init_pay_file.merchantName}}</span>
                            <div class="set">
                                <div class="lleft_left">
                                    <div class="jine border">
                                        <span>{{center_language[swA].num_cny}}：</span>
                                        <span class="num">{{init_pay_file.amountCny}} CNY</span>
                                    </div>
                                    
                                    <div class="one_jin one_jin_h border">
                                        <span>{{center_language[swA].num_amount}}：</span>
                                        <div>
                                            <span>{{init_pay_file.amount}} </span> <span>{{init_pay_file.coinType.toUpperCase()}}</span>
                                        </div>
                                    </div>
                                    <p class="box2_p one_jin">
                                        <span class="bboc">{{center_language[swA].pw}}:</span>
                                        <el-checkbox-group 
                                            v-model="payListCheck"
                                            :min="1"
                                            :max="1">
                                            <el-checkbox v-for="city in payList" :label="city" :key="city">{{swA =='en'?center_language[swA].bank:city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </p>
                                </div>
                                <div class="set_center"></div>
                                <div class="lleft_right">
                                    <div class="infor">
                                        <img src="../../assets/images/third/re.png" alt="">
                                        <div>
                                            <h3 v-show="swA=='ch'">支持<span class="bold">100万CNY</span>以内的超大额转账</h3>
                                            <h3 v-show="swA=='en'" style="font-size:1rem;">{{center_language[swA].support}}</h3>
                                            <span class="info_time" style="font-size:12px;">（{{center_language[swA].do_time}}）</span>
                                        </div>
                                    </div>
                                    <div class="input">
                                        <div>
                                            <span class="name">{{center_language[swA].input_name}}：</span><span class="name_info">({{center_language[swA].place_input}})</span>
                                        </div>
                                        <input type="text" v-model="tName" :placeholder='center_language[swA].placeholder'>
                                    </div>
                                    <p class="p_button">
                                        <button @click="createPay()">{{center_language[swA].next}}</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box22"
                        v-show="active==1" 
                    > 
                        <div class="text_info_te"
                            v-show="active==1"
                        >
                            <p v-show="swA=='ch'">1、<i>请勿</i>使用微信和支付宝进行转账，否则将<i >不会到账。</i></p>
                            <p v-show="swA=='ch'">2、请保证<i >付款账户信息与填写的银行卡持有人姓名一致；</i></p>  
                            <p v-show="swA=='ch'">3、请保证<i >实际转账金额与输入的金额一致</i></p>
                            <p v-show="swA=='ch'">银行工作时间为周一至周五9:00~17:00，非工作时间的大额转账可能<i >延迟到账</i>，节假日规则以各银行公告为准。</p>
                            <p v-show="swA=='en'">{{center_language[swA].text_3}}</p>
                            <p v-show="swA=='en'">{{center_language[swA].text_1}}</p>
                            <p v-show="swA=='en'">{{center_language[swA].text_2}}</p>
                            <p v-show="swA=='en'">{{center_language[swA].text_4}}</p>
                        </div>
                        
                    </div>
                    <div class="box23"
                        v-show="active==2"
                    >
                        <div class="box23_left">
                            <div class="bo">
                                <div class="to">
                                    <div class="border">
                                        <span>{{center_language[swA].num_cny}}：</span><span class="num">{{step2File==null?"":step2File.amountCny}}CNY</span>
                                    </div>
                                    <div class="info">
                                        <span>{{center_language[swA].info_1}} {{step2File?step2File.coinType.toUpperCase():''}} {{center_language[swA].info_2}}。</span>
                                    </div>
                                    <div class="border">
                                        <span>{{center_language[swA].done_pw}}：</span>
                                        <el-checkbox-group 
                                                v-model="payListCheck"
                                                :min="1"
                                                :max="1">
                                                <el-checkbox v-for="city in payList" :label="city" :key="city">{{swA=='en'?center_language[swA].bank:city}}</el-checkbox>
                                            </el-checkbox-group>
                                    </div>
                                    <div class="one2_te">
                                        <span>{{center_language[swA].bank_user}}：</span><span>{{step2File==null?"":step2File.payOrderRealName}}</span>
                                    </div>
                                </div>
                                <div class="bot">
                                    <img src="../../assets/images/third/box23.png" alt="">
                                    <span :class="swA">{{center_language[swA].info2}}</span>
                                </div>
                            </div>
                            <div class="box23_center"></div>
                            <div class="bb">
                                <div class="to">
                                    <div class="one2">
                                        <span>{{center_language[swA].shou_name}}</span>
                                        <div>
                                            <span>{{step2File==null?"":step2File.adReceiptWay.name}}</span>
                                            <span class="cp tag-read" :data-clipboard-text="step2File==null?'':step2File.adReceiptWay.name" @click="copyAddressFun()">{{center_language[swA].cp}}</span>
                                        </div>
                                    </div>
                                    <div class="one2">
                                        <span>{{center_language[swA].bank_info}}</span>
                                        <div>
                                            <span>
                                                {{step2File==null?"":step2File.adReceiptWay.bankAccount}} {{step2File==null?"":step2File.adReceiptWay.branchAccount}}
                                            </span>
                                            <span class="cp tag-read" :data-clipboard-text="step2File==null?'':step2File.adReceiptWay.bankAccount+' '+(step2File==null?'':step2File.adReceiptWay.branchAccount)" @click="copyAddressFun()">{{center_language[swA].cp}}</span>
                                        </div>
                                    </div>
                                    <div class="one2">
                                        <span>{{center_language[swA].bank_num}}</span>
                                        <div>
                                            <span>{{step2File==null?"":step2File.adReceiptWay.bankCardNumber}}</span>
                                            <span class="cp tag-read" :data-clipboard-text="step2File==null?'':step2File.adReceiptWay.bankCardNumber"
                                            @click="copyAddressFun()"
                                            >{{center_language[swA].cp}}</span>
                                        </div>
                                    </div>
                                    <div class="one2" style="border:0px;">
                                        <span>{{center_language[swA].remark}}<i v-show="swA=='ch'" style="color:#E36A6A;font-size:14px;">{{center_language[swA].remark2}}</i></span>
                                        <div>
                                            <span style="color:#F34949;">{{step2File==null?"":step2File.referenceCode}}</span>
                                            <span class="cp tag-read"
                                            :data-clipboard-text="step2File==null?'':step2File.referenceCode"
                                            @click="copyAddressFun()"
                                            >{{center_language[swA].cp}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bot">
                                    <div class="but">
                                        <button class="nor" @click="active=1;next1=true;">{{center_language[swA].pre}}</button>
                                        <button @click="alreadyPay()" class="old_pay">{{center_language[swA].done}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box22 padd"
                        v-show="active==2" 
                    > 
                        <div class="text_info_te padd"
                            v-show="active==2"
                        >
                            <p v-show="swA=='ch'">1、转账时 <i >请勿备注</i> “比特币”、“虚拟币”“USDT”等信息，否则交易可能被拒绝；</p>  
                            <p v-show="swA=='ch'">2、转账时除了备注付款号之外<i>不要备注任何其它信息</i>；</p>
                            <p v-show="swA=='ch'">3、转账后请务 <i >必点击“已付款”</i>；</p>
                            <p v-show="swA=='en'">{{center_language[swA].rm4}}</p>
                            <p v-show="swA=='en'">{{center_language[swA].rm5}}</p>
                            <p v-show="swA=='en'">{{center_language[swA].rm6}}</p>
                        </div>
                    </div>
                    <div class="box33"
                        v-show="active==3"
                    >
                        <div class="title">
                            <img src="../../assets/images/third/refr@2x.png" alt="">
                            <span>{{center_language[swA].submit}}</span>
                        </div>
                        <div class="t_b">
                            <p>{{center_language[swA].ok1}}</p>
                            <p v-show="swA=='ch'">订单已开始处理，预计到账 时间： <span>15分钟</span></p>
                            <p class="s" v-show="swA=='en'">{{center_language[swA].ok2}}</p>
                            <p class="s">
                            {{center_language[swA].ok3}}
                            </p>
                            <p style="height:3rem;">
                                <button @click="goThird" :class="swA">{{center_language[swA].back}}</button>
                            </p>
                        </div>
                    </div>
                    
                    <div class="bank_list"
                        v-show="active==2"
                    >
                        <h3 class="h3_border" :class="swA">{{center_language[swA].ban_list}}</h3>
                        <p v-show="active==2" class="bank" style="box-sizing:border-box;">
                            <a href="https://ebsnew.boc.cn/boc15/login.html" target="_Blank"><img src="../../assets/images/bank/zgbank.png" alt=""></a>
                            <a href="https://perbank.abchina.com/EbankSite/startup.do?r=3B61B6CC10EB44EA" target="_Blank"><img src="../../assets/images/bank/nybank.png" alt=""></a>
                            <a href="https://mybank.icbc.com.cn/icbc/newperbank/perbank3/frame/frame_index.jsp" target="_Blank"><img src="../../assets/images/bank/gsbank.png" alt=""></a>
                            <a href="http://www.ccb.com/cn/ebank/wsyh_products_list.html" target="_Blank"><img src="../../assets/images/bank/jsbank.png" alt=""></a>
                            <a href="http://www.bankcomm.com/BankCommSite/default.shtml" target="_Blank"><img src="../../assets/images/bank/jtbank.png" alt=""></a>
                        </p>
                        <p v-show="active==2" class="bank bank2" style="box-sizing:border-box;">
                            <a href="http://www.cmbchina.com/personal/netbank/" target="_Blank"><img src="../../assets/images/bank/zsbank.png" alt=""></a>
                            <a href="https://bank.pingan.com.cn/m/main/index.html" target="_Blank"><img src="../../assets/images/bank/pabank.png" alt=""></a>
                            <a href="https://i.bank.ecitic.com/perbank6/signIn.do" target="_Blank"><img src="../../assets/images/bank/zxbank.png" alt=""></a>
                            <a href="http://www.spdb.com.cn/" target="_Blank"><img src="../../assets/images/bank/pfbank.png" alt=""></a>
                            <a href="http://www.cgbchina.com.cn/" target="_Blank"><img src="../../assets/images/bank/gfbank.png" alt=""></a>
                        </p>
                        <p v-show="active==2" class="bank bank2" style="box-sizing:border-box;">
                            <a href="http://www.psbc.com/cn/index.html" target="_Blank"><img src="../../assets/images/bank/yzbank.png" alt=""></a>
                            <a href="https://nper.cmbc.com.cn/pweb/static/login.html" target="_Blank"><img src="../../assets/images/bank/msbank.png" alt=""></a>
                            <a href="https://personalbank.cib.com.cn/pers/main/login.do" target="_Blank"><img src="../../assets/images/bank/xybank.png" alt=""></a>
                            <a href="http://ebank.cebbank.com/" target="_Blank"><img src="../../assets/images/bank/gdbank.png" alt=""></a>
                            <a href="http://www.hxb.com.cn/wydl/index.shtml" target="_Blank"><img src="../../assets/images/bank/hxbank.png" alt=""></a>
                        </p>
                    </div>
                    <div class="baozhang"
                        v-show="active=='1' || active =='2'"
                    >
                        <div class="fourth">
                            <div class="f_one">
                            <img src="../../assets/images/third/pai@2x.png" alt="">
                                <h4>{{center_language[swA].item1_h}}</h4>
                                <p>{{center_language[swA].item1_p}}</p>
                            </div>
                            <div class="pborder"></div>
                            <div class="f_one">
                            <img src="../../assets/images/third/us@2x.png" alt="">
                                <h4>{{center_language[swA].item2_h}}</h4>
                                <p>{{center_language[swA].item2_p}}</p>
                            </div>
                            <div class="pborder"></div>
                            <div class="f_one">
                            <img src="../../assets/images/third/suo@2x.png" alt="">
                                <h4>{{center_language[swA].item3_h}}</h4>
                                <p>{{center_language[swA].item3_p}}</p>
                            </div>
                        </div>
                    </div>
                    <div class=""
                        v-show="active==2"
                        style="height:2rem;"
                    >
                    </div>
                </div>
            </div>
        </div>
        <!-- 4.22 新增版 -->
        <div class="newAdd" v-show="init_pay_file.payVersion==2 && init_pay_file.type!=0">
            <div class="new_nav c21" :class="nac==1?'nac1 ' + swA:'nac2 ' + swA">
                <p class="c2one setColor" :class="swA"> <i class="num setColor">1</i> {{new_language[swA].new_nav_1}}</p>
                <p class="c2one" :class="nac>=2?'setColor '+swA:swA"> <i class="num" :class="nac>=2?'setColor':''">2</i> {{new_language[swA].new_nav_2}}</p>
                <!-- <p class="c2one" :class="active>=3?'setColor':''"> <i class="num" :class="active>=3?'setColor':''">3</i> 确认付款信息</p> -->
                <p class="c2two" :class="swA"> <i class="el-icon-time" v-show="nac==1"></i> <img v-show="nac==2" style="margin-right:.3rem;" src="../../assets/images/third/refr@2x.png" alt=""> <span v-show="nac==2">{{new_language[swA].nav_ok}}</span><span v-show="nac==1" class="time"><span>{{new_language[swA].new_nav_3}}</span>{{fortmatTime(time)}}</span></p>
            </div>
            <div class="new_body" v-show="nac==1">
                <div class="new_body_top">
                    <div class="new_top_lef">
                        <div class="box_new">
                            <div class="box_one">
                                <span>{{new_language[swA].new_box_left.account}}：</span>
                                <span class="color">{{init_pay_file.amount}} {{init_pay_file.coinType?init_pay_file.coinType.toUpperCase():''}}</span>
                            </div>
                            <div class="box_te b">
                                <span>{{new_language[swA].new_box_left.pay_way}}：</span>
                                <img src="../../assets/images/third/icon_sel.png" alt="">
                                <span>{{new_language[swA].new_box_left.pay_way_one}}</span>
                            </div>
                            <div class="box_te end">{{new_language[swA].new_box_left.info}}</div>
                        </div>
                        <p :class="swA"><img src="../../assets/images/third/box23.png" alt=""> {{new_language[swA].new_body_center_left_p}}</p>
                    </div>
                    <div class="new_top_right">
                        <div class="box_new">
                            <div class="box_one">
                                <span>{{init_pay_file.coinType?init_pay_file.coinType.toUpperCase():''}}{{new_language[swA].new_box_right.addr}}</span>
                                <div class="box_one_set">
                                    <h3 v-show="init_pay_file.coinType=='usdt'" :class="chain">{{chain=='OMNI'?init_pay_file.receiptAddress:init_pay_file.ercAddress}}</h3>
                                    <h3 v-show="init_pay_file.coinType!='usdt'" :class="chain">{{init_pay_file.receiptAddress}}</h3>
                                    <div class="ri"
                                    >
                                        <span v-show="init_pay_file.coinType=='usdt'" class="cp tag-read" :class="swA" :data-clipboard-text="chain=='OMNI'?init_pay_file.receiptAddress:init_pay_file.ercAddress" 
                                        @click="copyAddressFun()"
                                        >{{new_language[swA].new_box_right.cp}}</span>
                                        <span v-show="init_pay_file.coinType!='usdt'" class="cp tag-read" :class="swA" :data-clipboard-text="init_pay_file.receiptAddress" 
                                        @click="copyAddressFun()"
                                        >{{new_language[swA].new_box_right.cp}}</span>
                                        <span class="qr" @mouseenter="getCode" @mouseleave="removeCode">{{new_language[swA].new_box_right.qr}}</span>
                                        <div  id="qrcode" alt="" v-show="qr_show"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="box_te b" v-show="init_pay_file.coinType=='usdt'">
                                <span>{{new_language[swA].chain}}：</span> 
                                <!-- <img src="../../assets/images/third/omni.png" alt=""> -->
                                <el-radio-group v-model="chain">
                                    <el-radio-button v-model="chain" label="ERC20"></el-radio-button>
                                    <el-radio-button v-model="chain" label="OMNI"></el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="box_te end" :class="swA">
                                {{new_language[swA].new_box_right.info}}
                            </div>
                        </div>
                        <div class="new_button">
                            <span class="lef">{{new_language[swA].new_body_top_but1}}</span>
                            <span class="right" @click="doneFunc">{{new_language[swA].new_body_top_but2}}</span>
                        </div>
                    </div>
                </div>
                <div class="new_body_center">
                    <div class="info" :class="swA">
                        <span :class="swA=='ch'?'':'color'">
                            {{swA =='ch' ? new_language[swA].info_center_one:new_language[swA].info_center_one}}
                        </span>
                        <span :class="swA=='en'?'':'color'">
                            {{swA =='ch' ?new_language[swA].info_center_two:new_language[swA].info_center_two}}
                        </span>
                    </div>
                </div>
                <div class="new_body_bottom">
                    <div class="new_bottom_one">
                        <img src="../../assets/images/third/pai@2x.png" alt="">
                        <h3>{{new_language[swA].new_bottom_1.h3}}</h3>
                        <p>{{new_language[swA].new_bottom_1.p}}</p>
                    </div>
                    <div class="new_bottom_b"></div>
                    <div class="new_bottom_one">
                        <img src="../../assets/images/third/us@2x.png" alt="">
                        <h3>{{new_language[swA].new_bottom_2.h3}}</h3>
                        <p>{{new_language[swA].new_bottom_2.p}}</p>
                    </div>
                    <div class="new_bottom_b"></div>
                    <div class="new_bottom_one">
                        <img src="../../assets/images/third/suo@2x.png" alt="">
                        <h3>{{new_language[swA].new_bottom_3.h3}}</h3>
                        <p>{{new_language[swA].new_bottom_3.p}}</p>
                    </div>
                </div>
            </div>
             <div class="new_body2" v-show="nac==2">
                 <li class="border">
                     <img src="../../assets/images/third/b2_num.png" alt="">
                     <div class="one_body2">
                         <span class="span_one">{{new_language[swA].new_body2.num}}：</span>
                         <div class="r">
                             <span class="num">{{init_pay_file.amount}} {{init_pay_file.coinType?init_pay_file.coinType.toUpperCase():''}}</span>
                         </div>
                     </div>
                 </li>
                 <li class="border">
                     <img src="../../assets/images/third/b2_addr.png" alt="">
                     <div class="one_body2">
                         <span>{{new_language[swA].new_body2.addr}}：</span>
                         <div class="r">
                             <span class="addr" v-show="init_pay_file.coinType=='usdt'">{{chain=='OMNI'?(init_pay_file?init_pay_file.receiptAddress:''):(init_pay_file?init_pay_file.ercAddress:'')}}</span>
                             <span class="addr" v-show="init_pay_file.coinType=='eth'">{{(init_pay_file.receiptAddress)}}</span>
                             <span class="addr" v-show="init_pay_file.coinType=='btc'">{{(init_pay_file.receiptAddress)}}</span>
                         </div>
                     </div>
                 </li>
                 <li class="border">
                     <img src="../../assets/images/third/b2_order.png" alt="">
                     <div class="one_body2">
                         <span>{{new_language[swA].new_body2.order_status}}：</span>
                         <div class="r">
                             <!-- <span class="button no" >{{new_language[swA].new_body2.confirm}}</span> -->
                             <span class="button no" v-show="new_return!=null && new_return.status==0">
                                 {{new_language[swA].new_body2.confirm}}
                                 <i class="el-icon-loading" v-show="loadS"></i> 
                            </span>
                             <span class="button ok" v-show="new_return!=null && new_return.status==1">
                                 {{new_language[swA].new_body2.done}}
                                 <i class="el-icon-loading" v-show="loadS"></i> 
                            </span>
                             <span class="search" @click="updateSearch">{{new_language[swA].new_body2.search}}</span>
                         </div>
                     </div>
                 </li>
             </div>
        </div>
        <el-dialog
        id="dia"
        :visible.sync="dialogVisible"
        width="24rem"
        top="38vh"
        :before-close="handleClose">
        <p><span>{{new_language[swA].dia.one}}</span><span class="color">{{init_pay_file.amount}} {{init_pay_file.coinType?init_pay_file.coinType.toUpperCase():''}}？</span></p>
        <span slot="footer" class="dialog-footer">
            <el-button id="cancle_button" @click="dialogVisible = false">{{new_language[swA].dia.cancel}}</el-button>
            <el-button id="sure_button" @click="doneMoney">{{new_language[swA].dia.confirm}}</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {bindOrderFun,thirdGetInfo,
thirdGetInfo2,alreadyPayConfirm,
updateTransferStatus,updateSearchFun} from '../../assets/js/api'
import Clipboard from 'clipboard';
import Worker from '../../assets/js/worker'
import QRCode from 'qrcodejs2'
export default {
    data() {
        return {
            chain:'ERC20',
            orderId:'',
            obj:{},
            time:'',
            thirdWorker:null,
            active:1,
            coinType:{
                "0":"USDT",
                "1":"BTC",
                "2":"ETH",
            },
            payListCheck:['银行卡'],
            payList:['银行卡'],
            tName:'',
            step2File:null,
            url:'',
            titleS:true,
            swA:'ch',
            nac:1,
            dialogVisible:false,
            loadS:false,
            next1:true,
            num_test:/^[0-9]+\.{0,1}[0-9]{0,2}$/,
            center_language:{
                ch:{
                    nav_1:"选择支付方式",
                    nav_2:"付款转账",
                    nav_3:"确认付款信息",
                    nav_4:"订单剩余支付时间",
                    marketName:"商家名",
                    num_cny:"付款金额",
                    num_amount:"购买数量",
                    pw:"选择您的付款方式",
                    bank:"银行卡",
                    support:"Support up to 1 million CNY large transfer",
                    do_time:"17:00~次日8:00，单笔最大限额5万",
                    input_name:"输入转账银行卡持有人姓名",
                    place_input:"请输入转账银行卡持有人的真实姓名",
                    placeholder:"请输入真实姓名",
                    next:"下一步",
                    text_1:"请保证付款账户信息与填写的银行卡持有人姓名一致",
                    text_2:"请保证实际转账金额与输入的金额一致",
                    text_3:"使用支付宝和微信转账，到账时间无法确定，建议使用网银转账",
                    text_4:"银行工作时间为周一至周五9:00~17:00，非工作时间的大额转账可能延迟到账，节假日规则以各银行公告为准",
                    item1_h:"10倍赔付",
                    item1_p:"客户充值过程中若产生损失，平台10倍赔付",
                    item2_h:"保证金",
                    item2_p:"卖家已向Royalbiz平台缴纳足额保证金",
                    item3_h:"托管锁定",
                    item3_p:"卖家出售的 USDT 已托管锁定在Royalbiz平台",

                    info_1:"买家手中的",
                    info_2:"已托管锁定在Royalbiz平台，请放心付款",
                    done_pw:"已选择付款方式",
                    bank_user:"银行卡持有人姓名",
                    info2:"购买成功后数字货币将全额充值到您要付款的商户",
                    shou_name:"收款姓名",
                    bank_info:"银行信息",
                    bank_num:"银行卡号",
                    remark:"付款备注",
                    remark2:'（请勿备注除付款码外的其它信息）',
                    cp:"复制",
                    pre:"上一步",
                    done:"已付款",
                    ban_list:"网银快捷入口",
                    rm4:"",
                    rm5:"",
                    rm6:"",

                    submit:"提交成功",
                    back:"返回商户平台",
                    ok1:'购买成功后，数字货币将全额充值到您要付款的商户，完成付款',
                    ok2:'',
                    ok3:'5秒后将自动跳转至商户平台，如果没有跳转请手动点击返回商户平台按钮',

                },
                en:{
                    nav_1:"Choose payment method",
                    nav_2:"Payment Transfer",
                    nav_3:"Order Confirmation",
                    nav_4:"Order remaining time",
                    marketName:"Merchant",
                    num_cny:"Transfer amount",
                    num_amount:"Exchange amount",
                    pw:"Choose deposit method",
                    bank:"Bank Transfer",
                    support:"Support up to 1 million CNY large transfer",
                    do_time:"Off-work hours from 5:00 PM to 8:00 AM, maximum transfer limit is 50,000 CNY",
                    input_name:"Input bank card owner's name",
                    place_input:"Bank card owner's name",
                    placeholder:"please input reall name",
                    next:"Next",
                    text_1:"2、Please make sure bank card owner’s name consistent with order account owner",
                    text_2:"3、Please make sure bank transfer amount consistent with order amount",
                    text_3:"1、Do not use WeChat and Alipay to transfer accounts, otherwise they will not arrive ",
                    text_4:"Bank working hours start from Monday to Friday 9:00 AM to 5:00 PM. Non-working hours will have limitations on large scale transfer. Holiday working hours are based on bank notice",
                    item1_h:"10 times compensation",
                    item1_p:"10-Time compensation in process of deposit if platform failure",
                    item2_h:"Deposit",
                    item2_p:"Sellers crypto-currency are hold at Royalbiz escrow during trade",
                    item3_h:"Escrow trust hold",
                    item3_p:"Both buyers and sellers cryptocurrency are hold at Royalbiz escrow during transaction",
                    
                    info_1:'',
                    info_2:"is hold at Royalbiz escrow, please transfer with",
                    done_pw:"Deposit method selected",
                    bank_user:"Bank card owner's name",
                    info2:"Crypto currency will deposit directly to merchant after successful",
                    shou_name:"Bank holder's name",
                    bank_info:"Bank info",
                    bank_num:"Bank account number",
                    remark:"Transfer note",
                    remark2:'',
                    cp:"Copy",
                    pre:"Previous",
                    done:"Done",
                    ban_list:"Fast Entrance to e-bank",
                    rm4:'1、Please does not note "Bitcoin","Cryptocurrency","USDT" or related info, otherwise transfer might be rejected.',
                    rm5:"2、When transfer, please input 'transfer note' info.",
                    rm6:"3、Please click 'Done' when transfer successfully completed.",

                    submit:"Successful submission",
                    back:"Back to the merchant platform",
                    ok1:'When the purchase is successful, the digital currency will be fully recharged to the business you want to pay, complete the payment.',
                    ok2:'The order has been processed， the expected arrival time：15 minutes.',
                    ok3:'After 5 seconds, it will automatically jump to the merchant platform. If there is no automatic jump, please manually click the "Back to the merchant platform" button.',
                }
            },
            new_language:{
                ch:{
                    new_nav_1:'充值入金',
                    new_nav_2:'状态查询',
                    new_nav_3:'订单剩余支付时间：',
                    nav_ok:'订单已成功提交',
                    new_box_left:{
                        account:'待付款数量',
                        pay_way:'已选择付款方式',
                        pay_way_one:'以币入金',
                        info:'Royalbiz平台有完备的钱包体系，请放心充值。',
                        
                    },
                    dia:{
                        one:'是否确认已全额入金',
                        cancel:'取 消',
                        confirm:'确 认'
                    },
                    new_box_right:{
                        addr:'充值地址',
                        cp:'复制',
                        qr:'二维码',
                        lian_name:'链名称',
                        info:'请勿向上述地址充值任何非USDT资产，否则资产将不可找回。'
                        
                    },
                    info_center_one:'充值后',
                    info_center_two:'请务必点击“已入金”。',
                    new_body_center_left_p:'入金成功后数字货币将全额充值到您要付款的商户',
                    new_body_top_but1:'返回',
                    new_body_top_but2:'已入金',

                    new_bottom_1:{
                        h3:'10倍赔付',
                        p:'客户入金过程中平台原因产生损失10倍赔付'
                    },
                    new_bottom_2:{
                        h3:'钱包体系',
                        p:'Royalbiz平台有完备的钱包体系'
                    },
                    new_bottom_3:{
                        h3:'托管锁定',
                        p:'入金的 USDT 已托管锁定在Royalbiz平台'
                    },
                    new_body2:{
                        num:'付款数量',
                        addr:'充值地址',
                        order_status:'订单状态',
                        search:'查询状态',
                        confirm:'确认中',
                        done:'已完成',
                    },
                    chain:"链名称"
                },
                en:{
                    new_nav_1:'Deposit Cryptocurrency',
                    new_nav_2:'Status Check',
                    new_nav_3:'Deposit order expire in ',
                    nav_ok:'Order successfully submitted',
                    new_box_left:{
                        account:'Deposit amount',
                        pay_way:'Deposit method selected',
                        pay_way_one:'Cryptocurrency Deposit',
                        info:'Royalbiz platform has an entire safety cryptocurrency wallet system,please deposit assurely.'

                    },
                    dia:{
                        one:'Confirm purchase ',
                        cancel:'Cancel',
                        confirm:'Confirm'
                    },
                    new_box_right:{
                        addr:'Deposit Address',
                        cp:'Copy',
                        qr:'QR Code',
                        lian_name:'链名称',
                        info:"Please don't deposit any other digital assets except USDT to the above address."
                        
                    },
                    info_center_one:'Please click "Deposit Successfully" ',
                    info_center_two:' button after deposit!',
                    new_body_center_left_p:'Cryptocurrenty will be charged to merchant after deposit completed.',
                    new_body_top_but1:'Previous Page',
                    new_body_top_but2:'Deposit Successfully',
                    new_bottom_1:{
                        h3:'10 times compensation',
                        p:'Customer earn a 10 times compensation in process of deposit if platform causes any loss'
                    },
                    new_bottom_2:{
                        h3:'Cyrpto Wallet System',
                        p:'Royalbiz platform has an entire safety cryptocurrency wallet system'
                    },
                    new_bottom_3:{
                        h3:'Deposit Hold',
                        p:'USDT will be hold at Royalbiz platform during deposit process'
                    },
                    new_body2:{
                        num:'Deposit Amount',
                        addr:'Deposit Address',
                        order_status:'Deposit Status',
                        search:'Status query',
                        confirm:'Unconfirmed',
                        done:'completed',
                    },
                    chain:"chain"
                }
            },
            qr_show:false,
            new_return:null,
        }
    },
    watch:{
        chain(o,n){
            console.log(o,n)
        }
    },
    computed:{
        user_info(){
            return this.$store.getters.user_info;
        },
        init_pay_file(){
            return this.$store.getters.init_pay_file;
        },
        login(){
            return this.$store.getters.login;
        },
    },
    async created(){
        this.orderId =await this.$route.params.orderId;
        let key =await thirdGetInfo(this,{
            id:this.orderId
        }).then((res) => {
            return res;
        })
        console.log(key)
        if(key!=false) {
            this.obj = key;
            this.time = key.expiredTimestamp;
            await this.autoTime(key.expiredTimestamp,'time')
            this.$store.dispatch('_async_set_init_pay_file',key)
        }
        if(this.init_pay_file.payVersion=='1'){
            if(this.login){
                this.bindOrder()
            }else{
                this.$store.dispatch('_async_set_third_pay',{
                    orderId:this.orderId
                })
            }
        }else if(this.init_pay_file.payVersion=='2'){
            if(this.init_pay_file.type!=0){
                if(this.init_pay_file.transferStatus==1){
                    this.nac=2;
                    this.updateSearch()
                }
            }
        }
        
    },
    methods:{
        handleClose(done) {
            this.dialogVisible = false;
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
        },
        doneFunc(){
            this.dialogVisible = true
        },
        removeCode(){
            this.qr_show=false
            document.getElementById('qrcode').innerHTML=''
        },
        getCode(){
            // alert(this.init_pay_file.coinType=='usdt'?(this.chain=='OMNI'?this.init_pay_file.receiptAddress:this.init_pay_file.ercAddress):this.init_pay_file.receiptAddress)
            this.qr_show=true;
            // new QRCode(document.getElementById('qrcode'), this.init_pay_file.receiptAddress)
            var qrcode = new QRCode('qrcode', {
            text: this.init_pay_file.coinType=='usdt'?(this.chain=='OMNI'?this.init_pay_file.receiptAddress:this.init_pay_file.ercAddress):this.init_pay_file.receiptAddress,
            width: 155,
            height: 150,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
            });
        },
        async doneMoney(){
            
            let key;
            key = await updateTransferStatus(this,{
                id:this.init_pay_file.id
            }).then(res => {
                return res;
            })
            if(key !=false) {
                this.dialogVisible = false
                this.nac = 2;
                this.new_return = key.data;
            }
        },
        async updateSearch(){
            this.loadS = true
            let key;
            key = await updateSearchFun(this,{
                id:this.init_pay_file.id
            }).then(res => {
                let p = setTimeout(()=>{
                    this.loadS = false;
                    clearTimeout(p)
                },300)
                return res;
            })
            if(key !=false) {
                this.nac = 2;
                this.new_return = key.data;
            }
        },
        /**
         * 赋值
         */
        copyAddressFun(){
            let that =this;
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
                console.log('复制成功')
                // 释放内存
                clipboard.destroy()
                that.$message({
                    message: '复制成功',
                    type: 'success',
                    center:true,
                    duration:500,
                });
            })
            clipboard.on('error', e => {
                // 不支持复制
                console.log('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
            })
        },
        goThird(){
            window.location = this.url;
        },
        goSignIn(){
            this.$router.push('/sign-in')
        },
        goRegister(){
            this.$router.push('/register-user')
        },
        async bindOrder(){
            let key = await bindOrderFun(this,{
                id:this.orderId
            })
            .then((res) => {
                return res;
            })
            if(key!=false) {
                console.log(key)
                this.$router.push('/payment-order')
            }
        },
        /**
         * 格式化时间
         */
        fortmatTime(leftTime){
            let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                // vm.$emit('time-end')
                return '0'
            }
            if(this.swA=='en') {
                return  `${h} h ${m} min ${s} second`
            }else{
                return  `${h}小时${m}分${s}秒`
            }
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
        autoTime(t,str){
            if(this.time<=0){
                return false;
            }
            if(this.thirdWorker!=null){
                this.thirdWorker.postMessage(
                    'close'
                )
            }
            
            this.thirdWorker = new Worker()
            this.thirdWorker.postMessage(
                t
            )
            this.thirdWorker.addEventListener('message',(res)=>{
                this.time = res.data;
            })
        },
        async createPay(){
            if(this.num_test.test(this.tName)){
                this.$message({
                    message: this.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                    type: 'error',
                    center:true,
                    duration:1200,
                });
                return false
            }else{
                if(/\d+/.test(this.tName)){
                    this.$message({
                        message: this.swA=='ch'?'请填写真实姓名':'Please fill in your real name',
                        type: 'error',
                        center:true,
                        duration:1200,
                    });
                    return false
                }else{

                }
            }
            if(!this.next1) {
                return false;
            }else{
                this.next1= false;
            }
            if(this.tName=='') return false;
            let key =await thirdGetInfo2(this,{
                id:this.init_pay_file.id,
                realName:this.tName
            }).then((res) => {
                this.next1 = true;
                return res;
            })
            if(key!=false) {
                if (this.active++ > 2) this.active = 0;
                this.step2File = key;
            }
        },
        async alreadyPay(){
            // this.active++
            // 向后台验证是否 付过了
            let key =await alreadyPayConfirm(this,{
                id: this.step2File.id,
                receiptWayId: this.step2File.adReceiptWay.id
            }).then((res) => {
                return res;
            })
            if(key!=false) {
                if (this.active++ > 2) this.active = 0;
                console.log(key)
                this.url = key.redirectUrl
                setTimeout(function(){
                    window.location = key.redirectUrl
                },4000);
                
            }
        },
    }
}
</script>

<style lang="scss">
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #337861;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #337861;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color :#666666FF!important;
}
   
.el-step__icon{
    width: 2.5rem;
    height: 2.5rem;
}
.el-step__head{
    margin-top: .7rem;
}
.el-step__line{
        border-color:#4C6085;
        top: 2.7rem!important;
        bottom: 0;
        left: 1.2rem!important;
    }
.el-step__head.is-finish{
    .el-step__icon{
        width: 2.5rem;
        height: 2.5rem;
        background: #4E9E66FF;
        color:rgba(242,242,242,1);
        border-color:#4E9E66FF;
    }
    .el-step__line{
        border-color:#4E9E66FF;
        top: 3rem;
        bottom: 0;
        left: 1.5rem;
    }
}
.el-step__title.is-finish{
    color:#303133;
    font-weight: 700;
    font-size: 16px;
}
.el-step__title.is-process{
    font-weight: 700;
    color: #303133;
    font-size:16px;
}
.el-step__title.is-wait{
    color: #303133;
    font-weight: 700;
}
.el-step.is-horizontal .el-step__line{
    top:1.5rem;
    height: .2rem /* 4/20 */;
    top: 3rem;
    bottom: 0;
    left: 1.5rem;
}
.el-step__line-inner{
    height: .2rem /* 4/20 */;
    background: #4C6085;
}
.el-step__icon.is-text{
    border:0;
    background: #ccc;
    color:white;
}
.el-step__icon-inner{
    font-size: .9rem /* 18/20 */;
}
// 
.el-step__main{
    padding-left: 4rem!important /* 80/20 */;
}
.el-step__title {
    font-size: .95rem!important /* 15/20 */;
    line-height: 1.9rem /* 38/20 */;
    height: 2.9rem /* 38/20 */;
    height: 3.9rem /* 38/20 */;
    width: 6.25rem /* 105/20 */;
    width: 10.25rem /* 105/20 */;
    background:rgba(204,204,204,1);
    color:black;
    font-weight: 500!important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 0px!important;
    &.is-finish{
        background: #4E9E66FF;
        color :#FFFFFFFF!important;
    }
}
#dia{
    .el-dialog__body{
        p{
            font-size:16px;
            font-weight:800;
            color:#333333;
            span.color{
                color:rgba(51,120,97,1);
            }
        }
    }
    .dialog-footer{
        display: flex;
        justify-content: flex-end;
        .el-button{

        }
        #cancle_button{
            width:5rem /* 100/20 */;
            height:2rem /* 40/20 */;
            background:rgba(255,255,255,1);
            border:1px solid rgba(204,204,204,1);
            opacity:1;
            border-radius:.15rem /* 3/20 */;
            font-size:.7rem /* 14/20 */;
            font-weight:400;
            color:rgba(204,204,204,1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #cancle_button:hover{
            color:rgba(179,179,179,1);
        }
        #sure_button{
            width:5rem /* 100/20 */;
            height:2rem /* 40/20 */;
            background:linear-gradient(270deg,rgba(51,120,97,1) 0%,rgba(88,207,167,1) 100%);
            box-shadow:0px 0px 5px rgba(51,120,97,0.3);
            font-size:.7rem /* 14/20 */;
            font-weight:800;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #sure_button:hover{
            background:rgba(51,120,97,1);
        }
    }
}
.third{
    min-height: 100vh;
    background: #E6E6E6;
    .third-header{
        height:5rem /* 100/20 */;
        height:4rem /* 100/20 */;
        background:#E6E6E6;
        img{
            display: inline-block;
            height: 2.5rem /* 50/20 */;
            height: 2rem /* 50/20 */;
            width: 8.15rem /* 163/20 */;
            width: 10.15rem /* 163/20 */;
            // margin-top: 1rem;
            vertical-align: baseline;

        }
        .banxin{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sw{
                width:160px;
                height:30px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(204,204,204,1);
                opacity:1;
                border-radius:225px;
                display: flex;
                justify-content: space-between;
                span{
                    display: flex;
                    flex:1;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    font-size:16px;
                    font-weight: 600;
                }
                span.ac{
                    color:#fff;
                    width:80px;
                    height:30px;
                    background:rgba(51,120,97,1);
                    opacity:1;
                    border-radius:225px;
                }
                span.no{
                    color:#999999;
                }
            }
            
        }
        .border{
            display: inline-block;
            height: 2rem;
            width: 2px;
            background:rgba(153,153,153,1);
            margin-left: 1rem;
            margin-right: 1rem;
            margin-top: 1rem;
        }
        
        .user{
            display: inline-block;
            // width:2.8rem /* 56/20 */;
            width: 10.15rem /* 163/20 */;
            height:2rem /* 56/20 */;
            background:rgba(153,153,153,1);
            // border-radius:50%;
            margin-top: 1rem;
            vertical-align: baseline;
        }
        .user-text{
            display: inline-block;
            font-size: 1.4rem /* 28/20 */;
            color:rgba(102,102,102,1);
            height:2.8rem /* 56/20 */;
            line-height: 2.8rem;
            vertical-align: bottom;
            margin-left: 1rem;
        }
    }
    .body.bd1{
        height: 33.4rem /* 668/20 */;
    }
    .body.bd2_ac1{
        height: 39.4rem /* 668/20 */;
        height: 51.4rem;
        height: 42.9rem;
        // height: 48.4rem;
    }
    .body.bd2_ac2{
        height: 54.4rem!important /* 668/20 */;
        height: 67.4rem!important;
        height: 73.4rem!important;
    }
    .body.bd2_ac3{
        height: 39.4rem /* 668/20 */;
    }
    @media screen and(max-width: 480px) {
        .body.bd2_ac1{
            height: 45.4rem /* 668/20 */;
        }
    }
    .body{
        // background: url('../../assets/images/logopage/tu9@2x.png') no-repeat center center;
        // background-size: cover;
        background:RGBA(242, 242, 242, 1);
        background:#E6E6E6;
        box-sizing: border-box;
        p{
           box-sizing: border-box;
        //    padding-bottom: 1rem;
        //     border-bottom: 1px solid rgba(204,204,204,1);
        //     line-height: 3rem /* 50/20 */;
        }
        p.binit_pay_file{
            padding-bottom: 0px!important;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:3px;
            text-align: center;
        }
        .c2{
            height: 75px;
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
            border-radius: 38px;
            p{
                padding: 0!important;
                line-height: none;
                display:flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-family:PingFang SC;
                font-weight: 400;
                color:rgba(51,51,51,1);
                i.num{
                    display: flex;
                    width:26px;
                    height:26px;
                    // background:rgba(255,255,255,1);
                    border-radius:50%;
                    // color:rgba(76,96,133,1);
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    border:1px solid rgba(51,51,51,1);
                    color:rgba(51,51,51,1);
                    margin-right: 3px;
                }
                i.num.setColor{
                    background:rgba(255,255,255,1);
                    color:rgba(76,96,133,1);
                    border:none;
                }
            }
            p.setColor{
                color:rgba(255,255,255,1);
            }
            p.setColor:first-child{
                font-size: 1rem /* 20/20 */;
            }
            .c2one{
                flex: .8;
            }
            
            .c2two{
                flex:2;
                i{
                    display: flex;
                    font-size: 30px;
                    color:#f34949;
                    font-weight: 600;
                }
                span{
                    color:#666666;
                }
                span.time{
                    color:#337861;
                   
                }
            }
        }
        .c21{
            background: url(../../assets/images/third/two.png);
            background-size: cover;
        }
        .c21.en{
            p{
                font-size: 15px;
            }
            p.setColor{
                font-size: 15px;
            }
        }
        .c22{
            background: url(../../assets/images/third/one.png);
            background-size: cover;
        }
        .c22.en{
            p{
                font-size: 15px;
                
            }
            p.setColor{
                    font-size: 15px!important;
                }
        }
        .shangjia{
            .span-p{
                line-height: 2rem /* 40/20 */;
            }
            .box{
                margin-top: 2rem;
                display: flex;
                .box-one{
                    width:17.5rem /* 350/20 */;
                    height:9.5rem /* 190/20 */;
                    height:10.5rem /* 190/20 */;
                    display: inline-block;
                    border-radius:.25rem /* 5/20 */;
                    h3{
                        width: 100%;
                        margin-top: 1.5rem;
                        margin-bottom: 1rem;
                        line-height: 2.5rem /* 50/20 */;
                        text-align: center;
                        font-size: 1.2rem /* 24/20 */;
                    }
                    h3.le{
                        color:rgba(255,255,255,1);
                    }
                    h3.ri{
                        color:rgba(51,51,51,1);
                    }
                    span{
                        display: inline-block;
                        width:5.5rem /* 110/20 */;
                        height:2rem /* 40/20 */;
                        margin-left: 50%;
                        transform: translateX(-50%);
                        line-height: 2rem;
                        text-align: center;
                        cursor: pointer;
                        border-radius:1rem /* 20/20 */;
                    }
                    span.le{
                        background:rgba(204,204,204,1);
                    }
                    span.ri{
                        background:rgba(1,23,41,1);
                        color:white;
                    }
                }
                .le{
                    background:rgba(76,96,133,1);
                    margin-right: 2rem;
                }
                .ri{
                    background:rgba(204,204,204,1);
                }
            }
        }
        // 
        .shangjia2{
            .box22{
                height: 8rem /* 200/20 */;
                background: rgba(242,242,242,1);
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                padding: .65rem /* 13/20 */ 1.5rem /* 30/20 */ .75rem /* 15/20 */ 1.75rem /* 35/20 */;
                border: 1px solid rgba(204,204,204,1);
                .text_info_te{
                    // padding-left: 2rem;
                    box-sizing: border-box;
                    color:#666666;
                    font-size: .9rem /* 18/20 */;
                    p{
                        color:#666666;
                        padding: 0;
                        line-height: none!important;
                        line-height: 1.5rem /* 20/20 */;
                        i{
                            color:#F34949;
                        }
                    }
                }
                
            }
            .box22.padd{
                background: rgba(242,242,242,1);
                height: 6rem /* 200/20 */;
                // padding-left: .5rem;
                .text_info_te.padd{
                    padding-left: 0;
                }
            }
            .border{
                border-bottom:1px solid rgba(230,230,230,1);
            }
            .box2{
                margin-top: 1rem;
                // height: 21rem /* 200/20 */;
                height: 19rem /* 380/20 */;
                // background: white;
                box-sizing: border-box;
                // padding: 1rem ;
                display: flex;
                justify-content: space-between;
                // border:1px solid rgba(204,204,204,1);
                padding: 1.25rem /* 25/20 */ 1.75rem /* 35/20 */ 1.55rem /* 31/20 */ 1.75rem /* 35/20 */;
                background: #ffffff;
                border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border:1px solid rgba(204,204,204,1);
                    border-bottom: 0;
                .llef{
                    position: relative;
                    flex:2;
                    box-sizing: border-box;
                    // padding: 0px 0rem 0 2rem;
                    
                }
                
                .set{
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                }
                .lleft_left{
                    flex: 1;
                    width: 25rem /* 500/20 */;
                    height: 11rem /* 220/20 */;
                    background:rgba(250,250,250,1);
                    border:1px solid rgba(230,230,230,1);
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    font-size: .8rem /* 14/20 */;
                    color:rgba(102,102,102,1);
                    .jine{
                        height: 5rem /* 100/20 */;
                        height: 4rem;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: center;
                        span.num{
                            font-size: 1.5rem /* 30/20 */;
                            color:rgba(51,120,97,1);
                            line-height: 2.3rem /* 60/20 */;
                            font-weight: 700;
                        }
                        box-sizing: border-box;
                        padding-left: .5rem /* 10/20 */;
                    }
                    .one_jin{
                        // flex: 1;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        padding-left: .5rem /* 10/20 */;
                        font-size: .8rem /* 16/20 */;
                    }
                    .one_jin_h{
                        height: 4rem /* 80/20 */;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: center;
                        div{
                            font-size:1.2rem /* 24/20 */;
                            line-height: 1.8rem;
                            font-weight:800;
                            color:rgba(102,102,102,1);
                        }
                    }
                }
                .set_center{
                    height: 11rem /* 220/20 */;
                    width: 3rem /* 60/20 */;
                    position: relative;
                }
                .set_center::after{
                        display:block;
                        content:'';
                        border-width:.5rem .5rem .5rem .5rem /* 16/20 */;
                        border-style:solid;
                        border-color:#CCCCCC transparent transparent transparent;
                        /* 定位 */
                        position:absolute;
                        left: 50%;
                        top:50%;
                        transform: translateX(0%) translateY(50%) rotate(-90deg);
                }
                .lleft_right{
                    // flex: 1;
                    width: 25rem /* 500/20 */;
                    height: 11rem /* 220/20 */;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .infor{
                        height: 3.8rem /* 76/20 */;
                        background:rgba(76,96,133,0.1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 2.3rem /* 46/20 */;
                            height: 2.3rem /* 46/20 */;
                            margin-right:.5rem /* 10/20 */;
                        }
                        div{
                            // height: 2.65rem /* 53/20 */;
                            h3{
                                color:#333333;
                                font-size: 1.1rem /* 22/20 */;
                                line-height: 1.25rem /* 35/20 */;
                                span.bold{
                                    font-weight: 700;
                                }
                            }
                            .info_time{
                                font-size: .8rem /* 16/20 */;
                                color:#666666;
                            }
                        }
                    }
                    .input{
                        flex:1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        input{
                            // width:14.5rem /* 160/20 */;
                            width:100%;
                            height:2rem /* 20/20 */;
                            background:rgba(252,252,252,1);
                            border:1px solid rgba(204,204,204,1);
                            opacity:0.8;
                            border-radius:3px;
                            padding-left: .3rem;
                            box-sizing: border-box;
                        }
                        
                        .name{
                            font-size: .8rem /* 16/20 */;
                            color:rgba(34,34,34,1);
                            font-weight: 500;
                            line-height: 1.5rem /* 30/20 */;
                        }
                        .name_info{
                            font-size: .8rem /* 16/20 */;
                            color:rgba(243,73,73,1);
                            font-weight: 500;
                        }
                    }
                    .p_button{
                        height: 2rem /* 40/20 */;
                        border-bottom: 0px solid #cccccc;
                        width: 100%;
                        display: inline-block;
                        padding: 0;
                        line-height: 0;
                        button{
                            border: 0px;
                            color:white;
                            width:100%;
                            height:2rem;
                            background:linear-gradient(90deg,#337861,#58CFA7);
                            border-radius:3px;
                            box-shadow:0px 0px 10px rgba(51,120,97,0.3);
                        }
                    }
                    .p_button:hover{
                        button{
                            background:#337861;
                        }
                    }
                }
                
                .steppp{
                    flex: 1;
                    // max-width: 31rem;
                    height: 21rem /* 200/20 */;
                    background: rgba(242,242,242,1);
                    padding: 3rem 0rem 3rem 2rem;
                    box-sizing: border-box;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
                
                .span-p{
                    line-height: 3rem;
                    display: block;
                    font-size: 1rem;
                    height: 3rem;
                }
                .span-p.border{
                    border-bottom: 1px solid rgba(204,204,204,1);
                }
                .box2_p.border{
                    border-bottom: 1px solid rgba(204,204,204,1);
                }
                .box2_p{
                    font-size: .85rem /* 17/20 */;
                    box-sizing: border-box;
                    padding-bottom: 0rem;
                    // color:#666666;
                    border-bottom: 0px solid #cccccc;
                    line-height: 2.5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    .el-checkbox__input.is-checked+.el-checkbox__label{
                        font-size: 0.85rem;
                        vertical-align: text-bottom;
                    }
                    .el-checkbox-group{
                        padding-left: .3rem;
                        font-size: .8rem;
                        span{
                            font-size: .8rem!important;
                        }
                    }
                    span.bboc{
                        // display: block;
                    }
                    .span_p{
                        position: relative;
                        flex:1;
                    }
                    .span_p::after{
                        content: attr(data-info);
                        position: absolute;
                        top: 3rem;
                        left: 0rem;
                        z-index: 0;
                        // width:16rem /* 160/20 */;
                        flex:1;
                        height:1rem /* 20/20 */;
                        line-height: 1rem;
                        border-radius:3px;
                        font-size: .8rem;
                        color:#D67869FF;
                        padding-left: .3rem;
                    }
                    input{
                        // width:14.5rem /* 160/20 */;
                        width:100%;
                        height:1.8rem /* 20/20 */;
                        background:rgba(252,252,252,1);
                        border:1px solid rgba(204,204,204,1);
                        opacity:0.8;
                        border-radius:3px;
                        padding-left: .3rem;
                        box-sizing: border-box;
                    }
                    .d_img{
                        display: flex;
                        align-items: center;
                        padding-bottom: .2rem /* 4/20 */;
                        img{
                            width: 1rem;
                            height: .7rem;
                            vertical-align: middle;
                            display: flex;
                            align-items: center;
                        }
                    }
                    
                    
                }
                .box2_pp{
                    width: 50%;
                    display: inline-block;
                    font-size: 1rem /* 12/20 */;
                    input{
                        // width:14.5rem /* 160/20 */;
                        width:100%;
                        height:2rem /* 20/20 */;
                        background:rgba(252,252,252,1);
                        border:1px solid rgba(204,204,204,1);
                        opacity:0.8;
                        border-radius:3px;
                        padding-left: .3rem;
                        box-sizing: border-box;
                    }
                    .d_img{
                        display: flex;
                        align-items: center;
                        padding-bottom: .2rem /* 4/20 */;
                        img{
                            width: 1rem;
                            height: .7rem;
                            vertical-align: middle;
                            display: flex;
                            align-items: center;
                        }
                    }
                    .span_p{
                        position: relative;
                        flex:1;
                        font-size: 1rem;
                    }
                    .span_p::after{
                        content: attr(data-info);
                        position: absolute;
                        width: 20rem;
                        top: -2.7rem;
                        left: 13rem;
                        z-index: 20000;
                        // width:16rem /* 160/20 */;
                        flex:1;
                        height:1rem /* 20/20 */;
                        line-height: 1rem;
                        border-radius:3px;
                        color:#D67869FF;
                        padding-left: .3rem;
                        font-size: 15px;
                    }
                    border:0px;
                    padding: 0px;
                }
                .p_button{
                    border-bottom: 0px solid #cccccc;
                    width: 100%;
                    display: inline-block;
                    button{
                        border: 0px;
                        color:white;
                        width:100%;
                        height:2rem;
                        background:#4E9E66FF;
                        box-shadow:0px 0px 10px rgba(51,120,97,0.3);
                        border-radius:3px;
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .box2{
                    height: 20rem;
                    .span-p{
                        font-size: 1.3rem;
                    }
                    .box2_p{
                        font-size: 1rem;
                    }
                    .rright{
                        display: none;
                    }
                }
            }
            .box23{
                margin-top: 1rem;
                height: 22rem /* 200/20 */;
                height: 18.5rem /* 370/20 */;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                width: 100%;
                box-sizing: border-box;
                border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                border:1px solid rgba(204,204,204,1);
                border-bottom: 0;
                h3{
                    color:#666666;
                    i{
                        color: #4E9E66FF;
                    }
                }
                // .steppp{
                //     flex: 1;
                //     // max-width: 31rem;
                //     // height: 21rem /* 200/20 */;
                //     background: rgba(242,242,242,1);
                //     padding: 3rem 0rem 3rem 2rem;
                //     box-sizing: border-box;
                //     border-top-left-radius: 5px;
                //     border-bottom-left-radius: 5px;
                // }
                .box23_left{
                    position: relative;
                    flex: 1;
                    background: #fff;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    box-sizing: border-box;
                    padding: 2.5rem /* 25/20 */ 1.8rem /* 18/20 */ 3rem /* 30/20 */ 1.8rem /* 18/20 */;
                    display: flex;
                    justify-content: space-between;
                    div.bo{
                        width: 24rem /* 480/20 */;
                        .to{
                            height: 10rem /* 200/20 */;
                            border: 1px solid rgba(230,230,230,1);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            div{
                                display: flex;
                                justify-content:flex-start;
                                color:rgba(102,102,102,1);
                                font-size: .8rem /* 16/20 */;
                                box-sizing: border-box;
                                padding-left: .5rem /* 10/20 */;
                                line-height: 2.5rem /* 40/20 */;
                                span.num{
                                    color:#337861;
                                    font-size: 1.5rem /* 30/20 */;
                                }
                            }
                            .info{
                                height: 1.8rem /* 36/20 */;
                                background:rgba(234,243,240,1);
                                color:#333333;
                                display: flex;
                                align-items: center;
                            }
                        }
                        .bot{
                            margin-top: 1rem;
                            height:2rem /* 40/20 */;
                            background:rgba(76,96,133,0.1);
                            border-radius:.2rem /* 4/20 */;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            box-sizing: border-box;
                            padding-left: .5rem /* 10/20 */;
                            img{
                                width: 1.5rem /* 30/20 */;
                                height: 1.5rem /* 30/20 */;
                                margin-right: .5rem;
                            }
                            span{
                                font-size: .9rem /* 18/20 */;
                                color:#333333;
                            }
                            span.en{
                                font-size: .65rem;
                            }
                        }
                    }
                    .box23_center{
                        height: 10rem /* 220/20 */;
                        width: 3rem /* 60/20 */;
                        position: relative;
                    }
                    div.bb{
                        flex: 1;
                        .to{
                            height: 10rem /* 200/20 */;
                            border: 1px solid rgba(230,230,230,1);
                            background: rgba(250,250,250,1);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            .one2{
                                // line-height: 2.4rem;
                                height: 2.4rem;
                                margin: 0;
                                box-sizing: border-box;
                                padding-left: .5rem /* 10/20 */;
                                padding-right: .5rem;
                                font-size: .8rem /* 16/20 */;
                                color:#666666;
                                display: flex;
                                justify-content: space-between;
                                div{
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                }
                                span{
                                    display: flex;
                                    align-items: center;
                                }
                                .cp{
                                    margin-left: 2rem;
                                    display: inline-block;
                                    width:3rem /* 60/20 */;
                                    height:1.5rem /* 30/20 */;
                                    background:rgba(234,243,240,1);
                                    border-radius:.8rem /* 16/20 */;
                                    font-size: .8rem /* 16/20 */;
                                    color:rgba(51,120,97,1);
                                    text-align: center;
                                    cursor: pointer;
                                }
                            }
                        }
                        .bot{
                            margin-top: 1rem;
                            height:2rem /* 40/20 */;
                            border-radius:.2rem /* 4/20 */;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            box-sizing: border-box;
                        }
                    }
                    .box23_center::after{
                            display:block;
                            content:'';
                            border-width:.5rem .5rem .5rem .5rem /* 16/20 */;
                            border-style:solid;
                            border-color:#CCCCCC transparent transparent transparent;
                            /* 定位 */
                            position:absolute;
                            left: 50%;
                            top:50%;
                            transform: translateX(0%) translateY(-50%) rotate(-90deg);
                    }
                    h3{
                        color:#222222FF;
                        font-weight: 600;
                        span{
                            float: right;
                            font-size: .65rem /* 13/20 */;
                            font-weight: 500;
                            line-height: 1.3rem /* 26/20 */;
                        }
                    }
                    span.title{
                        position: absolute;
                        display: inline-block;
                        width: 12.5rem /* 350/20 */;
                        height: 4rem /* 100/20 */;
                        top: -2.5rem;
                        right: 1rem;
                        background: url('../../assets/images/third/title.png') no-repeat;
                        background-size: cover;
                        box-sizing: border-box;
                        padding: .5rem 1rem;
                        color:#D67869FF;
                        i{
                            position: absolute;
                            top: 0.5rem;
                            right: 0.6rem;
                            cursor: pointer;
                        }
                    }
                }
                // .box23_left:before{
                //     display:block;
                //     content:'';
                //     border-width:.8rem .8rem .8rem .8rem /* 16/20 */;
                //     border-style:solid;
                //     border-color:#fff transparent transparent transparent;
                //     /* 定位 */
                //     position:absolute;
                //     left:-1.6rem;
                //     top:50%;
                //     transform: translateY(-50%) rotate(90deg);
                // }
                .p_info_c{
                    color:#229C89;
                    font-size: 14px;
                    box-sizing: border-box;
                    padding-bottom: 0rem;
                    border-bottom: 0px solid #cccccc;
                    line-height: 2rem;
                    display: flex;
                    justify-content: flex-start;
                }
                .one2{
                    width: 100%;
                    margin: .6rem 0;
                    border-bottom: 1px solid rgba(230,230,230,1);
                    span{
                        font-size: 16px;
                        line-height: 1.5rem;
                        color:#666666;
                    }
                    
                }
                .one_te{
                    width: 100%;
                    height: 5rem /* 100/20 */;
                    background:rgba(243,243,243,1);
                    box-sizing: border-box;
                    padding: .5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border: 1px solid #e6e6e6;
                    margin-top: 1rem;
                    .one2_te{
                        display: flex;
                        justify-content: space-between;
                        color:#666666;
                        font-size: .75rem /* 15/20 */;
                        font-weight: 600;
                        line-height: 1.5rem;
                        div{
                            flex: 0;
                        }
                        .d_img{
                            display: flex;
                            align-items: center;
                            padding-bottom: .35rem /* 7/20 */;
                            img{
                                width: 1rem;
                                height: .7rem;
                                vertical-align: middle;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                    .one2_te:nth-child(1){
                        border-bottom: 1px solid rgba(230,230,230,1);
                    }
                }
                .but{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    button{
                        width: 14rem /* 280/20 */;
                        border: 0px;
                        color:white;
                        height:2rem;
                        background:linear-gradient(89deg,#337861,#58CFA7);
                        
                        border-radius:3px;
                        position: relative;
                    }
                    button:nth-child(2){
                        // margin-left: 3rem;
                        box-shadow:0px 0px 10px rgba(51,120,97,0.3);
                    }
                    .old_pay::after{
                        content: attr(data-info);
                        height: 2.5rem /* 50/20 */;
                        color:#D67869FF;
                        position: absolute;
                        top: 0rem;
                        left: 103%;
                        font-size: .4rem;
                    }
                    .old_pay:hover{
                        background:#337861;
                    }
                    button.nor{
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(230,230,230,1);
                        color:#D9D9D9FF;
                    }
                }
                .box23_right{
                    box-sizing: border-box;
                    padding: 3rem 2rem 0.5rem 4rem;
                    .box_color_red{
                        background: #D55457;
                        border-radius: 7px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        box-sizing: border-box;
                        padding: 1.5rem 0;
                        p{
                            border-bottom: 0px solid #cccccc;
                            box-sizing: border-box;
                            padding-left: 28%;
                            padding-bottom: 0px;
                            font-size: 1.1rem /* 17/20 */;
                            color:white;
                            letter-spacing: 2px;
                            b{
                                font-size: 1.2rem;
                                font-weight: 600;
                            }
                            i{
                                font-size: 2.5rem /* 50/20 */;
                                margin-left: 20%;
                            }
                        }
                    }
                }
                @media screen and(max-width: 480px) {
                    .box23_right{
                        padding: 0rem 0rem 0rem .2rem;
                        .box_color_red{
                            p{
                                padding-left: 10%;
                                i{
                                    margin-left: 36%;
                                }
                            }
                        }
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .box23{
                    height: 29rem;
                }
            }
            .box33{
                width: 50rem /* 100/20 */;
                height: 12rem /* 200/20 */;
                height:16.9rem /* 338/20 */;
                background:rgba(255,255,255,1);
                // padding-top: 6rem;
                margin: 0 auto;
                // margin-top: 5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;

                
                .title{
                    height: 3.7rem /* 74/20 */;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid rgba(230,230,230,1);
                    padding-left: 1rem;
                    font-size: 1.2rem /* 24/20 */;
                    color:rgba(51,51,51,1);
                }
                
                .t_b{
                    width: 100%;
                    flex: 1;
                    color:#333333;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding-left: 8.2rem /* 164/20 */;
                    align-items: flex-start;
                    justify-content: space-around;
                    p{
                        text-align: left;
                        padding-bottom: 0rem;
                        border-bottom: 0px solid #cccccc;
                        display: flex;
                        justify-content: center;
                        span{
                            color:#F34949;
                        }
                    }
                    p.s{
                        font-size: 12px;
                    }
                    button{
                        border: 0px;
                        width:10rem /* 160/20 */;
                        color:white;
                        height:2.5rem /* 35/20 */;
                        background:linear-gradient(85deg,#337861,#58CFA7);
                        border-radius:3px;
                    }
                    button.en{
                        width: 14rem;
                        font-size: .9rem /* 15/20 */;
                        font-weight: 600;
                    }
                }
            }
            @media screen and(max-width: 480px) {
                .box33{
                    width: 100%;
                }
            }
            
            .text_info{
                margin-top: .7rem;
                p{
                    font-size: .85rem /* 17/20 */;
                    box-sizing: border-box;
                    padding-bottom: 0rem;
                    border-bottom: 0px solid #cccccc;
                    line-height: 1.9rem;
                }
            }
            .text_info.bb{
                padding-bottom: .8rem;
                border-bottom: 1px solid rgba(204,204,204,1);
                // text-align: center;
                // padding-left: 50%;
                box-sizing: border-box;
                
                h3{
                    margin-left: 50%;
                    transform: translateX(-50%);
                    color: #333333;
                    font-weight: 600;
                    font-size: .8rem /* 16/20 */;
                }
                h3:nth-child(2){
                    margin-top: 1rem;
                }
                p{
                    margin-left: 50%;
                    transform: translateX(-50%);
                }
            }
            .bank_list{
                background: #fff;
                padding-left: .5rem;
                padding-right: .5rem;
                padding-bottom: 1rem;
                border:1px solid rgba(204,204,204,1);
                border-top: 0;
                h3{
                    color: #333333;
                    font-weight: 600;
                    font-size: 1rem /* 16/20 */;
                    line-height: 3rem;
                }
                h3.h3_border{
                    position: relative;
                    font-weight: 500;
                    color:#666666FF;
                    text-align: center;
                }
                h3.h3_border.en{
                        font-size: 15px;
                }
                .h3_border:after,
                .h3_border:before{
                    position: absolute;
                    top: 50%;
                    background: #CCCCCC;
                    content: "";
                    height: 1px;
                    width: 24%;
                }
                .h3_border:before{
                    position: absolute;
                    top: 50%;
                    background: #CCCCCC;
                    content: "";
                    height: 1px;
                    left: 20%;
                }
                .h3_border:after{
                    right: 20%;
                }
                .bank{
                    margin:1rem 0;
                    border-bottom: 0px solid #cccccc;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    img{
                        width: 11.2rem /* 224/20 */;
                        height: 3rem /* 60/20 */;
                        // padding: .3rem;
                        border-radius: 4px;
                    }
                }
            }
            .baozhang{
                background:rgba(242,242,242,1);
                box-sizing: border-box;
                // padding: .5rem 1rem;
                display: flex;
                height: 8rem /* 160/20 */;
                flex-direction: column;
                justify-content: flex-start;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                display: flex;//@at-root
                flex-direction: row;
                justify-content: space-between;
                box-sizing: border-box;
                border:1px solid rgba(204,204,204,1);
                border-top: 0;
                .border_p{
                    height: 1px;
                    padding: 0;
                    background: rgba(242,242,242,.8)!important;
                    border-bottom:0;
                }
                .fourth{
                    flex:1;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    box-sizing: border-box;
                    align-items: center;
                    .f_one{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        box-sizing: border-box;
                        padding:  .5rem 1rem;
                        img{
                            width: 1.8rem /* 36/20 */;
                            height: 2.1rem /* 21/20 */;
                        }
                        // div{
                        //     flex: 1;
                        //     box-sizing: border-box;
                        //     display: flex;
                        //     flex-direction: column;
                        //     justify-content: space-around;
                            // border-bottom: 1px solid rgba(230,230,230,1);
                            h4{
                                color:#333333;
                                font-size: .85rem /* 17/20 */;
                                font-weight:bold;
                                text-align: center;
                                line-height: 1.5rem /* 30/20 */;
                            }
                            p{
                                color:#666666;
                                font-size: .7rem /* 14/20 */;
                                line-height: 1.5rem;
                                border-bottom:0;
                                padding-bottom:0;
                                text-align: center;
                            }
                        // }
                    }
                    .pborder{
                        width: .15rem /* 3/20 */;
                        height: 3rem /* 100/20 */;
                        background: rgba(204,204,204,1);
                    }
                }
            }
        }
    }
    .newAdd{
        max-width: 60rem;
        margin: 1.25rem /* 25/20 */ auto;
        .new_nav{
            height: 75px;
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
            border-radius: 38px;
            p{
                padding: 0!important;
                line-height: none;
                display:flex;
                justify-content: center;
                align-items: center;
                font-size: 1rem;
                font-weight: 400;
                color:rgba(51,51,51,1);
                i.num{
                    display: flex;
                    width:26px;
                    height:26px;
                    // background:rgba(255,255,255,1);
                    border-radius:50%;
                    // color:rgba(76,96,133,1);
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    border:1px solid rgba(51,51,51,1);
                    color:rgba(51,51,51,1);
                    margin-right: 3px;
                }
                i.num.setColor{
                    background:rgba(255,255,255,1);
                    color:rgba(76,96,133,1);
                    border:none;
                }
            }
            p.setColor{
                color:rgba(255,255,255,1);
            }
            p.setColor:first-child{
                font-size: 1rem /* 20/20 */;
            }
            .c2one{
                flex: .58;
            }
            .c2one.en{
                flex: 1;
            }
            .c2two{
                flex:2;
                i{
                    display: flex;
                    font-size: 30px;
                    color:#f34949;
                    font-weight: 600;
                }
                span{
                    color:#666666;
                }
                span.time{
                    color:#337861;
                   
                }
            }
        }
        .new_nav.nac1{
            background: url('../../assets/images/third/none.png') no-repeat;
            background-size: cover;
        }
        .new_nav.nac1.en{
            background: url('../../assets/images/third/none_en.png') no-repeat;
            background-size: cover;
        }
        .new_nav.nac2{
            background: url('../../assets/images/third/ntwo.png') no-repeat;
            background-size: cover;
        }
        .new_nav.nac2.en{
            background: url('../../assets/images/third/ntwo_en.png') no-repeat;
            background-size: cover;
        }
        .new_nav.en{
            p{
                font-size: .9rem /* 18/20 */!important;
            }
        }
        .new_body{
            margin-top: 1rem;
            width:60rem /* 1200/20 */;
            height:27.35rem /* 547/20 */;
            background:rgba(255,255,255,1);
            border:1px solid rgba(204,204,204,1);
            border-radius:.5rem /* 10/20 */;
            .new_body_top{
                height: 16.75rem /* 335/20 */;
                background: #FFFFFF;
                border-top-left-radius:.5rem;
                border-top-right-radius:.5rem;
                box-sizing: border-box;
                padding:2rem /* 40/20 */ 1.75rem /* 35/20 */ ;
                display: flex;
                justify-content: space-between;
                .new_top_lef{
                    .box_new{
                        width: 24rem /* 480/20 */;
                        border:1px solid rgba(230,230,230,1);
                        height: 10rem /* 200/20 */;
                        span{
                            font-size:16px;
                            font-weight:400;
                            color:rgba(102,102,102,1);
                        }
                        div{
                            box-sizing: border-box;
                            padding-left: 1rem;
                        }
                        .box_one{
                            height: 5rem /* 100/20 */;
                            border-bottom:1px solid rgba(230,230,230,1);
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            span.color{
                                font-size: 1.5rem /* 30/20 */;
                                color:rgba(51,120,97,1);
                            }
                        }
                        .box_te{
                            height: 2.5rem /* 50/20 */;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                        }
                        .box_te.b{
                            border-bottom:1px solid rgba(230,230,230,1);
                            img{
                                margin: 0 .3rem;
                            }
                        }
                        .box_te.end{
                            font-size:.7rem /* 14/20 */;
                            background:rgba(234,243,240,1);
                            color:rgba(51,51,51,1);
                        }
                    }
                    p{
                        width: 24.1rem /* 482/20 */;
                        height:2rem /* 40/20 */;
                        background:rgba(76,96,133,0.1);
                        margin-top: 1rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size:.9rem /* 18/20 */;
                        font-weight:800;
                        color:rgba(51,51,51,1);
                        box-sizing: border-box;
                        padding-left: 1rem;
                        img{
                            margin-right: .5rem;
                        }
                    }
                    p.en{
                        font-size: .75rem;
                    }
                }
                .new_top_right{
                    .box_new{
                        width: 30rem /* 600/20 */;
                        border:1px solid rgba(230,230,230,1);
                        height: 10rem /* 200/20 */;
                        span{
                            font-size:16px;
                            font-weight:400;
                            color:rgba(102,102,102,1);
                        }
                        .box_one{
                            height: 5rem /* 100/20 */;
                            border-bottom:1px solid rgba(230,230,230,1);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            box-sizing: border-box;
                            padding-left: 1rem;
                            padding-right: .3rem;
                            span{
                                line-height: 1.5rem /* 30/20 */;
                            }
                            .box_one_set{
                                display: flex;
                                justify-content: space-between;
                                flex-direction: row;
                                h3{
                                    font-size:1.3rem /* 26/20 */;
                                    font-size: 1rem;
                                    color:rgba(51,51,51,1);
                                    // display:flex;
                                    line-height: 1.5rem;
                                    align-items: center;
                                    width: 77%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    &.ERC20{
                                        font-size: .9rem;
                                    }
                                }
                                .ri{
                                    display: flex;
                                    justify-content: space-between;
                                    position: relative;
                                    span.cp{
                                        display: flex;
                                        width:3rem /* 60/20 */;
                                        height:1.5rem /* 30/20 */;
                                        background:rgba(234,243,240,1);
                                        border-radius:.75rem /* 15/20 */;
                                        justify-content: center;
                                        align-items: center;
                                        font-size: .8rem /* 16/20 */;
                                        color:rgba(51,120,97,1);
                                        cursor: pointer;
                                        margin-right: .7rem;
                                    }
                                    span.cp.en{
                                        margin-right: .2rem;
                                    }
                                    span.cp:hover{
                                        background:rgba(51,120,97,1);
                                        color:white;
                                    }
                                    span.qr{
                                        color:rgba(51,120,97,1);
                                        font-size:.8rem /* 16/20 */;
                                        text-decoration: underline;
                                        cursor: pointer;
                                    }
                                    div{
                                        position: absolute;
                                        width: 11.05rem /* 181/20 */;
                                        height: 10.5rem /* 170/20 */;
                                        background: url('../../assets/images/third/im_bc.png') no-repeat;
                                        background-size: cover;
                                        bottom: -4.5rem /* 72/20 */; 
                                        left: -7rem /* 100/20 */;
                                        display: flex;
                                        align-items: center;
                                        justify-content: flex-start;
                                        box-sizing: border-box;
                                        padding-left: 1.3rem;
                                        padding-top: .3rem;
                                    }
                                }
                            }
                        }
                        .box_te{
                            height: 2.5rem /* 50/20 */;
                            box-sizing: border-box;
                            padding-left: 1rem;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                        }
                        .box_te.b{
                            border-bottom:1px solid rgba(230,230,230,1);
                            .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                                background-color: white;
                                // border-color: red!important;
                                border:1px solid #50917C;
                                color:#50917C ;
                                position: relative;
                                &::after{
                                    content: '';
                                    position: absolute;
                                    bottom: 0px;
                                    right: 0px;
                                    width: 15px;
                                    height: 15px;
                                    background-image: url('../../assets/images/third/check.png');
                                    background-size: cover;
                                }
                            }
                            .el-radio-button__orig-radio+.el-radio-button__inner{
                                background-color:  #EDF8F4;
                                // border-color: none;
                                border: 0px;
                                color:#90CFBB;
                                border-right: 0px;
                            }
                        }
                        .box_te.end{
                            background:rgba(243,73,73,0.1);
                            font-size:.7rem /* 14/20 */;
                            font-weight:400;
                            color:rgba(243,73,73,1);
                        }
                    }
                    .new_button{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 1rem;
                        span{
                            width:14rem /* 280/20 */;
                            height:2rem /* 40/20 */;
                            border-radius: .15rem /* 3/20 */;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                        }
                        span.lef{
                            background:rgba(255,255,255,1);
                            border:1px solid rgba(230,230,230,1);
                            font-size:16px;
                            font-weight:400;
                            color:rgba(230,230,230,1);
                        }
                        span.right{
                            background:linear-gradient(1deg,rgba(51,120,97,1) 0%,rgba(88,207,167,1) 100%);
                            box-shadow:0px 0px 10px rgba(51,120,97,0.3);
                            font-size:16px;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                        }
                        span.right:hover{
                            background:#337861;
                        }
                    }
                }
            }
            .new_body_center{
                height: 2.5rem /* 50/20 */;
                background:rgba(250,250,250,1);
                border-top:1px solid rgba(204,204,204,1);
                border-bottom:1px solid rgba(204,204,204,1);
                position: relative;
                .info{
                    background: url('../../assets/images/third/bc_info.png') no-repeat;
                    background-size: cover;
                    // height: 2.9rem /* 58/20 */;
                    height:3.1rem;
                    width: 16.75rem /* 335/20 */;
                    position: absolute;
                    right: 0;
                        top: -.55rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size:18px;
                }
                .info.en{
                    width: 27rem /* 540/20 */;
                    background: url('../../assets/images/third/bc_info_en.png') no-repeat;
                    height:3.5rem;
                    right:-1px;
                    top: -.6rem;
                }
                .color{
                    color:#F34949;
                }
            }
            .new_body_bottom{
                height: 8rem /* 160/20 */;
                display: flex;
                background: #F2F2F2;
                justify-content: space-between;
                align-items: center;
                border-bottom-left-radius:.5rem;
                border-bottom-right-radius:.5rem;
                .new_bottom_one{
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    h3{
                        line-height: 2rem;
                        font-size:.9rem /* 18/20 */;
                        font-weight:800;
                        color:rgba(34,34,34,1);
                    }
                    p{
                        font-size:.7rem /* 14/20 */;
                        font-weight:400;
                        line-height:1.05rem /* 21/20 */;
                        color:rgba(102,102,102,1);
                        text-align: center;
                    }
                }
                .new_bottom_b{
                    width: .05rem /* 1/20 */;
                    height: 2.5rem /* 50/20 */;
                    background:rgba(204,204,204,1);
                }
                
            }

        }
        .new_body2{
            margin-top: 1.25rem /* 25/20 */;
            width:60rem /* 1200/20 */;
            height:12rem /* 240/20 */;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:.5rem /* 10/20 */;
            box-sizing: border-box;
            padding: 2rem /* 40/20 */ 1.5rem /* 30/20 */;
            li{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 2.75rem /* 55/20 */;
                img{
                    width: 1.25rem /* 25/20 */;
                    height: 1.25rem /* 25/20 */;
                    margin-right: .75rem /* 15/20 */;
                }
                .one_body2{
                    display: flex;
                    justify-content: flex-start;
                    font-size:18px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    align-items: center;
                    .r{
                        margin-left: 7rem /* 140/20 */;
                        display: flex;
                        align-items: center;
                        .num{
                            font-size:30px;
                            font-weight:800;
                            color:rgba(51,120,97,1);
                        }
                        .button{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width:170px;
                            height:40px;
                            border-radius:3px;
                            cursor: pointer;
                            color:white;
                            margin-right: .75rem /* 15/20 */;
                        }
                        .button.ok{
                            background:rgba(77,181,146,1);
                        }
                        .button.no{
                            background:rgba(225,209,157,1);
                        }
                        .search{
                            font-size:.9rem /* 18/20 */;
                            font-weight:400;
                            color:rgba(51,120,97,1);
                            text-decoration:underline;
                            cursor: pointer;
                        }
                    }
                }
            }
            li.border{
                border-bottom: 1px solid rgba(230,230,230,1);
            }
        }
    }
    
}
</style>
