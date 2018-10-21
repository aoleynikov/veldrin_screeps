var container = require('structure.container');
var base = require('job.swarm_update_job');

module.exports = {
	period: 20,
	execute: () => {
		base.execute('miner', room => container.get(room).length);
	}
}