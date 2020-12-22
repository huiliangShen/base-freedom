import types from './mutationsType'

export default {
    state: {
        scale: 1,
        showGrid: false,
        gridColumn: 10,
        adsorb: false,
        color: 'rgb(0, 255, 255, 1)',
        asideShow: true
    },
    mutations: {
        [types.CHANGE_SCALE](state, scale) {
            state.scale = scale
        },
        [types.TOGGLE_SHOW_GRID](state, show) {
            state.showGrid = show
        },
        [types.CHANGE_GRID_COLUMN](state, column) {
            state.gridColumn = column
        },
        [types.TOGGLE_SHOW_ADSORB](state, adsorb) {
            state.adsorb = adsorb
        },
        [types.CHANGE_COLOR](state, color) {
            state.color = color
        },
        [types.TOGGLE_SHOW_ASIDE](state, show = null) {
            state.asideShow = typeof show === 'object' ? !state.asideShow : show
        }
    }
}
