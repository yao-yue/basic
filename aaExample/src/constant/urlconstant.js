const api = 'https://visney.icebartech.com/api/';
module.exports = {
  //管理员
  ADMIN: {
    LOGINOUT:api+'admin/user/logout',    // 登出接口
    LOGIN: api + 'admin/user/login',      //登录接口
    UPDUSERPWD: api + 'admin/user/updUserPWD', //重置密码接口
  },
  // LIST:{
  //   // 财务统计
  //   FINANCESTATISTICS
  //   // 测试试卷
  //   PAPERFINDPAGE
  //   PAPERSAVE
  //   PAPERDELETE
  //   PAPERGETDETAIL
  //   // 测试题库
  //   BANKDELETEMANY
  //   BANKFINDPAGE
  //   BANKSAVE
  //   BANKDELETE
  //   BANKGETDETAIL
  //   // 充值活动
  //   RECHARGEACTIVEGETDETAIL
  //   RECHARGEACTIVEEDIT
  //   // 公告
  //   NOTICEFINDPAGE
  //   NOTICESAVE
  //   NOTICEDELETE
  //   NOTICEGETDETAIL
  //   // 关于我们
  //   ABOUTUSGETDETAIL
  //   ABOUTUSEDIT
  //   // 经典问答
  //   CLASSICQUESTIONFINDPAGE
  //   CLASSICQUESTIONSAVE
  //   CLASSICQUESTIONDELETE
  //   CLASSICQUESTIONGETDETAIL
  //   // 快速提问
  //   QUICKQUESTIONFINDPAGE
  //   QUICKQUESTIONGETDETAIL
  //   QUICKQUESTIONREPLAY
  //   // 轮播图
  //   SLIDEFINDPAGE
  //   SLIDESAVE
  //   SLIDEDELETE
  //   SLIDEGETDETAIL
  //   // 钱包流水
  //   WALLETFINDPAGE
  //   // 情感秘籍
  //   EMTIONFINDPAGE
  //   EMTIONSAVE
  //   EMTIONDELETE
  //   EMTIONGETDETAIL
  //   // 提问订单
  //   QUESTIONORDERFINDPAGE
  //   QUESTIONORDERGETDETAIL
  //   // 提问设置
  //   QUESTIONSETGETDETAIL
  //   QUESTIONSETEDIT
  //   // 偷听订单
  //   LISTENORDERFINDPAGE
  //   LISTENORDERGETDETAIL
  //   // 小程序用户

  // },
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
