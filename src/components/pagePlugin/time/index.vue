<template>
    <div class="maker-layer-time-content">
        <div :style="mstyle" class="maker-layer-time-box">{{time}}</div>
    </div>
</template>

<script>
    import {formatDate, transform} from '@/helper'

    const NEEDPX = ['fontSize']
    export default {
        name: 'pageTimePlugin',
        data() {
            return {
                time: ''
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
                handler() {
                    this.initVal()
                },
                immediate: true,
                deep: true
            }
        },
        computed: {
            mstyle() {
                let {style} = this.layer.data
                if (!style) {
                    return
                }
                // console.log('2', estyle)
                let result = ''
                for (const key in style) {
                    // console.log(transform(key))
                    if (NEEDPX.includes(key)) {
                        result += `${transform(key)}: ${style[key]}px;`
                    } else {
                        result += `${transform(key)}: ${style[key]};`
                    }
                }
                return result
            }
        },
        methods: {
            initVal() {
                const {data} = this.layer
                this.initTiming(data)
            },
            initTiming(data) {
                if (this.timer) {
                    clearInterval(this.timer)
                }
                this.timer = setInterval(() => {
                    const date = new Date()
                    this.time = formatDate(date, data.type)
                }, 500)
            }
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-time-content {
        width: 100%;
        height: 100%;
        .maker-layer-time-box {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
