const BUILD = require('../build.js');
const path = require('path');

module.exports = function(options) {
	const port = 3000;
	let devServer = {
		contentBase: path.join(__dirname, '../public'),
		disableHostCheck: true,
		port: port,
		host: 'localhost',
		https: true,
		inline: true,
		open: false,
		historyApiFallback: {
            rewrites: [
                {
                    from: /./,
                    to: '/index.html'
                }
            ]
        }
	}
    return devServer;
	
;}
