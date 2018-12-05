var energy_behavior = require('behavior.get_resource');

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;

        var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: s => {
                return (s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity) ||
                    (creep.memory['resource'] == RESOURCE_ENERGY &&
                        s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity);
            }
        });
        var result = creep.transfer(storage, creep.memory['resource'])
        console.log(result)
        if (result != 0) {
            creep.moveTo(storage, { visualizePathStyle: {
                fill: 'transparent',
                stroke: '#0f0',
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .1
            }});
        }
        if (!creep.carry[creep.memory['resource']]) {
            energy_behavior.refill(creep);
        }
    }
}