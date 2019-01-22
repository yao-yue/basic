/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 轮播图接口请求
 */

import HttpRequest from '../utils/axios'

const swiper = {
  // 获取分页
  getPage: data => {
    return  HttpRequest({
      url: `/admin/banner/findPage`,
      method: 'POST',
      data
    })
  },
  // 新增/编辑
  addAndEdit: data => {
    return  HttpRequest({
      url: `/admin/banner/findPage`,
      method: 'POST',
      data
    })
  },
  // 删除
  delete: id => {
    return  HttpRequest({
      url: `/admin/banner/${id}`,
      method: 'DELETE',
    })
  },
  // 获取详情
  getDetail:  id => {
    return  HttpRequest({
      url: `/admin/banner/${id}`,
      method: 'GET',
    })
  }
  
}

export default swiper