/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * quickQuestion接口请求
 */

import HttpRequest from '../utils/axios'

const quickQuestion = {
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/quick/question/findPage`,
            method: 'POST',
            data
          })
    },
    // 获取详情
    getDetail: id => {
        return  HttpRequest({
            url: `/admin/quick/question/${id}`,
            method: 'GET',
          })
    },
    // 回复
    reply: (data) => {
        const { id, reply } = data
        return  HttpRequest({
            url: `/admin/quick/question/${id}?reply=${reply}`,
            method: 'PUT',
          })
    }
}

export default quickQuestion