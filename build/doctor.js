var NEARLY_DEAD = 220;
module.exports = {
  check: function () {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];

      if (creep.ticksToLive <= NEARLY_DEAD && creep.memory['role'] != 'maintenance') {
        creep.memory['old_role'] = creep.memory['role'];
        creep.memory['role'] = 'maintenance';
      } else if (creep.ticksToLive >= CREEP_LIFE_TIME - 100 && creep.memory['role'] == 'maintenance') {
        creep.memory['role'] = creep.memory['old_role'];
      }
    }
  }
};