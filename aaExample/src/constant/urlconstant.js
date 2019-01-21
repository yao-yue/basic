const api = 'https://visney.icebartech.com/api/';
module.exports = {
  //管理员
  ADMIN: {
    LOGINOUT:api+'admin/user/logout',    // 登出接口
    LOGIN: api + 'admin/user/login',      //登录接口
    UPDUSERPWD: api + 'admin/user/updUserPWD', //重置密码接口
  },
  LIST:{
    //首页
    EDITINDE:api+'admin/indexManage/editIndex',//保存首页管理
    GETINDEXINFO:api+'admin/indexManage/findIndexManage',//获取首页管理信息
    //轮播图
    DELETEBANNER:api+'admin/slideShow/deleteSlideShow',//删除轮播图
    FINDBANNER:api+'admin/slideShow/findBySlideShowId',//id获取轮播图详情
    SAVEBANNER:api+'admin/slideShow/saveSlideshow',//保存和修改轮播图
    BANNERLIST:api+'admin/slideShow/slideShowPage',//轮播列表
    //会员
    FINDUSERID:api+'admin/vip/findByUserId',
    FREEZEUSER:api+'admin/vip/freezeUser',
    VIPPAGE:api+'admin/vip/vipPage',
    //商城
    ADDHOTPRODUCT:api+'admin/product/addHotProduct',//添加热门商品
    CATEGORYPAGE:api+'admin/product/categoryPage',//分类分页
    DELETEGORY:api+'admin/product/deleteCategory',//删除分类
    FINDALL:api+'admin/product/findAll',//商城商品
    DELETEPRODUCT:api+'admin/product/deleteProduct',//删除商品
    FINDPRODUCTBYID:api+'admin/product/findByProductId',//商品详情
    PRODUCYPAGE:api+'admin/product/productPage',//商品分页
    QRCODE:api+'admin/product/qrCode',//二维码
    SAVECATEGORY:api+'admin/product/saveCategory',//保存和修改分类
    SAVEPRODUCT:api+'admin/product/saveProduct',//保存和修改商品
    SOLDOUT:api+'admin/product/soldOut',//上下架商品
    FINDCATEGORY:api+'admin/product/findCategory',
    //酒店
    DELETEROOM:api+'admin/hotel/deleteRoom',//删除房间
    FINDROOMBYID:api+'admin/hotel/findByRoomId',//id获取房间详情
    RESERVEPAGE:api+'admin/hotel/reservePage',//查看预订
    ROOMPAGE:api+'admin/hotel/roomPage',//后台房间分页
    SAVEROOM:api+'admin/hotel/saveRoom',//保存和修改房间
    //人物
    DELETEFIGURE:api+'admin/figure/deleteFigure',//删除任务专栏
    FIGUREPAGE:api+'admin/figure/figurePage',//人物专栏分页
    FIGUREBYID:api+'admin/figure/findByFigureId',//id查询人物专栏
    SAVEFIGURE:api+'admin/figure/saveFigure',//新增和修改人物专栏
    //活动
    ACTIVITYPAGE:api+'admin/activity/activityPage',//后台活动分页
    ADDACTIVITY:api+'admin/activity/addHotActivity',//新增热门活动
    APPLYPAGE:api+'admin/activity/applyPage',//报名名单分页
    DELETEACTIVITY:api+'admin/activity/deleteActivity',//删除商品
    FINDACTIVITYBYID:api+'admin/activity/findByActivityId',//查看活动
    SAVEACTIVITY:api+'admin/activity/saveActivity',//后台新增和修改活动
    //花艺
    DELETEFLOWER:api+'admin/floriCulture/deleteFlower',//删除花艺
    ELETEFLOWERBANNER:api+'admin/floriCulture/deleteFlowerSlideShow',//删除花艺轮播图
    FINDFLOWERBYID:api+'admin/floriCulture/findByFlowerId',//id查询花艺
    FLOWERBYPAGE:api+'admin/floriCulture/flowerPage',//后台花艺分页
    FLOWERBANNERBYPAGE:api+'admin/floriCulture/flowerSlideShowPage',//后台花艺轮播图分页
    SAVEFLOW:api+'admin/floriCulture/saveFlower',//后台花艺轮播图分页
    SAVEFLOWERBANNER:api+'admin/floriCulture/saveFlowerSlideShow',
    //优惠券
    COUPONPAGE:api+'admin/coupon/couponPage',//后台优惠券分页
    DELETECOUPON:api+'admin/coupon/deleteCoupon',//删除优惠券
    ADDCOUPON:api+'admin/coupon/saveCoupon',//新增优惠券
    SENDCOUPON:api+'admin/coupon/sendCoupon',//发送优惠券
    //详情
    FINDPAGEDETAIL:api+'admin/detail/findPageDetail',//查询全屋定制 酒吧 设计师 详情
    SAVEPAGEDETAIL:api+'admin/detail/saveDetail',//保存酒吧设计师全屋定制详情
    //订单
    CHECKLOG:api+'admin/order/checkLogistics',//查看物流
    CONFRIMORDER:api+'admin/order/confirmReceipt',//确认收货
    FINDORDERBYID:api+'admin/order/findOrderById',//查看订单详情
    FINDREFUNDBYID:api+'admin/order/findRefundOrderById',//根据itemId查询退款详情
    ORDERBYPAGE:api+'admin/order/orderPage',//订单分页
    RESERVEORDER:api+'admin/order/pubReservationOrder',//酒吧预订订单分页
    REFUNDAUDIT:api+'admin/order/refundAudit',//退款审核
    REFUNDBYPAGE:api+'admin/order/refundOrderPage',//退款订单分页
    SHIPMENT:api+'admin/order/shipments',//发货
    //评价
    COMMENTBYPAGE:api+'admin/comment/commentPage',
    DELETEBYID:api+'admin/comment/deleteComment',
    //统计
    STATISTICS:api+'admin/statistics/dataStatisticsPage',
    //门店
    STORELIST:api+'admin/store/findAll',
    STOREBYID:api+'admin/store/findByStoreId',
    UPDATESTORE:api+'admin/store/updateStore',
    DELETESTORE:api+'admin/store/deleteStore'
  },
  SYSTEM:{
    ADMINUPLOADFILE:api + 'base/sys/admin/getOSSUploadUrl',  // 获取阿里云上传链接    
    UPLOADFILEBYCOS:api+'base/sys/admin/getOSSUploadUrl',     // 获取腾讯云上传链接    
    // 角色管理
    FINDAPPROLEBYPAGE:api+'admin/role/findAppRoleByPage',   // 分页获取角色列表
    GETALLAPPPERMISSION:api+'admin/role/getAllAppPermission',  // 获取所有权限列表
    GETROLEINFOBYID:api+'admin/role/getRoleInfoByRoleId',   // 获取角色详情
    DELETEROLEBYID:api+'admin/role/deleteRoleByRoleId',   // 删除角色记录
    SAVEAPPROLE:api+'admin/role/saveAppRole',   // 保存角色
     // 管理员
    FINDUSERPERMISSIONS:api+'admin/user/findUserPermissions',     // 获取用户拥有的左侧菜单权限
    FINDADMINUSERBYPAGE:api+'admin/user/findAdminUserByPage',   //  分页获取用户列表
    FINDADMINUSERDETAILBYUSERID:api+'admin/user/findAdminUserDetailByUserId',   // 用户详情
    SAVEADMINUSER:api+'admin/user/saveAdminUser',    // 保存用户
    DELETEADMINUSERBYID:api+'admin/user/deleteAdminUserByUserId',     // 删除
    
  },

}
