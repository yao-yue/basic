/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 办公室管理接口请求
 */

import HttpRequest from '../utils/axios'

const office = {
  // 获取办公室列表
  getList: (data) => {
    return HttpRequest({
      url: '/admin/office/room/findPage',
      method: 'POST',
      data
    })
  },
  // 获取办公室详情
  getOfficeDetail: (data) => {
    return HttpRequest({
      url: `/admin/office/room/${data}`,
      mothod: 'GET'
    })
  },
  // 新增、编辑办公室
  save: (data) => {
    return  HttpRequest({
      url: `/admin/office/room/save`,
      method: 'POST',
      data
    })
  },
  // 删除办公室
  delete: (data) => {
    return  HttpRequest({
      url: `/admin/office/room/${data}`,
      method: 'DELETE'
    })
  }
}

export default office