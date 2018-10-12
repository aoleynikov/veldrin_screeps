var spawns = require('structure.spawn');
var extensions = require('structure.extension');
var towers = require('structure.tower');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var strategy = {
  select_storage: function (creep) {
    return creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function(s) {
        return s.energy < s.energyCapacity &&
          (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION);
      }
    });
  },
  store: function (creep) {
    var storage = this.select_storage(creep.room);
    if (storage === undefined) {
      return;
    }
    store = creep.transfer(storage, RESOURCE_ENERGY);
    if (store == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage.pos.x, storage.pos.y);
    } else if (store == ERR_NOT_ENOUGH_ENERGY) {
      creep.memory['refill'] = true;
    }
  }
}

module.exports = {
  perform: function (creep) {
    if (energy_behavior.perform(creep)) return;
    if (room_travel.perform(creep)) return;
    strategy.store(creep);
  }
}