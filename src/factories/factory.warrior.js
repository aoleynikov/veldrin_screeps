module.exports = {
    bodyparts: function (maxEnergy) {
        var result = [];
        while (maxEnergy >= 150) {
            maxEnergy -= 150;
            result.push(TOUGH);
            result.push(TOUGH);
            result.push(ATTACK);
            result.push(MOVE);
        }
        return result;
    }
}