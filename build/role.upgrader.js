var get_energy_behavior = require('behavior.get_energy');

var upgrade = function (creep) {
  var controller = creep.room.controller;
  var work = creep.upgradeController(controller);

  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(controller.pos.x, controller.pos.y);
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    creep.memory['refill'] = true;
  }
};

module.exports = {
  perform: function (creep) {
    if (creep.memory['refill']) {
      get_energy_behavior.perform(creep);
      return;
    }

    upgrade(creep);
  }
};