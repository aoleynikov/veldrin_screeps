/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

module.exports = {
  rooms: ["W18S25", "W18S24", "W19S24", "W19S25"],
  templates: [{
      count: 2,
      name_prefix: "miner_W18S25_",
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        type: "swarm"
      }
    },
    {
      count: 2,
      name_prefix: "builder_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "builder",
        type: "swarm"
      }
    },
    {
      count: 2,
      name_prefix: "builder_W18S24_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "builder",
        energy_room: "W18S24",
        type: "swarm"
      }
    },
    {
      count: 2,
      name_prefix: "upgrader_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "upgrader",
        type: "swarm"
      }
    },
    {
      count: 2,
      name_prefix: "repairer_W18S25_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W18S25"
      }
    },
    {
      count: 2,
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
      name_prefix: "importing_repairer_W18S24_",
      body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W18S25",
        energy_room: 'W18S24'
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
      count: 3,
      name_prefix: "importing_upgrader_W19S24_",
      body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
      memory: {
        role: "upgrader",
        type: "swarm",
        work_place: "W18S25",
        energy_room: "W19S24"
      }
    },
    {
      count: 1,
      name_prefix: "repairer_W19S24_",
      body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W19S24"
      }
    },
    {
      count: 1,
      name_prefix: 'miner_W19S24_',
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      memory: {
        role: 'miner',
        type: 'swarm',
        target: 'W19S24'
      }
    },
    {
      count: 0,
      name_prefix: 'hauler_W19S24_',
      body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      memory: {
        role: 'hauler',
        type: 'swarm',
        work_place: 'W18S25',
        energy_room: 'W19S24'
      }
    }
  ]
};