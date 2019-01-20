var upgrader_body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

var upgrader = (from, to) => {
  return {
    count: 2,
    name_prefix: 'upgrader_from_' + from + '_',
    body: upgrader_body,
    memory: {
      role: 'upgrader',
      refill: true,
      type: 'swarm',
      energy_room: from,
      work_place: to
    }
  };
};

var upgraders = [];

module.exports = function () {
  return [{
    count: 5,
    name_prefix: 'builder_',
    body: [WORK, CARRY, MOVE, CARRY, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm',
      energy_room: 'W55N2',
      sticky: true
    }
  }, {
    count: 10,
    name_prefix: 'builder_',
    body: [WORK, CARRY, MOVE, CARRY, MOVE],
    memory: {
      role: 'builder',
      refill: true,
      type: 'swarm',
      energy_room: 'W56N3',
      sticky: true
    }
  }].concat(upgraders);
};