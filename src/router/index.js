import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout/index'
// import Editor from '../page/editor'

Vue.use(Router)

export const commonRouter = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('../page/editor'),
                name: '主页'
            }
        ]
    }
]

export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: commonRouter
})
