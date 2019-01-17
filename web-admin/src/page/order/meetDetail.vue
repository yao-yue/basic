<template>
  <div class="container_detail">
    <div class="header">
      <p>订单详情</p>
      <el-button class="link" type="primary">
        <router-link :to="{name:'orderList',params: { currentPage: currentPage }}" style="color: #fff;">返回</router-link>
      </el-button>
    </div>
    <div class="main">
      <div class="list">
        <div class="title"></div>
        <div class="item">
          <div class="item-key">订单编号:</div>
          <div class="item-value">{{ info.orderCode || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">订单状态:</div>
          <div class="item-value">{{ info.status | statusFormat}}</div>
        </div>
        <div class="item">
          <div class="item-key">下单用户:</div>
          <div class="item-value">{{ info.userName || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">下单时间:</div>
          <div class="item-value">{{ info.gmtCreated || '--' }}</div>
        </div>
        <div class="item">
          <div class="item-key">办公室名称:</div>
          <div class="item-value">{{ info.roomName || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">预订办公室地址:</div>
          <div class="item-value">{{ info.roomAddress || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">预订时段:</div>
          <div class="item-value">{{ info.startTime || '-' }} 至 {{ info.endTime || '-' }}</div>
        </div>
        <div class="item">
          <div class="item-key">订单金额:</div>
          <div class="item-value">{{ info.totalFee || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">参会人数:</div>
          <div class="item-value">{{ info.num || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">车辆接送:</div>
          <div class="item-value">{{ info.shuttleBus | serverFormat}}</div>
        </div>
        <div class="item">
          <div class="item-key">会后用餐:</div>
          <div class="item-value">{{ info.afterDining | serverFormat}}</div>
        </div>
        <div class="item">
          <div class="item-key">其他需求:</div>
          <div class="item-value">{{ info.otherDemand || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">姓名:</div>
          <div class="item-value">{{ info.contactName || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">企业名称:</div>
          <div class="item-value">{{ info.company || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">联系电话:</div>
          <div class="item-value">{{ info.contactNumber || '--'}}</div>
        </div>
      </div>
      <div class="list table mt40" v-if="info.items">
        <div class="title">商品明细</div>
        <div class="detail-table">
          <el-table :data="info.items" :border='true'>
            <el-table-column prop="goodsCode" label="商品编码"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="goodsCategory" label="类别"></el-table-column>
            <el-table-column prop="goodsPrice" label="单价"></el-table-column>
            <el-table-column prop="goodsNum" label="商品数量"></el-table-column>
          </el-table>
        </div>
      </div>
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
      id: "",
      info: "",
      // 返回 导航页码
      currentPage: 1,
      statusList: [
        { label: "是", value: 'y' },
        { label: "否", value: "n" },
      ],
      orderStatusArr:[
        { label: "未支付", value: 'NO_PAY' },
        { label: "未使用", value: 'NO_USED' },
        { label: "已完成", value: 'FINISH' },
        { label: "已取消", value: 'USER_CANCEL' },
        { label: "超时取消", value: 'TIMEOUT_CANCEL' },
        { label: "退款中", value: 'REFUNDING' },
        { label: "已退款", value: 'REFUNDED' },
      ],
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let {data} = await order.getMeetDetails(this.id)
      if(data.status == 200) {
        this.info = data.data.bussData
      }
    },
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
    },
    serverFormat(val) {
      let statusList = [
        { label: "是", value: 'y' },
        { label: "否", value: "n" },
      ]
      let isServer = '--'
      statusList.map(item => {
        if(val == item.value) {
          isServer = item.label
        }
      })
      return isServer
    }
  }
};
</script>
<style lang="scss">
.mt40 {
  margin-top: 40px;
}
</style>

