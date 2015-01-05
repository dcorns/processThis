/**
 * drcRequest
 * Created by dcorns on 1/5/15.
 */
'use strict';
var Client = require('./client');

var firstClient = new Client('firstClient');
firstClient.connect(3000, 10);

var secondClient = new Client('secondClient');
secondClient.connect(3050, 5);



