var jobs = [require('job.miners_count')];
module.exports = {
  run: () => {
    jobs.forEach(job => {
      job.execute();
    });
  }
};