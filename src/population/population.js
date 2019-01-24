/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

var templates = []

var colony = require('population.colony')
var metropolia = require('population.metropolia')
var common = require('population.common')
var wild = require('population.wild')

var Main = metropolia('Main', 'W38S27')
var Abaddon = colony('Abaddon', 'W38S26', 'Main')
var Bristleback = colony('Bristleback', 'W37S27', 'Main')
var Clockwerk = colony('Clockwerk', 'W36S27', 'Main')
var DragonKnight = metropolia('DragonKnight', 'W39S28')
var Enigma = colony('Enigma', 'W39S27', 'DragonKnight')
var FacelessVoid = colony('FacelessVoid', 'W38S28', 'DragonKnight')
var Gyrocopter = colony('Gyrocopter', 'W35S27', 'Main')
var Huskar = metropolia('Huskar', 'W33S27')
var Io = metropolia('Io', 'W32S29')
var Juggenaut = metropolia('Juggernaut', 'W32S24')

var Common = common()

var spawns = {
  'W38S27': [].concat.apply([], [
    Main,
    Abaddon,
    Bristleback, 
    Clockwerk,
    DragonKnight,
    Enigma,
    FacelessVoid,
    Gyrocopter,
    Common
  ]),
  'W39S28': [].concat.apply([], [
    DragonKnight,
    Enigma,
    FacelessVoid,
    Common
  ])
}

module.exports = {
  spawns: spawns
}
