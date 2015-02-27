/**
 * runApp
 * Created by dcorns on 1/3/15.
 * Takes a valid os command makes and returns a new object used to run the command in node
 */
'use strict';
module.exports = function(){
  this.run = function run(arg, cnn, cmd){
      var spawn = require('child_process').spawn;
        var proc = spawn(cmd, arg);
      proc.on('exit', function(code){
        console.log(cmd + ' exit code:' + code);
      });
      proc.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        cnn.write(data);
      });
      proc.stdout.on('data', function (ot) {
        cnn.write(ot);
      });
    };
};
