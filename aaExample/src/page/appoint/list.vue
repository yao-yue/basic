<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>会议室名称：</span>
        <el-input clearable v-model="roomName" placeholder="请输入会议室名称" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>联系电话：</span>
        <el-input clearable v-model="contactNumber" placeholder="请输入联系电话" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>会议室类型：</span>
        <el-select clearable v-model='typeId' placeholder='-请选择状态-' @change="handleSelectType" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in typeArr" :key="item.id" :label="item.name" :value="item.id" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
        <el-button type="primary" size="medium" @click="getList">查询</el-button>
      </div>
      <div class="input-item ml20">
        <span>姓名：</span>
        <el-input clearable v-model="contactName" placeholder="请输入预定用户" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>预定时间：</span>
        <el-date-picker
          v-model="rangeDate"
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
        <el-table-column :formatter="formatter" prop="roomName" label="会议室名称"></el-table-column>
        <el-table-column :formatter="formatter" prop="roomAddress" label="会议室地址"></el-table-column>
        <el-table-column prop="roomCoverUrl " label="会议室图片">
          <template slot-scope="obj">
            <img class="table_img" :src="obj.row.roomCoverUrl" :onerror="defaultImg" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="roomTypeName" label="会议室类型"></el-table-column>
        <el-table-column :formatter="formatter" prop="roomPrice" label="价格(每小时)"></el-table-column>
        <el-table-column :formatter="formatter" prop="userName" label="预定用户"></el-table-column>
        <el-table-column :formatter="formatter" prop="contactName" label="姓名"></el-table-column>
        <el-table-column :formatter="formatter" prop="contactNumber" label="联系电话"></el-table-column>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="预定时间"></el-table-column>
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
import { appoint, meeting } from '@/agent'

export default {
  name: 'appoint-list',
  
  data() {
    return {
      typeArr:[],

      roomName: null,
      contactName: null,
      contactNumber: null,
      rangeDate: null,
      bookingStartTime: '',
      bookingEndTime: '',
      typeId: null,

      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      defaultImg: ''
    };
  },

  mounted() {
    this.defaultImg = 'src="' + require('../../images/meeting-default.png') + '"'
    this.pageIndex = this.$router.currentRoute.query.currentPage

    this.getList();
    this.getMeetingType()
  },

  methods: {
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    // 跳转到订单详情
    handleGetDetail(id){
      this.$router.push({
        name: 'appoint-detail',
        query: { id, pageIndex: this.pageIndex }
      });
    },
    // 获取会议室分类
    async getMeetingType() {
      const { data } = await meeting.getMeetType()

      if(data.status == 200) {
        this.typeArr = data.data.bussData
      }
    },
    // 选中分类
    handleSelectType(value) {
      this.typeId = value
      this.getList()
    },
    // 或会议室列表
    async getList() {
      const param = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        contactName: this.contactName,
        contactNumber: this.contactNumber,
        bookingStartTime: this.bookingStartTime,
        bookingEndTime: this.bookingEndTime,
        roomName: this.roomName,
        typeId: this.typeId,
      }
      const { data } = await appoint.getMeetBookList(param)

      if(data.status == 200) {
        this.tableData = data.data.bussData;
        this.pageCount = data.data.pageCount;
      }
    },
    // 获取选取的时间区间
    handleGetRangeTime(date) {
      [this.bookingStartTime, this.bookingEndTime] = date
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
