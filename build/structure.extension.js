module.exports = {
    get: function (room) {
        return room.find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_EXTENSION
            }
        });
    }
}