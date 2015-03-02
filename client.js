/**
 * client.js
 * Created by dcorns on 1/4/15.
 * Returns a new client object for connecting the the remote server, The clnt parameter becomes the ID of the connection
 */
'use strict';
var net = require('net');
module.exports = function(clnt){
  var client;
  this.connect = function cnct(clntport, host, retry){
    retry = retry | 0;
    client = net.connect({port: clntport, host: host}, function(err){
      if(err) {
        console.log(clnt + ' unable to connect to port ' + clntport + ' at ' + host);
      }
      else{
        console.log(clnt + ' connected to port ' + clntport + ' at ' + host);
        client.write('login:' + clnt);
      }

    });
    client.on('data', function(data){
      console.log(data.toString());
    });
    client.on('end', function(){
      console.log('Disconnected from ' + host + ' port ' + clntport);
    });
    client.on('error', function(err){
      if(err.code === 'ECONNREFUSED' && retry > 0){
        console.log('Connection refused on port ' + clntport + ' at ' + host + ', but will try ' + retry + ' more times.');
        retry--;//client
        cnct(clntport, host, retry);
      }
      else {
        console.dir(err);
        client.end();
      }
    });
    return client;
  };
};