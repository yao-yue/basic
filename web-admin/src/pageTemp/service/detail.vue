<template>
  <div class="container_edit">
    <div class="header">
      <p>查看商品详情</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>

    <div class="main">
      <el-form :model="detail" ref="detail" label-width="150px">
        <el-form-item label="商品名称：" prop="name">
          <span>{{detail.name}}</span>
        </el-form-item>
        <el-form-item label="商品编码：" prop="code">
          <span>{{detail.code}}</span>
        </el-form-item>
        <el-form-item label="分类：" prop="type">
          <span>{{handleServiceType(detail.type)}}</span>
        </el-form-item>
        <el-form-item label="描述：" prop="describe">
          <span>{{detail.describe}}</span>
        </el-form-item>
        <el-form-item label="价格(元)：" prop="price">
          <span>￥{{detail.price}}</span>
        </el-form-item>
        <el-form-item label="封面图片：" prop="cover">
          <img class="banner_img" :src="detail.coverUrl">
        </el-form-item>
        <el-form-item label="轮播图片：" prop="image">
          <div class="banner_img" v-for="(item, index) in detail.images" :key="index">
            <img :src="item.fileUrl">
          </div>
        </el-form-item>
        <el-form-item label="详情介绍：" prop="detail">
          <span>{{detail.detail}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { service } from '@/agent'
import GoodsServiceType from '@/constant/GoodsServiceType.js'

export default {
  name: 'service-detail',

  data() {
    return {
      id: null,
      detail: {}
    }
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id
    this.detail.id = this.$router.currentRoute.query.id
    this.handleGetDetail();
  },
  
  methods: {
    // 获取资讯详情
    async handleGetDetail() {
      const { data } = await service.getGoodsDetail(this.id)

      if(data.status == 200) {
        this.detail = data.data.bussData
      }
    },
    // 后退
    handleGoBack() {
      this.$router.push({ path: "/service-list" });
    },
    // 服务分类
    handleServiceType(val) {
      return GoodsServiceType.getName(val)
    }
  }
};
</script>
<style lang="scss" scoped>
.banner_img {
  display: inline-block;
  margin-right: 20px;
  width: 176px;
  height: 176px;
  margin-bottom: 20px;
  cursor: pointer;
  img {
    width: 176px;
    height: 176px;
    position: absolute;
    z-index: 1;
    margin-left: -14px;
  }
}
.form_item_label {
  margin: 0 10px;
}

.table-content {
  width: 250px;
  .table-item {
    border: 1px solid #dcdfe6;
    &:first-child {
      background-color: #409eff;
      color: #fff;
      border-right: 0px solid #dcdfe6;
      .table-list {
        padding: 0;
      }
    }

    .table-list {
      flex: 2;
      text-align: center;
      padding: 5px 0;
      .el-input {
        height: 70% !important;
      }
      &:first-child {
        flex: 3;
        border-right: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
