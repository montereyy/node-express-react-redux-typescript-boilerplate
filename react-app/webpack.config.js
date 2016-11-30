let babel                 = require('babel-loader');
let HtmlWebpackPlugin     = require('html-webpack-plugin');
let webpack               = require('webpack');
let path                  = require('path');
let WebpackNotifierPlugin = require('webpack-notifier');

let config = {
	dist     : __dirname + '/dist',
	src      : __dirname + '/src',
	srcFolder: 'src'
};

let appEntries = [
	`./${config.srcFolder}/index.tsx`
];

if(process.env.ENVIRONMENT !== 'production') {
	[].unshift.apply(appEntries, [
		'webpack-dev-server/client?http://localhost:3001',
		'webpack/hot/only-dev-server',
	])
} else {
	console.log(process.env.ENVIRONMENT)
}

module.exports = {
	resolve: {
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},
	entry  : {
		app: appEntries
	},
	output : {
		filename         : '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map',
		path             : config.dist
	},

	devtool: '#source-map',
	debug  : true,

	module: {
		loaders: [
			{
				loaders : ['babel', 'ts-loader'],
				test   : /\.tsx?$/,
				exclude: /(node_modules)/
			},
			{
				loader: 'html',
				test  : /\.html?$/
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(config.src, 'index.html')
		}),
		new WebpackNotifierPlugin({alwaysNotify: true})
	]
};