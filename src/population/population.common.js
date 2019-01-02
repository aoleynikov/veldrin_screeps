var upgrader_body = [
  WORK, WORK, WORK, WORK, WORK, WORK,
  CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE  
]

var upgrader_for = (from, to) => {
  return {
    count: 1,
    name_prefix: 'upgrader_from_' + from,
    body: upgrader_body,
    memory: {
      role: upgrader_body,
      refill: true,
      type: swarm,
      energy_room: from,
      work_place: to
    }
  }
}

upgraders = [
  upgrader_for('W38S13', 'W38S11'),
  upgrader_for('W37S13', 'W37S11'),
  upgrader_for('W38S15', 'W39S13'),
  upgrader_for('W36S13', 'W34S12'),
  upgrader_for('W34S13', 'W34S12'),
  upgrader_for('W33S12', 'W34S12'),
  upgrader_for('W33S11', 'W34S12'),
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
  }].concat(upgraders)
}