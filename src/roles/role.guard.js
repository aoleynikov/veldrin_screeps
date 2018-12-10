module.exports = {
    perform: function (creep) {
        var squad = creep.memory['squad'];
        var flag = Game.flags[squad] || Game.flags['Rax'];

        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (!target) {
          creep.moveTo(flag)
          return
        }

        var add = true
        for (var victim_id of Game.spawns['Main'].memory['victims']) {
          if (victim_id == target.id) {
            add = false
            break
          }
        }
        if (add) {
          Game.spawns['Main'].memory['victims'].append(target.id)
        }

        var attack_result = creep.attack(target);
        if (attack_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}