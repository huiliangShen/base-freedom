<template>
    <div class="operation-control-wrap" v-if="!!data">
        <ul class="operation-control-head-content">
            <li class="operation-control-head-title" v-show="!activeLayer"
                :class="{'active': selected === 1 && !activeLayer}" @click="selectItem(1)">页面属性
            </li>
            <li class="operation-control-head-title" v-show="!!activeLayer"
                :class="{'active': selected === 1 && !!activeLayer}" @click="selectItem(1)">元件属性
            </li>
            <li class="operation-control-head-title" :class="{'active': selected === 2}" @click="selectItem(2)">图层</li>
        </ul>
        <div class="operation-control-body" v-show="selected === 1 && !activeLayer">
            <page-style :pageStyle="pageStyle"></page-style>
        </div>
        <div class="operation-control-body" v-show="selected === 1 && !!activeLayer && activeLayer.type !== 'music'">
            <common-operation :estyle="estyle" :cstyle="cstyle" v-if="!!activeLayer  && activeLayer.type !== 'video'">
               <!-- 单个组件 只能包含单个 v-slot:default v-slot:content-->
                <template v-if="activeLayer.type === 'img'">
                    <plugin-img-layer :activeData="activeData"></plugin-img-layer>
                </template>
                <template v-else-if="activeLayer.type === 'text'">
                    <plugin-text-layer :activeData="activeData" :activeLayerIndex="activeLayerIndex"
                                       :activeLayer="activeLayer"></plugin-text-layer>
                </template>
                <template v-else-if="activeLayer.type === 'qrcode'">
                    <plugin-code-layer :activeData="activeData"></plugin-code-layer>
                </template>
                <template  v-else-if="activeLayer.type === 'run'">
                    <plugin-run-layer :active-data="activeData"></plugin-run-layer>
                </template>
            </common-operation>
        </div>
        <!--音乐选择界面-->
        <div class="operation-control-body" v-show="selected === 1 && !!activeLayer && activeLayer.type === 'music'">
            <plugin-music-layer :activeData="activeData" :activeLayer="activeLayer"></plugin-music-layer>
        </div>
        <div class="operation-control-body" v-show="selected === 2">
            <operation-layer></operation-layer>
        </div>
    </div>
</template>

<script>
    import PageStyle from './pageStyle'
    import {mapGetters} from 'vuex'
    import OperationLayer from './operationLayer'
    import CommonOperation from './commonOperation'
    import {
        PluginImgLayer,
        PluginMusicLayer,
        PluginTextLayer,
        PluginCodeLayer,
        PluginRunLayer
    } from './pluginLayer'

    export default {
        name: 'operations',
        data() {
            return {
                show: false,
                selected: 1
            }
        },
        computed: {
            ...mapGetters([
                'activeLayer',
                'activeLayerIndex',
                'data',
                'activePage'
            ]),
            cstyle() {
                let {left, top, width, height, transform} = this.activeLayer && this.activeLayer.style || {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    transform: ''
                }
                transform = transform ? transform.replace(/[^0-9]/g, '') - 0 : 0
                return {
                    left, top, width, height, transform
                }
            },
            estyle() {
                let {opacity = 1, borderWidth = 1, borderStyle = 'none', borderRadius = 0, borderColor = 'rgba(0,0,0,1)', backgroundColor = 'rgba(0,0,0,0)'} = this.activeLayer && this.activeLayer.estyle || {
                    opacity: 1,
                    borderWidth: 1,
                    borderStyle: 'none',
                    borderRadius: 0,
                    borderColor: 'rgba(0,0,0,1)',
                    backgroundColor: 'rgba(0,0,0,0)'
                }
                return {
                    opacity: opacity || 1,
                    borderWidth: borderWidth || 1,
                    borderStyle: borderStyle || 'none',
                    borderRadius: borderRadius || 0,
                    borderColor: borderColor || 'rgba(0,0,0,1)',
                    backgroundColor: backgroundColor
                }
            },
            originObj() {
                return this.activeLayer
            },
            activeData() {
                return this.activeLayer && this.activeLayer.data
            },
            pageStyle() {
                let {pages} = this.data
                let style = this.activePage > -1 ? pages[this.activePage].style : null
                return style
            }
        },
        components: {
            PageStyle,
            OperationLayer,
            CommonOperation,
            PluginImgLayer,
            PluginMusicLayer,
            PluginTextLayer,
            PluginCodeLayer,
            PluginRunLayer
        },
        methods: {
            selectItem(i) {
                this.selected = i
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/variable.scss';

    .operation-control-wrap {
        flex: 1;
        position: relative;

        .operation-control-head-content {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 44px;
            line-height: 44px;
            margin: 0;
            padding: 0;
            border: 1px solid rgba(209, 215, 220, 1);
            font-size: $n-font-size;
            font-weight: 400;
            overflow: hidden;

            .operation-control-head-title {
                flex: 1;
                background: #fff;
                text-align: center;
                color: $font-color;
                cursor: pointer;

                &.active {
                    background: $theme-bg;
                    color: #fff;
                }
            }
        }

        .operation-control-body {
            position: absolute;
            top: 44px;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: height .5s;
        height: 100%;
    }

    .fade-enter, .fade-leave-to {
        height: 0;
    }
</style>
<style lang="scss">
    .operation-control-form {
        .ivu-form-item {
            margin-bottom: 20px;
        }
    }
</style>
