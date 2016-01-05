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
      it('should respond to GET',function(done){
         request
            .get('http://localhost:'+port)
            .on('response', function(response) {
                expect(response.statusCode).to.equal(200);
                done();
              });
      })
    });
    after(function () {
      shutdown();
    });
  });