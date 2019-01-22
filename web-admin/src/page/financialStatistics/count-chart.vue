<template>

<div>
<div class="head">
<span>月份</span>
 <el-select v-model="value" placeholder="请选择" @change="changeSelect">
    <el-option
      v-for="item in monthOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
<table border="1">
    <tr>
      <th style="width:100px;">
        <div class="out" style="font-size:24px">
          <b>分类</b>
          <em>名称</em>
        </div>
      </th>
      <th>脱单</th>
      <th>恋爱</th>
      <th>婚姻</th>
      <th>其他</th>
      <th>合计</th>
    </tr>
    <tr class="assessDetail">
      <td>经典问答</td>
      <td>{{classicQuestion.outOfSingle}}</td>
      <td>{{classicQuestion.inLove}}</td>
      <td>{{classicQuestion.marriage}}</td>
      <td>{{classicQuestion.other}}</td>
      <td>{{tableData.classicQuestionSum}}</td>
    </tr>
    <tr class="assessDetail">
      <td>快速提问</td>
     <td>{{quickQuestion.outOfSingle}}</td>
      <td>{{quickQuestion.inLove}}</td>
      <td>{{quickQuestion.marriage}}</td>
      <td>{{quickQuestion.other}}</td>
      <td>{{tableData.quickQuestionSum}}</td>
    </tr>
    <tr class="assessDetail">
      <td>合计</td>
      <td>{{tableData.outOfSingleSum}}</td>
      <td>{{tableData.inLoveSum}}</td>
      <td>{{tableData.marriageSum}}</td>
      <td>{{tableData.otherSum}}</td>
      <td>{{tableData.totalSum}}</td>
    </tr>
  </table>
</div>
    
  
</template>

<script>
import { finance } from "@/agent";
export default {
  name: "count-chart",
  data() {
    return {
      tableData: [],
      classicQuestion: "",
      quickQuestion: "",
      monthOptions: [
        {
          value: '1',
          label: '一月份'
        }, {
          value: '2',
          label: '二月份'
        }, {
          value: '3',
          label: '三月份'
        }, {
          value: '4',
          label: '四月份'
        }, {
          value: '5',
          label: '五月份'
        },
        {
          value: '6',
          label: '六月份'
        },
        {
          value: '7',
          label: '七月份'
        },
        {
          value: '8',
          label: '八月份'
        },
        {
          value: '9',
          label: '九月份'
        },
        {
          value: '10',
          label: '十月份'
        },
        {
          value: '11',
          label: '十一月份'
        },
        {
          value: '12',
          label: '十二月份'
        },
        
        ],
      value: "1"
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    changeSelect () {
      console.log('表格发生了改变')
      this.getTable();
    },
    async getTable() {
      const { data = {} } = await finance.getList(this.value);
      const { bussData } = data && data.data
      if (data.status == 200) {
        bussData.totalSum = 99
        this.tableData = bussData;
        this.classicQuestion = bussData.classicQuestion
        this.quickQuestion = bussData.quickQuestion
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  background: #ffffff;
  padding: 20px;
  span {
    margin-right: 10px
  }
}
table {
  border-collapse: collapse;
  border: 1px #e3e3e3 solid;
  width: 96%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
}

th,
td {
  border: 1px solid #e3e3e3;
  text-align: center;
  font-size: 20px;
  line-height: 66px;
  background: #c6c7c6;
}

th {
  background: #199fff;
  color: white;
} /*模拟对角线*/
.out {
  border-top: 5em #199fff solid; /*上边框宽度等于表格第一行行高*/
  border-left: 160px #ff8838 solid; /*左边框宽度等于表格第一行第一格宽度*/
  position: relative; /*让里面的两个子容器绝对定位*/
  color: white;
}

b {
  font-style: normal;
  display: block;
  position: absolute;
  top: -4.6em;
  left: -140px;
  width: 200px;
}

em {
  font-style: normal;
  display: block;
  position: absolute;
  top: -70px;
  left: -210px;
  width: 200px;
}

.assessDetail td {
  background-color: #fff;
}
</style>

