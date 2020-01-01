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
var Common = common();
var spawns = {
  'W5S52': [].concat.apply([], [Main, Common])
};
module.exports = {
  spawns: spawns
};