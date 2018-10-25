module.exports = {
    perform: function (creep) {
        if (!creep.memory['run']) return false;
        creep.move(creep.memory['run']);
        creep.memory['run_cd'] -= 1;
        if (creep.memory['run_cd'] == 0) {
            creep.memory['run'] = undefined;
        }
        return true;
    }
}