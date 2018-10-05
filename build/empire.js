var main_spawn = Game.spawns['Main'];
module.exports = {
  get_rooms: function () {
    var result = [main_spawn.room];

    for (var room in main_spawn.memory['colonies']) {
      result.push(Game.rooms[room]);
    }

    return result;
  },
  get_construction_sites: function () {
    var rooms = this.get_rooms();
    var result = [];

    for (var room of rooms) {
      var sites = room.find(FIND_MY_CONSTRUCTION_SITES);

      for (var site of sites) {
        result.push(site);
      }
    }

    return result;
  }
};