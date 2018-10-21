var base = require('job.swarm_update_job');

module.exports = {
    period: 50,
    execute: () => {
        base('builder', room => room.find(FIND_MY_CONSTRUCTION_SITES).length);
    }
}