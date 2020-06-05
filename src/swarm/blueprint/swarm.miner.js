let common = require('swarm.common')

const has_adjacent_source = (container) => {
  let pos = container.pos
  return pos.findInRange(FIND_SOURCES, 1).length >= 1
}

const extension = [MOVE]
const base = [WORK, WORK, WORK, WORK, WORK]

const size = (core) => {
  let core_room = Game.rooms[core]
  return Math.min(core_room.controller.level, 3)
}

const name_prefix = (core, room) => {
  return 'miner_' + room + '_'
}

const count = (core, room) => {
  let target_room = Game.rooms[room]
  if (!target_room) return 0
  let mining_containers = target_room.find(FIND_STRUCTURES, {
    filter: (c) => {
      return c.structureType == STRUCTURE_CONTAINER &&
        has_adjacent_source(c)
    }
  })
  if (mining_containers.length === undefined) {
    return 0
  }
  return mining_containers.length
}

const memory = (core, room) => {
  return {
    role: 'miner',
    target: room,
    work_place: room,
    type: 'swarm',
    find: FIND_SOURCES,
    resource: RESOURCE_ENERGY
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
  name_prefix: name_prefix,
  count: count,
  memory: memory,
  body: body
}