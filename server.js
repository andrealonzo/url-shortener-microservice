'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
require('dotenv').load();

//mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));


routes(app);

var port = process.env.PORT || 8080;
var server;
var boot = function () {
	server= app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
	});
	
}

var shutdown = function() {
	if(server){
		server.close();
	}
}

if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = port;
}