module.exports = {
  perform: function (creep) {
    creep.memory['role'] = 'maintenance';
    creep.moveTo(creep.room.spawns['Main']);
  }
}