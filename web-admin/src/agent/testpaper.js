/**
 * author : hbw
 * email : 2316570512@qq.com
 * 
 * 测试试卷接口请求
 */

import HttpRequest from '../utils/axios'

const testPaper = {
    // 获取分页
    getPage: (data) => {
        return  HttpRequest({
          url: `/admin/test/paper/findPage`,
          method: 'POST',
          data,
        })
      },
    // 新增/编辑
    addAndEdit: (data) => {
        return HttpRequest({
            url: `/admin/test/paper/save`,
            method: 'POST',
            data,
          })
    },
    // 删除
    delete:  (id) => {
        return HttpRequest({
            url: `/admin/test/paper/${id}`,
            method: 'DELETE',
          })
    },
    // 获取详情
    getDetail: (id) => {
        return HttpRequest({
            url: `/admin/test/paper/${id}`,
            method: 'GET',
          })
    }
}

export default testPaper