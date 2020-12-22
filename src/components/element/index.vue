<template>
    <div class="dom-wrap"
         :style="customStyle"
         @mousedown.stop="mouseDown">
        <div class="dom" :style="domStyle">
            <slot></slot>
        </div>
        <Control v-if="active && !asideDom" :layerItem="layerItem" :myStyle="myStyle" :type="type"
                 @changeRotate="changeRotate" @changeScale="changeScale"
                 :stopOperation="stopOperation"/>
        <div class="dragging-box" v-if="dragging"></div>
    </div>
</template>

<script>
    import Control from './control'
    import {hasClassName, addListener, removeListener, transform} from '@/helper'

    const NEEDPX = ['borderWidth', 'borderRadius', 'left', 'top', 'width', 'height']
    // const KEYARROW = [37, 38, 39, 40]

    export default {
        name: 'myElement',
        components: {
            Control
        },
        inject: ['asideDom'],
        data() {
            return {
                // originData: this.layerItem
            }
        },
        props: {
            active: {
                type: Boolean,
                default: false
            },
            layerItem: {
                type: Object,
                default: () => {
                }
            },
            index: Number,
            stopOperation: Function,
            showGrid: Boolean,
            adsorb: Boolean,
            gridColumn: Number,
            width: Number,
            height: Number,
            dragging: Boolean
        },
        computed: {
            type() {
                return this.layerItem.type || 'img'
            },
            myStyle() {
                let {style} = this.layerItem
                style = style || {
                    width: 100,
                    height: 100,
                    left: 0,
                    right: 0,
                    transform: ''
                }
                return style
            },
            customStyle() {
                let {style} = this.layerItem
                if (!style) {
                    return
                }

                /*   style = style || {
                       width: 100,
                       height: 100,
                       left: 0,
                       right: 0,
                       transform: ''
                   }
                   return `width: ${style.width}px;height: ${style.height}px;left: ${style.left || 0}px;top:${style.top || 0}px;transform: ${style.transform || ''}` */
                let result = ''
                for (const key in style) {
                    // console.log(transform(key))
                    if (!style[key]) {
                        continue
                    }
                    if (NEEDPX.includes(key)) {
                        result += `${transform(key)}: ${style[key]}px;`
                    } else {
                        result += `${transform(key)}: ${style[key]};`
                    }
                }
                // console.log('s', result)
                return result
            },
            domStyle() {
                let {estyle} = this.layerItem
                if (!estyle) {
                    return
                }
                // console.log('2', estyle)
                let result = ''
                for (const key in estyle) {
                    // console.log(transform(key))
                    if (NEEDPX.includes(key)) {
                        result += `${transform(key)}: ${estyle[key]}px;`
                    } else {
                        result += `${transform(key)}: ${estyle[key]};`
                    }
                }
                return result
            }
        },
        methods: {
            mouseDown(e) {
                // 不是点击后的 不启用
                if (!this.active) {
                    return
                }
                let target = e.target.className.split(' ').includes('dom-wrap') ? e.target : e.target.offsetParent
                if (target && target.className.split(' ').includes('dom-wrap')) {
                    this.down = true
                    // console.log(e)
                    this.dom = {
                        x: e.clientX,
                        y: e.clientY
                    }
                }
            },
            mouseMove(e) {
                // console.log(this.down)
                // let target = hasClassName(e.target, 'dom-wrap') ? e.target : e.target.offsetParent  && hasClassName(target, 'dom-wrap')
                // lock 静止操作
                if (this.down) {
                    // console.log(e.target.classList)

                    const deltaX = e.clientX - this.dom.x
                    const deltaY = e.clientY - this.dom.y

                    /*let left = target.style.left
                    let top = target.style.top*/
                    /* left = left.replace(/[^0-9-]/g, '') - 0
                     top = top.replace(/[^0-9-]/g, '') - 0*/

                    const {left, top} = this.layerItem.style

                    let x = (left + deltaX)
                    let y = (top + deltaY)

                    this.operationDom({x, y})
                    /*console.log(deltaX, deltaY)
                    console.log(left, top)*/
                    this.dom.x = e.clientX
                    this.dom.y = e.clientY
                }
            },
            mouseUp(e) {
                // console.log(e)
                // 需要网格矫正时
                if (this.down && this.adsorb) {
                    const deltaX = e.clientX - this.dom.x
                    const deltaY = e.clientY - this.dom.y

                    const {left, top} = this.layerItem.style

                    let x = (left + deltaX)
                    let y = (top + deltaY)
                    // 取余数
                    const remainderX = x % this.gridColumn
                    const remainderY = y % this.gridColumn

                    // 大于单个网格一半宽度时
                    if (remainderX >= (this.gridColumn / 2)) {
                        x = Math.ceil(x - remainderX + this.gridColumn)
                    } else {
                        x = x - remainderX
                    }

                    if (remainderY >= (this.gridColumn / 2)) {
                        y = Math.ceil(y - remainderY + this.gridColumn)
                    } else {
                        y = y - remainderY
                    }

                    this.operationDom({x, y})
                }
                this.down && this.canStop()
                this.down = false
                this.dom = {}
            },
            changeRotate(deg) {
                // let dom = document.getElementsByClassName('dom-wrap')[0]
                // let {width, height} = dom.getBoundingClientRect()
                deg = deg ? Math.floor(deg) : 0
                // console.log('1', deg)
                // this.layerItem.style.transform = 'rotate(' + deg + 'deg)'
                this.operationDom({transform: 'rotate(' + deg + 'deg)'})
            },
            changeScale({width, height, x, y}) {
                // console.log('changeScale', width, height, x, y)
                /*let dom = document.getElementsByClassName('dom-wrap')[0]

                let left = dom.style.left
                let top = dom.style.top*/
                // let rotate = dom.style.transform ? dom.style.transform.replace(/[^0-9]/g, '') : 0

                /*left = left.replace(/[^0-9-]/g, '') - 0
                top = top.replace(/[^0-9-]/g, '') - 0*/
                // console.log('这是原本的位置', left, top)

                /* dom.style.width = (width >= 0 ? width : 0) + 'px'
                 dom.style.height = (height >= 0 ? height : 0) + 'px'
                 dom.style.left = (width <= 0 ? left : left + x) + 'px'
                 dom.style.top = (height <= 0 ? top : top + y) + 'px'*/

                width = (width >= 0 ? width : 0)
                height = (height >= 0 ? height : 0)
                x = (width <= 0 ? this.layerItem.style.left : this.layerItem.style.left + x)
                y = (height <= 0 ? this.layerItem.style.top : this.layerItem.style.top + y)

                this.operationDom({width, height, x, y})
                // console.log('这是操作的位置', left + x, top + y)
            },
            operationDom({x, y, width, height, transform}) {
                /* this.layerItem.style.left = typeof x === 'number' ? x : this.layerItem.style.left
                 this.layerItem.style.top = typeof y === 'number' ? y : this.layerItem.style.top
                 this.layerItem.style.width = typeof width === 'number' ? width : this.layerItem.style.width
                 this.layerItem.style.height = typeof height === 'number' ? height : this.layerItem.style.height
                 this.layerItem.style.transform = !!transform ? transform : ''*/

                this.layerItem.style.left = typeof x === 'number' ? x : this.layerItem.style.left
                this.layerItem.style.top = typeof y === 'number' ? y : this.layerItem.style.top
                this.layerItem.style.width = typeof width === 'number' ? width : this.layerItem.style.width
                this.layerItem.style.height = typeof height === 'number' ? height : this.layerItem.style.height
                this.layerItem.style.transform = !!transform ? transform : this.layerItem.style.transform
                this.$emit('operationFn', this.layerItem, this.index)
            },
            deleteItem(e) {
                if (!this.active) return

                let {left, top} = this.layerItem.style
                switch (e.keyCode) {
                    // case 8:
                    case 46:
                        this.$emit('deleteLayer', this.layerItem, this.index)
                        break
                    case 37:
                        this.operationDom({x: left - 1})
                        break
                    case 38:
                        e.preventDefault()
                        this.operationDom({y: top - 1})
                        break
                    case 39:
                        this.operationDom({x: left + 1})
                        break
                    case 40:
                        e.preventDefault()
                        this.operationDom({y: top + 1})
                        break
                    default:
                        break
                }
            },
            canStop() {
                this.$emit('mouseEnd')
            }
        },
        beforeDestroy() {
            removeListener(document.documentElement, 'mousemove', this.mouseMove)
            removeListener(document.documentElement, 'mouseup', this.mouseUp)
            removeListener(window, 'keydown', this.deleteItem)
        },
        mounted() {
            // 全局控制 侧边引入 会造成二次 注册
            !this.asideDom && addListener(document.documentElement, 'mousemove', this.mouseMove)
            !this.asideDom && addListener(document.documentElement, 'mouseup', this.mouseUp)
            !this.asideDom && addListener(window, 'keydown', this.deleteItem)
            console.log('dddd', this.asideDom)
        }
    }
</script>

<style scoped lang="scss">
    .dom-wrap {
        position: absolute;
        z-index: 101;
        user-select: none;

        .dom {
            position: relative;
            width: 100%;
            height: 100%;
            transform-origin: 50% 50%;
            overflow: hidden;
        }

        .dom > img {
            width: 100%;
            height: 100%;
        }

        .dom > video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .dragging-box {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border: 1px dashed rgba(239, 77, 0, 0.8);
        }
    }
</style>
