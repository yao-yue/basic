<template>
  <div class="container_edit">
    <div class="header">
      <p>新增/编辑商品</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>
    <div class="main">
      <el-form :model="goods" :rules="rules" ref="goods" label-width="150px">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="goods.name" placeholder="请输入商品名称" />
        </el-form-item>

        <el-form-item label="商品编码：" prop="code">
          <el-input v-model="goods.code" placeholder="请输入商品编码" />
        </el-form-item>

        <el-form-item label="分类：" prop="categoryId">
          <el-select clearable v-model='goods.categoryId' placeholder='-请选择-'>
            <el-option v-for="item in categoryArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="价格(元)：" prop="price">
          <el-input v-model="goods.price" placeholder="请输入商品价格" />
        </el-form-item>

        <el-form-item label="描述：" prop="describe">
          <el-input type="textarea" v-model="goods.describe" placeholder="请输入描述" />
        </el-form-item>

        <el-form-item label="商品封面：" prop="cover">
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

        <el-form-item label="商品轮播图：" prop="image">
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

        <el-form-item label="商品详情：" prop="detail">
          <bg-editor
            :minHeight="300"
            :uploadUrl="upLoadUrl"
            :content="goods.detail"
            @editorData='handleEditorContent'
          >
          </bg-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleGoBack">返回</el-button>
          <el-button type="primary" @click="handleSave('goods')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { service, publicSysApi } from '@/agent'

export default {
  name: 'service-edit',
  
  data() {
    return {
      id: null,
      categoryId: null,
      categoryArr: [],

      upLoadCoverUrl: '',
      coverUrl: '',
      upLoadUrl: '',
      imageUrl: '',
      bannerList: [],
      goods: {},

      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
        categoryId: [{ required: true, message: "请选择分类", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        describe: [{ required: true, message: "请输入描述", trigger: "blur" }],
        cover: [{ required: true, message: "请选择封面图片", trigger: "blur" }],
        image: [{ required: true, message: "请选择商品轮播图", trigger: "blur" }],
        detail: [{ required: true, message: "请输入商品详情", trigger: "blur" }]
      },

      type: 'office'
    }
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id

    this.getCategoryList()
    if(this.id){
      this.getGoodsDetail()
    }
  },

  components: {
    "bg-editor": () => import("../../components/bg-editor.vue")
  },

  methods: {
    // 获取服务商品分类列表
    async getCategoryList() {
      const { data = {} } = await service.getGoodsTypeList(this.type)
      if(data.status == 200) {
        this.categoryArr = data.data.bussData
      }
    },
    // 封面图片上传
    async beforeCoverUpload(file) {
      const param = {
        suffix: file.name.split(".")[1], // 文件后缀  png
        contentType: file.type // 文件类型  image/png
      };
      const { data } = await publicSysApi.getOSSUploadUrl(param)
      if(data.status == 200) {
        this.upLoadCoverUrl = data.data.bussData.uploadUrl
        this.goods.cover = data.data.bussData.fileKey
        const downloadUrl = data.data.bussData.downloadUrl

        publicSysApi.uploadFile(this.upLoadCoverUrl, file, file.type, res => {
          this.coverUrl = downloadUrl
        });
      }
    },
    // 减少轮播图图片
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
    // 富文本输入
    handleEditorContent(val) {
      this.goods.detail = val;
    },
    // 获取详情
    async getGoodsDetail() {
      const { data = {} } = await service.getGoodsDetail(this.id)
      if(data.status == 200) {
        this.goods = data.data.bussData
        this.bannerList = data.data.bussData.images
        this.coverUrl = data.data.bussData.coverUrl
      }
    },
    // 新增，编辑 保存
    handleSave: function(formName) {
      let newArr = [];
      if(this.bannerList.length > 0) {
        this.bannerList.map(item => {
          newArr.push(item.fileKey)
        })
      }
      this.goods.image = newArr.join(',')

      this.$refs[formName].validate(async valid => {
        if (valid) {
          const param = { type: this.type, ...this.goods }
          const { data = {}} = await service.saveGoods(param)

          if (data.status == 200) {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
            this.handleGoBack();
          }
        } else {
          return 
        }
      })
    },
    // 回退
    handleGoBack() {
      this.$router.push({ path: "/service-list" })
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