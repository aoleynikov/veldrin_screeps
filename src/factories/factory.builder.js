module.exports = {
    bodyparts: function (energy) {
        var body = [MOVE];
        energy -= 50;

        for (var i = 0; i < 5; ++i) {
            if (energy >= 200) {
                body.push(MOVE);
                body.push(WORK);
                body.push(CARRY);
                energy -= 200;
            }
        }

        while (energy >= 150) {
            energy -= 150;
            body.push(MOVE);
            body.push(MOVE);
            body.push(CARRY);
        }
        return body;
    }
}