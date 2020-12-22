<template>
    <div class="operation-run-layer">
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
        <FormItem label="文字间距" :label-width="75">
            <Slider :min="0" :step="1" show-input v-model="activeData.style.letterSpacing"></Slider>
        </FormItem>
        <FormItem label="文字行距" :label-width="75">
            <Slider :max="1000" :min="0.1" :step="0.1" show-input v-model="activeData.style.lineHeight"></Slider>
        </FormItem>
        <FormItem label="滚动方向" :label-width="75">
            <Select v-model="activeData.direction">
                <Option v-for="(item, i) in directions" :key="i" :value="item.val">{{item.label}}</Option>
            </Select>
        </FormItem>
        <FormItem label="滚动速度" :label-width="75">
            <InputNumber v-model="activeData.speed" :step="1" :min="1"/>
        </FormItem>
    </div>
</template>

<script>
    import {fontSize, directions} from '@/config'

    export default {
        name: 'pluginRunLayer',
        data() {
            return {
                fontSize,
                directions
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
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

<style scoped>

</style>
