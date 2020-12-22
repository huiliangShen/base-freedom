<template>
    <div>
        <template v-if="layers.length > 0">
            <ul class="operation-control-layers">
                <draggable v-model="layers">
                    <li class="operation-control-layer-item" v-for="(item, i) in layers" :key="i"
                        @click.stop.prevent="setActive(item, i)" :class="{'active': activeLayer === item}">
                        <div class="layer-item-see" @click="showPlugin(item, i)">
                            <Icon custom="iconfont icon-preview" size="15"
                                  :style="{'visibility': item.style.visibility || ''}"></Icon>
                        </div>
                        <div class="layer-item-detail">
                    <span>
                        <Icon :custom="item.icon" size="24"></Icon>
                    </span>
                            <p contenteditable="false">{{item.name}}</p>
                        </div>
                        <div class="layer-item-operation">
                            <!-- <span>
                                 <Icon custom="iconfont icon-edit" size="21"></Icon>
                             </span>-->
                            <span @click.stop.prevent="lockPlugin(item, i)" :class="{'active': !!item.lock}">
                            <Icon custom="iconfont icon-lock" size="21"></Icon>
                        </span>
                            <span @click.stop.prevent="copyPlugin(item, i)">
                            <Icon custom="iconfont icon-fuzhi" size="21"></Icon>
                        </span>
                            <span @click.stop.prevent="deletePlugin(item, i)">
                            <Icon custom="iconfont icon-delete" size="21"></Icon>
                        </span>
                        </div>
                    </li>
                    <!--<li class="operation-control-layer-item">
                        <div class="layer-item-see">
                            <Icon custom="iconfont icon-preview" size="15"></Icon>
                        </div>
                        <div class="layer-item-detail">
                            <span>
                                <Icon custom="iconfont icon-tianqi" size="24"></Icon>
                            </span>
                            <p contenteditable="false">天气组件</p>
                        </div>
                        <div class="layer-item-operation">
                            <span>
                                <Icon custom="iconfont icon-edit" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-lock" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-fuzhi" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-delete" size="21"></Icon>
                            </span>
                        </div>
                    </li>
                    <li class="operation-control-layer-item">
                        <div class="layer-item-see">
                            <Icon custom="iconfont icon-preview" size="15"></Icon>
                        </div>
                        <div class="layer-item-detail">
                            <span>
                                <Icon custom="iconfont icon-tianqi" size="24"></Icon>
                            </span>
                            <p contenteditable="false">天气组件</p>
                        </div>
                        <div class="layer-item-operation">
                            <span>
                                <Icon custom="iconfont icon-edit" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-lock" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-fuzhi" size="21"></Icon>
                            </span>
                            <span>
                                <Icon custom="iconfont icon-delete" size="21"></Icon>
                            </span>
                        </div>
                    </li>-->
                </draggable>
            </ul>
        </template>
        <template v-else>
            <h3 style="text-align: center">暂无图层</h3>
        </template>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import {mapGetters, mapMutations} from 'vuex'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'operationLayer',
        computed: {
            layers: {
                get() {
                    let {pages} = this.data
                    return this.activePage > -1 ? pages[this.activePage].layers : []
                },
                set(val) {
                    console.log(val)
                    this[types.UPDATE_LAYERS](val)
                }
            },
            ...mapGetters([
                'data',
                'activePage',
                'activeLayer'
            ])
        },
        components: {
            draggable
        },
        methods: {
            setActive(layer, i) {
                !layer.lock && this[types.SET_ACTIVE_LAYER]({layer, i})
            },
            deletePlugin(layer, i) {
                this[types.OPERATION_DOM]({layer, i, del: true})
                this.$nextTick(() => {
                    this[types.SET_ACTIVE_LAYER]({layer: null, i: -1})
                })
            },
            copyPlugin(layer) {
                this[types.COPY_PLUGIN](JSON.parse(JSON.stringify(layer)))
            },
            lockPlugin(layer, i) {
                let lockLayer = JSON.parse(JSON.stringify(layer))
                if (!lockLayer.lock) {
                    lockLayer.lock = true
                } else {
                    lockLayer.lock = false
                }
                this[types.OPERATION_DOM]({layer: lockLayer, i})
            },
            showPlugin(layer, i) {
                let lockLayer = JSON.parse(JSON.stringify(layer))
                if (!lockLayer.style.visibility) {
                    lockLayer.style.visibility = 'hidden'
                } else {
                    lockLayer.style.visibility = ''
                }
                this[types.OPERATION_DOM]({layer: lockLayer, i})
            },
            ...mapMutations([
                types.SET_ACTIVE_LAYER,
                types.OPERATION_DOM,
                types.COPY_PLUGIN,
                types.UPDATE_LAYERS
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../assets/css/mixins.scss';
    @import '../../../assets/css/variable.scss';
    /* 图层 */
    .operation-control-layers {
        .operation-control-layer-item {
            display: flex;
            height: 30px;
            border-bottom: 1px solid rgba(181, 181, 181, 1);
            cursor: pointer;

            &.active {
                background: rgba(11, 118, 255, 0.2);
            }

            .layer-item-see {
                width: 46px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid rgba(181, 181, 181, 1);
            }

            .layer-item-operation {
                width: 115px;
                height: 20px;
                margin-top: 5px;

                span {
                    float: left;
                    display: block;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 2px;

                    &:not(:first-child) {
                        margin-left: 2px;
                    }

                    &.active, &:hover {
                        background: #fff;
                    }
                }
            }

            .layer-item-detail {
                flex: 1;
                display: flex;
                align-items: center;
                margin-left: 8px;
                color: $font-color;
                overflow: hidden;

                p {
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: 500;
                    @include text-ellipsis;
                }
            }
        }
    }
</style>
