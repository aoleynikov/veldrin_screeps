/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to harvesters, the swarm doesn't function as intended.


If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

module.exports = {
  version: 2,
  rooms: ["W31S51", "W32S51", "W31S52", "W32S52"],
  templates: [
    {
      count: 3,
      body: [
        WORK,
        MOVE,
        WORK,
        WORK,
        MOVE,
        MOVE,
        CARRY,
        MOVE,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY
      ],
      memory: {
        role: "upgrader",
        type: "swarm",
        work_place: "W31S51",
        target: "W31S51"
      }
    },
    {
      count: 2,
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      memory: {
        role: "repairer",
        type: "swarm",
        work_place: "W31S51",
        target: "W31S51"
      }
    },
    {
      count: 3,
      body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
      memory: {
        role: "builder",
        type: "swarm",
        work_place: "W31S51",
        target: "W31S51"
      }
    },
    {
      count: 3,
      body: [
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY
      ],
      memory: {
        role: "hauler",
        type: "swarm",
        energy_room: "W32S51",
        work_place: "W31S51"
      }
    },
    {
      count: 3,
      body: [
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY
      ],
      memory: {
        role: "hauler",
        type: "swarm",
        energy_room: "W31S52",
        work_place: "W31S51"
      }
    },
    {
      count: 4,
      body: [
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY,
        MOVE,
        CARRY
      ],
      memory: {
        role: "hauler",
        type: "swarm",
        energy_room: "W32S52",
        work_place: "W31S51"
      }
    },
    {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: "claimer",
        type: "swarm",
        target: "W32S51"
      }
    },
    {
      count: 2,
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      memory: {
        role: "repairer",
        type: "swarm",
        target: "W32S51"
      }
    },
    {
      count: 3,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        type: "swarm",
        target: "W32S51"
      }
    },
    {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: "claimer",
        type: "swarm",
        target: "W31S52"
      }
    },
    {
      count: 2,
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      memory: {
        role: "repairer",
        type: "swarm",
        target: "W31S52"
      }
    },
    {
      count: 3,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        type: "swarm",
        target: "W31S52"
      }
    },
    {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: "claimer",
        type: "swarm",
        target: "W32S52"
      }
    },
    {
      count: 3,
      body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
      memory: {
        role: "miner",
        type: "swarm",
        target: "W32S52"
      }
    },
    {
      count: 2,
      body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
      memory: {
        role: "repairer",
        type: "swarm",
        target: "W32S52"
      }
    }
  ]
};
