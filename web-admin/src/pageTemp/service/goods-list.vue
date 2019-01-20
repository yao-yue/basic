<template>
  <div class="container">
     <div class="input_modal">
        <el-button type="primary" size="medium" @click="handleAdd()">新增分类</el-button>
        <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>
   
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="id" label="序号"></el-table-column>
        <el-table-column :formatter="formatter" prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteGoods(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="isAddClassModal" width="30%">
      <div class="modal_input">
        <span>分类名称：</span>
        <el-input v-model="name" placeholder="请输入" class="proName" @keyup.enter.native="searchCity" />  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isAddClassModal = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="pagination">
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page.sync="pageIndex" 
        :page-size="pageSize" 
        :page-sizes='[10,20,30,40]' 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total" />
    </div>

  </div>
</template>

<script>
import { service } from '@/agent'

export default {
  name: 'service-goods-list',
  
  data() {
    return {
      type: 'office',
      isAddClassModal: false,
      id: null,
      name: null,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      total: 0
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 无数据显示
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    handleGoBack() {
      this.$router.push({ path: "/service-list" })
    },
    // 新增分类弹窗
    handleAdd(val){
      this.isAddClassModal = !this.isAddClassModal
      this.id = val
    },
    // 获取分类列表
    async getList(date) {
      const param = {
        type: this.type,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ...date
      }
      const { data = {} } = await service.getGoodsTypePage(param)
      if(data.status == 200) {
        this.tableData = data.data.bussData
      }
    },
    // 保存，编辑商品分类
    async handleConfirm() {
      const param = {
        type: this.type,
        name: this.name,
        id: this.id
      }
      const { data = {} } = await service.saveGoodsType(param)
      if(data.status == 200) {
        this.id = null
        this.name = null
        this.getList()
        this.handleAdd()
      }
    },
    // 删除商品
    async deleteGoods(val) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const { data = {} } = await service.deleteGoodsType(val)
        if(data.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      })
    },

    search: function(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getList();
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  }
}
</script>
<style lang="scss" scoped>
.modal_input {
  display: inline-block;
  margin-right: 20px;
  clear: both;
  height: 50px;
  line-height: 50px;
  position: relative;
  .el-input {
    width: 168px;
  }
}
</style>