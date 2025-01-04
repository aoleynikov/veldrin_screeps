declare var OK: number;
declare var ERR_NOT_IN_RANGE: number;
declare var ERR_NO_PATH: number
declare var RESOURCE_ENERGY: string;
declare var FIND_SOURCES_ACTIVE: number;
declare var FIND_SOURCES: number;
declare var FIND_MY_SPAWNS: number;
declare var FIND_MY_STRUCTURES: number;
declare var FIND_HOSTILE_CREEPS: number;
declare var FIND_STRUCTURES: number;
declare var FIND_MY_CONSTRUCTION_SITES: number;
declare var FIND_TOMBSTONES: number;
declare var FIND_DROPPED_RESOURCES: number;
declare var STRUCTURE_EXTENSION: string;
declare var STRUCTURE_CONTAINER: string;
declare var STRUCTURE_STORAGE: string;
declare var STRUCTURE_TOWER: string;
declare var LOOK_CREEPS: string;
declare var WORK: string;
declare var HARVEST_POWER: number;
declare var ERR_NOT_ENOUGH_RESOURCES: number;
declare var PathFinder: any;
declare var Game: any;

const TRACK_WINDOW_SIZE = 1500;

class MissionControl {
    public run(): void {
        this.update_spawn_activity();
        if (Game.time % 100 === 0) {
            this.log_spawn_activity();
            this.log_average_operating_level();
        }
    }

    private update_spawn_activity(): void {
        for (const spawnName in Game.spawns) {
            const spawn = Game.spawns[spawnName];

            if (!spawn.memory.spawning_backlog) {
                spawn.memory.spawning_backlog = [];
            }

            const backlog = spawn.memory.spawning_backlog;
            backlog.push(spawn.spawning !== null);

            if (backlog.length > TRACK_WINDOW_SIZE) {
                backlog.shift();
            }

            spawn.memory.spawning_backlog = backlog;
        }
    }

    private log_spawn_activity(): void {
        console.log("==== Spawn Activity ====");
        for (const spawnName in Game.spawns) {
            const spawn = Game.spawns[spawnName];
            const backlog = spawn.memory.spawning_backlog;
            const busy = backlog.filter((x) => x).length;
            console.log(`Spawn ${spawnName} is busy ${busy}/${TRACK_WINDOW_SIZE} turns`);
        }
    }

    private log_average_operating_level(): void {
        console.log("==== Average Operating Level ====");
        let total = 0;
        let count = 0;
        for (const name in Game.creeps) {
            let creep = Game.creeps[name];
            if (!creep) {
                continue;
            }
            total += creep.memory.operating_level;
            count += 1;
        };
        console.log(`Average operating level: ${(total / count).toFixed(2)}`);
    }
}

export default MissionControl;
