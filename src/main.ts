declare var Game: any;
declare var FIND_SOURCES: string;

import BehaviorDispatcher from "./creeps"
import Population from "./population"
import BuildingService from "./building";
import MissionControl from "./mission_control";

const loop = () => {
    const empire = {
        W31N14: ['W31N13', 'W32N14']
    }
    const population = new Population(empire)
    const dispatcher = new BehaviorDispatcher()
    const buildingService = new BuildingService(empire)
    const missionControl = new MissionControl()

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

    missionControl.run()
}

export { loop as loop };