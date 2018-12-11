module.exports = function() {
  return [{
    count: 3,
    name_prefix: 'builder_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm'
    }
  },
  {
    count: 0,
    name_prefix: 'sniper_alpha_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'sniper',
      squad: 'war'
    }
  }]
}