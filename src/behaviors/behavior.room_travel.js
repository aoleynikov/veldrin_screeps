module.exports = {
    perform: function (creep) {
        if (creep.memory['target'] === undefined) return false;
        if (creep.room.name != creep.memory['target']) {
            var route = Game.map.findRoute(creep.room.name, room_name);
            var exitDir = Game.map.findExit(route[0].exit);
            var exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
            return true;
        }
        return false;
    }
}