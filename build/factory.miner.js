module.exports = {
  bodyparts: function (energy) {
    var body = [MOVE];
    energy -= 50;

    for (var i = 0; i < 5; ++i) {
      if (energy >= 100) {
        body.push(WORK);
        energy -= 100;
      }
    }

    while (energy >= 50) {
      energy -= 50;
      body.push(MOVE);
    }

    return body;
  }
};