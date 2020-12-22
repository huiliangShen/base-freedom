<template>
    <div class="control" ref="control" @mousedown="operationStart">
        <span class="maker-dom-rotate" data-direction="rotate">
           <Icon type="ios-refresh-circle-outline"/>
        </span>
        <span class="maker-dom-top-left" data-direction="left"></span>
        <span class="maker-dom-top-center" data-direction="center" v-if="type !== 'text'"></span>
        <span class="maker-dom-top-right" data-direction="right"></span>
        <span class="maker-dom-left-center" data-direction="leftCenter"></span>
        <span class="maker-dom-left-bottom" data-direction="leftBottom"></span>
        <span class="maker-dom-bottom-right" data-direction="bottomRight"></span>
        <span class="maker-dom-bottom-center" data-direction="bottomCenter" v-if="type !== 'text'"></span>
        <span class="maker-dom-right-center" data-direction="rightCenter"></span>
    </div>
</template>

<script>
    import {hasClassName, addListener, removeListener, areaJudge} from '@/helper'

    const OPERATION = {
        ROTATE: 'rotate',
        LEFT: 'left',
        CENTER: 'center',
        RIGHT: 'right',
        LEFT_CENTER: 'leftCenter',
        LEFT_BOTTOM: 'leftBottom',
        BOTTOM_RIGHT: 'bottomRight',
        BOTTOM_CENTER: 'bottomCenter',
        RIGHT_CENTER: 'rightCenter'
    }
    export default {
        name: 'control',
        data() {
            return {
                originDom: {}
            }
        },
        props: {
            myStyle: {
                type: Object
            },
            stopOperation: Function,
            type: String
        },
        methods: {
            // 重置元素信息
            _resetDom({clientX, clientY}) {
                /*this.control = this.control || this.$refs.control
                let parent = this.control.parentNode
                let {width, height} = parent.style
                const {x, y} = this.control.getBoundingClientRect()
                width = width.replace(/[^0-9-]/g, '') - 0
                height = height.replace(/[^0-9-]/g, '') - 0*/
                this.control = this.control || this.$refs.control
                const {x, y} = this.control.getBoundingClientRect()
                let {width, height, transform} = this.myStyle
                transform = transform ? transform.replace(/[^0-9]/g, '') - 0 : 0
                // 操作前 元素位置信息
                this.originDom = {
                    x, y, width, height, clientX, clientY, transform
                }
            },
            operationStart(e) {
                let {target} = e
                target = hasClassName(target, 'ivu-icon-ios-refresh-circle-outline') ? target.offsetParent : target
                if (target.dataset['direction']) {
                    this.operation = true
                    this.operationType = target.dataset['direction']
                    this._resetDom(e)
                }
            },
            operationEnd() {
                this.operation = false
                this.operationType = null
                this.stopOperation()
            },
            operationScale({clientX, clientY}) {
                // debugger
                let afterScale = {
                    /* originWidth: this.originDom.width,
                     originHeight: this.originDom.height,*/
                    width: this.originDom.width,
                    height: this.originDom.height,
                    /*originX: this.originDom.x,
                    originY: this.originDom.y,*/
                    x: 0,
                    y: 0
                }
                let delaY
                let delaX
                switch (this.operationType) {
                    case OPERATION.LEFT:
                        // top, left, w,h
                        // ←↑ x, y需要取负值
                        delaY = this.originDom.clientY - clientY
                        delaX = this.originDom.clientX - clientX
                        afterScale.height = this.originDom.height + delaY
                        afterScale.width = this.originDom.width + delaX
                        afterScale.x = -delaX
                        afterScale.y = -delaY
                        break
                    case OPERATION.LEFT_BOTTOM:
                        // left, w, h
                        delaY = clientY - this.originDom.clientY
                        delaX = this.originDom.clientX - clientX
                        afterScale.height = this.originDom.height + delaY
                        afterScale.width = this.originDom.width + delaX
                        afterScale.x = -delaX
                        break
                    case OPERATION.BOTTOM_RIGHT:
                        // w, h
                        delaY = clientY - this.originDom.clientY
                        delaX = clientX - this.originDom.clientX
                        afterScale.height = this.originDom.height + delaY
                        afterScale.width = this.originDom.width + delaX
                        break
                    case OPERATION.RIGHT:
                        // t, l, w, h
                        delaY = this.originDom.clientY - clientY
                        delaX = clientX - this.originDom.clientX
                        afterScale.height = this.originDom.height + delaY
                        afterScale.width = this.originDom.width + delaX
                        // afterScale.x = delaX
                        afterScale.y = -delaY
                        break
                    case OPERATION.CENTER:
                        delaY = this.originDom.clientY - clientY
                        afterScale.height = this.originDom.height + delaY
                        afterScale.y = (-delaY)
                        break
                    case OPERATION.LEFT_CENTER:
                        delaX = this.originDom.clientX - clientX
                        afterScale.width = this.originDom.width + delaX
                        afterScale.x = (-delaX)
                        break
                    case OPERATION.BOTTOM_CENTER:
                        delaY = clientY - this.originDom.clientY
                        afterScale.height = this.originDom.height + delaY
                        break
                    case OPERATION.RIGHT_CENTER:
                        delaX = clientX - this.originDom.clientX
                        afterScale.width = this.originDom.width + delaX
                        break
                    default:
                        break
                }
                // console.log('123', afterScale)
                this.$emit('changeScale', afterScale)


                this._resetDom({clientX, clientY})
                /* let parent = this.control.parentNode
                 let {width, height} = parent.style
                 const {x, y} = this.control.getBoundingClientRect()
                 width = width.replace(/[^0-9-]/g, '') - 0
                 height = height.replace(/[^0-9-]/g, '') - 0
                 // 操作前 元素位置信息
                 this.originDom = {
                     x, y, width, height, clientX, clientY
                 }*/

            },
            operationMove(e) {
                // console.log('running')
                if (this.operation) {
                    if (this.operationType && this.operationType === OPERATION.ROTATE) {
                        this.operationRotate({x: e.clientX, y: e.clientY})
                    } else {
                        this.operationScale({clientX: e.clientX, clientY: e.clientY})
                    }
                }
            },
            operationRotate({x, y}) {
                // console.log(x, y)
                const centerX = this.originDom.x + this.originDom.width / 2
                const centerY = this.originDom.y + this.originDom.height / 2

                // 象限判断
                const area = areaJudge(centerX, centerY, x, y)
                let delaX = Math.abs(x - centerX)
                let delaY = Math.abs(y - centerY)
                let deg = 0
                // 弧度转角度 arc -> deg
                switch (area) {
                    case 1:
                        deg = Math.atan(delaX / delaY) * 180 / Math.PI
                        break
                    case 2:
                        deg = 90 + Math.atan(delaY / delaX) * 180 / Math.PI
                        break
                    case 3:
                        deg = 180 + Math.atan(delaX / delaY) * 180 / Math.PI
                        break
                    case 4:
                        deg = 270 + Math.atan(delaY / delaX) * 180 / Math.PI
                        break
                }
                // deg = deg - this.originDom.transform
                // console.log(deg, this.originDom.transform)
                this.$emit('changeRotate', deg)
            }
        },
        beforeDestroy() {
            removeListener(document.body, 'mousemove', this.operationMove)
            removeListener(document.body, 'mouseup', this.operationEnd)
        },
        mounted() {
            this.operationType = null
            // 全局控制 旋转 脱离选定元素后 应也能旋转
            addListener(document.body, 'mousemove', this.operationMove)
            addListener(document.body, 'mouseup', this.operationEnd)
        }
    }
