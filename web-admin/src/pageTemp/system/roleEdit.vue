<template>
  <div class="container_edit">
    <div class="header">
      <p>新增/修改角色</p>
      <el-button class="link" type="info" @click="back">返回</el-button>
    </div>
    <div class="main">
      <el-form :model="role" :rules="rules" ref="role" label-width="120px" class="">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
          <el-input type="textarea" v-model="role.roleDescribe" placeholder="请输入角色描述" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="permissionIds">
          <div class="access-list">
            <el-tree
              :props="props"
              :data="roleList"
              show-checkbox
              node-key="id"
              ref="adminTree"
              @check-change="handleCheckChange"
              :default-expand-all="true"
              :default-checked-keys="selectArr"></el-tree>
            <!-- <el-checkbox-group v-model="role.permissionIds">
              <div v-for="item in roleList" :key="item.id" class="access-item">
                <template>
                  <el-checkbox :label="item.id" :key="item.id">{{item.permissionName}}</el-checkbox>
                </template>
              </div>
            </el-checkbox-group> -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave('role')">保存</el-button>
          <el-button type="info" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");
import FileSaver from "file-saver";
import {
  admin
} from '@/agent'
export default {
  data() {
    return {
      currentPage: 1,
      props: {
        children: 'childPermissions',
        label: 'permissionName'
      },
      role: {
        id:'',
        roleName: "",
        roleDescribe: "",
        permissionIds: []
      },
      roleList:[],
      selectArr: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        roleDescribe: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        permissionIds: [
          {
            type: "array",
            message: "请选择角色权限",
            required: true,
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id;
    this.currentPage = this.$router.currentRoute.query.pageIndex
      ? this.$router.currentRoute.query.pageIndex
      : 1;
    if (this.id) {
      this.getDetailById();
    } else {
      this.getList();
    }
  },
  methods: {
    handleCheckChange(e) {
      e.isDeleted = e.isDeleted == 'n' ? 'y':'n'
    },
    back() {
      this.$router.push({
        path: "/roleList",
        query: { currentPage: this.currentPage }
      });
    },
    async getDetailById() {
      let {data} = await admin.getRoleById(this.id)
      if(data.status == 200) {
        this.role.id = data.data.bussData.id;
        this.role.roleName = data.data.bussData.roleName;
        this.role.roleDescribe = data.data.bussData.roleDescribe;
        this.role.permissionIds = data.data.bussData.permissionIds;
        this.selectArr = data.data.bussData.permissionIds
        this.getList();
      }
    },
    // 编辑状态下初始化权限列表
    initTree() {
      this.roleList.map(item => {
        if(this.selectArr.some(e => {return e == item.id})) {
          item.isDeleted = 'y'
        }
        item.childPermissions.map(childItem => {
          if(this.selectArr.some(e => {return e == childItem.id})) {
            childItem.isDeleted = 'y'
          }
        })
      })
    },
    async getList() {
      let {data} = await admin.getAllAppList()
      if(data.status == 200) {
        this.roleList = data.data.bussData
        if(this.id) {
          this.initTree()
        }
      }
    },
    // 获取树形图id
    getTreeId() {
      let idArr = []
      this.roleList.map(item => {
        item.childPermissions.map(childItem => {
          if(childItem.isDeleted == 'y' && !idArr.some(e => { return e == item.id })) {
            idArr.push(item.id)
          }
          if(childItem.isDeleted == 'y') {
            idArr.push(childItem.id)
          }
        })
      })
      this.role.permissionIds = idArr
    },
    handleSave: function(formName) {
      this.getTreeId()
      this.$refs[formName].validate( async valid => {
        if (valid) {
          let {data} = await admin.setRole(this.role)
          if(data.status == 200) {
            this.$message({
              type: "success",
              message: "保存成功！"
            });
            this.back();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
