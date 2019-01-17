<template>
  <div class="container_edit">
    <div class="header">
      <p>新增/编辑活动</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>

    <div class="main">
      <el-form :model="campaign" :rules="rules" ref="campaign" label-width="150px">
        <el-form-item label="活动标题：" prop="title" >
          <el-input v-model="campaign.title" placeholder="请输入活动标题" />
        </el-form-item>

         <el-form-item label="地址：" prop="describe" >
          <el-input v-model="campaign.describe" placeholder="请输入地址" />
        </el-form-item>

        <el-form-item label="城市：" prop="cityId" >
          <el-select filterable v-model='campaign.cityId' placeholder='-请选择-'>
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片：" prop="cover">
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :header="upLoadHeaders"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="活动内容：" prop="content">
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
import { city, campaign, publicSysApi } from '@/agent'

export default {
  name: 'edit-item',

  components: {
    "bg-editor": () => import("../../components/bg-editor.vue")
  },

  data() {
    return {
      id: null,
      currentPage: '',
      cityList: [],
      upLoadHeaders: {},
      upLoadUrl: "",
      imageUrl: "",
      campaign: {
        title: '',
        describe: '',
        cityId: null,
        cover: '',
        id: null,
        content: ''
      },
      
      rules: {
        title: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
        describe: [{ required: true, message: "请输入地址", trigger: "blur" }],
        cityId: [{ required: true, message: "请选择城市", trigger: "blur" }],
        cover: [{ required: true, message: "请选择封面图片", trigger: "blur" }],
        content: [{ required: true, message: "请选择活动内容", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id;
    this.currentPage = this.$router.currentRoute.query.currentPage || 1
    if (this.id) {
      this.campaign.id = this.$router.currentRoute.query.id
      this.handleGetDetail();
    }
    this.getCityList();
  },
  
  methods: {
    // 获取城市列表
    async getCityList() {
      const { data = {} } = await city.getList()
      const { bussData } = data && data.data

      if(data.status == 200) {
        this.cityList = [{id: 0, name: '全部'}, ...bussData];
      }
    },
    // 获取资讯详情
    async handleGetDetail() {
      const { data = {} } = await campaign.getCampaignDetail(this.id)
      const { bussData } = data && data.data
      if(data.status) {
        this.campaign = bussData
        this.imageUrl = bussData.coverUrl
      }
    },
    // 后退
    handleGoBack() {
      this.$router.push({ path: "/active-list" });
    },
    // 文件上传时的钩子
    async beforeAvatarUpload(file) {
      let param = {
        suffix: file.name.split(".")[1], // 文件后缀  png
        contentType: file.type // 文件类型  image/png
      };
      const { data = {} } = await publicSysApi.getOSSUploadUrl(param)
      if(data.status == 200) {
        this.upLoadUrl = data.data.bussData.uploadUrl
        this.campaign.cover = data.data.bussData.fileKey
        const downloadUrl = data.data.bussData.downloadUrl

        publicSysApi.uploadFile(this.upLoadUrl, file, file.type, res => {
          this.imageUrl = downloadUrl
        });
      }
    },
    // 富文本输入的内容
    handleEditorContent(val) {
      this.campaign.content = val;
    },
    // 创建、保存
    handleSave: function(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const param = { type: 'activity', ...this.campaign }
          const { data = {} } = await campaign.save(param)

          if (data.status == 200) {
            this.$message({ type: "success", message: "保存成功！" });
            this.handleGoBack()
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
