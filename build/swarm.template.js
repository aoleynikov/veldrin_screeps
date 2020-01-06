let common = require('swarm.common');

const extension = [];
const base = [];

const size = core => {
  let core_room = Game.rooms[core];
  return [0, 1, 3, 4, 5][core_room.controller.level];
};

const name_prefix = (core, room) => {
  return "miner_" + room + "_" + size(core) + "_";
};

const count = (core, room) => {};

const memory = (core, room) => {
  return {
    swarm: false,
    role: "miner",
    energy_room: room,
    workplace: core
  };
};

const body = core => {
  let core_room = Game.rooms[core];
  return common.build_body(base, extension, core_room.energyCapacityAvailable, size(core));
};

module.exports = {
  extension: extension,
  base: base,
  name_prefix: name_prefix,
  size: size,
  count: count,
  memory: memory,
  body: body
};