<template>
  <div class="container_detail order user">
    <div class="header">
      <p>用户详情</p>
      <el-button type="primary" @click="handleGoBack">返回</el-button>
    </div>
    <div class="main">
      <div class="main-list">
        <div class="list">
          <div class="title">用户资料</div>
          <div class="list-item">
            <div class="item">
              <div class="item-key">昵称:</div>
              <div class="item-value">{{ info.weixinNickname|| '--' }}</div>
            </div>
            <div class="item">
              <div class="item-key">会员等级:</div>
              <div class="item-value"> {{ filterLevel(info.vipGrade)}}</div>
            </div>
            <div class="item">
              <div class="item-key">会员积分:</div>
              <div class="item-value">{{ info.vipGrade|| '--'}}</div>
            </div>
            <div class="item">
              <div class="item-key">手机号:</div>
              <div class="item-value">{{ info.mobile || '--' }}</div>
            </div>
          </div>
          <div class="list-item">
            <div class="item avatar">
              <div class="item-key">用户头像:</div>
              <div class="item-value">
                <img @click="checkImage(info.avatarUrl)" class="avatar" v-if="info.avatarUrl" :src="info.avatarUrl " alt="">
                <img class="avatar" v-else src="../../images/default.png" alt="">
              </div>
            </div>
            <div class="item">
              <div class="item-key">绑定邮箱:</div>
              <div class="item-value">{{ info.cityCodeDesc  || '--' }}</div>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="item">
              <div class="item-key">收货地址:</div>
              <div class="item-value">{{ info.cityCodeDesc  || '--' }}</div>
            </div>
        </div>
      </div>
      <div class="main-list">
        <div class="list table">
            <div class="title">用户评论</div>
            <div class="detail-table">
              <el-table :data="tableData" :border='true'>
                <el-table-column :formatter="formatter" prop="startTime" label="评论目标"></el-table-column>
                <el-table-column :formatter="formatter" prop="useMillions" label="评论内容"></el-table-column>
                <el-table-column :formatter="formatter" prop="currentScore" label="评论时间"></el-table-column>
              </el-table>
            </div>
            <div class="more">
              <a href="">查看更多>></a>
            </div>
        </div>
      </div>
      <div class="main-list">
        <div class="list table">
            <div class="title">用户订单</div>
            <div class="detail-table">
              <el-table :data="tableData" :border='true'>
                <el-table-column :formatter="formatter" prop="startTime" label="订单编号"></el-table-column>
                <el-table-column :formatter="formatter" prop="useMillions" label="订单状态"></el-table-column>
                <el-table-column :formatter="formatter" prop="currentScore" label="商品名称"></el-table-column>
                <el-table-column :formatter="formatter" prop="startTime" label="商品数量"></el-table-column>
                <el-table-column :formatter="formatter" prop="useMillions" label="商品金额"></el-table-column>
                <el-table-column :formatter="formatter" prop="currentScore" label="订单金额"></el-table-column>
                <el-table-column :formatter="formatter" prop="currentScore" label="下单时间"></el-table-column>
              </el-table>
            </div>
            <div class="more">
              <a href="">查看更多>></a>
            </div>
        </div>
      </div>
      <div class="main-list">
        <div class="list table">
            <div class="title">用户优惠券</div>
            <div class="detail-table">
              <el-table :data="tableData" :border='true'>
                <el-table-column :formatter="formatter" prop="startTime" label="优惠券名称"></el-table-column>
                <el-table-column :formatter="formatter" prop="useMillions" label="优惠额度"></el-table-column>
              </el-table>
            </div>
        </div>
      </div>
    </div>
    <el-dialog title="查看图片" :visible.sync="dialogVisible" width="340px" >
      <div class="dialog-con">
        <img :src="pictureUrl" class="picture">
      </div>
    </el-dialog>
  </div>
</template>

<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");

export default {
  name: 'member-detail',
  
  data() {
    return {
      id: "",
      info: {},
      currentPage: 1,
      pictureUrl: "",
      dialogVisible: false,
      destinationArr:[
        {
          name:'普通会员',
          val:'common_vip'
        },
        {
          name:'VIP',
          val:'vip'
        },
        {
          name:'SVIP',
          val:'svip'
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id;
    this.currentPage = this.$router.currentRoute.query.pageIndex
      ? this.$router.currentRoute.query.pageIndex
      : 1;
    this.getDetail();
  },
  methods: {
    filterLevel:function(val){
      let str;
      console.log(this.destinationArr,'this.destinationArr')
      this.destinationArr.map((item)=>{
        if(item.val == val){
          str = item.name
        }
      })
      return str
    },
    checkImage(url) {
      this.pictureUrl = url;
      this.dialogVisible = true;
    },
    formatter(row, column, cellValue) {
      return cellValue ? cellValue : "- -";
    },
    getDetail() {
      let url = CONSTANT.URL.LIST.FINDUSERID;
      common.requestAjax(url, null, { id: this.id }, res => {
        this.info = res.data ? res.data.bussData : {};
      });
    },
    handleGoBack() {
      this.$router.replace({ path: "/userList" });
    }
  },
};
</script>
<style lang="scss" scoped>
  .user{
    .main-list{
      margin-bottom: 30px;
      &:first-child{
        margin-bottom: 60px;
      }
    }
    .list.table{
      padding-bottom: 50px;
      background-color: #fff;
      width: 100%;
      position: relative;
    }

    .more{
      position:absolute;
      bottom:0;
      text-align: right;
      right: 0;
    }
  }

</style>
