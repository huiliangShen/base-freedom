<template>
    <Modal :footer-hide="true" :value="cropperBgDialogShow" width="740" @on-cancel="close" :mask-closable="false">
        <p slot="header" style="text-align:center">
            <span>背景裁剪</span>
        </p>
        <div class="crop-img-dialog-content" v-if="cropperBgDialogShow">
            <cropper :layer="layer" ref="cropper"></cropper>
        </div>
        <div class="crop-img-dialog-footer">
            <Button type="primary" @click="confirm" :loading="loading">确定</Button>
            <Button type="warning" @click="close" :loading="loading">取消</Button>
        </div>
        <!--<img :src="img" alt="">-->
    </Modal>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {dataURLtoFile, getImage} from '@/helper'
    import {uploadImg} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {config} from '@/config'
    import Cropper from '@/common/cropper'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'cropperBgDialog',
        data () {
            return {
                loading: false,
                img: ''
            }
        },
        computed: {
            ...mapGetters([
                'cropperBgDialogShow',
                'activePage',
                'data'
            ]),
            layer() {
                const obj = this.data.pages[this.activePage]
                return {
                    data: {
                        src: obj.style.backgroundImage
                    }
                }
            }
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
                this.$refs.cropper.getRect(({scaleXPercent, scaleYPercent, scaleWidthPercent, scaleHeightPercent, imgWidth, imgHeight}) => {
                    // console.log(scaleXPercent, scaleYPercent, scaleWidthPercent, scaleHeightPercent, imgWidth, imgHeight)
                    // this.activeLayer.data.crop = area
                    const page = this.data.pages[this.activePage]

                    let nowPage = JSON.parse(JSON.stringify(page))
                    const {width, height} = nowPage.style
                    // const {width, height} = style

                    // console.log('wbk', width, height)
                    // bug 有问题 只能满足背景填充需要，不能满足截图需要
                    // 假设背景按照1280*720 图片长宽 为100 * 200 截图不正确
                    let crop = {
                        left: scaleXPercent * width,
                        top: scaleYPercent * height,
                        originalWidth: width,
                        originalHeight: height,
                        width: (scaleWidthPercent * width),
                        height: (scaleHeightPercent * height)
                    }
                    let otherCrop = {
                        left: scaleXPercent * imgWidth,
                        top: scaleYPercent * imgHeight,
                        width: (scaleWidthPercent * imgWidth),
                        height: (scaleHeightPercent * imgHeight)
                    }
                    // console.log('crop', JSON.stringify(crop))
                    nowPage.style.backgroundImageCrop = JSON.stringify(crop)

                    this.loading = true
                    getImage(otherCrop, this.layer.data.src, (dataURL) => {
                        debugger
                        this.loading = false
                        nowPage.style.newPath = dataURL
                        this[types.CHANGE_PAGE_INFO](nowPage)
                        this.close()
                        // this.img = dataURL
                       /* const file = dataURLtoFile(dataURL, `t${new Date().getTime()}.png`)
                        const form = new FormData()
                        form.set('material', file)
                        uploadImg(form)
                            .then(res => {
                                this.loading = false
                                if (res.code === ERROR_CODE) {
                                    nowPage.style.newPath = `${config.host}${res.data.path}`
                                } else {
                                    this.$Message.error(res.message)
                                }
                                this[types.CHANGE_PAGE_INFO](nowPage)
                                this.close()
                            })
                            .catch(() => {
                                this.loading = false
                            }) */
                    })
                })
            },
            close() {
                this[types.SET_CROPPER_BG](false)
            },
            ...mapMutations([
                types.SET_CROPPER_BG,
                types.CHANGE_PAGE_INFO
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
