/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
var containers = require('structure.container');

var miners_count = (room_name) => {
  var room = Game.rooms[room_name];
  return room ? containers.get(room).length : 0;
}

module.exports = {
  rooms: ["W18S25", "W18S24", "W19S24", "W19S25"],
  templates: [{
      count: miners_count('W18S25'),
      name_prefix: "miner_W18S25_",
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        type: "swarm"
      }
    },
    {
      count: 5,
      name_prefix: "builder_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "builder",
        type: "swarm"
      }
    },
    {
      count: 4,
      name_prefix: "upgrader_",
      body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: "upgrader",
        type: "swarm"
      }
    },
    {
      count: 3,
      name_prefix: "repairer_W18S25_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W18S25"
      }
    },
    {
      count: miners_count('W18S24'),
      name_prefix: "miner_W18S24_",
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        target: "W18S24",
        type: "swarm"
      }
    },
    {
      count: 1,
      name_prefix: "claimer_W18S24_",
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: "claimer",
        target: "W18S24",
        type: "swarm"
      }
    },
    {
      count: 2,
      name_prefix: "repairer_W18S24_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W18S24"
      }
    },
    {
      count: 2,
      name_prefix: 'hauler_W18N24_',
      body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'hauler',
        type: 'swarm',
        work_place: 'W18S25',
        energy_room: 'W18S24'
      }
    },
    {
      count: 2,
      name_prefix: "repairer_W19S24_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W19S24"
      }
    },
    {
      count: miners_count('W19S24'),
      name_prefix: 'miner_W19S24_',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: 'miner',
        type: 'swarm',
        target: 'W19S24'
      }
    },
    {
      count: 5,
      name_prefix: 'hauler_W19S24_',
      body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'hauler',
        type: 'swarm',
        work_place: 'W18S25',
        energy_room: 'W19S24'
      }
    },
    {
      count: 1,
      name_prefix: 'claimer_W19S24_',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: 'claimer',
        type: 'swarm',
        work_place: 'W19S24',
        target: 'W19S24'
      }
    },
    {
      count: 2,
      name_prefix: "repairer_W19S25_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W19S25"
      }
    },
    {
      count: miners_count('W19S25'),
      name_prefix: 'miner_W19S25_',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: 'miner',
        type: 'swarm',
        target: 'W19S25'
      }
    },
    {
      count: 1,
      name_prefix: 'claimer_W19S25_',
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: 'claimer',
        type: 'swarm',
        work_place: 'W19S25',
        target: 'W19S25'
      }
    },
    {
      count: 5,
      name_prefix: 'hauler_W19S25_',
      body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'hauler',
        type: 'swarm',
        work_place: 'W18S25',
        energy_room: 'W19S25'
      }
    },
    {
      count: 3,
      name_prefix: 'warrior_',
      body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
      memory: {
        role: 'warrior',
        squad: 'Rax'
      }
    },
    {
      count: 1,
      name_prefix: 'healer_',
      body: [MOVE, MOVE, HEAL, HEAL],
      memory: {
        role: 'healer',
        squad: 'Rax'
      }
    },
    {
      count: 3,
      name_prefix: 'warrior_Phobos_',
      body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
      memory: {
        role: 'warrior',
        squad: 'Phobos'
      }
    },
    {
      count: 1,
      name_prefix: 'healer_Phobos_',
      body: [MOVE, MOVE, HEAL, HEAL],
      memory: {
        role: 'healer',
        squad: 'Phobos'
      }
    },
    {
      count: 3,
      name_prefix: 'warrior_Deimos_',
      body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
      memory: {
        role: 'warrior',
        squad: 'Deimos'
      }
    },
    {
      count: 1,
      name_prefix: 'healer_Deimos_',
      body: [MOVE, MOVE, HEAL, HEAL],
      memory: {
        role: 'healer',
        squad: 'Deimos'
      }
    },
    {
      count: 3,
      name_prefix: 'sniper_',
      body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: 'sniper',
        squad: 'snipers_test',
        type: 'swarm'
      }
    },
    {
      count: 3,
      name_prefix: 'scout_',
      body: [MOVE],
      memory: {
        role: 'scout',
        type: 'swarm'
      }
    }
  ]
};