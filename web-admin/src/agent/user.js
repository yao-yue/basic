/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 小程序用户接口请求
 */

import HttpRequest from '../utils/axios'

const user = {
    // 启用/禁用
    openAndClose: data => {
        const { id, disable} = data
        return  HttpRequest({
            url: `/admin/user/mini/disable/${id}/${disable}`,
            method: 'PUT',
          })
    },
    // 批量导入
    batchExport: data => {
        return  HttpRequest({
            url: `/admin/user/mini/export`,
            method: 'POST',
            data
          })
    },
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/user/mini/findPage`,
            method: 'POST',
            data
          })
    },
    // 获取详情
    getDetail: id => {
        return  HttpRequest({
            url: `/admin/user/mini/${id}`,
            method: 'GET',
          })
    }
}

export default user