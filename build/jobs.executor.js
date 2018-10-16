var jobs = [require('job.miners_count')]

module.exports = {
	for (var job of jobs) {
		if (Game.time % job.period) {
			job.execute();
		}
	}
}