module.exports = {
  bodyparts: function (energy) {
    var body = [MOVE, MOVE, MOVE, MOVE];
    energy -= 200;

    while (energy >= 100) {
      energy -= 100;
      body.push(WORK);
    }

    return body;
  }
};