var upgrader_role = require('role.upgrader');
var get_energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');
var containers = require('structure.container');
var roads = require('structure.roads')


var strategy = {
    find_repairable: function(room) {
        var repairable = room.find(FIND_MY_STRUCTURES);
        var conts = containers.get(room);
        for(var i = 0; i < conts.length; ++i) {
            repairable.push(conts[i]);
        }
        var rds = roads.get(room);
        for(var i = 0; i < rds.length; ++i) {
            repairable.push(rds[i]);
        }

        var max_hp_part = 1.0;
        var repairable_id = undefined;
        for(var i = 0; i < repairable.length; ++i) {
            if (repairable.hits / repairable.hitsMax < max_hp_part) {
                max_hp_part = repairable.hits / repairable.hitsMax;
                repairable_id = repairable.id;
            }
        }
        return repairable_id;
    },
    repair: function(creep) {
        if (creep.memory['repairable_id'] === undefined) {
            creep.memory['repairable_id'] = this.find_repairable(creep.room);
        }

        if (creep.memory['repairable_id'] === undefined) {
            return false;
        }
        var struct = Game.getObjectById(creep.memory['repairable_id']);
        var work = creep.repair(struct);
        if (work == ERR_NOT_ENOUGH_ENERGY) {
            creep.memory['refill'] = true;
            creep.memory['repairable_id'] = undefined;
        } else if (work == ERR_NOT_IN_RANGE) {
            creep.moveTo(struct);
        }
        else {
            creep.memory['repairable_id'] = undefined;
        }
        return true;
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.memory['refill']) {
            get_energy_behavior.perform(creep);
            return;
        }
        if (room_travel.perform(creep)) return;
        var busy = strategy.repair(creep);
        if (!busy) {
            upgrader_role.perform(creep);
        }
    }
}