let common = require('swarm.common')

const basic_repairer = [WORK, MOVE, CARRY]
const tower_operator = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]

const has_tower = (room_id) => {
  let room = Game.rooms[room_id]
  let towers = room.find(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  })
  return towers.size > 0
}

const name_prefix = (core, room) => {
  return 'repairer_' + room + '_'
}

const count = (core, room) => {
  return 1
}

const memory = (core, room) => {
  return {
    role: 'repairer',
    refill: true,
    type: 'swarm',
    work_place: room,
    energy_room: room
  }
}

const body = (core, room) => {
  if (has_tower(room)) {
    return basic_repairer
  } else {
    return tower_operator
  }
}

module.exports = {
  name_prefix: name_prefix,
  count: count,
  memory: memory,
  body: body
}