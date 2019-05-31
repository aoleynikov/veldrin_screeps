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

var Main = metropolia('Main', 'W2S57')
var Abaddon = colony('Abaddon', 'W3S57', 'Clockwerk')
var Bristleback = colony('Bristleback', 'W1S57', 'Main')
var Clockwerk = metropolia('Clockwerk', 'W4S57')
var Doom = colony('Doom', 'W3S58', 'Clockwerk')
var Enigma = colony('Enigma', 'W2S56', 'Main')

var Common = common()

var spawns = {
  'W2S57': [].concat.apply([], [
    Main,
    Bristleback,
    Enigma,
    Abaddon,
    Clockwerk,
    Doom,
    Common
  ]),
  'W4S57':[].concat.apply([], [
    Clockwerk,
    Abaddon,
    Doom,
    Enigma,
    Main,
    Bristleback,
    Common
  ])
}

module.exports = {
  spawns: spawns
}
