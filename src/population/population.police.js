module.exports = function() {
  result = []
  var victims = Game.spawns['Main'].memory['victims']
  for (var i = 0; i < victims.length; ++i) {
    var victim = Game.getObjectById(victims[i])
    if (victim == null) {
      Game.spawns['Main'].memory['victims'].splice(i, 1)
      return [];
    }
    result.append({
      count: 1,
      name_prefix: 'missle_' + vistims[i],
      body: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'killer',
        vistims: [vistims[id]]
      }
    })
  }
  return result;
}
