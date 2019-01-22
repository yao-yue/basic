/**
 * author : junming liu
 * email : ljming1994@gmail.com
 * 
 * 财务统计接口
 */

import HttpRequest from '../utils/axios'


const finance = {
    // 获取统计
    getList: (month) => {
      return  HttpRequest({
        url: `/admin/finance/statistics/${month}`,
        method: 'GET',
      })
    },
}

export default finance