/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
var templates = [];
var rooms = [require('population.earth')('W37S11'), require('population.colony')('Moon', 'W38S11', 'W37S11'), require('population.common')()];

for (var room of rooms) {
  templates = templates.concat(room);
}

module.exports = {
  templates: templates
};