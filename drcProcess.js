/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');

var runGedit = new RunApp('gedit');
runGedit.run(['README.md']);

var runNode = new RunApp('node');
runNode.run(['--help']);

var runLs = new RunApp('ls');
runLs.run(['/','-al']);


