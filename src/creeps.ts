declare var OK: number;
declare var ERR_NOT_IN_RANGE: number;
declare var ERR_NO_PATH: number
declare var RESOURCE_ENERGY: string;
declare var FIND_SOURCES_ACTIVE: number;
declare var FIND_SOURCES: number;
declare var FIND_MY_SPAWNS: number;
declare var FIND_MY_STRUCTURES: number;
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


import SpaceHelper from './space_helper';


abstract class Behavior {
    is_complete(creep: any): boolean {
        return false;
    }
    abstract fulfill(creep: any): void;
}

abstract class EnergySourceBase {
    source: any;

    constructor(game_object: any) {
        this.source = game_object;
    }

    abstract get_energy(creep: any): void;
}

class EnergySource extends EnergySourceBase {
    constructor(game_object: any) {
        super(game_object);
    }

    get_energy(creep: any): void {
        let result = creep.harvest(this.source);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.source);
        } else if (result == OK) {
            creep.memory.energy_source_id = undefined;
        }
    }

    get_stored_energy(): void {
        return this.source.energy;
    }

    get_container_id(): string {
        return undefined;
    }
}

class EnergyContainer extends EnergySourceBase {
    constructor(game_object: any) {
        super(game_object);
    }

    get_energy(creep: any): void {
        let result = creep.withdraw(this.source, RESOURCE_ENERGY);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.source);
        } else if (result == OK) {
            creep.memory.energy_source_id = undefined;
        }
    }

    get_stored_energy(): void {
        return this.source.store.getUsedCapacity(RESOURCE_ENERGY);
    }

    get_container_id(): string {
        return this.source.id;
    }
}

class EnergySourceFactory {
    static create_energy_source(game_object: any) {
        if (game_object.structureType == STRUCTURE_CONTAINER || game_object.structureType == STRUCTURE_STORAGE) {
            return new EnergyContainer(game_object);
        } else {
            return new EnergySource(game_object);
        }
    }
}

class GetEnergy extends Behavior {
    space_helper: SpaceHelper;
    constructor() {
        super();
        this.space_helper = new SpaceHelper();
    }

    is_complete(creep: any): boolean {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.refill = true;
            return false
        }
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.refill = false;
            return true
        }
        return !creep.memory.refill;
    }

    fulfill(creep: any) {
        if (creep.room.name != creep.memory.rooms.resource) {
            return new MoveToRoom("resource").fulfill(creep);
        }
        let energy_source = undefined;
        const source_id = creep.memory.energy_source_id;
        if (source_id !== undefined) {
            energy_source = EnergySourceFactory.create_energy_source(Game.getObjectById(source_id));
            if (energy_source) {
                const source_energy = energy_source.get_stored_energy();
                const creep_needs = creep.store.getFreeCapacity(RESOURCE_ENERGY);
                if (source_energy < creep_needs) {
                    energy_source = undefined;
                    creep.memory.energy_source_id = undefined;
                }
            }
        }

        if (!energy_source) {
            energy_source = this.find_best_energy_source(creep);
            if (!energy_source || !energy_source.source) {
                return;
            }
            creep.memory.energy_source_id = energy_source.get_container_id();
        }
        if (energy_source) {
            energy_source.get_energy(creep);
        }
    }

    private find_best_energy_source(creep: any): EnergySourceBase | null {
        const containers = creep.room.find(
            FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } }
        );
        const storage = creep.room.find(
            FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } }
        );
        const easy_sources = containers.concat(storage);
        let valid_easy_sources = []
        for (const src of easy_sources) {
            const free_in_creep = creep.store.getFreeCapacity(RESOURCE_ENERGY);
            const used_in_src = src.store.getUsedCapacity(RESOURCE_ENERGY);
            if (free_in_creep / 2 < used_in_src) {
                valid_easy_sources.push(src)
            }
        }

        if (valid_easy_sources.length > 0) {
            return new EnergyContainer(creep.pos.findClosestByPath(valid_easy_sources));
        }

        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        let available_sources = [];
        for (let src of sources) {
            const src_surroundings = this.space_helper.pick_best_surrounding(
                src.room.name, src.pos.x, src.room.y,
                (room_name: string, x: number, y: number) => {
                    return this.space_helper.is_walkable(room_name, x, y, true) ? 1 : 0
                },
                (n, a) => Math.max(n, a)
            )
            if (src_surroundings.score > 0) {
                available_sources.push(src);
            }
        }
        let energy_source = creep.pos.findClosestByPath(available_sources);
        return new EnergySource(energy_source);
    }
}

