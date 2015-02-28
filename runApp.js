/**
 * runApp
 * Created by dcorns on 1/3/15.
 * Returns a new object with a run method that executes os commands in node.
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
