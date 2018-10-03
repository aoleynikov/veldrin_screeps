var main_spawn = Game.spawns['Main']


module.exports = {
    get_rooms: function () {
        var result = []
        for (var room in main_spawn.memory['empire_rooms']) {
            result.push(Game.rooms[room]);
        }
        return result;
    }
}