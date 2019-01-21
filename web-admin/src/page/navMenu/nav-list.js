/**
 * 左侧菜单栏
 */

export default {
  routerList: [
    {
      menuUrl: '/count-chart',
      id: 0,
      menuName: '财务统计',
      icon: 'el-icon-document',
    },
    {
      menuUrl: '/user-manage',
      id: 1,
      menuName: '用户管理',
      icon: 'el-icon-info',
  
    },
    {
      menuUrl: '/slideImg-manage',
      id: 2,
      menuName: '轮播图管理',
      icon: 'el-icon-picture',
     
    },
    {
      menuUrl: '/classic-qa',
      id: 3,
      menuName: '经典问答',
      icon: 'el-icon-question',
     
    },
    {
      menuUrl: '/emotion-cheats',
      id: 4,
      menuName: '情感秘籍',
      icon: 'el-icon-view',
     
    },
    {
      menuUrl: '/notice-manage',
      id: 5,
      menuName: '公告管理',
      icon: 'el-icon-news',
     
    },
    {
      menuUrl: '/quick-question',
      id: 6,
      menuName: '快速提问',
      icon: 'el-icon-question',
      
    },
    {
      menuUrl: '/test-bank',
      id: 7,
      menuName: '测试题库',
      icon: 'el-icon-edit-outline',
      
    },
    {
      menuUrl: '/###',
      id: 8,
      menuName: '订单管理',
      icon: 'el-icon-tickets',
      childPermissions: [
        {
          menuName: '偷听订单',
          menuUrl: '/listen-order'
        },
        {
          menuName: '提问订单',
          menuUrl: '/question-order'
        }
      ],
    },
    {
      menuUrl: '/wallet-info',
      id: 9,
      menuName: '钱包流水',
      icon: 'el-icon-goods',
      
    },
    {
      menuUrl: '/###',
      id: 10,
      menuName: '系统设置',
      icon: 'el-icon-setting',
      childPermissions: [
        {
          menuName: '关于我们',
          menuUrl: '/about-ourTerm'
        },
        {
          menuName: '提问流程',
          menuUrl: '/question-process'
        },
        {
          menuName: '测试阶段',
          menuUrl: '/test-phase'
        },
        {
          menuName: '充值活动',
          menuUrl: '/recharge-active'
        }
      ],
    },
    {
      menuUrl: '/###',
      id: 11,
      menuName: '权限管理',
      icon: 'el-icon-menu',
      childPermissions: [
        {
          menuName: '账号管理',
          menuUrl: '/account'
        },
        {
          menuName: '角色管理',
          menuUrl: '/character'
        }
      ],
    }
  ]
}
