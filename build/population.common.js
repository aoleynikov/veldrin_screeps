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
    count: 3,
    name_prefix: 'dissolver_',
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'dissolver',
      resource_room: 'W52N4',
      rowk_place: 'W56N2'
    }
  }, {
    count: 5,
    name_prefix: 'sniper_',
    body: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
    memory: {
      role: 'sniper',
      type: 'swarm',
      squad: 'FacelessVoid'
    }
  }, {
    count: 5,
    name_prefix: 'warrior_',
    body: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
    memory: {
      role: 'sniper',
      type: 'swarm',
      squad: 'rm'
    }
  }].concat(upgraders);
};