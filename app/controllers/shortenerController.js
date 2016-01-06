'use strict';
var validUrl = require('valid-url'),
 //   mongoose = require('mongoose'),
    Url = require('../models/url.js');

function ShortenerController() {

    this.shortenUrl = function(url, done) {
        if (!validUrl.isUri(url))
        {
            return done(null);
        }
        var newUrl = new Url();
        newUrl.value = url;
        
        console.log("saving new url", newUrl);
        newUrl.save(function(err) {
            if (err) { return done(null);}
            console.log("newul id", newUrl.id);
            return done(newUrl.id);
        });
    }


}

module.exports = ShortenerController