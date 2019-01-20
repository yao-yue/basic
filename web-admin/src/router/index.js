import Vue from 'vue';
import Router from 'vue-router';

// 登录修改密码忘记密码
const login = resolve => require(['@/page/passport/login'], resolve)
const resetPassword = resolve => require(['@/page/passport/reset-password'], resolve)
const forgetPassword = resolve => require(['@/page/passport/forget-password'], resolve)

// 会员管理
const memberList = resolve => require(['@/page/member/list'], resolve)

// 城市管理
const cityList = resolve => require(['@/page/city/list'], resolve)

// 资讯活动
const campaignList = resolve => require(['@/page/campaign/list'], resolve)
const campaignEdit = resolve => require(['@/page/campaign/edit-item'], resolve)
const campaignActiveList = resolve => require(['@/page/campaign/active-list'], resolve)
const campaignActiveEdit = resolve => require(['@/page/campaign/active-edit'], resolve)
const campaignSwiperList = resolve => require(['@/page/campaign/swiper-list'], resolve)
const campaignSwiperEdit = resolve => require(['@/page/campaign/swiper-edit'], resolve)

// 办公室管理
const officeList = resolve => require(['@/page/office/list'], resolve)
const officeEdit = resolve => require(['@/page/office/edit-item'], resolve)
const officeDetail = resolve => require(['@/page/office/detail'], resolve)

// 会议室管理
const meetingList = resolve => require(['@/page/meeting/list'], resolve)
const meetingEdit = resolve => require(['@/page/meeting/edit-item'], resolve)
const meetingDetail = resolve => require(['@/page/meeting/detail'], resolve)
const meetingTypeList = resolve => require(['@/page/meeting/type-list'], resolve)
const meetingSwiperList = resolve => require(['@/page/meeting/swiper-list'], resolve)
const meetingSwiperEdit = resolve => require(['@/page/meeting/swiper-edit'], resolve)

// 服务定制
const serviceList = resolve => require(['@/page/service/list'], resolve)
const serviceEdit = resolve => require(['@/page/service/edit-item'], resolve)
const serviceDetail = resolve => require(['@/page/service/detail'], resolve)
const serviceGoodsList = resolve => require(['@/page/service/goods-list'], resolve)
const serviceLiveList = resolve => require(['@/page/service/live-list'], resolve)
const serviceLiveEdit = resolve => require(['@/page/service/live-edit'], resolve)
const serviceLiveDetail = resolve => require(['@/page/service/live-detail'], resolve)
const serviceAssortList = resolve => require(['@/page/service/assort-list'], resolve)
const serviceSwiperList = resolve => require(['@/page/service/swiper-list'], resolve)
const serviceSwiperEdit = resolve => require(['@/page/service/swiper-edit'], resolve)

// 预约管理
const appointList = resolve => require(['@/page/appoint/list'], resolve)
const appointDetail = resolve => require(['@/page/appoint/detail'], resolve)
const appointOfficeList = resolve => require(['@/page/appoint/office-list'], resolve)
const appointOfficeDetail = resolve => require(['@/page/appoint/office-detail'], resolve)

// 订单管理
const orderList = resolve => require(['@/page/order/meetList'], resolve)
const orderDetail = resolve => require(['@/page/order/meetDetail'], resolve)
const orderServiceList = resolve => require(['@/page/order/serviceList'], resolve)
const orderServerDetail = resolve => require(['@/page/order/serverDetail'], resolve)
const orderRefundList = resolve => require(['@/page/order/refundList'], resolve)
const orderRefundDetail = resolve => require(['@/page/order/refundDetail'], resolve)

// 意见反馈
const feedBackList = resolve => require(['@/page/feedBack/list'], resolve)

