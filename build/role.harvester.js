var towers = require('structure.tower');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var strategy = {
  check_towers: function(room) {
    var twrs = towers.get(room);
    for(var tower of twrs) {
      if(tower.energy < tower.energyCapacity) {
        return tower;
      }
    }
    return undefined;
  },
  select_storage: function (creep) {
    var tower = this.check_towers(creep.room);
    if (tower) return tower;
    return creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function(s) {
        return s.energy < s.energyCapacity &&
          (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION);
      }
    });
  },
  store: function (creep) {
    var storage = undefined;
    if(creep.memory['storage_id'] === undefined) {
      storage = this.select_storage(creep);
      if (!storage) { // all storages are full
        return;
      }
      creep.memory['storage_id'] = storage.id;
    } else {
      storage = Game.getObjectById(creep.memory['storage_id']);
    }
    if (storage === undefined || storage.energy == storage.energyCapacity) {
      creep.memory['storage_id'] = undefined;
      return;
    }
    store = creep.transfer(storage, RESOURCE_ENERGY);
    if (store == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, {reusePath: 50});
    } else if (store == ERR_NOT_ENOUGH_ENERGY) {
      creep.memory['refill'] = true;
    } else if (store == 0) {
      creep.memory['storage_id'] = undefined;
    }
  }
}

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    if (creep.room.energyAvailable == creep.room.energyCapacityAvailable) return;
    if (energy_behavior.perform(creep)) return;
    strategy.store(creep);
  }
}