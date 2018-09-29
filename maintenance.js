module.exports = {
  perform: function (creep) {
    creep.moveTo(Room.spawns['Main']);
    Room.spawns['Main'].renew(creep);
  }
}