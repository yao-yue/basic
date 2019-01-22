/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * aboutUs接口请求
 */

import HttpRequest from '../utils/axios'

const aboutUs = {
    // 获取详情
    getDetail: () => {
        return  HttpRequest({
            url: `/admin/about/us`,
            method: 'GET',
          })
    },
    // 编辑
    edit: (content) => {
        return  HttpRequest({
            url: `/admin/about/us?content=${content}`,
            method: 'PUT',
          })
    }
}

export default aboutUs