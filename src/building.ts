import SpaceHelper from './space_helper';

declare var Game: any;
declare var FIND_SOURCES: number;
declare var FIND_STRUCTURES: number;
declare var STRUCTURE_CONTAINER: string;
declare var STRUCTURE_TOWER: string;
declare var FIND_MY_CREEPS: number;
declare var FIND_HOSTILE_CREEPS: number;
declare var FIND_HOSTILE_POWER_CREEPS: number;
declare var FIND_HOSTILE_CONSTRUCTION_SITES: number;
declare var FIND_HOSTILE_STRUCTURES: number;
declare var FIND_HOSTILE_SPAWNS: number;



class BuildingService {
    space_helper: SpaceHelper;
    empire: Object;

    constructor(empire: Object) {
        this.space_helper = new SpaceHelper();
        this.empire = empire
    }

    operate(room_name: string): void {
        const room = Game.rooms[room_name];
        if (!room) {
            return;
        }
        this.ensure_energy_containers(room);
        this.operate_towers(room)
    }

    private operate_towers(room: any): void {
        const towers = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        const hostile_find_keys = [
            FIND_HOSTILE_CREEPS,
            FIND_HOSTILE_POWER_CREEPS,
            FIND_HOSTILE_CONSTRUCTION_SITES,
            FIND_HOSTILE_STRUCTURES,
            FIND_HOSTILE_SPAWNS
        ];
        for (const tower of towers) {
            let hostiles = [];
            for (const key of hostile_find_keys) {
                hostiles = hostiles.concat(room.find(key))
            }

            if (hostiles.length > 0) {
                const attack_target = tower.pos.findClosestByRange(hostiles)
                tower.attack(attack_target)
                continue;
            }

            let injured_creeps = [];
            for (const creep of room.find(FIND_MY_CREEPS)) {
                if (creep.hits < creep.hitsMax) {
                    injured_creeps.push(creep);
                }
            }
            if (injured_creeps.length > 0) {
                const heal_target = tower.pos.findClosestByRange(injured_creeps);
                tower.heal(heal_target);
                continue;
            }

            let broken_structures = [];
            for (const structure of room.find(FIND_STRUCTURES)) {
                if (structure.hits < structure.hitsMax) {
                    broken_structures.push(structure);
                }
            }
            if (broken_structures.length > 0) {
                const repair_target = tower.pos.findClosestByRange(broken_structures)
                tower.repair(repair_target)
                continue;
            }
        }
    }

    private ensure_energy_containers(room: any): void {
        const sources = room.find(FIND_SOURCES);
        for (const src of sources) {
            const nearest_container = src.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            if (nearest_container === null || !src.pos.isNearTo(nearest_container.pos)) {
                const building_pos = this.place_energy_containers(src);
                room.createConstructionSite(building_pos.x, building_pos.y, STRUCTURE_CONTAINER);
            }
        }
    }

    private place_energy_containers(source: any): any {
        const room_name = source.room.name;
        const outer_score = (room_name: string, x: number, y: number) => {
            const room = Game.rooms[room_name];
            return this.space_helper.is_walkable(room_name, x, y, false) ? 1 : 0;
        }

        const inner_score = (room_name: string, x: number, y: number) => {
            const room = Game.rooms[room_name];
            const look_result = room.lookAt(x, y);
            if (!this.space_helper.is_walkable(room_name, x, y, false)) {
                return -1;
            }
            const result = this.space_helper.pick_best_surrounding(
                room_name, x, y,
                outer_score,
                (n, a) => n + a
            );
            return result.score
        }

        const best_pos = this.space_helper.pick_best_surrounding(
            room_name, source.pos.x, source.pos.y,
            inner_score,
            (n, a) => Math.max(n, a)
        );
        return best_pos.pos;
    }
}

export default BuildingService;
