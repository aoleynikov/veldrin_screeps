var behavior = {
    is_fast_provider: function (provider) {
        return provider.structureType == STRUCTURE_CONTAINER || provider.structureType == STRUCTURE_STORAGE;
    },
    source_occupied: function (provider, exception_creep) {
        if (this.is_fast_provider(provider)) return false;

        var look = provider.room.lookAtArea(provider.pos.x - 1,
            provider.pos.y - 1,
            provider.pos.x + 1,
            provider.pos.y + 1);

        for (var x in look) {
            for (var y in look[x]) {
                for (item of look[x][y]) {
                    if (item['type'] == 'terrain' && item['terrain'] == 'wall' || item['type'] == 'source') continue;
                    if (item['type'] == 'creep') {
                        if (item['creep'].id == exception_creep.id)
                            return false;
                        else
                            break;
                    }
                }
            }
        }
        return true;
    },
    get_closest_energy_provider: function (creep) {
        var result = [];
        var self = this;
        result = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (s) {
                return self.is_fast_provider(s) && s.store[RESOURCE_ENERGY] >= creep.carryCapacity;
            }
        });
        if (result) return result;
        return creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
            filter: function (s) {
                return !self.source_occupied(s, creep);
            }
        });
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
            creep.memory['refill'] = false;
        }

        if (!creep.memory['refill']) {
            return false;
        }

        var provider = behavior.get_closest_energy_provider(creep);
        if (provider === undefined) {
            return true;
        }

        var work_result = undefined;
        if (behavior.is_fast_provider(provider)) {
            work_result = creep.withdraw(provider, RESOURCE_ENERGY);
        } else {
            work_result = creep.harvest(provider);
        }
        if (work_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(provider);
        }
        return true;
    }
}