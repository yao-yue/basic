/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 会员接口请求
 */

import HttpRequest from '../utils/axios'

const member = {
  getList: (data) => {
    return HttpRequest({
      url: "/admin/user/findPage",
      method: 'POST',
      data
    })
  }
}

export default member