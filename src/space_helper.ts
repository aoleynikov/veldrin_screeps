declare var Game: any;

declare var FIND_HOSTILE_CREEPS: number;
declare var FIND_HOSTILE_POWER_CREEPS: number;
declare var FIND_HOSTILE_CONSTRUCTION_SITES: number;
declare var FIND_HOSTILE_STRUCTURES: number;
declare var FIND_HOSTILE_SPAWNS: number;


class SpaceHelper {
    constructor() {
    }

    pick_best_surrounding(room_name: string, x: number, y: number,
        callback: (room_name: string, x: number, y: number) => number,
        reduce_callback: (n: number, a: number) => number): any {
        const dx = [-1, 0, 1, 1, 1, 0, -1, -1];
        const dy = [-1, -1, -1, 0, 1, 1, 1, 0];

        let scores = [];
        for (let i = 0; i < 8; ++i) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            scores.push(callback(room_name, nx, ny));
        }

        const result_score = scores.reduce(reduce_callback);
        let result = {
            score: result_score
        };
        for (let i = 0; i < 8; ++i) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (callback(room_name, nx, ny) == result_score) {
                result["pos"] = { x: nx, y: ny };
            }
        }
        return result;
    }

    is_walkable(room_name: string, x: number, y: number, creeps_are_obstacles: boolean): Object {
        const look_result = Game.rooms[room_name].lookAt(x, y);
        let terrain = undefined;
        for (let obj of look_result) {
            if (obj.type == "terrain") {
                terrain = obj.terrain;
            }

            if (obj.type == "creep" && creeps_are_obstacles) {
                return false;
            }
        }

        if (terrain == "swamp" || terrain == "plain") {
            return true;
        }

        for (let obj of look_result) {
            if (obj.type == "structure" && obj.structure.structureType == "road") {
                return true;
            }
        }

        return false;
    }

    safe_room_path(from: string, to: string): Array<any> {
        const cb = (room_name) => {
            const parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(room_name);
            const numbers = [parseInt(parsed[1]), parseInt(parsed[2])]
            const is_highway = (numbers[0] % 10 === 0) || (numbers[0] % 10 === 0);
            const mine = Game.rooms[room_name] &&
                Game.rooms[room_name].controller &&
                (Game.rooms[room_name].controller.my ||
                    Game.rooms[room_name].controller.reservation?.username === "Veldrin");
            const center = numbers[0] % 10 >= 4 && numbers[0] % 10 <= 6 &&
                numbers[1] % 10 >= 4 && numbers[1] % 10 <= 6;
            if (is_highway || mine) {
                return 1;
            }
            if (center) {
                return 5;
            }
            return 3;
        }

        return Game.map.findRoute(from, to, { routeCallback: cb });
    }

    get_hostiles(room: any): Array<any> {
        if (!room) return [];
        let targets = [];

        const hostile_find_keys = [
            FIND_HOSTILE_CREEPS,
            FIND_HOSTILE_POWER_CREEPS,
            FIND_HOSTILE_CONSTRUCTION_SITES,
            FIND_HOSTILE_STRUCTURES,
            FIND_HOSTILE_SPAWNS
        ];

        for (const key of hostile_find_keys) {
            targets = room.find(key);
            if (targets.length > 0) {
                break;
            }
        }

        return targets;
    }
}

export default SpaceHelper;