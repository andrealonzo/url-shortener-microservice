    var boot = require('../').boot,
      shutdown = require('../').shutdown,
      port = require('../').port,
      request = require('request'),
      expect = require('expect.js');
    describe('server', function () {
      before(function () {
        boot();
      });
    describe('homepage', function(){
      it('should return null on bad date input',function(done){
          request('http://localhost:'+port+'/badinput', function (error, response, body) {
                expect(JSON.parse(body)).to.eql({unix: null, natural: null});
                done();
        })
      })
      
      it('should return correct date on unix input',function(done){
          request('http://localhost:'+port+'/1450137600', function (error, response, body) {
                expect(JSON.parse(body)).to.eql({ "unix": 1450137600, "natural": "December 15, 2015" });
                done();
        })
      })
      
      it('should return correct date on natural date input',function(done){
          request('http://localhost:'+port+'/December%2015,%202015', function (error, response, body) {
                expect(JSON.parse(body)).to.eql({ "unix": 1450137600, "natural": "December 15, 2015" });
                done();
        })
      })
    });
    after(function () {
      shutdown();
    });
  });