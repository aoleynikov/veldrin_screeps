module.exports = {
    bodyparts: function (maxEnergy) {
        while (maxEnergy >= 100) {
            maxEnergy -= 100;
            result.push(CARRY);
            result.push(MOVE);
        }
        return result;
    }
}