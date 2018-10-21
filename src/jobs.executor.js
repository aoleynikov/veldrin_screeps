var jobs = [require('job.miners_count'), require('job.builders_count')]

module.exports = {
	run: () => {
		jobs.forEach(job => {
			if (Game.time % job.period == 0) {
				job.execute();
			}
		});
	}
}