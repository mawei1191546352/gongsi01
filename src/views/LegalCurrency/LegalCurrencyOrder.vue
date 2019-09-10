<!--
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2018-11-23 10:19:28
 * @LastEditors: mawei
 * @LastEditTime: 2019-07-18 18:00:04
 -->
<template>
    <div class="legal-currency-order">
        <top-nav></top-nav>
        <nav-bar v-show="false" :childSet="legalSet"></nav-bar>
        <div class="legal-currency-order-body">
            <div class="banxin" :class="chat_ok_ban?'banxin-te-chat':''">
                <div class="legal-order-body-top" :class="init_fabi_file.message!=''?'order-body-top2':''">
                    <h3>
                        <b v-show="detailShow" @click="$router.push('/my-legal-order-list')">{{$t('legal_currency_order.nav_list')}}></b>
                        <b v-show="!detailShow" @click="$router.push('/legal-currency')">{{$t('legal_currency_order.ads_list')}}></b>{{init_fabi_file.role=='0'?$t('legal_currency_order.nav_order_in'):$t('legal_currency_order.nav_order_out')}} 
                        <span class="time" v-show="time=='0'?false:true">({{$t('legal_currency_order.remain_time')}}：{{fortmatTime(time) }}) <i v-show="false" class="el-icon-question"></i> </span> 
                        <span class="order right">{{$t('legal_currency_order.order_num')}}：{{init_fabi_file.id}}</span>
                    </h3>
                    <div class="legal-order-body-center outer">
                        <div class="legal-center-left left">
                            <p class="title">{{init_fabi_file.role=='0'?$t('legal_currency_order.need_paid'):$t('legal_currency_order.transaction_paid')}}：</p>
                            <p class="underline">{{init_fabi_file.amountCny}} <i> {{init_fabi_file.tradeCoinType}}</i> </p>
                            <p class="title">{{init_fabi_file.role=='0'?$t('legal_currency_order.need_amount'):$t('legal_currency_order.transaction_amount')}}： <i class="right">{{$t('legal_currency_order.fee')}}：{{init_fabi_file.amountHandingFree}} {{(init_fabi_file.coinType) ? (init_fabi_file.coinType).toUpperCase():(init_fabi_file.coinType)}}</i></p>
                            <p class="underline font-size20">{{init_fabi_file.amount}} <i> {{(init_fabi_file.coinType) ? (init_fabi_file.coinType).toUpperCase():(init_fabi_file.coinType)}}</i> </p>
                            <p class="title">{{$t('legal_currency_order.price')}}：</p>
                            <p class="underline font-size20">{{init_fabi_file.cnyUnitPrice}} <i> {{init_fabi_file.tradeCoinType}}</i> </p>
                            <p class="title">{{init_fabi_file.role=='0'?$t('legal_currency_order.need_time'):$t('legal_currency_order.transaction_time')}}：</p>
                            <p class="underline font-size20">{{init_fabi_file.startTime}}  </p>
                            <p class="button outer">
                                <!-- v-show="init_fabi_file.role=='1' && (init_fabi_file.status=='3' || init_fabi_file.status=='4')" -->
                                <span class="normal left fangxing do"
                                v-show="(init_fabi_file.role=='1' && (init_fabi_file.status=='3' || init_fabi_file.status=='4') && init_fabi_file.isComplaint=='0')
                                || (init_fabi_file.role=='1' && init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='0' && init_fabi_file.complaintRole=='1') "
                                @click="legal_release=true;"
                                >{{$t('legal_currency_order.release')}}{{init_fabi_file.coinType}}</span>
                                <!-- && init_fabi_file.role=='1' -->

                                <span class="normal left shensu do"
                                v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='0'"
                                :class="init_fabi_file.role=='1'?'shensu-color-red':(init_fabi_file.complaintET=='0'?'shensu-color-red':'shensu-color-gray')"
                                @click="complaintET=='0' ? shensu_submit=true:(console.log('不能提交申诉'));"
                                >{{$t('legal_currency_order.appeal')}}<i style="font-size:.65rem;"
                                v-if="(complaintET=='0' ?false:true)"
                                >({{init_fabi_file.role=='1'?'':(init_fabi_file.complaintET=='0'?'':fortmatTime(complaintET,2))}})</i></span>

                                <span class="normal left shensu-inline do"
                                v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='0'"
                                >{{init_fabi_file.complaintRole=='1'?$t('legal_currency_order.be_appeal'):$t('legal_currency_order.appealing')}}</span>

                                <span class="normal left already-pay do" :class="lang"
                                v-show="init_fabi_file.role=='0' && init_fabi_file.status=='3'"
                                @click="marked_payment=true;"
                                >{{$t('legal_currency_order.mark_paid')}}</span>

                                <!-- <span class="normal left cancel-order"
                                v-show="init_fabi_file.role=='0' && init_fabi_file.isOwner=='1' && init_fabi_file.status=='3'"
                                @click="cancel_order=true;"
                                >取消订单</span> -->
                                <span class="normal left cancel-order do"
                                v-show="init_fabi_file.role=='0' && init_fabi_file.status=='3'"
                                @click="cancel_order=true;"
                                >{{$t('legal_currency_order.order_cancle')}}</span>

                                <span class="all-length order-list do"
                                v-show="init_fabi_file.status=='6' ||init_fabi_file.status=='2' ||init_fabi_file.status=='5'"
                                @click="$router.push('/my-legal-order-list')"
                                >{{$t('legal_currency_order.order_list')}}</span>

                                <span class="all-length order-list do" :class="lang"
                                v-show="init_fabi_file.status=='1'"
                                @click="$router.push('/legal-currency')"
                                >{{init_fabi_file.role=='0'?$t('legal_currency_order.order_overtime_in'):$t('legal_currency_order.order_overtime_out')}}</span>

                                <span class="all-length order-already-cancel"
                                v-show="init_fabi_file.status=='0'"
                                
                                >{{$t('legal_currency_order.order_cancled')}}</span>
                                <!-- <span class="all-length order-already-cancel"
                                v-show="init_fabi_file.status=='5' && init_fabi_file.complaintStatus=='0'"
                                
                                >后台取消</span>
                                <span class="all-length order-already-cancel"
                                v-show="init_fabi_file.status=='5' && init_fabi_file.complaintStatus=='1'"
                                
                                >申诉取消</span> -->
                            </p>
                            
                        </div>
                        <div class="legal-center-right right">
                            <h3
                            v-show="(init_fabi_file.status=='3' || init_fabi_file.status=='4') && init_fabi_file.role=='0'"
                            >{{$t('legal_currency_order.out_pay_me')}} <span class="right" style="">{{$t('legal_currency_order.pay_code')}}：<i style="color:#F05B5F;">{{init_fabi_file.referenceCode}}</i></span></h3>
                            <h3
                            v-show="(init_fabi_file.status=='3' || init_fabi_file.status=='4') && init_fabi_file.role=='1'"
                            >{{$t('legal_currency_order.in_pay_me')}} <span class="right" style="">{{$t('legal_currency_order.pay_code')}}：<i style="color:#F05B5F;">{{init_fabi_file.referenceCode}}</i></span></h3>
                            <h3
                            v-show="init_fabi_file.status=='0'"
                            >{{$t('legal_currency_order.status_cancled')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='5'"
                            >{{$t('legal_currency_order.status_closed')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='2' && init_fabi_file.role=='0'"
                            >{{$t('legal_currency_order.status_done')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='6' && init_fabi_file.role=='0'"
                            >{{$t('legal_currency_order.status_done')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='2' && init_fabi_file.role=='1'"
                            >{{$t('legal_currency_order.status_transfer_done')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='6' && init_fabi_file.role=='1'"
                            >{{$t('legal_currency_order.status_transfer_done')}}</h3>
                            <h3
                            v-show="init_fabi_file.status=='1'"
                            >{{$t('legal_currency_order.status_overtime')}}</h3>
                            <div class="center-right-box">
                                <el-radio-group v-show="(init_fabi_file.status=='3' || init_fabi_file.status=='4')" v-model="radio" :disabled="disabled = (init_fabi_file.status=='3'?false:true)">
                                    <li>
                                        <el-radio :label="item.id" v-for="(item,key) in pay_methods" :key="key"> 
                                            <img :src="item.type=='0'? bankImg:(item.type=='1'?zhiImg:weiImg)" alt=""> 
                                            <span style="padding-left:.3rem;box-sizing:border-box;">{{item.type=='0'?item.name+' ':(item.type=='1'?item.name+' '+$t('legal_currency_order.ali'):item.name+' '+$t('legal_currency_order.wx'))}}</span>
                                            <span>{{item.type=='0'? item.bankCardNumber:(item.type=='1'?item.alipayAccount:item.wxAccount)}}</span>
                                             <span v-show="item.type =='0'"> {{item.bankAccount + " " + item.branchAccount}} </span> 
                                             <span v-show="item.type=='1'" class="saoma" :data-zhi="item.alipayQrCode" @mouseover="getPath(item.alipayQrCode)">
                                                 <img :src="item.alipayQrCode" :id="item.alipayQrCode" alt="">{{$t('legal_currency_order.qs_pay')}}</span>
                                                 <span v-show="item.type=='2'" class="saoma" :data-zhi="item.wxQrCode" @mouseover="getPath(item.wxQrCode)">
                                                     <img :id="item.wxQrCode" :src="item.wxQrCode" alt="">{{$t('legal_currency_order.qs_pay')}}</span> 
                                                     <img style="float:right;transform:translateY(25%) translateX(0%);width:1.5rem;height:1.5rem;border-radius:0.75rem;" :src="item.logo" alt="">
                                        </el-radio>
                                        <p v-show="init_fabi_file.payWayType==1"><img style="margin-right:.3rem;" src="../../assets/images/legal-currency/gift.png" alt="">{{init_fabi_file.giftCard?init_fabi_file.giftCard.cardName:''}}</p>
                                    </li>
                                </el-radio-group>
                                
                                <p v-show="init_fabi_file.status=='1'">{{init_fabi_file.role=='0'?$t('legal_currency_order.in'):$t('legal_currency_order.out')}}{{$t('legal_currency_order.over2h')}}</p>
                                <p v-show="init_fabi_file.status=='0' ||init_fabi_file.status=='5'">{{init_fabi_file.role=='1'?init_fabi_file.coinType+$t('legal_currency_order.have_return'):$t('legal_currency_order.have_order_cancled')}}</p>
                                <p v-show="init_fabi_file.status=='2'">{{init_fabi_file.role=='0'?`${$t('legal_currency_order.have_in')}${init_fabi_file.amount} ${init_fabi_file.coinType}`:`${$t('legal_currency_order.have_out')}${init_fabi_file.amount} ${init_fabi_file.coinType}`}}</p>
                                <p v-show="init_fabi_file.status=='6'">{{init_fabi_file.role=='0'?`${$t('legal_currency_order.have_in')}${init_fabi_file.amount} ${init_fabi_file.coinType}`:`${$t('legal_currency_order.have_out')}${init_fabi_file.amount} ${init_fabi_file.coinType}`}}</p>
                            </div>
                            <div class="center-right-box-bottom">
                               <h3
                                v-show="init_fabi_file.role=='0'"
                                >{{$t('legal_currency_order.out_user')}}</h3>
                                <h3
                                v-show="init_fabi_file.role=='1'"
                                >{{$t('legal_currency_order.in_user')}}</h3>
                                <div class="box-bottom-bom outer">
                                    <div class="left-box left">
                                        <div class="center-init">
                                            <div class="img" @click="goDe(init_fabi_file.item)">
                                                <img src="" alt="" :data-name="init_fabi_file.item?(init_fabi_file.item.tUsername).slice(0,1):''">
                                            </div>
                                            <div class="user">
                                                <div class="user-top">
                                                    <span class="username" :title="init_fabi_file.item?(init_fabi_file.item).tUsername:''">{{init_fabi_file.item?((init_fabi_file.item).tUsername.length>10?(init_fabi_file.item).tUsername.slice(0,7)+'...':(init_fabi_file.item).tUsername):''}}</span><span :class="(init_fabi_file.item ?(init_fabi_file.item.isOnline=='0'?'status status_unline':'status status_inline'):'')">{{init_fabi_file.item?(init_fabi_file.item.isOnline=='1'?$t('legal_currency_order.inline'):$t('legal_currency_order.unline')):''}}</span>
                                                </div>
                                                <div class="xinyong" v-show="true">
                                                    <!-- <img src="../../assets/images/legal-currency/xy@2x.png" alt=""><span >信用度</span><span >{{init_fabi_file.item?init_fabi_file.item.creditRatio :''}}%</span> -->
                                                    <span style="color:#4C6085;font-size: 0.8rem;font-weight: 550;">{{init_fabi_file.item?(init_fabi_file.item).tRealName:''}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="border-box left"></div>
                                    <div class="right-box right">
                                        <p class="p-phone" v-show="init_fabi_file.isComplaint!='1' 
                                        && init_fabi_file.status!='0' && init_fabi_file.status!='2' 
                                        && init_fabi_file.status!='5' && init_fabi_file.status!='1'
                                        
                                        && init_fabi_file.status!='6'">{{$t('legal_currency_order.phone_num')}}：<i v-show="phoneTime!=0">({{fortmatTime(phoneTime)}})</i></p>
                                        <p class="p-phone-text" v-show="phoneTime!=0
                                        && !(init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='0')"><i>{{$t('legal_currency_order.phone_num_s')}}</i><br>
                                        <i>{{$t('legal_currency_order.phone_num_s2')}}</i></p>
                                        <p style="margin-top:.5rem;" v-show="init_fabi_file.status!='0' && init_fabi_file.status!='6' && init_fabi_file.status!='2' && phoneTime=='0' && init_fabi_file.isComplaint!='1'">{{(init_fabi_file.item?init_fabi_file.item.tPhone==null :null)?'无':(init_fabi_file.item ?init_fabi_file.item.tPhone:'')}}</p>
                                        <!-- <p style="line-height:1.3rem;" v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='0'"
                                        >{{init_fabi_file.complaintRole=='1'?(init_fabi_file.role=='0'?'卖方已对您的订单':'买方已对您的订单'):(init_fabi_file.role=='0'?'您已对卖方的订单':'您已对买方的订单')}}<i style="color:rgba(92, 137, 204, 1);">{{init_fabi_file.id}}</i>提起申诉，{{$t('legal_currency_order.appeal_code')}}{{init_fabi_file.certificate}}.{{$t('legal_currency_order.concat_you')}} </p>
                                         -->
                                         <p style="line-height:1.3rem;" v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='0'"
                                        >{{init_fabi_file.complaintRole=='1'?(init_fabi_file.role=='0'?$t('legal_currency_order.seller2you'):$t('legal_currency_order.buyer2you')):(init_fabi_file.role=='0'?$t('legal_currency_order.you2seller'):$t('legal_currency_order.you2buyer'))}}<i style="color:rgba(92, 137, 204, 1);">{{init_fabi_file.id}}</i>{{$t('legal_currency_order.appeal_code')}}{{init_fabi_file.certificate}}.{{$t('legal_currency_order.concat_you')}} </p>
                                        <p style="margin-top:.45rem;" v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='1'">{{$t('legal_currency_order.appeal_time')}}：{{init_fabi_file.complaintTime}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="end-info end-info-remark" v-show="init_fabi_file.otcAdvertisementMessage!=''">
                        <p>{{$t('legal_currency_order.mark')}}：{{init_fabi_file.otcAdvertisementMessage}}</p>
                    </div>
                    <div class="end-info">
                        <p class=""
                        v-show="init_fabi_file.role=='1' && (init_fabi_file.status=='4') && init_fabi_file.isComplaint!='1'"
                        >{{$t('legal_currency_order.paid_start')}}<i style="color:#F05B5F;">15{{$t('legal_currency_order.paid_min')}}</i>{{$t('legal_currency_order.paid_end')}}</p>
                        <p class=""
                        v-show="init_fabi_file.role=='0' && (init_fabi_file.status=='4') && init_fabi_file.isComplaint!='1'"
                        >{{$t('legal_currency_order.remark_paid')}}</p>

                        <!-- <p class=""
                        v-show="init_fabi_file.status=='4' && init_fabi_file.isComplaint=='0'"
                        >您已将订单标记为“已付款”状态，请等待卖方确认收款和放行。</p> -->

                        <!-- init_fabi_file.status=='6' || -->
                        <p class=""
                        v-show="(init_fabi_file.status=='6' || (init_fabi_file.status=='5' && init_fabi_file.complaintStatus=='1'))"
                        >{{$t('legal_currency_order.judge')}}：{{init_fabi_file.amount}} {{init_fabi_file.coinType}} {{init_fabi_file.status=='5'?$t('legal_currency_order.return_se'):$t('legal_currency_order.release_se')}} 
                            <span style="margin-left:.4rem;">{{$t('legal_currency_order.judge_time')}}：{{init_fabi_file.complaintDealTime}}</span>
                        </p>
                        <!-- <p class=""
                        v-show="init_fabi_file.status=='5' && init_fabi_file.complaintStatus=='1'"
                        >申诉取消
                        </p> -->
                        <!-- <p class=""
                        v-show="init_fabi_file.status=='5' && (init_fabi_file.complaintStatus=='0' || init_fabi_file.complaintStatus== null)"
                        >后台取消
                        </p> -->

                        <!-- <p class=""
                        v-show="init_fabi_file.status=='6' && init_fabi_file.isComplaint=='1' && init_fabi_file.complaintStatus=='1'"
                        >系统判定申诉结果为：{{init_fabi_file.amountCny}} {{init_fabi_file.tradeCoinType}} {{init_fabi_file.role=='1'?'退回至卖方':'已放行至买方账户'}}
                            <span style="margin-left:.4rem;">判定时间：{{init_fabi_file.complaintDealTime}}</span>
                        </p> -->
                    </div>
                    <chat class="chat-position" :class="chat_ok?'ok':''"></chat>
                </div>
                <div class="legal-order-body-bottom" :class="lang">
                    <h3>{{$t('legal_currency_order.faq')}}</h3>
                    <div class="order-body-bottom-box">
                        <span><i class="el-icon-caret-bottom"></i>{{$t('legal_currency_order.faq1')}}</span>
                        <p style="color:#F05B5F;">1、{{$t('legal_currency_order.faq11')}}</p>
                        <p>2、{{$t('legal_currency_order.faq12')}}</p>
                        <p>3、{{$t('legal_currency_order.faq13')}}</p>
                        <p>4、{{$t('legal_currency_order.faq14')}}</p>
                        <p>5、{{$t('legal_currency_order.faq15')}}</p>
                        <p>6、{{$t('legal_currency_order.faq16')}}</p>
                    </div>
                    <div class="order-body-bottom-box">
                        <span><i class="el-icon-caret-bottom"></i>{{$t('legal_currency_order.faq2')}}</span>
                        <p>{{$t('legal_currency_order.faq21')}}</p>
                    </div>
                    <div class="order-body-bottom-box">
                        <span><i class="el-icon-caret-bottom"></i>{{$t('legal_currency_order.faq3')}}</span>
                        <p>{{$t('legal_currency_order.faq31')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-marked-payment pop" v-show="marked_payment">
            <i class="el-icon-close" @click="marked_payment=false;"></i>
            <h3>{{$t('legal_currency_order.item1_h')}}</h3>
            <div class="marked-body">
                <p>{{$t('legal_currency_order.item1_p1')}}</p>
                <p>{{$t('legal_currency_order.item1_p2')}}</p>
                <p class="color-red">{{$t('legal_currency_order.item1_p3')}}</p>
                <p class="button_p">
                    <span class="cancel_span" @click="marked_payment=false;">{{$t('info_item.cancle')}}</span> <span class="sure_span" @click="markedFun">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <div class="box-marked-payment pop" v-show="cancel_order">
            <i class="el-icon-close" @click="cancel_order=false;"></i>
            <h3>{{$t('legal_currency_order.item2_h')}}</h3>
            <div class="marked-body">
                <p>1.{{$t('legal_currency_order.item2_p1')}}</p>
                <p>2.{{$t('legal_currency_order.item2_p2')}}</p>
                <p class="button_p">
                    <span class="cancel_span" @click="cancel_order=false;">{{$t('info_item.cancle')}}</span> <span class="sure_span" @click="cancelOrderFun">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <div class="box-marked-payment-release pop" v-show="legal_release">
            <div class="release-top">
                <h3>{{$t('legal_currency_order.item3_h')}}<i class="el-icon-close" style="float:right;" @click="legal_release=false;"></i></h3>
                <p class="text" :class="lang">{{$t('legal_currency_order.item3_p1')}}</p>
            </div>
            <div class="release-bottom outer">
                <div class="release-box outer">
                    <div class="box">
                        <li><span>{{$t('legal_currency_order.item3_p2')}}：</span> <span class="per">{{init_fabi_file.role=='0'?user_info.name:init_fabi_file.item?(init_fabi_file.item).tRealName:''}}</span></li>
                        <li><span>{{$t('legal_currency_order.item3_p3')}}：</span> <span class="jine">{{init_fabi_file.amountCny}} <i> {{init_fabi_file.tradeCoinType}}</i></span></li>
                        <li><span>{{$t('legal_currency_order.item3_p4')}}：</span> <span class="num">{{init_fabi_file.amount}} {{(init_fabi_file.coinType) ? (init_fabi_file.coinType).toUpperCase():(init_fabi_file.coinType)}}</span></li>
                    </div>
                </div>
                <div class="button">
                    <span class="cancel_span left" @click="legal_release=false;">{{$t('info_item.cancle')}}</span> <span class="sure_span right" @click="releaseOrderFun">{{$t('info_item.confirm')}}</span>
                </div>
            </div>
            <!-- <div class="marked-body">
                <p>资金密码</p>
                <p class="p_input">
                    <input type="password" v-model="pass_salary">
                </p>
                <p class="button_p outer">
                    <span class="cancel_span left" @click="legal_release=false;">取消</span> <span class="sure_span right" @click="releaseOrderFun">确认</span>
                </p>
            </div> -->
        </div>
        <div class="box-marked-payment pop" v-show="shensu_submit">
            <i class="el-icon-close" @click="shensu_submit=false;"></i>
            <h3>{{$t('legal_currency_order.item4_h')}}</h3>
            <div class="marked-body no-top">
                <textarea :placeholder="$t('legal_currency_order.item4_p1')" v-model="shensu_msg"></textarea>
                <p class="button_p outer">
                    <span class="cancel_span left" @click="shensu_submit=false;">{{$t('info_item.cancle')}}</span> <span class="sure_span right" @click="shensuFun">{{$t('info_item.confirm')}}</span>
                </p>
            </div>
        </div>
        <div class="box-marked-payment-status" v-show="marked_payment || cancel_order || legal_release || shensu_submit"></div>
        
    </div>
</template>

<script>
import qs from 'qs'
import {legalOrderFindFun, FormatTime,
listPayWayAllFun,
legalConfrimPay,
legalCancelOrderFun,
legalReleaseOrderFun,
legalAppealOrderFun } from '../../assets/js/api'
import Worker from '../../assets/js/worker'
import TopNav from '../../components/TopNav.vue'
import NavBar from '../../components/NavBar.vue'
import Chat from '../Chat/index.vue'
export default {
    components:{
        'top-nav': TopNav,
        'nav-bar': NavBar,
        'chat': Chat,
    },
    data() {
        return {
            legalSet:'legal-currency-order',
            time:'',
            complaintET:'',
            phoneTime:'',
            worker:null,
            workerCompl:null,
            workerPhone:null,
            disabled:false,
            radio:'',
            pay_methods:[],
            bankImg:require('../../assets/images/legal-currency/bank@2x.png'),
            zhiImg:require('../../assets/images/legal-currency/ali@2x.png'),
            weiImg:require('../../assets/images/legal-currency/wx@2x.png'),
            marked_payment:false,
            cancel_order:false,
            legal_release:false,
            pass_salary:'',
            shensu_submit:false,
            shensu_msg:'',
            detailShow:false,
            chat_ok:false,
            chat_ok_ban:false,
        }
    },
    computed:{
        init_fabi_file(){
            this.time = this.$store.getters.init_fabi_file.expiredTimestamp;
            this.complaintET = this.$store.getters.init_fabi_file.complaintET;
            this.phoneTime = this.$store.getters.init_fabi_file.phoneTime;
            return this.$store.getters.init_fabi_file;
        },
        user_info(){
            return this.$store.getters.user_info;
        },
        lang() {
            return this.$i18n.locale
        }
    },
    async activated (){
        console.warn("详情")
        /**
         * 重新获取订单信息
         */
        let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
        .then((res) => {
            return res;
        })
        if(key!=false) {
            await this.$store.dispatch('_async_set_init_fabi_file',key)
            if(this.init_fabi_file.payWayType==0){
                await this.getPay()
            }
        }
        // 开始订单倒计时
        await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
        // 判断是否开始投诉倒计时
        if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
            if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
            }
        }
        if(this.init_fabi_file.phoneTime!='0'){
            this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
        }
        
        if(this.$route.params){
            if(this.$route.params.isDetal=='true'){
                this.detailShow = true
            }else{
                this.detailShow = false;
            }
        }

        // 
        document.addEventListener('click', (e) => {
            let items = document.querySelectorAll('.pop')
            let items2 = document.querySelectorAll('.do')
            let arr = Array.from(items)
            let arr2 = Array.from(items2)
            let b = arr.find((value,index,ar) => {
                return this.isParent(event.target, value)
            })
            let c = arr2.find((value,index,ar) => {
                return e.target ==value
            })
            if(b==false || b== undefined){
                if(c== undefined){
                    this.marked_payment = false
                    this.cancel_order = false
                    this.legal_release = false
                    this.shensu_submit = false
                }
            }
        })
        let k = setTimeout(()=> {
            this.chat_ok_ban = true;
            clearTimeout(k)
        },100)
        let t = setTimeout(()=> {
            this.chat_ok = true;
            clearTimeout(t)
        },300)
    },
    async created(){
        /**
         * 重新获取订单信息
         */
        let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
        .then((res) => {
            return res;
        })
        if(key!=false) {
            await this.$store.dispatch('_async_set_init_fabi_file',key)
            if(this.init_fabi_file.payWayType==0){
                await this.getPay()
            }
        }
        // 开始订单倒计时
        await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
        // 判断是否开始投诉倒计时
        if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
            if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
            }
        }
        if(this.init_fabi_file.phoneTime!='0'){
            this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
        }
        
        console.log(this.$route.params.isDetal =='true',this.init_fabi_file)
        if(this.$route.params){
            if(this.$route.params.isDetal=='true'){
                this.detailShow = true
            }else{
                this.detailShow = false;
            }
        }
        
    },
    mounted(){
        document.addEventListener('click', (e) => {
            let items = document.querySelectorAll('.pop')
            let items2 = document.querySelectorAll('.do')
            let arr = Array.from(items)
            let arr2 = Array.from(items2)
            let b = arr.find((value,index,ar) => {
                return this.isParent(event.target, value)
            })
            let c = arr2.find((value,index,ar) => {
                return e.target ==value
            })
            if(b==false || b== undefined){
                if(c== undefined){
                    this.marked_payment = false
                    this.cancel_order = false
                    this.legal_release = false
                    this.shensu_submit = false
                }
            }
        })
        let k = setTimeout(()=> {
            this.chat_ok_ban = true;
            clearTimeout(k)
        },100)
        let t = setTimeout(()=> {
            this.chat_ok = true;
            clearTimeout(t)
        },300)
    },
    methods:{
        goDe(item) {
            // console.log(item)
            this.$router.push({name:'CurrencyDealer',params:{id:item.oppositeUserId}})
        },
        isParent (obj,parentObj){
            while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
                if (obj == parentObj){
                    return true;
                }
                obj = obj.parentNode;
            }
            return false;
        },
        /**
         * 格式化时间
         */
        fortmatTime(leftTime,length){
            let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                // vm.$emit('time-end')
                return '0'
            }
            if(length){
                return  `${m}:${s}`
            }
            if(this.lang != 'zh') {
                return  `${d} Day ${h} Hour ${m} Minute ${s} millisecond`
            }
            return  `${d}天${h}小时${m}分${s}秒`
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
        /**
         * 倒计时
         */
        autoTime(t,str){
            if(str =='time'){
                if(this.worker!=null){
                    this.worker.postMessage(
                        'close'
                    )
                }
                
                this.worker = new Worker()
                this.worker.postMessage(
                    t
                )
                this.worker.addEventListener('message',(res)=>{
                    // console.log(res)
                    this.time = res.data;
                })
            }else if(str =='complaint') {
                if(this.workerCompl!=null){
                    this.workerCompl.postMessage(
                        'close'
                    )
                }
                
                this.workerCompl = new Worker()
                this.workerCompl.postMessage(
                    t
                )
                this.workerCompl.addEventListener('message',(res)=>{
                    console.log(res)
                    this.complaintET = res.data;
                })
            }else if(str=='phone') {
                if(this.workerPhone!=null){
                    this.workerPhone.postMessage(
                        'close'
                    )
                }
                
                this.workerPhone = new Worker()
                this.workerPhone.postMessage(
                    t
                )
                this.workerPhone.addEventListener('message',(res)=>{
                    // console.log(res)
                    this.phoneTime = res.data;
                })
            }
            
        },
        /**
         * 获取收款方式
         */
        async getPay(){
            let item={
                id:this.init_fabi_file.id
            }
            let key =await listPayWayAllFun(this,item)
            .then((res) => {
                return res;
            })
            if(key!=false) {
                this.pay_methods = key;
                this.radio = key[0].id
            }
        },
        getPath(key,item){
            if(item){
                if(key =='1'){
                    key = item.alipayQrCode
                }else if(key=='2'){
                    key = item.wxQrCode
                }
            }
            this.axios.post('/file/getUrl',qs.stringify({key:key}))
            .then((res) => {
                let data = res.data;
                if(data.code == 200){
                   let url = data.data.url
                    //    console.log(key,document.getElementById(key))
                    if(item){
                        if(key =='1'){
                            key = item.alipayQrCode+'ali'
                        }else if(key=='2'){
                            key = item.wxQrCode+'wx'
                        }
                    }
                    document.getElementById(key).src= url
                    //    return url
                    // console.log(base)
                }else{
                    this.$message({
                        type:'error',
                        message:"获取二维码,"+data.message
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        /**
         * 标记已付款
         */
        async markedFun(){
            let item = {
                id:this.init_fabi_file.id,
                receiptWayId:this.radio,
            }
            let key =await legalConfrimPay(this,item)
            .then((res) => {
                return res;
            })
            if(key !=false) {
                // this.$router.push('/legal-order-list')
                // 刷新数据
                this.marked_payment =false;
                let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    await this.$store.dispatch('_async_set_init_fabi_file',key)
                    // 开始订单倒计时
                    await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
                    // 判断是否开始投诉倒计时
                    if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
                        if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                            this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
                        }
                    }
                    if(this.init_fabi_file.phoneTime!='0'){
                        this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
                    }
                    // await this.getPay()
                    if(this.init_fabi_file.payWayType==0){
                        await this.getPay()
                    }
                    // console.log(this.init_fabi_file)
                    console.log(this.$route.params.isDetal =='true',this.init_fabi_file)
                    if(this.$route.params){
                        if(this.$route.params.isDetal=='true'){
                            this.detailShow = true
                        }else{
                            this.detailShow = false;
                        }
                    }
                }
            }
        },
        /**
         * 取消订单
         */
        async cancelOrderFun(){
            let item = {
                id:this.init_fabi_file.id,
            }
            let key =await legalCancelOrderFun(this,item)
            .then((res) => {
                return res;
            })
            if(key !=false) {
                // this.$router.push('/legal-order-list')
                // 刷新数据
                this.cancel_order =false;
                let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    await this.$store.dispatch('_async_set_init_fabi_file',key)
                    // 开始订单倒计时
                    await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
                    // 判断是否开始投诉倒计时
                    if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
                        if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                            this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
                        }
                    }
                    if(this.init_fabi_file.phoneTime!='0'){
                        this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
                    }
                    // await this.getPay()
                    if(this.init_fabi_file.payWayType==0){
                        await this.getPay()
                    }
                    // console.log(this.init_fabi_file)
                    console.log(this.$route.params.isDetal =='true',this.init_fabi_file)
                    if(this.$route.params){
                        if(this.$route.params.isDetal=='true'){
                            this.detailShow = true
                        }else{
                            this.detailShow = false;
                        }
                    }
                }
            }
        },
        /**
         * 放行订单
         */
        async releaseOrderFun(){
            let item = {
                id:this.init_fabi_file.id,
                // payPassword:this.pass_salary,
            }
            let key =await legalReleaseOrderFun(this,item)
            .then((res) => {
                return res;
            })
            if(key !=false) {
                // this.$router.push('/legal-order-list')
                // 刷新数据
                this.legal_release =false;
                let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    await this.$store.dispatch('_async_set_init_fabi_file',key)
                    // 开始订单倒计时
                    await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
                    // 判断是否开始投诉倒计时
                    if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
                        if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                            this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
                        }
                    }
                    if(this.init_fabi_file.phoneTime!='0'){
                        this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
                    }
                    //await this.getPay()
                    if(this.init_fabi_file.payWayType==0){
                        await this.getPay()
                    }
                    // console.log(this.init_fabi_file)
                    console.log(this.$route.params.isDetal =='true',this.init_fabi_file)
                    if(this.$route.params){
                        if(this.$route.params.isDetal=='true'){
                            this.detailShow = true
                        }else{
                            this.detailShow = false;
                        }
                    }
                }
            }
        },
        /**
         * 申诉订单
         */
        async shensuFun(){
            
            let item = {
                cnyTransactionOrderId:this.init_fabi_file.id,
                description:this.shensu_msg,
            }
            let key =await legalAppealOrderFun(this,item)
            .then((res) => {
                return res;
            })
            if(key !=false) {
                // this.$router.push('/legal-order-list')
                // 刷新数据
                this.shensu_submit =false;
                let key = await legalOrderFindFun(this,{id:this.init_fabi_file.id})
                .then((res) => {
                    return res;
                })
                if(key!=false) {
                    await this.$store.dispatch('_async_set_init_fabi_file',key)
                    // 开始订单倒计时
                    await this.autoTime(this.$store.getters.init_fabi_file.expiredTimestamp,'time')
                    // 判断是否开始投诉倒计时
                    if(this.init_fabi_file.status=='4' && this.init_fabi_file.isComplaint=='0'){
                        if(this.init_fabi_file.role=='0' && this.init_fabi_file.complaintET!='0'){
                            this.autoTime(this.$store.getters.init_fabi_file.complaintET,'complaint')
                        }
                    }
                    if(this.init_fabi_file.phoneTime!='0'){
                        this.autoTime(this.$store.getters.init_fabi_file.phoneTime,'phone')
                    }
                    // await this.getPay()
                    if(this.init_fabi_file.payWayType==0){
                        await this.getPay()
                    }
                    // console.log(this.init_fabi_file)
                    console.log(this.$route.params.isDetal =='true',this.init_fabi_file)
                    if(this.$route.params){
                        if(this.$route.params.isDetal=='true'){
                            this.detailShow = true
                        }else{
                            this.detailShow = false;
                        }
                    }
                }
            }
        }
    },
    beforeDestroy(){
        if(this.worker!=null){
            this.worker.postMessage(
                'close'
            )
        }
        if(this.workerCompl!=null){
            this.workerCompl.postMessage(
                'close'
            )
        }
        if(this.workerPhone!=null){
            this.workerPhone.postMessage(
                'close'
            )
        }
    }
}
</script>

<style lang="scss">
.legal-currency-order{
    .legal-currency-order-body{
        background:rgba(230, 230, 230, 1);
        box-sizing: border-box;
        padding-top: 10rem;
        padding-top: 3rem;
        padding-bottom: 3rem;
        @media screen and(max-width: 480px) {
             .legal-order-body-top{
                 height: 51rem!important;
                 height: 56rem!important;
                 .legal-center-right.right{
                    width: 29.05rem!important;
                    margin-top: .5rem;
                }
            }
            .box-bottom-bom .right-box{
                width: 13rem!important;
            }
        }
        .banxin{
            margin-right: 0px;
            margin-right: 24.5rem;
            // transition: margin-right .6s ease-in-out;
        }
        .banxin.banxin-te-chat{
            // margin: 0 11rem 0;
            margin-right: 24.5rem;
        }
        .legal-order-body-top.order-body-top2 {
            // height: 33rem /* 620/20 */;
        }
        .legal-order-body-top{
            // height: 31rem /* 620/20 */;
            padding-bottom: 1rem;
            background:rgba(255,255,255,1);
            h3{
                font-size: 1rem /* 20/20 */;
                color:rgba(51,51,51,1);
                line-height: 2.5rem /* 50/20 */;
                border-bottom: 1px solid rgba(204,204,204,1);
                box-sizing: border-box;
                padding-left: 1rem;
                padding-right: 2rem;
                b{
                    cursor: pointer;
                }
                b:hover{
                    color:rgba(92, 137, 204, 1);
                }
                span.time{
                    color:rgba(92, 137, 204, 1);
                    font-size: .9rem /* 20/20 */;
                }
                span.order{
                    margin-left: 1rem;
                    color:rgba(102,102,102,1);
                    font-size: .8rem /* 16/20 */;
                }
            }
        }
        .legal-order-body-center{
            box-sizing: border-box;
            padding: 0 2rem;
            padding-top: 3rem /* 60/20 */;
            .left{
                width: 16.5rem /* 330/20 */;
                .title{
                    line-height: 2rem /* 30/20 */;
                    font-size: .7rem /* 14/20 */;
                }
                .underline{
                    line-height: 2.5rem /* 50/20 */;
                    color:rgba(76,96,133,1);
                    font-size: 1.5rem /* 30/20 */;
                    i{
                        font-size: 1rem /* 20/20 */;
                    }
                    border-bottom: 1px solid rgba(204,204,204,1);
                }
                .underline.font-size20{
                    color:rgba(51,51,51,1);
                    font-size: 1rem /* 20/20 */;
                }
                .button{
                    margin-top: 1rem;
                    .normal{
                        display: inline-block;
                        width:7.5rem /* 150/20 */;
                        height:2.5rem /* 50/20 */;
                        background:rgba(204,204,204,1);
                        border-radius:.25rem /* 5/20 */;
                        margin-right:.3rem;
                        margin-left:.3rem;
                        cursor: pointer;
                        text-align: center;
                        line-height: 2.5rem;
                    }
                    .normal.fangxing{
                        background:rgba(76,96,133,1);
                        color:white;
                    }
                    .normal.shensu-color-gray{
                        background:rgba(204,204,204,1);
                        color:rgba(255,255,255,1);
                    }
                    .normal.shensu-color-red{
                        background:rgba(240,91,95,1);
                        color:rgba(255,255,255,1);
                    }
                    .normal.shensu-inline{
                        background:rgba(204,204,204,1);
                        color:rgba(255,255,255,1);
                    }
                    .normal.already-pay{
                        background:rgba(76,96,133,1);
                        color:rgba(255,255,255,1);
                    }
                    .already-pay.en{
                        font-size: .9rem /* 18/20 */;
                    }
                    .normal.cancel-order{
                        background:rgba(240,91,95,1);
                        color:rgba(255,255,255,1);
                    }
                    .all-length{
                        display: inline-block;
                        width:100% /* 150/20 */;
                        height:2.5rem /* 50/20 */;
                        background:rgba(204,204,204,1);
                        border-radius:.25rem /* 5/20 */;
                        cursor: pointer;
                        text-align: center;
                        line-height: 2.5rem;
                    }
                    .all-length.order-list{
                        background:rgba(76,96,133,1);
                        color:rgba(255,255,255,1);
                    }
                    .all-length.order-already-cancel{
                        background:rgba(204,204,204,1);
                        color:rgba(255,255,255,1);
                    }
                    .all-length.order-list.en{
                        font-size: .75rem /* 15/20 */;
                        font-weight: 600;
                    }
                }
            }
            
            .legal-center-right.right{
                width: 36.05rem /* 721/20 */;
                h3{
                    height: 2.25rem /* 45/20 */;
                    background:rgba(230,230,230,1);
                    font-size: .9rem /* 18/20 */;
                    color:rgba(51,51,51,1);
                    font-weight: bold;
                    padding-right: 1rem;
                }
                span.right{
                    font-size: 0.9rem;
                    color: #333333;
                    font-weight: 500;
                }
                .center-right-box{
                    height: 7.4rem /* 148/20 */;
                    background:rgba(242,242,242,1);
                    p{
                        box-sizing: border-box;
                        padding-left: 1rem;
                        font-size: .8rem /* 18/20 */;
                        line-height: 2.5rem /* 50/20 */;
                    }
                    .el-radio-group,
                    .el-radio{
                        display: inline-block;
                        box-sizing: border-box;
                        width: 100%;
                        height: 2.3rem /* 46/20 */;
                        // padding-left: 2rem /* 40/20 */;
                        line-height: 2.3rem;
                        .saoma{
                            position: relative;
                            margin-left: .5rem;
                            color:#5C9ACC!important;
                            img{
                                position: absolute;
                                content: '';
                                bottom: 0;
                                width: 6.5rem /* 130/20 */;
                                height: 6.5rem;
                                // background-image:attr( data-zhi );
                                border: .25rem /* 5/20 */ solid #CCCCCC;
                                // display: none;
                                // visibility: hidden;
                                z-index: -100;
                            }
                        }
                        .saoma:hover{
                            img{
                                position: absolute;
                                content: '';
                                bottom: 0;
                                left: 4rem;
                                width: 6.5rem /* 130/20 */;
                                height: 6.5rem;
                                // background-image:attr( data-zhi );
                                border: .25rem /* 5/20 */ solid #CCCCCC;
                                // display: none;
                                // visibility: show;
                                z-index: 100;
                            }
                        }
                    }
                    .el-radio{
                        padding-left: 1rem;
                        user-select: text!important;
                        padding-right: 1rem;
                    }
                    .el-radio.is-checked{
                        color:rgba(51,51,51,1);
                        background:rgba(234,246,255,1);
                        span{
                            color:rgba(51,51,51,1);
                        }
                        .el-radio__label{
                            font-size: .8rem!important;
                            span{
                                font-size: .8rem!important;
                            }
                            .saoma{
                                color:#5C9ACC!important;
                            }
                            // rhf
                        }
                    }
                    .el-radio+.el-radio{
                        margin-left:0;
                    }
                }
                .center-right-box-bottom{
                    margin-top: 1.5rem;
                    height: 10.5rem /* 210/20 */;
                    background:RGBA(242, 242, 242, 1);
                    .box-bottom-bom{
                        box-sizing: border-box;
                        padding: 0 1rem;
                        .left-box{
                            width: 12.55rem /* 251/20 */;
                            .center-init{
                                height: 2.5rem /* 50/20 */;
                                margin: .8rem 0;
                                margin-top: 2rem;
                                display: flex;
                                .img{
                                    display: inline-block;
                                    width: 2.5rem /* 50/20 */;
                                    height: 2.5rem;
                                    vertical-align: super;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    img{
                                        display: inline-block;
                                        width: 2.5rem /* 50/20 */;
                                        height: 2.5rem;
                                        border-radius: 1.25rem /* 25/20 */;
                                        background: rgba(24,38,77,1);
                                    }
                                    img::after{
                                        content: attr( data-name ) "";
                                        width: 2.5rem /* 50/20 */;
                                        height: 2.5rem;
                                        position: absolute;
                                        font-size: .8rem;
                                        // z-index: 120;
                                        color: white;
                                        text-align: center;
                                        line-height: 2.5rem;
                                    }
                                }
                                .user{
                                    display: inline-block;
                                    height: 3rem;
                                    width: 10rem /* 120/20 */;
                                    .user-top{
                                        display: inline-block;
                                        box-sizing: border-box;
                                        padding-left: .3rem;
                                        .username{
                                            color:rgba(51,51,51,1);
                                            font-size: .8rem /* 16/20 */;
                                            font-weight: 550;
                                        }
                                        span{
                                            
                                        }
                                        .status{
                                            box-sizing: border-box;
                                            display: inline-block;
                                            // width:1.75rem /* 35/20 */;
                                            // height:1rem /* 20/20 */;
                                            padding: .1rem .3rem;
                                            border-radius:.25rem /* 5/20 */;
                                            font-size: .6rem /* 12/20 */;
                                            line-height: .9rem;
                                            text-align: center;
                                            color: white;
                                            margin-left: .5rem;
                                        }
                                        .status.status_inline{
                                            background:rgba(34,156,137,1);
                                        }
                                        .status.status_unline{
                                            background:rgba(153,153,153,1);
                                            color: white;
                                        }
                                    }
                                    .user-bottom{
                                        display: inline-block;
                                        margin-top:.4rem;
                                        width: 7.4rem /* 148/20 */;
                                        height: 1.4rem /* 28/20 */;
                                        p{
                                            display: inline-block;
                                            width: 1.7rem /* 34/20 */;
                                            height: 1.3rem /* 26/20 */;
                                            border:.05rem /* 1/20 */ solid rgba(204,204,204,1);
                                            border-radius:.2rem /* 4/20 */;
                                            margin: 0 .3rem;
                                            vertical-align: middle;
                                            text-align: center;
                                            line-height: 1.3rem;
                                            img{
                                                display: inline-block;
                                                width: 1.15rem /* 23/20 */;
                                                height: .9rem /* 18/20 */;
                                            }
                                        }
                                    }
                                }
                                .xinyong{
                                    display:inline-block;
                                    width: 12rem;
                                    height: 1.5rem;
                                    text-align: left;
                                    box-sizing: border-box;
                                    padding-left: .3rem;
                                    img{
                                        display: inline-block;
                                        width: 1.15rem /* 23/20 */;
                                        height: 1.15rem /* 18/20 */;
                                        margin-right: .3rem;
                                    }
                                    
                                    span{
                                        color:rgba(102,102,102,1);
                                        font-size: .7rem /* 14/20 */;
                                        font-weight: 500;
                                        margin-right: .2rem;
                                    }
                                }
                            }
                        }
                        .border-box{
                            margin-top: 1.5rem;
                            height: 5rem /* 100/20 */;
                            width: 1px;
                            background:rgba(204,204,204,1);
                        }
                        .right-box{
                            width: 21rem /* 460/20 */;
                            box-sizing: border-box;
                            padding-top: 1rem;
                            p{
                                font-size: .7rem /* 14/20 */;
                            }
                            .p-phone{
                                margin-top: 1rem;
                            }.p-phone-text{
                                margin-top: .7rem;
                                i{
                                    line-height: 1.2rem
                                }
                            }
                        }
                    }
                }
            }
        }
        .end-info{
            box-sizing: border-box;
            padding: 0 2rem;
            margin-top:.5rem;
            p{
                // height:2rem /* 40/20 */;
                background:rgba(206,219,240,1);
                line-height: 2rem;
                box-sizing: border-box;
                padding-left: .5rem;
                font-size: .75rem /* 16/20 */;
                font-weight: 500;
                color:rgba(51,51,51,1);
            }
            
        }
        .end-info.end-info-remark{
            p{
                background:white;
                border-bottom: 1px solid #ccc;
                line-height: 1.2rem;
                color: #666;
                padding-bottom: .3rem;
            }
        }
        .legal-order-body-bottom{
            margin-top: 1.5rem /* 30/20 */;
            height: 24.5rem /* 450/20 */;
            background:rgba(255,255,255,1);
            box-sizing: border-box;
            padding: .6rem 1.5rem;
            h3{
                margin-top: 1rem;
                line-height: 2.5rem /* 50/20 */;
                font-size: .9rem /* 18/20 */;
                font-weight: bold;
                color:rgba(51,51,51,1);
            }
            .order-body-bottom-box{
                color:rgba(153,153,153,1);
                font-size: .7rem /* 14/20 */;
                span{
                    line-height: 2rem /* 40/20 */;
                    i{
                        color:rgba(51,51,51,1);
                    }
                }
                p{
                    line-height: 1.5rem /* 40/20 */;
                }
            }
        }
        .legal-order-body-bottom.en{
            height: 27.5rem;
        }
        @media screen and(max-width: 480px) {
            .legal-order-body-bottom{
                height: 35.5rem /* 450/20 */;
            }
        }
    }
    // 
    .box-marked-payment{
        z-index: 50;
        position: fixed;
        top: 50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        width:26rem /* 520/20 */;
        height:15.5rem /* 310/20 */;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        box-sizing: border-box;
        padding:  1rem 1.5rem;
        i{
            position: absolute;
            top: .5rem /* 10/20 */;
            right: .5rem /* 10/20 */;
        }
        i:hover{
            color: red;
            cursor: pointer;
        }
        h3{
            font-size: .8rem /* 16/20 */;
            color:rgba(51,51,51,1);
            line-height: 3rem /* 60/20 */;
            font-weight: bold;
        }
        .marked-body{
            margin-top: 1.2rem;
            p{
                font-size: .8rem /* 16/20 */;
                color:rgba(51,51,51,1);
                line-height: 1.5rem /* 30/20 */;
            }
            p.color-red{
                color: red;
            }
            p.button_p{
                margin-top: .5rem;
                text-align: right;
                span{
                    display: inline-block;
                    width:5rem /* 100/20 */;
                    height:2rem /* 40/20 */;
                    border-radius:.25rem /* 5/20 */;
                    line-height: 2rem;
                    text-align: center;
                    cursor: pointer;
                }
                .cancel_span{
                    border:1px solid rgba(204,204,204,1);
                }
                .sure_span{
                    margin-left: .5rem;
                    background:rgba(76,96,133,1);
                    color:white;
                }
            }
            p.p_input{
                width: 100%;
                margin-bottom: 1rem;
                input{
                    width: 100%;
                    height: 2rem;
                    border: 1px solid rgba(204,204,204,1);
                    box-sizing: border-box;
                    padding-left: .6rem;
                }
            }
            textarea{
                width:23rem /* 510/20 */;
                height:6rem;
                background:rgba(255,255,255,1);
                border:1px solid rgba(204,204,204,1);
                resize:none;
            }
        }
        .marked-body.no-top{
            margin-top: 0;
        }
    }
    // 占位
    .box-marked-payment-status{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        background: rgba(102,102,102,.6)
    }
    .box-marked-payment-release{
        z-index: 50;
        position: fixed;
        top: 50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        width:22.5rem /* 450/20 */;
        // height:18.45rem /* 369/20 */;
        background:rgba(76,96,133,1);
        box-shadow:0px 0px 13px 0px rgba(153,153,153,1);
        border-radius:.25rem /* 5/20 */;
        .release-top{
            height: 6.5rem /* 130/20 */;
            background: #4C6085;
            border-radius: 5px 5px 0px 0px ;
            box-sizing: border-box;
            padding: .95rem /* 19/20 */ 1rem /* 20/20 */;
            h3{
                font-size:1.1rem /* 22/20 */;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(255,255,255,1);
                i{
                    cursor: pointer;
                }
            }
            p.text{
                font-size:.9rem /* 18/20 */;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height: 2rem;
            }
            p.text.en{
                line-height: 1rem;
            }
        }
        .release-bottom{
            height: 12rem /* 240/20 */;
            background:rgba(255,255,255,1);
            border-radius:0px 0px 5px 5px;
            position: relative;
            .release-box{
                width:20.55rem /* 411/20 */;
                height:8.75rem /* 175/20 */;
                position: relative;
                margin: 0 auto;
                .box{
                    width:20.55rem /* 411/20 */;
                    height:9.5rem /* 190/20 */;
                    background:rgba(242,242,242,1);
                    border-radius:.25rem /* 5/20 */;
                    position: absolute;
                    top: -1.6rem /* 32/20 */;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: .75rem /* 15/20 */ .75rem /* 15/20 */;
                    li{
                        flex:1;
                        border-bottom: 1px solid rgba(204,204,204,1);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size:.8rem /* 16/20 */;
                            font-family:PingFang-SC-Medium;
                            font-weight:500;
                            color:rgba(102,102,102,1);
                        }
                        span.per{
                            font-size:.9rem /* 18/20 */;
                            font-family:PingFang-SC-Medium;
                            font-weight:500;
                            color:rgba(76,96,133,1);
                        }
                        span.jine{
                            font-size:1rem /* 20/20 */;
                            font-family:PingFang-SC-Bold;
                            font-weight:bold;
                            color:rgba(51,51,51,1);
                        }
                        span.num{
                            font-size:.8rem /* 16/20 */;
                            font-family:PingFang-SC-Medium;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                        }
                    }
                }
                
            }
            .button{
                width:20.55rem /* 411/20 */;
                position: relative;
                margin: 0 auto;
                .cancel_span{
                    width:8rem /* 160/20 */;
                    height:2rem /* 40/20 */;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(204,204,204,1);
                    border-radius:.25rem /* 5/20 */;
                    font-size:.9rem /* 18/20 */;
                    font-weight:400;
                    color:rgba(204,204,204,1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .sure_span{
                    width:8rem /* 160/20 */;
                    height:2rem /* 40/20 */;
                    background:rgba(76,96,133,1);
                    border-radius:.25rem /* 5/20 */;
                    font-size:.9rem /* 18/20 */;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }
        
    }

    // 聊天
    .chat-position{
        position: fixed;
        // top: 7rem;
        // top: 3rem;
        // bottom: -93.5vh;
        bottom: 0px;
        right: 0px;
        width:22rem /* 440/20 */;
        height:100vh;
        height: 84.5vh;
        height: 93.5vh;
        background:rgba(242,242,242,1);
        border:1px solid rgba(204,204,204,1);
        box-shadow:0px 3px 15px rgba(0,0,0,0.1);
        opacity:1;
        border-radius:5px 0px 0px 5px;
        // transition: all .8s ease-in-out;
    }
    .chat-position.ok {
        // transform: translateY(-93.5vh);
    }
}
</style>
