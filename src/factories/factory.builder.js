module.exports = {
    bodyparts: function (energy) {
        var body = [MOVE, MOVE, MOVE, MOVE];
        energy -= 200;

        while (energy >= 150) {
            energy -= 150;
            body.push(CARRY);
            body.push(WORK);
        }

        while (energy > 0) {
            energy -= 50;
            body.push(MOVE);
        }
        return body;
    }
}