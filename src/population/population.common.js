var upgrader_body = [
  WORK, WORK, WORK, WORK, WORK, 
  CARRY, CARRY, CARRY, CARRY, CARRY,
  MOVE, MOVE, MOVE, MOVE, MOVE
]

var upgrader = (from, to) => {
  return {
    count: 4,
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
  upgrader('W5S52', 'W5S53'),
  upgrader('W6S53', 'W6S53')
]

module.exports = function() {
  return [].concat(upgraders)
}