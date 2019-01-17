/**
 * author : Ming
 * email : ljming1994@gmail.com
 * 
 * 公共接口请求
 */

import HttpRequest from '../utils/axios'

const meeting = {
  // 获取会议室列表
  getMeetList: data => {
    return HttpRequest({
      url: '/admin/meeting/room/findPage',
      method: 'POST',
      data
    })
  },
  // 新增/编辑会议室
  setMeet: data => {
    return HttpRequest({
      url: '/admin/meeting/room/save',
      method: 'POST',
      data
    })
  },
  // 删除会议室
  delMeet: data => {
    return HttpRequest({
      url: `/admin/meeting/room/${data}`,
      method: 'DELETE'
    })
  },
  // 获取会议室详情
  getMeetDetail: data => {
    return HttpRequest({
      url: `/admin/meeting/room/${data}`
    })
  },
  // 获取会议室分类
  getMeetType: () => {
    return HttpRequest({
      url: '/admin/meeting/room/type'
    })
  },
  // 编辑/新增分类
  setMeetType: data => {
    return HttpRequest({
      url: '/admin/meeting/room/type/save',
      method: 'POST',
      data
    })
  },
  // 删除分类
  delMeetType: data => {
    return HttpRequest({
      url: `/admin/meeting/room/type/${data}`,
      method: 'DELETE'
    })
  }
}

export default meeting