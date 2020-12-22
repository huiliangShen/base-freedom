<template>
    <div class="collapse-panel">
        <div class="collapse-header" @click="show = !show">
            <h2>
                <slot name="header"></slot>
                <Icon type="md-arrow-dropdown" size="24"
                      :style="{'transform': show ? 'rotate(0deg)':'rotate(180deg)'}"/>
            </h2>
        </div>
        <transition name="fade">
            <div class="collapse-body" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'collapsePanel',
        data() {
            return {
                show: false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/css/variable.scss';

    .collapse-panel {
        padding-top: 10px;
        transition: all .2s;

        .collapse-header {
            transition: all .2s;
            width: 100%;
            padding: 16px 0 14px;
            background: $main-bg;
            font-size: $n-font-size;
            font-weight: 500;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }

        .collapse-body {
            padding: 20px 0;
        }
    }
</style>
