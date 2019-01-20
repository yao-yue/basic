<template>
  <div class="container">
     <div class="input_modal">
        <el-button type="primary" size="medium" @click="handleAdd('service-live-edit')">新增商品</el-button>
        <el-button type="primary" size="medium" @click="handleAdd('service-assort-list')">分类管理</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>商品名称：</span>
        <el-input v-model="name" placeholder="请输入内容" class="proName" @keyup.enter.native="search" />
      </div>
      <div class="input-item">
        <span>状态：</span>
       <el-select clearable v-model='isSale' placeholder='-请选择-' @change="handleSelect" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
      </div>
      <div class="input-item">
        <span>商品分类：</span>
        <el-select clearable v-model='categoryId' placeholder='-请选择-' @change="handleSelect" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in categoryArr" :key="item.id" :label="item.name" :value="item.id" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
      </div>
    </div>

    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="code" label="商品编码" />
        <el-table-column :formatter="formatter" prop="name" label="商品名称" />
        <el-table-column label="商品图片">
           <template slot-scope="scope">
              <img class="table_img" :src="scope.row.coverUrl" :onerror="defaultImg" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="categoryName" label="分类名称" />
        <el-table-column :formatter="formatter" prop="price" label="单价" />
        <el-table-column :formatter="formatter" prop="isSale" label="状态">
           <template slot-scope="scope">
             {{ handleGetRactType(scope.row.isSale) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="240px" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd('rack', scope.row)">
              {{ scope.row.isSale == 'y' ? '下架' : '上架' }}
            </el-button>
            <el-button type="primary" size="mini" @click="handleAdd('service-live-detail',scope.row.id)">查看</el-button>
            <el-button type="primary" size="mini" @click="handleAdd('service-live-edit',scope.row.id)">编辑</el-button>
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
        :total="total" />
    </div>

  </div>
</template>

<script>
import { service } from '@/agent'
import toogleRackType from '@/constant/toogleRackType'

export default {
  name: 'service-live-list',
  
  data() {
    return {
      name: null,
      isSale: null,
      statusArr: [{ label: "上架", value: "y" }, { label: "下架", value: "n" }],
      categoryId: null,
      categoryArr: [],

      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      
      type: 'living',
      defaultImg: ''
    }
  },

  mounted() {
    this.defaultImg = 'src="' + require('../../images/goods.png') + '"'
    this.getCategoryList()
    this.getList()
  },

  methods: {
    // 格式化数据
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    // 获取服务商品分类列表
    async getCategoryList() {
      const { data = {} } = await service.getGoodsTypeList(this.type)
      if(data.status == 200) {
        this.categoryArr = data.data.bussData
      }
    },
    // 选中筛选条件
    handleSelect(val) {
      this.getList()
    },
    // 服务商品列表
    async getList() {
      const param = {
        type: this.type,
        categoryId: this.categoryId,
        isSale: this.isSale,
        name: this.name,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      const { data } = await service.getGoodsList(param)

      if(data.status == 200) {
        this.tableData = data.data.bussData
        this.total = data.data.pageCount
      }
    },
    // 上架下架映射
    handleGetRactType(val) {
      return toogleRackType.getName(val)
    },

    async handleAdd(path, ext){
      if(path == 'rack') {
        const param = {
          id: ext.id,
          choose: ext.isSale == 'y' ? 'n' : 'y'
        }
        const { data = {} } = await service.toogleRack(param)
        if(data.status == 200) {
          this.getList()
        }
        return 
      } else {
        this.$router.push({
          name: path,
          query: { id: ext ? ext : null, pageIndex: this.pageIndex }
        })
      }
    },

    handleDeleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const { data } = await service.deleteGoods(id);
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
    },

    search: function(e) {
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
    }
  }
}
</script>