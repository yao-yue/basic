<template>
  <div class="container_edit">
    <div class="header">
      <p>新增/编辑会议室</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>

    <div class="main">
      <el-form :model="campaign" :rules="rules" ref="campaign" label-width="150px">
        <el-form-item label="会议室标题" prop="name" >
          <el-input v-model="campaign.name" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="封面图片：" prop="cover">
          <el-upload
            class="avatar-uploader"
            :action="upLoadCoverUrl"
            :show-file-list="false"
            :before-upload="beforeCoverUpload"
          >
            <img v-if="coverUrl" :src="coverUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="轮播图片：" prop="image">
          <div 
            class="banner_img" 
            v-for="(item, index) in bannerList" 
            :key="index">
            <i class="el-icon-circle-close" @click="closeImg(index)" style="position: relative;top: -20px; right: -172px;z-index: 2;"></i>
            <img :src="item.fileUrl">
          </div>
          <el-upload
            class="avatar-uploader"
            v-if="bannerList.length < 6"
            :action="upLoadUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="会议室类型" prop="typeId" >
          <el-select filterable v-model='campaign.typeId' placeholder='-请选择-'>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="容纳人数" required>
          <!-- <el-col :span="6"> -->
            <el-form-item prop="capacityMin">
              <el-input v-model="campaign.capacityMin" placeholder="请输入" />
            </el-form-item>
          <!-- </el-col> -->
          <span class="form_item_label">至</span>
          <!-- <el-col class="line" :span="1">至</el-col> -->
          <!-- <el-col :span="6"> -->
            <el-form-item prop="capacityMax">
              <el-input v-model="campaign.capacityMax" placeholder="请输入" />
            </el-form-item>
          <!-- </el-col> -->
          <span class="form_item_label">人数</span>
          <!-- <el-col class="line" :span="1">人数</el-col> -->
        </el-form-item>

        <el-form-item label="城市选择" prop="cityId" >
          <el-select filterable v-model='campaign.cityId' placeholder='-请选择-'>
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格" prop="price" >
          <el-input v-model="campaign.price" placeholder="请输入" />
          <span class="form_item_label">元/小时</span>
        </el-form-item>

        <el-form-item label="地点选择" prop="address" >
          <el-input v-model="campaign.address" placeholder="请输入" id="place" />
        </el-form-item>

        <div
          style="width:500px; height:300px;margin-left:150px;margin-bottom:30px"
          id="container"
        ></div>

        <el-form-item label="详情介绍" prop="content">
          <bg-editor :minHeight="300" :content="campaign.content" @editorData='handleEditorContent' />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSave('campaign')">保存</el-button>
          <el-button @click="handleGoBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { city, meeting, publicSysApi } from '@/agent'

