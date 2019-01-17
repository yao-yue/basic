<template>
  <div class="container">
    <div class="input_modal">
      <div class="input-item">
        <span>退款编号：</span>
        <el-input clearable v-model="productId" placeholder="请输入订单编号" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>退款状态：</span>
       <el-select clearable v-model='orderStatus' placeholder='-请选择状态-' @change="getList" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in orderStatusArr" :key="item.value" :label="item.label" :value="item.value" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
      </div>
      <div class="input-item ml20">
        <span>申请时间</span>
        <el-date-picker
          v-model="orderDate"
          @change="getList"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" size="medium" @click="getList">查询</el-button>
      </div>
    </div>
    <div class="table_con">
      <el-table :data="tableData" :border='true'>
        <el-table-column :formatter="formatter" prop="orderCode" label="退款编号"></el-table-column>
        <el-table-column prop="status" label="退款状态">
          <template slot-scope="obj">
            {{obj.row.status | statusFormat}}
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="refundFee" label="金额"></el-table-column>
        <el-table-column :formatter="formatter" prop="userName" label="退款用户"></el-table-column>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="申请时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add('refundDetail',scope.row.orderId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes='[10,20,30,40]' layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  order
} from '@/agent'
export default {
  data() {
    return {
      orderStatusArr:[
        { label: "待审核", value: 'AUDIT' },
        { label: "已拒绝", value: 'REFUSE' },
        { label: "退款中", value: 'REFUNDING' },
        { label: "已退款", value: 'REFUNDED' },
      ],
      tableData: [
        {
          orderCode: '01',
          productName: '办公室',
          status: 'REFUNDING',
          refundFee: '200',
          userName: 'asd',
          gmtCreated: '2019-01-01 10:10:00'
        }
      ],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      productId: null,
      orderStatus: null,
      orderDate: null
    };
  },

  mounted() {
    this.pageIndex = this.$router.currentRoute.query.currentPage
      ? parseInt(this.$router.currentRoute.query.currentPage)
      : 1;
    this.getList();
  },

  methods: {
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    add(path,id){
       this.$router.push({
        name:path,
        query: { id: id?id:'', pageIndex: this.pageIndex }
      });
    },
    async getList() {
      let gmtCreatedStart = this.orderDate? new Date(this.orderDate[0]) : null
      let gmtCreatedEnd = this.orderDate? new Date(this.orderDate[1]) : null
      let param = {
        gmtCreatedEnd: gmtCreatedStart,
        gmtCreatedStart: gmtCreatedEnd,
        orderCode: this.productId,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        status: this.orderStatus,
        hasLivingService: null
      };
      let {data} = await order.getRefundList(param)
      if(data.status == 200) {
        this.tableData = data.data.bussData;
        this.pageCount = data.data.count;
      }
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
  },

  filters: {
    statusFormat(val) {
      let orderStatusArr = [
        { label: "未支付", value: 'NO_PAY' },
        { label: "未使用", value: 'NO_USED' },
        { label: "已完成", value: 'FINISH' },
        { label: "已取消", value: 'USER_CANCEL' },
        { label: "超时取消", value: 'TIMEOUT_CANCEL' },
        { label: "退款中", value: 'REFUNDING' },
        { label: "已退款", value: 'REFUNDED' },
      ]
      let status = '--'
      orderStatusArr.map(item => {
        if(val == item.value) {
          status = item.label
        }
      })
      return status
    }
  }
};
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
