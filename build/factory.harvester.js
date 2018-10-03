module.exports = {
  bodyparts: function (maxEnergy) {
    maxEnergy -= 150;
    var result = [MOVE, WORK];

    if (maxEnergy > 150) {
      result.push(MOVE);
      result.push(WORK);
      maxEnergy -= 150;
    }

    while (maxEnergy >= 50) {
      maxEnergy -= 50;
      result.push(CARRY);
    }

    return result;
  }
};