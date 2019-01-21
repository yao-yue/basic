/**
 * author : junming liu
 * email : ljming1994@gmail.com
 * 
 * 订单接口请求
 */

import HttpRequest from '../utils/axios'

const order = {
  // 会议室订单
  getMeetList: data => {
    return HttpRequest({
      url: '/admin/meeting/order/findPage',
      method: 'POST',
      data
    })
  },
  // 会议室详情
  getMeetDetails: data => {
    return HttpRequest({
      url: `/admin/meeting/order/${data}`,
      mothod: 'GET'
    })
  },
  // 服务定制订单
  getServerList: data => {
    return HttpRequest({
      url: '/admin/goods/order/findPage',
      method: 'POST',
      data
    })
  },
  // 服务定制详情
  getServerDetails: data => {
    return HttpRequest({
      url: `/admin/goods/order/${data}`,
      mothod: 'GET'
    })
  },
  // 订单退款
  getRefundList: data => {
    return HttpRequest({
      url: '/admin/refund/order/findPage',
      method: 'POST',
      data
    })
  },
  // 退款详情
  getRefundDetails: data => {
    return HttpRequest({
      url: `/admin/refund/order/${data}`
    })
  },
  // 拒绝
  setRefuse: data => {
    return HttpRequest({
      url: `/admin/refund/order/${data}/audit/n`,
      method: 'PUT'
    })
  },
  // 同意
  setRefuse: data => {
    return HttpRequest({
      url: `/admin/refund/order/${data}/audit/y`,
      method: 'PUT'
    })
  },
  // 退款
  setRefuse: data => {
    return HttpRequest({
      url: `/admin/refund/order/${data}/reimburse`,
      method: 'PUT'
    })
  }
}

export default order