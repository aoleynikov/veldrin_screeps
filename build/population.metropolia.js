var colony = require('population.colony');

var nannies_func = (room_name, room_id) => (count, prefix, body) => {
  return {
    count: count,
    name_prefix: prefix + 'nanny_' + room_name + '_',
    body: body,
    memory: {
      role: 'nanny',
      target: room_id,
      refill: true
    }
  };
};

var upgraders_func = (room_name, room_id) => (count, body) => {
  return {
    count: count,
    name_prefix: 'upgrader_' + room_name + '_',
    body: body,
    memory: {
      role: 'upgrader',
      target: room_id,
      refill: true,
      type: 'swarm'
    }
  };
};

module.exports = function (room_name, room_id) {
  var level = Game.rooms[room_id].controller.level;
  nannies = nannies_func(room_name, room_id);
  upgraders = upgraders_func(room_name, room_id);
  var creeps = [[], [nannies(1, 'small_', [WORK, CARRY, CARRY, MOVE, MOVE]), upgraders(3, [WORK, CARRY, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])], [nannies(3, '', [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]), upgraders(3, [WORK, WORK, CARRY, CARRY, MOVE, MOVE])]];
  return creeps[level].concat(colony(room_name, room_id));
};