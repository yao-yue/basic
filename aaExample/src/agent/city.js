/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 城市接口请求
 */

import HttpRequest from '../utils/axios'

const city = {
  // 获取城市列表
  getList: () => {
    return HttpRequest({
      url: "/admin/city",
      method: 'GET'
    })
  },
  // 搜索城市
  findCity: (data) => {
    return HttpRequest({
      url: "/admin/city/findPage",
      method: 'POST',
      data
    })
  },
  // 编辑 保存
  save: (data) => {
    return HttpRequest({
      url: "/admin/city/save",
      method: 'POST',
      data
    })
  },
  // 删除
  delete: (data) => {
    return HttpRequest({
      url: `/admin/city/${data}`,
      method: 'DELETE'
    })
  }
}

export default city