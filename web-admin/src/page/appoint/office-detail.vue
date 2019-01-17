<template>
  <div class="container_detail">
    <div class="header">
      <p>查看预定详情</p>
      <el-button class="link" type="primary">
        <router-link :to="{ name: 'appoint-office-list', query: { currentPage: currentPage }}" style="color: #fff">返回</router-link>
      </el-button>
    </div>
    <div class="main">
      <div class="list">
        <div class="title">办公室预约详情</div>
        <div class="item">
          <div class="item-key">办公室名称:</div>
          <div class="item-value">{{ info.officeName || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">办公室地址:</div>
          <div class="item-value">{{ info.officeAddress || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">预定用户:</div>
          <div class="item-value">{{ info.userName || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">联系人:</div>
          <div class="item-value">{{ info.contactName || '- -' }}</div>
        </div>
        <div class="item">
          <div class="item-key">手机号:</div>
          <div class="item-value">{{ info.mobile || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">公司名称:</div>
          <div class="item-value">{{ info.company || '- -'}}</div>
        </div>
        <div class="item">
          <div class="item-key">参观人数:</div>
          <div class="item-value">{{ `${info.num} 人` || '- -' }}</div>
        </div>
        <div class="item">
          <div class="item-key">参观时间:</div>
          <div class="item-value">{{ info.visitTime || '- -'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appoint } from '@/agent'

export default {
  name: 'appoint-office-list',

  data() {
    return {
      id: "",
      info: {},
      currentPage: null
    }
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id
    this.currentPage = this.$router.currentRoute.query.pageIndex

    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { data } = await appoint.getOfficeDetail(this.id)

      if(data.status == 200) {
        this.info = data.data.bussData
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.mt40 {
  margin-top: 40px;
}
</style>

