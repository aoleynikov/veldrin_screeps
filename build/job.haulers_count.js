var base = require('job.swarm_update_job');

var containers = require('structure.container');

module.exports = {
  period: 1500,
  execute: () => {
    base.execute('hauler', room => {
      var result = 0;
      containers.get(room).forEach(c => result += c.store[RESOURCE_ENERGY]);
      return result / 1200;
    });
  }
};