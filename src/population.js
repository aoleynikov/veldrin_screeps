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
var ISS = colony('ISS', 'W37S12', 'W37S11')
var Moon = colony('Moon', 'W36S11', 'W37S11')
var Deimos = colony('Deimos', 'W35S11', 'W37S11')
var Io = colony('Io', 'W37S13', 'W37S11')
var Amalthea = colony('Amalthea', 'W38S13', 'W38S11')
var Vodka = wild('Vodka', 'W36S14', 'W36S13')
var Mars = metropolia('Mars', 'W38S11')
var Phobos = colony('Phobos', 'W39S11', 'W38S11')
var Phoebe = colony('Phoebe', 'W38S12', 'W38S11')
var Saturn = metropolia('Saturn', 'W36S13')
var Venus = metropolia('Venus', 'W34S12')
var Jupiter = metropolia('Jupiter', 'W39S13')
var Europa = colony('Europa', 'W39S12', 'W39S13')
var Enceladus = colony('Enceladus', 'W38S14', 'W39S13')
var Titan = colony('Titan', 'W35S12', 'W34S12')
var Oberon = colony('Oberon', 'W35S13', 'W34S12')
var Himalia = colony('Himalia', 'W36S12', 'W36S13')
var Callisto = colony('Callisto', 'W39S14', 'W39S13')
var Ganymede = colony('Ganymede', 'W34S13', 'W34S12')
var Hyperion = colony('Hyperion', 'W33S13', 'W34S12')
var Common = common()

var spawns = {
  'Earth': [].concat.apply([], [
    Earth, ISS, Moon, Mars, Deimos, Io,
    Phobos, Phoebe, Titan, Europa, Oberon, 
    Amalthea, Venus, Jupiter, Hyperion,
    Saturn,
    Common
  ]),
  'Mars': [].concat.apply([], [
    Mars, Phobos, Phoebe, Amalthea,
    Earth, Europa, Jupiter, Enceladus, 
    Io, Callisto,
    Common
  ]),
  'Venus': [].concat.apply([], [
    Venus, Titan, Oberon, Ganymede, 
    Saturn, Himalia, Deimos, Moon, 
    Earth, Hyperion,
    Common
  ]),
  'Jupiter': [].concat.apply([], [
    Jupiter, Callisto, Europa, Enceladus,
    Amalthea, Io, Phoebe, Mars, Earth, 
    ISS, Vodka,
    Common
  ]),
  'Saturn': [].concat.apply([], [
    Saturn, Himalia, Titan, Oberon,
    Venus, Hyperion, Deimos, Ganymede, 
    Moon, Earth,
    Common
  ])
}

module.exports = {
  rooms: {
    'W37S11': 'Earth',
    'W38S11': 'Mars',
    'W34S12': 'Venus',
    'W39S13': 'Jupiter',
    'W36S13': 'Saturn'
  },
  spawns: spawns
}
