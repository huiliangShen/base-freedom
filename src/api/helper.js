import request from '../helper/request'
/* eslint-disable */
export default ({url, method, data}) => {
    const req = {
        url,
        method: method || 'get',
        data,
        params: data
    }

    if (req.method.toLowerCase() === 'post') {
        delete req.params
    } else {
        delete req.data
    }
    return request(req)
}

export function downImage({url}) {
    return request({
        url,
        method: 'get',
        responseType: 'blob'
    })
}
