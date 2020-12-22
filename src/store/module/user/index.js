/* eslint-disable */
import {Message} from 'view-design'
import {getLayoutDetail} from '@/api'
import {ERROR_CODE} from '@/api/config'
import {data} from '@/config'
import types from './mutationsType'
import appTypes from '../app/mutationsType'

export default {
    state: {
        id: 0,
        uid: 0,
        gid: 0,
        name: '',
        resolution: ''
    },
    mutations: {
        [types.SET_VALUE](state, {id, uid, gid}) {
            state.id = id || 0
            state.uid = uid
            state.gid = gid
        },
        [types.SET_DETAIL](state, {name, resolution}) {
            state.name = name
            state.resolution = resolution
        }
    },
    actions: {
        init({commit}, {id, uid, gid}) {
            if (!id) {
                commit(types.SET_VALUE, {id, uid, gid})

                commit(types.SET_DETAIL, {name: '', resolution: ''})
                commit(appTypes.SET_DATA, JSON.parse(JSON.stringify(data)))
                // return Promise.resolve()
            } else {
                return new Promise((resolve) => {
                    getLayoutDetail({id})
                        .then((res) => {
                            if (res.code === ERROR_CODE) {
                                const {data} = res
                                commit(appTypes.SET_DATA, data.description)
                                commit(types.SET_DETAIL, {name: data.name, resolution: data.resolution_ratio})
                                commit(types.SET_VALUE, {id, uid, gid})
                            } else {
                                Message.error(res.message)
                            }
                            resolve('')
                        })
                })
            }
        }
    }
}
