<template>
    <div class="operation-time-layer">
        <FormItem label="时间格式" :label-width="75">
            <Select v-model="activeData.type">
                <Option v-for="(item, i) in timeFormat" :key="i" :value="item.val">{{item.label}}</Option>
            </Select>
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
    </div>
</template>

<script>
    import {timeFormat, fontSize} from '@/config'
    export default {
        name: 'pluginTimeLayer',
        data() {
            return {
                timeFormat,
                fontSize
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>

</style>
