declare var MOVE: string;
declare var CARRY: string;
declare var WORK: string;
declare var CLAIM: string;
declare var ATTACK: string;
declare var TOUGH: string;
declare var Game: any;
declare var OK: number;
declare var RESOURCE_ENERGY: string;
declare var FIND_SOURCES: number;
declare var FIND_MY_SPAWNS: number;
declare var FIND_MY_STRUCTURES: number;
declare var FIND_STRUCTURES: number;
declare var FIND_MY_CONSTRUCTION_SITES: number;
declare var STRUCTURE_EXTENSION: string;
declare var STRUCTURE_CONTAINER: string;
declare var STRUCTURE_TOWER: string;
declare var STRUCTURE_SPAWN: string;
declare var STRUCTURE_STORAGE: string;
declare var BODYPART_COST: any;
declare var ERR_NOT_ENOUGH_ENERGY: number;


import SpaceHelper from './space_helper';


class Population {
    empire: Object;

    constructor(empire: Object) {
        this.empire = empire
    }

    regenerate() {
        for (const spawn_name in Game.spawns) {
            const spawn = Game.spawns[spawn_name];
            const templates = this.compose_templates(spawn)
            for (const template of templates) {
                const result = template.spawn_creep(spawn);
                if (result) {
                    break;
                }
            }
        }
    }

    private compose_templates(spawn: any) {
        let result = [
            new MeleeSpawnTemplate(spawn),
            new MinimalSupplySpawnTemplate(spawn),
            new SupplySpawnTemplate(spawn),
            new MineSpawnTemplate(spawn),
            new RepairSpawnTemplate(spawn),
            new BuildSpawnTemplate(spawn),
            new UpgradeSpawnTemplate(spawn)
        ];

        const colonies = this.empire[spawn.room.name];
        if (colonies) {
            for (const colony of colonies) {
                result = result.concat([
                    new MeleeSpawnTemplate(spawn, { work: colony }),
                    new MineSpawnTemplate(spawn, { work: colony }),
                    new BuildSpawnTemplate(spawn, { work: colony, resource: colony }),
                    new RepairSpawnTemplate(spawn, { work: colony, resource: colony }),
                    new ClaimSpawnTemplate(spawn, { work: colony, claim: this.empire[colony] !== undefined }),
                    new UpgradeSpawnTemplate(spawn, { work: spawn.room.name, resource: colony }),
                    new HaulSpawnTemplate(spawn, { work: spawn.room.name, resource: colony })
                ]);
            }
        }
        result.push(new ExtraUpgradeSpawnTemplate(spawn));

        return result;
    }
}


abstract class SpawnTemplate {
    spawn: any;
    role: string;
    fixed_part: Array<string>;
    repeating_part: Array<string>;
    max_repeats: number;
    name_prefix: string;
    count: number;
    room_names: Object;

    constructor(spawn: any, room_config: Object = null) {
        this.spawn = spawn;
        if (room_config === null) {
            room_config = {
                "work": spawn.room.name,
                "resource": spawn.room.name
            };
        }
        room_config['fallback'] = this.spawn.room.name;
        this.room_names = room_config
        this.initialize();
    }

    spawn_creep(spawn: any): boolean {
        const body = this.build_body(
            spawn.room.energyCapacityAvailable
        );
        if (this.body_cost(body) > spawn.room.energyCapacityAvailable) {
            return false;
        }

        for (let i = 0; i < this.count; i++) {
            const result = spawn.spawnCreep(
                body,
                this.name_prefix + i,
                {
                    memory: this.get_memory_template()
                }
            );
            if (result == OK || result == ERR_NOT_ENOUGH_ENERGY) {
                return true;
            }
        }
        return false;
    }

    abstract initialize(): void;
    abstract get_amount(): number;

    protected count_mining_containers(room: any): number {
        const energy_sources = room.find(FIND_SOURCES);
        let result = []
        for (const src of energy_sources) {
            const container = src.pos.findClosestByPath(FIND_STRUCTURES,
                { filter: { structureType: STRUCTURE_CONTAINER } }
            );
            if (container && container.pos.inRangeTo(src, 1)) {
                result.push(container);
            }
        }
        return result.length;
    }

    private build_body(energy: number): Array<string> {
        let result = [].concat(this.fixed_part);
        energy -= this.body_cost(this.fixed_part);

        const repeating_cost = this.body_cost(this.repeating_part);
        let repeat_count = 0;
        while (energy >= repeating_cost && repeat_count < this.max_repeats) {
            if (result.length + this.repeating_part.length > 50) break;
            result = result.concat(this.repeating_part);
            energy -= repeating_cost;
            repeat_count++;
        }

        return result;
    }

    private body_cost(body: Array<string>): number {
        let result = 0;
        for (const bp of body) {
            result += BODYPART_COST[bp]
        }
        return result;
    }

    private get_memory_template(): Object {
        return {
            role: this.role,
            rooms: this.room_names
        }
    }
}

class MinimalSupplySpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "supply";
        this.fixed_part = [WORK, CARRY, CARRY, MOVE, MOVE];
        this.repeating_part = [];
        this.max_repeats = 0;
        this.name_prefix = "minimal_supply_" + this.spawn.room.name + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        return 1;
    }
}

class SupplySpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "supply";
        this.fixed_part = [WORK, CARRY, MOVE, MOVE];
        this.repeating_part = [CARRY, MOVE];
        this.max_repeats = this.spawn.room.controller.level;
        this.name_prefix = "supply_" + this.spawn.room.name + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        return 3;
    }
}

class MineSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "mine";
        this.fixed_part = [WORK, WORK, WORK, WORK, WORK, MOVE];
        this.repeating_part = [MOVE]
        this.max_repeats = 4;
        this.name_prefix = "mine_" + this.room_names["work"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const room = Game.rooms[this.room_names["work"]]
        if (!room) {
            return 0;
        } else {
            return this.count_mining_containers(room);
        }
    }
}

class RepairSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "repair";
        const room = Game.rooms[this.room_names["work"]];
        if (!room || !this.has_tower(room)) {
            this.fixed_part = [WORK, CARRY, MOVE, MOVE];
            this.repeating_part = [WORK, CARRY, MOVE, MOVE]
        } else {
            this.fixed_part = [WORK, CARRY, MOVE, MOVE];
            this.repeating_part = [CARRY, MOVE]
        }
        this.max_repeats = 4;
        this.name_prefix = "repair_" + this.room_names["work"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const room = Game.rooms[this.room_names["work"]]
        if (!room) {
            return 0;
        } else {
            return 1;
        }
    }

    private has_tower(room: any) {
        return room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } }).length > 0;
    }
}

class BuildSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "build";
        this.fixed_part = [];
        this.repeating_part = [WORK, CARRY, MOVE, MOVE]
        this.max_repeats = 100000;
        this.name_prefix = "build_" + this.room_names["work"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const room = Game.rooms[this.room_names["work"]]
        if (!room) {
            return 1;
        } else {
            return room.find(FIND_MY_CONSTRUCTION_SITES).length > 0 ? 1 : 0;
        }
    }
}

class UpgradeSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "upgrade";
        this.fixed_part = [];
        this.repeating_part = [WORK, CARRY, MOVE, MOVE];
        this.max_repeats = 3;
        this.name_prefix = "upgrade_" + this.room_names["resource"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        if (this.room_names["work"] == this.room_names["resource"]) {
            return 3;
        } else {
            const spawn_room_storage = this.spawn.room.find(FIND_STRUCTURES,
                { filter: { structureType: STRUCTURE_STORAGE } }
            );
            if (spawn_room_storage) {
                return 3;
            } else {
                return 3;
            }
        }
    }
}

class ExtraUpgradeSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "upgrade";
        this.fixed_part = [];
        this.repeating_part = [WORK, CARRY, MOVE, MOVE];
        this.max_repeats = 100000;
        this.name_prefix = "extra_" + this.room_names["resource"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        return 1;
    }
}

class ClaimSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "claim";
        this.fixed_part = [];
        this.repeating_part = [CLAIM, MOVE];
        this.max_repeats = 3;
        this.name_prefix = "claim_" + this.room_names["work"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const room = Game.rooms[this.room_names["work"]];
        if (!room === undefined) {
            return 1;
        } else {
            const reservation = room?.controller?.reservation
            if (!reservation || reservation.username != "Veldrin" || reservation.ticksToEnd <= 3500) {
                if (room?.controller?.my) {
                    return 0
                } else {
                    return 1;
                }
            } else {
                return 0
            }
        }
    }
}

class HaulSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "haul";
        this.fixed_part = [];
        this.repeating_part = [CARRY, CARRY, MOVE];
        this.max_repeats = 20;
        this.name_prefix = "haul_" + this.room_names["resource"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const spawn_room_storage = this.spawn.room.find(FIND_STRUCTURES,
            { filter: { structureType: STRUCTURE_STORAGE } }
        );
        if (spawn_room_storage.length == 0) {
            return 0;
        }
        const room = Game.rooms[this.room_names["resource"]];
        if (!room) {
            return 0;
        } else {
            if (room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } }).length == 0) {
                if (spawn_room_storage[0].store.getUsedCapacity(RESOURCE_ENERGY) >= 400000) {
                    return 1;
                }
                const path_length = new SpaceHelper().safe_room_path(this.spawn.room.name, this.room_names["resource"]).length;
                const containers_count = this.count_mining_containers(room)

                return path_length * containers_count
            } else {
                return 0
            }
        }
    }
}

class MeleeSpawnTemplate extends SpawnTemplate {
    initialize(): void {
        this.role = "melee";
        this.fixed_part = [TOUGH, ATTACK, MOVE, MOVE];
        this.repeating_part = [TOUGH, ATTACK, MOVE, MOVE];
        this.max_repeats = 3;
        this.name_prefix = "melee_" + this.room_names["work"] + "_";
        this.count = this.get_amount();
    }

    get_amount(): number {
        const room = Game.rooms[this.room_names["work"]];
        if (!room) {
            return 0;
        } else {
            return new SpaceHelper().get_hostiles(room).length;
        }
    }
}



export default Population;