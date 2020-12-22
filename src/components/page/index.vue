<template>
    <div class="maker-canvas" :style="{'transform': 'translate3d(-50%, 0, 0) scale(' + scale + ')'}"
         :class="`makerCanvas_${i}` ">
        <div class="maker-canvas-wrap" :style="customStyle">
            <!--内部page-->
            <div class="maker-page-views">
                <!--可能存在多页需要的页面-->
                <div class="maker-canvas-view">
                    <!--此处可添加标准线-->
                    <div class="maker-canvas-grid" v-show="showGrid && !asideDom">
                        <ul class="maker-canvas-grid-row">
                            <li v-for="item in rows" :key="item"
                                :style="{'top': item + 'px', 'background-color': color}"></li>
                        </ul>
                        <ul class="maker-canvas-grid-column">
                            <li v-for="item in columns" :key="item"
                                :style="{'left': item + 'px', 'background-color': color}"></li>
                        </ul>
                    </div>
                    <div class="maker-swiper-layers">
                        <!--具体的元素-->
                        <div v-for="(layer, i) in page.layers" v-if="page.layers.length > 0"
                             @click.stop="setActive(layer, i)"
                             :key="i">
                            <MyElement :layerItem="layer" :index="i"
                                       :showGrid="showGrid"
                                       :adsorb="adsorb"
                                       :width="page.style.width"
                                       :height="page.style.height"
                                       :dragging="dragging && activeLayer !== layer"
                                       :gridColumn="gridColumn"
                                       :style="{'display': layer.type === 'music' ? 'none' : ''}"
                                       :active="activeLayer === layer"
                                       @deleteLayer="deleteLayer"
                                       @operationFn="operationFn"
                                       @mouseEnd="mouseEnd"
                                       :stopOperation="stopOperation">
                                <page-img-plugin v-if="layer.type === 'img'" :layer="layer"></page-img-plugin>
                                <page-music-plugin v-else-if="layer.type === 'music'"
                                                   :layer="layer"></page-music-plugin>
                                <page-text-plugin v-else-if="layer.type === 'text'" :layer="layer"></page-text-plugin>
                                <page-code-plugin v-else-if="layer.type === 'qrcode'" :layer="layer"></page-code-plugin>
                                <page-run-plugin v-else-if="layer.type === 'run'" :layer="layer"></page-run-plugin>
                            </MyElement>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import MyElement from '@/components/element'
    import {
        PageImgPlugin,
        PageMusicPlugin,
        PageTextPlugin,
        PageCodePlugin,
        PageRunPlugin
    } from '@/components/pagePlugin'
    import types from '@/store/module/app/mutationsType'
    import {transform} from '@/helper'
    import {config} from '@/config'

    const NEEDPX = ['width', 'height']

    export default {
        name: 'page',
        components: {
            MyElement,
            PageImgPlugin,
            PageMusicPlugin,
            PageTextPlugin,
            PageCodePlugin,
            PageRunPlugin
        },
        inject: ['asideDom'],
        props: {
            page: {
                type: Object
            },
            i: {
                type: Number,
                default: 0
            }
        },
        computed: {
            ...mapGetters([
                'data',
                'activePage',
                'activeLayer',
                'scale',
                'showGrid',
                'gridColumn',
                'adsorb',
                'color',
                'dragging'
            ]),
            customStyle() {
                // let {pages, style} = this.data
                console.log(this.page)
                let _style = this.page.style
                let result = ''
                for (const key in _style) {
                    // console.log(transform(key))
                    if (NEEDPX.includes(key)) {
                        result += `${transform(key)}: ${_style[key]}px;`
                    } else {
                        if (key === 'backgroundImage') {
                            result += `${transform(key)}: url("${_style[key]}");`
                        } else if (key === 'backgroundImageCrop') {
                            continue
                        } else {
                            result += `${transform(key)}: ${_style[key]};`
                        }
                    }
                }
                // console.log(result)
                if (_style.backgroundImageCrop) {
                    const {left, top, originalWidth, originalHeight, width, height} = JSON.parse(_style.backgroundImageCrop)
                    const backgroundSizeWidth = (originalWidth / width) * 100
                    const backgroundSizeHeight = (originalHeight / height) * 100
                    const backgroundPositionX = left * backgroundSizeWidth / 100
                    const backgroundPositionY = top * backgroundSizeHeight / 100
                    result += `background-size: ${backgroundSizeWidth.toFixed(2)}% ${backgroundSizeHeight.toFixed(2)}%;background-position-x:-${backgroundPositionX.toFixed(2)}px;background-position-y:-${backgroundPositionY.toFixed(2)}px;`
                }
                console.log('end', result)
                /* if (_style.newPath) {
                    result += `background-image:url('${config.host}${_style.newPath}')`
                } */
                return result
            },
            rows() {
                const {height} = this.page.style
                const _rows = Math.ceil(height / this.gridColumn)
                let result = []
                for (let i = 0; i < _rows; i++) {
                    result.push(i * this.gridColumn)
                }
                return result
            },
            columns() {
                const {width} = this.page.style
                const _column = Math.ceil(width / this.gridColumn)
                let result = []
                for (let i = 0; i < _column; i++) {
                    result.push(i * this.gridColumn)
                }
                return result
            }
            /* layers() {
                 let {pages} = this.data
                 // console.log('1111', pages[this.activePage].layers)
                 return this.activePage > -1 ? pages[this.activePage].layers : []
             } */
        },
        methods: {
            operationFn(layer, i) {
                this[types.OPERATION_DOM]({layer, i, del: false, move: true})
                this[types.IS_DRAGGING](true)
            },
            setActive(layer, i) {
                !layer.lock && this[types.SET_ACTIVE_LAYER]({layer, i})
            },
            stopOperation() {
                /* this.$nextTick(() => {
                    this[types.IS_DRAGGING](false)
                }) */
                setTimeout(() => {
                    this[types.IS_DRAGGING](false)
                }, 100)
            },
            deleteLayer(layer, i) {
                this[types.OPERATION_DOM]({layer, i, del: true})
                this.$nextTick(() => {
                    this[types.SET_ACTIVE_LAYER]({layer: null, i: -1})
                })
                /* setTimeout(() => {
                     this[types.SET_ACTIVE_LAYER]({layer: null, i: -1})
                 }, 100) */
            },
            mouseEnd() {
                this[types.RECORD_STEP]()
            },
            ...mapMutations([
                types.OPERATION_DOM,
                types.SET_ACTIVE_LAYER,
                types.IS_DRAGGING,
                types.RECORD_STEP
            ])
        }
    }
</script>

<style scoped lang="scss">
    .maker-canvas {
        transition: all .2s;
        position: absolute;
        left: 50%;
        top: 60px;
        margin-bottom: 200px;
        background: #fff;
        transform: translate3d(-50%, 0, 0);
        transform-origin: top;

        .maker-canvas-wrap {
            position: relative;
            width: 1000px;
            height: 600px;

            .maker-page-views {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;

                .maker-canvas-view {
                    width: 100%;
                    height: 100%;

                    .maker-canvas-grid {
                        pointer-events: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;

                        .maker-canvas-grid-row {
                            position: absolute;
                            z-index: 10;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 100%;
                            opacity: .3;

                            & > li {
                                position: absolute;
                                height: 1px;
                                margin-top: -1px;
                                width: 100%;
                            }
                        }

                        .maker-canvas-grid-column {
                            position: absolute;
                            z-index: 10;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 100%;
                            opacity: .3;

                            & > li {
                                position: absolute;
                                width: 1px;
                                margin-left: -1px;
                                height: 100%;
                            }
                        }
                    }

                    .maker-swiper-layers {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
