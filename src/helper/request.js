import axios from 'axios'
import {Message} from 'view-design'
import Cookies from 'js-cookie'
import {ERROR_CODE} from '../api/config'

const service = axios.create({
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
        const res = response.data
        if (res.code !== ERROR_CODE && !(res instanceof Blob)) {
            Message.error(res.message)
        }
        return response.data
    },
    (error) => {
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
