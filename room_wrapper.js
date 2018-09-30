var spawns = require('structure.spawn');
var extensions = require('structure.extension');
var containers = require('structure.container');
var roads = require('structure.road');

module.exports = {
    providers: [spawns, extensions, containers],
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
    get_energy_provider: function (room) {
        var providers = containers.get(room);
        var selection = []
        for (var i = 0; i < providers.length; ++i) {
            if (providers[i].store[RESOURCE_ENERGY] > 0) {
                selection.push(providers[i]);
            }
        }
        // Random selection; TODO: rewrite;
        return selection[Math.floor(Math.random() * Math.floor(selection.length))];
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