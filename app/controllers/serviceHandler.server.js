'use strict';

var path = process.cwd();
var ShortenerController = require(path + '/app/controllers/shortenerController.js');

function ServiceHandler () {

	this.newUrl = function (req, res) {
		var shortenerController = new ShortenerController();
		var url=req.params[0];
		var shortenedUrl = req.headers["x-forwarded-proto"] + "://" + req.headers.host;
		shortenerController.shortenUrl(url, function(newUrl){
			if(!newUrl){
				return res.json({"error":"URL invalid"});
			}
			res.json({ "original_url": newUrl.value, "short_url": shortenedUrl +"/"+ newUrl.code });
		});
	};
	
	this.getUrl = function (req, res) {
		var shortenerController = new ShortenerController();
		var code=req.params[0];
		console.log("code", code);
		shortenerController.getUrl(code, function(url){
			if(!url){
				return res.json({"error":"No short url found for given input"});
			}
			res.redirect(url);
		});
	};

}

module.exports = ServiceHandler;
