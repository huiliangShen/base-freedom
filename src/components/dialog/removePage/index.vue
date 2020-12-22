<template>
    <Modal v-model="show" width="300">
        <p slot="header" style="text-align:center">
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除第{{i+1}}页吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="primary" @click="confirm()">确定</Button>
            <Button type="warning" @click="cancel()">取消</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: 'removePage',
        data() {
            return {
                i: 0,
                show: false
            }
        },
        methods: {
            open(i) {
                this.i = i
                this.show = true
            },
            cancel() {
                this.show = false
            },
            confirm() {
                this.$Message.success('删除成功')
                this.cancel()
                this.$emit('confirmRemovePage', this.i)
            }
        }
    }
</script>

<style scoped>

</style>
