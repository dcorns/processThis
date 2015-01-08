/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');
var Server = require('./server');

var runGedit = new RunApp('gedit');
//runGedit.run(['README.md']);

var runNode = new RunApp('node');
runNode.run(['--help']);

var runLs = new RunApp('ls');
runLs.run(['/','-al']);

var firstServer = new Server('firstServer');
firstServer.start(3000, function(err, cnn){
  var dataIn
    ,cmd
    ,params
    ,idx;
  cnn.on('data', function(data){
    cmd = data.toString().trim();
    idx = cmd.indexOf('-');
    if(idx > -1){
      try{
        params = cmd.substr(idx + 1).split(' ');
        cmd = cmd.substr(0,idx);
      }
      catch(e){
        console.log('- without argument');
        cnn.write('- without argument');
      }

      console.log('cmd:' + cmd + ' params:' + params);
    }
    console.log('post cmd:' + cmd);
    if(cmd === 'gedit'){
      runGedit.run(params);
      cnn.write('gedit started...\r\n');
    }
  });
});
console.dir(firstServer);
var secondServer = new Server('secondServer');
secondServer.start(3050);