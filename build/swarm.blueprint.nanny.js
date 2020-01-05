let common = require('swarm.bluerint.common');

module.exports = {
  extension: [CARRY, MOVE],
  base: [WORK],
  name_prefix: (core, room) => {
    return "nanny_" + room.name + "_" + this.size(core) + "_";
  },
  size: core => {
    return [1, 2, 3, 3, 3][core.controller.level];
  },
  count: (core, room) => {
    if (core != room) return 0;
    return [1, 3, 3, 4, 4, 5, 1, 1, 1][core.controller.level];
  },
  memory: (core, room) => {
    return {
      swarm: false,
      role: "nanny",
      energy_room: room.name,
      workplace: core.name
    };
  },
  body: core => {
    return common.build_body(unit_blueprints[type].base, unit_blueprints[type].extension, from.energyCapacityAvailable, this.level(from));
  }
};