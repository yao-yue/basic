<template>
  <div class="container_edit">
    <div class="header">
      <p>查看办公室</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>

    <div class="main">
      <el-form :model="campaign" :rules="rules" ref="campaign" label-width="150px">
        <el-form-item label="办公室标题：" prop="name">
          <span>{{campaign.name}}</span>
        </el-form-item>

        <el-form-item label="封面图片：" prop="cover">
          <img class="banner_img" :src="campaign.coverUrl">
        </el-form-item>

        <el-form-item label="轮播图片：" prop="image">
          <div 
            class="banner_img" 
            v-for="(item, index) in bannerList" 
            :key="index">
            <img :src="item.fileUrl">
          </div>
        </el-form-item>

        <el-form-item label="城市选择：" prop="cityId">
          <span>{{campaign.cityName}}</span>
        </el-form-item>

        <el-form-item label="地点选择：" prop="name">
          <span>{{campaign.address}}</span>
        </el-form-item>

        <div
          style="width:500px; height:300px;margin-left:150px;margin-bottom:30px"
          id="container"
        ></div>

        <el-form-item label="详情介绍：" prop="content">
          <span>{{campaign.content}}</span>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { city, office, publicSysApi } from '@/agent'

export default {
  name: 'office-detail',

  components: {
    "bg-editor": () => import("../../components/bg-editor.vue")
  },

  data() {
    return {
      id: null,
      currentPage: '',
      typeList: [],
      cityList: [],
      upLoadCoverUrl: '',
      coverUrl: '',
      upLoadUrl: '',
      imageUrl: '',
      bannerList: [],
      campaign: {
        name: '',
        latitude: null,
        longitude: null,
        capacityMax: '',
        capacityMin: '',
        address: '',
        cityId: null,
        cover: '',
        image: '',
        price: '',
        typeId: null,
        content: '',
        id: ''
      },
      rules: {
        name: [{ required: true, message: "请输入办公室标题", trigger: "blur" }],
        capacityMax: [{ required: true, message: "请输入最大容纳人数", trigger: "blur" }],
        capacityMin: [{ required: true, message: "请输入最小容纳人数", trigger: "blur" }],
        address: [{ required: true, message: "请选择地址", trigger: "blur" }],
        image: [{ required: true, message: "请选择轮播图片", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        typeId: [{ required: true, message: "请选择办公室类型", trigger: "blur" }],
        cityId: [{ required: true, message: "请选择城市", trigger: "blur" }],
        cover: [{ required: true, message: "请选择封面图片", trigger: "blur" }],
        content: [{ required: true, message: "请输入详情介绍", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id
    this.campaign.id = this.$router.currentRoute.query.id
    this.handleGetDetail();
  },
  
  methods: {
    init() {
      var that = this
      var center =  new qq.maps.LatLng(that.campaign.latitude || 39.916527, that.campaign.longitude || 116.397128)
      var map = new qq.maps.Map(document.getElementById("container"),{
          center: center,
          zoom: 18
      });
      var marker = new qq.maps.Marker({
          map:map,
          position: center
      });
    },
    // 获取资讯详情
    async handleGetDetail() {
      const { data } = await office.getOfficeDetail(this.id)
      if(data.status == 200) {
        this.campaign = data.data.bussData
        this.bannerList = data.data.bussData.images
        this.init()
      }
    },
    // 后退
    handleGoBack() {
      this.$router.push({ path: "/office-list" });
    },
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
