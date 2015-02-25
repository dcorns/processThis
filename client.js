/**
 * client.js
 * Created by dcorns on 1/4/15.
 * Returns a new client object for connecting the the remote server, The clnt parameter becomes the ID of the connection
 */
'use strict';
var net = require('net');
module.exports = function(clnt){
  this.clnt = clnt;
  var client, prt;
  this.connect = function cnct(clntport, retry){
    prt = clntport;
    retry = retry | 0;
    client = net.connect({port: prt}, function(err){
      if(err) {
        console.log(clnt + ' unable to connect to port ' + prt);
      }
      else{
        console.log(clnt + ' connected to port ' + prt);
        client.write('login:' + clnt);
      }

    });
    client.on('data', function(data){
      console.log(data.toString());
    });
    client.on('end', function(){
      console.log('Disconnected from port ' + prt);
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