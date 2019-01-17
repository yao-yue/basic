/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 登录接口请求
 */

import HttpRequest from '../utils/axios'

const passport = {
  // 登录
  login: (data) => {
    const { userName, password } = data
    return HttpRequest({
      url:`/admin/user/login?userName=${userName}&password=${password}`,
      method: 'POST'
    })
  },
  // 登出
  logout: () => {
    return HttpRequest({
      url:`/admin/user/logout`,
      method: 'POST'
    })
  },
  // 修改密码
  modifyPassword: (data) => {
    const { oldPWD, newPWD, confirmNewPWD } = data
    return HttpRequest({
      url:`/admin/user/updUserPWD?oldPWD=${oldPWD}&newPWD=${newPWD}&confirmNewPWD=${confirmNewPWD}`,
      method: 'POST'
    })
  },
  // 获取侧边栏列表
  getNavList: () => {
    return HttpRequest({
      url: '/admin/user/findUserPermissions',
      method: 'POST'
    })
  }
}

export default passport