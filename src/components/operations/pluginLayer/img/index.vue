<template>
    <div class="operation-img-layer">
        <div class="operation-img-wrap">
            <img :src="activeData.src" alt="">
        </div>
        <div class="operation-btn-wrap">
            <Button type="primary" class="padding-btn" @click="showCopperImage">裁切图片</Button>
            <Button type="primary" @click="changeImage" class="padding-btn">替换图片</Button>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'pluginImgLayer',
        props: {
            activeData: {
                type: Object
            }
        },
        methods: {
            changeImage() {
                this[types.SHOW_IMG_DIALOG]({flag: true})
                this[types.SET_CHANGE_IMG](true)
            },
            showCopperImage() {
                this[types.SET_CROPPER_IMG](true)
            },
            ...mapMutations([
                types.OPERATION_DOM,
                types.SHOW_IMG_DIALOG,
                types.SET_CHANGE_IMG,
                types.SET_CROPPER_IMG
            ])
        }
    }
</script>

<style scoped lang="scss">
    .operation-img-layer {
        width: 100%;
        .operation-img-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 300px;
            background: #fff;
            overflow: hidden;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .operation-btn-wrap {
            display: flex;
            justify-content: space-between;
            margin: 16px 0;
        }
    }
</style>
