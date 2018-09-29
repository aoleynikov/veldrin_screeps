var harvesting_positions = [];
var dx = [0, 1, 1, -1, -1, -1, 0, 1];
var dy = [1, 1, 0, 1, 0, -1, -1, -1];

var init = function (room) {
  if (room.memory['harvesting_positions']) {
    return;
  }
  room.memory['harvesting_positions'] = [];
  room.memory['harvesters'] = [];
  energy_sources = room.find(FIND_SOURCES);
  for (var source_index = 0; source_index < energy_sources.length; ++source_index) {
    source = energy_sources[source_index]
    for (var i = 0; i < dx.length; ++i) {
      new_position = {
        x: source.pos.x + dx[i],
        y: source.pos.y + dy[i]
      }

      terrain = room.getTerrain().get(new_position.x, new_position.y)
      if (terrain == 0) { // https://docs.screeps.com/api/#Room.Terrain.get
        room.memory['harvesting_positions'].push(new_position);
      }
    }
  }
}

module.exports = {
  assign: function (creep) {
    init(creep.room);

    work_place_index = creep.memory['work_place_index']
    positions = creep.room.memory['harvesting_positions'];
    if (work_place_index === undefined) {
      harvesters_count = creep.room.memory['harvesters'].length;
      positions_count = positions.length;
      work_place_index = harvesters_count % positions_count;
      creep.room.memory['harvesters'].push(creep);
    }

    creep.memory['work_place'] = positions[work_place_index];
    return creep.memory['work_place'];
  },
  get_workers_deficit: function (room) {
    throw 'Not implemented';
  }
}