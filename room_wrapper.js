var spawns = require('structure.spawn')
var extensions = require('structure.extension')
var storages = require('structure.storage')

module.exports = {
    providers: [spawns, extensions, storages],
    get_energy_storages: function (room) {
        var result = []
        for (var i = 0; i < this.providers; ++i) {
            var structs = providers[i].get(room);
            result = result.concat(structs);
        }
        return result;
    }
}