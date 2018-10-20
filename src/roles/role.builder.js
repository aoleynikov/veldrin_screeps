var upgrader_role = require('role.upgrader');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var build = function (creep) {
    for (var id in Game.constructionSites) {
        var site = Game.getObjectById(id);

        creep.memory['target'] = site.room.name;
        creep.memory['energy_room'] = site.room.name;

        var build_result = creep.build(site);
        if (build_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(site);
            return true;
        } else if (build_result == ERR_NOT_ENOUGH_ENERGY) {
            energy_behavior.refill(creep);
            return true;
        } else if (build_result == 0) {
            return true;
        }
    }
    return false;
};

var work = function (creep) {
    var busy = build(creep);
    if (!busy) {
        upgrader_role.perform(creep);
    }
};

export function perform(creep) {
    if (room_travel.perform(creep)) return;
    if (energy_behavior.perform(creep)) return;
    work(creep);
}