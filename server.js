/**
 * server.js
 * Created by dcorns on 1/4/15.
 */
'use strict';
var net = require('net');
module.exports = function(svr){
  this.svr = svr;
  var server;
  this.start = function(svrport){
    server = net.createServer(function(cnct){
      console.log('client connected to ' + svr);
      cnct.on('end', function(){
        console.log('client connected to ' + svr);
      });
      cnct.write(svr + ' says hello\r\n');
      cnct.pipe(cnct);
    });
    server.listen(svrport, function(){
      console.log(svr + ' listening on port ' + svrport);
    });
  };
  this.stop = function(){
    server.close();
  };
};