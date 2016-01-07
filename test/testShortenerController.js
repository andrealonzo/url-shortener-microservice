var connectDB = require('../').connectDB,
    disconnectDB = require('../').disconnectDB,
    mongoose = require('mongoose'),
    expect = require('expect.js');
var path = process.cwd();
var ShortenerController = require(path + '/app/controllers/shortenerController.js');

describe('shortenerController', function() {
    var shortenerCtrl;
    var dbName = "testCollection";
    before(function(done) {
        connectDB(dbName);
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
                expect(shortenedUrl.id).to.be.a('number');
                done();
            });
        })



        it('should have different shortenedUrl if multiple URLs entered', function(done) {
            var url1 = "http://www.diffurl.com";
            var url2 = "http://www.diffurl2.com";

            shortenerCtrl.shortenUrl(url1, function(shortenedUrl1) {
                expect(shortenedUrl1.id).to.be.a('number');
                shortenerCtrl.shortenUrl(url2, function(shortenedUrl2) {
                    expect(shortenedUrl2.id).to.be.a('number');
                    expect(shortenedUrl2.id).not.to.be.equal(shortenedUrl1.id);
                    done();
                });
            });

        })


    });


    describe('#getUrl', function() {

        it('should return null code if incorrect', function(done) {

            var code = "error code";
            shortenerCtrl.getUrl(code, function(url) {
                expect(url).to.be(null);
                done();
            });
        })

        it('should return new added url\'s code', function(done) {
            var url = "https://www.google.com";
            shortenerCtrl.shortenUrl(url, function(newUrl) {
                shortenerCtrl.getUrl(newUrl.code, function(returnedUrl) {
                    expect(returnedUrl).to.be(url);
                    done();
                });
            });
        })



        it('should return same code of same url added', function(done) {
            var url = "https://www.testurl.com";
            shortenerCtrl.shortenUrl(url, function(newUrl1) {
                shortenerCtrl.shortenUrl(url, function(newUrl2) {
                    expect(newUrl1.code).to.be.equal(newUrl2.code);
                    done();
                });
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