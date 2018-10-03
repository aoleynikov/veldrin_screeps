var empire = require('empire')

module.exports = {
    perform: function (creep) {
        var rooms = empire.get_rooms();
        for (var i = 0; i < rooms.length; ++i) {
            if (!rooms[i].contoller.my) {
                creep.memory['target'] = rooms[i].name
            }
        }
    }
}