var colony = require('population.colony')

var nannies_func = (room_name, room_id) => (count, prefix, size) => {
  var body = [WORK, CARRY, MOVE]
  size--

  for(var i = 0; i < size; ++i) {
    body.push(CARRY)
    body.push(CARRY)
  }
  for(var i = 0; i < size; ++i) {
    body.push(MOVE)
  }

  return {
    count: count,
    name_prefix: prefix + 'nanny_' + room_name + '_',
    body: body,
    memory: {
      role: 'nanny',
      target: room_id,
      refill: true
    }
  }
}

var upgraders_func = (room_name, room_id) => (count, size) => {
  var body = [WORK, CARRY, MOVE]
  size--

  for(var i = 0; i < size; ++i) {
    body.push(WORK)
  }

  for(var i = 0; i < size; ++i) {
    body.push(CARRY)
  }
  for(var i = 0; i < size; ++i) {
    body.push(MOVE)
  }

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
  }
}

module.exports = function(room_name, room_id) {
  var level = Game.rooms[room_id].controller.level

  nannies = nannies_func(room_name, room_id)
  upgraders = upgraders_func(room_name, room_id)

  var creeps = {
    1: [
      nannies(1, 'small_', 1),
      upgraders(3, 1)
    ],
    2: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      upgraders(3, 1)
    ],
    3: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      upgraders(3, 3)
    ],
    4: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      upgraders(3, 3)
    ],
    5: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      nannies(1, 'large_', 8),
      upgraders(3, 3)
    ],
    6: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      nannies(1, 'large_', 8),
      upgraders(3, 3)
    ],
    7: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      nannies(1, 'large_', 8),
      upgraders(3, 3)
    ],
    8: [
      nannies(1, 'small_', 1),
      nannies(2, '', 3),
      nannies(1, 'large_', 8),
      upgraders(3, 3)
    ]
  }

  return creeps[level].concat(colony(room_name, room_id));
}