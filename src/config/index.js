export const config = {
    host: ''
}

if (process.env.NODE_ENV !== 'development') {
    config.host = '/'
}

export const headers = [
    {
        name: '文本',
        type: 'text',
        img: 'iconfont icon-wenben'
    },
    {
        name: '图片',
        type: 'img',
        img: 'iconfont icon-tupian'
    },
    {
        name: '二维码',
        type: 'qrcode',
        icon: 'iconfont icon-erweima'
    }
]

export const others = [
]

export const TypeName = {
    'img': {
        name: '图片组件',
        icon: 'iconfont icon-tupian'
    },
    'text': {
        name: '文本组件',
        icon: 'iconfont icon-wenben'
    },
    'qrcode': {
        name: '二维码组件',
        icon: 'iconfont icon-tianqi'
    }
}

export const common = ({type, data}) => ({
    key: '',
    name: TypeName[type].name,
    type,
    icon: TypeName[type].icon,
    data,
    style: {
        width: data.originalWidth || 0,
        height: data.originalHeight || 0,
        left: 0,
        top: 0,
        transform: ''
    },
    estyle: {
        borderRadius: 0,
        borderStyle: 'none',
        opacity: 1
    }
})

/* eslint max-len: 0 */
export const fontSize = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]

export const horizontalList = [
    {
        label: '1280X720',
        val: '1280X720'
    },
    {
        label: '1366X768',
        val: '1366X768'
    },
    {
        label: '1920X1080',
        val: '1920X1080'
    }
]

export const verticalList = [
    {
        label: '720X1280',
        val: '720X1280'
    },
    {
        label: '768X1366',
        val: '768X1366'
    },
    {
        label: '1080X1920',
        val: '1080X1920'
    }
]

export const data = {
    img: '',
    desc: '',
    name: '',
    loading: 1,
    set: [],
    type: 'pc',
    mp3: {
        name: '', url: ''
    },
    slider: {
        animate: 1, lock: false, autoplay: false, time: 5
    },
    style: {
        width: 1200,
        height: 600
    },
    pages: [{
        id: null,
        name: '',
        style: {
            height: 720,
            width: 1280,
            size: '1280X720',
            // vertical horizontal
            direction: 'horizontal',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            backgroundRepeat: 'no-repeat',
            backgroundImageCrop: null,
            backgroundSize: '100% 100%',
            backgroundImage: ''
        },
        layers: [
            /* {
                key: '',
                name: '天气组件',
                type: 'img',
                icon: 'iconfont icon-tianqi',
                style: {
                    width: 120,
                    height: 120,
                    left: 10,
                    top: 10,
                    transform: ''
                },
                estyle: {
                    borderRadius: 0,
                    borderStyle: 'none',
                    opacity: 1
                }
            } */
        ],
        slider: {
            animate: 1, autoplay: false, lock: false, time: 5
        }
    }]
}
