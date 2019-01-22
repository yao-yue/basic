<template>
  <div>财务页面</div>
</template>

<script>
import { finance } from '@/agent'
export default {
  name: "count-chart",
  data() {
    return {
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      month: 3
    };
  },
  mounted() {
      this.getTable();
  },
  methods: {
      async getTable() {
          let month = this.month;
      const { data = {} } = await finance.getList(month)

      if(data.status == 200) {
        
      }
      }
  },
};
</script>

<style lang="scss" scoped>
</style>

