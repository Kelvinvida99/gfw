
const path              = require('path') //absolute path
const TerserPluggin     = require('terser-webpack-plugin')
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
	
	devtool:'source-map',//easy find error, keep the files on  the bundle

	entry: ['babel-polyfill', './production/js/main.js'] ,
	output: { 
		filename: 'bundle.js',
		path: path.resolve(__dirname, './public/js' )
	},

	//mode: 'none',
	mode: 'development',

	watch: true,
  
	module: {
		rules: [

 			{
				test: /\.js$/,
				exclude: /node_modules/, 
				use:{
					loader:'babel-loader',
					options: {
						presets: ['@babel/env'], 
						plugins: ['transform-class-properties']
					}
				}			
			}, 

            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },

		],
	},



	plugins: [

		//new TerserPluggin(),
		//autorefresh
		// new BrowserSyncPlugin({
		//       host: 'localhost',
		//       port: 3000,
		//       server: { baseDir: ['gosivefw/public'] }
		//     })
    
	]


}/*module.exports*/