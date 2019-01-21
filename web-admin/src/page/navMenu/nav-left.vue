<template>
  <el-col class="el-left-menu" :span="3" >
    <el-menu
      background-color="#ffffff"
      text-color="#343434"
      :default-active="active"    
      :active="active"
      class="el-menu-vertical-demo"
      router
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      >
      <el-submenu
        v-for="menuItem in routeList"
        :key="menuItem.id"
        :index="menuItem.menuUrl"
      >
        <template slot="title">
           <i v-bind:class='menuItem.icon' style="color:#4169E1"></i>
          <span>{{menuItem.menuName}}</span>
        </template>
        <!-- <el-menu-item
          v-for="item in menuItem.childPermissions"
          :key="item.menuName"
          :index="item.menuUrl"
        >
          {{item.menuName}} 
        </el-menu-item> -->
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
const common = require("../../common.js")
const CONSTANT = require("../../constant/constant.js")

const routerList = require("./nav-list.js")
export default {
  data() {
    return {
      active: "",
      // routeList:[],
      routeList: routerList.default.routerList,
      heightLength: ""
    };
  },

  created() {
    this.heightLength = document.body.scrollHeight;
  },

  mounted() {
    window.addEventListener("scroll", () => {
      let scrollHeight = document.body.scrollHeight;
      this.heightLength = scrollHeight - 80;
    });
    let active = "/" + this.$router.currentRoute.path.split("/")[1];
    this.active = active;
    console.log(active)
  },

  methods: {
    fresh(x) {
      if (x == 1) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.fresh(x - 1);
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style  lang="scss" scoped>
.el-left-menu {
  height: 90%;
  position: fixed;
  left: 0;
  width: 176px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width:5px;
    height: 14px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border: 1px solid transparent;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
  }

  &::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}
.el-menu-vertical-demo {
  height: 100%;
}

.el-menu-item {
  min-width: auto !important;
  overflow-y: auto;
}
.el-menu-item-group__title {
  padding-top: 0px !important;
}
.el-menu-item {
  a {
    display: block;
    color: #bfcbd9;
  }
  &.is-active {
    a {
      color: #21b5cc;
    }
  }
}
.el-submenu .el-menu-item {
  overflow-x: hidden;
}
</style>
