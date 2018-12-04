var room_travel = require('behavior.room_travel')

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;

  }
}