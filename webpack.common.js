const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
/* const webpack = require('webpack')

const resolve = (_path) => {
    return path.resolve(__dirname, _path)
} */

module.exports = {
    entry: './src/index.js',
    output: {
        // html script src add hostname
        // publicPath: 'http://www.baidu.com/',
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'imgs',
                        limit: 8192,
                        esModule: false
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test: /\.(s(a|c)ss|css)$/i,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                        },
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // auto insert entry url to index.html
            template: path.resolve(__dirname, 'index.html'),
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new VueLoaderPlugin(),
        /*  new webpack.optimize.CommonsChunkPlugin({
              name: 'common',
              minChunks: 3
          }) */
    ]
}
