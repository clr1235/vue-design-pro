import Vue from 'vue'
import VueRouter from 'vue-router'
import { findLast } from 'lodash'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { notification } from 'ant-design-vue'

import NotFound from '@views/404.vue'
import Forbidden from '@views/403.vue'
import { check, isLogin } from '@utils/auth.js'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/user',
        hideInMenu: true,
        component: () => import(/* webpackChunkName: "layout" */ '@layouts/UserLayout.vue'),
        children: [
            {
                path: '/user',
                redirect: '/user/login'
            },
            {
                path: '/user/login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@views/user/login.vue')
            },
            {
                path: '/user/register',
                name: 'register',
                component: () => import(/* webpackChunkName: "user" */ '@views/user/register.vue')
            }
        ]
    },
    {
        path: '/',
        meta: { 
            authority: ['user', 'admin']
        },
        component: () => import(/* webpackChunkName: "layout" */ '@layouts/BasicLayout'),
        children: [
            {
                path: '/',
                redirect: '/dashboard/analysis'
            },
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: { icon: 'dashboard', title: '仪表盘' },
                component: { render: h => h('router-view') },
                children: [{
                    path: '/dashboard/analysis',
                    name: 'analysis',
                    meta: { title: '分析页' },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@views/dashboard/Analysis')
                }]
            },
            // form
            {
                path: '/form',
                name: 'form',
                meta: { icon: 'form', title: '表单', authority: ['admin'] },
                component: { render: h => h('router-view') },
                children: [{
                    path: '/form/basic-form',
                    name: 'basicform',
                    meta: { title: '基础表单' },
                    component: () => import(/* webpackChunkName: "form" */ '@views/form/BasicForm')
                }, {
                    path: '/form/step-form',
                    name: 'stepform',
                    hideChildrenInMenu: true,
                    meta: { title: '分步表单' },
                    component: () => import(/* webpackChunkName: "form" */ '@views/form/stepForm'),
                    children: [{
                        path: '/form/step-form',
                        redirect: '/form/step-form/info'
                    }, {
                        path: '/form/step-form/info',
                        name: 'info',
                        component: () => import(/* webpackChunkName: "form" */ '@views/form/stepForm/StepInfo')
                    }, {
                        path: '/form/step-form/confirm',
                        name: 'confirm',
                        component: () => import(/* webpackChunkName: "form" */ '@views/form/stepForm/StepConfirm')
                    }, {
                        path: '/form/step-form/result',
                        name: 'result',
                        component: () => import(/* webpackChunkName: "form" */ '@views/form/stepForm/StepResult')
                    }]
                }]
            }
        ]
    },
    {
        path: '*',
        name: '404',
        hideInMenu: true,
        component: NotFound
    },
    {
        path: '/403',
        name: '403',
        hideInMenu: true,
        component: Forbidden
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        NProgress.start()
    }
    // console.log(to.matched, 'matched')
    const record = findLast(to.matched, record => record.meta.authority)
    if (record && !check(record.meta.authority)) {
        if (!isLogin && to.path !== '/user/login') {
            next({
                path: '/user/login'
            })
        } else if (to.path !== '/403') {
            notification.error({
                message: '403',
                description: '您没有权限，请联系管理员！'
                  
              });
            next({
                path: '/403'
            })
        }
        NProgress.done()
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
