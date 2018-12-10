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
    count: 1,
    name_prefix: 'sniper_alpha_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'sniper',
      squad: 'war'
    }
  },
  {
    count: 1,
    name_prefix: 'sniper_beta_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'sniper',
      squad: 'harrass'
    }
  },
  {
    count: 10,
    name_prefix: 'upgrade_boost_',
    body: [
      WORK, WORK, WORK, WORK, WORK, 
      CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
      MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'upgrader',
      type: 'swarm',
      refill: true,
      energy_room: 'W37S11',
      work_place: 'W38S11'
    }
  }]
}