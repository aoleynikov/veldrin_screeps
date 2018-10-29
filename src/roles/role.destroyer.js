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
      creep.moveTo(flag);
      return;
    }

    var attack_result = creep.attack(target);
    if (attack_result == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}