var room_wrapper = require('room_wrapper');

module.exports = {
  bodyparts: function (energy) {
    var body = [];

    while (energy >= 100) {
      energy -= 100;
      body.push(CARRY);
      body.push(MOVE);
    }

    return body;
  }
};