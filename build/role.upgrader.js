var energy_behavior = require('behavior.get_energy');

var move = require('behavior.move');

var upgrade = creep => {
  var controller = Game.spawns['Main'].room.controller;
  var work = creep.upgradeController(controller);

  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(controller);
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: creep => {
    if (energy_behavior.perform(creep)) return;
    upgrade(creep);
  }
};