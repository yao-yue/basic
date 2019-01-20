<template>
  <div class="container">
    <div class="input_modal">
       <el-button type="primary" size="medium" @click="handleAdd()">新增活动</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>标题：</span>
        <el-input v-model="title" placeholder="请输入" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>城市：</span>
        <el-select v-model='city' placeholder='-请选择城市-' @change="getList" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
      </div>
      <el-button type="primary" size="medium" @click="getList">查询</el-button>
    </div>

    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column label="主题图片">
          <template slot-scope="scope">
            <img class="table_img" :src="scope.row.coverUrl" :onerror="defaultImg" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="cityName" label="城市" />
        <el-table-column :formatter="formatter" prop="title" label="活动标题" />
        <el-table-column prop="" label="操作" width='210'>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page.sync="pageIndex" 
        :page-size="pageSize" 
        :page-sizes='[10,20,30,40]' 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total" 
      />
    </div>

  </div>
</template>

<script>
import { city, campaign } from '@/agent'

export default {
  name: 'active-list',

  data() {
    return {
      defaultImg: '',
      title: null,
      city: null,
      cityList: [],
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      total: 0
    };
  },
  mounted() {
    this.defaultImg = 'src="' + require('../../images/logo.png') + '"'
    this.getCityList();
    this.getList();
  },
  methods: {
    // 格式化数据
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    // 获取城市列表
    async getCityList() {
      const { data = {} } = await city.getList()
      const { bussData } = data && data.data

      if(data.status == 200) {
        this.cityList = [{id: null, name: '全部'}, ...bussData];
      }
    },

    // 获取列表数据
    async getList() {
      const param = {
        title: this.title,
        cityId: this.city,
        type: 'activity',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      const { data = {} } = await campaign.getList(param)
      const { bussData } = data && data.data

      if(data.status == 200) {
        this.tableData = bussData
        this.total = bussData.data
      }
    },

    handleAdd(id){
      const param = { id, pageIndex: this.pageIndex }
       this.$router.push({
        name: 'active-edit',
        query: param
      });
    },

    search(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getList();
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

    async handleDeleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let { data } = await campaign.delete(id);
        if(data.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      })
    }
  }
};
</script>
<style lang="scss">
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