class Supply extends Behavior {
    constructor() {
        super();
    }

    is_complete(creep: any): boolean {
        return creep.room.energyAvailable == creep.room.energyCapacityAvailable;
    }

    fulfill(creep: any) {
        let spawns = creep.room.find(FIND_MY_SPAWNS);
        let exts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        let targets = []
        for (let structure of spawns.concat(exts)) {
            if (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                targets.push(structure);
            }
        }
        if (targets.length === 0) {
            creep.moveTo(spawns[0]);
        }

        let target = creep.pos.findClosestByPath(targets);
        let result = creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

class Upgrade extends Behavior {
    constructor() {
        super();
    }

    fulfill(creep: any) {
        const controller = creep.room.controller;
        if (controller.owner?.username !== creep.owner?.username) {
            new MoveToRoom("fallback").fulfill(creep);
        }
        const result = creep.upgradeController(controller);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
    }
}

class Build extends Behavior {
    constructor() {
        super();
    }

    is_complete(creep: any): boolean {
        const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        return sites.length == 0;
    }

    fulfill(creep: any) {
        const site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        const result = creep.build(site);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(site);
        }
    }
}

class Repair extends Behavior {
    constructor() {
        super();
    }

    is_complete(creep: any): boolean {
        if (this.room_has_towers(creep)) {
            return this.get_unsupplied_towers(creep).length == 0;
        } else {
            return this.get_broken_structures(creep).length == 0;
        }
    }

    fulfill(creep: any) {
        if (this.room_has_towers(creep)) {
            const towers = this.get_unsupplied_towers(creep);
            const target = creep.pos.findClosestByPath(towers);
            const result = creep.transfer(target, RESOURCE_ENERGY);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            const broken_structures = this.get_broken_structures(creep);
            const target = creep.pos.findClosestByPath(broken_structures);
            const result = creep.repair(target)
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }

    private room_has_towers(creep: any): boolean {
        const towers = creep.room.find(FIND_MY_STRUCTURES,
            { filter: { structureType: STRUCTURE_TOWER } }
        );
        return towers.length > 0;
    }

    private get_unsupplied_towers(creep: any): Array<any> {
        const towers = creep.room.find(FIND_MY_STRUCTURES,
            { filter: { structureType: STRUCTURE_TOWER } }
        );
        let result = [];
        for (const tower of towers) {
            if (tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                result.push(tower)
            }
        }
        return result;
    }

    private get_broken_structures(creep: any) {
        const structures = creep.room.find(FIND_STRUCTURES)

        let result = []
        for (const str of structures) {
            if (str.hits < str.hitsMax) {
                result.push(str)
            }
        }
        return result;
    }
}

abstract class MinerBehavior extends Behavior {
    constructor() {
        super();
    }

    protected find_container(creep: any): any {
        const sources = creep.room.find(FIND_SOURCES)
        const i = parseInt(creep.name.split('_').pop())
        const src = sources[i]
        return src.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        });
    }
}

class SitOnContainer extends MinerBehavior {
    constructor() {
        super();
    }

    is_complete(creep: any): boolean {
        const nearest_container = this.find_container(creep)
        return nearest_container.pos.x == creep.pos.x && nearest_container.pos.y == creep.pos.y
    }

    fulfill(creep: any) {
        const container = this.find_container(creep)
        const result = creep.moveTo(container)
        const distance = creep.pos.findPathTo(container).length;
        if (distance <= 2 && result == ERR_NO_PATH) {
            const occupying_creep = container.room.lookForAt(LOOK_CREEPS, container.pos.x, container.pos.y);
            const source = container.pos.findClosestByRange(FIND_SOURCES)
            if (occupying_creep.length > 0) {
                const flee_path = PathFinder.search(occupying_creep.pos, {
                    pos: source.pos,
                    range: 3
                }, {
                    flee: true
                });
            }
        }
    }
}

class Mine extends MinerBehavior {
    constructor() {
        super();
    }

