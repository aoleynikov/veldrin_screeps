module.exports = {
    bodyparts: function (maxEnergy) {
        var result = [];
        while (maxEnergy >= 130) {
            maxEnergy -= 130;
            result.push(ATTACK);
            result.push(MOVE);
        }
        return result;
    }
}