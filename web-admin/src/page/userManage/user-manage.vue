<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>昵称：</span>
        <el-input
          v-model="nickname"
          placeholder="请输入用户名"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
      </div>
      <div class="input-item">
        <span>手机号：</span>
        <el-input
          v-model="mobile"
          placeholder="请输入手机号"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
      </div>
      <div class="input-item">
        <span>用户状态：</span>
        <el-select v-model="isDisable" placeholder="请选择" @change="changeSelect">
          <el-option
            v-for="item in isDisableOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getList">查询</el-button>
    </div>

    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.avatarUrl" :onerror="defaultImg" alt>
            </div>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="nickname" label="昵称"></el-table-column>
        <el-table-column :formatter="formatter" prop="mobile" label="手机号"></el-table-column>
        <el-table-column :formatter="formatter" prop="mobile" label="钱包余额"></el-table-column>
        <el-table-column :formatter="formatter" prop="mobile" label="偷听卡次数"></el-table-column>
        <el-table-column :formatter="formatter" prop="company" label="用户状态"></el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleShowModal(scope.row.id)">查看</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)">禁用</el-button>
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
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount"
      />
    </div>
  </div>
</template>

<script>
import { user } from "@/agent";

export default {
  name: "user-manage",

  data() {
    return {
      tableData: [],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      mobile: null,
      nickname: null,
      defaultImg: null,
      isDisableOptions: [
          {
              value: null,
              label: "全部"
          },
          {
              value: "y",
              label: "正常"
          },
          {
              value: "n",
              label: "冻结"
          },
      ],
      isDisable: null,
    };
  },
  mounted() {
    this.defaultImg = 'src="' + require("../../images/default.png") + '"';
    this.getList();
  },
  methods: {
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || "- -";
    },
    changeSelect() {
        console.log('选择了状态')
        console.log(this.isDisable)
    },
    // 获取表格元素列表
    async getList() {
      const param = {
        isDisable: this.isDisable,
        nickname: this.nickname,
        mobile: this.mobile,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      const { data = {} } = await user.getPage(param);
      const { bussData, count, pageCount } = data && data.data;

      if (data.status == 200) {
        this.tableData = bussData;
        this.pageCount = count;
      }
    },
    // 查询
    search: function(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getList();
      }
    },
    // 当前页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 当前页码
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  },

  filters: {
    dateFormat(date) {
      if (date) {
        return date.slice(0, 10);
      }
      return "- -";
    }
  }
};
</script>

<style lang="scss" scoped>
.input_modal {
  padding: 10px;
}
</style>

