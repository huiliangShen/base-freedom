<template>
    <div class="operation-btn-link-layer">
        <collapse-panel>
            <template v-slot:header>交互设置</template>
            <template v-slot:default>
                <Form :label-width="75" :label-colon="true" class="operation-btn-link-panel">
                    <FormItem label="点击跳转">
                        <Select placeholder="请选择" v-model="activeData.jumpType">
                            <Option :value="item.val" v-for="(item, i) in clickItems" :key="i">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="链接地址" v-if="activeData.jumpType === 1">
                        <Input placeholder="请填写链接地址" v-model="activeData.url"/>
                    </FormItem>
                    <FormItem label="跳转页面" v-else-if="activeData.jumpType === 2">
                        <Select placeholder="请填写跳转页面" v-model="activeData.page">
                            <Option value="1" v-for="(item, i) in jumpList" :key="i">{{`第${item}页`}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </template>
        </collapse-panel>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import CollapsePanel from '@/common/collapsePanel'
    import {clickItems} from '@/config'

    export default {
        name: 'pluginBtnLinkLayer',
        data() {
            return {
                clickItems
            }
        },
        computed: {
            ...mapGetters([
                'pages',
                'activePage'
            ]),
            jumpList() {
                if (this.activePage > -1) {
                    return this.pages.map((e, i) => i !== this.activePage && (i + 1)).filter(e => typeof e === 'number')
                }
                return []
            }
        },
        props: {
            activeData: {
                type: Object,
                default: {}
            },
            activeLayerIndex: Number
        },
        components: {
            CollapsePanel
        }
    }
</script>

<style scoped lang="scss">
    .operation-btn-link-layer {
        .operation-btn-link-panel {
            padding: 0 20px;
        }
    }
</style>
