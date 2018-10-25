var move = require('behavior.move');

module.exports = {
  perform: function (creep) {
    var squad = creep.memory['squad'];
    var flag = Game.flags[squad] || Game.flags['Rax'];

    var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => {
        return s.structureType == STRUCTURE_WALL ||
          s.structureType == STRUCTURE_RAMPART && s.owner.name != creep.owner.name
      }
    });

    if (!target) {
      move.perform(creep, flag.pos);
      return;
    }

    var attack_result = creep.attack(target);
    if (attack_result == ERR_NOT_IN_RANGE) {
      move.perform(creep, target.pos);
    }
  }
}