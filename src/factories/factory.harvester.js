module.exports = {
    bodyparts: function (maxEnergy) {
        maxEnergy -= 300;
        var result = [MOVE, MOVE, WORK, WORK]
        while (maxEnergy >= 50) {
            maxEnergy -= 50;
            result.push(CARRY);
        }
        return result;
    }
}