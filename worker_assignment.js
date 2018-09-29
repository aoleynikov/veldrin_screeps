var harvesting_positions = [];
var harvesters = [];
var dx = [0, 1, 1, -1, -1, -1, 0, 1];
var dy = [1, 1, 0, 1, 0, -1, -1, -1];

module.exports = {
  init: function (room) {
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
          harvesting_positions.push(new_position);
        }
      }
    }
    console.log(harvesting_positions);
  },
  assign: function (creep) {
    for (var i = 0; i < harvesting_positions.length; ++i) {
      if (harvesters[i] === null) {
        harvesters[i] = creep;
        return;
      }
    }
  },
  get_workers_deficit: function () {
    var result = 0;
    for (var i = 0; i < harvesting_positions.length; ++i) {
      if (harvesters[i] === null) ++result;
    }
    return result;
  },
  get_work_place: function (creep) {
    for (var i = 0; i < harvesters.length; ++i) {
      if (harvesters[i].id == creep.id) {
        return hervesting_positions[i];
      }
    }
  }
}