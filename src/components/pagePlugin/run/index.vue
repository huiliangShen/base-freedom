<template>
    <div class="maker-layer-run-content">
        <marquee class="maker-layer-run-box" :scrollamount="layer.data.speed" :direction="layer.data.direction" :style="mstyle" v-html="layer.data.text"></marquee>
    </div>
</template>

<script>
    import {transform} from '@/helper'

    const NEEDPX = ['fontSize', 'letterSpacing']
    export default {
        name: 'pageRunPlugin',
        props: {
            layer: {
                type: Object,
                default: {}
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
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-run-content {
        width: 100%;
        height: 100%;
        .maker-layer-run-box {
            width: 100%;
            height: 100%;
        }
    }
</style>
