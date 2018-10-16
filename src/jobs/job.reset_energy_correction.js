module.exports = {
	period: 20,
	execute: function() {
		for (var room_name in Game.memory['rooms']) {
			for (var provider_id in Game.memory['rooms'][room_name]['energy_correction']) {
				Game.memory['rooms'][room_name]['energy_correction'][provider_id] = 0;
			}
		}
	}
}