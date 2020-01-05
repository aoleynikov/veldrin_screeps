let common = require('swarm.common')

const extension = [CARRY, MOVE]
const base = [WORK]

const size = (core) => {
  let core_room = Game.rooms[core]
  return [1, 2, 3, 3, 3][core_room.controller.level]
}

const name_prefix = (core, room) => {
  return "nanny_" + room + "_" + size(core) + "_"
}

const count = (core, room) => 
{
  if (core != room) return 0
  let core_room = Game.rooms[core]
  return [1, 3, 3, 4, 4, 5, 1, 1, 1][core_room.controller.level]
}

const memory = (core, room) => { 
  return {
    swarm: false,
    role: "nanny",
    energy_room: room,
    workplace: core
  }
}

const body = (core) => {
  let core_room = Game.rooms[core]
  return common.build_body(
    base, 
    extension, 
    core_room.energyCapacityAvailable, 
    size(core)
  )
}

module.exports = {
  extension: extension,
  base: base,
  name_prefix: name_prefix,
  size: size,
  count: count,
  memory: memory,
  body: body
}