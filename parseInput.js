/**
 * parseInput
 * Created by dcorns on 1/8/15.
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
  return cb(null, result);
};