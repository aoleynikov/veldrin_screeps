let common = require('swarm.common')

const extension = [TOUGH, ATTACK, MOVE]
const base = []

const hostile_entities = (room) => {
  [].concat.apply([],
    [
      FIND_HOSTILE_CREEPS,
      FIND_HOSTILE_STRUCTURES,
      FIND_HOSTILE_SPAWNS,
      FIND_HOSTILE_CONSTRUCTION_SITES,
      FIND_HOSTILE_POWER_CREEPS
    ].map((find) => {
      return room.find(find)
    })
  )
}

const size = (core, room) => {
  return 8
}

const name_prefix = (core, room) => {
  return 'guard_' + room + '_'
}

const count = (core, room_ic) => {
  let room = Game.rooms[room]
  if (!room) return 0
  return hostile_entities(room).length
}

const memory = (core, room) => {
  return {
    type: 'swarm',
    role: 'warrior',
    squad: room
  }
}

const body = (core, room) => {
  let core_room = Game.rooms[core]
  return build_body(
    base,
    extension,
    core_room.energyCapacityAvailable,
    size(core)
  )
}

module.exports = {
  name_prefix: name_prefix,
  size: size,
  count: count,
  memory: memory,
  body: body
}