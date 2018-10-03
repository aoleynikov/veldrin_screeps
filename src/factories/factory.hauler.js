var room_wrapper = require('room_wrapper')

module.exports = {
    bodyparts: function (energy) {
        var body = [MOVE, MOVE, MOVE, MOVE];
        energy -= 200;

        while (energy >= 50) {
            energy -= 50;
            body.push(CARRY);
        }
        return body;
    }
}