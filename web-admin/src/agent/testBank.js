/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 测试题库接口请求
 */

import HttpRequest from '../utils/axios'

const testBank = {
    // 批量删除
    batchDelete: id => {
        return  HttpRequest({
            url: `/admin/test/topic/batch/${id}`,
            method: 'DELETE',
          })
    },
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/test/topic/findPage`,
            method: 'POST',
            data,
          })
    },
    // 新增/编辑
    addAndEdit: data => {
        return  HttpRequest({
            url: `/admin/test/topic/save`,
            method: 'POST',
            data,
          })
    },
    // 删除
    delete: id => {
        return  HttpRequest({
            url: `/admin/test/topic/${id}`,
            method: 'DELETE',
          })
    },
    // 获取详情
    getDetail: id => {
        return  HttpRequest({
            url: `/admin/test/topic/${id}`,
            method: 'GET',
          })
    }
}

export default testBank