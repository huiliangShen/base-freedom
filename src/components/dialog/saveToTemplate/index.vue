<template>
    <Modal v-model="show" width="360" :mask-closable="false">
        <p slot="header" style="text-align:center">
            <span>保存</span>
        </p>
        <div style="padding: 10px 20px 0">
            <Form :label-width="85" label-position="left"
                  :label-colon="true" ref="formValidate" :model="temp" :rules="ruleValidate">
                <FormItem label="布局名称" prop="name">
                    <Input placeholder="请填写布局名称" v-model="temp.name"/>
                </FormItem>
                <FormItem label="分组" prop="groupId">
                    <Select placeholder="请选择分组" v-model="temp.groupId">
                        <Option :value="item.id" v-for="(item, i) in groups" :key="i">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" long :loading="loading" @click="save('formValidate')">保存</Button>
        </div>
    </Modal>
</template>

<script>
    import domtoimage from 'dom-to-image'
    import {mapGetters} from 'vuex'
    import {uploadImg, saveLayout, getLayoutGroup} from '@/api'
    import {dataURLtoFile} from '@/helper'
    import {ERROR_CODE} from '@/api/config'

    export default {
        name: 'saveToTemplate',
        data() {
            return {
                show: false,
                loading: false,
                temp: {
                    name: '',
                    groupId: ''
                },
                groups: [],
                ruleValidate: {
                    name: [
                        {required: true, message: '请填写布局名称', trigger: 'blur'}
                    ],
                    groupId: [
                        {required: true, message: '请选择分组', trigger: 'change', type: 'number',}
                    ]
                }
            }
        },
        watch: {
            show(val) {
                if (val) {
                    this.$nextTick(() => {
                        this.$refs.formValidate.resetFields()
                        // this.model.group = this.gid || ''
                    })
                }
            }
        },
        computed: {
            ...mapGetters([
                'id',
                'data',
                'gid'
            ])
        },
        methods: {
            async open() {
                await this.getGroup()
                this.show = true
            },
            close() {
                this.show = false
            },
            getGroup() {
                return getLayoutGroup()
                    .then(res => {
                        if (res.code === ERROR_CODE) {
                            this.groups = res.data
                        } else {
                            this.$Message.error(res.message)
                        }
                    })
                    .catch(() => {
                    })
            },
            save(formName) {
                this.$refs[formName].validate()
                    .then(res => {
                        console.log(res)
                        if (!res) {
                            return
                        }
                        // this.$Message.success('保存。。。')
                        this.loading = true
                        domtoimage.toPng(document.querySelector('.makerCanvas_0 .maker-canvas-wrap'))
                            .then((url) => {
                                /* const img = new Image()
                                img.src = url
                                document.body.appendChild(img) */
                                this.upload(url)
                                // this.close()
                            })
                            .catch(function (error) {
                                console.error('oops, something went wrong!', error)
                                this.$Message.error('出错了，请稍后重试。。。')
                                this.loading = false
                            })
                    })
            },
            upload(url) {
                const file = dataURLtoFile(url, `t${new Date().getTime()}.png`)
                const form = new FormData()
                form.set('material', file)
                uploadImg(form)
                    .then(res => {
                        if (res.code === ERROR_CODE) {
                            this.saveLayout(res.data.path)
                        } else {
                            console.error(res.message)
                            this.saveLayout('')
                        }
                    })
                    .catch(() => {
                        this.loading = false
                    })
            },
            saveLayout(path) {
                const req = {
                    name: this.temp.name,
                    direction: 1,
                    resolution_ratio: '1280*720',
                    g_id: this.temp.groupId,
                    layout_url: ' ',
                    img: path,
                    id: this.id || 0,
                    description: this.data
                }
                saveLayout(req)
                    .then(res => {
                        this.loading = false
                        if (res.code === ERROR_CODE) {
                            this.$Message.success('保存成功')
                            this.close()
                        } else {
                            this.$Message.error(res.message)
                        }
                    })
                    .catch(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>

<style scoped>
</style>
