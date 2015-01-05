/**
 * drcProcess
 * Created by dcorns on 1/2/15.
 */
'use strict';
var RunApp = require('./runApp');
var Server = require('./server');

var runGedit = new RunApp('gedit');
runGedit.run(['README.md']);

var runNode = new RunApp('node');
runNode.run(['--help']);

var runLs = new RunApp('ls');
runLs.run(['/','-al']);

var firstServer = new Server('firstServer');
firstServer.start(3000);
//firstServer.stop();
var secondServer = new Server('secondServer');
secondServer.start(3050);