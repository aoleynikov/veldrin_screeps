var jobs = [require('job.miners_count'), require('job.reset_energy_correction')];
export function run() {
  jobs.forEach(job => {
    job.execute();
  });
}