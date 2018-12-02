/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
module.exports = {
  templates: [{
    count: 3,
    name_prefix: 'nanny_Earth_',
    body: [WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'nanny',
      target: 'W13S51'
    }
  }, {
    count: 3,
    name_prefix: 'upgrader_Earth_',
    body: [WORK, WORK, CARRY, MOVE],
    memory: {
      role: 'upgrader',
      target: 'W13S51'
    }
  }, {
    count: 3,
    name_prefix: 'builder_',
    body: [WORK, WORK, CARRY, MOVE],
    memory: {
      role: 'builder'
    }
  }, {
    count: 2,
    name_prefix: 'repairer_',
    body: [WORK, WORK, CARRY, MOVE],
    memory: {
      role: 'repairer'
    }
  }]
};