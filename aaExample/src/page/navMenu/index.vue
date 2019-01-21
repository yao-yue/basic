<template>
  <div>
    <nav-top ref="top"></nav-top>
    <div class="content">
      <div class="content-wrap">
        <div>
          <nav-left ref="left" :href="href"></nav-left>
        </div>
        <el-col :span="24">
          <div class="wrap">
            <transition name="el-fade-in-linear" mode="out-in">
              <router-view keep-alive transition="fade" transition-mode='out-in'></router-view>
            </transition>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: 'menulist',

  data(){
    return{
      href:''
    }
  },
  
  components: {
    'nav-top':() => import('./nav-top'),
    'nav-left':() => import('./nav-left')
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.content{
  margin-left: 180px;
  padding-top: 80px;
}

a{
  text-decoration: none;
}

.wrap{
  margin: 20px;
}
</style>