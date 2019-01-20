
const webpack = require('webpack');
const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');

module.exports = merge(baseWebpackConfig,
    {
        plugins: [
            new cleanPlugin(['dist'])
        ],
        mode: 'production'  // production development
    }
);