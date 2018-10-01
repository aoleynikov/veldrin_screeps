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
        console.log(result);
        return result;
    },
    // LEGACY
    get_energy_provider: function (room) {
        var result = this.get_energy_providers(room);
        // Random selection; TODO: rewrite;
        return result[Math.floor(Math.random() * Math.floor(selection.length))];
    },
    get_energy_providers: function (room) {
        var providers = containers.get(room);
        var result = []
        for (var i = 0; i < providers.length; ++i) {
            if (providers[i].store[RESOURCE_ENERGY] > 0) {
                result.push(providers[i]);
            }
        }

        // if all containers (if any) are empty, we have to mine
        if (result === []) {
            sources = room.find(FIND_SOURCES_ACTIVE)
            for (var i = 0; i < source.length; ++i) {
                result.push(sources[i])
            }
        }
        return result;
    },
    get_closest_energy_provider: function (room, pos) {
        providers = this.get_energy_providers(room);
        var minRange = 99999;
        var result = undefined;
        for (var i = 0; i < providers.length; ++i) {
            if (pos.getRangeTo(providers[i].pos) < minRange) {
                result = this.providers[i];
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