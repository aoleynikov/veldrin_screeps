const NETWORK = {
  'W5S52': ['W5S53']
};
const unit_types = ["nanny"];

const unit_blueprints = () => {
  let result = {};
  unit_types.map(k => {
    return [k, require('swarm.' + k)];
  }).forEach(el => {
    result[el[0]] = el[1];
  });
  return result;
};

const room_creeps = (core, room) => {
  unit_types.map(type => {
    let blueprint = unit_blueprints()[type];
    return {
      count: blueprint.count(core, room),
      name_prefix: blueprint.name_prefix(core, room),
      memory: blueprint.memory(core, room),
      body: blueprint.body(core)
    };
  });
};

const creeps = () => {
  let result = {};
  Object.entries(NETWORK).forEach(core => {
    let covered_rooms = [core[0]].concat[core[1]];
    let creeps_per_room = covered_rooms.map(room => room_creeps(core[0], room));
    let creeps = [].concat.apply([], creeps_per_room);
    result[core[0]] = creeps;
  });
  return result;
};

module.exports = {
  creeps: creeps
};