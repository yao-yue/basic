/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * emtionCheats接口请求
 */

import HttpRequest from '../utils/axios'

const emtionCheats = {
    // 获取分页
    getPage: data => {
        return  HttpRequest({
            url: `/admin/emtion/secert/findPage`,
            method: 'POST',
            data,
          })
    },
    // 新增/编辑
    addAndEdit: data => {
        return  HttpRequest({
            url: `/admin/emtion/secert/save`,
            method: 'POST',
            data,
          })
    },
    // 删除
    delete: id => {
        return  HttpRequest({
            url: `/admin/emtion/secert/${id}`,
            method: 'DELETE',
          })
    },
    // 获取详情
    getDetail: id =>{
        return  HttpRequest({
            url: `/admin/emtion/secert/${id}`,
            method: 'GET',
          })
    }
}

export default emtionCheats