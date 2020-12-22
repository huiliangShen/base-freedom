<template>
    <div class="operation-video-layer">
        <collapse-panel>
            <template v-slot:header>播放设置</template>
            <template v-slot:default>
                <Form :label-width="75" :label-colon="true" class="operation-video-panel">
                    <FormItem label="播放清单">
                        <Row :gutter="15">
                            <Col :span="17">
                                <Select clearable v-model="activeData.playId" @on-change="changeSelected" placeholder="请选择播放清单">
                                    <Option :value="item.id" v-for="(item, i) in items" :key="i">{{item.name}}</Option>
                                </Select>
                            </Col>
                            <Col :span="6">
                                <Button @click="showList">
                                    <Icon custom="iconfont icon-bofangqingdanguanli"/>
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="当前播放清单" :label-width="105">
                        {{activeData.playName || '暂未选择播放清单'}}
                    </FormItem>
                </Form>
                <div class="hoz"></div>
                <div class="video-item-wrap">
                    <ul class="video-item-list">
                        <li class="video-item">
                            <div class="item-name">名称</div>
                            <div class="item-type">类型</div>
                        </li>
                        <li class="video-item" v-for="(item, i) in activeData.playItemList" :key="i">
                            <div class="item-name">{{item.name}}</div>
                            <div class="item-type">{{item.type === 1 ? '图片' : item.type === 2 ? '视频' : '节目'}}</div>
                        </li>
                       <!-- <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">图片</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>
                        <li class="video-item">
                            <div class="item-name">欢度春节欢度春节欢度春节</div>
                            <div class="item-type">视频</div>
                        </li>-->
                    </ul>
                </div>
            </template>
        </collapse-panel>
        <play-list-draw ref="playList" @addList="addList" @updateShowItem="updateShowItem"
                        @listRefresh="listRefresh"></play-list-draw>
        <add-list-draw ref="addList" :zIndex="1100" @refresh="refresh"></add-list-draw>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import CollapsePanel from '@/common/collapsePanel'
    import PlayListDraw from './playListDraw'
    import AddListDraw from './addListDraw'
    import {getVideoArea, getShowList} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {mapMutations} from 'vuex'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'pluginVideoLayer',
        components: {
            CollapsePanel,
            PlayListDraw,
            AddListDraw
        },
        data() {
            return {
                items: [],
                spinShow: false
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
            showList() {
                this.$refs.playList.showList()
            },
            addList() {
                this.$refs.addList.showList()
            },
            updateShowItem(id) {
                this.$refs.addList.showList(id)
            },
            refresh() {
                this.$refs.playList._init()
            },
            listRefresh() {
                // this.spinShow = true
                getShowList()
                    .then(res => {
                        this.spinShow = false
                        if (res.code === ERROR_CODE) {
                            this.items = res.data.list
                        }
                    })
                    .catch(() => {
                        this.spinShow = false
                    })
            },
            changeSelected() {
                // debugger
                const id = this.activeData.playId
                let item = this.items.filter(e => e.id === id)
                item = item.length > 0 ? item[0] : {}
                this.activeData.playName = item.name || ''
                this.activeData.playItemList = item.program_list || []

                this.activeLayer.data = this.activeData

                this[types.OPERATION_DOM]({layer: this.activeLayer, i: this.activeLayerIndex})
            },
            ...mapMutations([
                types.OPERATION_DOM
            ])
        },
        mounted() {
            this.listRefresh()
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/css/mixins.scss';
    @import '~@/assets/css/variable.scss';

    .operation-video-layer {
        .hoz {
            @include top-border;
        }

        .operation-video-panel {
            padding: 0 20px;
        }

        .video-item-wrap {
            padding: 20px 23px 10px;

            .video-item-list {
                /*max-height: 200px;
                overflow-y: scroll;*/
                .video-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 18px;
                    font-size: $n-font-size;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .item-name {
                        flex: 1;
                        text-align: left;
                        @include text-ellipsis;
                    }

                    .item-type {
                        width: 50px;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
