<template>
    <div class="layout-wrap-right">
        <ToolWrap />
        <Operations />
    </div>
</template>

<script>
    import ToolWrap from '../toolWrap'
    import Operations from '../operations'
    export default {
        name: 'right',
        components: {
            ToolWrap,
            Operations
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/variable.scss';

    .layout-wrap-right {
        display: flex;
        width: 410px;
        z-index: 1000;
        background: $aside-bg;
    }
</style>
