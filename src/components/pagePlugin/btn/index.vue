<template>
    <div class="maker-layer-btn-content">
        <div class="maker-layer-btn-box" :style="mstyle">
            {{layer.data.text || ''}}
        </div>
    </div>
</template>

<script>
    import {transform} from '@/helper'

    const NEEDPX = ['fontSize', 'letterSpacing']
    export default {
        name: 'pageBtnPlugin',
        data() {
            return {
            }
        },
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
    .maker-layer-btn-content {
        width: 100%;
        height: 100%;
        .maker-layer-btn-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
</style>
