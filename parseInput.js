/**
 * parseInput
 * Created by dcorns on 1/8/15.
 * Check data received from remote client and return an object based on the data received representing the remote command
 * Reserved character #: what follows is interpreted as a parameter and possibly options prefixed with a -
 * Everything before the # is interpreted as a command
 */
'use strict';
module.exports = function(data, cb){
  var result = {}
    ,idx;
  result.cmd = data.toString().trim();
  idx = result.cmd.indexOf('#');
  if(idx > -1){
    try{
      result.params = result.cmd.substr(idx + 1).split(' ');
      result.cmd = result.cmd.substr(0,idx);
    }
    catch(e){
      console.log('- without argument');
      return cb('- without argument', null);
    }
  }
  console.dir(result);
  return cb(null, result);
};