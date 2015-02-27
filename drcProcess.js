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
        if(obj.cmd.substr(0, 6) === 'login:'){
          cnn.loginID = obj.cmd.substr(6);
          cnn.write('Welcome ' + cnn.loginID + '\r\n');
          cnn.write('The following are valid commands: ls, lsblk\r\n');
          cnn.write('Use # to add parameters: example: ls#/\r\n');
          cnn.write('Use - to add options: example: ls#/ -al or ls#-al\r\n');
          console.log(cnn.loginID + ' connected');
        }
        else {
          switch (obj.cmd) {
            case 'ls':
              console.log('ls Request from client: ' + cnn.loginID);
              runLs.run(obj.params, cnn);
              break;
            case 'lsblk':
              runLsblk.run(obj.params, cnn);
              break;
            default:
              cnn.write('Enter a valid command\r\n');
              cnn.write('ls, lsblk\r\n');
              cnn.write('Use # to add parameters: example: ls#/\r\n');
              cnn.write('Use - to add options: example: ls#/ -al\r\n');
              break;
          }
        }
      }
    });
  });
});
