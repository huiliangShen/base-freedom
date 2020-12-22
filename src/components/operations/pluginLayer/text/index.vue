<template>
    <div class="operation-text-layer">
        <FormItem label="文本内容">
            <Input v-model="activeData.text" type="textarea" placeholder="请输入文本内容"/>
        </FormItem>
        <Row :gutter="20">
            <Col span="13">
                <FormItem label="字体大小" :label-width="75">
                    <Select style="width: 80px" v-model="activeData.style.fontSize">
                        <Option v-for="(item, i) in fontSize" :key="i" :value="item">{{item}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="11">
                <FormItem label="字体颜色" :label-width="72">
                    <ColorPicker alpha v-model="activeData.style.color"/>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="字体效果">
            <ul class="operation-text-effect">
                <li class="effect-item" @click="setEffectFontWeight()" :class="{'active': activeData.style.fontWeight && activeData.style.fontWeight === 'bold'}">
                    <Icon custom="iconfont icon-jiacu" size="24"  style="margin-top: 5px"/>
                </li>
                <li class="effect-item" @click="setEffectFontStyle()" :class="{'active': activeData.style.fontStyle && activeData.style.fontStyle === 'italic'}">
                    <Icon custom="iconfont icon-qingxie" size="24" />
                </li>
                <li class="effect-item" @click="setEffectDecoration('underline')" :class="{'active': activeData.style.textDecoration && activeData.style.textDecoration === 'underline'}">
                    <Icon custom="iconfont icon-xiahuaxian" size="24" />
                </li>
                <li class="effect-item" @click="setEffectDecoration('line-through')" :class="{'active': activeData.style.textDecoration && activeData.style.textDecoration === 'line-through'}">
                    <Icon custom="iconfont icon-shanchu" size="26" />
                </li>
            </ul>
        </FormItem>
        <FormItem label="对齐方式">
            <ul class="operation-text-effect">
                <li class="effect-item" :class="{'active': activeData.style.textAlign === 'left'}" @click="setAlign('left')">
                    <Icon custom="iconfont icon-zuoduiqi" size="24" />
                </li>
                <li class="effect-item" @click="setAlign('center')" :class="{'active': activeData.style.textAlign === 'center'}">
                    <Icon custom="iconfont icon-juzhongduiqi" size="28" />
                </li>
                <li class="effect-item" @click="setAlign('right')" :class="{'active': activeData.style.textAlign === 'right'}">
                    <Icon custom="iconfont icon-youduiqi" size="24" />
                </li>
            </ul>
        </FormItem>
        <FormItem label="文字间距" :label-width="75">
            <Slider :min="0" :step="1" show-input v-model="activeData.style.letterSpacing"></Slider>
        </FormItem>
        <FormItem label="文字行距" :label-width="75">
            <Slider :max="1000" :min="0.1" :step="0.1" show-input v-model="activeData.style.lineHeight"></Slider>
        </FormItem>
    </div>
</template>

<script>
    import {fontSize} from '@/config'

    export default {
        name: 'pluginTextLayer',
        data() {
            return {
                fontSize,
                backgroundColor: 'rgba(0,0,0,1)',
                textAlign: 'left'
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
            },
            activeLayerIndex: Number,
            activeLayer: Object
        },
        watch: {
            activeData: {
                handler(val) {
                    if (val) {
                        const {style} = val
                        this.textAlign = style.textAlign || 'left'
                    }
                },
                immediate: true
            }
        },
        methods: {
            setAlign(align) {
                this.activeData.style.textAlign = align
            },
            setEffectFontWeight() {
                this.activeData.style.fontWeight = this.activeData.style.fontWeight && this.activeData.style.fontWeight === 'bold' ? '' : 'bold'
            },
            setEffectFontStyle() {
                this.activeData.style.fontStyle = this.activeData.style.fontStyle && this.activeData.style.fontStyle === 'italic' ? '' : 'italic'
                console.log(this.activeData.style.fontStyle)
            },
            setEffectDecoration(style) {
                this.activeData.style.textDecoration = this.activeData.style.textDecoration && this.activeData.style.textDecoration === style ? '' : style
            }
        }
    }
</script>

<style scoped lang="scss">
    .operation-text-effect {
        display: flex;
        align-items: center;
        .effect-item {
            width: 36px;
            margin-right: 2px;
            text-align: center;
            cursor: pointer;
            &:hover, &.active {
                background: rgba(255, 251, 251, 0.85);
                border-radius: 5px;
            }
        }
    }
</style>
