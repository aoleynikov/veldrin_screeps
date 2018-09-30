var spawns = require('structure.spawn')
var extensions = require('structure.extension')
var containers = require('structure.container')

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
    }
}