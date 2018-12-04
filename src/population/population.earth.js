var colony = require('population.colony')

module.exports = function(room_id) {
  return [
    {
      count: 3,
      name_prefix: 'nanny_Earth_',
      body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'nanny',
        target: room_id,
        refill: true
      }
    },
    {
      count: 2,
      name_prefix: 'upgrader_Earth_',
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'upgrader',
        target: room_id,
        refill: true,
        type: 'swarm'
      }
    }
  ].concat(colony('Earth', room_id))
};