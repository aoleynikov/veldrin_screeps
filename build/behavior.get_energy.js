var containers = require('structure.container');
var storages = require('structure.storage');

var behavior = {
    energy_providers: [containers, storages],
    is_fast_provider: function(provider) {
        return provider.structureType == STRUCTURE_CONTAINER || provider.structureType == STRUCTURE_STORAGE;
    },
    source_occupied: function(provider, exception_creep) {
        if(this.is_fast_provider(provider)) return false;

        var free = false;

        var dx = [1, 1, 0, -1, -1, -1, 0, 1];
        var dy = [0, 1, 1, 1, 0, -1, -1, -1];

        for(var i = 0; i < dx.length; ++i) {
            var pos = new RoomPosition(provider.pos.x + dx[i], provider.pos.y + dy[i], provider.room.name);
            var look = provider.room.lookAt(pos);
            if (look.length == 1 && look[0].type == 'terrain') { // wall
                continue;
            }

            var has_creep = false;
            for(var j = 0; j < look.length; ++j) {
                if (look[j].type == 'creep') {
                    if (look[j].creep.name == exception_creep.name) {
                        return false;
                    }
                    has_creep = true;
                }
            }
            free = free || !has_creep;
        }
        return !free;
    },
    get_energy_providers: function (creep) {
        var result = [];
        for (var i = 0; i < this.energy_providers.length; ++i) {
            var provs = this.energy_providers[i].get(creep.room);
            for (var j = 0; j < provs.length; ++j) {
                if (provs[j].store[RESOURCE_ENERGY] >= creep.carryCapacity) {
                    result.push(provs[j]);
                }
            }
            if (result.length > 0) return result;
        }
        return creep.room.find(FIND_SOURCES_ACTIVE);
    },
    get_closest_energy_provider: function (creep) {
        var pos = creep.pos;
        var provs = this.get_energy_providers(creep);
        var minRange = 99999;
        var result = undefined;
        for (var i = 0; i < provs.length; ++i) {
            var range = pos.getRangeTo(provs[i].pos);
            var occupied = this.source_occupied(provs[i], creep);
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

        if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
            creep.memory['refill'] = false;
            return false;
        }

        var provider_id = creep.memory['provider_id'];
        var provider = undefined;
        if (provider_id === undefined) {
            provider = behavior.get_closest_energy_provider(creep);
        } else {
            provider = Game.getObjectById(provider_id);
        }

        if (provider === undefined) {
            return true;
        }
        var work_result = undefined;
        if (behavior.is_fast_provider(provider)) {
            work_result = creep.withdraw(provider, RESOURCE_ENERGY);
            if (work_result == 0 && creep.memory['provider_id'] == provider.id) {
                creep.room.memory['energy_correction'][provider.id] -= creep.carryCapacity;
                if (creep.room.memory['energy_correction'][provider.id] < 0) {
                    creep.room.memory['energy_correction'][provider.id] = 0;
                }
                creep.memory['provider_id'] = undefined;
            }
        } else {
            work_result = creep.harvest(provider);
        }
        if (work_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(provider);
        }
        return true;
    },
    refill: function(creep) {
        creep.memory['refill'] = true;
    }
}