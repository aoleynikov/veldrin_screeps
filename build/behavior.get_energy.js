var get_room_energy = require('behavior.get_room_energy');
var room_travel = require('behavior.room_travel');

module.exports = {
	perform: function(creep, work_action) {
		var room = undefined;
		if (creep.memory['refill']) {
			room = creep.memory['energy_room'] || creep.room.name;
			if (room_travel.perform(creep)) return;
			if (get_room_energy.perform(creep)) return;

		}

		room = creep.memory['work_place'] || creep.room.name;
		if (room_travel.perform(creep)) return;
		work_action(creep);
	}
}