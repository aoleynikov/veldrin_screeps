var upgrader_body = [
  WORK, WORK, WORK, WORK, WORK, WORK,
  WORK, WORK, WORK,
  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
  CARRY, CARRY, CARRY,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
]

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
  }
}

var upgraders = [
  
]

module.exports = function() {
  return [{
    count: 3,
    name_prefix: 'builder_',
    body: [WORK, CARRY, CARRY, MOVE, MOVE],
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
    count: 1,
    name_prefix: 'dissolver_',
    body: [
      WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
      CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
      MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ],
    memory: {
      type: 'swarm',
      role: 'dissolver',
      energy_room: 'W34S11',
      work_place: 'W34S12'
    }
  },
  {
    count: 4,
    name_prefix: 'upgrader_',
    body: upgrader_body,
    memory: {
      type: 'swarm',
      role: 'upgrader',
      work_place: 'W34S12',
      energy_room: 'W34S12'
    }
  }].concat(upgraders)
}