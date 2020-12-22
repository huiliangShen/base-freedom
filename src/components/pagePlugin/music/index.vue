<template>
    <div class="maker-layer-music-content">
        <audio :src="src" :data-delay="delay"></audio>
    </div>
</template>

<script>
    export default {
        name: 'pageMusicPlugin',
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        computed: {
            src() {
                return this.layer.data.src || ''
            },
            delay() {
                return this.layer.data.delay || 0
            }
        }
    }
</script>

<style scoped>

</style>
