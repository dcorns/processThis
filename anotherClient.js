/**
 * anotherClient.js
 * Created by dcorns on 2/27/15.
 */
'use strict';
var Client = require('./client');
var client = new Client('anotherClient');
var cnt = client.connect(3000, 'localhost', 10);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    cnt.write(chunk);
  }
});