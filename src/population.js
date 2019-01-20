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

var Earth = metropolia('Earth', 'W37S11')
var ISS = colony('ISS', 'W37S12', 'Earth')
var Moon = colony('Moon', 'W36S11', 'Earth')
var Deimos = colony('Deimos', 'W35S11', 'Earth')
var Io = colony('Io', 'W37S13', 'Earth')
var Amalthea = colony('Amalthea', 'W38S13', 'Mars')
var Vodka = wild('Vodka', 'W36S14', 'Saturn')
var Mars = metropolia('Mars', 'W38S11')
var Phobos = colony('Phobos', 'W39S11', 'Mars')
var Phoebe = colony('Phoebe', 'W38S12', 'Mars')
var Saturn = metropolia('Saturn', 'W36S13')
var Venus = metropolia('Venus', 'W34S12')
var Jupiter = metropolia('Jupiter', 'W39S13')
var Europa = colony('Europa', 'W39S12', 'Jupiter')
var Enceladus = colony('Enceladus', 'W38S14', 'Jupiter')
var Titan = colony('Titan', 'W35S12', 'Saturn')
var Oberon = colony('Oberon', 'W35S13', 'Venus')
var Himalia = colony('Himalia', 'W36S12', 'Saturn')
var Callisto = colony('Callisto', 'W39S14', 'Jupiter')
var Ganymede = colony('Ganymede', 'W34S13', 'Venus')
var Hyperion = colony('Hyperion', 'W33S13', 'venus')
var Elara = colony('Elara', 'W37S14', 'Jupiter')
var Pasiphae = colony('Pasiphae', 'W33S12', 'Venus')
var Common = common()

var spawns = {
  'W37S11': [].concat.apply([], [
    Earth, ISS, Moon, Mars, Deimos, Io, Vodka,
    Phobos, Phoebe, Titan, Europa, Oberon, 
    Amalthea, Venus, Jupiter, Hyperion,
    Saturn, Elara,
    Common
  ]),
  'W38S11': [].concat.apply([], [
    Mars, Phobos, Phoebe, Amalthea,
    Earth, Vodka, Europa, Jupiter, Enceladus, 
    Io, Callisto, Elara,
    Common
  ]),
  'W34S12': [].concat.apply([], [
    Venus, Titan, Oberon, Ganymede, 
    Saturn, Himalia, Vodka, Deimos, Moon, 
    Earth, Hyperion, Pasiphae,
    Common
  ]),
  'W39S13': [].concat.apply([], [
    Jupiter, Callisto, Europa, Enceladus,
    Amalthea, Io, Phoebe, Mars, Earth, 
    ISS, Elara,
    Common
  ]),
  'W36S13': [].concat.apply([], [
    Saturn, Himalia, Titan, Vodka, Oberon,
    Venus, Hyperion, Deimos, Ganymede, 
    Moon, Earth, Pasiphae,
    Common
  ])
}

module.exports = {
  spawns: spawns
}
