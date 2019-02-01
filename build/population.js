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

var Main = metropolia('Main', 'E33S18');
var Abaddon = colony('Abaddon', 'E33S19', 'Main');
var Batrider = colony('Batrider', 'E32S19', 'Main');
var CrystalMaiden = colony('CrystalMaiden', 'E32S18', 'Main');
var Doom = metropolia('Doom', 'E32S17');
var Enigma = colony('Enigma', 'E31S19', 'Main');
var Common = common();
var spawns = {
  'E33S18': [].concat.apply([], [Main, Abaddon, Batrider, CrystalMaiden, Enigma, Common])
};
module.exports = {
  spawns: spawns
};