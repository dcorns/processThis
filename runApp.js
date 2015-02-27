/**
 * runApp
 * Created by dcorns on 1/3/15.
 * Takes a valid os command makes and returns a new object used to run the command in node
 */
'use strict';
module.exports = function(app){
  this.app = app;
  this.run = function run(arg, cnn){
      var spawn = require('child_process').spawn;
        var proc = spawn(this.app, arg);
      proc.on('exit', function(code){
        console.log(app + ' exit code:' + code);
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
