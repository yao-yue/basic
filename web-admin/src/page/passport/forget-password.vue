<template>
  <div class="wrap">
    <div class="login-wrap">
      <div class="login-title">心理咨询小程序后台-忘记密码</div>
      <div id="darkbannerwrap"></div>
      <input type="text" @keyup.enter="modifyPassword" v-model="oldPassword" placeholder="手机号">
      <div class="InputCode">
      <input  type="text" @keyup.enter="modifyPassword" v-model="password" placeholder="获取验证码">
      <el-button id="getCode" type="primary" size="mini">获取验证码</el-button>
      </div>
      <input type="password" @keyup.enter="modifyPassword" v-model="password" placeholder="新密码">
      <input type="password" @keyup.enter="modifyPassword" v-model="confirmNewPWD " placeholder="确认新密码">
      <div class="login-tips" v-if="tipToggle">两次输入不一致</div>
      <div class="goLogin" @click="goLogin">去登陆</div>
      <div class="login-button">
          <button class="btn btn-primary" type="button" @click="modifyPassword">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import { passport } from '@/agent'
import utils from '@/utils/utils'

export default {
  name: 'forget-password',

  data() {
    return {
      oldPassword:'',
      password:'',
      confirmNewPWD :'',
      tipToggle:false
    }
  },
  methods:{
      goLogin() {
          this.$router.push("/login")
      },
    async modifyPassword(){
      const param = {
        oldPWD: this.oldPassword,
        newPWD: this.password,
        confirmNewPWD: this.confirmNewPWD 
      }
      
      if(!this.tipToggle) {
        const { data = {} } = await passport.modifyPassword(param)
        if(data.status == 200) {
          this.$message({ type: 'success', message: '密码修改成功!' })
          await new Promise(resolve => {
            utils.setCookie('sessionId', null, -1)
          })
          this.$router.push("/login")
        } else {
          this.$message({ type: 'warning', message: msg });
        }
      }
    }
  }
}
</script>

<style scoped>
.wrap {
    height:100%;
    background: url(../../images/web_login_bg.jpg) no-repeat center;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
}

.login-wrap {
    position:relative;
    top:50px;
    margin: 0px auto 0 auto;
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
}

.login-title {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background: #27A9E3;
    position: relative;
    color: #fff;
    font-size: 16px;
}

#darkbannerwrap {
    background: url(../../images/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}

input[type=text], input[type=file], input[type=password], input[type=email], select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 100%;
    margin-bottom: 25px;
    text-indent:1em;
}
.InputCode {
  position: relative;
}
#getCode {
  position: absolute;
  right: 2px;
  top: 12px;
}
.login-tips {
    margin-top: -20px;
    margin-bottom: 20px;
    text-align: right;
    font-size: 12px;
    color: red;
}
.login-button button{
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    background-color: #27A9E3;
    border-radius: 3px;
    border: none;
}
.goLogin {
    font-size: 10px;
    color: #343434;
    width: 100%;
    text-align: end;
    margin-top: -10px;
    padding-bottom: 10px;
}

</style>
