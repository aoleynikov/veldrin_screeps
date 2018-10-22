var container = require('structure.container');

module.exports = {
    execute: (role, count_func) => {
        var spawn = Game.spawns['Main'];
        for (var key in spawn.memory['population']['rooms']) {
            var room = Game.rooms[key];
            if (!room) continue;
            var count = count_func(room);

            console.log('[SWARM] Setting ' + role + ' count to ' + count + ' for room ' + key);

            var edited_template = spawn.memory['population']['templates']
                .find(t => (t['work_place'] == key || t['work_place'] == key || t['target'] == key) && t['role'] == memory['role'])
            edited_template.count = count

            spawn.memory['population'][key] = room_swarm;
        }
    }
}