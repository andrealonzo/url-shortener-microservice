'use strict';
function ServiceHandler () {

	this.whoAmI = function (req, res) {
		var softwareRe = /\((.*?)\)/;

		var softwareMatches = req.headers['user-agent'].match(softwareRe);
		var software =null;
		if(softwareMatches){
			software = softwareMatches[1];
		}
		
		var language = null;
		var accessLanguage = req.headers['accept-language'];
		if(accessLanguage)
		{
			language = accessLanguage.split(",")[0];
		}
		res.json({
			ipaddress:(req.headers['x-forwarded-for'] || req.headers['remote-addr']),
			language:language,
			software:software
		});
	};

}

module.exports = ServiceHandler;
