let common = require('swarm.common')

const name_prefix = (core, room) => {
  return "claimer_" + room + '_'
}

const count = (core, room_id) => {
  let core_room = Game.rooms[core]
  if (core_room.controller.level <= 3) {
    return 0
  }
  room = Game.rooms[room_id]
  if (!room) return 1
  if (!room.controller) return 0
  if (!room.controller.reservation) return 1
  if (room.controller.reservation.ticksToEnd < 3000) return 1
}

const memory = (core, room) => { 
  return {
    target: room,
    role: 'claimer',
    type: 'swarm',
    claiming: room == core
  }
}

const body = (core, room) => {
  return [CLAIM, CLAIM, MOVE, MOVE]
}

module.exports = {
  name_prefix: name_prefix,
  size: size,
  count: count,
  memory: memory,
  body: body
}