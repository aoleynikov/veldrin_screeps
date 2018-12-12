module.exports = function () {
  return [{
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
    name_prefix: 'extra_repairer_Callisto_',
    body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'repairer',
      work_place: 'W39S14',
      target: 'W39S14'
    }
  }, {
    count: 1,
    name_prefix: 'sniper_alpha_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'sniper',
      squad: 'war'
    }
  }, {
    count: 10,
    name_prefix: 'upgrader_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
    memory: {
      role: 'upgrader',
      type: 'swarm',
      work_place: 'W37S11',
      energy_room: 'W37S11',
      refill: true
    }
  }];
};