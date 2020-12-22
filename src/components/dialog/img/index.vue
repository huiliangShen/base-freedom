<template>
    <Modal :footer-hide="true" :value="imgDialogShow" width="910" @on-cancel="close">
        <p slot="header" style="text-align:center">
            <span>选择图片</span>
        </p>
        <div class="img-dialog-content">
            <Row>
                <Col>
                    <ul class="group-wrap">
                        <li class="group-item" v-for="(g, i) in group" :key="i" :class="{'active': selected === i}"
                            @click="selectGroup(i)">{{g.name}}
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row :gutter="18" v-if="imgs.length > 0">
                <Col v-for="(item, i) in imgs" :key="i" :span="6">
                    <img v-lazy="item.path" alt="" height="135" width="100%" @click="addItem(item)">
                </Col>
            </Row>
            <div style="text-align: center" v-if="imgs.length > 0">
                <Page :total="total" :current.sync="page" @on-change="changePage"/>
            </div>
            <div class="img-dialog-content" v-else>
                <h2 style="text-align: center">暂无数据</h2>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import types from '@/store/module/app/mutationsType'
    import {getGroup, getImages} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {config} from '@/config'

    export default {
        name: 'imgDialog',
        data() {
            return {
                page: 1,
                total: 0,
                imgs: [],
                group: [],
                spinShow: false,
                selected: 0
            }
        },
        computed: {
            ...mapGetters([
                'imgDialogShow',
                'imgChange',
                'imgAreaType',
                'uid'
            ])
        },
        watch: {
            imgDialogShow(val) {
                if (val) {
                    this.page = 1
                    this.selected = 0
                    this.imgs = []
                    this.group = []
                    this.getGroupList()
                    this.getImgs()
                }
            }
        },
        methods: {
            close() {
                this[types.SHOW_IMG_DIALOG]({flag: false})
            },
            selectGroup(i) {
                if (this.selected === i) {
                    return
                }
                this.selected = i
                this.page = 1
                this.getImgs()
            },
            getGroupList() {
                getGroup()
                    .then(res => {
                        if (res.code === ERROR_CODE) {
                            this.group = []
                            for (const v of res.data) {
                                this.group.push({
                                    id: v.id,
                                    name: v.name
                                })
                            }
                            this.group = this.group.filter((e) => e.id >= 0)
                        }
                    })
            },
            getImgs() {
                this.spinShow = true
                const req = {
                    page: this.page,
                    group: this.group.length > 0 ? this.group[this.selected].id : 0,
                    uid: 0,
                    pageSize: 8,
                    type: 1,
                    share: 0,
                    state: 1
                }
                getImages(req)
                    .then(res => {
                        this.spinShow = false
                        if (res.code === ERROR_CODE) {
                            this.imgs = res.data.list.map(e => {
                                e.path = `${config.host}${e.path}`
                                return e
                            })
                            this.total = res.data.total
                        }
                    })
                    .catch(() => {
                        this.spinShow = false
                    })
            },
            changePage() {
                this.getImgs()
            },
            addItem(item) {
                // console.log(item)
                item.src = item.path
                switch (this.imgAreaType) {
                    case 0:
                        this.addLayer({
                            type: 'img', data: {
                                path: item.path,
                                src: item.path,
                                name: item.name
                            }
                        })
                        break
                    case 1:
                        this.setPageBg(item.src)
                        break
                    case 2:
                        this.setVideoBg(item.src)
                        break
                }
                this.close()
            },
            ...mapMutations([
                types.SHOW_IMG_DIALOG
            ]),
            ...mapActions([
                'addLayer',
                'setPageBg',
                'setVideoBg'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/css/variable';

    .img-dialog-content {
        padding: 16px;
        overflow: hidden;

        .ivu-col {
            margin-bottom: 12px;

            img {
                cursor: pointer;
            }
        }

        .group-wrap {
            position: relative;
            overflow-y: auto;
            user-select: none;

            .group-item {
                float: left;
                padding: 10px 23px;
                font-size: 16px;
                font-weight: 500;
                border: 1px solid rgba(0, 0, 0, 0);
                cursor: pointer;

                &.active {
                    color: $theme-bg;
                    border: 1px solid $theme-bg;
                }
            }
        }
    }
</style>
