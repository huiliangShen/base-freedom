<template>
    <div class="maker-layer-text-content">
        <div class="maker-layer-text-box" :style="mstyle" v-html="text">
        </div>
    </div>
</template>

<script>
    import {transform} from '@/helper'

    const NEEDPX = ['fontSize', 'letterSpacing']
    export default {
        name: 'pageTextPlugin',
        data() {
            return {
                text: ''
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
        },
        watch: {
            layer: {
                handler(val) {
                    if (val) {
                        const {data} = val
                        this.text = data.text
                    }
                },
                immediate: true,
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
