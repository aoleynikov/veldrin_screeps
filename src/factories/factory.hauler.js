var room_wrapper = require('room_wrapper')

module.exports = {
    bodyparts: function (energy) {
        var body = [];
        energy -= 150;

        body.push(MOVE);
        body.push(MOVE);
        body.push(MOVE);

        while (energy >= 50) {
            energy -= 50;
            body.push(CARRY);
        }
        return body;
    }
}