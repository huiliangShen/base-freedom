<template>
    <div class="operation-btn-layer">
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
                <li class="effect-item" @click="setEffectFontWeight()"
                    :class="{'active': activeData.style.fontWeight && activeData.style.fontWeight === 'bold'}">
                    <Icon custom="iconfont icon-jiacu" size="24" style="margin-top: 5px"/>
                </li>
                <li class="effect-item" @click="setEffectFontStyle()"
                    :class="{'active': activeData.style.fontStyle && activeData.style.fontStyle === 'italic'}">
                    <Icon custom="iconfont icon-qingxie" size="24"/>
                </li>
            </ul>
        </FormItem>
        <FormItem label="文字间距" :label-width="75">
            <Slider :min="0" :step="1" show-input v-model="activeData.style.letterSpacing"></Slider>
        </FormItem>
    </div>
</template>

<script>
    import {fontSize} from '@/config'

    export default {
        name: 'pluginBtnLayer',
        data() {
            return {
                fontSize
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            setEffectFontWeight() {
                this.activeData.style.fontWeight = this.activeData.style.fontWeight && this.activeData.style.fontWeight === 'bold' ? '' : 'bold'
            },
            setEffectFontStyle() {
                this.activeData.style.fontStyle = this.activeData.style.fontStyle && this.activeData.style.fontStyle === 'italic' ? '' : 'italic'
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
