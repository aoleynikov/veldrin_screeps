var enemies_find = [FIND_HOSTILE_CREEPS];
module.exports = {
  on_guard: function (creep) {
    var squad = creep.memory['squad'];
    var flag = Game.flags[squad] || Game.flags['Rax'];
    creep.moveTo(flag);
  },
  get_enemy: function (creep) {
    var closest_from_category = enemies_find.map(f => {
      var target = creep.pos.findClosestByRange(f);
      if (!target) return null;
      return {
        target: target,
        range: creep.pos.getRangeTo(target.pos)
      };
    });
    var min_dst = 100000;
    var result = undefined;

    for (var enemy of closest_from_category) {
      if (!enemy) continue;

      if (enemy.range < min_dst) {
        min_dst = enemy.range;
        result = enemy.target;
      }
    }

    return result;
  }
};