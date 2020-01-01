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

var Main = metropolia('Main', 'W5S52')
// var Abaddon = colony('Abaddon', 'W3S57', 'Clockwerk')
// var Bristleback = colony('Bristleback', 'W1S57', 'Main')
// var Clockwerk = metropolia('Clockwerk', 'W4S57')
// var Doom = colony('Doom', 'W3S58', 'Clockwerk')
// var Enigma = colony('Enigma', 'W2S56', 'Main')
// var Furion = colony('Furion', 'W3S56', 'Clockwerk')
// var Gyrocopter = colony('Gyrocopter', 'W1S58', 'Main')
// var Huskar = colony('Huskar', 'W4S58', 'Juggernaut')
// var Io = colony('Io', 'W2S58', 'Main')
// var Juggernaut = metropolia('Juggernaut', 'W5S59')
// var Kunkka = colony('Kunkka', 'W5S58', 'Juggernaut')
// var Leshrak = metropolia('Leshrak', 'W7S59')

var Common = common()

var spawns = {
  'W5S52': [].concat.apply([], [
    Main,
    Common
  ])
}

module.exports = {
  spawns: spawns
}
