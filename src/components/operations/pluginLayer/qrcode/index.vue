<template>
    <div class="operation-qrcode-layer">
        <FormItem label="二维码链接" :label-width="90">
            <Input placeholder="请输入二维码链接" type="textarea" v-model="activeData.url"/>
        </FormItem>
    </div>
</template>

<script>
    export default {
        name: 'pluginCodeLayer',
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
