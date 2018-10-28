var jobs = [require('jobs.sync_population')];
module.exports = {
  run: () => {
    jobs.forEach(job => {
      if (Game.time % job.period == 0) {
        job.execute();
      }
    });
  }
};