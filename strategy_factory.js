var harvester = require('creep_roles/harvester')
var maintenance = require('creep_roles/maintenance')

var NEARLY_DEAD = 120;

module.exports = {
  get_strategy: function (creep) {
    if (creep.ticksToLive <= NEARLY_DEAD) {
      return maintenance;
    }
    return harvester;
  }
}