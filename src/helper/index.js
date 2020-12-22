/* eslint no-restricted-globals: 0 */
export function hasClassName(e, $className) {
    let result = false
    if (!e) {
        result = true
    } else {
        let classNames = !e.target ? e.className : e.target.className
        classNames = classNames.split(' ')
        result = classNames.includes($className)
    }
    return result
}

export function addListener(dom, event, fn) {
    dom.addEventListener(event, fn)
}

export function removeListener(dom, event, fn) {
    dom.removeEventListener(event, fn)
}

export function areaJudge(centerX, centerY, x, y) {
    if (Number.isNaN(centerX) || Number.isNaN(centerY) || Number.isNaN(x) || Number.isNaN(y)) {
        // console.error('not number!')
        return 0
    }
    if (centerY === y && centerX === x) {
        return 0
    }
    if (centerX >= x) {
        return centerY >= y ? 4 : 3
    } else {
        return centerY >= y ? 1 : 2
    }
}

export const transform = (str) => {
    return str.replace(/[A-Z]/g, (e) => {
        return `-${e.toLowerCase()}`
    })
}

export function toFixed(number, p = 0) {
    if (typeof number === 'number') {
        return number.toFixed(p) - 0
    } else if (typeof number === 'string') {
        const toNumber = number - 0
        if (!isNaN(toNumber)) {
            return toFixed(toNumber, p)
        } else {
            return 0
        }
    } else {
        return 0
    }
}

export function getHMS(timer) {
    if (!timer) {
        return [0, 0, 5]
    }
    const min = Math.floor(timer % 3600)
    return [Math.floor(timer / 3600), Math.floor(min / 60), timer % 60]
}

/* eslint-disable */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export function dataURLtoFile(dataurl, filename) {
    // 将base64转换为文件
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1])
    let n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime})
}

export function getImage(crop, src, cb) {
    // console.log(crop)
    const canvas = document.createElement('canvas')
    // const canvas = document.querySelector('#aaaa')
    let img = new Image()
    img.setAttribute("crossOrigin",'Anonymous')
    img.onload = () => {
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, crop.left, crop.top, crop.width, crop.height, 0, 0, crop.width, crop.height)
        const png = canvas.toDataURL('image/png')
        cb && cb(png)
    }
    img.src = src
}
