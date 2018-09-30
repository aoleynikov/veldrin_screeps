module.exports = {
    get: function (room) {
        var result = room.find(FIND_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_CONTAINER
            }
        });
        return result;
    }
}