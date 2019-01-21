import Vue from 'vue';
import Router from 'vue-router';

// 登录修改密码忘记密码
const login = resolve => require(['@/page/passport/login'], resolve)
const resetPassword = resolve => require(['@/page/passport/reset-password'], resolve)
const forgetPassword = resolve => require(['@/page/passport/forget-password'], resolve)

// 财务统计
const countChart = resolve => require(['@/page/financialStatistics/count-chart'], resolve)

// 用户管理
const userManage = resolve => require(['@/page/userManage/user-manage'], resolve)

// 轮播图管理
const slideImgManage = resolve => require(['@/page/slideImgManage/slideImg-manage'], resolve)

// 经典问答
const classicQA = resolve => require(['@/page/classicQA/classic-qa'], resolve)

// 情感秘籍
const emtionCheats = resolve => require(['@/page/emtionalCheats/emtion-cheats'], resolve)

// 公告管理
const noticeManage = resolve => require(['@/page/noticeManage/notice-manage'], resolve)

// 快速提问
const quickQuestion = resolve => require(['@/page/quickQuestion/quick-question'], resolve)

// 测试题库
const testBank = resolve => require(['@/page/testBank/test-bank'], resolve)

// 订单管理
const listenOrder = resolve => require(['@/page/orderManage/listen-order'], resolve)
const questionOrder = resolve => require(['@/page/orderManage/question-order'], resolve)

// 钱包流水
const walletInfo = resolve => require(['@/page/walletInfo/wallet-info'], resolve)

// 系统设置
const aboutOurTerm = resolve => require(['@/page/systemSet/about-ourTerm'], resolve)
const questionProcess = resolve => require(['@/page/systemSet/question-process'], resolve)
const rechargeActive = resolve => require(['@/page/systemSet/recharge-active'], resolve)
const testPhase = resolve => require(['@/page/systemSet/test-phase'], resolve)

// 权限管理
const account = resolve => require(['@/page/authManage/account'], resolve)
const character = resolve => require(['@/page/authManage/character'], resolve)


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/sys/',
  routes: [
    // 登录修改密码
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: resetPassword
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: forgetPassword
    },

    // 财务统计
    {
      path: '/count-chart',
      name: 'count-chart',
      component: countChart
    },

    // 用户管理
    {
      path: '/user-manage',
      name: 'user-manage',
      component: userManage
    },

    // 轮播图管理
    {
      path: '/slideImg-manage',
      name: 'slideImg-manage',
      component: slideImgManage
    },
    // 经典问答
    {
      path: '/classic-qa',
      name: 'classic-qa',
      component: classicQA
    },
    // 情感秘籍
    {
      path: '/emtion-cheats',
      name: 'emtion-cheats',
      component: emtionCheats
    },
    // 公告管理
    {
      path: '/notice-manage',
      name: 'notice-manage',
      component: noticeManage
    },
    // 快速提问
    {
      path: '/quick-question',
      name: 'quick-question',
      component: quickQuestion
    },
    // 测试题库
    {
      path: '/test-bank',
      name: 'test-bank',
      component: testBank
    },
    // 订单管理
    {
      path: '/listen-order',
      name: 'listen-order',
      component: listenOrder
    },
    {
      path: '/question-order',
      name: 'question-order',
      component: questionOrder
    },
    // 钱包流水
    {
      path: '/wallet-info',
      name: 'wallet-info',
      component: walletInfo
    },
    // 系统设置(关于我们,提问流程,)
    {
      path: '/about-ourTerm',
      name: 'about-ourTerm',
      component: aboutOurTerm
    },
    {
      path: '/question-process',
      name: 'question-process',
      component: questionProcess
    },
    {
      path: '/recharge-active',
      name: 'recharge-active',
      component: rechargeActive
    },
    {
      path: '/test-phase',
      name: 'test-phase',
      component: testPhase
    },
    // 权限管理
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/character',
      name: 'character',
      component: character
    }

  ]
})
