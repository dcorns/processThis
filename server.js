/**
 * server.js
 * Created by dcorns on 1/4/15.
 * Returns a new server object
 */
'use strict';
var net = require('net');
module.exports = function(svr){
  this.start = function(svrport, cb){
    this.server = net.createServer(function(cnct){
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