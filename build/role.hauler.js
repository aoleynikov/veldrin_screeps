var room_travel = require('behavior.room_travel');

var storages = require('structure.storage');

var strategy = {
  store: function (creep) {
    var storage = storages.get(creep.room);
    if (storage.length == 0) return;
    store = creep.transfer(storage[0], RESOURCE_ENERGY);

    if (store == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage);
    } else if (store == ERR_NOT_ENOUGH_ENERGY) {
      creep.memory['refill'] = true;
    }
  }
};
module.exports = {
  perform: function (creep) {
    // If creep needs to refill
    if (creep.memory['refill']) {
      creep.memory['target'] = creep.memory['work_place'];
      if (room_travel.perform(creep)) return;
      get_energy_behavior.perform(creep);
      return;
    }

    creep.memory['target'] = Game.spawns['Main'].room.name;
    if (room_travel.perform(creep)) return;
    strategy.store(creep);
  }
};