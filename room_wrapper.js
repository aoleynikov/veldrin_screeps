var spawns = require('structure.spawn');
var extensions = require('structure.extension');
var containers = require('structure.container');
var roads = require('structure.road');

module.exports = {
    providers: [spawns, extensions],
    get_energy_storages: function (room) {
        var result = []
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

        var result = []
        for (var i = 0; i < ctrs.length; ++i) {
            if (ctrs[i].store[RESOURCE_ENERGY] > 0) {
                result.push(ctrs[i]);
            }
        }
        if (result.length > 0) return result;
        return room.find(FIND_SOURCES_ACTIVE);
    },
    get_closest_energy_provider: function (room, pos) {
        providers = this.get_energy_providers(room);
        var minRange = 99999;
        var result = undefined;
        for (var i = 0; i < providers.length; ++i) {
            var range = pos.getRangeTo(providers[i].pos);
            if (range < minRange) {
                result = this.providers[i];
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

        added = roads.get(room)
        for (var i = 0; i < added.length; ++i) {
            result.push(added[i]);
        }
        return result;
    }
}