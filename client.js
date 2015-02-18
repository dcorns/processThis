/**
 * client.js
 * Created by dcorns on 1/4/15.
 */
'use strict';
var net = require('net');
module.exports = function(clnt){
  this.clnt = clnt;
  var client = 0;
  var prt;
  this.connect = function cnct(clntport, retry){
    prt = clntport;
    retry = retry | 0;
    client = net.connect({port: clntport}, function(err){
      if(err) return cb(err, null);
      console.log(clnt + ' connected to port ' + clntport);
      client.write(clnt + ' connected');
    });
    client.on('data', function(data){
      console.log(data.toString());
    });
    client.on('end', function(){
      console.log('Disconnected from port ' + clntport);
    });
    client.on('error', function(err){
      if(err.code === 'ECONNREFUSED' && retry > 0){
        console.log('Connection refused on port ' + prt + ', but will try ' + retry + ' more times.');
        retry--;//client
        cnct(prt,  retry);
      }
      else {
        console.dir(err);
        client.end();
      }
    });
    return client;
  };
};