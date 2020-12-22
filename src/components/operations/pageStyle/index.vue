<template>
    <Form class="operation-control-form page-style-wrap" label-position="left"
          :label-colon="true">
        <FormItem :label-width="0">
            <div class="bg-wrap">
                <div class="no-img" @click="addBg" v-if="!pageStyle.backgroundImage">
                    <Button>点击选择图片</Button>
                </div>
                <template v-else>
                    <div class="has-img">
                        <img :src="getImg()" alt="">
                    </div>
                </template>
            </div>
            <div class="has-footer" v-if="!!pageStyle.backgroundImage">
                <Button @click="handleClip">裁切背景</Button>
                <Button @click="handleChange">替换背景</Button>
                <Button @click="handleDelete">删除背景</Button>
            </div>
        </FormItem>
        <FormItem>
            <Select @on-change="(v) => handleSize(v, 'hoz')" v-model="pageStyle.size"
                    v-show="pageStyle.direction === 'horizontal'">
                <Option v-for="(item, i) in horizontalList" :key="i" :value="item.val">{{item.label}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <ColorPicker alpha v-model="pageStyle.backgroundColor" @on-change="handleDom"/>
        </FormItem>
    </Form>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'
    import types from '@/store/module/app/mutationsType'
    import {horizontalList} from '@/config'

    export default {
        name: 'pageStyle',
        data() {
            return {
                horizontalList
            }
        },
        props: {
            pageStyle: {
                type: Object,
                default: {}
            }
        },
        computed: {
            ...mapGetters([
                'data',
                'activePage'
            ]),
            page() {
                let {pages} = this.data
                return this.activePage > -1 ? pages[this.activePage] : null
            }
        },
        methods: {
            addBg() {
                this[types.SHOW_IMG_DIALOG]({flag: true, imgAreaType: 1})

                this[types.SET_CHANGE_IMG](false)
            },
            getImg() {
                let {backgroundImage} = this.pageStyle
                return backgroundImage
            },
            handleClip() {
                this[types.SET_CROPPER_BG](true)
            },
            handleChange() {
                this[types.SHOW_IMG_DIALOG]({flag: true, imgAreaType: 1})
                this[types.SET_CHANGE_IMG](true)
            },
            handleDelete() {
                let page = JSON.parse(JSON.stringify(this.page))
                page.style.backgroundImage = ''

                this[types.CHANGE_PAGE_INFO](page)
            },
            handleDom() {
                if (this.pageStyle.direction === 'horizontal') {
                    this.pageStyle.size = this.horizontalList[0].val
                } else {
                    this.pageStyle.size = this.verticalList[0].val
                }
                const size = this.pageStyle.size.split('X')
                this.pageStyle.width = +size[0]
                this.pageStyle.height = +size[1]

                let page = JSON.parse(JSON.stringify(this.page))
                page.style = this.pageStyle
                this[types.CHANGE_PAGE_INFO](page)
            },
            handleSize(v) {
                if (!v) {
                    v = this.pageStyle.direction === 'horizontal' ? '1280X720' : '720X1280'
                }
                const size = v.split('X')
                this.pageStyle.size = v
                this.pageStyle.width = +size[0]
                this.pageStyle.height = +size[1]
                let page = JSON.parse(JSON.stringify(this.page))
                page.style = this.pageStyle

                this[types.CHANGE_PAGE_INFO](page)
            },
            ...mapMutations([
                types.SHOW_IMG_DIALOG,
                types.CHANGE_PAGE_INFO,
                types.SET_CHANGE_IMG,
                types.SET_CROPPER_BG
            ])
        }
    }
</script>

<style scoped lang="scss">
    .page-style-wrap {
        padding: 10px 20px 0;

        .bg-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 250px;
            background: #fff;
            cursor: pointer;

            .no-img {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 98px;
                    margin-bottom: 10px;
                }

                span:last-child {
                    font-size: 14px;
                }
            }

            .has-img {
                position: relative;
                display: block;
                overflow: hidden;
                width: 100%;
                height: 100%;
                user-select: none;

                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    max-height: 100%;
                    max-width: 100%;
                }
            }
        }

        .has-footer {
            display: flex;
            justify-content: flex-start;
            margin-top: 15px;
        }
    }
</style>
