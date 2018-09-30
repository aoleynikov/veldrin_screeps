var strategy = {
    build: function (creep) {
        creep.room.find()
    },
    repair: function (creep) {

    },
    upgrade: function (creep) {
        controller = creep.room.controller;
        console.log(controller);
        if (!creep.upgradeController(controller)) {
            creep.moveTo(controller.pos.x, controller.pos.y);
        }
    }
}

module.exports = {
    perform: function (creep) {
        strategy.upgrade(creep);
    }
}