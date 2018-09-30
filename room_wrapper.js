var spawns = require('structure.spawn')
var extensions = require('structure.extension')
var storages = require('structure.storage')

module.exports = {
    providers: [spawns, extensions, storages],
    get_energy_storages: function (room) {
        var result = []
        for (var provider in this.providers) {
            var structs = provider.get(room);
            result = result.concat(structs);
        }
        return result;
    }
}