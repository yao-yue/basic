<template>
    <div class="container">
        <!-- <el-tabs v-model="url" @tab-click="handleClick">
            <el-tab-pane label="账户管理" name="accountList"></el-tab-pane>
            <el-tab-pane label="角色管理" name="roleList"></el-tab-pane>
        </el-tabs>
        <div class="input_modal">
            <div class="input-item">
                <el-button type="primary" size='medium' @click="addItem">新增角色</el-button>
            </div>
        </div> -->
        <el-button type="primary" size='medium' @click="addItem">新增角色</el-button>
        <div class="table_con"> 
            <el-table :data="tableData" :border='true'>
                  <el-table-column  prop="roleName"    label="角色名称" width='120'></el-table-column>
                  <el-table-column  prop="roleDescribe" label="角色描述"></el-table-column>
                  <el-table-column  prop="topPermissionNames" label="拥有权限"></el-table-column>
                  <el-table-column  prop=""  label="操作" fixed='right' width='140'>
                      <template slot-scope="scope">
                          <el-button class="link" type="primary" size="mini">
                              <router-link  :to="{ path: 'roleEdit',query: {id: scope.row.id, pageIndex:pageIndex}}"   style="color: #fff;">编辑</router-link>
                          </el-button>
                          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
                      </template>
                  </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
             <el-pagination   @size-change="handleSizeChange"  @current-change="handleCurrentChange"       
                :current-page.sync="pageIndex"              
                :page-size="pageSize"   
                :page-sizes='[10,20,30,40]'    
                layout="total, sizes, prev, pager, next"       
                :total="pageCount">     
            </el-pagination>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {
	admin
} from '@/agent'
export default {
    data() {
        return {
            actionShow:true,
            tableData:[],
            pageCount:null,
            pageIndex:1,
            pageSize:10,
            loading:true,
            url: 'roleList',
        }
    },
    mounted() {
        this.pageIndex = this.$router.currentRoute.query.currentPage?this.$router.currentRoute.query.currentPage:1;
        this.getRoleList();
    },
    methods: {
        async getRoleList(){
					let dataForm = {
							pageIndex:this.pageIndex,
							pageSize:this.pageSize
					}
					let {data} = await admin.getRoleList(dataForm)
					if(data.status == 200) {
						this.tableData = data.data.bussData;
						this.pageCount = data.data.count;
					}
        },
        deleteRole:function(id) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                let {data} = await admin.delRole(id);
                if(data.status == 200) {
                    this.$message({
                    type: "success",
                    message: "删除成功!"
                    });
                    this.getRoleList();
                }
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
                });  
        },
        addItem(){
            this.$router.push('/roleEdit')
        },
        handleSizeChange(val) {
            this.pageSize= val;
            this.getRoleList();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getRoleList();
        },
        handleClick() {
            let url = '/'+ this.url;
            this.$router.push(url);
        },
        
    },
}
</script>
