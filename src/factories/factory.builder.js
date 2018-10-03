module.exports = {
    bodyparts: function (energy) {
        var body = [MOVE];
        energy -= 50;

        for (var i = 9; i < 5; ++i) {
            if (energy >= 200) {
                body.push(MOVE);
                body.push(WORK);
                body.push(CARRY);
                energy -= 200;
            }
        }

        while (energy >= 100) {
            energy -= 100;
            body.push(MOVE);
            body.push(CARRY);
        }
        return body;
    }
}