<template>
    <div class="maker-layer-video-content" :style="style">
        <div class="maker-layer-video-box" :style="boxStyle" :class="{'no': !layer.playId}">
            <div style="text-align: center" v-if="!layer.data.playId">请选择视频区素材</div>
            <div v-else>当前播放清单：{{layer.data.playName}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pageVideoPlugin',
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        computed: {
            style() {
                const bg = this.layer.data && this.layer.data.backgroundImage || ''
                return `background-image: url(${bg});`
            },
            boxStyle() {
                const border = this.layer.data && this.layer.data.border || 0
                return `border-width: ${border}px;`
            }
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-video-content {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .maker-layer-video-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.2);
        }
    }
</style>
