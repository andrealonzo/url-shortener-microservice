'use strict';
var validUrl = require('valid-url'),
    Url = require('../models/url.js'),
     Base = require( '../controllers/base.js');

function ShortenerController() {
    var base = new Base();
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
            newUrl.code = base.encode(newUrl.id);
            return done(newUrl);
        }.bind(this));
    }
    this.getUrl = function(code, done) {
        var id = base.decode(code);
        
        Url.findOne({
            id: id
        }, function(error, url) {
            if (error || !url) {
                return done(null);
            }
            return done(url.value);
        });
    }




}

module.exports = ShortenerController