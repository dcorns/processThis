/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');
var Server = require('./server');
var parseInput = require('./parseInput');

var runGedit = new RunApp('gedit');
//runGedit.run(['README.md']);

var runNode = new RunApp('node');
runNode.run(['--help']);

var runLs = new RunApp('ls');
runLs.run(['/','-al']);

var firstServer = new Server('firstServer');
firstServer.start(3000, function(err, cnn){
  cnn.on('data', function(data){
    parseInput(data, function(err, obj){
      if(err) cnn.write(err);
      else {
        console.log('new parse data is next');
        console.dir(obj);
        if(obj.cmd === 'gedit'){
          runGedit.run(obj.params);
          cnn.write('gedit started...\r\n');
        }
      }
    });
  });
});
console.dir(firstServer);
var secondServer = new Server('secondServer');
secondServer.start(3050);