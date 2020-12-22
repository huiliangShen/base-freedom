<template>
    <div class="maker-layer-qrcode-content" :data-url="url">
        <canvas ref="canvas"/>
    </div>
</template>

<script>
    import QRCode from 'qrcode'

    export default {
        name: 'pageCodePlugin',
        data() {
            return {
                url: ''
            }
        },
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        watch: {
            layer: {
                handler(val) {
                    if (!val || !val.data.url) {
                        return
                    }
                    if (val.data.url && val.data.url === this.url) {
                        return
                    }
                    this.url = val.data.url
                    this.$nextTick(() => {
                        this.initQRCode()
                    })
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            initQRCode() {
                QRCode.toCanvas(this.$refs.canvas, this.url, {margin: 1},(error) => {
                    if (error) console.error(error)
                    console.log('success!')
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-qrcode-content {
        width: 100%;
        height: 100%;

        canvas {
            width: 100% !important;
            height: 100% !important;
        }
    }
</style>
