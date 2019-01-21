<template>
  <div class="container">
    <div class="input_modal">
       <el-button type="primary" size="medium" @click="add('office-edit')">新增办公室</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>办公室名称：</span>
        <el-input clearable v-model="name" placeholder="请输入办公室名称" class="proName" @keyup.enter.native="search"></el-input>
      </div>
      <div class="input-item">
        <span>城市：</span>
        <el-select clearable v-model='cityId' placeholder='-请选择状态-' @change="getList" style="height: 30px;  line-height: 30px;width:200px;">
          <el-option v-for="item in cityArr" :key="item.id" :label="item.name" :value="item.id" style="height: 30px;  line-height: 30px;width:200px;"></el-option>
        </el-select>
        <el-button type="primary" size="medium" @click="getList">查询</el-button>
      </div>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="name" label="办公室名称"></el-table-column>
        <el-table-column :formatter="formatter" prop="address" label="办公室地址"></el-table-column>
        <el-table-column prop="coverUrl " label="办公室图片">
          <template slot-scope="obj">
            <img class="table_img" :src="obj.row.coverUrl">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add('office-detail',tableData[scope.$index].id)">查看</el-button>
            <el-button type="primary" size="mini" @click="add('office-edit',tableData[scope.$index].id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(tableData[scope.$index].id)">删除</el-button>
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
        :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  office,
  city
} from '@/agent'
export default {
  name: 'meeting-list',
  
  data() {
    return {
      tableData: [],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      loading: true,
      info: "",
      cityArr:[],
      cityId: null,
      name: null
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    async getCity() {
      let {data} = await city.getList()
      if(data.status == 200) {
        this.cityArr = data.data.bussData
      }
    },
    async getList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.name,
        cityId: this.cityId
      };
      let {data} = await office.getList(param)
      if(data.status == 200) {
        this.tableData = data.data.bussData;
        this.pageCount = data.data.count;
        this.getCity()
      }
    },
    add(path,id){
       this.$router.push({
        name:path,
        query: { id: id?id:'', pageIndex: this.pageIndex }
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
    deleteItem(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let {data} = await office.delete(id);
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
