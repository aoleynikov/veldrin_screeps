module.exports = {
  harvesting_positions: [],
  harvesters: [],
  dx: [0, 1, 1, -1, -1, -1, 0, 1],
  dy: [1, 1, 0, 1, 0, -1, -1, -1],
  init: function (room) {
    energy_sources = room.find(FIND_SOURCES);
    for (var source_index = 0; source_index < energy_sources.length; ++source_index) {
      source = energy_sources[source_index]
      for (var i = 0; i < this.dx.length; ++i) {
        new_position = {
          x: source.pos.x + this.dx[i],
          y: source.pos.y + this.dy[i]
        }

        terrain = room.getTerrain().get(new_position.x, new_position.y)
        if (terrain == 0) { // https://docs.screeps.com/api/#Room.Terrain.get
          this.harvesting_positions.push(new_position);
        }
      }
    }
  },
  assign: function (creep) {
    for (var i = 0; i < this.harvesting_positions.length; ++i) {
      if (this.harvesters[i] === null) {
        harvesters[i] = creep;
        return;
      }
    }
  },
  get_workers_deficit: function () {
    var result = 0;
    for (var i = 0; i < this.harvesting_positions.length; ++i) {
      if (this.harvesters[i] === null) ++result;
    }
    return result;
  },
  get_work_place: function (creep) {
    for (var i = 0; i < this.harvesters.length; ++i) {
      if (this.harvesters[i].id == creep.id) {
        return this.hervesting_positions[i];
      }
    }
  }
};