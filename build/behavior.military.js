module.exports = {
    perform: function (creep) {
        var squad = creep.memory['squad'];
        var flag = Game.flags[squad] || Game.flags['Rax'];
        creep.moveTo(flag);
    }
}