    fulfill(creep: any) {
        const container = this.find_container(creep)
        let work_count = 0;
        for (const bp of creep.body) {
            if (bp.type == WORK) work_count++;
        }
        if (container.store.getFreeCapacity(RESOURCE_ENERGY) >= work_count * HARVEST_POWER) {
            const src = creep.pos.findClosestByPath(FIND_SOURCES)
            creep.harvest(src)
        }
    }
}

class MoveToRoom extends Behavior {
    room_type: string;

    constructor(room_type: string) {
        super();
        this.room_type = room_type;
    }

    is_complete(creep: any): boolean {
        const rooms_config = creep.memory.rooms
        if (!rooms_config) {
            return true;
        }
        const target_room = rooms_config[this.room_type]
        if (!target_room) {
            return true;
        }
        return creep.room.name == target_room
    }

    fulfill(creep: any) {
        const target_room = creep.memory.rooms[this.room_type]
        const route = new SpaceHelper().safe_room_path(creep.room.name, target_room);
        const move_target = creep.pos.findClosestByPath(
            route[0].exit
        )
        creep.moveTo(move_target);
    }
}

class Claim extends Behavior {
    constructor() {
        super();
    }

    fulfill(creep: any): void {
        const target = creep.room.controller;
        const rooms_config = creep.memory.rooms
        let claiming = false;
        if (rooms_config) {
            claiming = rooms_config.claim;
        }
        let result = undefined;
        if (target.owner === undefined || target.owner.username == creep.owner.username) {
            if (claiming) {
                result = creep.claimController(target);
            } else {
                result = creep.reserveController(target);
            }
        } else {
            result = creep.attackController(target);
        }


        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

class Haul extends Behavior {
    constructor() {
        super();
    }

    fulfill(creep: any): void {
        const storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            { filter: { structureType: STRUCTURE_STORAGE } }
        );

        const result = creep.transfer(storage, RESOURCE_ENERGY)
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    }
}

class Melee extends Behavior {
    constructor() {
        super();
    }

    fulfill(creep: any): void {
        const targets = new SpaceHelper().get_hostiles(creep.room);

        if (targets.length > 0) {
            const target = creep.pos.findClosestByPath(targets);
            const result = creep.attack(target);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            const controller = creep.room.controller;
            if (!creep.pos.inRangeTo(controller.pos, 10)) {
                creep.moveTo(controller.pos);
            }
        }
    }
}

class Loot extends Behavior {
    is_complete(creep: any): boolean {
        return this.find_lootable_object(creep.pos) == null ||
            creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
    }

    fulfill(creep: any): void {
        const lootable_object = this.find_lootable_object(creep.pos);
        if (lootable_object) {
            if (lootable_object.creep) {
                creep.withdraw(lootable_object, RESOURCE_ENERGY);
            } else {
                creep.pickup(lootable_object);
            }
        }
    }

    private find_lootable_object(pos: any): any {
        const resource_piles = pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        for (const pile of resource_piles) {
            if (pile.resourceType == RESOURCE_ENERGY && pile.energy > 0) {
                return pile;
            }
        }

        const tombs = pos.findInRange(FIND_TOMBSTONES, 1);
        for (const tomb of tombs) {
            if (tomb.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                return tomb;
            }
        }
    }
}

class BehaviorDispatcher {
    roles: Object;

    constructor() {
        this.roles = {
            supply: [new Loot(), new GetEnergy(), new Supply(), new Build(), new Upgrade()],
            mine: [new MoveToRoom("work"), new SitOnContainer(), new Mine()],
            repair: [
                new Loot(), new GetEnergy(), new MoveToRoom("work"), new Repair(), new Build, new Upgrade()],
            build: [
                new Loot(), new GetEnergy(), new MoveToRoom("work"), new Build(), new Upgrade()
            ],
            upgrade: [new Loot(), new GetEnergy(), new MoveToRoom("work"), new Upgrade()],
            claim: [new MoveToRoom("work"), new Claim()],
            haul: [new Loot(), new GetEnergy(), new MoveToRoom("work"), new Haul()],
            melee: [new MoveToRoom("work"), new Melee()]
        }
    }

    dispatch(creep: any): void {
        const role = creep.memory.role;
        const behaviors = this.roles[role] || [];
        let level = 0;
        for (const behavior of behaviors) {
            level++;
            if (behavior.is_complete(creep)) {
                continue;
            }
            behavior.fulfill(creep);
            break
        }
        creep.memory.operating_level = level;
    }
}


export default BehaviorDispatcher;