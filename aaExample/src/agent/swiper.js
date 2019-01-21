/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 轮播图接口请求
 */

import HttpRequest from '../utils/axios'

const swiper = {
  // 获取轮播图列表
  getList: (data) => {
    const { type, ...extparam } = data
    return  HttpRequest({
      url: `/admin/banner/${type}/findPage`,
      method: 'POST',
      data: extparam
    })
  },
  // 获取轮播图详情
  getSwiperDetail: (data) => {
    return  HttpRequest({
      url: `/admin/banner/${data}`,
      method: 'GET'
    })
  },
  // 编辑、保存轮播图
  save: (data) => {
    const { type, ...extparam } = data
    return  HttpRequest({
      url: `/admin/banner/${type}/save`,
      method: 'POST',
      data: extparam
    })
  },
  // 删除轮播图
  delete: (data) => {
    return  HttpRequest({
      url: `/admin/banner/${data}`,
      method: 'DELETE'
    })
  }
}

export default swiper