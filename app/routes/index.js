'use strict';

var path = process.cwd();
var ServiceHandler = require(path + '/app/controllers/serviceHandler.server.js');

module.exports = function (app) {

	var serviceHandler = new ServiceHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	app.route('/whoami')
		.get(serviceHandler.whoAmI);

};
