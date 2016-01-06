var boot = require('../').boot,
  shutdown = require('../').shutdown,
  port = require('../').port,
  superagent = require('superagent'),
  expect = require('expect.js');
describe('server', function() {
  before(function() {
    boot();
  });
  describe('homepage', function() {

    it('should return proxy ip address of user', function(done) {
      var ipAddress = "192.168.1.1";
      superagent
        .get('http://localhost:' + port + '/whoami')
        .set('Accept', 'application/json')
        .set('Remote-Addr', ipAddress)
        .end(function(err, res) {
          expect(res.body.ipaddress).to.equal(ipAddress);
          // Calling the end function will send the request 
          done();
        });

    })


  });
  describe('database', function() {

    it('should return proxy ip address of user', function(done) {
      var ipAddress = "192.168.1.1";
      superagent
        .get('http://localhost:' + port + '/whoami')
        .set('Accept', 'application/json')
        .set('Remote-Addr', ipAddress)
        .end(function(err, res) {
          expect(res.body.ipaddress).to.equal(ipAddress);
          // Calling the end function will send the request 
          done();
        });

    })


  });
  after(function() {
    shutdown();
  });
});