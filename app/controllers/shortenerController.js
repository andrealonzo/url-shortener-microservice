'use strict';
var validUrl = require('valid-url'),
    Url = require('../models/url.js');

function ShortenerController() {

    this.shortenUrl = function(url, done) {
        if (!validUrl.isUri(url)) {
            return done(null);
        }
        var newUrl = new Url();
        newUrl.value = url;

        newUrl.save(function(err) {
            if (err) {
                return done(null);
            }
            return done(newUrl);
        });
    }
    this.getUrl = function(code, done) {
        Url.findOne({
            id: code
        }, function(error, url) {
            if (error || !code) {
                return done(null);
            }
            return done(url.value);
        });
    }


}

module.exports = ShortenerController