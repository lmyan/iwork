import Layout from '../views/Layout'
import { assertTSExternalModuleReference } from 'babel-types';

// 不作为Main组件的子页面展示的页面单独写，如下
export const IndexRouter = {
    path: '/',
    component: Layout,
    children: [
        {
            path: '/',
            name: 'Index',
            meta: {
                title: 'Index - 首页'
            },
            component: resolve => { require(['@/views/Index/index.vue'], resolve); },
            children: [
                {
                    path: '/',
                    name: 'Attendance',
                    meta: {
                        title: '我的考勤'
                    }, 
                    component: resolve => { require(['@/views/Index/attendance.vue'], resolve); }
                },
                {
                    path: '/holiday',
                    name: 'Holiday',
                    meta: {
                        title: '我的假期'
                    }, 
                    component: resolve => { require(['@/views/Index/holiday.vue'], resolve); }
                }
            ]
        }
    ]
}

export const routers = [
    IndexRouter,
]
