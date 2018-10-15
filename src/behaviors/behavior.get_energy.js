var behavior = {
    energy_providers: [containers, storages],
    is_fast_provider: function(provider) {
        return provider.structureType == STRUCTURE_CONTAINER || provider.structureType == STRUCTURE_STORAGE;
    },
    source_occupied: function(provider) {
        if(this.is_fast_provider(provider)) return false;

        var occupied = false;

        var dx = [1, 1, 0, -1, -1, -1, 0, 1];
        var dy = [0, 1, 1, 1, 0, -1, -1, -1];

        for(var i = 0; i < dx.length; ++i) {
            var pos = RoomPosition(provider.pos.x + dx[i], provider.pos.y + dy[i], provider.room.name);
            var look = provider.room.lookAt(pos);
            if (look.length == 1 && look[0].type == 'terrain') { // wall
                continue;
            }

            var has_creep = false;
            for(var j = 0; j < look.length; ++j) {
                if (look[j].type == 'creep') {
                    has_creep = true;
                }
            }
            occupied ||= !has_creep;
        }
        return occupied;
    }
    get_energy_providers: function (room) {
        var result = [];
        for (var i = 0; i < this.energy_providers.length; ++i) {
            var provs = this.energy_providers[i].get(room);
            for (var j = 0; j < provs.length; ++j) {
                if (provs[j].store[RESOURCE_ENERGY] >= 400) {
                    result.push(provs[j]);
                }
            }
            if (result.length > 0) return result;
        }
        return room.find(FIND_SOURCES_ACTIVE);
    },
    get_closest_energy_provider: function (room, pos) {
        var provs = this.get_energy_providers(room);
        var minRange = 99999;
        var result = undefined;
        for (var i = 0; i < provs.length; ++i) {
            var range = pos.getRangeTo(provs[i].pos);
            var occupied = this.source_occupied(provs[i]);
            if (range < minRange && !occupied) {
                result = provs[i];
                minRange = range;
            }
        }
        return result;
    }
}

module.exports = {
    perform: function (creep) {
        if(!creep.memory['refill']) {
            return false;
        }

        var provider = behavior.get_closest_energy_provider(creep.room, creep.pos);
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

        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
            creep.memory['refill'] = false;
        }
        return creep.memory['refill'];
    }
}