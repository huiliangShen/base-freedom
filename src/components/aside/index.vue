<template>
    <transition name="aside-show" appear>
        <aside v-show="asideShow" v-if="!!data">
            <ul class="aside-wrap">
                <li class="aside-title" :class="{'active': asideSelected === 1}">页面</li>
            </ul>
            <div class="aside-panel" v-show="asideSelected === 1">
                <ul class="aside-layer-pages">
                    <draggable v-model="pages">
                        <li class="aside-layer-page" v-for="(page, i) in pages" :key="i">
                            <div class="aside-layer-page-operation">
                                <span class="aside-operation-num">{{i + 1}}</span>
                                <span class="aside-operation-icon-wrap">
                                <Icon type="ios-arrow-up"/>
                                <Icon custom="iconfont icon-fuzhi" size="20" @click.stop.prevent="copyPage(page)"/>
                                <Icon custom="iconfont icon-delete" size="20" @click.stop.prevent="deletePage(i)"
                                      :class="{'disable': pages.length <= 1}"/>
                                <Icon type="ios-arrow-down"/>
                            </span>
                            </div>
                            <div class="aside-layer-page-preview" :class="{'active': activePage === i}"
                                 @click="changePage(i)">
                                <div class="aside-layer-page-preview-detail">
                                    <div class="aside-layer-page-preview-modal">
                                    </div>
                                    <HomePage class="preview-page" :page="page" :i="i"
                                              :style="{ width: page.style.width + 'px', height: page.style.height + 'px', transform: 'scale(' + pWidth / page.style.width + ', ' + pHeight / page.style.height + ')' }"/>
                                </div>
                            </div>
                        </li>
                    </draggable>
                    <li class="aside-layer-page">
                        <div class="aside-layer-page-operation" style="visibility: hidden">
                        </div>
                        <div class="aside-layer-page-preview add-page" @click="addPage">
                            <div class="aside-layer-page-preview-detail">
                                <Icon type="md-add"/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <remove-page ref="removePage" @confirmRemovePage="confirmRemovePage"></remove-page>
        </aside>
    </transition>
</template>

<script>
    import draggable from 'vuedraggable'
    import {mapGetters, mapMutations} from 'vuex'
    import HomePage from '@/components/page'
    import types from '@/store/module/app/mutationsType'
    import RemovePage from '@/components/dialog/removePage'

    export default {
        name: 'cAside',
        data() {
            return {
                asideSelected: 1,
                pWidth: 110,
                pHeight: 158,
                list: [],
                show: false
            }
        },
        provide: {
            asideDom: true
        },
        computed: {
            ...mapGetters([
                'data',
                'activePage',
                'asideShow'
            ]),
            pages: {
                get() {
                    return this.data.pages
                },
                set(val) {
                    this[types.UPDATE_PAGES](val)
                }
            }
        },
        components: {
            HomePage,
            draggable,
            RemovePage
        },
        methods: {
            changePage(i) {
                this[types.CHANGE_PAGE](i)
            },
            addPage() {
                this[types.ADD_PAGE]()
            },
            deletePage(i) {
                if (this.pages.length <= 1) {
                    return
                }
                this.$refs.removePage.open(i)
            },
            confirmRemovePage(i) {
                this[types.DELETE_PAGE](i)
            },
            copyPage(page) {
                const PAGE = JSON.parse(JSON.stringify(page))
                this[types.ADD_PAGE](PAGE)
            },
            ...mapMutations([
                types.CHANGE_PAGE,
                types.ADD_PAGE,
                types.DELETE_PAGE,
                types.UPDATE_PAGES,
                types.SET_DATA
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/variable.scss';

    aside {
        transition: all .2s;
        position: relative;
        width: 180px;
        z-index: 1000;
        background: $aside-bg;

        .aside-wrap {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin: 0;
            padding: 0;
            border: 1px solid rgba(209, 215, 220, 1);
            font-size: $n-font-size;
            font-weight: 400;
            overflow: hidden;

            .aside-title {
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

        .aside-panel {
            position: absolute;
            top: 30px;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;

            .aside-layer-pages {
                display: flex;
                flex-direction: column;
                padding: 10px 20px;

                .aside-layer-page {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 20px;

                    .aside-layer-page-operation {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 15px;
                        padding: 8px 0;

                        .aside-operation-num {
                            font-size: 16px;
                        }

                        .aside-operation-icon-wrap {
                            margin-top: 20px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .ivu-icon {
                                margin-bottom: 2px;
                                cursor: pointer;

                                &.disable {
                                    opacity: .3;
                                    cursor: no-drop;
                                }
                            }
                        }
                    }

                    .aside-layer-page-preview {
                        flex: 1;
                        margin-left: 16px;
                        cursor: pointer;

                        .aside-layer-page-preview-detail {
                            position: relative;
                            width: 110px;
                            height: 158px;
                            background: #fff;
                            border: 1px solid rgba(0, 0, 0, 0);
                            overflow: hidden;

                            .aside-layer-page-preview-modal {
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                z-index: 1001;
                            }

                            .preview-page {
                                transform-origin: left top;
                                top: 0;
                                left: 0;
                                margin-bottom: 0;
                            }
                        }

                        &.active {
                            .aside-layer-page-preview-detail {
                                border: 1px solid rgba(130, 112, 98, 0.6);
                            }
                        }

                        &.add-page {
                            .aside-layer-page-preview-detail {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: rgba(234, 240, 244, 1);
                                box-shadow: 0 0 1px 0 rgba(166, 170, 173, 1);

                                .ivu-icon {
                                    font-size: 30px;
                                }
                            }
                        }
                    }
                }
            }

            .maker-layer-demo {
                padding: 10px 14px;

                .maker-layer-item {
                    padding-bottom: 20px;
                    cursor: pointer;

                    & > img {
                        width: 100%;
                    }
                }
            }
        }
    }

    .aside-show-enter-active, .aside-show-leave-active {
        transition: all 0.3s;
        // transform: translateX(0);
        width: 180px;
        opacity: 1;
    }

    .aside-show-enter, .aside-show-leave-to {
        // transform: translateX(-100%);
        width: 0;
        opacity: 0;
    }
</style>
