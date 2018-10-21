var base = require('job.swarm_update_job');

module.exports = {
  period: 200,
  execute: () => {
    base.execute('builder', room => room.find(FIND_MY_CONSTRUCTION_SITES).length);
  }
};