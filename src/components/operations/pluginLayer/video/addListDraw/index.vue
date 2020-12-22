<template>
    <draw-wrap :show="show" @close="close" :mask-closable="false" :width="width" :zIndex="zIndex">
        <template v-slot:default>
            <Row class="add-list-wrap" :gutter="3">
                <Col :span="12">
                    <div class="left-list-panel">
                        <div class="list-panel-header">
                            <h2>添加节目</h2>
                            <div class="header-search">
                                <div class="header-left">
                                    <label><b style="color: red;">*</b>名称：</label>
                                    <!--<span>春节节目</span>-->
                                    <Input placeholder="请填写播放清单名称" v-model="detail.name" style="width: 150px;"/>
                                </div>
                                <div class="header-right">
                                    <div class="select-wrap">
                                        <label>类型：</label>
                                        <Select v-model="search.type" @on-change="searchChange" :disabled="originData.length === 0">
                                            <Option v-for="(item, i) in types" :key="i" :value="item.val">
                                                {{item.name}}
                                            </Option>
                                        </Select>
                                    </div>
                                    <Button type="primary" @click="clearAll" :disabled="originData.length === 0">清空列表</Button>
                                    <Input suffix="ios-search" placeholder="搜索节目名称" style="width: 136px"
                                           v-model="search.name" @on-enter="searchChange" :disabled="originData.length === 0"/>
                                </div>
                            </div>
                        </div>
                        <div class="list-panel-content">
                            <Table :columns="columns" :data="data" :height="tableHeight">
                                <template slot-scope="{ row }" slot="type">
                                    <span v-if="row.type === 3">节目</span>
                                    <span v-else-if="row.type === 2">视频</span>
                                    <span v-else>图片</span>
                                </template>
                                <template slot-scope="{row, index}" slot="timerList">
                                    <InputNumber size="small" v-model="row.hour" style="width: 60px" :step="1" :min="0"
                                                 @on-change="(v) => changeHour(v, 1, index)"></InputNumber>
                                    时
                                    <InputNumber size="small" style="width: 60px" v-model="row.min" :step="1" :min="0"
                                                 @on-change="(v) => changeHour(v, 2, index)"
                                                 :max="59"></InputNumber>
                                    分
                                    <InputNumber size="small" style="width: 60px" v-model="row.second" :max="59"
                                                 :min="0" @on-change="(v) => changeHour(v, 3, index)"
                                                 :step="1"></InputNumber>
                                    秒
                                </template>
                                <template slot-scope="{row, index}" slot="action">
                                    <div style="display: flex;justify-content: space-around">
                                        <img src="./imgs/up.png" alt="" v-show="index > 0" style="cursor: pointer"
                                             @click="up(1, index, row)">
                                        <img src="./imgs/down.png" alt=""
                                             v-show="index < data.length - 1 && data.length > 1" style="cursor: pointer"
                                             @click="up(-1, index, row)">
                                        <img src="./imgs/remove.png" alt="" style="cursor: pointer"
                                             @click="removeItem(index)">
                                    </div>
                                </template>
                            </Table>
                        </div>
                        <div class="list-panel-footer">
                            <Button type="primary" class="padding-btn" @click="save" :loading="saving">确定</Button>
                            <Button type="warning" class="padding-btn" @click="close" :loading="saving">取消</Button>
                        </div>
                        <Spin size="large" fix v-if="leftSpinShow"></Spin>
                    </div>
                </Col>
                <Col :span="12">
                    <div class="right-list-panel tabs-style">
                        <Tabs type="card" :animated="false" v-model="tabName" @on-click="tabClick">
                            <TabPane v-for="(item, i) in tabs" :key="i" :label="item.name">
                                <div class="right-list-content">
                                    <div class="header-search">
                                        <Input suffix="ios-search" placeholder="请输入名称" style="width: 136px"
                                               v-model="searchText" @on-enter="searchRightChange"/>
                                    </div>
                                    <div class="tabs">
                                        <ul class="tabs-wrap">
                                            <li class="tabs-item" @click="changeGroup(item.id)"
                                                :class="{'active': item.id === selected}"
                                                v-for="(item, i) in groups" :key="i">{{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="media-list-wrap">
                                        <Row :gutter="20">
                                            <Col :span="6" v-for="(item, i) in list" :key="i">
                                                <div class="media-item">
                                                    <div class="item-img">
                                                        <img src="./imgs/default.png" alt="" v-if="!item.src">
                                                        <img :src="item.src" alt="" v-else width="100%" height="100%">
                                                        <div class="operation-wrap">
                                                            <a class="custom-btn" @click="handlePreview(item)">预览</a>
                                                            <a class="custom-btn add"
                                                               v-if="data.filter(e => e.id === item.id).length > 0">已添加</a>
                                                            <a class="custom-btn" @click="addItem(item)" v-else>添加</a>

                                                        </div>
                                                    </div>
                                                    <div class="item-detail">
                                                        {{item.name}}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="media-list-page">
                                        <Page :total="total" show-total @on-change="changePage"/>
                                    </div>
                                </div>
                                <Spin size="large" fix v-if="rightSpinShow"></Spin>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
            <Modal v-model="preview" :zIndex="2000" :width="650">
                <p slot="header" style="color:#fff;text-align:left">
                    <span>预览</span>
                </p>
                <div class="preview-content" v-if="preview">
                    <video :src="previewItem.path" v-if="previewItem.type === 2" controls width="100%"></video>
                    <img :src="previewItem.path" alt="" v-else-if="previewItem.type === 1" width="100%">
                </div>
                <div slot="footer">
                    <Button @click="handleClose">关闭</Button>
                </div>
            </Modal>
        </template>
    </draw-wrap>
</template>

<script>
    import DrawWrap from '@/common/draw'
    import {groupList, getShowItem, getPrograms, addShow, getProgramGroup, getGroup, getImages} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {getHMS} from '@/helper'
    import {config} from '@/config'

    export default {
        name: 'addListDraw',
        data() {
            return {
                show: false,
                width: 1600,
                tableHeight: 500,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '节目名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '节目类型',
                        width: 120,
                        slot: 'type',
                        align: 'center'
                    },
                    {
                        title: '轮播时长',
                        width: 350,
                        slot: 'timerList',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: 150,
                    }
                ],
                data: [],
                originData: [],
                types: [
                    {
                        val: 0,
                        name: '全部'
                    },
                    {
                        val: 3,
                        name: '节目'
                    },
                    {
                        val: 2,
                        name: '视频'
                    },
                    {
                        val: 1,
                        name: '图片'
                    }
                ],
                search: {
                    type: 0,
                    name: ''
                },
                detail: {},
                leftSpinShow: false,
                tabs: [
                    {
                        name: '节目',
                        val: 3
                    },
                    {
                        name: '视频',
                        val: 2
                    },
                    {
                        name: '图片',
                        val: 1
                    }
                ],
                groups: [],
                selected: 0,
                tabName: 0,
                page: 1,
                total: 0,
                list: [],
                rightSpinShow: false,
                searchText: '',
                saving: false,
                preview: false,
                previewItem: {}
            }
        },
        props: {
            zIndex: {
                type: Number,
                default: 1000
            }
        },
        components: {
            DrawWrap
        },
        methods: {
            resize() {
                const width = document.body.clientWidth
                if (width > 1600) {
                    this.width = 1800
                } else if (width < 1600) {
                    this.width = width
                }
            },
            setTableHeight() {
                const wrapHeight = document.querySelector('.left-list-panel').clientHeight || 0
                const footerHeight = document.querySelector('.list-panel-footer').clientHeight || 0
                const headerHeight = document.querySelector('.list-panel-header').clientHeight || 0
                this.tableHeight = wrapHeight - footerHeight - headerHeight
            },
            async showList(id) {
                this.resize()
                this.show = true
                // 设置table高度
                this.$nextTick(() => {
                    this.setTableHeight()
                })
                // 有id传入 证明是修改
                if (id) {
                    this.updateId = id || 0
                    this.getDetail()
                }
                // 右侧数据获取
                // 设置类别
                this.tabName = 0
                await this.getGroup()
                this.getList()
            },
            async tabClick() {
                await this.getGroup()
                this.getList()
            },
            getGroup() {
                let api
                switch (this.tabName) {
                    case 0:
                        api = getProgramGroup
                        break
                    case 1:
                        api = getGroup
                        break
                    case 2:
                        api = getGroup
                        break
                    default:
                        break
                }
               return api()
                    .then(res => {
                        if (res.code === ERROR_CODE) {
                            // debugger
                            if (Array.isArray(res.data)) {
                                this.groups = res.data
                            } else {
                                let group = []
                                for (const key in res.data) {
                                    group.push({
                                        id: +key,
                                        name: res.data[key]
                                    })
                                }
                                this.groups = group.filter(e => e.id > -1)
                            }
                            this.selected = this.groups[0].id
                        }
                    })
            },
            changeGroup(id) {
                this.selected = id
                this.page = 1
                this.getList()
            },
            changePage() {
                this.getList()
            },
            getList() {
                let api
                let query
                switch (this.tabName) {
                    case 0:
                        api = getPrograms
                        query = {
                            page: this.page,
                            name: this.searchText,
                            group: this.selected || 0,
                            type: 3
                        }
                        break
                    case 1:
                        api = getImages
                        query = {
                            page: this.page,
                            group: this.selected || 0,
                            uid: 0,
                            pageSize: 12,
                            type: 2,
                            share: 0,
                            state: 1,
                            name: this.searchText
                        }
                        break
                    case 2:
                        api = getImages
                        query = {
                            page: this.page,
                            group: this.selected || 0,
                            uid: 0,
                            pageSize: 12,
                            type: 1,
                            share: 0,
                            state: 1,
                            name: this.searchText
                        }
                        break
                    default:
                        break
                }
                this.rightSpinShow = true
                api(query)
                    .then(res => {
                        this.rightSpinShow = false
                        if (res.code === ERROR_CODE) {
                            this.list = res.data.list.map(e => {
                                if (e.type === 1) {
                                    e.src = e.path ? `${config.host}${e.path}` : ''
                                    e.url = e.path
                                } else if (e.type === 2) {
                                    e.src = e.thumb ? `${config.host}${e.thumb}` : ''
                                    e.url = e.path
                                } else {
                                    e.src = e.thumb ? `${config.host}${e.thumb}` : ''
                                    e.url = e.program_url || ''
                                }
                                return e
                            })
                            this.total = res.data.count
                        }
                    })
                    .catch(() => {
                        this.rightSpinShow = false
                    })
            },
            searchChange() {
                this.data = this.search.name ? this.originData.filter(e => e.name.indexOf(this.search.name) > -1) : this.originData.slice(0)
                this.data = this.search.type ? this.data.filter(e => e.type === this.search.type) : this.data.slice(0)
            },
            searchRightChange() {
                this.page = 1
                this.getList()
            },
            getDetail() {
                this.leftSpinShow = true
                getShowItem({id: this.updateId})
                    .then(res => {
                        this.leftSpinShow = false
                        if (res.code === ERROR_CODE) {
                            this.detail = res.data
                            this.data = []
                            for (const item of res.data.program_list) {
                                const timers = getHMS(item.timer)
                                item.hour = timers[0]
                                item.min = timers[1]
                                item.second = timers[2]
                                this.data.push(item)
                                this.originData = this.data.slice(0)
                            }
                        }
                    })
                    .catch(() => {
                        this.leftSpinShow = false
                    })
            },
            changeHour(val, type, index) {
                if (type === 1) {
                    this.data[index].hour = val
                } else if (type === 2) {
                    this.data[index].min = val
                } else {
                    this.data[index].second = val
                }

                const obj = this.data[index]
                let oIndex = -1
                this.originData.forEach((e, i) => {
                    if (e.id === obj.id) {
                        oIndex = i
                        return
                    }
                })
                this.originData.splice(oIndex, 1, obj)
                // this.originData = this.data.slice(0)
            },
            up(step, i, row) {
                this.data.splice(i, 1)
                this.data.splice(i - step, 0, row)

                this.originData = this.data.slice(0)
            },
            removeItem(i) {
                this.data.splice(i, 1)
            },
            addItem(item) {
                const timers = getHMS(item.timer)
                item.hour = timers[0]
                item.min = timers[1]
                item.second = timers[2]
                this.data.push(item)

                this.originData = this.data.slice(0)
            },
            clearAll() {
                this.data = []

                this.originData = this.data.slice(0)
            },
            save() {
                if (!this.detail.name) {
                    this.$Message.warning('请填写播放清单名称')
                    return false
                }

                // console.log(this.data)
                if (this.data.length === 0) {
                    this.$Message.warning('请选择素材节目')
                    return false
                }

                const req = {
                    name: this.detail.name,
                    num: this.data.length,
                    program_list: this.data.map(e => {
                        const timer = e.hour * 3600 + e.min * 60 + e.second
                        return {
                            id: e.id,
                            name: e.name,
                            timer: Math.floor(timer),
                            url: e.url,
                            type: e.type
                        }
                    }),
                    id: this.detail.id || 0
                }

                this.saving = true
                addShow(req)
                    .then(res => {
                        this.saving = false
                        if (res.code === ERROR_CODE) {
                            this.$Message.success('操作成功')
                            this.close()
                            this.$emit('refresh')
                        }
                    })
                    .catch(() => {
                        this.saving = false
                    })
            },
            close() {
                this.show = false
            },
            handleClose() {
                this.preview = false
            },
            handlePreview(item) {
                if (item.type === 3) {
                    window.open(`${config.host}${item.program_url}`)
                } else {
                    this.previewItem = {
                        path: item.path ? `${config.host}${item.path}` : '',
                        type: item.type
                    }
                    this.preview = true
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/css/variable.scss';
    @import '~@/assets/css/mixins.scss';

    .add-list-wrap {
        height: 100%;

        .ivu-col {
            height: 100%;

            .left-list-panel {
                height: 100%;
                box-shadow: 0 4px 10px 0 rgba(173, 179, 184, 0.79);

                .list-panel-header {
                    padding: 9px 38px 0;

                    h2 {
                        font-size: $l-font-size;
                        font-weight: 500;
                        color: rgba(58, 125, 235, 1);
                    }

                    .header-search {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 30px 0 16px 0;

                        .header-left {
                            font-size: $nl-font-size;
                        }

                        .header-right {
                            display: flex;
                            justify-content: flex-end;

                            .select-wrap {
                                display: flex;
                                align-items: center;
                                margin-right: 20px;

                                label {
                                    width: 80px;
                                    font-size: $n-font-size;
                                }
                            }

                            .ivu-btn {
                                margin-right: 20px;
                            }
                        }
                    }
                }

                .list-panel-footer {
                    height: 97px;
                    line-height: 97px;
                    padding: 0 50px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .ivu-btn:first-child {
                        margin-right: 45px;
                    }
                }
            }

            .right-list-panel {
                height: 100%;
                box-shadow: 0 4px 10px 0 rgba(173, 179, 184, 0.79);

                .right-list-content {
                    padding: 0 35px;
                    overflow-y: hidden;
                }

                .header-search {
                    display: flex;
                    justify-content: flex-end;
                    padding-bottom: 17px;
                }

                .tabs {
                    width: 100%;

                    .tabs-wrap {
                        height: 34px;
                        overflow-x: scroll;
                        overflow-y: hidden;
                        white-space: nowrap;
                        font-size: 0;

                        .tabs-item {
                            display: inline-block;
                            width: 110px;
                            height: 34px;
                            line-height: 34px;
                            text-align: center;
                            background: #EEEEEE;
                            font-size: $nl-font-size;
                            cursor: pointer;

                            &.active {
                                background: $theme-bg;
                                color: #fff;
                            }
                        }
                    }
                }

                .media-list-wrap {
                    padding-bottom: 20px;

                    .media-item {
                        width: 100%;
                        margin-top: 20px;
                        overflow: hidden;
                        box-shadow: 0 0 9px 0 rgba(192, 184, 184, 0.42);

                        .item-img {
                            transition: all .5s;
                            position: relative;
                            height: 158px;
                            overflow: hidden;

                            .operation-wrap {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(49, 49, 49, 0.43);
                                opacity: 0;
                                visibility: hidden;

                                .custom-btn {
                                    width: 93px;
                                    padding: 6px 0;
                                    border: 1px solid #fff;
                                    text-align: center;
                                    color: #fff;
                                    font-size: $n-font-size;

                                    & + .custom-btn {
                                        margin-top: 12px;
                                    }

                                    &:hover, &.add {
                                        color: $theme-bg;
                                        border-color: $theme-bg;
                                    }
                                }
                            }

                            &:hover {
                                .operation-wrap {
                                    opacity: 1;
                                    visibility: visible;
                                }
                            }
                        }

                        .item-detail {
                            padding: 10px 0;
                            text-align: center;
                            font-size: $n-font-size;
                            @include text-ellipsis;
                        }
                    }
                }

                .media-list-page {
                    text-align: center;
                }
            }
        }
    }
</style>
<style lang="scss">
    @import '~@/assets/css/variable.scss';

    .tabs-style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        margin-right: 0;
        padding-left: 35px;
        padding-right: 35px;
        border-radius: 0;
        background: #fff;
    }

    .tabs-style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        color: $theme-bg;
    }
</style>
