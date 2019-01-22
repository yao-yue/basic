/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * walletInfo接口请求
 */

import HttpRequest from '../utils/axios'

const walletInfo = {
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/user/balance/flow/findPage`,
            method: 'POST',
            data,
          }) 
    }
}

export default walletInfo