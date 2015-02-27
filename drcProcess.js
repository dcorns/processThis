/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');
var Server = require('./server');
var parseInput = require('./parseInput');
var runApp = new RunApp();

var firstServer = new Server('firstServer');

firstServer.start(3000, function(err, cnn){
  cnn.on('data', function(data){
    parseInput(data, function(err, obj){
      if(err) cnn.write(err);
      else {
        if(obj.cmd.substr(0, 6) === 'login:'){
          cnn.loginID = obj.cmd.substr(6);
          cnn.write('Welcome ' + cnn.loginID + '\r\n');
          cnn.write('Warning, all commands are enabled:\r\n');
          cnn.write('Use # to add parameters: example: ls#/\r\n');
          cnn.write('Use - to add options: example: ls#/ -al or ls#-al\r\n');
          console.log(cnn.loginID + ' connected');
        }
        else {
          runApp.run(obj.params, cnn, obj.cmd);
        }
      }
    });
  });
});
