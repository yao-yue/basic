<template>
    <div class="wrap">
        <div class="login-wrap">
            <div class="login-title">联合办公管理后台</div>
            <div id="darkbannerwrap"></div>
            <input type="text" @keyup.enter="login" v-model="account" placeholder="请输入账号">
            <input type="password" @keyup.enter="login"  v-model="password" placeholder="请输入密码">
             <div class="login-button">
                <button class="btn btn-primary" type="button"  @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue' 
import { passport } from '@/agent'
import utils from '@/utils/utils'

export default {
    name: 'login',

    data() {
        return {
            account:'',
            password:'',
            mobile:''
        }
    },
    methods:{
        async login(){
            const param = {
                userName: this.account, 
                password: this.password
            }
            const { data = {} } = await passport.login(param)
            const { bussData = {} } = data && data.data

            if (data.status == 200) {
                this.$message({ type: 'success', message: '登录成功!' })
                utils.setCookie('sessionId', bussData && bussData.sessionId)

                const userInfo = JSON.stringify(bussData)
                sessionStorage.setItem('userInfo', userInfo)
                this.getNavList()
                this.$router.push('/')
            }
        },
        async getNavList() {
            let {data} = await passport.getNavList()
            if(data.status == 200) {
                localStorage.setItem("nav-list",JSON.stringify(data.data.bussData));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
    top:150px;
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
    
    
    .login-tips {
        margin-top: 12px;
        margin-bottom: 20px;
        text-align: right;
        text-decoration: none;
        color: #1b66c7;
        font-size: 16px;
        cursor: pointer;  
    }
    button{
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
}
</style>
