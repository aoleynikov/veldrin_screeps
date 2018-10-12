module.exports = {
    perform: function (creep) {
        if (creep.memory['target'] === undefined) return false;
        if (creep.room.name != creep.memory['target']) {
            var route = Game.map.findRoute(creep.room.name, creep.memory['target']);
            var exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit, {reusePath: 50});
            return true;
        }
        return false;
    }
}