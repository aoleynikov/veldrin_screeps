var upgrader_body = [
  WORK, WORK, WORK, WORK, WORK, WORK,
  WORK, WORK, WORK,
  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
  MOVE, MOVE, MOVE
]

var upgrader = (from, to) => {
  return {
    count: 1,
    name_prefix: 'upgrader_from_' + from + '_',
    body: upgrader_body,
    memory: {
      role: upgrader_body,
      refill: true,
      type: 'swarm',
      energy_room: from,
      work_place: to
    }
  }
}

var upgraders = [
  upgrader('W38S13', 'W38S11'),
  upgrader('W37S13', 'W37S11'),
  upgrader('W38S15', 'W39S13'),
  upgrader('W36S13', 'W34S12'),
  upgrader('W34S13', 'W34S12'),
  upgrader('W33S12', 'W34S12'),
  upgrader('W33S11', 'W34S12'),
]

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
    name_prefix: 'extra_repairer_Callisto_',
    body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      type: 'swarm',
      role: 'repairer',
      work_place: 'W39S14',
      target: 'W39S14'
    }
  },
  {
    count: 10,
    name_prefix: 'rm_',
    body: [
      ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, 
      ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
      MOVE, MOVE, MOVE, MOVE, MOVE, 
      MOVE, MOVE, MOVE, MOVE, MOVE
    ],
    memory: {
      type: 'swarm',
      role: 'warrior',
      squad: 'rm'
    }
  }].concat(upgraders)
}