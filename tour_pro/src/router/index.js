// 前端路由器

//引入VueRouter
import VueRouter from 'vue-router'

//引入路由组件
import Home from '../pages/Home'
import Service from '../pages/Service'
import Tour from '../pages/Tour'
import TourList from '../pages/TourList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Bought from '../pages/Bought'
import Plan from '../pages/Plan'
import CreateTour from '../pages/create/CreateTour'
import CreateTemplate from '../pages/create/CreateTemplate'
import CreateTemp from '../pages/create/CreateTemp'
import CreateService from '../pages/create/CreateService'
import ManageVisit from '../pages/manage/ManageVisit'
import ManageGuide from '../pages/manage/ManageGuide'
import ManageTour from '../pages/manage/ManageTour'
import CheckTour from '../pages/manage/CheckTour'
import ManageService from '../pages/manage/ManageService'
import ManageTemplate from '../pages/manage/ManageTemplate'

import Audit from '../pages/Audit'
import Unaudit from '../pages/Unaudit'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
        },
        {
            path: '/',
            component: Home,
        },
        {
            name: 'service',
            path: '/service',
            component: Service,
        },
        {
            name: 'tour',
            path: '/tour',
            component: Tour,
        },
        {
            name: 'tour-list',
            path: '/tourlist',
            component: TourList,
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
        },
        {
            name: 'bought',
            path: '/bought',
            component: Bought,
        },
        {
            name: 'plan',
            path: '/plan',
            component: Plan,
        },
        {
            name: 'create-tour',
            path: '/createtour',
            component: CreateTour,
        },
        {
            name: 'create-template',
            path: '/createtemplate',
            component: CreateTemplate,
        },
        {
            name: 'create-temp',
            path: '/createtemp',
            component: CreateTemp,
        },
        {
            name: 'create-service',
            path: '/createservice',
            component: CreateService,
        },
        {
            name: 'manage-visit',
            path: '/managevisit',
            component: ManageVisit,
        },
        {
            name: 'manage-guide',
            path: '/manageguide',
            component: ManageGuide,
        },
        {
            name: 'manage-tour',
            path: '/managetour',
            component: ManageTour,
        },
        {
            name: 'check-tour',
            path: '/checktour',
            component: CheckTour,
        },
        {
            name: 'manage-service',
            path: '/manageservice',
            component: ManageService,
        },
        {
            name: 'audit',
            path: '/audit',
            component: Audit,
        },
        {
            name: 'unaudit',
            path: '/unaudit',
            component: Unaudit,
        },
        {
            name: 'manage-template',
            path: '/managetemplate',
            component: ManageTemplate,
        },
    ]
})


//暴露router
export default router