/**
 * commandList.js
 * Created by dcorns on 2/27/15.
 * Exports an array of valid commands
 */
'use strict';
module.exports = function(){
  var validCommands = [];
  this.add = function(cmds){
    if (typeof cmds === 'string'){
      validCommands.push(cmds);
    }
    if(cmds.constructor.toString().indexOf("Array") > -1){
      validCommands = validCommands.concat(cmds);
    }
  };
  this.validate = function(cmd){
    return validCommands.indexOf(cmd);
  };
  this.listCommands = function(){
    return validCommands;
  }
};