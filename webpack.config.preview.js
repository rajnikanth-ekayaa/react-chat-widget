'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/lib'),
		filename: 'index.js',
		library: {
			name: 'ChatWidget',
			type: 'umd',
			export: 'default',
		},
		clean: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			react: path.resolve(__dirname, './node_modules/react'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
			'react/jsx-runtime': require.resolve('./node_modules/react/jsx-runtime'),
		},
	},
	target: 'web',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: [/node_modules/, /dev/],
				use: ['babel-loader', 'ts-loader'],
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env'],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sassOptions: {
								includePaths: [path.resolve(__dirname, 'src/scss/')],
							},
						},
					},
				],
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				type: 'asset/inline',
			},
		],
	},
	devtool: 'inline-source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[id].css',
		}),
		new webpack.ProvidePlugin({
			react: 'React',
		}),
	],
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react',
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom',
		},
	},
};
