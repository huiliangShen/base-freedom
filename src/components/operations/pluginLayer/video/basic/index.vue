<template>
    <div>
        <FormItem label="区域背景">
            <div class="bg-wrap">
                <div class="no-img" @click="showImage" v-if="!activeData.backgroundImage">
                    <img :src="img" alt="">
                    <span>选择背景</span>
                </div>
                <template v-else>
                    <div class="has-img">
                        <img :src="activeData.backgroundImage" alt="">
                    </div>
                </template>
            </div>
            <div class="has-footer">
                <Button type="primary" @click="handleChange">替换背景</Button>
                <Button type="primary" @click="handleDelete">删除背景</Button>
            </div>
        </FormItem>
        <FormItem label="出血">
            <Slider :max="1000" :min="0" :step="1" show-input v-model="activeData.border"></Slider>
        </FormItem>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import img from '@/assets/imgs/bg.png'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'basic',
        data() {
            return {
                img
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
            },
            activeLayer: {
                type: Object,
                default: {}
            },
            activeLayerIndex: Number
        },
        methods: {
            showImage() {
                this[types.SHOW_IMG_DIALOG]({flag: true, imgAreaType: 2})
                // 设置是否是修改
                this[types.SET_CHANGE_IMG](false)
            },
            handleChange() {
                this[types.SHOW_IMG_DIALOG]({flag: true, imgAreaType: 2})
                // 设置是否是修改
                this[types.SET_CHANGE_IMG](true)
            },
            handleDelete() {
                this.activeData.backgroundImage = ''
                this.activeLayer.data = this.activeData
                this[types.OPERATION_DOM]({layer: this.activeLayer, i: this.activeLayerIndex})
            },
            ...mapMutations([
                types.SHOW_IMG_DIALOG,
                types.SET_CHANGE_IMG,
                types.OPERATION_DOM
            ])
        }
    }
</script>

<style scoped lang="scss">
    .bg-wrap {
        width: 100%;
        background: #fff;
        cursor: pointer;
        .no-img {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 135px;
            width: 100%;
            img {
                width: 50px;
            }
        }
        .has-img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 135px;
            background: #fff;
            overflow: hidden;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .has-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
</style>
