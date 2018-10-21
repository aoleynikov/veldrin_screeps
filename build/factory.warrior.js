module.exports = {
  bodyparts: function (maxEnergy) {
    var result = [];

    while (maxEnergy >= 190) {
      maxEnergy -= 190;
      result.push(TOUGH);
      result.push(ATTACK);
      result.push(MOVE);
      result.push(MOVE);
    }

    return result;
  }
};