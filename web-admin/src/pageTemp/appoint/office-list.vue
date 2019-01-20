<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>办公室名称：</span>
        <el-input clearable v-model="officeName" placeholder="请输入办公室名称" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>预订用户：</span>
        <el-input clearable v-model="userName" placeholder="请输入预订用户" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>联系人：</span>
        <el-input clearable v-model="contactName" placeholder="请输入联系人" class="proName" @keyup.enter.native="search"></el-input>
        <el-button type="primary" size="medium" @click="getList">查询</el-button>
      </div>
      <div class="input-item ml20">
        <span>联系电话：</span>
        <el-input clearable v-model="mobile" placeholder="请输入联系电话" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>预定时间：</span>
        <el-date-picker
          v-model="orderDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="handleGetRangeTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="officeName" label="办公室名称"></el-table-column>
        <el-table-column :formatter="formatter" prop="officeAddress" label="办公室地址"></el-table-column>
        <el-table-column prop="roomCoverUrl " label="办公室图片">
          <template slot-scope="obj">
            <img class="table_img" :src="obj.row.officeCoverUrl" :onerror="defaultImg" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="userName" label="预订用户"></el-table-column>
        <el-table-column :formatter="formatter" prop="contactName" label="联系人"></el-table-column>
        <el-table-column :formatter="formatter" prop="mobile" label="联系电话"></el-table-column>
        <el-table-column :formatter="formatter" prop="visitTime" label="预定时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleGetDetail(scope.row.id)">查看</el-button>
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
        :total="total" />
    </div>
  </div>
</template>

<script>
import { appoint } from '@/agent'

export default {
  name: 'appoint-office-list',
  
  data() {
    return {
      officeName: null,
      userName: null,
      contactName: null,
      mobile: null,
      orderDate: null,
      visitTimeStart: null,
      visitTimeEnd: null,
      tableData: [],
      total: null,
      pageIndex: 1,
      pageSize: 10,
      defaultImg: '',
    };
  },

  mounted() {
    this.defaultImg = 'src="' + require('../../images/office-default.png') + '"'
    this.pageIndex = this.$router.currentRoute.query.currentPage

    this.getList();
  },

  methods: {
    // 格式化数据
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    // 查看详情
    handleGetDetail(id){
      this.$router.push({
        name: 'appoint-office-detail',
        query: { id, pageIndex: this.pageIndex }
      });
    },
    // 获取数据
    async getList() {
      const param = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        contactName: this.contactName,
        mobile: this.mobile,
        officeName: this.officeName,
        userName: this.userName,
        visitTimeEnd: this.visitTimeEnd,
        visitTimeStart: this.visitTimeStart,
      };
      const { data } = await appoint.getOfficeList(param)
      if(data.status == 200) {
        this.tableData = data.data.bussData;
        this.pageCount = data.data.count;
      }
    },
    // 获取选取的时间区间
    handleGetRangeTime(date) {
      [this.visitTimeStart, this.visitTimeEnd] = date
      this.getList()
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
<style lang="scss">
  .el-table__body-wrapper{
    .el-table__expanded-cell{
      padding:10px;
    }
  }
  .ml20 {
    margin-left: 36px;
  }
</style>
