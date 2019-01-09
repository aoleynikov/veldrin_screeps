const HAULERS_COUNT = {
  1: 1,
  2: 3,
  3: 3,
  4: 5,
  5: 5,
  6: 7,
  7: 7,
  8: 7,
  9: 10,
  10: 10
}

var haulers_count = (room_id, target_room_id) => {
  var room = Game.rooms[room_id]
  if (!room) return 0

  var distance = Game.map.findRoute(room_id, target_room_id).length
  var sources_count = room.find(FIND_SOURCES_ACTIVE).length
  return HAULERS_COUNT[sources_count * distance] || 1
}

var builders_count = () => {
  for (var id in Game.constructionSites) {
    return 1
  }
  return 0
}

module.exports = function(room_name, room_id, metropolia_id) {
  var room_postfix = '_' + room_name + '_'
  return [
    {
      count: 3,
      name_prefix: 'warrior' + room_postfix,
      body: [
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
        ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
        ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
      ],
      memory: {
        type: 'swarm',
        role: 'warrior',
        squad: room_name
      }
    },
    {
      count: 1,
      name_prefix: 'healer' + room_postfix,
      body: [
        HEAL, HEAL, HEAL, HEAL, HEAL, 
        MOVE, MOVE, MOVE, MOVE, MOVE
      ],
      memory: {
        type: 'swarm',
        role: 'healer',
        squad: room_name
      }
    },
    {
      count: 3,
      name_prefix: 'miner' + room_postfix,
      body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
             WORK, WORK, WORK, WORK, WORK, WORK, WORK,
             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'miner',
        target: room_id,
        type: 'swarm',
        find: FIND_SOURCES,
        resource: RESOURCE_ENERGY
      }
    },
    {
      count: 1,
      name_prefix: 'repairer' + room_postfix,
      body: [
        WORK, WORK, WORK, WORK, WORK, 
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
      ],
      memory: {
        role: 'repairer',
        refill: true,
        type: 'swarm',
        work_place: room_id,
        energy_room: room_id
      }
    },
    {
      count: builders_count(),
      name_prefix: 'builder_from' + room_postfix,
      body: [WORK, WORK, CARRY, CARRY, CARRY,
             CARRY, CARRY, CARRY, CARRY, CARRY,
             MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'builder',
        refill: true,
        type: 'swarm',
        energy_room: room_id
      }
    },
    {
      count: 2 * haulers_count(room_id, metropolia_id),
      name_prefix: 'hauler_from' + room_postfix,
      body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
             CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'hauler',
        refill: true,
        type: 'swarm',
        energy_room: room_id,
        work_place: metropolia_id,
        resource: RESOURCE_ENERGY
      }
    }
  ]
}