<template>
    <div>
        <Form :label-width="75" class="operation-control-form" label-position="left"
              :label-colon="true" v-if="!!activeLayer">
          <!--  <FormItem label="元件名称">
                <Input v-model="activeLayer && activeLayer.name" placeholder="元件名称"
                       @on-change="operationDom"></Input>
            </FormItem>-->
            <Row :gutter="20">
                <Col span="12">
                    <FormItem label="x">
                        <InputNumber v-model="cstyle.left" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="y" :label-width="65">
                        <InputNumber v-model="cstyle.top" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="12">
                    <FormItem label="width">
                        <InputNumber v-model="cstyle.width" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="height" :label-width="65">
                        <InputNumber v-model="cstyle.height" :step="1" @on-change="operationDom"></InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <slot></slot>
            <FormItem label="opacity">
                <Slider v-model="estyle.opacity" :max="1" :min="0" :step="0.1" show-input
                        @on-change="operationDom"></Slider>
            </FormItem>
            <FormItem label="rotate">
                <Slider v-model="cstyle.transform" :max="360" :min="0" :step="1" show-input
                        @on-change="operationDom"></Slider>
            </FormItem>
            <FormItem label="bgcolor">
                <ColorPicker alpha v-model="estyle.backgroundColor" @on-change="operationDom"/>
            </FormItem>
        </Form>
        <slot name="content"></slot>
        <collapse-panel>
            <template v-slot:header>
                border
            </template>
            <template v-slot:default>
                <Form :label-width="75" class="operation-control-form" label-position="left"
                      :label-colon="true" v-if="!!activeLayer">
                    <FormItem label="type">
                        <Select v-model="estyle.borderStyle" @on-change="operationDom">
                            <Option value="none">无</Option>
                            <Option value="solid">solid</Option>
                            <Option value="double">double</Option>
                            <Option value="dashed">dashed</Option>
                            <Option value="dotted">dotted</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="size">
                        <Slider v-model="estyle.borderWidth" :min="0" :step="1" show-input
                                @on-change="operationDom"></Slider>
                    </FormItem>
                    <FormItem label="radius">
                        <Slider v-model="estyle.borderRadius" :max="1000" :min="0" :step="1" show-input
                                @on-change="operationDom"></Slider>
                    </FormItem>
                    <FormItem label="color">
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
