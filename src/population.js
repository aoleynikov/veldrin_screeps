/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

var templates = []

var colony = require('population.colony')
var metropolia = require('population.metropolia')
var police = require('population.police')
var common = require('population.common');

var rooms = [
  police(),
  metropolia('Earth', 'W37S11'),
  metropolia('Mars', 'W38S11'),
  metropolia('Venus', 'W34S12'),
  metropolia('Jupiter', 'W39S13'),
  colony('ISS', 'W37S12', 'W37S11'),
  colony('Phobos', 'W39S11', 'W38S11'),
  colony('Moon', 'W36S11', 'W37S11'),
  colony('Phoebe', 'W38S12', 'W38S11'),
  colony('Titan', 'W35S12', 'W34S12'),
  colony('Oberon', 'W35S13', 'W34S12'),
  colony('Callisto', 'W39S14', 'W39S13'),
  colony('Europa', 'W39S12', 'W39S13'),
  colony('Ganymede', 'W34S13', 'W34S12'),
  colony('Deimos', 'W35S11', 'W37S11'),
  colony('Io', 'W37S13', 'W37S11'),
  common()
]

for(var room of rooms) {
  templates = templates.concat(room)
}

module.exports = {
  templates: templates
}
