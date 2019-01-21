/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 预约管理接口请求
 */

import HttpRequest from '../utils/axios'

const appoint = {
  // 获取会议室预定列表
  getMeetBookList: data => {
    return HttpRequest({
      url: `/admin/meeting/booking/findPage`,
      method: 'POST',
      data
    })
  },
  // 获取会议室预定详情
  getMeetBookDetail: data => {
    return HttpRequest({
      url: `/admin/meeting/booking/${data}`,
      method: 'GET'
    })
  },
  // 获取办公室预约列表
  getOfficeList: data => {
    return HttpRequest({
      url: `/admin/office/booking/findPage`,
      method: 'POST',
      data
    })
  },
  // 获取预约办公室详情
  getOfficeDetail: data => {
    return HttpRequest({
      url: `/admin/office/booking/${data}`,
      method: 'GET'
    })
  }
}

export default appoint