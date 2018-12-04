/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
module.exports = {
  templates: [{
    count: 2,
    name_prefix: 'miner_Earth_',
    body: [WORK, WORK, WORK, WORK, WORK, MOVE],
    memory: {
      role: 'miner'
    }
  }, {
    count: 3,
    name_prefix: 'nanny_Earth_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'nanny',
      target: 'W37S11',
      refill: true
    }
  }, {
    count: 5,
    name_prefix: 'upgrader_Earth_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'upgrader',
      target: 'W37S11',
      refill: true,
      type: 'swarm'
    }
  }, {
    count: 3,
    name_prefix: 'builder_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm'
    }
  }, {
    count: 2,
    name_prefix: 'repairer_Earth_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'repairer',
      refill: true,
      type: 'swarm',
      target: 'W37S11'
    }
  }]
};