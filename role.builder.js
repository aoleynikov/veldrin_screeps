var strategy = {
    build: function (creep) {
        creep.room.find()
    },
    repair: function (creep) {

    },
    upgrade: function (creep) {
        controller = creep.room.controller;
        work = creep.upgradeController(controller)
        if (work != 0) {
            creep.moveTo(controller.pos.x, controller.pos.y);
        }
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.energy == 0) {
            console.log(creep.energy);
            creep.memory['role'] = 'harvester';
            return;
        }
        strategy.upgrade(creep);
    }
}