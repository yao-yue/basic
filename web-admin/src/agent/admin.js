/**
 * author : junming liu
 * email : ljming1994@gmail.com
 * 
 * 权限管理接口请求
 */

import HttpRequest from '../utils/axios'

const admin = {
  // 获取用户列表
  getAdminList: data => {
    return HttpRequest({
      url: `/admin/user/findAdminUserByPage?trueName=${data.trueName}&mobile=${data.mobile}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
      method: 'POST'
    })
  },
  // 删除用户
  delAdmin: data => {
    return HttpRequest({
      url: `/admin/user/deleteAdminUserByUserId?userId=${data}`,
      method: 'POST'
    })
  },
  // 获取权限列表
  getRoleList: data => {
    return HttpRequest({
      url: `/admin/role/findAppRoleByPage?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
      method: 'POST'
    })
  },
  // 获取所有权限列表
  getAllAppList: data => {
    return HttpRequest({
      url: `/admin/role/getAllAppPermission`,
      method: 'POST'
    })
  },
  // 删除角色
  delRole: data => {
    return HttpRequest({
      url: `/admin/role/deleteRoleByRoleId?roleId=${data}`,
      method: 'POST'
    })
  },
  // 保存修改/新增
  saveInfo: data => {
    return HttpRequest({
      url: `/admin/user/saveAdminUser${data.userId? ('?' + 'userId=' + data.userId + '&') : '?'}userName=${data.userName}&trueName=${data.trueName}&mobile=${data.mobile}&password=${data.password}&confirmPassword=${data.confirmPassword}&roleId=${data.roleId}`,
      method: 'POST'
    })
  },
  // 根据id获取用户信息
  getUserById: data => {
    return HttpRequest({
      url: `/admin/user/findAdminUserDetailByUserId?userId=${data}`,
      method: 'POST'
    })
  },
  // 根据id获取角色信息
  getRoleById: data => {
    return HttpRequest({
      url: `/admin/role/getRoleInfoByRoleId?roleId=${data}`,
      method: 'POST'
    })
  },
  // 保存角色
  setRole: data => {
    return HttpRequest({
      url: `/admin/role/saveAppRole?id=${data.id}&roleName=${data.roleName}&roleDescribe=${data.roleDescribe}&permissionIds[]=${data.permissionIds}`,
      method: 'POST'
    })
  },
  // 删除角色
  delRole: data => {
    return HttpRequest({
      url: `/admin/role/deleteRoleByRoleId?roleId=${data}`,
      method: 'POST'
    })
  }
}

export default admin