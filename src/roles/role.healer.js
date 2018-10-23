var room_travel = require('behavior.room_travel');
var military = require('behavior.military');

var strategy = {
    find_patient: function (own) {
        for (var name in Game.creeps) {
            if (name == own) continue;
            var creep = Game.creeps[name];
            if (creep.hits < creep.hitsMax) {
                return creep;
            }
        }
    }
}

module.exports = {
    perform: function (creep) {
        var squad = creep.memory['squad'];
        var flag = Game.flags[squad] || Game.flags['Rax'];
        if (flag.room.name != creep.room.name) {
            creep.moveTo(flag);
            return true;
        }
        if (creep.memory['patient'] === undefined) {
            patient = strategy.find_patient(creep.name);
            if (patient === undefined) {
                military.perform(creep);
                return;
            }
            creep.memory['patient'] = patient.name;
        }

        var patient = Game.creeps[creep.memory['patient']];
        if (patient !== undefined || patient.hits == patient.hitsMax) {
            creep.memory['patient'] = undefined;
            creep.moveTo(flag);
            return;
        }

        if (creep.room.name != patient.room.name) {
            creep.memory['target'] = patient.room.name;
            if (room_travel.perform(creep)) return;
        }
        if (creep.heal(patient) == ERR_NOT_IN_RANGE) {
            creep.moveTo(patient);
        }
    }
}