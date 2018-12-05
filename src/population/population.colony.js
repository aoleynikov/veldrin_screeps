var miners_count = (room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 1
  return Game.rooms[room_id].find(FIND_SOURCES_ACTIVE).length;
}

var claimers_count = (room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 1
  if (room.controller.owner.name == 'Veldrin') {
    return 0
  }
  return 1
}

module.exports = function(room_name, room_id) {
  var room_postfix = '_' + room_name + '_'
  return [
    {
      count: miners_count(room_id),
      name_prefix: 'miner' + room_postfix,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: 'miner',
        target: room_id,
        type: 'swarm',
        find: FIND_SOURCES_ACTIVE,
        resource: RESOURCE_ENERGY
      }
    },
    {
      count: 2,
      name_prefix: 'repairer' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'repairer',
        refill: true,
        type: 'swarm',
        work_place: room_id,
        energy_room: room_id
      }
    },
    {
      count: claimers_count(room_id),
      name_prefix: 'claimer' + room_postfix,
      body: [CLAIM, MOVE],
      memory: {
        target: room_id
      }
    },
    {
      count: 2,
      name_prefix: 'builder_from' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'builder',
        refill: true,
        type: 'swarm'
      }
    }
  ]
}