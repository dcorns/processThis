/**
 * drcRequest
 * Created by dcorns on 1/5/15.
 */
'use strict';
var Client = require('./client');
var firstClient = new Client('firstClient');
var cnt = firstClient.connect(3000, 10);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    cnt.write(chunk);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});