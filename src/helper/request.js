import axios from 'axios'
import {Message} from 'view-design'
import Cookies from 'js-cookie'
import {ERROR_CODE} from '../api/config'

const service = axios.create({
    // api 的 域名
    // baseURL: 'http://' + window.location.host + '/', // api的base_url
    // 超时时间
    timeout: 60000,
    headers: {'Authorization': Cookies.get('Authorization')}
})

service.interceptors.request.use((config) => {
    return config
}, (error) => {
    if (error.response.status === 401) {
        Message.error('认证错误')
    } else if (error.response.status === 404) {
        Message.error('404')
    }
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    (response) => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        /* const res = response.data;
         if (res.code !== 0) {
         notification.error({message: 'xxx', description: 'xxx'})
         if (res.code === 1 || res.code === 2 || res.code === 3) {
         notification.error({message: 'xxx', description: 'xxx'})
         store.dispatch('Logout')
         }
         return Promise.reject('error')
         } else {
         return response.data
         } */
        const res = response.data
        if (res.code !== ERROR_CODE && !(res instanceof Blob)) {
            Message.error(res.message)
        }
        return response.data
    },
    (error) => {
        // console.log(`err ${error}`)
        // token过期
        if (error.response.status === 401) {
            Message.error('认证错误')
        } else if (error.response.status === 404) {
            Message.error('404')
        } else {
            Message.error(typeof error === 'object' ? (error.message || error.response.data.message) : error)
        }
        return Promise.reject(error)
    }
)

export default service
