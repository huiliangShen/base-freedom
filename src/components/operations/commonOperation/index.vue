<template>
    <div>
        <Form :label-width="75" class="operation-control-form" label-position="left"
              :label-colon="true" v-if="!!activeLayer">
            <FormItem label="元件名称">
                <Input v-model="activeLayer && activeLayer.name" placeholder="元件名称"
                       @on-change="operationDom"></Input>
            </FormItem>
            <Row :gutter="20">
                <Col span="12">
                    <FormItem label="X坐标">
                        <InputNumber v-model="cstyle.left" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="Y坐标" :label-width="65">
                        <InputNumber v-model="cstyle.top" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="12">
                    <FormItem label="宽度">
                        <InputNumber v-model="cstyle.width" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="高度" :label-width="65">
                        <InputNumber v-model="cstyle.height" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <slot></slot>
            <FormItem label="透明度">
                <Slider v-model="estyle.opacity" :max="1" :min="0" :step="0.1" show-input
                        @on-change="operationDom"></Slider>
            </FormItem>
            <FormItem label="旋转角度">
                <Slider v-model="cstyle.transform" :max="360" :min="0" :step="1" show-input
                        @on-change="operationDom"></Slider>
            </FormItem>
            <FormItem label="背景颜色">
                <ColorPicker alpha v-model="estyle.backgroundColor" @on-change="operationDom"/>
            </FormItem>
        </Form>
        <slot name="content"></slot>
        <collapse-panel>
            <template v-slot:header>
                边框设置
            </template>
            <template v-slot:default>
                <Form :label-width="75" class="operation-control-form" label-position="left"
                      :label-colon="true" v-if="!!activeLayer">
                    <FormItem label="边框类型">
                        <Select v-model="estyle.borderStyle" @on-change="operationDom">
                            <Option value="none">无</Option>
                            <Option value="solid">实线</Option>
                            <Option value="double">双线</Option>
                            <Option value="dashed">虚线</Option>
                            <Option value="dotted">点线</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="边框大小">
                        <Slider v-model="estyle.borderWidth" :min="0" :step="1" show-input
                                @on-change="operationDom"></Slider>
                    </FormItem>
                    <FormItem label="边框弧度">
                        <Slider v-model="estyle.borderRadius" :max="1000" :min="0" :step="1" show-input
                                @on-change="operationDom"></Slider>
                    </FormItem>
                    <FormItem label="边框颜色">
                        <ColorPicker alpha v-model="estyle.borderColor" @on-change="operationDom"/>
                    </FormItem>
                </Form>
            </template>
        </collapse-panel>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import CollapsePanel from '@/common/collapsePanel'
    import types from '@/store/module/app/mutationsType'

    export default {
        name: 'commonOperation',
        computed: {
            ...mapGetters([
                'activeLayer',
                'activeLayerIndex'
            ]),
            originObj() {
                return this.activeLayer
            }
        },
        data() {
            return {
                show: false
            }
        },
        components: {
            CollapsePanel
        },
        props: {
            estyle: {
                type: Object
            },
            cstyle: {
                type: Object
            }
        },
        methods: {
            operationDom() {
                // debugger
                this.originObj.estyle = this.estyle || this.activeLayer.estyle
                // this.originObj.style = this.cstyle || this.activeLayer.style
                if (this.cstyle) {
                    let obj = Object.assign({}, this.cstyle)
                    obj.transform = `rotate(${obj.transform}deg)`
                    this.originObj.style = obj
                } else {
                    this.originObj.style = this.activeLayer.style
                }
                this[types.OPERATION_DOM]({layer: this.originObj, i: this.activeLayerIndex})
            },
            ...mapMutations([
                types.OPERATION_DOM,
                types.SHOW_IMG_DIALOG
            ])
        }
    }
</script>

<style scoped lang="scss">
    .operation-control-form {
        padding: 10px 20px 0;
    }
</style>
<style lang="scss">
    .operation-control-form {
        .custom-form-item {
            & > .ivu-form-item-content {
                margin-left: 0!important;
            }
        }
    }
</style>
