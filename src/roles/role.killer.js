module.exports = {
  perform: function(creep) {
    var target = undefined;
    for(var id of creep.memory['victims']) {
      target = Game.getObjectById(id);
    }
    if(!target) creep.suicide();
    if(creep.attack(target) == ERR_OUT_OF_RANGE) {
      creep.moveTo(target);
    }
  }
}