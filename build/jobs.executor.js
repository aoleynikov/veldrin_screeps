var jobs = [require('job.miners_count'), require('job.reset_energy_correction')];
module.exports = {
  run: () => {
    jobs.forEach(job => {
      job.execute();
    });
  }
};