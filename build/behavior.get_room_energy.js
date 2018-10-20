var behavior = {
  is_fast_provider: provider => {
    return provider.structureType == STRUCTURE_CONTAINER || provider.structureType == STRUCTURE_STORAGE;
  },
  source_occupied: (provider, exception_creep) => {
    if (this.is_fast_provider(provider)) return false;
    var free = false;
    var dx = [1, 1, 0, -1, -1, -1, 0, 1];
    var dy = [0, 1, 1, 1, 0, -1, -1, -1];

    for (var i = 0; i < dx.length; ++i) {
      var pos = new RoomPosition(provider.pos.x + dx[i], provider.pos.y + dy[i], provider.room.name);
      var look = provider.room.lookAt(pos);

      if (look.length == 1 && look[0].type == 'terrain') {
        // wall
        continue;
      }

      var has_creep = false;

      for (var j = 0; j < look.length; ++j) {
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
  get_closest_energy_provider: function (creep) {
    var result = [];
    var self = this;
    result = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: s => self.is_fast_provider(s) && s.store[RESOURCE_ENERGY] >= creep.carryCapacity
    });
    if (result) return result;
    return creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
      filter: s => !self.source_occupied(s, creep)
    });
  }
};
module.exports = {
  perform: function (creep) {
    if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
      creep.memory['refill'] = false;
    }

    if (!creep.memory['refill']) {
      return false;
    }

    var provider = behavior.get_closest_energy_provider(creep);

    if (!provider) {
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
};