<template>
    <draw-wrap :show="show" @close="close" :mask-closable="false" :width="800">
        <template v-slot:header>
            <header class="video-show-list">
                <Icon type="md-close" size="22" @click="close"/>
                <h2>播放清单</h2>
            </header>
        </template>
        <template v-slot:default>
            <div class="show-list-content">
                <div class="show-list-operation">
                    <Button type="primary" @click="handleDelete" :loading="loading" :disabled="selection.length === 0">批量删除</Button>
                    <Button type="primary" :loading="loading" @click="addList">新增播放清单</Button>
                </div>
                <Table ref="selection" :columns="columns" :loading="loading" :data="data"
                       @on-selection-change="selectionChange">
                    <template slot-scope="{ row, index }" slot="action">
                        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                         <Button type="error" size="small" @click="remove(index)">Delete</Button>-->
                        <Icon custom="iconfont icon-edit" size="24" style="cursor: pointer" @click="update(row.id)"></Icon>
                        <Icon custom="iconfont icon-delete" size="24" @click="handleRemove(row.id)" style="cursor: pointer"></Icon>
                    </template>
                </Table>
                <div class="show-list-page-wrap">
                    <Page :total="total" show-total :current.sync="page" @on-change="changePage"/>
                </div>
            </div>
        </template>
    </draw-wrap>
</template>

<script>
    import DrawWrap from '@/common/draw'
    import {getShowList, removeShowItems} from '@/api'
    import {ERROR_CODE} from '@/api/config'

    export default {
        name: 'playListDraw',
        components: {
            DrawWrap
        },
        data() {
            return {
                show: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '清单名称',
                        key: 'name'
                    },
                    {
                        title: '节目数量',
                        key: 'num'
                    },
                    {
                        title: '制作人',
                        key: 'user_name'
                    },
                    {
                        title: '创建时间',
                        width: 180,
                        key: 'created_at'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [],
                total: 0,
                page: 1,
                selection: [],
                loading: false
            }
        },
        methods: {
            _init() {
                this.page = 1
                this.getList()
                this.selection = []
            },
            showList() {
                this.show = true
                this._init()
            },
            close() {
                this.show = false
                this.$emit('listRefresh')
            },
            changePage() {
                this.getList()
            },
            getList() {
                this.loading = true
                getShowList({page: this.page})
                    .then(res => {
                        this.loading = false
                        if (res.code === ERROR_CODE) {
                            this.data = res.data.list
                            this.total = res.data.total
                        }
                    })
                    .catch(() => {
                        this.loading = false
                    })
            },
            handleDelete() {
                if (this.selection.length === 0) {
                    this.$Message.warning('请选择需要删除的项')
                    return false
                }
                this.$Modal.confirm({
                    title: '确定要删除吗',
                    content: '删除后无法恢复',
                    loading: true,
                    onOk: () => {
                        this.remove({id: this.selection.join(',')})
                    }
                })
            },
            handleRemove(id) {
                this.$Modal.confirm({
                    title: '确定要删除吗',
                    content: '删除后无法恢复',
                    loading: true,
                    onOk: () => {
                        this.remove({id: id})
                    }
                })

            },
            selectionChange(status) {
                this.selection = [...new Set([...this.selection, ...status].map(e => e.id))].filter(e => !!e)
            },
            remove(ids) {
                this.loading = true
                removeShowItems(ids)
                    .then(res => {
                        this.loading = false
                        if (res.code === ERROR_CODE) {
                            this.$Message.success('删除成功')
                            this._init()
                        } else {
                            this.$Message.error(res.message)
                        }
                        this.$Modal.remove()
                    })
                    .catch(() => {
                        this.loading = false
                        this.$Modal.remove()
                    })
            },
            addList() {
                this.$emit('addList')
            },
            update(id) {
                this.$emit('updateShowItem', id)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/css/variable.scss';

    .video-show-list {
        height: 58px;
        line-height: 58px;
        color: #fff;
        background: $theme-bg;

        h2 {
            text-align: center;
            font-size: $l-font-size;
        }

        .ivu-icon {
            float: right;
            margin-right: 24px;
            padding-top: 16px;
            color: #fff;
            cursor: pointer;
        }
    }

    .show-list-operation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 68px;
        padding: 0 20px;

        .ivu-btn {

            &:last-child {
                margin-left: 18px;
            }
        }
    }

    .show-list-page-wrap {
        padding: 15px 0;
        text-align: center;
    }
</style>
