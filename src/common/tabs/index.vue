<template>
    <div class="my-tabs">
        <ul class="my-tabs-header">
            <li class="my-tabs-title">第一项</li>
            <li class="my-tabs-title">第一项</li>
        </ul>
        <div class="my-tabs-panels"></div>
        <div class="my-tabs-panels"></div>
    </div>
</template>

<script>
    export default {
        name: 'myTabs',
        props: {
            list: Array,
            default: [
                {
                    title: '12323',

                }
            ]
        }
    }
</script>

<style scoped>

</style>
