/**
 * server.js
 * Created by dcorns on 1/4/15.
 */
'use strict';
var net = require('net');
var connectionID = 0;
module.exports = function(svr){
  this.svr = svr;
  this.start = function(svrport, cb){
    this.server = net.createServer(function(cnct){
      cnct.connectionID = connectionID++;
      //console.log('client ' + cnct.connectionID + ' connected to ' + svr);
      //cnct.on('end', function(){
      //  console.log('client ' + cnct.connectionID + ' disconnected from ' + svr);
      //});
     // cnct.write(svr + ' says hello\r\n');
      return cb(null, cnct);
    });
    this.server.listen(svrport, function(){
      console.log(svr + ' listening on port ' + svrport);
    });
  };
  this.stop = function(){
    this.server.close();
  };
};