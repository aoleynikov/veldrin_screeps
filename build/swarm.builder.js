let common = require('swarm.common');

const extension = [WORK, MOVE, CARRY];
const base = [WORK, MOVE, CARRY];

const construction_sites = room => {
  let target_room = Game.rooms[room];
  if (!target_room) return [];
  return target_room.find(FIND_CONSTRUCTION_SITES);
};

const size = (core, room) => {
  return 20;
};

const name_prefix = (core, room) => {
  return "builder_" + room + "_" + size(core) + "_";
};

const count = (core, room) => {
  return construction_sites(room).length;
};

const memory = (core, room) => {
  return {
    role: 'builder',
    refill: true,
    type: 'swarm',
    work_place: room,
    energy_room: room
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