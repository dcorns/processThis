/**
 * drcRequest
 * Created by dcorns on 1/5/15.
 */
'use strict';
var Client = require('./client');
var net = require('net');

var firstClient = new Client('firstClient');
firstClient.connect(3000, 10);

//var secondClient = new Client('secondClient');
//secondClient.connect(3050, 5);



var prt = 3000
  ,retry = 10;

var client = net.connect({port: prt}, function(err){
  if(err) return cb(err, null);
  console.log('client connected to port ' + prt);
  client.write('client connected');
});
client.on('data', function(data){
  process.stdout.write(data);
});
client.on('end', function(){
  console.log('Disconnected from port ' + prt);
});
client.on('error', function(err){
  if(err.code === 'ECONNREFUSED' && retry > 0){
    console.log('Connection refused on port ' + prt + ', but will try ' + retry + ' more times.');
    retry--;
  }
  else {
    console.dir(err);
    client.end();
  }
});

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    client.write(chunk);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});