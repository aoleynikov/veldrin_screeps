var container = require('structure.container');

var base = require('job.swarm_update_job');

module.exports = {
  period: 20,
  execute: () => {
    base.execute('miner', room => {
      console.log(room);
      console.log(container.get(room));
      return container.get(room).length;
    });
  }
};