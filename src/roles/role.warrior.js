var military = require('behavior.military')

module.exports = {
    perform: function (creep) {
        if(military.on_guard(creep)) return
        
        var target = military.get_enemy(creep)
        if (!target) military.on_guard(creep)

        var attack_result = creep.attack(target);
        if (attack_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}