</script>

<style scoped lang="scss">
    .control {
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 100%;
        cursor: move;
        margin: -1px;
        top: 0;
        left: 0;

        &:before {
            display: inline;
            box-sizing: content-box;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 1px dashed #000;
        }

        span {
            display: inline-block;
            position: absolute;
            z-index: 100;
            background: #fff;
            width: 6px;
            height: 6px;
            border: 1px solid #000;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
        }

        .maker-dom-rotate {
            width: 22px;
            height: 22px;
            font-size: 18px;
            margin: 0 auto;
            border-radius: 50%;
            top: -30px;
            left: 2px;
            right: 0;
            color: rgba(0, 0, 0, 0);
            background: rgba(0, 0, 0, 0);
            border-color: rgba(0, 0, 0, 0);
            cursor: grabbing;

            .ivu-icon {
                color: #000;
            }
        }

        .maker-dom-top-left {
            left: -5px;
            top: -5px;
            cursor: nw-resize;
        }

        .maker-dom-top-center {
            left: 0;
            right: 0;
            margin: auto;
            top: -5px;
            cursor: n-resize;
        }

        .maker-dom-top-right {
            right: -5px;
            top: -5px;
            cursor: ne-resize;
        }

        .maker-dom-left-center {
            left: -5px;
            top: 0;
            bottom: 0;
            margin: auto;
            cursor: w-resize;
        }

        .maker-dom-left-bottom {
            left: -5px;
            bottom: -5px;
            cursor: sw-resize;
        }

        .maker-dom-bottom-center {
            left: 0;
            right: 0;
            margin: auto;
            bottom: -5px;
            cursor: s-resize;
        }

        .maker-dom-bottom-right {
            right: -5px;
            bottom: -5px;
            cursor: se-resize;
        }

        .maker-dom-right-center {
            right: -5px;
            top: 0;
            bottom: 0;
            margin: auto;
            cursor: e-resize;
        }
    }
</style>
