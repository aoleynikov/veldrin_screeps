module.exports = {
    get: function (room) {
        var result = room.find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_SPAWN
            }
        });
        return result;
    }
}