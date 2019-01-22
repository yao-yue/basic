/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 接口请求
 */

import HttpRequest from '../utils/axios'

const listenOrder = {
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/order/eavesdrop/findPage`,
            method: 'POST',
            data,
          })
    },
    // 获取详情
    getDetail: id => {
        return  HttpRequest({
            url: `/admin/order/eavesdrop/${id}`,
            method: 'GET',
          })
    }
}

export default listenOrder