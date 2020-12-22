import Vue from 'vue'
import ViewUI from 'view-design'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'
import '../mock'

import 'view-design/dist/styles/iview.css'
import '@/assets/css/common.scss'
import '@/assets/fonts/iconfont.scss'
import './index.scss'

Vue.config.productionTip = false
/* eslint-disable */
Vue.use(ViewUI)
Vue.use(VueLazyload, {
    error: require('@/assets/imgs/default.png')
})

new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount('#app')
