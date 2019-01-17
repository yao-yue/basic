/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 资讯活动接口请求
 */

import HttpRequest from '../utils/axios'

const campaign = {
  // 获取资讯列表
  getList: (data) => {
    const { type, ...extparam } = data
    return HttpRequest({
      url: `/admin/info/${type}/findPage`,
      method: 'POST',
      data: extparam
    })
  },
  // 获取资讯详情
  getCampaignDetail: (data) => {
    return  HttpRequest({
      url: `/admin/info/${data}`,
      method: 'GET'
    })
  },
  // 新增、编辑资讯活动
  save: (data) => {
    const { type, ...extparam } = data
    return  HttpRequest({
      url: `/admin/info/${type}/save`,
      method: 'POST',
      data: extparam
    })
  },
  // 删除
  delete: (data) => {
    return  HttpRequest({
      url: `/admin/info/${data}`,
      method: 'DELETE'
    })
  }
}

export default campaign