// 权限管理
const roleList = resolve => require(['@/page/system/roleList'], resolve)
const roleEdit = resolve => require(['@/page/system/roleEdit'], resolve)
const roleAccountList = resolve => require(['@/page/system/accountList'], resolve)
const roleAccountEdit = resolve => require(['@/page/system/accountEdit'], resolve)


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

    // 会员管理
    {
      path: '/',
      name: 'member-list',
      component: memberList
    },

    // 城市管理
    {
      path: '/city-list',
      name: 'city-list',
      component: cityList
    },

    // 资讯活动
    {
      path: '/campaign-list',
      name: 'campaign-list',
      component: campaignList
    },
    {
      path: '/edit-item',
      name: 'edit-item',
      component: campaignEdit
    },
    {
      path: '/active-list',
      name: 'active-list',
      component: campaignActiveList
    },
    {
      path: '/active-edit',
      name: 'active-edit',
      component: campaignActiveEdit
    },
    {
      path: '/campaign-swiper-list',
      name: 'campaign-swiper-list',
      component: campaignSwiperList
    },
    {
      path: '/campaign-swiper-edit',
      name: 'campaign-swiper-edit',
      component: campaignSwiperEdit
    },

    // 办公室管理
    {
      path: '/office-list',
      name: 'office-list',
      component: officeList
    },
    {
      path: '/office-edit',
      name: 'office-edit',
      component: officeEdit
    },
    {
      path: '/office-detail',
      name: 'office-detail',
      component: officeDetail
    },

    // 会议室管理
    {
      path: '/meeting-list',
      name: 'meeting-list',
      component: meetingList
    },
    {
      path: '/meeting-edit',
      name: 'meeting-edit',
      component: meetingEdit
    },
    {
      path: '/meeting-detail',
      name: 'meeting-detail',
      component: meetingDetail
    },
    {
      path: '/meeting-type-list',
      name: 'meeting-type-list',
      component: meetingTypeList
    },
    {
      path: '/meeting-swiper-list',
      name: 'meeting-swiper-list',
      component: meetingSwiperList
    },
    {
      path: '/meeting-swiper-edit',
      name: 'meeting-swiper-edit',
      component: meetingSwiperEdit
    },
    
    // 服务定制
    {
      path: '/service-list',
      name: 'service-list',
      component: serviceList
    },
    {
      path: '/service-edit',
      name: 'service-edit',
      component: serviceEdit
    },
    {
      path: '/service-detail',
      name: 'service-detail',
      component: serviceDetail
    },
    {
      path: '/service-goods-list',
      name: 'service-goods-list',
      component: serviceGoodsList
    },
    {
      path: '/service-live-list',
      name: 'service-live-list',
      component: serviceLiveList
    },
    {
      path: '/service-live-edit',
      name: 'service-live-edit',
      component: serviceLiveEdit
    },
    {
      path: '/service-live-detail',
      name: 'service-live-detail',
      component: serviceLiveDetail
    },
    {
      path: '/service-assort-list',
      name: 'service-assort-list',
      component: serviceAssortList
    },
    {
      path: '/service-swiper-list',
      name: 'service-swiper-list',
      component: serviceSwiperList
    },
    {
      path: '/service-swiper-edit',
      name: 'service-swiper-edit',
      component: serviceSwiperEdit
    },

    // 预约管理
    {
      path: '/appoint-list',
      name: 'appoint-list',
      component: appointList
    },
    {
      path: '/appoint-detail',
      name: 'appoint-detail',
      component: appointDetail
    },
    {
      path: '/appoint-office-list',
      name: 'appoint-office-list',
      component: appointOfficeList
    },
    {
      path: '/appoint-office-detail',
      name: 'appoint-office-detail',
      component: appointOfficeDetail
    },

    // 订单管理
    {
      path: '/meetList',
      name: 'meetList',
      component: orderList
    },
    {
      path: '/meetDetail',
      name: 'meetDetail',
      component: orderDetail
    },
    {
      path: '/serviceList',
      name: 'serviceList',
      component: orderServiceList
    },
    {
      path: '/serverDetail',
      name: 'serverDetail',
      component: orderServerDetail
    },
    {
      path: '/refundList',
      name: 'refundList',
      component: orderRefundList
    },
    {
      path: '/refundDetail',
      name: 'refundDetail',
      component: orderRefundDetail
    },

    // 反馈
    {
      path: '/feedBackList',
      name: 'feedBackList',
      component: feedBackList
    },

    // 权限管理
    {
      path: '/roleList',
      name: 'roleList',
      component: roleList
    },
    {
      path: '/roleEdit',
      name: 'roleEdit',
      component: roleEdit
    },
    {
      path: '/accountList',
      name: 'accountList',
      component: roleAccountList
    },
    {
      path: '/accountEdit',
      name: 'accountEdit',
      component: roleAccountEdit
    }]
})
