declare var Game: any;
declare var FIND_SOURCES: string;

import BehaviorDispatcher from "./creeps"
import Population from "./population"
import BuildingService from "./building";

const loop = () => {
    const empire = {
        W37S54: ["W37S55", "W38S54", "W38S53", "W37S53"],
        W36S57: ["W37S57", "W35S57", "W37S56"],
        W35S53: ["W35S52", "W36S52", "W36S53", "W36S51"],
        W36S51: []
    }
    const population = new Population(empire)
    const dispatcher = new BehaviorDispatcher()
    const buildingService = new BuildingService(empire)

    for (const name in Game.creeps) {
        let creep = Game.creeps[name];
        dispatcher.dispatch(creep)
    };
    population.regenerate();

    let rooms = []
    for (const name in empire) {
        rooms.push(name);
        rooms = rooms.concat(empire[name])
    }

    rooms = rooms.filter((x, i, a) => a.indexOf(x) === i)
    for (const room_name of rooms) {
        buildingService.operate(room_name)
    }
}

export { loop as loop };