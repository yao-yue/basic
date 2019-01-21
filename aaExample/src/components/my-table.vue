/**
 * Created by Eric on 2017/11/24.
 *
 * 表格组件
 *      此组件必须引用element-ui

 *  参数说明:
 *          @param {String} url  表格接口地址
 *          @param {object} param  表格接口请求参数(除去pageIndex,pageCount),
 *          @param {Boolean} isSelect 表格是否显示checkbox 默认false
 *          @param {Boolean} isPagination 表格是否显示分页 默认false
 *          @param {Array} configList 表格基础配置 
 *          @param {Integer} width 表格该列最小宽度 
 *  使用方式:
 *      ex:
 *        1.
 *       <table-list ref="tableList" :tableConfig='configList'></table-list>
 *             configList:{
 *                url:CONSTANT.URL.PLATFORM.FINDADVICEPAGE,
 *                 configList:[
 *                     {
 *                        label:'昵称',
 *                        prop:'nickname'
 *                     },
 *                     {   
 *                         slot:'img'
 *                     }
 *                 ],
 *                 param:{},
 *                 width:'',
 *                 isSelect:true,
 *                 isPagination:true
 *             }
 *        2.如果开启checkBox,父组件通过  v-on:selectTable="XX" 来获取选择的对象 返回对象格式为数组格式    
 *        3.如果表格显示的数据复杂的情况或者按钮等需求,通过slot插槽来解决,在configList加入含有插槽名称的对象,在父组件中加入该列内容
 *          ex:          
 *          <table-list ref="tableList" :tableConfig='configList'>
 *                    <el-table-column label="头像" slot="img" align="center" >
 *                        <span slot-scope="scope">
 *                            <span style="margin-left: 10px"><img class="avatar" :src="scope.row.imgurl?scope.row.imgurl:avatar" alt=""></span>
 *                        </span>
 *                    </el-table-column>
 *                    <el-table-column label="操作" slot="edit" min-width='100' align="center">
 *                        《template slot-scope="scope">
 *                            <el-button @click="handleDelete(scope.row.id)" type="text" size="small" style="background: red;color: #fff;padding: 7px 14px;">删除</el-button>    
 *                         《template>
 *                    </el-table-column>
 *           </table-list>   
 *               
 *          configList:[
 *               {
 *                  slot:'edit'
 *                },
 *                {   
 *                  slot:'img'
 *                }
 *          ],
 *       4.更新表格数据
 *          给父组件绑定ref引用信息 然后this.$refs.tableList.getList()触发子组件事件（tableList为ref引用信息在子组件上注册的值）
 */
<template>
  <div>
    <el-table :data="tableData" border 
      v-loading="loading"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="tableConfig.isSelect" fixed="left" 
         type="selection" min-width='100' align="center">
      </el-table-column>
      <template v-for="(item,index) in tableConfig.configList">
        <slot v-if="item.slot" :name="item.slot"></slot>
        <el-table-column :formatter="formatter" v-bind="item" :key="index" 
          align="center" show-overflow-tooltip :min-width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <el-pagination v-if="tableConfig.isPagination"
      @size-change="handleSizeChange" @current-change="pageSizeChange" 
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="10"
       layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
    </el-pagination>
  </div>
</template>

<script>
let common = require('../common.js');
let CONSTANT = require('../constant/constant.js');

export default {
  data() {
    return {
      menuShow: false,
      pageIndex: 1,
      loading: true,
      pageCount: 10,
      pageSize: 10,
      tableData: [],

    }
  },
  props: ['tableConfig'],
  created() {
    this.getList()
  },
  mounted() {

  },
  methods: {
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : '- -'
    },
    getList() {
      this.loading = true;
      let url = this.tableConfig.url,
        param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      Object.assign(param, this.tableConfig.param)
      common.requestAjax(url, param, (res) => {
        console.log(res,'resrsz')
        if (res.status == 200) {
          this.loading = false;
          let data = res.data;
          this.tableData = data.bussData;
          this.pageCount = data.count;
        }
      })
    },
    updatePost() {
      console.log(111111)
    },
    // 分页
    pageSizeChange(val) {
      this.pageIndex = val
      this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.$emit('selectTable', val);
    },
    formDate(num) {
      if (!num) return;
      return common.dateFormate(num);
    },
  }
}

</script>

<style lang="scss" scoped>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }

  .el-table {
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-table_1_column_2 {
      .cell {
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }

</style>
