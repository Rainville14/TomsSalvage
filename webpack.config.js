const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const IS_MOCK_SERVER = true;

const devServer = require('./webpack-settings/webpack.devServer')({
	IS_MOCK_SERVER
});

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devServer,

	entry: {
		main: './src/index.js'
	},

	output: {
		path: path.resolve('./public/built'),
		filename: '[name].js',
		chunkFilename: '[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				include: path.join(__dirname, 'src/views'),
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							outFile: path.resolve('./public/css'),
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpg|jpeg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './images'
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/views/index.html',
			title: 'Tom\'s Cycle and Salvage',
			minify: true,
			hash: true,
			xhtml: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /node_modules\/(.*)\.(js)$/,
					chunks: 'all',
					name: 'vendor',
					enforce: true
				}
			}
		}
	},
	resolve: {
		modules: [
			path.resolve('./src/'),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.scss', '.css']
	}
}