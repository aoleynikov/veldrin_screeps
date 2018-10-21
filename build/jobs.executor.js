var jobs = [require('job.miners_count'), require('job.builders_count')];
module.exports = {
  run: () => {
    jobs.forEach(job => {
      job.execute();
    });
  }
};