<template>
    <div class="layout-wrap">
        <Header/>
        <main>
           <!-- <CAside/>-->
            <router-view></router-view>
            <Right></Right>
        </main>
    </div>
</template>

<script>
    import Header from '@/components/header'
    import CAside from '@/components/aside'
    import Right from '@/components/right'
    export default {
        name: 'layout',
        components: {
            Header,
            CAside,
            Right
        }
    }
</script>

<style scoped lang="scss">
    .layout-wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        main {
            display: flex;
            height: 100%;
        }
    }
</style>
