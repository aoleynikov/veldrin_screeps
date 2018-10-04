module.exports = {
  perform: function (creep) {
    creep.memory['role'] = 'maintenance';
    var spawn = Game.spawns['Main']
    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn.pos.x, spawn.pos.y);
    }
  }
}