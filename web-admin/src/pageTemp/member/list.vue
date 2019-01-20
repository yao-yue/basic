<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>用户名：</span>
        <el-input v-model="nickname" placeholder="请输入用户名" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>手机号：</span>
        <el-input v-model="mobile" placeholder="请输入手机号" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>公司名称：</span>
        <el-input v-model="company" placeholder="请输入公司名称" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <el-button type="primary" @click="getList">查询</el-button>
    </div>

    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="nickname" label="用户名"></el-table-column>
        <el-table-column :formatter="formatter" prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <div class="avatar" >
              <img :src="scope.row.avatarUrl" :onerror="defaultImg" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="birthday" label="生日">
          <template slot-scope="scope">
            <div>{{scope.row.birthday | dateFormat}}</div>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="mobile" label="手机"></el-table-column>
        <el-table-column :formatter="formatter" prop="company" label="公司名称"></el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page.sync="pageIndex" 
        :page-size="pageSize" 
        :page-sizes='[10,20,30,40]' 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="pageCount" />
    </div>
  </div>
</template>

<script>
import { member } from '@/agent'

export default {
  name: 'member-list',

  data() {
    return {
      tableData: [],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      mobile: null,
      nickname: null,
      company: null,
      defaultImg: null
    };
  },
  mounted() {
    this.defaultImg = 'src="' + require('../../images/default.png') + '"'
    this.getList();
  },
  methods: {
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || "- -";
    },
    // 获取表格元素列表
    async getList() {
      const param = {
        company: this.company,
        nickname: this.nickname,
        mobile: this.mobile,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      const { data = {} } = await member.getList(param)
      const { bussData, count, pageCount } = data && data.data

      if(data.status == 200) {
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
      if(date) {
        return date.slice(0, 10)
      }
      return '- -'
    }
  }
};
</script>
