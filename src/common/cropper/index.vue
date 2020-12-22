<template>
    <div class="cropper-wrap" ref="wrap">
        <img ref="img" draggable="false"
             :src="img" alt="" @load="imgLoad">
        <!--<div class="cropper-modal">-->
        <div class="cropper-crop-box" :style="transStyle" @mousedown.stop="mouseDown" v-if="!spinShow">
            <!-- <div class="cropper-view-box">
                 <img src="http://10.10.20.111:8106/uploads/20200326/c43811e151d5ec3a06b294d954403e20.png" alt="">
             </div>-->
            <div class="copper-move"></div>
            <!--<div class="copper-hoz-line copper-hoz-line-1"></div>
            <div class="copper-hoz-line copper-hoz-line-2"></div>
            <div class="copper-hoz-line copper-voz-line-1"></div>
            <div class="copper-hoz-line copper-voz-line-2"></div>-->
            <!-- <div class="crop-info" style="top: -21px">100 x 100</div>-->
            <div>
                <!-- <span class="crop-line line-w"></span>
                 <span class="crop-line line-a"></span>
                 <span class="crop-line line-s"></span>
                 <span class="crop-line line-d"></span>-->
                <span class="crop-point point1" data-dir="lt"></span>
                <span class="crop-point point2" data-dir="rt"></span>
                <span class="crop-point point3" data-dir="lb"></span>
                <span class="crop-point point4" data-dir="rb"></span>
            </div>
        </div>
        <!--</div>-->
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import {addListener, removeListener, toFixed} from '@/helper'

    export default {
        name: 'copper',
        data() {
            return {
                imgStyle: {},
                wrap: {},
                translate: {
                    width: 100,
                    height: 100,
                    x: 0,
                    y: 0
                },
                range: {
                    minX: 0,
                    minY: 0,
                    maxX: 0,
                    maxY: 0,
                    wrapX0: 0,
                    wrapY0: 0,
                    wrapX1: 0,
                    wrapY1: 0,
                    imageX0: 0,
                    imageY0: 0,
                    imageX1: 0,
                    imageY1: 0
                },
                betweenImg: true,
                spinShow: false,
                img: null,
                crop: ''
            }
        },
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        watch: {
            layer: {
                handler(val) {
                    // console.log(val)
                    if (val) {
                        // this.imgLoad()
                        this.img = val.data.src
                        /* let crop = val.data.crop
                         this.crop = crop && JSON.parse(crop) || ''*/
                    }
                },
                immediate: true
            }
        },
        computed: {
            style() {
                // 设置图片宽高
                let result = ''
                for (const key in this.imgStyle) {
                    if (['width', 'height'].includes(key)) {
                        const val = Math.ceil(this.imgStyle[key])
                        result += `${key}: ${val}px;`
                    }
                }
                return result
            },
            transStyle() {
                // 移动框的渲染
                const {width, height, x, y} = this.translate
                return `width: ${width}px;height: ${height}px;transform: translate3d(${x}px,${y}px,0)`
            }
        },
        methods: {
            _resetRange() {
                const {x, y, width, height} = this.imgStyle

                // 外层坐标 相对于屏幕内
                this.range.wrapX0 = this.wrap.x
                this.range.wrapY0 = this.wrap.y
                this.range.wrapX1 = this.wrap.x + this.wrap.width
                this.range.wrapY1 = this.wrap.y + this.wrap.height

                let delaX = x - this.wrap.x
                let delaY = y - this.wrap.y

                // 内层图片坐标 相对于外层容器
                this.range.imageX0 = delaX
                this.range.imageY0 = delaY
                this.range.imageX1 = this.imageX0 + width
                this.range.imageY1 = this.imageY0 + height


                // 裁剪框最小顶点位置
                this.range.minX = Math.ceil(delaX)
                this.range.minY = Math.ceil(delaY)

                // 裁剪框的最大可移动范围 需减去裁剪框的大小
                this.range.maxX = Math.ceil(delaX + width - this.translate.width)
                this.range.maxY = Math.ceil(delaY + height - this.translate.height)

                //
                this.range.maxWidth = Math.ceil(width - this.translate.x + delaX)
                this.range.maxHeight = Math.ceil(height - this.translate.y + delaY)
            },
            _initTranslate() {
                const {left, top, originalWidth, originalHeight, width, height} = this.crop
                const {minX, minY} = this.range

                const imgWidth = this.imgStyle.width
                const imgHeight = this.imgStyle.height

                const scaleX = left / originalWidth
                const scaleY = top / originalHeight
                const scaleWidth = width / originalWidth
                const scaleHeight = height / originalHeight

                return {
                    x: scaleX * imgWidth + minX,
                    y: scaleY * imgHeight + minY,
                    width: scaleWidth * imgWidth,
                    height: scaleHeight * imgHeight
                }
            },
            imgLoad(e) {
                this.spinShow = true
                setTimeout(() => {
                    console.log('img', e)
                    // 获取图片的位置信息
                    const img = this.$refs.img
                    this.imgStyle = img.getBoundingClientRect()

                    console.dir(img)
                    this.imgStyle.naturalHeight = img.naturalHeight
                    this.imgStyle.naturalWidth = img.naturalWidth
                    this.translate.width = this.imgStyle.width
                    this.translate.height = this.imgStyle.height
                    // 获取外层父容器的位置信息
                    this.wrapStyle()

                    // 计算差值 获取初始偏移量和最大可偏移量
                    this._resetRange()

                    // 位置初始化
                    /* if (this.crop) {
                         const obj = this._initTranslate()
                         this.changeTranslate(obj)
                     } else { */
                    this.changeTranslate({x: this.range.minX, y: this.range.minY})
                    // }

                    this.spinShow = false
                }, 1000)
            },
            wrapStyle() {
                this.wrap = this.$refs.wrap.getBoundingClientRect()
            },
            changeTranslate({x = Number.MIN_VALUE, y = Number.MIN_VALUE, width = Number.MIN_VALUE, height = Number.MIN_VALUE}) {
                this.translate.x = x === Number.MIN_VALUE ? this.translate.x : x
                this.translate.y = y === Number.MIN_VALUE ? this.translate.y : y
                this.translate.width = width === Number.MIN_VALUE ? this.translate.width : width
                this.translate.height = height === Number.MIN_VALUE ? this.translate.height : height
            },
            mouseDown(e) {
                const {clientX, clientY, target} = e
                console.log('clientX, clientY', clientX, clientY)
                this.startMove = {
                    x: clientX,
                    y: clientY
                }
                this.operationType = ''
                this.operation = true
                // console.dir(target)
                if (target.className === 'copper-move') {
                    this.operationType = 'move'
                } else if (target.className.indexOf('crop-point') > -1) {
                    this.operationType = target.dataset.dir
                } else {
                    this.mouseUp()
                }
            },
            mouseMove({clientX, clientY, target}) {
                if (!this.operation) return
                if (this.operationType === 'move') {
                    this.handleMove({clientX, clientY})
                } else {
                    this.handleScale({clientX, clientY, target})
                }
            },
            mouseUp() {
                this.operationType = ''
                this.operation = false
            },
            handleMove({clientX, clientY}) {
                const {minX, minY, maxX, maxY, wrapX0, wrapY0, wrapX1, wrapY1} = this.range
                const deltaX = clientX - this.startMove.x
                const deltaY = clientY - this.startMove.y

                const left = this.translate.x
                const top = this.translate.y

                let x = Math.ceil(left + deltaX)
                let y = Math.ceil(top + deltaY)
                // 鼠标位置 超出返回则不改变x，y
                if (clientX - wrapX0 <= minX || x < minX) {
                    x = minX
                } else if (x > maxX || clientX - wrapX0 >= minX + this.imgStyle.width) {
                    x = maxX
                }

                if (clientY - wrapY0 <= minY || y < minY) {
                    y = minY
                } else if (y > maxY || clientY - wrapY0 >= minY + this.imgStyle.height) {
                    y = maxY
                }

                this.translate.x = x
                this.translate.y = y

                this.startMove.x = clientX
                this.startMove.y = clientY
            },
            handleScale({clientX, clientY, target}) {
                const {width, height, x, y} = this.translate

                const {minX, minY, maxX, maxY, maxWidth, maxHeight, imageX0, imageY0, imageX1, imageY1, wrapX0, wrapY0} = this.range

                if (clientX - wrapX0 >= minX + this.imgStyle.width || clientX - wrapX0 <= minX || clientY - wrapY0 <= minY || clientY - wrapY0 >= minY + this.imgStyle.height) {
                    return
                }
                /* const spanRect = target.getClientRects()

                 console.log(spanRect[0])
                 const outObj = this.isOutBorderline(clientX, clientY, spanRect && spanRect.length && spanRect[0]) */

                let deltaX = clientX - this.startMove.x
                let deltaY = clientY - this.startMove.y

                let cwidth = Number.MIN_VALUE, cheight = Number.MIN_VALUE, cleft = Number.MIN_VALUE,
                    ctop = Number.MIN_VALUE
                // console.dir(target)
                switch (this.operationType) {
                    case 'lt':
                        cleft = x + deltaX
                        ctop = y + deltaY

                        if (cleft <= imageX0) {
                            cleft = imageX0
                        } else {
                            if (width - deltaX <= 24) {
                                cwidth = 24
                                cleft = x
                            } else {
                                cwidth = width - deltaX
                            }
                        }
                        // 移动后的top 超过最小可移动Y值
                        if (ctop <= imageY0) {
                            ctop = imageY0
                        }
                        cheight = height - deltaY
                        break
                    case 'rt':
                        cwidth = width + deltaX
                        cheight = height + (-deltaY)

                        ctop = y + deltaY
                        /* if (!outObj.outY) {

                         } else {
                             cheight = height
                             ctop = minY
                         } */

                        /* if (cwidth < 12) {
                             cwidth = 12
                         } else if (cwidth > maxWidth) {
                             cwidth = maxWidth
                         }

                         if (cheight < 12) {
                             cheight = 12
                             ctop = y
                         }

                         if (ctop < minY) {
                             ctop = minY
                             cheight = height
                         } */
                        /* if (outObj.outY) {
                            cheight = height
                        } */
                        // console.log(deltaY, cheight, height, ctop)
                        // console.log(outObj)
                        break
                    case 'lb':
                        cwidth = width - deltaX
                        cheight = height + deltaY

                        cleft = x + deltaX
                        break
                    case 'rb':
                        cwidth = width + deltaX
                        cheight = height + deltaY

                        /* if (cwidth < 12) {
                             cwidth = 12
                         } else if (cwidth > maxWidth) {
                             cwidth = maxWidth
                         }

                         if (cheight < 12) {
                             cheight = 12
                         } else if (cheight > maxHeight) {
                             cheight = maxHeight
                         } */
                        break
                    default:
                        break
                }
                console.log('-------', cwidth, width)
                if (cwidth < 12 && cwidth > Number.MIN_VALUE) {
                    cwidth = 12
                } else if (cwidth > maxWidth) {
                    cwidth = maxWidth
                }

                if (cheight < 12 && cheight > Number.MIN_VALUE) {
                    cheight = 12
                } else if (cheight > maxHeight) {
                    cheight = maxHeight
                }

                /* if (cleft < 0) {
                     cleft = 0
                     cwidth = width
                 }
                console.log('1111', cwidth, width)*/
                this.changeTranslate({height: cheight, width: cwidth, x: cleft, y: ctop})
                this._resetRange()
                this.startMove.x = clientX
                this.startMove.y = clientY
                // this.resetTranslate(afterScale)
            },
            resetTranslate({width, height, left, right}) {
                width = width < 0 ? 0 : width
                height = height < 0 ? 0 : height
            },
            isOutBorderline(clientX, clientY, spanRect = null) {
                let result = {
                    outX: false,
                    outY: false
                }
                const {x, y, width, height} = this.imgStyle
                const maxClientX = x + width
                const maxClientY = y + height

                if (spanRect) {
                    clientX = spanRect.x + spanRect.width
                    clientY = spanRect.y
                }

                if (clientX) {
                    if (clientX >= x && clientX <= maxClientX) {
                        result.outX = false
                    } else {
                        result.outX = true
                    }
                }

                if (clientY) {
                    if (clientY >= y && clientY <= maxClientY) {
                        result.outY = false
                    } else {
                        result.outY = true
                    }
                }
                return result
            },
            getRect(cb) {
                // translate 拖拽框的大小 与 定位位置
                let {width, height, x, y} = this.translate
                const imgWidth = this.imgStyle.width
                const imgHeight = this.imgStyle.height
                // 实际的x坐标与y坐标
                x = x - this.range.minX
                y = y - this.range.minY
                // 实际的 x坐标百分比 y坐标百分比
                const scaleXPercent = x / imgWidth
                const scaleYPercent = y / imgHeight
                // 拖拽框 百分比
                const scaleWidthPercent = width / imgWidth
                const scaleHeightPercent = height / imgHeight
                cb && cb({scaleXPercent, scaleYPercent, scaleWidthPercent, scaleHeightPercent, imgWidth: this.imgStyle.naturalWidth, imgHeight: this.imgStyle.naturalHeight})
            }
        },
        beforeDestroy() {
            removeListener(document.documentElement, 'mousemove', this.mouseMove)
            removeListener(document.documentElement, 'mouseup', this.mouseUp)
        },
        mounted() {
            addListener(document.documentElement, 'mousemove', this.mouseMove)
            addListener(document.documentElement, 'mouseup', this.mouseUp)
            // this.imgLoad()
        }
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/css/variable";

    .cropper-wrap {
        position: relative;
        width: 100%;
        height: 333px;
        background: url('../../assets/imgs/nobg.png') repeat;
        overflow: hidden;

        & > img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            max-height: 100%;
            max-width: 100%;
            user-select: none;
        }

        .cropper-modal {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .5);
            // box-shadow: 0 0 10000px 300px rgba(0, 0, 0, .5)
        }

        .cropper-crop-box {
            // transition: all .2s;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            box-shadow: 0 0 10000px 10000px rgba(0, 0, 0, .75);

            .cropper-view-box {
                display: block;
                overflow: hidden;
                width: 100%;
                height: 100%;
                /*  outline: 1px solid rgb(51, 153, 255);
                  outline-color: rgba(51, 153, 255, .75);*/
                user-select: none;

                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    max-height: 100%;
                    max-width: 100%;
                }
            }

            .copper-move {
                position: absolute;
                right: 0;
                bottom: 0;
                top: 0;
                left: 0;
                background-color: rgba(255, 255, 255, 0);
                cursor: move;
            }

            .crop-info {
                position: absolute;
                left: 0;
                min-width: 65px;
                text-align: center;
                color: rgb(255, 255, 255);
                line-height: 20px;
                background-color: rgba(0, 0, 0, .8);
                font-size: 12px;
            }

            .crop-line {
                position: absolute;
                display: block;
                width: 100%;
                height: 100%;

                &.line-w {
                    top: -3px;
                    left: 0;
                    height: 5px;
                    cursor: n-resize;
                }

                &.line-a {
                    top: 0;
                    left: -3px;
                    width: 5px;
                    cursor: w-resize;
                }

                &.line-s {
                    bottom: -3px;
                    left: 0;
                    height: 5px;
                    cursor: s-resize;
                }

                &.line-d {
                    top: 0;
                    right: -3px;
                    width: 5px;
                    cursor: e-resize;
                }
            }

            .crop-point {
                position: absolute;
                display: block;
                background: $theme-bg;
                width: 12px;
                height: 12px;

                &.point1 {
                    left: 0;
                    top: 0;
                    cursor: nw-resize;
                }

                &.point2 {
                    top: 0;
                    right: 0;
                    cursor: ne-resize;
                }

                &.point3 {
                    left: 0;
                    bottom: 0;
                    cursor: sw-resize;
                }

                &.point4 {
                    right: 0;
                    bottom: 0;
                    cursor: se-resize;
                }
            }
        }
    }
</style>
