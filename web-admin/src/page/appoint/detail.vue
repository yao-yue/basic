<template>
  <div class="container_detail">
    <div class="header">
      <p>查看预定详情</p>
      <el-button class="link" type="primary">
        <router-link :to="{name:'orderList',params: { currentPage: currentPage }}" style="color: #fff;">返回</router-link>
      </el-button>
    </div>
    <div class="main">
      <div class="list">
        <div class="title">会议室预定详情</div>
        <div class="item">
          <div class="item-key">会议室名称:</div>
          <div class="item-value">{{ info.roomName || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">会议室地址:</div>
          <div class="item-value">{{ info.roomAddress || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">预订时间:</div>
          <div class="item-value">{{ info.gmtCreated || '- -' }}</div>
        </div>
        <div class="item">
          <div class="item-key">会议室类型:</div>
          <div class="item-value">{{ info.roomTypeName || '--'}}</div>
        </div>
        <div class="item">
          <div class="item-key">参会人数:</div>
          <div class="item-value">{{ `${info.num} 人` || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">车辆接送:</div>
          <div class="item-value">{{ handleGetDiss(info.shuttleBus) }}</div>
        </div>
        <div class="item">
          <div class="item-key">会后用餐:</div>
          <div class="item-value">{{ handleGetDiss(info.afterDining) }}</div>
        </div>
        <div class="item">
          <div class="item-key">其他需求:</div>
          <div class="item-value">{{ info.otherDemand || '- -' }}</div>
        </div>
        <div class="item">
          <div class="item-key">水果饮品:</div>
          <div class="item-value fruit_drink" v-if="info.hasLivingService == 'y'">
            <div v-for="(item, index) in info.items" :key="index" class="fruit_item">
              <div class="fruit_num">
                <span>{{ item.goodsName }}</span>
                <span>{{` x  ${item.goodsNum}`}}</span>
              </div>
              <div>{{`￥${item.goodsNum * item.goodsPrice}`}}</div>
            </div>
          </div>
          <div class="item-value" v-if="info.hasLivingService == 'n'">未预定</div>
        </div>
        <div class="item">
          <div class="item-key">预订人:</div>
          <div class="item-value">{{ info.contactName || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">企业名称:</div>
          <div class="item-value">{{ info.company || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">联系电话:</div>
          <div class="item-value">{{ info.contactNumber || '- -'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlagType from '@/constant/flagType'
import { order } from '@/agent'

export default {
  name: 'appoint-detail',

  data() {
    return {
      id: "",
      info: {},
      currentPage: 1
    }
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const { data } = await order.getMeetDetails(this.id)
      if(data.status == 200) {
        this.info = data.data.bussData
      }
    },
    // 是否接送
    handleGetDiss(val) {
      return FlagType.getName(val)
    }
  }
};
</script>
<style lang="scss">
.mt40 {
  margin-top: 40px;
}
.fruit_drink {
  display: flex;
}
.fruit_item {
  width: 25%;
  .fruit_num {
    padding-right: 40%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}
</style>

