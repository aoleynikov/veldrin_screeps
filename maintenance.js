module.exports = {
  perform: function (creep) {
    creep.memory['role'] = 'maintenance';
    creep.moveTo(Room.spawns['Main']);
  }
}