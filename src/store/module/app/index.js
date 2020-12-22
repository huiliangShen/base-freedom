import {common} from '@/config'
import types from './mutationsType'

/**
 * 图片加载获取真实宽高
 * @param data
 * @returns {Promise<data>}
 */
const imgLoad = (data) => {
    return new Promise((resolve) => {
        const img = new Image()

        img.onload = () => {
            data.originalWidth = img.width
            data.originalHeight = img.height
            // commit(types.ADD_LAYER, {type, data})
            resolve(data)
        }
        img.onerror = () => {
            data.originalWidth = 200
            data.originalHeight = 100
            // commit(types.ADD_LAYER, {type, data})
            resolve(data)
        }

        img.src = data.src
    })
}

/**
 * 历史记录更新
 * @param state: 当前值
 * @param handle: 是否是移动结束传入
 */
function updateHistory(state, handle = false) {
    // dragging 有延时 无法保证拖拽过程中 是否有中断
    if (!state.dragging || handle) {
        if (state.historyIndex > -1 && state.historyIndex < state.historyData.length - 1) {
            state.historyData = state.historyData.slice(0, state.historyIndex + 1)
        }
        if (state.historyData.length >= 20) {
            state.historyData.shift()
        }
        const lastDate = state.historyData[state.historyData.length - 1]
        // 判断上一步的值 是否与 当前传入值相同
        if (JSON.stringify(lastDate) !== JSON.stringify(state.data)) {
            state.historyData.push({
                activePage: state.activePage,
                data: JSON.parse(JSON.stringify(state.data))
            })
            state.historyIndex = state.historyData.length - 1
        }
    }
}

