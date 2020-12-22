const merge = require('webpack-merge')
const common = require('./webpack.common')
// const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    // source-map -> run project will add .map file
    // inline-source-map -> run project will not add .map file, but contains in .js file
    // cheap-inline-source-map -> run project will not add .map file, but contains in .js file, when error will not console column only show row. 报错信息不会包含列信息，只包含行信息
    // cheap-module-source-map 包含第三方模块的映射
    // eval 打包速度最快，提示全
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ],
        splitChunks: {
            name: 'common',
            minChunks: 3
        }
    }
})
