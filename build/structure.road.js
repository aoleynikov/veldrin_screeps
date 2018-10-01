module.exports = {
  get: function (room) {
    return room.find(FIND_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_ROAD
      }
    });
  }
};