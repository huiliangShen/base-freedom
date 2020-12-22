import Vuex from 'vuex'
import Vue from 'vue'
// import createLogger from 'vuex/dist/logger'
import {app, user, editor} from './module'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        app,
        user,
        editor
    },
    getters,
    plugins: [] // process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
