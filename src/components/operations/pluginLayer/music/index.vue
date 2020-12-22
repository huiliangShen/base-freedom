<template>
    <div class="operation-music-layer">
        <Form :label-width="75" label-position="left"
              :label-colon="true">
            <FormItem label="延迟时间">
                <InputNumber :step="0.1" :min="0" v-model="delay"></InputNumber>
            </FormItem>
            <FormItem label="选择音乐">
                <span>{{musicName}}</span>
            </FormItem>
            <ul class="music-layer-lis">
                <li class="music-item" v-for="(item, i) in musicList" :key="i" @click.stop="setMusic(item)" :class="{'active': selectedId === item.id}">
                    <div class="music-item-no">{{`0${i+1}`}}</div>
                    <div class="music-item-title">{{item.name}}</div>
                    <div class="music-item-state" @click.prevent.stop="playMusic(item)">
                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"
                              v-if="loading && item.id === playId"></Icon>
                        <img src="@/assets/imgs/play.png" alt="" v-else-if="item.id === playId && !loading">
                        <img src="@/assets/imgs/paused.png" alt="" v-else>
                    </div>
                </li>
            </ul>
        </Form>
        <audio ref="audio" @canplay="canplay" @error="error" :src="src" style="visibility: hidden"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'pluginMusicLayer',
        computed: {
            ...mapGetters([
                'musicList',
                'activeLayerIndex'
            ])
        },
        data() {
            return {
                musicName: '请先选择歌曲',
                src: '',
                delay: 0,
                playId: 0,
                loading: false,
                selectedId: 0
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
            }
        },
        watch: {
            activeData: {
                handler(val) {
                    if (val && val.src) {
                        this.musicName = val.name || '请先选择歌曲'
                        this.delay = val.delay || 0
                        this.selectedId = val.id || 0
                    } else {
                        this.musicName = '请先选择歌曲'
                        this.delay = 0
                        this.selectedId = 0
                    }
                },
                immediate: true
            }
        },
        methods: {
            playMusic(item) {
                this.loading = false
                if (this.playId && item.id === this.playId) {
                    this.playId = 0
                    this.src = ''
                } else {
                    this.loading = true
                    this.playId = item.id
                    this.src = item.src
                }
            },
            setMusic(item) {
                this.activeLayer.data = {
                    src: item.src,
                    name: item.name,
                    delay: this.delay || 0,
                    id: item.id
                }

                this[types.OPERATION_DOM]({layer: this.activeLayer, i: this.activeLayerIndex})
            },
            canplay() {
                console.log('play...')
                if (this.delay) {
                    setTimeout(() => {
                        this.$refs.audio.play()
                        this.loading = false
                    }, this.delay)
                } else {
                    this.$refs.audio.play()
                    this.loading = false
                }
            },
            error() {
                if (this.src) {
                    console.log('error...')
                    this.$Message.error('音频加载失败')
                    this.loading = false
                    this.playId = 0
                    this.src = ''
                }
            },
            ...mapMutations([
                types.OPERATION_DOM
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/css/mixins.scss";
    @import "~@/assets/css/variable.scss";

    .operation-music-layer {
        width: 100%;
        padding: 10px 22px;

        .ivu-form-item {
            margin-bottom: 18px;
        }

        .music-layer-lis {
            overflow: hidden;

            .music-item {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                cursor: pointer;

                &.active {
                    background: $theme-bg;
                    color: #fff;
                }

                .music-item-no {
                    width: 48px;
                    text-align: left;
                    font-size: $n-font-size;
                }

                .music-item-title {
                    flex: 1;
                    text-align: left;
                    @include text-ellipsis;
                    font-size: $n-font-size;
                    line-height: normal;
                }

                .music-item-state {
                    position: relative;
                    width: 20px;
                    float: right;
                    cursor: pointer;

                    img {
                        width: 18px;
                    }
                }
            }
        }
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
