var colony = require('population.colony')

module.exports = function(room_id) {
  return colony('Mars', room_id).concat([
    {
      count: 3,
      name_prefix: 'nanny_Mars_',
      body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'nanny',
        target: room_id,
        refill: true
      }
    },
    {
      count: 2,
      name_prefix: 'upgrader_Mars_',
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'upgrader',
        target: room_id,
        refill: true,
        type: 'swarm',
        sticky: true
      }
    }
  ])
};