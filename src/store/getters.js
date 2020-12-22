const getters = {
    data: (state) => state.app.data,
    activePage: (state) => state.app.activePage,
    activeLayer: (state) => state.app.activeLayer,
    activeLayerIndex: (state) => state.app.activeLayerIndex,
    imgDialogShow: (state) => state.app.imgDialogShow,
    dragging: (state) => state.app.dragging,
    cropperImgDialogShow: (state) => state.app.cropperImgDialogShow,
    cropperBgDialogShow: (state) => state.app.cropperBgDialogShow,
    imgAreaType: (state) => state.app.imgAreaType,
    musicList: (state) => state.app.musicList,
    pages: (state) => state.app.data.pages,
    scale: (state) => state.editor.scale,
    showGrid: (state) => state.editor.showGrid,
    gridColumn: (state) => state.editor.gridColumn,
    adsorb: (state) => state.editor.adsorb,
    color: (state) => state.editor.color,
    asideShow: (state) => state.editor.asideShow,
    uid: (state) => state.user.uid,
    id: (state) => state.user.id,
    gid: (state) => state.user.gid
}

export default getters
