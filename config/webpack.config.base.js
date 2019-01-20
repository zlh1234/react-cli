const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
	output: {
		filename: 'js/[name].[hash:7].js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-0'],
						plugins: ['transform-decorators-legacy']
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: true,
							modules: true, //开启css 模块化
							localIdentName: '[local]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')('last 100 versions')
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: true,
							modules: true, //开启css 模块化
							localIdentName: '[name]_[local]_[hash:base64:8]' //配置生成的标识符(ident)
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')('last 100 versions')
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							modifyVars: { '@fontColor': '#EE0707' }
						}
					}
				]
			},
			{
				test: /\.(jpg|jpge|gif|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 512,
							name: 'static/images/[name].[hash:7].[ext]'
						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.resolve('static/media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.resolve('static/fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style/[name].[hash:7].css',
			chunkFilename: '[id].css'
		}),
		new htmlPlugin({
			template: path.resolve(__dirname, '../index.html'),
			filename: 'index.html',
			hash: true, //是否添加hash值
			minify: {
				//压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			},
			chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
		})
	],
	resolve: {
		//导入的时候不用写拓展名
		extensions: [' ', '.js', '.jsx', '.less'],
		alias: {
			'@src': path.resolve(__dirname, '../src'),
			'@components': path.resolve(__dirname, '../src/components'),
			'@pages': path.resolve(__dirname, '../src/pages'),
			'@redux': path.resolve(__dirname, '../src/redux'),
			'@static': path.resolve(__dirname, '../src/static')
		}
	}
};
