/**
 * remoteCommands
 * Created by dcorns on 1/13/15.
 * Add new command proccesses here
 */
'use strict';
var RunApp = require('./runApp');
module.exports = function(host){
  host.cmds = {};
  host.cmds.runLs = new RunApp('ls');
  host.cmds.runLsblk = new RunApp('lsblk');
  return host;
};