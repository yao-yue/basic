<template>
    <header>
        <el-col class="top-left">心理咨询小程序后台</el-col>
        <el-dropdown class="top-right" @command="handleCommand">
            <span class="el-dropdown-link">
                <img :src="avatarUrl" :onerror="defaultImg">
                <p class="manager">
                    {{userName}}<img alt="Avatar" src="../../images/down.png" class="down">
                </p>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">重置密码</el-dropdown-item>
                <el-dropdown-item command="1">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>

<script>
import { passport } from '@/agent'
import utils from '@/utils/utils'

export default {
    data () {
        return {
            avatarUrl: null,
            userName: null,
            defaultImg: ''
        }
    },

    mounted(){
        this.getUserInfo()
    },
    
    methods:{
        async getUserInfo() {
            const userInfo = JSON.parse(await sessionStorage.getItem('userInfo'))
            if(userInfo) {
                this.avatarUrl = userInfo.avatarUrl
                this.userName = userInfo.userName || '管理员'
            }
            this.defaultImg = 'src="' + require('../../images/logo.png') + '"'
        },

        handleCommand(command){
            if(command == '1') {
                this.logout()
            } else {
                this.$router.push("/reset-password")
            }
        },

        async logout() {
            await passport.logout()
            utils.setCookie('sessionId', null, -1)
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="scss" scoped>
header{
    position: fixed;
    display: flex;
    -webkit-display: flex;
    align-items: center;
    -webkit-align-items: center;
    height: 80px;
    background-color: #fff;
    color: #21b5cc;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
    z-index: 999;
    .manager{
        img{
            position: absolute;
            width: 15px;
            height: auto;
            right: 0;
            top:2px;
        }
        .down{
            border-radius: 0;
            top:5px;
        }
    }
    .top-left{ 
        padding-left: 75px;
        background-color:#0099FF;
        color: #fff;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
    }
    .top-right {
        position: absolute;
        right:0px;
        padding-right: 27px;
        background-color:#0099FF;
        color: #fff;
        font-size: 16px;
    }
}
.el-dropdown-link{
    display: flex;
    -webkit-display: flex;
    align-items: center;
    -webkit-align-items: center;
    cursor: pointer;
    span {
        color: #21b5cc;
    }
    p {
        color: #000;
        img {
            position: relative;
            margin-left: 12px;
        }
    }
    img{
        position: relative;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        -webkit-border-radius: 50%; 
    }
}
</style>
