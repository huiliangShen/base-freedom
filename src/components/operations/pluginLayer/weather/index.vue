<template>
    <div class="operation-weather-layer">
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
        <FormItem label="地区">
            <Cascader :data="data" v-model="activeData.area"></Cascader>
        </FormItem>
    </div>
</template>

<script>
    import {getPC} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {fontSize} from '@/config'
    import area from '@/helper/area.json'
    export default {
        name: 'pluginWeatherLayer',
        data() {
            return {
                data: [],
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
            getArea() {
                getPC()
                    .then(res => {
                        if (res.code === ERROR_CODE) {
                            this.data = res.data.map(item => {
                                return {
                                    value: item.name,
                                    label: item.name,
                                    children: item.children.map(c => ({
                                        value: c.name,
                                        label: c.name
                                    }))
                                }
                            })
                        }
                    })
            },
            setData(data) {
                this.data = data.map(item => {
                    return {
                        value: item.name,
                        label: item.name,
                        children: item.children.map(c => ({
                            value: c.name,
                            label: c.name
                        }))
                    }
                })
            }
        },
        mounted() {
            // this.getArea()
            this.setData(area)
        }
    }
</script>

<style scoped>

</style>
