var connectDB = require('../').connectDB,
    disconnectDB = require('../').disconnectDB,
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    expect = require('expect.js');
var path = process.cwd();
var ShortenerController = require(path + '/app/controllers/shortenerController.js');

describe('shortenerController', function() {
    var shortenerCtrl;
    before(function(done) {
        connectDB();
        shortenerCtrl = new ShortenerController();
        mongoose.connection.on('connected', function() {

            console.log("done connecting");
            done();
        });
    });
    describe('#shortenUrl', function() {

        it('should return null when null URL is added', function(done) {

            console.log("running test");
            var url = null;
            shortenerCtrl.shortenUrl(url, function(shortenedUrl) {

                expect(shortenedUrl).to.be(null);
                done();
            });
        })

        it('should return null when blank URL is added', function(done) {

            var url = "";
            shortenerCtrl.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl).to.be(null);
                done();
            });
        })

        it('should return null when invalid URL is added', function(done) {
            var url = "this is an invalid url";
            shortenerCtrl.shortenUrl(url, function(shortenedUrl) {
                expect(shortenedUrl).to.be(null);
                done();
            });
        })

        it('should return not null when valid URL is added', function(done) {
            var url = "http://www.google.com";
            
            shortenerCtrl.shortenUrl(url, function(shortenedUrl) {
               expect(shortenedUrl).to.be.a('number');
               done();
             });
        })


    });

    after(function(done) {
        mongoose.modelSchemas = {};
        mongoose.models = {};
        disconnectDB();
        mongoose.connection.on('disconnected', function() {
            console.log("done disconnecting");
            done();
        });
    });
});