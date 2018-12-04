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
    count: 6,
    name_prefix: 'upgrader_from_Moon_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'upgrader',
      refill: true,
      type: 'swarm',
      work_place: 'W37S11',
      energy_room: 'W38S11'
    }
  }, {
    count: 6,
    name_prefix: 'upgrader_from_Mars_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'upgrader',
      refill: true,
      type: 'swarm',
      work_place: 'W37S11',
      energy_room: 'W37S12'
    }
  }, {
    count: 6,
    name_prefix: 'upgrader_from_ISS_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'upgrader',
      refill: true,
      type: 'swarm',
      work_place: 'W37S11',
      energy_room: 'W36S11'
    }
  }, {
    count: 1,
    name_prefix: 'scout_',
    body: [MOVE],
    memory: {
      role: 'scout'
    }
  }];
};