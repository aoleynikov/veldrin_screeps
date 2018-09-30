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
        if (creep.carry[RESOURCE_ENERGY] == 0) {
            creep.memory['role'] = 'harvester';
            return;
        }
        strategy.upgrade(creep);
    }
}