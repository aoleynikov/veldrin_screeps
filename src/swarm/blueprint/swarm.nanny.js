let common = require('swarm.common')

module.exports = {
  extension: [CARRY, MOVE],
  base: [WORK],
  name_prefix: (core, room) => {
    return "nanny_" + room + "_" + this.size(core) + "_"
  },
  size: (core) => {
    let core_room = Game.rooms[core]
    return [1, 2, 3, 3, 3][core_room.controller.level]
  },
  count: (core, room) => 
  {
    if (core != room) return 0
    let core_room = Game.rooms[core]
    return [1, 3, 3, 4, 4, 5, 1, 1, 1][core_room.controller.level]
  },
  memory: (core, room) => { 
    return {
      swarm: false,
      role: "nanny",
      energy_room: room,
      workplace: core
    }
  },
  body: (core) => {
    let core_room = Game.rooms[core]
    return common.build_body(unit_blueprints[type].base, 
    unit_blueprints[type].extension, 
    core_room.energyCapacityAvailable, 
    this.size(core))
  }
}