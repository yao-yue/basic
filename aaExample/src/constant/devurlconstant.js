const api = 'http://www.easy-mock.com/mock/59df06029037126ebfa63b2b/orderSystem/admin/';
module.exports = {
  //管理员
  ADMIN: {
    REGISTER:api+'user/register',    // 注册接口
    LOGIN: api + 'user/login',      //登录接口
    UPDUSERPWD: api + 'urder/updUserPWD', //重置密码接口
    LOGOUT:api+'user/logout'  // 登出 
  },
  // 订单管理
  ORDER:{
    FINDORDERBYPAGE:api+'order/findOrderByPage',    // 分页获取订餐列表
    FINDBOOKDETAILBYPAGE:api+'order/findBookDetailByPage',     //分页获取订房列表
    FINDORDEREXTBYORDERID:api+'order/findOrderExtByOrderId',   // 获取订餐详情 by orderId
    FINDBOOKDETAILBYBOOKID:api+'order/findBookDetailByBookId'  // 获取订房详情 by bookId
  },
  // 房间管理
  ROOM:{
    FINDSTOREROOMBYPAGE:api+'customer/findStoreRoomByPage',  // 分页获取房/桌列表

  },
  // 商品管理
  PRO:{
    FINDGOODSSKUBYPAGE:api+'sku/findGoodsSkuByPage',  // 分页获取门店商品列表
    FINDGOODSSKUBYSKUID:api+'sku/findGoodsSkuBySkuId', // 根据id 获取门店商品详情
    SAVEGOODSSKU:api+'sku/saveGoodsSku',   // 保存门店商品详情
    // 缺少  上架 下架 删除商品 的接口
    FINDCATEGORYBYCUSTOMERID:api+'sku/findCategoryByCustomerId',  //分页获取类别列表
    SAVESKUCATEGORY:api+'sku/saveSkuCategory',  // 保存类别
    DELETESTORESKUCATEGORYBYID:api+'sku/deleteStoreSkuCategoryById'  // 删除类别
  }

}
