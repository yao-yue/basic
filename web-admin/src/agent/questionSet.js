/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 接口请求
 */

import HttpRequest from '../utils/axios'

const questionSet = {
    // 获取详情
    getDetail: () => {
        return  HttpRequest({
            url: `/admin/quick/question/set`,
            method: 'GET',
          })
    },
    // 编辑
    edit: data => {
        return  HttpRequest({
            url: `/admin/quick/question/set`,
            method: 'PUT',
            data,
          })
    }
}

export default questionSet