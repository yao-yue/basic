/**
 * author : junming liu
 * email : ljming1994@gmail.com
 * 
 * 意见反馈接口请求
 */

import HttpRequest from '../utils/axios'

const feedBack = {
  getList: data => {
    return HttpRequest({
      url: `/admin/feedback/findPage`,
      method: 'POST',
      data
    })
  },
  // 删除意见
  delFeedBack: data => {
    return HttpRequest({
      url: `/admin/feedback/${data}`,
      method: 'DELETE'
    })
  }
}

export default feedBack