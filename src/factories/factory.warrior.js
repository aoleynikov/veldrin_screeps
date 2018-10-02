module.exports = {
    bodyparts: function (maxEnergy) {
        maxEnergy -= 6 * 50;
        var result = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        while (maxEnergy >= 80) {
            maxEnergy -= 80;
            result.push(ATTACK);
        }
        return result;
    }
}