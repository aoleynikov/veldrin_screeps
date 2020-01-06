let common = require('swarm.common')

const extension = [MOVE, CARRY]
const base = []

const size = (core, room) => {
  return 20
}

const name_prefix = (core, room) => {
  return "hauler_" + room + "_"
}

const count = (core, room) => {
  let core_room = Game.rooms[core]
  if (!core_room || !core_room.controller) return 0
  let target_room = Game.rooms[room]
  let storages = core_room.find(FIND_STRUCTURES, {
    filter: {
        structureType: STRUCTURE_STORAGE
    }
  })
  if (storages.length == 0) {
    return 0
  }
  else {
    let energy_adjust = 1
    if (target_room) {
      let mining_containers = target_room.find(FIND_STRUCTURES, 
        { 
          filter: (c) => {
          return c.structureType == STRUCTURE_CONTAINER && 
            has_adjacent_source(c)
        }
      })
      energy_adjust = mining_containers.size
    }
    return energy_adjust * Game.map.findRoute(core, room).size
  }
}

const memory = (core, room) => { 
  return {
    role: 'hauler',
    refill: true,
    type: 'swarm',
    energy_room: room,
    work_place: core,
    resource: RESOURCE_ENERGY
  }
}

const body = (core, room) => {
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
  size: size,
  count: count,
  memory: memory,
  body: body
}