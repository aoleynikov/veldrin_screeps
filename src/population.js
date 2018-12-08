/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

var templates = []

var colony_function = require('population.colony')

var rooms = [
  require('population.earth')('W37S11'),
  require('population.mars')('W38S11'),
  require('population.venus')('W34S12'),
  require('population.jupiter')('W39S13'),
  colony_function('ISS', 'W37S12', 'W37S11'),
  colony_function('Moon', 'W36S11', 'W37S11'),
  colony_function('Phobos', 'W39S11', 'W37S11'),
  colony_function('Deimos', 'W35S11', 'W37S11'),
  colony_function('Io', 'W37S13', 'W37S11'),
  colony_function('Titan', 'W35S12', 'W37S11'),
  require('population.common')()
]

for(var room of rooms) {
  templates = templates.concat(room)
}

module.exports = {
  templates: templates
}
