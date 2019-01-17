<template>
  <div class="container">
    <div class="input_modal">
       <el-button type="primary" size="medium" @click="handleAdd()">新增轮播图</el-button>
    </div>

    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column label="轮播图片">
          <template slot-scope="scope">
           <img class="table_img" :src="scope.row.coverUrl" :onerror="defaultImg" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="outName" label="关联内容"></el-table-column>
        <el-table-column prop="" label="操作" width='210'>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { swiper } from '@/agent'

export default {
  name: 'campaign-swiper-list',

  data() {
    return {
      defaultImg: '',
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.defaultImg = 'src="' + require('../../images/logo.png') + '"'
    this.getList();
  },
  methods: {
    // 格式化数据
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    // 获取轮播图列表
    async getList() {
      const param = {
        type: 'consult',
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      const { data = {} } = await swiper.getList(param)

      if(data.status == 200) {
        this.tableData = data.data.bussData
        this.total = bussData.total
      }
    },
    
    handleAdd(id){
       this.$router.push({
        name: "campaign-swiper-edit",
        query: { id, pageIndex: this.pageIndex }
      });
    },

    deleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          const { data } = await swiper.delete(id);
          if (data.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.pageIndex = 1;
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
