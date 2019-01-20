<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>用户昵称：</span>
        <el-input
          v-model="searchParams.nickname"
          placeholder="请输入用户昵称"
          class="proName"
        ></el-input>
      </div>
      <div class="input-item">
        <span>姓名：</span>
        <el-input
          v-model="searchParams.name"
          placeholder="请输入姓名"
          class="proName"
        ></el-input>
      </div>
      <div class="input-item">
        <span>联系电话：</span>
        <el-input
          v-model="searchParams.mobile"
          placeholder="请输入联系电话"
          class="proName"
        ></el-input>
      </div>
      <el-button
        type="primary"
        size="medium"
        @click="getList"
      >查询</el-button>
    </div>
    <div class="table_con">
      <el-table
        :data="tableData"
        :border='true'
      >
        <el-table-column
          prop="nickname"
          label="用户"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="反馈摘要"
        ></el-table-column>
        <el-table-column
          prop="gmtCreated"
          label="反馈时间"
        ></el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width='140'>
          <template slot-scope="scope">
            <el-button class="primary" type="info" size="mini" @click="getDetails(tableData[scope.$index])">
              查看
            </el-button>
            <el-button type="danger" size="mini" @click="deleteFeedBack(tableData[scope.$index].id)">删除</el-button>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="isShowDetailsModal"
      width="30%"
    >
      <div class="dialog-container">
        <p class="form">来自: {{dialogInfo.name}}</p>
        <div class="content">{{dialogInfo.content}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowDetailsModal = false">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  feedBack
} from '@/agent'
export default {
  data() {
    return {
      searchParams: {
        mobile: '',
        name: '',
        nickname: ''
      },
      tableData: [],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      isShowDetailsModal: false,
      dialogInfo: ''
    };
  },
  mounted() {
    this.pageIndex = this.$router.currentRoute.query.currentPage
      ? parseInt(this.$router.currentRoute.query.currentPage)
      : 1;
    this.getList();
  },
  methods: {
    async getList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        mobile: this.searchParams.mobile,
        nickName: this.searchParams.nickname,
        name: this.searchParams.name
      }
      let {data} = await feedBack.getList(param)
      if(data.status == 200) {
        this.tableData = data.data.bussData
        this.pageCount = data.data.count
      }
    },
    search: function(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getList();
      }
    },
    deleteFeedBack(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let {data} = await feedBack.delFeedBack(id);
          if(data.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getDetails(data) {
      console.log(data)
      this.isShowDetailsModal = true
      this.dialogInfo = data
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
.dialog-container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #141414;
  margin: 0;
  .form {
    width: 100%;
    margin: 0;
    text-align: left;
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    margin: 0;
    padding: 0 20% 50px 20%;
    margin-top: 30px;
    border-bottom:2px solid #eeeeee;
  }
}
</style>

