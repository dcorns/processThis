/**
 * client.js
 * Created by dcorns on 1/4/15.
 */
'use strict';
var net = require('net');
module.exports = function(clnt){
  this.clnt = clnt;
  var client;
  this.connect = function(clntport){
    client = net.connect({port: clntport}, function(){
      console.log(clnt + 'connected to port ' + clntport);
      client.write(clnt + 'connected');
    });
    client.on('data', function(data){
      console.log(data.toString());
      client.end();
    });
    client.on('end', function(){
      console.log('Disconnected from port ' + clntport);
    })
  }
};