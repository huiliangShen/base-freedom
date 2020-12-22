<template>
    <div class="tools-wrap">
        <div class="tool-item">
            <span>
                <Icon custom="iconfont icon-fanhui" size="22" @click="handleBack"></Icon>
            </span>
        </div>
        <div class="tool-item">
            <span>
                <Icon custom="iconfont icon-goforward" size="22" @click="handleForward"></Icon>
            </span>
        </div>
        <div class="tool-item">
            <Poptip placement="left-start" trigger="hover">
                <span>
                    <Icon custom="iconfont icon-wangge" size="22"></Icon>
                </span>
                <div slot="content">
                    <Form :label-width="80" :label-colon="true" class="tool-gird-form">
                        <FormItem label="网格开关">
                            <i-switch :value="showGrid" @on-change="changeShowGrid"></i-switch>
                        </FormItem>
                        <FormItem label="网格颜色">
                            <ColorPicker alpha :value="color" @on-change="changeColor"/>
                        </FormItem>
                        <FormItem label="网格密度">
                            <Select :value="gridColumn" @on-change="changeGridColumn">
                                <Option :value="10">10px</Option>
                                <Option :value="15">15px</Option>
                                <Option :value="20">20px</Option>
                                <Option :value="25">25px</Option>
                                <Option :value="30">30px</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="吸附效果">
                            <i-switch :value="adsorb" @on-change="changeAdsorb"></i-switch>
                        </FormItem>
                    </Form>
                </div>
            </Poptip>
        </div>
        <div class="tool-item normal-margin">
            <span @click="handleEnlarge">
                <Icon type="md-add" size="24"/>
            </span>
        </div>

        <div class="tool-item normal-margin">
            <Poptip placement="left" trigger="hover">
                <span class="percent">{{num.toFixed(0)}}%</span>
                <div slot="content">
                    <Slider :value="num" :tip-format="format" :min="1" :max="100" @on-change="handleOperation"></Slider>
                </div>
            </Poptip>
        </div>

        <div class="tool-item normal-margin">
            <span @click="handleShrink">
                <Icon type="md-remove" size="24"/>
            </span>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import types from '@/store/module/editor/mutationsType'
    import appTypes from '@/store/module/app/mutationsType'

    export default {
        name: 'toolWrap',
        computed: {
            ...mapGetters([
                'scale',
                'showGrid',
                'gridColumn',
                'adsorb',
                'color'
            ]),
            num() {
                return this.scale * 100
            }
        },
        methods: {
            handleBack() {
                this[appTypes.GO_BACK]()
            },
            handleForward() {
                this[appTypes.GO_FORWARD]()
            },
            handleEnlarge() {
                let result = this.scale + 0.01
                result = result >= 1 ? 1 : +result.toFixed(2)
                this[types.CHANGE_SCALE](result)
            },
            handleShrink() {
                let result = this.scale - 0.01
                result = +result.toFixed(2)
                this[types.CHANGE_SCALE](result)
            },
            handleOperation(val) {
                let result = (val / 100).toFixed(2)
                this[types.CHANGE_SCALE](result)
            },
            changeShowGrid(val) {
                this[types.TOGGLE_SHOW_GRID](val)
            },
            changeGridColumn(val) {
                this[types.CHANGE_GRID_COLUMN](val)
            },
            changeColor(val) {
                this[types.CHANGE_COLOR](val)
            },
            changeAdsorb(val) {
                this[types.TOGGLE_SHOW_ADSORB](val)
            },
            format(val) {
                return `${val}%`;
            },
            ...mapMutations([
                types.CHANGE_SCALE,
                types.TOGGLE_SHOW_GRID,
                types.CHANGE_GRID_COLUMN,
                types.TOGGLE_SHOW_ADSORB,
                types.CHANGE_COLOR,
                appTypes.GO_BACK,
                appTypes.GO_FORWARD
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";

    .tools-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60px;
        height: 100%;
        padding: 18px 18px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(191, 191, 191, 1);

        .tool-item {
            margin-bottom: 30px;
            cursor: pointer;

            &.normal-margin {
                margin-bottom: 10px;

                .percent {
                    font-size: $n-font-size;
                }
            }

            /* .ivu-icon {
                 cursor: pointer;
             } */

            &:hover {
                .ivu-icon {
                    color: $theme-bg;
                }
            }
        }
    }
</style>
<style lang="scss">
    .tool-item {
        /*重写iview popti样式*/
        .ivu-poptip-popper {
            .ivu-poptip-content .ivu-poptip-arrow {
                &:after {
                    border-left-color: #707070;
                }
            }

            .ivu-poptip-inner {
                background: #707070;

                .ivu-poptip-body-content {
                    overflow: initial;
                }
            }
        }
    }

    .tool-gird-form {
        .ivu-form-item {
            margin-bottom: 15px;

            &:last-child {
                margin-bottom: 0;
            }

            .ivu-form-item-label {
                color: #fff;
            }
        }
    }
</style>
