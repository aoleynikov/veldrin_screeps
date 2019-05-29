/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
var templates = [];

var colony = require('population.colony');

var metropolia = require('population.metropolia');

var common = require('population.common');

var wild = require('population.wild');

var Main = metropolia('Main', 'W2S57');
var Abaddon = colony('Abaddon', 'W3S57', 'Main');
var Bristleback = colony('Bristleback', 'W1S57', 'Main');
var Common = common();
var spawns = {
  'W2S57': [].concat.apply([], [Main, Abaddon, Bristleback, Common])
};
module.exports = {
  spawns: spawns
};