<template>
    <div class="container_edit">
        <div class="header">
           <p>新增/修改账户</p>
           <el-button class="link" type="info" @click="back">返回</el-button>
       </div>
       <div class="main">
           <el-form :model="user" :rules="rules" ref="user" label-width="120px" class="">
                <el-form-item label="登录名" prop="userName" v-if='!id'>
                    <el-input v-model="user.userName" placeholder="请输入登录名称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd" v-if='!id'>
                    <el-input v-model="user.passwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPasswd"  v-if='!id'>
                    <el-input v-model="user.confirmPasswd" placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="trueName">
                    <el-input v-model="user.trueName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleName">
                    <el-select filterable v-model='user.roleName'  @change="getRoleId" placeholder='-请选择-'>
                        <el-option   v-for="item in user.roleList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleSave('user')">保存</el-button>
                    <el-button type="info" @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
       

    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
import {
	admin
} from '@/agent'
export default {
    data() {
        var validatePass = (rule, value, callback) => {        
            if (value === '') {           
                callback(new Error('请再次输入密码'));         
            } 
            else if (value !== this.user.passwd) {           
                callback(new Error('两次输入密码不一致!'));         
            } 
            else {          
                callback();      
            }      
        };
        var validateMobile = (rule, value, callback) => {        
            if (value === '') {           
                callback(new Error('请输入手机号码'));         
            } 
            else if (!(/^1[34578]\d{9}$/.test(value))) {           
                callback(new Error('手机号码不合法!'));         
            } 
            else {          
                callback();      
            }      
        };
        return {
            id:'',
            currentPage:1,
            user: {
                userName:'',
                passwd:'',
                confirmPasswd:'',
                trueName:'',
                mobile:'',
                roleName:'',
                roleId:'',
                roleCode:0,
                roleList:[],
            },
            rules: {
                userName: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max:18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                confirmPasswd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                trueName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validateMobile, trigger: 'blur' }
                ],
                roleName:[
                    { required: true, message: '请选择角色类型', trigger: 'blur' },
                ]
            },
        }
    },
    mounted() {
        console.log(this.$router)
        this.id = this.$router.currentRoute.query.userId;
        this.currentPage = this.$router.currentRoute.query.pageIndex?this.$router.currentRoute.query.pageIndex:1;
        this.getRoleList();
        if(this.id){
           this.getUserById();
        }
    },
    methods: {
				back(){ this.$router.push({path:'/accountList',query:{'currentPage':this.currentPage}});  },
				// 获取权限列表
        async getRoleList(){
            let dataForm = {
                pageIndex:1,
                pageSize:100
						}
						let {data} = await admin.getRoleList(dataForm)
						if(data.status == 200) {
							let roleList = [];
							data.data.bussData.forEach(function(item){
									let roleItem = {};
									roleItem.value = item.id;
									roleItem.label = item.roleName;
									roleList.push(roleItem);
							})
							this.user.roleList = roleList;
						}
				},
				// 根据id获取用户信息
        async getUserById(){  
					 let {data} = await admin.getUserById(this.id)
					 if(data.status == 200) {
						 let info = data.data.bussData;
							this.user.trueName = info.trueName;
							this.user.userName = info.userName;
							this.user.mobile = info.mobile;
							this.user.roleId = info.appRoleId;
							this.user.roleName = info.roleName;
					 }
				},
				// 下拉选择
        getRoleId:function(event){
            this.user.roleId = event;
            console.log(this.user.roleId + ' role id ');
            console.log(this.user.roleName + ' role name ');
				},
				// 成功
        handleSave(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
									let param;
									if(this.id){   // 编辑
											param = {
													userId:this.id,
													userName:this.user.userName,
													nickname:this.user.trueName,
													trueName:this.user.trueName,
													mobile:this.user.mobile,
													roleId:this.user.roleId
											};
									}
									else{
											param = {
													userName:this.user.userName,
													nickname:this.user.trueName,
													trueName:this.user.trueName,
													mobile:this.user.mobile,
													password:this.user.passwd,
													confirmPassword:this.user.confirmPasswd,
													roleId:this.user.roleId
											};
									}
									let {data} = await admin.saveInfo(param)
									if(data.status == 200) {
										this.$message({
												type: 'success',
												message: '保存账户信息成功！'
										});
										this.back();
									}
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


            
        },
    },
    
}
</script>
