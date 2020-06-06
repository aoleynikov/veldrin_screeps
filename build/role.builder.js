var upgrader_role = require('role.upgrader');

var energy_behavior = require('behavior.get_resource');

var build = function (creep) {
  var sites = Game.constructionSites;
  if (sites.length == 0) return false;
  var site = undefined;

  for (var key in sites) {
    site = Game.getObjectById(key);
    break;
  }

  if (site === undefined) return false;
  var build_result = creep.build(site);

  if (build_result == ERR_NOT_IN_RANGE) {
    creep.moveTo(site.pos.x, site.pos.y, {
      reusePath: 50
    });
  } else if (build_result == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }

  return true;
};

var work = function (creep) {
  var busy = build(creep);

  if (!busy) {
    if (creep.memory['fallback_room']) {
      creep.memory['target'] = creep.memory['fallback_room'];
    } else {
      creep.memory['target'] = Game.spawns['Main'].room.name;
    }

    upgrader_role.perform(creep);
  }
};

module.exports = {
  perform: creep => {
    if (energy_behavior.perform(creep)) return;
    work(creep);
  }
};