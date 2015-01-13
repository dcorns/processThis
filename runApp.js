/**
 * runApp
 * Created by dcorns on 1/3/15.
 */
'use strict';
//var util = require('util');
module.exports = function(app){
  this.app = app;
  this.run = function run(arg, cb){
    var spawn = require('child_process').spawn;
      var proc = spawn(this.app, arg);
    proc.on('exit', function(code){
      console.log(app + ' exit code:' + code);
    });
    //proc.stdout.on('data', function (data) {
    //  console.log('stdout: ' + data);
    //});
    proc.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    cb(null, proc);
  };

};
