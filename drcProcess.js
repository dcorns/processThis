/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');
var Server = require('./server');
var parseInput = require('./parseInput');


var runLs = new RunApp('ls');
var runLsblk = new RunApp('lsblk');

var firstServer = new Server('firstServer');

firstServer.start(3000, function(err, cnn){
  cnn.on('data', function(data){
    parseInput(data, function(err, obj){
      if(err) cnn.write(err);
      else {
        console.log('new parse data is next');
        console.dir(obj);
        if(obj.cmd === 'ls'){
          runLs.run(obj.params, function(err, res){
            res.stdout.on('data', function(ot){
             // console.log('output: '+ot);
              console.log('ls Request from client: ' + cnn._handle.fd);
              cnn.write(ot);
            });
          });
          cnn.write('Running ls...\r\n');
        }
        if(obj.cmd === 'lsblk'){
          runLsblk.run(obj.params, function(err, res){
            res.stdout.on('data', function(ot){
             // console.log('output: '+ot);
              console.log('lsblk Reqest from client: ' + cnn._handle.fd);
              cnn.write(ot);
            });
          });
        }
      }
    });
  });
});