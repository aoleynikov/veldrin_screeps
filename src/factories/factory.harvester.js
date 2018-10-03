module.exports = {
    bodyparts: function (maxEnergy) {
        maxEnergy -= 150;
        var result = [MOVE, WORK]
        if (maxEnergy > 150) {
            result.push(MOVE);
            result.push(WORK);
            maxEnergy -= 150;
        }
        while (maxEnergy >= 100) {
            maxEnergy -= 100;
            result.push(CARRY);
            result.push(MOVE);
        }
        return result;
    }
}