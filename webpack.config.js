const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/js/app.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js",
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
			  test: /\.tsx?$/, 
			  use: 'ts-loader',
			  exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			  },
		  ],
	},
	plugins: [
    new HtmlWebpackPlugin({
			template: './src/index.html'
		})
  ],
}