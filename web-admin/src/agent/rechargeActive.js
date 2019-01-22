/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * rechargeActive接口请求
 */

import HttpRequest from '../utils/axios'

const rechargeActive = {
    // 获取详情
    getDetail: () => {
        return  HttpRequest({
            url: `/admin/recharge/offer`,
            method: 'GET',
          })
    },
    // 编辑
    edit: () => {
        return  HttpRequest({
            url: `/admin/recharge/offer`,
            method: 'PUT',
          })
    }
}

export default rechargeActive