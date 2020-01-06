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

var Main = metropolia('Main', 'W5S52');
var Abaddon = colony('Abaddon', 'W5S53', 'W5S52');
var Bristleback = colony('Bristleback', 'W6S53');
var Common = common();
var spawns = {
  'W5S52': [].concat.apply([], [Main, Common, Abaddon, Bristleback])
};
module.exports = {
  spawns: spawns
};