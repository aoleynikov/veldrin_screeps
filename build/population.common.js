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
    count: 1,
    name_prefix: 'scout_',
    body: [MOVE],
    memory: {
      role: 'scout',
      type: 'swarm'
    }
  }, {
    count: 1,
    name_prefix: 'destroyer_',
    body: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    target: {
      role: 'destroyer',
      type: 'swarm',
      squad: 'war'
    }
  }, {
    count: 2,
    name_prefix: 'sniper_',
    body: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
    memory: {
      role: 'sniper',
      type: 'swarm',
      squad: 'war'
    }
  }];
};