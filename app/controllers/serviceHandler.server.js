'use strict';
function ServiceHandler () {
	
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
		];
	

	this.convertTime = function (req, res) {
		var naturalLanguageDate = null;
		var unixDate = null;
		if(!req){
			res.json({"unix":unixDate,"natural":naturalLanguageDate});
		}
		var path = req.path;
		var strDate= decodeURI(path.substr(1, path.length));
		var date;
		if(isNaN(strDate) )
		{
			//natural language
			date = new Date(strDate);
		}else{
			//unix timestamp
			date = new Date(+strDate*1000);
		}
		if(date.getTime()){
			unixDate = date.getTime()/1000;
			naturalLanguageDate = 
			months[date.getMonth()] +" " + 
			date.getDate() + ", " + 
			date.getFullYear();
		}
		
			
		res.json({"unix":unixDate,"natural":naturalLanguageDate});
	};

}

module.exports = ServiceHandler;
