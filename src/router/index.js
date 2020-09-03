import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import NotFound from '@views/404.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/user',
        // component: {render: h => h('router-view')},
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
                component: { render: h => h('router-view') },
                children: [{
                    path: '/dashboard/analysis',
                    name: 'analysis',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@views/dashboard/Analysis')
                }]
            },
            // form
            {
                path: '/form',
                name: 'form',
                component: { render: h => h('router-view') },
                children: [{
                    path: '/form/basic-form',
                    name: 'basicform',
                    component: () => import(/* webpackChunkName: "form" */ '@views/form/BasicForm')
                }, {
                    path: '/form/step-form',
                    name: 'stepform',
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
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
