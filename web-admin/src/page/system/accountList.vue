<template>
  <div class="container">
    <el-button type="primary" @click="addItem()">新增</el-button>
    <div class="table_con">
      <el-table :data="tableData" :border='true'>
        <el-table-column prop="userName" label="登录名"></el-table-column>
        <el-table-column prop="trueName" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="roleName" label="所属角色"></el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width='140'>
          <template slot-scope="scope">
            <el-button class="link" type="info" size="mini">
              <router-link :to="{ name: 'accountEdit', query: {userId:tableData[scope.$index].userId,pageIndex:pageIndex}}" style="color: #fff;">编辑</router-link>
            </el-button>
            <el-button type="danger" size="mini" @click="deleteAccount(tableData[scope.$index].userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page.sync="pageIndex" 
        :page-size="pageSize" 
        :page-sizes='[10,20,30,40]' 
        layout="total, sizes, prev, pager, next" 
        :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  admin
} from '@/agent'
export default {
  data() {
    return {
      tableData: [],
      trueName: "",
      mobile: "",
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      url: "accountList"
    };
  },
  mounted() {
    this.pageIndex = this.$router.currentRoute.query.currentPage
      ? this.$router.currentRoute.query.currentPage
      : 1;
    this.getAccountList();
  },
  methods: {
    async getAccountList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        trueName: this.trueName,
        mobile: this.mobile
      };
      let {data} = await admin.getAdminList(param);
      if(data.status == 200) {
        this.tableData = data.data.bussData;
        this.pageCount = data.data.count;
      }
    },
    deleteAccount(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let {data} = await admin.delAdmin(id);
          if(data.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getAccountList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addItem() {
      this.$router.push("/accountEdit");
    },
    search: function(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getAccountList();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAccountList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getAccountList();
    },
    handleClick() {
      let url = "/" + this.url;
      this.$router.push(url);
    }
  },
  filters: {}
};
</script>
