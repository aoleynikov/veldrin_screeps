module.exports = {
	perform: function() {
		for(var creep_name in Game.creeps) {
			var creep = Game.creeps[creep_name];
			if(!creep) {
				delete Game.creeps[creep_name];
			}
		}
	}
}