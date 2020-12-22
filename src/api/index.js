import Http from './helper'


export function getImages(data) {
    return Http({
        url: '/api/diffusion/material/listMaterialPage',
        method: 'get',
        data
    })
}

export function getGroup() {
    return Http({
        url: '/api/diffusion/system/userListMaterial',
        method: 'get'
    })
}

export function getVideoArea(data) {
    return Http({
        url: '/api/diffusion/material/getVideoArea',
        method: 'get',
        data
    })
}

export function getMusic(data) {
    return Http({
        url: '/api/diffusion/material/listMaterialPage',
        method: 'get',
        data
    })
}

export function getShowList(data) {
    return Http({
        url: '/api/diffusion/material/getShowList',
        method: 'get',
        data
    })
}

export function removeShowItems(data) {
    return Http({
        url: '/api/diffusion/material/removeShowItems',
        method: 'get',
        data
    })
}

export function getShowItem(data) {
    return Http({
        url: '/api/diffusion/material/getShowItem',
        method: 'get',
        data
    })
}

export function saveShowItem(data) {
    return Http({
        url: '/api/diffusion/material/saveShowItem',
        method: 'post',
        data
    })
}

export function groupList() {
    return Http({
        url: '/api/diffusion/material/groupList',
        method: 'get'
    })
}

export function getPrograms(data) {
    return Http({
        url: '/api/diffusion/material/getPrograms',
        // url: '/api/diffusion/show/listShowPage',
        method: 'get',
        data
    })
}

export function getMedia(data) {
    return Http({
        url: '/api/diffusion/material/getMedia',
        method: 'get',
        data
    })
}

export function addShow(data) {
    return Http({
        url: '/api/diffusion/material/addShow',
        method: 'post',
        data
    })
}

export function getPC() {
    return Http({
        url: '/api/diffusion/material/getPC',
        method: 'get'
    })
}

export function getWeather(data) {
    return Http({
        url: '/api/diffusion/material/getWeather',
        method: 'get',
        data
    })
}

export function getTemplate(data) {
    return Http({
        url: '/api/diffusion/material/getTemplate',
        method: 'get',
        data
    })
}

export function getLayoutDetail(data) {
    return Http({
        url: '/api/diffusion/layout/detail',
        method: 'get',
        data
    })
}

export function uploadImg(data) {
    return Http({
        url: '/api/diffusion/material/removeShowItems',
        method: 'post',
        data
    })
}

export function getProgramGroup() {
    return Http({
        url: '/api/diffusion/show/groupList',
        method: 'get'
    })
}

export function saveLayout(data) {
    return Http({
        url: '/api/diffusion/layout/store',
        method: 'post',
        data
    })
}

export function getLayoutGroup() {
    return Http({
        url: '/api/diffusion/layout/category',
        method: 'get'
    })
}
