var strategy = {
    build: function (creep) {
        creep.room.find()
    },
    repair: function (creep) {

    },
    upgrade: function (creep) {
        controller = creep.room.controller;
        console.log(controller);
        work = creep.upgradeController(controller)
        console.log(work)
        if (work != 0) {
            creep.moveTo(controller.pos.x, controller.pos.y);
        }
    }
}

module.exports = {
    perform: function (creep) {
        strategy.upgrade(creep);
    }
}