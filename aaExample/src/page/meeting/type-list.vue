<template>
  <div class="container">
    <div class="input_modal">
       <el-button type="primary" size="medium" @click="isShowDetailsModal = true">新增类型</el-button>
       <!-- <el-button class="back-button" type="primary" size="medium" @click="goList">返回</el-button> -->
    </div>

    <div class="table_con">
      <el-table :data="tableData" :border='true'>
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column prop="roomCoverUrl " label="类型图片">
          <template slot-scope="obj">
            <img class="table_img" :src="obj.row.iconUrl">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="name" label="类型名称"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editItem(tableData[scope.$index])">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(tableData[scope.$index].id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="isShowDetailsModal"
      width="40%"
    >
      <el-form :model="campaign" :rules="rules" ref="campaign" label-width="150px">
        <el-form-item label="类型名称" prop="name" >
          <el-input v-model="campaign.name" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="类型图标" prop="cover">
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">保存</el-button>
        <el-button type="primary" @click="isShowDetailsModal = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  meeting,
  publicSysApi
} from '@/agent'
export default {
  name: 'meeting-list',
  
  data() {
    return {
      tableData: [],
      isShowDetailsModal: false,
      inputName: null,
      upLoadUrl: '',
      imageUrl: '',
      id: null,
      campaign: {
        name: '',
        cover: ''
      },
      rules: {
        name: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
        cover: [{ required: true, message: "请选择类型图标", trigger: "blur" }],
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    async getList() {
      let {data} = await meeting.getMeetType()
      if(data.status == 200) {
        this.tableData = data.data.bussData
      }
    },
    // goList() {
    //   this.$router.push('/meeting-list')
    // },
    // 文件上传时的钩子
    async beforeAvatarUpload(file) {
      const param = {
        suffix: file.name.split(".")[1], // 文件后缀  png
        contentType: file.type // 文件类型  image/png
      };
      const { data } = await publicSysApi.getOSSUploadUrl(param)
      if(data.status == 200) {
        this.upLoadUrl = data.data.bussData.uploadUrl
        this.campaign.cover = data.data.bussData.fileKey
        const downloadUrl = data.data.bussData.downloadUrl

        publicSysApi.uploadFile(this.upLoadUrl, file, file.type, res => {
          this.imageUrl = downloadUrl
        });
      }
    },
    editItem(info) {
      this.id = info.id
      this.campaign.name = info.name
      this.campaign.cover = info.icon
      this.imageUrl = info.iconUrl
      this.isShowDetailsModal = true
    },
    async handleConfirm() {
      let param = {
        name: this.campaign.name,
        id: this.id,
        icon: this.campaign.cover
      }
      let {data} = await meeting.setMeetType(param)
      if(data.status == 200) {
        this.isShowDetailsModal = false
        this.id = null
        this.campaign.name = ''
        this.campaign.cover = ''
        this.imageUrl = ''
        this.getList()
      }
    },
    deleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let {data} = await meeting.delMeetType(id);
          if(data.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    utf16toEntities(str) {
      let patter = /[\ud800-\udbff][\udc00-\udfff]/g;
      // 检测utf16字符正则
      str = str.replace(patter, char => {
        let H, L, code;
        if (char.length === 2) {
          H = char.charCodeAt(0); // 取出高位
          L = char.charCodeAt(1); // 取出低位
          code = (H - 0xd800) * 0x400 + 0x10000 + L; // 转换算法
          return "&#" + code + ";";
        } else {
          return char;
        }
      });
      return str;
    },
    entitiesToUtf16(str) {
      // 检测出形如 &#12345; 形式的字符
      let strObj = this.utf16toEntities(str);
      let patter = /&#\d+;/g;
      let H, L, code;
      let arr = strObj.match(patter) || [];
      arr.forEach(item => {
        code = item.replace("&#", "").replace(";", "");
        H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        L = ((code - 0x10000) % 0x400) + 0xdc00;
        code = "&#" + code + ";";
        let s = String.fromCharCode(H, L);
        strObj.replace(code, s);
      });
      return strObj;
    }
  }
};
</script>
<style lang="scss">
.back-button {float: right;margin-right: 30px;}
.tag-head {
  height: 40px;
  display: -webkit-box;
  display: box;
  display: -moz-box;
  /* 老版本 - 适配iOS 6-, Safari 3.1-6 */
  display: -webkit-flex;
  /* 新版本 - 适配Chrome */
  display: flex;
  align-items: center;
  border: 1px solid #d1d1d1;
  margin-bottom: 20px;
  .name {
    padding: 0 20px;
    border-right: 1px solid #d1d1d1;
    height: 40px;
    line-height: 40px;
  }
  .desc {
    padding-left: 20px;
  }
}
</style>
