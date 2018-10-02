var spawns = require('structure.spawn');

var extensions = require('structure.extension');

var containers = require('structure.container');

var roads = require('structure.road');

module.exports = {
  providers: [spawns, extensions],
  get_energy_storages: function (room) {
    var result = [];

    for (var i = 0; i < this.providers.length; ++i) {
      var structs = this.providers[i].get(room);

      for (var j = 0; j < structs.length; ++j) {
        result.push(structs[j]);
      }
    }

    return result;
  },
  get_energy_providers: function (room) {
    var ctrs = containers.get(room);
    var result = [];

    for (var i = 0; i < ctrs.length; ++i) {
      if (ctrs[i].store[RESOURCE_ENERGY] > 0) {
        result.push(ctrs[i]);
      }
    }

    if (result.length > 0) return result;
    return room.find(FIND_SOURCES_ACTIVE);
  },
  get_spawning_energy: function (room) {
    spawn = room.find(FIND_MY_SPAWNS)[0];
    exts_energy = 0;
    exts = extensions.get(room);
    var per_ext = 50;

    if (exts.length > 0) {
      per_ext = exts[0].energyCapacity;
    }

    for (var i = 0; i < exts.length; ++i) {
      exts_energy += exts[i].energy;
    }

    return {
      current: spawn.energy + exts_energy,
      max: spawn.energyCapacity + exts.length * per_ext
    };
  },
  get_closest_energy_provider: function (room, pos) {
    var provs = this.get_energy_providers(room);
    var minRange = 99999;
    var result = undefined;

    for (var i = 0; i < provs.length; ++i) {
      var range = pos.getRangeTo(provs[i].pos);

      if (range < minRange) {
        result = provs[i];
        minRange = range;
      }
    }

    return result;
  },
  get_repairable_structures: function (room) {
    var result = room.find(FIND_MY_STRUCTURES);
    var added = containers.get(room);

    for (var i = 0; i < added.length; ++i) {
      result.push(added[i]);
    }

    added = roads.get(room);

    for (var i = 0; i < added.length; ++i) {
      result.push(added[i]);
    }

    return result;
  }
};