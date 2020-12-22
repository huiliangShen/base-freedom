<template>
    <div class="layout-wrap-right">
        <Operations />
    </div>
</template>

<script>
    import Operations from '../operations'
    export default {
        name: 'right',
        components: {
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
        background: $theme-bg;
    }
</style>
