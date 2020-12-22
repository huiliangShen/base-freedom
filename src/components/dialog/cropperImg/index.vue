<template>
    <Modal :footer-hide="true" :value="cropperImgDialogShow" width="740" @on-cancel="close" :mask-closable="false">
        <p slot="header" style="text-align:center">
            <span>背景裁剪</span>
        </p>
        <div class="crop-img-dialog-content" v-if="cropperImgDialogShow">
            <cropper :layer="activeLayer" ref="cropper"></cropper>
        </div>
        <div class="crop-img-dialog-footer">
            <Button type="primary" @click="confirm" :loading="loading">确定</Button>
            <Button type="warning" @click="close">取消</Button>
        </div>
        <!--<canvas id="aaaa"></canvas>-->
        <!--  <img :src="image" alt="" width="100%">

          <img :src="image1" alt="" width="100%">-->
    </Modal>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Cropper from '@/common/cropper'
    import types from '@/store/module/app/mutationsType'
    import {dataURLtoFile, getImage} from '@/helper'
    /* import {uploadImg} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {config} from '@/config' */

    export default {
        name: 'cropperImgDialog',
        data() {
            return {
                layer: null,
                image: '',
                image1: '',
                loading: false
            }
        },
        computed: {
            ...mapGetters([
                'cropperImgDialogShow',
                'activeLayer',
                'activeLayerIndex'
            ])
        },
        components: {
            Cropper
        },
        methods: {
            confirm() {
                if (this.$refs.cropper.spinShow) {
                    this.$Message.warning('正在加载中。。。')
                    return false
                }
                this.loading = true
                this.$refs.cropper.getRect(({scaleXPercent, scaleYPercent, scaleWidthPercent, scaleHeightPercent}) => {
                    // this.activeLayer.data.crop = area
                    let layer = JSON.parse(JSON.stringify(this.activeLayer))
                    let {data, style} = this.activeLayer
                    const {originalWidth, originalHeight} = data
                    // const {width, height} = style

                    // console.log('wbk', width, height)

                    let crop = {
                        //
                        left: scaleXPercent * originalWidth,
                        top: scaleYPercent * originalHeight,
                        originalWidth,
                        originalHeight,
                        width: (scaleWidthPercent * originalWidth),
                        height: (scaleHeightPercent * originalHeight)
                    }
                    // console.log('crop', JSON.stringify(crop))
                    layer.data.crop = JSON.stringify(crop)
                    layer.data.newPath = ''

                    getImage(crop, this.activeLayer.data.src, (dataURL) => {
                        this.loading = false
                        layer.data.newPath = dataURL
                        this[types.OPERATION_DOM]({layer, i: this.activeLayerIndex})
                        this.close()
                        // this.image1 = dataURL
                        /* const file = dataURLtoFile(dataURL, `t${new Date().getTime()}.png`)
                         const form = new FormData()
                         form.set('material', file)
                         uploadImg(form)
                         .then(res => {
                             this.loading = false
                             if (res.code === ERROR_CODE) {
                                 // this.image = res.data.path
                                 layer.data.newPath = `${config.host}${res.data.path}`
                             } else {
                                 this.$Message.error(res.message)
                             }
                             this[types.OPERATION_DOM]({layer, i: this.activeLayerIndex})
                             this.close()
                         })
                         .catch(() => {
                             this.loading = false
                         }) */
                    })

                })
            },
            close() {
                this[types.SET_CROPPER_IMG](false)
            },
            ...mapMutations([
                types.SET_CROPPER_IMG,
                types.OPERATION_DOM
            ])
        }
    }
</script>

<style scoped lang="scss">
    .crop-img-dialog-content {
        padding: 18px 55px 35px;
    }

    .crop-img-dialog-footer {
        text-align: center;

        .ivu-btn {
            padding-left: 30px;
            padding-right: 30px;

            &:first-child {
                margin-right: 30px;
            }
        }
    }
</style>
