<template>
  <div class="container">
    <div class="input_modal">
      <el-button type="primary" size="medium" @click="handleShowModal">新增城市</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>城市名称：</span>
        <el-input v-model="name" placeholder="请输入" class="proName" @keyup.enter.native="searchCity" />  
      </div>
      <el-button type="primary" size="medium" @click="searchCity">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="id" label="序号" />
        <el-table-column :formatter="formatter" prop="name" label="城市名称" />
        <el-table-column prop="" label="操作" width="200px" >
          <template slot-scope="scope">
            <el-button 
              type="primary" 
              size="mini"
              @click="handleShowModal(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDeleteItem(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="isAddCityModal"
      width="30%"
    >
      <div class="modal_input">
        <span>城市名称：</span>
        <el-input v-model="inputName" placeholder="请输入" class="proName" @keyup.enter.native="searchCity" />  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isAddCityModal = false">取 消</el-button>
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
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { city } from '@/agent'

export default {
  name: 'city-list',

  data() {
    return {
      name: null,
      id: null,
      inputName: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      isAddCityModal: false
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || "- -";
    },

    async getList() {
      const { data = {} } = await city.getList()
      const { bussData } = data && data.data

      if(data.status == 200) {
        this.tableData = bussData;
        this.total = bussData.length;
      }
    },
    
    async searchCity(e) {
      this.pageIndex = 1;
      const param = {
        name: this.name,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      const { data = {} } = await city.findCity(param)
      const { bussData } = data && data.data

      if(data.status == 200) {
        this.tableData = bussData;
        this.total = bussData.length;
      }
    },

    handleShowModal(id) {
      this.id = !Number(id) ? null : id
      this.isAddCityModal = !this.isAddCityModal
    },

    async handleConfirm() {
      let param
      if(this.id) {
        param = { id: this.id, name: this.inputName }
      } else {
        param = { name: this.inputName }
      }

      const { data = {} } = await city.save(param)
      if(data.status == 200) {
        this.handleShowModal()
        this.getList()
        this.inputName = null
      }
    },

    async handleDeleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let { data = {} } = await city.delete(id);
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

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  }
};
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
