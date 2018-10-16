var jobs = [require('job.miners_count'), require('job.reset_energy_correction')]

module.exports = {
	for (var job of jobs) {
		if (Game.time % job.period == 0) {
			job.execute();
		}
	}
}