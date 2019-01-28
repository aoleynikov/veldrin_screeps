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
var Bristleback = colony('Bristleback', 'W37S27', 'Clockwerk')
var Clockwerk = metropolia('Clockwerk', 'W36S27')
var DragonKnight = metropolia('DragonKnight', 'W39S28')
var Enigma = colony('Enigma', 'W39S27', 'Main')
var FacelessVoid = colony('FacelessVoid', 'W38S28', 'DragonKnight')
var Gyrocopter = colony('Gyrocopter', 'W35S27', 'Clockwerk')
var Huskar = metropolia('Huskar', 'W33S27')
var Io = metropolia('Io', 'W32S29')
var Juggenaut = metropolia('Juggernaut', 'W32S24')
var Kunkka = colony('Kunkka', 'W39S26', 'Main')
var Leshrak = colony('Leshrak', 'W37S28', 'Main')
var Mirana = colony('Mirana', 'W39S29', 'DragonKnight')
var Necrophos = colony('Necrophos', 'W38S29', 'DragonKnight')
var Oracle = colony('Oracle', 'W34S27', 'Clockwerk')

var Common = common()

var spawns = {
  'W38S27': [].concat.apply([], [
    Main,
    Abaddon,
    Huskar,
    Kunkka,
    Bristleback, 
    Clockwerk,
    DragonKnight,
    Enigma,
    FacelessVoid,
    Leshrak,
    Mirana,
    Necrophos,
    Gyrocopter,
    Oracle,
    Common
  ]),
  'W39S28': [].concat.apply([], [
    DragonKnight,
    FacelessVoid,
    Huskar,
    Enigma,
    Mirana,
    Necrophos,
    Abaddon,
    Main,
    Bristleback,
    Clockwerk,
    Kunkka,
    Leshrak,
    Common
  ]),
  'W36S27': [].concat.apply([], [ 
    Clockwerk,
    Gyrocopter,
    Oracle,
    Huskar,
    Bristleback,
    Leshrak,
    Main,
    Abaddon,
    DragonKnight,
    Enigma,
    FacelessVoid,
    Common
  ]),
  'W33S27': [].concat.apply([], [
    Huskar,
    Oracle,
    Gyrocopter,
    Clockwerk
  ])
}

module.exports = {
  spawns: spawns
}
