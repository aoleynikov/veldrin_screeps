var energy_behavior = require('behavior.get_energy');

var upgrade = creep => {
  creep.memory['energy_room'] = Game.spawns['Main'].room.name;
  var controller = Game.spawns['Main'].room.controller;
  var work = creep.upgradeController(controller);

  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(controller);
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

export function perform(creep) {
  if (energy_behavior.perform(creep)) return;
  upgrade(creep);
}