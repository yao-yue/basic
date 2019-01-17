/**
 * 左侧菜单栏
 */

export default {
  routerList: [
    {
      menuUrl: '/',
      id: 0,
      menuName: '会员管理',
      icon: 'icon-home',
      childPermissions: [
        {
          menuName: '会员列表',
          menuUrl: '/'
        },
      ],
    },
    {
      menuUrl: '/1',
      id: 1,
      menuName: '城市管理',
      icon: 'icon-home',
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
      menuName: '资讯活动',
      icon: 'icon-home',
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
      menuName: '办公室管理',
      icon: 'icon-home',
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
      menuName: '会议室管理',
      icon: 'icon-home',
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
      menuName: '服务定制',
      icon: 'icon-home',
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
      menuName: '预约管理',
      icon: 'icon-home',
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
      menuName: '订单管理',
      icon: 'icon-home',
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
      menuName: '意见反馈',
      icon: 'icon-home',
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
      menuName: '权限管理',
      icon: 'icon-home',
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