/* eslint-disable */
export default {
    state: {
        dragging: false,
        activePage: 0,
        activeLayer: null,
        activeLayerIndex: -1,
        data: null,
        historyIndex: -1,
        historyData: [],
        imgDialogShow: false,
        cropperBgDialogShow: false,
        imgChange: false,
        cropperImgDialogShow: false,
        // 图片区域类型 0 默认为图片组件 1 背景图片 2 视频区
        imgAreaType: 0,
        musicList: []
    },
    mutations: {
        [types.IS_DRAGGING](state, flag) {
            state.dragging = flag
        },
        [types.CHANGE_PAGE](state, page) {
            state.activePage = page
            state.activeLayer = null
            state.activeLayerIndex = -1
        },
        [types.ADD_LAYER](state, {type, data}) {
            const page = state.data.pages[state.activePage]
            switch (type) {
                case 'img':
                    page.layers.push(common({type, data}))
                    break
                default:
                    page.layers.push(common({type, data}))
                    break
            }
            // console.log(3)
            updateHistory(state)
        },
        [types.ADD_PAGE](state, pageDetail = null) {
            const page = pageDetail || {
                id: null,
                name: '',
                style: {
                    height: 720,
                    width: 1280,
                    direction: 'horizontal',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    backgroundRepeat: 'no-repeat',
                    backgroundImageCrop: null,
                    backgroundSize: '100% 100%',
                    backgroundImage: '',
                    size: '1280X720'
                },
                layers: [],
                slider: {
                    animate: 1, autoplay: false, lock: false, time: 5
                }
            }
            state.data.pages.push(page)
            // console.log(2)
            updateHistory(state)
        },
        [types.DELETE_PAGE](state, i) {
            if (state.data.pages.length === 1) {
                return
            }

            if (state.activePage === i) {
                state.activePage = 0
            }
            state.data.pages.splice(i, 1)
            // console.log(4)
            updateHistory(state)
        },
        // 替换 或 删除 layer
        [types.OPERATION_DOM](state, {layer, i, del = false, move = false}) {
            const page = state.data.pages[state.activePage]

            if (del) {
                page.layers.splice(i, 1)
            } else {
                page.layers.splice(i, 1, layer)
            }
            state.data.pages.splice(state.activePage, 1, page)
            // console.log(1)
            !move && updateHistory(state)
        },
        [types.SET_ACTIVE_LAYER](state, {layer, i}) {
            state.activeLayer = layer
            state.activeLayerIndex = i
        },
        [types.SHOW_IMG_DIALOG](state, {flag, imgAreaType = 0}) {
            state.imgDialogShow = flag
            state.imgAreaType = (flag && imgAreaType) || 0
        },
        [types.SET_CHANGE_IMG](state, flag) {
            state.imgChange = flag
        },
        [types.SET_CROPPER_IMG](state, flag) {
            state.cropperImgDialogShow = flag
        },
        [types.CHANGE_PAGE_INFO](state, page) {
            state.data.pages.splice(state.activePage, 1, page)
            console.log(5)
            updateHistory(state)
        },
        [types.SET_MUSIC_LIST](state, list) {
            state.musicList = list
        },
        [types.COPY_PLUGIN](state, item) {
            const page = state.data.pages[state.activePage]
            page.layers.push(item)
            // console.log(6)
            updateHistory(state)
        },
        [types.UPDATE_LAYERS](state, layers) {
            const page = state.data.pages[state.activePage]
            page.layers = []
            layers.forEach((e) => page.layers.push(e))

            state.data.pages.splice(state.activePage, 1, page)
            // console.log(7)
            updateHistory(state)
        },
        [types.UPDATE_PAGES](state, pages) {
            state.data.pages = []
            pages.forEach((e) => state.data.pages.push(e))
            // console.log(8)
            updateHistory(state)
        },
        [types.RECORD_STEP](state) {
            updateHistory(state, true)
        },
        [types.SET_DATA](state, data) {
            state.data = data
        },
        [types.SET_CROPPER_BG](state, show) {
           state.cropperBgDialogShow = show
        },
        [types.GO_BACK](state) {
            let history

            if (state.historyIndex === 0) {
                return
            }

            // 默认 没有设置index 自动获取[1,2,3]倒数第二位 第三位为当前显示值 并为index赋值为1
            // 存在index > -1 则 直接更新index 值即可
            if (state.historyIndex <= -1) {
                history = state.historyData[state.historyData.length - 2]
                state.historyIndex = state.historyData.length - 2
            } else {
                state.historyIndex -= 1
                history = state.historyData[state.historyIndex]
            }
            state.data = JSON.parse(JSON.stringify(history.data))
            state.activePage = history.activePage
        },
        [types.GO_FORWARD](state) {
            if (state.historyIndex !== -1 && state.historyIndex < state.historyData.length - 1) {
                state.historyIndex += 1
                let history = state.historyData[state.historyIndex]
                state.data = JSON.parse(JSON.stringify(history.data))
                state.activePage = history.activePage
            }
        }
    },
    actions: {
        addLayer({commit, state}, {type, data}) {
            if (type === 'img') {
                return imgLoad(data)
                    .then((res) => {
                        // 判断是否 是替换 或者新增 layer
                        if (state.imgChange) {
                            const layer = common({type, data})
                            // commit(types.SET_ACTIVE_LAYER, {layer: null, i: -1})
                            commit(types.OPERATION_DOM, {layer, i: state.activeLayerIndex})
                            commit(types.SET_ACTIVE_LAYER, {layer, i: state.activeLayerIndex})
                        } else {
                            commit(types.ADD_LAYER, {type, data: res})
                        }
                    })
            } else {
                return new Promise((resolve) => {
                    commit(types.ADD_LAYER, {type, data})

                    const page = state.data.pages[state.activePage]
                    const layer = page.layers[page.layers.length - 1]
                    commit(types.SET_ACTIVE_LAYER, {layer, i: page.layers.length - 1})
                    resolve()
                })
            }
        },
        setPageBg({commit, state}, src) {
            return imgLoad({src})
                .then((res) => {
                    const {activePage, data} = state
                    const nowPage = data.pages[activePage]

                    nowPage.style.backgroundImage = res.src
                    nowPage.style.newPath = res.src
                    nowPage.style.backgroundRepeat = 'no-repeat'

                    commit(types.CHANGE_PAGE_INFO, nowPage)
                })
        },
        setVideoBg({commit, state}, src) {
            return imgLoad({src})
                .then(() => {
                    const {activeLayer, activeLayerIndex} = state
                    activeLayer.data.backgroundImage = src
                    console.log(activeLayer)
                    commit(types.OPERATION_DOM, {layer: activeLayer, i: activeLayerIndex})
                })
        },
        addMusic({commit, state}) {
            return Promise.resolve().then(() => {
                const data = {
                    src: '',
                    delay: 0,
                    name: '',
                    id: 0
                }
                commit(types.ADD_LAYER, {type: 'music', data})

                const page = state.data.pages[state.activePage]

                const layer = page.layers[page.layers.length - 1]
                commit(types.SET_ACTIVE_LAYER, {layer, i: page.layers.length - 1})
            })
        }
    }
}

/*
data: {
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
            backgroundColor: 'rgba(255, 255, 255, 0)',
            backgroundRepeat: 'no-repeat',
            backgroundImageCrop: null,
            backgroundSize: '100% 100%',
            backgroundImage: ''
        },
        layers: [
            /!* {
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
            } *!/
        ],
        slider: {
            animate: 1, autoplay: false, lock: false, time: 5
        }
    }]
},
*/
