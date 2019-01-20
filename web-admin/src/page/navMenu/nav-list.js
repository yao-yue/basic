/**
 * 左侧菜单栏
 */

export default {
  routerList: [
    {
      menuUrl: '/',
      id: 0,
      menuName: '财务统计',
      icon: 'el-icon-document',
    },
    {
      menuUrl: '/1',
      id: 1,
      menuName: '用户管理',
      icon: 'el-icon-info',
      childPermissions: [
        {
          menuName: '城市列表',
          menuUrl: '/city-list'
        }
      ],
    },
    {
      menuUrl: '/2',
      id: 2,
      menuName: '轮播图管理',
      icon: 'el-icon-picture',
      childPermissions: [
        {
          menuName: '资讯列表',
          menuUrl: '/campaign-list'
        },
        {
          menuName: '活动列表',
          menuUrl: '/active-list'
        },
        {
          menuName: '首页轮播图',
          menuUrl: '/campaign-swiper-list'
        }
      ],
    },
    {
      menuUrl: '/3',
      id: 3,
      menuName: '经典问答',
      icon: 'el-icon-question',
      childPermissions: [
        {
          menuName: '办公室列表',
          menuUrl: '/office-list'
        }
      ],
    },
    {
      menuUrl: '/4',
      id: 4,
      menuName: '情感秘籍',
      icon: 'el-icon-view',
      childPermissions: [
        {
          menuName: '会议室列表',
          menuUrl: '/meeting-list'
        },
        {
          menuName: '会议室类型',
          menuUrl: '/meeting-type-list'
        },
        {
          menuName: '轮播图',
          menuUrl: '/meeting-swiper-list'
        }
      ],
    },
    {
      menuUrl: '/5',
      id: 5,
      menuName: '公告管理',
      icon: 'el-icon-news',
      childPermissions: [
        {
          menuName: '办公服务列表',
          menuUrl: '/service-list'
        },
        {
          menuName: '生活服务列表',
          menuUrl: '/service-live-list'
        },
        {
          menuName: '轮播图',
          menuUrl: '/service-swiper-list'
        }
      ],
    },
    {
      menuUrl: '/6',
      id: 6,
      menuName: '快速提问',
      icon: 'el-icon-question',
      childPermissions: [
        {
          menuName: '会议室预定列表',
          menuUrl: '/appoint-list'
        },
        {
          menuName: '办公室预约列表',
          menuUrl: '/appoint-office-list'
        }
      ],
    },
    {
      menuUrl: '/7',
      id: 7,
      menuName: '测试题库',
      icon: 'el-icon-edit-outline',
      childPermissions: [
        {
          menuName: '会议室订单列表',
          menuUrl: '/meetList'
        },
        {
          menuName: '服务定制订单列表',
          menuUrl: '/serviceList'
        },
        {
          menuName: '退款列表',
          menuUrl: '/refundList'
        }
      ],
    },
    {
      menuUrl: '/8',
      id: 8,
      menuName: '订单管理',
      icon: 'el-icon-tickets',
      childPermissions: [
        {
          menuName: '意见列表',
          menuUrl: '/feedBackList'
        }
      ],
    },
    {
      menuUrl: '/9',
      id: 9,
      menuName: '钱包流水',
      icon: 'el-icon-goods',
      childPermissions: [
        {
          menuName: '管理员列表',
          menuUrl: '/accountList'
        },
        {
          menuName: '角色权限',
          menuUrl: '/roleList'
        }
      ],
    },
    {
      menuUrl: '/10',
      id: 10,
      menuName: '系统设置',
      icon: 'el-icon-setting',
      childPermissions: [
        {
          menuName: '管理员列表',
          menuUrl: '/accountList'
        },
        {
          menuName: '角色权限',
          menuUrl: '/roleList'
        }
      ],
    },
    {
      menuUrl: '/11',
      id: 11,
      menuName: '权限管理',
      icon: 'el-icon-menu',
      childPermissions: [
        {
          menuName: '管理员列表',
          menuUrl: '/accountList'
        },
        {
          menuName: '角色权限',
          menuUrl: '/roleList'
        }
      ],
    }
  ]
}
