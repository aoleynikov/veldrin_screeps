let common = require('swarm.common');

const extension = [WORK, MOVE, CARRY];
const base = [WORK, MOVE, CARRY];

const size = (core, room) => {
  return 16;
};

const name_prefix = (core, room) => {
  return "builder_" + room + "_";
};

const count = (core, room) => {
  let core_room = Game.rooms[core];
  return [0, 6, 6, 6, 6, 6, 6, 6, 6][core_room.controller.level];
};

const memory = (core, room) => {
  return {
    role: 'builder',
    refill: true,
    type: 'swarm',
    sticky: true,
    work_place: room,
    energy_room: room,
    fallback_room: core
  };
};

const body = (core, room) => {
  let core_room = Game.rooms[core];
  return common.build_body(base, extension, core_room.energyCapacityAvailable, size(core));
};

module.exports = {
  name_prefix: name_prefix,
  size: size,
  count: count,
  memory: memory,
  body: body
};