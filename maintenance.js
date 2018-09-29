module.exports = {
  perform: function (creep) {
    creep.memory['role'] = 'maintenance';
    creep.moveTo(Game.spawns['Main']);
  }
}