<template>
    <header>
        <ul class="maker-components-list">
            <li class="maker-components-item" v-for="(item, i) in headers" :ke="i" @click="showDialog(item)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </header>
</template>

<script>
    import {headers} from '@/config'
    import {getMusic} from '@/api'
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    import types from '@/store/module/app/mutationsType'
    import editorTypes from '@/store/module/editor/mutationsType'
    import {ERROR_CODE} from '@/api/config'

    export default {
        name: 'myHeader',
        data() {
            return {
                headers
            }
        },
        computed: {
            ...mapGetters([
                'musicList'
            ])
        },
        methods: {
            showDialog(item) {
                const {type} = item
                switch (type) {
                    case 'img': {
                        this[types.SHOW_IMG_DIALOG]({flag: true})
                        // 设置是否是修改
                        this[types.SET_CHANGE_IMG](false)
                        break
                    }
                    case 'text': {
                        this.addText()
                        break
                    }
                    case 'qrcode': {
                        this.addQRCode()
                        break
                    }
                }
            },
            addText() {
                const data = {
                    text: '请输入文本内容',
                    style: {
                        letterSpacing: 0,
                        color: 'rgba(0,0,0,1)',
                        textDecoration: 'normal',
                        textAlign: 'left',
                        fontSize: 18,
                        lineHeight: 1.5,
                        fontWeight: '',
                        fontStyle: ''
                    },
                    originalWidth: 130,
                    originalHeight: 27
                }
                this.addLayer({type: 'text', data})
            },
            getMusicList() {
                if (this.musicList.length) {
                    this.addMusic()
                } else {
                    const req = {
                        page: 1,
                        uid: 0,
                        type: 6,
                        share: 0,
                        state: 1,
                        show: 1
                    }
                    getMusic(req)
                        .then(res => {
                            if (res.code === ERROR_CODE) {
                                this[types.SET_MUSIC_LIST](res.data.list)
                                this.addMusic()
                            }
                        })
                }
            },
            addQRCode() {
                const data = {
                    url: 'http://www.baidu.com',
                    originalWidth: 150,
                    originalHeight: 150
                }
                this.addLayer({type: 'qrcode', data})
            },
            addRun() {
                const data = {
                    text: '这是跑马灯文字',
                    direction: 'left',
                    style: {
                        letterSpacing: 0,
                        color: 'rgba(0,0,0,1)',
                        fontSize: 16,
                        lineHeight: 1.5,
                        fontWeight: '',
                        fontStyle: ''
                    },
                    originalWidth: 300,
                    originalHeight: 20
                }
                this.addLayer({type: 'run', data})
            },
            ...mapMutations([
                types.SHOW_IMG_DIALOG,
                types.SET_CHANGE_IMG,
                types.SET_MUSIC_LIST,
                editorTypes.TOGGLE_SHOW_ASIDE
            ]),
            ...mapActions([
                'addMusic',
                'addLayer'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable.scss";
    @import "../../assets/css/mixins.scss";

    header {
        height: 60px;
        padding: 0 0 0 20px;
        background: $header-bg;
        color: $font-color;
        user-select: none;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.65);

        // overflow: hidden;
        nav {
            float: left;
            line-height: 60px;
            font-weight: bold;
        }

        .maker-components-list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            min-width: 300px;
            margin: auto;

            & > .maker-components-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 30px;
                border: 1px solid #E5E5E5;
                font-size: $n-font-size;
                font-weight: 500;
                color: $font-color;
                cursor: pointer;
                transition: transform .2s;

                .item-img {
                    /*height: 17px;
                    margin-bottom: 6px;*/
                    text-align: center;
                    overflow: hidden;

                    &.last {
                        height: 17px;
                        margin-bottom: 6px;
                    }

                    img {
                        display: block;
                        height: 17px;
                        margin: auto;
                    }

                    img:first-child {
                        transform: translateY(0);
                    }

                    img:last-child {
                        transform: translateY(0);
                    }
                }


                &:hover {
                    color: #fff;
                    background: $theme-bg;

                    .item-img {
                        img {
                            transform: translateY(-100%);
                        }
                    }
                }
            }

            .maker-components-inner-list {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                height: 60px;
                min-width: 250px;
                max-width: 300px;
                margin: auto;

                .maker-components-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 60px;
                    font-size: $n-font-size;
                    font-weight: 500;
                    color: #fff;
                    cursor: pointer;

                    &:hover {
                        border: 1px dashed;
                    }
                }
            }
        }

        .btn {
            float: right;
            line-height: 60px;
            overflow: hidden;

            .iconfont {
                color: $theme-bg;
            }
        }

        .btn-exit {
            @include left-border;
        }
    }
</style>
<style lang="scss">
    .maker-components-item {
        /*重写iview popti样式*/
        .ivu-poptip-popper {
            .ivu-poptip-content .ivu-poptip-arrow {
                &:after {
                    border-bottom-color: #707070;
                }
            }

            .ivu-poptip-inner {
                background: #707070;
            }
        }
    }
</style>
