var behavior = {
    is_fast_provider: function (provider, resource) {
        return (
            provider.structureType == STRUCTURE_CONTAINER ||
            provider.structureType == STRUCTURE_STORAGE ||
            (provider.structureType == STRUCTURE_LINK && resource == RESOURCE_ENERGY)
        )
    },
    provider_resource: function (provider, resource) {
        if (
            provider.structureType == STRUCTURE_CONTAINER ||
            provider.structureType == STRUCTURE_STORAGE
        ) {
            return provider.store[resource]
        } else {
            return resource == RESOURCE_ENERGY ? provider.energy : 0
        }
    },
    source_occupied: function (provider, exception_creep) {
        if (this.is_fast_provider(provider, exception_creep.memory['resource'])) return false

        var free = false

        var dx = [1, 1, 0, -1, -1, -1, 0, 1]
        var dy = [0, 1, 1, 1, 0, -1, -1, -1]

        for (var i = 0; i < dx.length; ++i) {
            var pos = new RoomPosition(
                provider.pos.x + dx[i],
                provider.pos.y + dy[i],
                provider.room.name
            )
            var look = provider.room.lookAt(pos)
            if (
                look.length == 1 &&
                look[0].type == "terrain" &&
                look[0].terrain == "wall"
            ) {
                // wall
                continue
            }

            var has_creep = false
            for (var j = 0; j < look.length; ++j) {
                if (look[j].type == "creep") {
                    if (look[j].creep.name == exception_creep.name) {
                        return false
                    }
                    has_creep = true
                }
            }
            free = free || !has_creep
        }
        return !free
    },
    get_closest_provider: function (creep) {
        var result = []
        var self = this
        var resource = creep.memory["resource"] || RESOURCE_ENERGY
        result = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s =>
                self.is_fast_provider(s, resource) &&
                self.provider_resource(s, resource) >= (creep.carryCapacity - (creep.carry[resource] || 0)) / 2.0
        })
        if (result || resource != resource) return result
        return creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
            filter: s => !self.source_occupied(s, creep)
        })
    }
}

module.exports = {
    perform: function (creep) {
        var resource = creep.memory["resource"] || RESOURCE_ENERGY

        if (creep.carry[resource] == creep.carryCapacity) {
			creep.memory["refill"] = false;
		}

		if (creep.carry[resource] == 0) {
			creep.memory['refill'] = true;
		}

		if (!creep.memory["refill"]) {
			return false
		}

        var provider = behavior.get_closest_provider(creep)
        if (!provider) {
            return true
        }

        var work_result = undefined
        if (behavior.is_fast_provider(provider, resource)) {
            work_result = creep.withdraw(provider, resource)
        } else {
            work_result = creep.harvest(provider)
        }
        if (work_result == ERR_NOT_IN_RANGE) {
            creep.moveTo(provider, {reusePath: 20});
        }
        return true
    }
}