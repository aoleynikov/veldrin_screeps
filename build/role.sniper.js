var military = require('behavior.military');

module.exports = {
  perform: function (creep) {
    if (military.on_guard(creep)) return;
    var target = military.get_enemy(creep);
    if (!target) military.on_guard(creep);
    var attack_result = creep.rangedAttack(target);

    if (attack_result == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    } else if (attack_result == 0) {
      if (creep.pos.getRangeTo(target) < 3) {
        var path = PathFinder.search(creep.pos, {
          pos: target.pos,
          range: 3
        }, {
          flee: true
        });
        creep.moveTo(path.path[0]);
      }
    }
  }
};