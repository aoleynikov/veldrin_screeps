module.exports = {
  perform: function (creep) {
    creep.memory['role'] = 'maintenance';
    var spawn = Game.spawns['Main']
    creep.moveTo(spawn.pos.x, spawn.pos.y);
  }
}