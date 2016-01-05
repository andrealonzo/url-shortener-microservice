'use strict';

var path = process.cwd();
var ServiceHandler = require(path + '/app/controllers/serviceHandler.server.js');

module.exports = function (app) {

	var serviceHandler = new ServiceHandler();

	app.route('/')
		.get(serviceHandler.whoAmI);

};
