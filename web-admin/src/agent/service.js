/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 服务定制接口请求
 */

import HttpRequest from '../utils/axios'

const service = {
  // 服务商品 分页
  getGoodsList: (data) => {
    const { type, ...extParam } = data
    return HttpRequest({
      url: `/admin/goods/${type}/findPage`,
      method: 'POST',
      data: extParam
    })
  },
  // 新增、编辑服务商品
  saveGoods: (data) => {
    const { type, ...extParam } = data
    return HttpRequest({
      url: `/admin/goods/${type}/save`,
      method: 'POST',
      data: extParam
    })
  },
  // 校验商品编号唯一性
  checkGoods: (data) => {
    const { type, code, id } = data
    return HttpRequest({
      url: `/admin/goods/${type}/checkCode?code=${code + id&&('&id=' + id)}`,
      method: 'GET'
    })
  },
  // 服务商品上架/下架
  toogleRack: (data) => {
    const { choose, id } = data
    return HttpRequest({
      url: `/admin/goods/${id}/shelves/${choose}`,
      method: 'PUT'
    })
  },
  // 获取服务商品详情
  getGoodsDetail: (data) => {
    return HttpRequest({
      url: `/admin/goods/${data}`,
      method: 'GET'
    })
  },
  // 删除服务商品
  deleteGoods: (data) => {
    return HttpRequest({
      url: `/admin/goods/${data}`,
      method: 'DELETE'
    })
  },
  // 服务商品分类 分页
  getGoodsTypePage: (data) => {
    const { type, ...extParam } = data
    return HttpRequest({
      url: `/admin/goods/category/${type}/findPage`,
      method: 'POST',
      data: extParam
    })
  },
  // 服务商品分类 列表
  getGoodsTypeList: (data) => {
    return HttpRequest({
      url: `/admin/goods/category/${data}`,
      method: 'GET'
    })
  },
  // 新增，编辑服务商品分类
  saveGoodsType: (data) => {
    const { type, ...extParam } = data
    return HttpRequest({
      url: `/admin/goods/category/${type}/save`,
      method: 'POST',
      data: extParam
    })
  },
  // 删除服务商品
  deleteGoodsType: (data) => {
    return HttpRequest({
      url: `/admin/goods/category/${data}`,
      method: 'DELETE'
    })
  },
}

export default service