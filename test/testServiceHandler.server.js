    var boot = require('../').boot,
      shutdown = require('../').shutdown,
      port = require('../').port,
      superagent = require('superagent'),
      expect = require('expect.js');
    describe('server', function () {
      before(function () {
        boot();
      });
    describe('homepage', function(){
      
      it('should return proxy ip address of user',function(done){
        var ipAddress="192.168.1.1";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('Remote-Addr', ipAddress)
          .end(function(err, res){
            expect(res.body.ipaddress).to.equal(ipAddress);
            // Calling the end function will send the request 
            done();
          });

        })
        
      
      it('should return ip address of user',function(done){
        var proxyIpAddress = "168.192.1.2";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('X-Forwarded-For', proxyIpAddress)
          .end(function(err, res){
            expect(res.body.ipaddress).to.equal(proxyIpAddress);
            // Calling the end function will send the request 
            done();
          });
      })
      
      it('should return language of user',function(done){
          var language = "en-US";
          var acceptLanguage = "en-US,en;q=0.8";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('accept-language', acceptLanguage)
          .end(function(err, res){
            expect(res.body.language).to.equal(language);
            // Calling the end function will send the request 
            done();
          });
      })
      
      it('should return software of user',function(done){
          var software = "Macintosh; Intel Mac OS X 10_11_2";
          var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('user-agent', userAgent)
          .end(function(err, res){
            expect(res.body.software).to.equal(software);
            // Calling the end function will send the request 
            done();
          });
      })
      
      it('should return ip address, language, software of user',function(done){
        
        var ipAddress = "168.192.1.2";
        var software = "Macintosh; Intel Mac OS X 10_11_2";
        var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
      
        var language = "en-US";
        var acceptLanguage = "en-US,en;q=0.8";
          
        var proxyIpAddress = "168.192.1.2";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('Remote-Addr', ipAddress)
          .set('user-agent', userAgent)
          .set('accept-language', acceptLanguage)
          .end(function(err, res){
            expect(res.body).to.eql({ipaddress: ipAddress, language: language, software: software});
            // Calling the end function will send the request 
            done();
          });
      })
      
      
      it('should return proxy ip address, language, software of user',function(done){
        
        var ipAddress = "168.192.1.2";
        var software = "Macintosh; Intel Mac OS X 10_11_2";
        var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
      
        var language = "en-US";
        var acceptLanguage = "en-US,en;q=0.8";
          
        var proxyIpAddress = "168.192.1.2";
        superagent
          .get('http://localhost:'+port)
          .set('Accept', 'application/json')
          .set('Remote-Addr', ipAddress)
          .set('x-forwarded-for', proxyIpAddress)
          .set('user-agent', userAgent)
          .set('accept-language', acceptLanguage)
          .end(function(err, res){
            expect(res.body).to.eql({ipaddress: proxyIpAddress, language: language, software: software});
            // Calling the end function will send the request 
            done();
          });
      })
    });
    after(function () {
      shutdown();
    });
  });