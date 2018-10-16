var room_travel = require('behavior.room_travel');
var energy_behavior = require('behavior.get_energy');
var storages = require('structure.storage');

module.exports = {
    perform: function (creep, home_action) {
        // If creep needs to refill
        if (creep.memory['refill']) {
            creep.memory['target'] = creep.memory['work_place'];
            if (room_travel.perform(creep)) return;
            if (energy_behavior.perform(creep)) return;
        }

        creep.memory['target'] = Game.spawns['Main'].room.name;
        if (room_travel.perform(creep)) return;
        home_action(creep);
    }
}