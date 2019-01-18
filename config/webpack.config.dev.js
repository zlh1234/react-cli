
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');

module.exports = merge( baseWebpackConfig,
    {
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            host: '127.0.0.1',
            port: 8088,
            hot:true,
            open:true,
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