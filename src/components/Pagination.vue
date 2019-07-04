<template>
    <div class="pagination">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
let Worker= require('../assets/js/worker.js')
import { QueryAllAdListFun } from '../assets/js/api.js'
export default {
    props:[
        'childPagination'
    ],
    data() {
        return {
            currentPage:1,
            pageSize:100,
            workerRefresh:null,// 专门跑计时器的进程
        }
    },
    computed:{
        total(){
            if(this.$store.getters.table.data){
                return this.$store.getters.table.data.total;
            }else{
                return 0
            }
        },
        table_refresh(){
            return this.$store.getters.table_refresh;
        },
    },
    watch:{
        childPagination(n,o){
            console.log('翻页',n)
            // let item = Object.assign({},n,{rows:this.pageSize,current:this.currentPage})
            let item = n;
            item['rows'] = this.pageSize;
            item['current'] = this.currentPage;
            this.initPage(item)
        },
        table_refresh(n,o){
            if(n){
                this.autoGet()
            }else{
                console.log('dd')
                console.log(this.workerRefresh)
                this.workerRefresh.postMessage(
                    'close'
                )
                if(this.workerRefresh!= null){
                    // this.worker.terminate();
                    // this.worker = null
                }else{
                    
                }
            }
        }
    },
    async created(){
        // let item = await Object.assign({},this.childPagination,{rows:this.pageSize,current:this.currentPage})
        let item = this.childPagination;
        item['rows'] = this.pageSize;
        item['current'] = this.currentPage;
        await this.initPage(item)
        if(this.table_refresh){
            this.autoGet()
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // let item = Object.assign({},this.childPagination,{rows:val,current:this.currentPage})
            let item = this.childPagination;
            item['rows'] = this.pageSize;
            item['current'] = this.currentPage;
            this.initPage(item)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // let item = Object.assign({},this.childPagination,{rows:this.pageSize,current:val})
            let item = this.childPagination;
            item['rows'] = this.pageSize;
            item['current'] = this.currentPage;
            this.initPage(item)
        },
        /**
         * 初始化表格数据
         */
        async initPage(item) {
            console.log('翻页初始化',item)
            // 请求数据
            let num = item.coinTypeId
            if(num==undefined){
                return false
            }
             this.$parent.loading = true;
             let ob = {
                coinTypeId:item.coinTypeId,
                isBuy:item.type,
                page:item.current,
                rows:item.rows,
                countryInfoId:item.countryInfoId,
                payWayType:item.payWayType,
                otcTradeCurrencyId:item.otcTradeCurrencyId
            }
            if(item.giftCardId) {
                ob['giftCardId']=item.giftCardId
            }
            if(item.receiptWayTypes) {
                ob['receiptWayTypes'] = item.receiptWayTypes
            }
            let key = await QueryAllAdListFun(this,ob).then((res) => {
                return res;
            })
            let obj;
            if(key!=false) {
                obj = key;
                await this.$store.dispatch('_async_set_table',obj )
                this.$parent.loading = false;
            }
            
        },
        /**
         * 自动请求
         */
        autoGet(){
            if(this.workerRefresh!=null){
                this.workerRefresh.postMessage(
                    'close'
                )
            }
            
            this.workerRefresh = new Worker()
            this.workerRefresh.postMessage(
                'infinite'
            )
            this.workerRefresh.addEventListener('message',(res)=>{
                // console.log(res)
                let item = Object.assign({},this.childPagination,{rows:this.pageSize,current:this.currentPage})
                this.initPage(item)
            })
        },
        
    },
    beforeDestroy(){
        if(this.workerRefresh!=null){
            this.workerRefresh.postMessage(
                'close'
            )
        }
    }
}
</script>

<style lang="scss">
.pagination{
    text-align: center;
    margin-top: .5rem;
}
@media screen and(max-width: 480px) {
    .pagination{
        font-size: .3rem;
        span{
            margin-left: 0;
            margin-right: 0;
            font-size: .3rem;
        }
        .el-pagination{
            padding-left: 0;
            padding-right: 0;
        }
        .el-pagination__sizes{
            .el-select.el-select--mini{
                width: 5.5rem /* 70/20 */;
                .el-input{
                    width: 5.5rem /* 70/20 */;
                }
                input{
                    width: 5.5rem /* 70/20 */;
                }
            }
        }
    }
    
}
</style>
