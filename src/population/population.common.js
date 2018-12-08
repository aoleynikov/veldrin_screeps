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