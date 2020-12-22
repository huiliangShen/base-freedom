<template>
    <div class="maker-main" @click.stop.prevent="cancelLayer" v-if="!!data">
        <div class="maker-main-content">
            <HomePage :page="page"/>
            <!--标线-->
            <Rules/>
        </div>
        <img-dialog></img-dialog>
        <cropper-img-dialog></cropper-img-dialog>
        <cropper-bg-dialog></cropper-bg-dialog>
    </div>
</template>

<script>
    import HomePage from '@/components/page'
    import Rules from '@/components/rules'
    import ImgDialog from '@/components/dialog/img'
    import CropperImgDialog from '@/components/dialog/cropperImg'
    import CropperBgDialog from '@/components/dialog/cropperBg'
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'editor',
        components: {
            Rules,
            HomePage,
            ImgDialog,
            CropperImgDialog,
            CropperBgDialog
        },
        provide: {
            asideDom: false
        },
        computed: {
            ...mapGetters([
                'data',
                'activePage',
                'activeLayer',
                'dragging'
            ]),
            page() {
                let {pages} = this.data
                // console.log('1111', pages[this.activePage].layers)
                return this.activePage > -1 ? pages[this.activePage] : []
            }
        },
        methods: {
            cancelLayer() {
                if (this.dragging) return
                this[types.SET_ACTIVE_LAYER]({layer: null, i: -1})
            },
            ...mapMutations([
                types.SET_ACTIVE_LAYER
            ]),
            ...mapActions([
                'init'
            ])
        },
        mounted() {
            const id = this.$route.query.id || 0
            const uid = this.$route.query.uid || 0
            const gid = this.$route.query.gid || 0

            if (!uid) {
                this.$Message.warning('缺少必要参数，三秒后将关闭本页')
                setTimeout(() => {
                    window.history.back(-1)
                }, 3000)
                return false
            }
            this.init({id, uid, gid})
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";

    .maker-main {
        transition: all .2s;
        flex: 1;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        background: $main-bg;

        .maker-main-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
