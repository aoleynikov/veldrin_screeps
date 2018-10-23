module.exports = {
    perform: function (creep) {
        var squad = creep.memory['squad'];
        var flag = Game.flags[squad] || Game.flags['Rax'];
        if (flag.room.name != creep.room.name) {
            creep.moveTo(flag);
            return true;
        }
        return false;
    }
}