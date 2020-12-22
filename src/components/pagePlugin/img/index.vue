<template>
    <img width="100%" height="100%"
         v-if="!layer.data.crop"
         :src="src"
         alt="">
    <div class="maker-layer-img-content"
         :style="contentStyle"
         v-else-if="layer.data.crop">
        <div class="maker-layer-img-box" :style="innerStyle">
            <img width="100%" height="100%"
                 :src="src"
                 alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pageImgPlugin',
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        computed: {
            crop() {
                return this.layer.data.crop || ''
            },
            src() {
                return this.layer.data.src || ''
            },
            contentStyle() {
                let crop = this.layer.data.crop || ''
                const style = this.layer.style || ''
                if (crop) {
                    crop = JSON.parse(crop)
                    const {width, height} = style
                    const cropWidth = crop.width
                    const cropHeight = crop.height

                    let scaleX = width / cropWidth
                    let scaleY = height / cropHeight
                    console.log(width, height, cropWidth, cropHeight)
                    return `width: ${cropWidth}px;height: ${cropHeight}px; transform: scale(${scaleX}, ${scaleY});`
                } else {
                    return ''
                }
            },
            innerStyle() {
                let crop = this.layer.data.crop || ''
                if (crop) {
                    console.log('inner', crop)
                    crop = JSON.parse(crop)
                    const {originalWidth, originalHeight, left, top} = crop
                    return `width: ${originalWidth}px;height: ${originalHeight}px;left: -${left}px;top: -${top}px;`
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-img-content {
        transform-origin: 0 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .maker-layer-img-box {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