export default {
  name: 'edit-item',

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
        name: [{ required: true, message: "请输入会议室标题", trigger: "blur" }],
        capacityMax: [{ required: true, message: "请输入最大容纳人数", trigger: "blur" }],
        capacityMin: [{ required: true, message: "请输入最小容纳人数", trigger: "blur" }],
        address: [{ required: true, message: "请选择地址", trigger: "blur" }],
        image: [{ required: true, message: "请选择轮播图片", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        typeId: [{ required: true, message: "请选择会议室类型", trigger: "blur" }],
        cityId: [{ required: true, message: "请选择城市", trigger: "blur" }],
        cover: [{ required: true, message: "请选择封面图片", trigger: "blur" }],
        content: [{ required: true, message: "请输入详情介绍", trigger: "blur" }]
      }
    };
  },

  mounted() {
    this.id = this.$router.currentRoute.query.id
    this.currentPage = this.$router.currentRoute.query.currentPage || 1
    if (this.id) {
      this.campaign.id = this.$router.currentRoute.query.id
      this.handleGetDetail();
    } else {
      this.init()
    }
    this.getCityList();
    this.getType()
  },
  
  methods: {
    init() {
      let that = this
      let center =  new qq.maps.LatLng(that.campaign.latitude || 39.916527, that.campaign.longitude || 116.397128)
      let map = new qq.maps.Map(document.getElementById("container"),{
          center: center,
          zoom: 18
      });
      let marker = new qq.maps.Marker({
          map:map,
          position: center
      });
      //实例化自动完成
      let ap = new qq.maps.place.Autocomplete(document.getElementById('place'));
      let geocoder = new qq.maps.Geocoder({
        complete: function(res) {
          console.log(res)
          let position = new qq.maps.LatLng()
          let marker = new qq.maps.Marker({
              map:map,
              position: res.detail.location
          });
          let latlngBounds = new qq.maps.LatLngBounds();
          latlngBounds.extend(res.detail.location);
          map.fitBounds(latlngBounds);
          that.campaign.latitude = res.detail.location.lat
          that.campaign.longitude = res.detail.location.lng
        }
      })
      //添加监听事件
      qq.maps.event.addListener(ap, "confirm", function(res){
          geocoder.getLocation(res.value)
          that.campaign.address = res.value
      });
    },
    // init() {
    //   var that = this
    //   var center =  new qq.maps.LatLng(that.campaign.latitude || 39.916527, that.campaign.longitude || 116.397128)
    //   var map = new qq.maps.Map(document.getElementById("container"),{
    //       center: center,
    //       zoom: 18
    //   });
    //   var marker = new qq.maps.Marker({
    //       map:map,
    //       position: center
    //   });
    //   //实例化自动完成
    //   var ap = new qq.maps.place.Autocomplete(document.getElementById('place'));
    //   //调用Poi检索类。用于进行本地检索、周边检索等服务。
    //   var searchService = new qq.maps.SearchService({
    //       complete : function(results){
    //         if(results.type === "CITY_LIST") {
    //           that.$message({
    //             message: "当前检索结果分布较广，请指定城市进行检索"
    //           });
    //             return;
    //           }
    //           var pois = results.detail.pois;
    //           console.log(results, '----')
    //           var latlngBounds = new qq.maps.LatLngBounds();
    //           for(var i = 0,l = pois.length;i < l; i++){
    //               var poi = pois[i];
    //               latlngBounds.extend(poi.latLng);  
    //               // var marker = new qq.maps.Marker({
    //               //     map:map,
    //               //     position: poi.latLng
    //               // });
    //               // marker.setTitle(poi.name);
    //           }
    //           map.fitBounds(latlngBounds);
    //       }
    //   });
    //   //添加监听事件
    //   qq.maps.event.addListener(ap, "confirm", function(res){
    //       searchService.search(res.value);
    //       that.campaign.address = res.value
    //   });
    //   //绑定单击事件添加参数
    //   qq.maps.event.addListener(map, 'click', function(event) {
    //     var marker = new qq.maps.Marker({
    //         map:map,
    //         position: event.latLng
    //     });
    //     that.campaign.latitude = event.latLng.getLat()
    //     that.campaign.longitude = event.latLng.getLng()
    //   });
    // },
    // 获取会议室类型
    async getType() {
      let {data} = await meeting.getMeetType()
      if(data.status == 200) {
        this.typeList = data.data.bussData
      }
    },
    // 获取城市列表
    async getCityList() {
      const { status, data } = await city.getList()
      const { bussData } = data && data.data

      if(status == 200 || status == 304) {
        this.cityList = [{id: 0, name: '全部'}, ...bussData];
      }
    },
    // 获取资讯详情
    async handleGetDetail() {
      const { data } = await meeting.getMeetDetail(this.id)
      if(data.status == 200) {
        this.campaign = data.data.bussData
        this.bannerList = data.data.bussData.images
        this.coverUrl = data.data.bussData.coverUrl
        this.init()
      }
    },
    // 后退
    handleGoBack() {
      this.$router.push({ path: "/meeting-list" });
    },
    async beforeCoverUpload(file) {
      const param = {
        suffix: file.name.split(".")[1], // 文件后缀  png
        contentType: file.type // 文件类型  image/png
      };
      const { data } = await publicSysApi.getOSSUploadUrl(param)
      if(data.status == 200) {
        this.upLoadCoverUrl = data.data.bussData.uploadUrl
        this.campaign.cover = data.data.bussData.fileKey
        const downloadUrl = data.data.bussData.downloadUrl

        publicSysApi.uploadFile(this.upLoadCoverUrl, file, file.type, res => {
          this.coverUrl = downloadUrl
        });
      }
    },
    closeImg(index) {
      this.bannerList.splice(index, 1)
    },
    // 文件上传时的钩子
    async beforeAvatarUpload(file) {
      const param = {
        suffix: file.name.split(".")[1], // 文件后缀  png
        contentType: file.type // 文件类型  image/png
      };
      const { data } = await publicSysApi.getOSSUploadUrl(param)
      if(data.status == 200) {
        this.upLoadUrl = data.data.bussData.uploadUrl
        const downloadUrl = data.data.bussData.downloadUrl

        publicSysApi.uploadFile(this.upLoadUrl, file, file.type, res => {
          this.bannerList.push({
            fileUrl: downloadUrl,
            fileKey: data.data.bussData.fileKey
          })
        });
      }
    },
    // 富文本输入的内容
    handleEditorContent(val) {
      this.campaign.content = val;
    },
    // 创建、保存
    handleSave(formName) {
      let newArr = [];
      if(this.bannerList.length > 0) {
        this.bannerList.map(item => {
          newArr.push(item.fileKey)
        })
      };
      this.campaign.image = newArr.join(',')
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data } = await meeting.setMeet(this.campaign)

          if (data.status == 200) {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
            this.$router.replace({
              path: "/meeting-list",
              query: { currentPage: this.currentPage }
            });
          }
        } else {
          return false;
        }
      });
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
