module.exports = {
  perform: function (creep, goal) {
    if (creep.pos.getRangeTo(goal) >= 4) {
      var path = PathFinder.search(creep.pos, goal);
      var next_step = path.path[0];
      var look = creep.room.lookAt(next_step);

      for (var item of look) {
        if (item.type == 'structure' && item.strucutreType == STRUCTURE_SPAWN) {
          creep.moveTo(goal);
          return;
        }
      }

      creep.moveByPath(path.path);
    } else {
      creep.moveTo(goal);
    }
  }
};