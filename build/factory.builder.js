module.exports = {
  bodyparts: function (energy) {
    var body = [];
    energy -= 50;
    body.push(MOVE);

    while (energy > 0) {
      energy -= 150;
      body.push(CARRY);
      body.push(WORK);
    }

    while (energy > 0) {
      energy -= 50;
      body.push(MOVE);
    }

    return body;
  }
};