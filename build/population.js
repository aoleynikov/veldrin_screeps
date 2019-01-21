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

var Abaddon = metropolia('Abaddon', 'W56N2');
var Bristleback = colony('Bristleback', 'W55N2', 'Abaddon');
var Clockwerk = colony('Clockwerk', 'W56N3', 'DragonKnight');
var DragonKnight = metropolia('DragonKnight', 'W57N3');
var Enigma = colony('Enigma', 'W55N3', 'Abaddon');
var FacelessVoid = colony('FacelessVoid', 'W54N2', 'Abaddon');
var Gyrocopter = colony('Gyrocopter', 'W57N2', 'DragonKnight');
var Io = metropolia('Io', 'W52N4');
var Juggernaut = colony('Juggernaut', 'W58N2', 'DragonKnight');
var Common = common();
var spawns = {
  'W56N2': [].concat.apply([], [Abaddon, Bristleback, Clockwerk, Io, DragonKnight, Enigma, FacelessVoid, Gyrocopter, Juggernaut, Common]),
  'W57N3': [].concat.apply([], [Abaddon, Bristleback, Clockwerk, DragonKnight, Enigma, FacelessVoid, Gyrocopter, Juggernaut, Io, Common])
};
module.exports = {
  spawns: spawns
};