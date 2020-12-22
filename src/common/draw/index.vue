<template>
    <transition name="show" appear>
        <div class="draw-wrap" v-show="show" @click.stop="close" :style="{'z-index': zIndex}">
            <transition name="fade">
                <div class="draw-content" :style="{'width': width + 'px', 'z-index': zIndex + 1}" v-show="show">
                    <slot name="header"></slot>
                    <slot></slot>
                    <slot name="footer"></slot>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'drawWrap',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 300
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            spinShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close() {
                this.maskClosable && this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="scss">
    .draw-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .2);
        overflow: hidden;

        .draw-content {
            transition: all .5s;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .ivu-spin-fix{
            z-index: 9999;
        }
    }

    .show-enter-active, .show-leave-active {
        transition: all 0.6s;
    }

    .show-enter, .show-leave-to {
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transform: translateX(0);
    }

    .fade-enter, .fade-leave-to {
        transform: translateX(100%);
    }
</style>
