
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');

module.exports = merge(baseWebpackConfig,
    {
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            host: '127.0.0.1',
            port: 8088,
            hot: true,
            open: true,//自动打开浏览器
            quiet: true,//则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
            overlay: {//在浏览器上全屏显示编译的errors或warnings
                errors: true,
                warnings: false
            },
            proxy: {
                '/api/': {
                    target: 'http://127.0.0.1:8088',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        },
        mode: 'development'  // production development
    }
);